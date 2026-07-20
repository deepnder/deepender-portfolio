export async function POST(request: Request) {
  const owner = process.env.JOBBOT_GH_OWNER;
  const repo = process.env.JOBBOT_GH_REPO;
  const token = process.env.JOBBOT_GH_TOKEN;
  const branch = process.env.JOBBOT_GH_BRANCH?.trim() || "main";
  const workflowFile = process.env.JOBBOT_WORKFLOW_FILE?.trim() || "job_monitor.yml";
  const expectedPassphrase = process.env.JOBBOT_TRIGGER_PASSPHRASE?.trim().toLowerCase();

  const body = await request.json().catch(() => ({}));
  const submittedPassphrase = String(body.passphrase || "").trim().toLowerCase();

  if (!expectedPassphrase || submittedPassphrase !== expectedPassphrase) {
    return Response.json({ error: "Wrong passphrase" }, { status: 401 });
  }

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
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(
        workflowFile
      )}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: branch }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (res.status !== 204) {
      const errText = await res.text();
      return Response.json({ error: `GitHub rejected the trigger: ${errText}` }, { status: 502 });
    }

    return Response.json({ ok: true, message: "Check started — takes about 2-5 minutes." });
  } catch (err) {
    if ((err as any)?.name === "AbortError") {
      return Response.json({ error: "Trigger request timed out" }, { status: 504 });
    }
    return Response.json({ error: "Could not reach GitHub" }, { status: 502 });
  }
}
