// lib/github.ts
export async function getBranchInfo(owner: string, repo: string) {
  const query = `
    query ($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        createdAt
        defaultBranchRef {
          name
          refUpdateRule {
            allowsDeletions
            allowsForcePushes
            requiresCodeOwnerReviews
          }
          rules(first: 100) {
            totalCount
            nodes {
              type
            }
          }
          target {
            commitUrl
            ... on Commit {
              history(first: 10) {
                nodes {
                  id
                  committedDate
                  message
                  messageBody
                  url
                  author {
                    name
                    user {
                      url
                      avatarUrl
                      name
                    }
                  }
                }
              }
            }
          }
        }
        refs(refPrefix: "refs/heads/",first:100 orderBy: { field: TAG_COMMIT_DATE direction:DESC}) {
          totalCount
          nodes {
            name
            branchProtectionRule {
              allowsDeletions
              allowsForcePushes
            }
          }
        }
        discussions(first:100) {
          totalCount
          edges {
            node {
              title
            }
          }
        }
        forkCount
        fundingLinks {
          url
        }
        homepageUrl
        isArchived
        isDisabled
        isEmpty
        isFork
        isLocked
        isInOrganization
        isSecurityPolicyEnabled
        issues(first: 10 states:OPEN orderBy: {field:CREATED_AT direction: DESC}) {
          totalCount
          nodes {
            title
            body
            createdAt
            state
            url
            author {
              avatarUrl
              login
              url    
            }
          }
        }
        openGraphImageUrl
        pullRequests (last: 10 states:OPEN) {
          totalCount
            nodes {
              id
              createdAt
              changedFiles
              author {
                avatarUrl
                login
                url
              }
              permalink
              url
              title
              state
            }
        }
        pushedAt
        stargazerCount
        vulnerabilityAlerts(first:100) {
          totalCount
          nodes {
            createdAt
            fixedAt
            state
          }
        }
        watchers {
          totalCount
        }
        milestones(first: 100) {
          totalCount
          nodes {
            title
            description
            progressPercentage
            url
            updatedAt
            state
          }
        }
      } 
    }
  `;

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

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors", json.errors);
    throw new Error("GraphQL error");
  }

  return json.data.repository;
}
