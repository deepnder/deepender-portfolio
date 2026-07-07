export async function POST(request: Request) {
  const owner = process.env.JOBBOT_GH_OWNER;
  const repo = process.env.JOBBOT_GH_REPO;
  const token = process.env.JOBBOT_GH_TOKEN;
  const expectedPassphrase = process.env.JOBBOT_TRIGGER_PASSPHRASE;

  const body = await request.json().catch(() => ({}));

  if (!expectedPassphrase || body.passphrase !== expectedPassphrase) {
    return Response.json({ error: "Wrong passphrase" }, { status: 401 });
  }

  if (!owner || !repo || !token) {
    return Response.json(
      { error: "Missing JOBBOT_GH_OWNER / JOBBOT_GH_REPO / JOBBOT_GH_TOKEN env vars" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/job_monitor.yml/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: "main" }),
      }
    );

    if (res.status !== 204) {
      const errText = await res.text();
      return Response.json({ error: `GitHub rejected the trigger: ${errText}` }, { status: 502 });
    }

    return Response.json({ ok: true, message: "Check started — takes about 2-5 minutes." });
  } catch (err) {
    return Response.json({ error: "Could not reach GitHub" }, { status: 502 });
  }
}
