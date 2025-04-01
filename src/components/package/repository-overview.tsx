import { SectionHeader } from "./section-header";
import { ComplexCard } from "./complex-card";
import { GraphQLGithubRepository } from "@/types/github";
import { RepositoryLeadingInfo } from "./repositor-leading-info";
import { ListItemWithDateAuthor } from "../ui/list-item-with-date-author";

type RepositoryOverviewProps = {
  repository: GraphQLGithubRepository;
};

export const RepositoryOverview = ({ repository }: RepositoryOverviewProps) => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  const {
    defaultBranchRef,
    stargazerCount,
    forkCount,
    watchers,
    isArchived,
    isLocked,
    idDisabled,
    isFork,
    isSecurityPolicyEnabled,
    pullRequests,
    issues,
    discussions,
  } = repository;

  const leadingInfoProps = {
    defaultBranchName: defaultBranchRef.name,
    stars: formatter.format(stargazerCount),
    forks: formatter.format(forkCount),
    watchers: formatter.format(watchers.totalCount),
    isLocked,
    isArchived,
    isDisabled: idDisabled,
    isSecurityPolicyEnabled,
    isFork,
  };

  const latestCommits = defaultBranchRef.target.history.nodes;
  const latestPullRequests = pullRequests.nodes;
  const openIssues = issues.nodes;
  const openDiscussions = discussions.nodes;

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Repository Overview</h2>
      </SectionHeader>
      <RepositoryLeadingInfo {...leadingInfoProps} />

      <div className="grid grid-cols-[3fr_1fr] gap-2">
        <ComplexCard
          title="Latest Commits"
          description="Last 10 commits in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[300px] overflow-auto"
        >
          {latestCommits?.map((commit) => (
            <ListItemWithDateAuthor
              key={commit.id}
              text={commit.message}
              url={commit.url}
              authorLink={commit.author?.user?.url}
              avatarUrl={commit.author?.user?.avatarUrl}
              authorName={commit.author?.name || commit.author?.user?.name}
              date={commit.committedDate}
            />
          ))}
        </ComplexCard>
        <ComplexCard
          title="Top Contributors"
          description="The top contributors considering the last 100 commits & PRs"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[300px] overflow-auto"
        >
          Maybe the 5 most popular contributors in the last X days ? Maybe mixing authors of commits
          & PRs ?
        </ComplexCard>
      </div>
      <div className="grid grid-cols-[3fr_1.5fr_2.5fr] gap-2">
        <ComplexCard
          title={`Open PRs (${pullRequests.totalCount})`}
          description="Currently active PR in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[250px] overflow-auto"
        >
          {latestPullRequests?.map((pr) => (
            <ListItemWithDateAuthor
              key={pr.id}
              text={pr.title}
              url={pr.url}
              authorLink={pr.author?.url}
              avatarUrl={pr.author?.avatarUrl}
              authorName={pr.author?.login}
              date={pr.createdAt}
            />
          ))}
        </ComplexCard>
        <ComplexCard
          title="PR Closing Timeline"
          description="The average time for closing PRs in the repo"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[250px] overflow-auto"
        >
          Maybe the 5 most popular committers ?
        </ComplexCard>
        <ComplexCard
          title={`Open Issues (${repository.issues.totalCount})`}
          description="Currently active PR in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[250px] overflow-auto"
        >
          {openIssues?.map((issue) => (
            <ListItemWithDateAuthor
              key={issue.id}
              text={issue.title}
              url={issue.url}
              authorLink={issue.author?.url}
              avatarUrl={issue.author?.avatarUrl}
              authorName={issue.author?.login}
              date={issue.createdAt}
            />
          ))}
        </ComplexCard>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <ComplexCard
          title={`Open Discussions (${discussions.totalCount})`}
          description="Currently open discussions in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[360px] overflow-auto"
        >
          {openDiscussions?.map((discussion) => (
            <ListItemWithDateAuthor
              key={discussion.id}
              text={discussion.title}
              url={discussion.url}
              authorLink={discussion.author?.url || ""}
              avatarUrl={discussion.author?.avatarUrl || ""}
              authorName={discussion.author?.login || ""}
              date={discussion.createdAt}
            />
          ))}
        </ComplexCard>
      </div>
    </div>
  );
};
