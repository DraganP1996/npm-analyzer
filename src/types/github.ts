type RepoFlags = {
  isArchived: boolean;
  idDisabled: boolean;
  isEmpty: boolean;
  isFork: boolean;
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

export type RepositoryAuthor = {
  avatarUrl: string;
  login: string;
  url: string;
};

export type RepositoryDiscussion = {
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

export type RepositoryIssue = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  state: "OPEN";
  url: string;
  author?: RepositoryAuthor;
};

export type RepositoryMilestone = {
  title: string;
  description: string;
  state: "OPEN" | "CLOSED";
  updatedAt: string;
  url: string;
  progressPercentage: number;
};

export type RepositoryPullRequest = {
  id: string;
  title: string;
  url: string;
  state: "OPEN" | "CLOSED";
  changedFiles: number;
  createdAt: string;
  author?: RepositoryAuthor;
};

export type RepositoryCommit = {
  id: string;
  message: string;
  messageBody: string;
  url: string;
  committedDate: string;
  author?: {
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
    history: {
      nodes: RepositoryCommit[];
    };
  };
};

export type HistoryCommit = {
  target: {
    history: {
      nodes: {
        committedDate: string;
        author?: {
          user?: RepositoryAuthor;
        };
      }[];
    };
  };
};

export type GraphQLGithubRepository = {
  createdAt: string;
  homepageUrl: string;
  pushedAt: string;
  discussions: WithNodes<RepositoryDiscussion>;
  issues: WithNodes<RepositoryIssue>;
  milestones: WithNodes<RepositoryMilestone>;
  pullRequests: WithNodes<RepositoryPullRequest>;
  last10Commits: RepositoryDefaultBranch;
  commitsHistory: HistoryCommit;
  owner: {
    login: string;
    url: string;
  };
} & RepoFlags &
  RepoCount;

export type GraphQLGithubResponse = {
  data: {
    repository: GraphQLGithubRepository;
    rateLimit: unknown;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
};
