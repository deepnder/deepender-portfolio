type Job = {
  title: string;
  url: string;
  first_seen?: string;
};

type CompanyBlock = {
  name: string;
  job_count: number;
  new_this_run: number;
  error: string | null;
  jobs: Job[];
};

type Snapshot = {
  last_run?: string;
  totals?: {
    companies_checked: number;
    companies_with_errors: number;
    total_jobs_tracked: number;
    new_this_run: number;
  };
  companies: CompanyBlock[];
};

type SnapshotCacheEntry = {
  value: Snapshot;
  expiresAt: number;
};

const globalCache = globalThis as typeof globalThis & {
  __jobSnapshotCache?: Record<string, SnapshotCacheEntry>;
  __jobSnapshotFetchPromises?: Record<string, Promise<Snapshot>>;
};

const snapshotCache = globalCache.__jobSnapshotCache || (globalCache.__jobSnapshotCache = {});
const snapshotFetchPromises =
  globalCache.__jobSnapshotFetchPromises || (globalCache.__jobSnapshotFetchPromises = {});

const SNAPSHOT_TTL_MS = 30_000;
const GITHUB_FETCH_TIMEOUT_MS = 15_000;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseJob(value: unknown): Job {
  if (!isObject(value)) {
    throw new Error("Invalid job payload");
  }

  const title = typeof value.title === "string" ? value.title : "";
  const url = typeof value.url === "string" ? value.url : "";
  const first_seen = typeof value.first_seen === "string" ? value.first_seen : undefined;

  if (!title || !url) {
    throw new Error("Job payload missing required fields");
  }

  return { title, url, first_seen };
}

function parseCompany(value: unknown): CompanyBlock {
  if (!isObject(value)) {
    throw new Error("Invalid company payload");
  }

  const name = typeof value.name === "string" ? value.name : "";
  if (!name) {
    throw new Error("Company payload missing required fields");
  }

  const jobs = Array.isArray(value.jobs) ? value.jobs.map(parseJob) : [];
  const error = typeof value.error === "string" ? value.error : null;
  const job_count = typeof value.job_count === "number" ? value.job_count : jobs.length;
  const new_this_run = typeof value.new_this_run === "number" ? value.new_this_run : 0;

  return {
    name,
    job_count,
    new_this_run,
    error,
    jobs,
  };
}

function parseSnapshot(value: unknown): Snapshot {
  if (!isObject(value)) {
    throw new Error("Snapshot payload is not an object");
  }

  const companies = Array.isArray(value.companies) ? value.companies.map(parseCompany) : [];
  const totals = isObject(value.totals)
    ? {
        companies_checked:
          typeof value.totals.companies_checked === "number"
            ? value.totals.companies_checked
            : companies.length,
        companies_with_errors:
          typeof value.totals.companies_with_errors === "number"
            ? value.totals.companies_with_errors
            : companies.filter((company) => Boolean(company.error)).length,
        total_jobs_tracked:
          typeof value.totals.total_jobs_tracked === "number"
            ? value.totals.total_jobs_tracked
            : companies.reduce((sum, company) => sum + company.job_count, 0),
        new_this_run:
          typeof value.totals.new_this_run === "number"
            ? value.totals.new_this_run
            : companies.reduce((sum, company) => sum + company.new_this_run, 0),
      }
    : {
        companies_checked: companies.length,
        companies_with_errors: companies.filter((company) => Boolean(company.error)).length,
        total_jobs_tracked: companies.reduce((sum, company) => sum + company.job_count, 0),
        new_this_run: companies.reduce((sum, company) => sum + company.new_this_run, 0),
      };

  return {
    last_run: typeof value.last_run === "string" ? value.last_run : undefined,
    totals,
    companies,
  };
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = GITHUB_FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const signal = init.signal ?? controller.signal;

  try {
    return await fetch(url, { ...init, signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchSnapshot(owner: string, repo: string, token: string | undefined, branch = "main") {
  const cacheKey = `${owner}/${repo}@${branch}`;
  const now = Date.now();
  const cached = snapshotCache[cacheKey];
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const inFlight = snapshotFetchPromises[cacheKey];
  if (inFlight) {
    return inFlight;
  }

  const fetchPromise = (async () => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data/jobs_snapshot.json?ref=${branch}`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.raw+json",
      "User-Agent": "job-alert-bot/1.1",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetchWithTimeout(apiUrl, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`GitHub snapshot fetch failed with status ${response.status}`);
    }

    const body = await response.text();
    let parsedSnapshot: Snapshot;
    try {
      parsedSnapshot = parseSnapshot(JSON.parse(body));
    } catch (error) {
      throw new Error(`Invalid snapshot JSON: ${error instanceof Error ? error.message : "unknown"}`);
    }

    snapshotCache[cacheKey] = {
      value: parsedSnapshot,
      expiresAt: Date.now() + SNAPSHOT_TTL_MS,
    };

    return parsedSnapshot;
  })();

  snapshotFetchPromises[cacheKey] = fetchPromise;

  try {
    return await fetchPromise;
  } finally {
    delete snapshotFetchPromises[cacheKey];
  }
}

export async function GET(request: Request) {
  const owner = process.env.JOBBOT_GH_OWNER;
  const repo = process.env.JOBBOT_GH_REPO;
  const token = process.env.JOBBOT_GH_TOKEN;
  const branch = process.env.JOBBOT_GH_BRANCH || "main";
  const q = new URL(request.url).searchParams.get("q")?.trim() || "";

  if (!owner || !repo) {
    return Response.json(
      { error: "Missing JOBBOT_GH_OWNER / JOBBOT_GH_REPO env vars" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const data = await fetchSnapshot(owner, repo, token, branch);

    if (!q) {
      return Response.json(data, {
        status: 200,
        headers: { "Cache-Control": "public, max-age=20, stale-while-revalidate=60" },
      });
    }

    const query = normalizeText(q);
    const filteredCompanies = data.companies.reduce<CompanyBlock[]>((acc, company) => {
      const matchingJobs = company.jobs.filter((job) => {
        const haystack = normalizeText(`${company.name} ${job.title} ${job.url}`);
        if (!haystack) return false;
        if (haystack.includes(query)) return true;
        const queryTokens = query.split(" ").filter(Boolean);
        return queryTokens.every((token) => haystack.includes(token));
      });

      if (matchingJobs.length > 0 || company.error) {
        acc.push({
          ...company,
          job_count: matchingJobs.length,
          jobs: matchingJobs,
        });
      }

      return acc;
    }, []);

    const filteredTotals = {
      companies_checked: filteredCompanies.length,
      companies_with_errors: filteredCompanies.filter((company) => Boolean(company.error)).length,
      total_jobs_tracked: filteredCompanies.reduce((sum, company) => sum + company.job_count, 0),
      new_this_run: filteredCompanies.reduce((sum, company) => sum + company.new_this_run, 0),
    };

    return Response.json(
      {
        ...data,
        companies: filteredCompanies,
        totals: filteredTotals,
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=20, stale-while-revalidate=60" },
      }
    );
  } catch (error) {
    console.error("Failed to load job snapshot:", error);
    return Response.json(
      { error: "Could not load job data" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
