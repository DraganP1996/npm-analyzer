import { GraphQLGithubRepository, GraphQLGithubResponse } from "@/types/github";

export async function getBranchInfo(
  query: string,
  owner: string,
  repo: string
): Promise<GraphQLGithubRepository> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { owner, name: repo },
    }),
  });

  if (!res.ok) {
    console.error("GitHub API error", await res.text());
    throw new Error("GitHub API error");
  }

  const json: GraphQLGithubResponse = await res.json();

  if (json.errors) {
    console.error("GraphQL errors", json.errors);
    throw new Error("GraphQL error");
  }

  console.log("CHECK RESPONSE", json);

  return json.data.repository;
}
