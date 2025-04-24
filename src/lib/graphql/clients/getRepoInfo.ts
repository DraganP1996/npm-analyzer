import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "@/lib/redis";
import { GraphQLGithubRepository, GraphQLGithubResponse } from "@/types/github";

async function getGithubInfo(
  query: string,
  owner: string,
  repo: string
): Promise<GraphQLGithubRepository | undefined> {
  const res = await fetch(`${process.env.GITHUB_BASE_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
      "User-Agent": "npm-check",
    },
    body: JSON.stringify({
      query,
      variables: { owner, name: repo },
    }),
    next: {
      revalidate: 24 * 60 * 60 * 1000,
    },
  });

  if (!res.ok) {
    console.error("GitHub API error", await res.text());

    return undefined;
  }

  const json: GraphQLGithubResponse = await res.json();

  if (json.errors) {
    console.error("GraphQL errors", json.errors);

    return undefined;
  }

  console.log("CHECK RESPONSE", json);

  console.log("Rate limit", json.data.rateLimit);

  return json.data.repository;
}

export const getGithub = async (packageName: string, query: string, owner: string, repo: string) =>
  await getOrSet<GraphQLGithubRepository | undefined>(
    `${CACHE_TAGS.github}:${packageName}`,
    2 * 24 * 60 * 60,
    () => getGithubInfo(query, owner, repo)
  );
