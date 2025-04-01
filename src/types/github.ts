type RepoFlags = {
  isArchived: boolean;
  idDisabled: boolean;
  isEmpty: boolean;
  isFork: boolean;
  isInOrganization: boolean;
  isLocked: boolean;
  isSecurityPolicyEnabled: boolean;
};

type RepoCount = {
  forkCount: number;
  stargazerCount: number;
  watchers: {
    totalCount: number;
  };
};

type RepositoryAuthor = {
  avatarUrl: string;
  login: string;
  url: string;
};

type RepositoryDiscussion = {
  id: string;
  title: string;
  author?: RepositoryAuthor;
  createdAt: string;
  url: string;
};

type WithNodes<NodeType> = {
  totalCount: number;
  nodes: NodeType[];
};

type RepositoryIssue = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  state: "OPEN";
  url: string;
  author?: RepositoryAuthor;
};

type RepositoryMilestone = {
  title: string;
  description: string;
  state: "OPEN" | "CLOSED";
  updatedAt: string;
  url: string;
  progressPercentage: number;
};

type RepositoryPullRequest = {
  id: string;
  title: string;
  url: string;
  state: "OPEN" | "CLOSED";
  changedFiles: number;
  createdAt: string;
  author?: RepositoryAuthor;
};

type RepositoryCommit = {
  id: string;
  message: string;
  messageBody: string;
  url: string;
  committedDate: string;
  author?: {
    name: string;
    user?: {
      avatarUrl: string;
      name: string;
      url: string;
    };
  };
};

type RepositoryDefaultBranch = {
  name: string;
  refUpdateRule: {
    allowsDeletions?: boolean;
    allowsForcePushes?: boolean;
    requiresCodeOwnerReviews?: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: WithNodes<any>;
  target: {
    commitUrl: string;
    history: {
      nodes: RepositoryCommit[];
    };
  };
};

export type GraphQLGithubRepository = {
  createdAt: string;
  homepageUrl: string;
  pushedAt: string;
  discussions: WithNodes<RepositoryDiscussion>;
  fundingLinks: unknown[];
  issues: WithNodes<RepositoryIssue>;
  milestones: WithNodes<RepositoryMilestone>;
  pullRequests: WithNodes<RepositoryPullRequest>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vulnerabilityAlerts: any;
  defaultBranchRef: RepositoryDefaultBranch;
  owner: {
    login: string;
    url: string;
  };
} & RepoFlags &
  RepoCount;

export type GraphQLGithubResponse = {
  data: {
    repository: GraphQLGithubRepository;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
};
