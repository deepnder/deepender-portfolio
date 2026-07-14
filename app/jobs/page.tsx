"use client";

import { useEffect, useMemo, useState } from "react";

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
  last_run: string;
  totals?: {
    companies_checked: number;
    companies_with_errors: number;
    total_jobs_tracked: number;
    new_this_run: number;
  };
  companies: CompanyBlock[];
};

type FlattenedJob = Job & {
  company: string;
  score: number;
};

const PAGE_SIZE = 40;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMatchScore(job: FlattenedJob, query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 1;

  const haystack = normalizeText(`${job.title} ${job.company} ${job.url}`);
  if (!haystack) return -1;

  if (haystack.includes(normalizedQuery)) return 100;

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  const matchedTokens = queryTokens.filter((token) => haystack.includes(token)).length;
  return matchedTokens > 0 ? matchedTokens : -1;
}

export default function JobsPage() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  async function loadJobs() {
    setLoading(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/jobs?mode=full", { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setStatusMsg(json?.error || `Server returned ${res.status}`);
        setData(null);
      } else if (json?.error) {
        setStatusMsg(json.error);
        setData(json);
      } else {
        setData(json);
      }
    } catch (e) {
      setStatusMsg("Couldn't load job data.");
      setData(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search]);

  async function handleRunNow() {
    setTriggering(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/trigger-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatusMsg(json.error || "Something went wrong.");
        setTriggering(false);
        return;
      }
      setStatusMsg("Check running… this takes 2-5 minutes.");
      pollUntilDone();
    } catch (e) {
      setStatusMsg("Couldn't reach the trigger.");
      setTriggering(false);
    }
  }

  function pollUntilDone() {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/run-status", { cache: "no-store" });
        const json = await res.json();
        if (json.status === "completed") {
          clearInterval(interval);
          setStatusMsg(
            json.conclusion === "success"
              ? "Done — showing latest results."
              : "Run finished with errors — showing what we have."
          );
          setTriggering(false);
          loadJobs();
        }
      } catch (e) {
        // keep polling silently; a single failed poll isn't fatal
      }
    }, 10000);

    setTimeout(() => clearInterval(interval), 8 * 60 * 1000);
  }

  const flattenedJobs = useMemo(() => {
    const allJobs: FlattenedJob[] = [];
    (data?.companies || []).forEach((company) => {
      (company.jobs || []).forEach((job) => {
        allJobs.push({ ...job, company: company.name, score: 0 });
      });
    });
    return allJobs;
  }, [data]);

  const searchResults = useMemo(() => {
    const normalizedSearch = search.trim();
    if (!normalizedSearch) {
      return flattenedJobs
        .sort((a, b) => (b.first_seen || "").localeCompare(a.first_seen || ""))
        .slice(0, PAGE_SIZE);
    }

    return flattenedJobs
      .map((job) => ({ ...job, score: getMatchScore(job, normalizedSearch) }))
      .filter((job) => job.score > 0)
      .sort((a, b) => b.score - a.score || (b.first_seen || "").localeCompare(a.first_seen || ""));
  }, [flattenedJobs, search]);

  const visibleJobs = searchResults.slice(0, visibleCount);
  const hasMore = visibleCount < searchResults.length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-emerald-400 mb-1">Job Alert</h1>
        <p className="text-neutral-400 text-sm mb-6">
          {data?.last_run
            ? `Last checked: ${new Date(data.last_run).toLocaleString()}`
            : loading
            ? "Loading job snapshot…"
            : "No data yet."}
          {data?.totals && (
            <>
              {" "}
              &middot; {data.totals.total_jobs_tracked} jobs tracked across{" "}
              {data.totals.companies_checked} companies
            </>
          )}
        </p>

        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <input
            type="password"
            placeholder="passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleRunNow}
            disabled={triggering}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm px-4 py-2 rounded transition-colors"
          >
            {triggering ? "Checking…" : "Check Now"}
          </button>
        </div>

        {statusMsg && <p className="text-sm text-neutral-400 mb-6">{statusMsg}</p>}
        {!statusMsg && <div className="mb-6" />}

        <div className="mb-6 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <label className="text-sm text-neutral-400 block mb-2">Search jobs by keyword or phrase</label>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. frontend, product manager, data engineer"
              className="flex-1 min-w-[240px] bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => setSearch("")}
              className="text-sm text-neutral-300 border border-neutral-700 rounded px-3 py-2 hover:bg-neutral-800"
            >
              Clear
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Matching jobs are indexed locally after the snapshot loads, so repeated searches stay fast.
          </p>
        </div>

        {loading && <p className="text-neutral-500">Loading…</p>}

        {!loading && searchResults.length === 0 && (
          <p className="text-neutral-500">No matching jobs found for this search.</p>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>
                Showing {visibleJobs.length} of {searchResults.length} matching jobs
              </span>
              {search ? <span>Filtered by “{search}”</span> : null}
            </div>

            {visibleJobs.map((job) => (
              <div key={`${job.company}-${job.url}`} className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a href={job.url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-medium">
                    {job.title}
                  </a>
                  <span className="text-xs text-neutral-500">{job.company}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">{job.url}</p>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
