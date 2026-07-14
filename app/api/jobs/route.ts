type SnapshotCacheEntry = {
  value: unknown;
  expiresAt: number;
};

const snapshotCache = (globalThis as typeof globalThis & {
  __jobSnapshotCache?: Record<string, SnapshotCacheEntry>;
}).__jobSnapshotCache || ((globalThis as typeof globalThis & {
  __jobSnapshotCache?: Record<string, SnapshotCacheEntry>;
}).__jobSnapshotCache = {});

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSnapshot(owner: string, repo: string, token: string) {
  const branch = process.env.JOBBOT_GH_BRANCH || "main";
  const cacheKey = `${owner}/${repo}/${branch}`;
  const now = Date.now();
  const cached = snapshotCache[cacheKey];
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/data/jobs_snapshot.json`;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data/jobs_snapshot.json`;

  let response = await fetch(rawUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "job-alert-bot/1.1",
    },
    cache: "no-store",
  });

  let body = await response.text();
  if (!response.ok) {
    response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw+json",
        "User-Agent": "job-alert-bot/1.1",
      },
      cache: "no-store",
    });
    body = await response.text();
  }

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    parsed = { error: "Snapshot payload was not valid JSON" };
  }

  snapshotCache[cacheKey] = {
    value: parsed,
    expiresAt: Date.now() + 60_000,
  };

  return parsed;
}

export async function GET(request: Request) {
  const owner = process.env.JOBBOT_GH_OWNER;
  const repo = process.env.JOBBOT_GH_REPO;
  const token = process.env.JOBBOT_GH_TOKEN;
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (!owner || !repo || !token) {
    return Response.json(
      { error: "Missing JOBBOT_GH_OWNER / JOBBOT_GH_REPO / JOBBOT_GH_TOKEN env vars" },
      { status: 500 }
    );
  }

  try {
    const data = (await fetchSnapshot(owner, repo, token)) as {
      last_run?: string;
      totals?: Record<string, number>;
      companies?: Array<{
        name: string;
        job_count?: number;
        new_this_run?: number;
        error?: string | null;
        jobs?: Array<{ title: string; url: string; first_seen?: string }>;
      }>;
    };

    if (!data || typeof data !== "object") {
      return Response.json({ error: "No snapshot data available" }, { status: 502 });
    }

    if (!q) {
      return Response.json(data);
    }

    const query = normalizeText(q);
    const filteredCompanies = (data.companies || []).reduce<Array<{
      name: string;
      job_count: number;
      new_this_run: number;
      error: string | null;
      jobs: Array<{ title: string; url: string; first_seen?: string }>;
    }>>((acc, company) => {
      const matchingJobs = (company.jobs || []).filter((job) => {
        const haystack = normalizeText(`${company.name} ${job.title} ${job.url}`);
        if (!haystack) return false;
        if (haystack.includes(query)) return true;
        const queryTokens = query.split(" ").filter(Boolean);
        return queryTokens.every((token) => haystack.includes(token));
      });

      if (matchingJobs.length > 0 || company.error) {
        acc.push({
          name: company.name,
          job_count: matchingJobs.length,
          new_this_run: company.new_this_run || 0,
          error: company.error || null,
          jobs: matchingJobs,
        });
      }

      return acc;
    }, []);

    return Response.json({
      ...data,
      companies: filteredCompanies,
      totals: {
        ...data.totals,
        total_jobs_tracked: filteredCompanies.reduce((sum, company) => sum + company.job_count, 0),
      },
    });
  } catch (err) {
    return Response.json({ error: "Could not load job data" }, { status: 502 });
  }
}
