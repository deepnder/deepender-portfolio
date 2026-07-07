"use client";

import { useEffect, useState } from "react";

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

export default function JobsPage() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  async function loadJobs() {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setStatusMsg("Couldn't load job data.");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadJobs();
  }, []);

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

    // stop polling after 8 minutes no matter what, so it can't spin forever
    setTimeout(() => clearInterval(interval), 8 * 60 * 1000);
  }

  const companies = (data?.companies || [])
    .filter((c: CompanyBlock) => c.job_count > 0 || c.error)
    .sort((a: CompanyBlock, b: CompanyBlock) => (b.new_this_run || 0) - (a.new_this_run || 0));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-emerald-400 mb-1">Job Watch</h1>
        <p className="text-neutral-400 text-sm mb-6">
          {data?.last_run
            ? `Last checked: ${new Date(data.last_run).toLocaleString()}`
            : loading
            ? "Loading last check time…"
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

        {loading && <p className="text-neutral-500">Loading…</p>}

        {!loading && companies.length === 0 && (
          <p className="text-neutral-500">No jobs tracked yet — run a check to get started.</p>
        )}

        {!loading && companies.length > 0 && (
          <div className="space-y-3">
            {companies.map((c: CompanyBlock) => (
              <div
                key={c.name}
                className="border border-neutral-800 rounded-lg p-4 bg-neutral-900/40"
              >
                <button
                  onClick={() =>
                    setExpanded((prev: Record<string, boolean>) => ({ ...prev, [c.name]: !prev[c.name] }))
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    {c.job_count} tracked
                    {c.new_this_run > 0 && (
                      <span className="text-emerald-400">+{c.new_this_run} new</span>
                    )}
                    {c.error && (
                      <span className="text-red-400" title={c.error}>
                        ⚠
                      </span>
                    )}
                  </span>
                </button>
                {expanded[c.name] && (
                  <ul className="mt-3 space-y-1 text-sm">
                    {c.jobs.slice(0, 30).map((j: Job) => (
                      <li key={j.url}>
                        <a
                          href={j.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline"
                        >
                          {j.title}
                        </a>
                      </li>
                    ))}
                    {c.jobs.length > 30 && (
                      <li className="text-neutral-500">
                        + {c.jobs.length - 30} more tracked, not shown
                      </li>
                    )}
                    {c.jobs.length === 0 && c.error && (
                      <li className="text-red-400 text-xs">{c.error}</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
