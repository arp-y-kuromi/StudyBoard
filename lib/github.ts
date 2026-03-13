const GITHUB_API = "https://api.github.com";

export async function getCommitCount(username: string): Promise<number> {
  const since = new Date();
  since.setMonth(since.getMonth() - 1);

  const url = `${GITHUB_API}/search/commits?q=author:${username}+author-date:>${since.toISOString()}`;
  console.log("🔍 GitHub API URL:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.cloak-preview",
    },
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  console.log("📦 GitHub API response:", JSON.stringify(data, null, 2));

  if (!res.ok) return 0;
  return data.total_count ?? 0;
}
