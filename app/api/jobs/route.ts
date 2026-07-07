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
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/data/jobs_snapshot.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.raw+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json({ error: `GitHub returned ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Could not load job data" }, { status: 502 });
  }
}
