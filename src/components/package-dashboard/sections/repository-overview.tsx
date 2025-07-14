import { SectionHeader, TopContributorsChart } from "../components";
import { GraphQLGithubRepository } from "@/types/github";
import { ReposGeneralInfo } from "./repos-general-info";
import { ListItemWithDateAuthor } from "@/components/ui/list-item-with-date-author";
import { ComplexCard } from "@/components/ui/complex-card";
import { CardNoData } from "@/components/ui/card-no-data";
import { compactNumberFormatter } from "@/utils";

type RepositoryOverviewProps = {
  repository: GraphQLGithubRepository;
};

export const RepositoryOverview = ({ repository }: RepositoryOverviewProps) => {
  const {
    last10Commits,
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
    commitsHistory,
  } = repository;

  const leadingInfoProps = {
    defaultBranchName: last10Commits.name,
    stars: compactNumberFormatter(stargazerCount),
    forks: compactNumberFormatter(forkCount),
    watchers: compactNumberFormatter(watchers.totalCount),
    isLocked,
    isArchived,
    isDisabled: idDisabled,
    isSecurityPolicyEnabled,
    isFork,
  };

  const latestCommits = last10Commits.target.history.nodes;
  const latestPullRequests = pullRequests.nodes;
  const openIssues = issues.nodes;
  const openDiscussions = discussions.nodes;

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-xl lg:text-3xl font-semibold"> Repository Overview</h2>
      </SectionHeader>
      <ReposGeneralInfo {...leadingInfoProps} />

      <div className="grid gird-cols-1 lg:grid-cols-[1.7fr_1fr] gap-2">
        <ComplexCard
          title="Latest Commits"
          description="Last 10 commits in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[300px] overflow-auto"
        >
          {!latestCommits.length && <CardNoData content="There are not commits to display" />}
          {latestCommits.length &&
            latestCommits?.map((commit) => (
              <ListItemWithDateAuthor
                key={commit.id}
                text={commit.message}
                url={commit.url}
                authorLink={commit.author?.user?.url}
                avatarUrl={commit.author?.user?.avatarUrl}
                authorName={commit.author?.user?.name}
                date={commit.committedDate}
              />
            ))}
        </ComplexCard>
        <ComplexCard
          title="Top Contributors"
          description="The top contributors considering the last 100 commits & PRs"
          showInfoIcon
          className="w-full h-full"
          contentClassName="overflow-auto max-h-[410px] w-full"
        >
          <TopContributorsChart history={commitsHistory} />
        </ComplexCard>
      </div>
      <div className="grid gird-cols-1 lg:grid-cols-[3fr_2.5fr] gap-2">
        <ComplexCard
          title={`Open PRs (${pullRequests.totalCount})`}
          description="Currently active PR in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[250px] overflow-auto"
        >
          {!latestPullRequests.length && <CardNoData content="There are not PRs to display" />}
          {latestPullRequests.length &&
            latestPullRequests?.map((pr) => (
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
          title={`Open Issues (${repository.issues.totalCount})`}
          description="Currently active PR in the repository"
          showInfoIcon
          contentClassName="min-h-[200px] max-h-[250px] overflow-auto"
        >
          {!openIssues.length && <CardNoData content="There are not issues to display" />}
          {openIssues.length &&
            openIssues?.map((issue) => (
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
          {!openDiscussions.length && <CardNoData content="There are not discussions to display" />}
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
    </section>
  );
};
