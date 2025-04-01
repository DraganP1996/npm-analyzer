export const getRepoInfoQuery = `query ($owner: String!, $name: String!) {
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
    discussions(last:100 states:OPEN) {
      totalCount
      nodes {
        	id
          title
          author {
            login
            url
            avatarUrl
          }
        createdAt
        url
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
    issues(first: 10, states: OPEN, orderBy: { field: CREATED_AT, direction: DESC }) {
      totalCount
      nodes {
        id
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
    pullRequests(last: 10, states: OPEN) {
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
        url
        title
        state
      }
    }
    pushedAt
    stargazerCount
    vulnerabilityAlerts(first: 100) {
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
     ... on RepositoryInfo {
      owner {
        login
        url
      }
    }
  }
}`;
