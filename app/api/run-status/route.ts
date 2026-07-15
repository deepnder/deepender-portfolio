export async function GET() {
  const owner = process.env.JOBBOT_GH_OWNER;
  const repo = process.env.JOBBOT_GH_REPO;
  const token = process.env.JOBBOT_GH_TOKEN;

  if (!owner || !repo || !token) {
    return Response.json(
      { error: "Missing JOBBOT_GH_OWNER / JOBBOT_GH_REPO / JOBBOT_GH_TOKEN env vars" },
      { status: 500 }
    );
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/job_monitor.yml/runs?per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      return Response.json({ error: `GitHub returned ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    const run = data.workflow_runs?.[0];
    if (!run) {
      return Response.json({ status: "unknown" }, { status: 200 });
    }

    return Response.json({
      status: run.status,
      conclusion: run.conclusion,
      started_at: run.run_started_at,
    });
  } catch (err) {
    if ((err as any)?.name === "AbortError") {
      return Response.json({ error: "Run status request timed out" }, { status: 504 });
    }
    return Response.json({ error: "Could not check run status" }, { status: 502 });
  }
}
