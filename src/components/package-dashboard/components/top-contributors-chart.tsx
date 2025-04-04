"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { HistoryCommit, RepositoryAuthor } from "@/types/github";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart";
import { TopContributorsLegend } from "./top-contributors-legend";

type TopContributorsChartProps = {
  history: HistoryCommit;
};

export type AuthorWithCommitsTotal = {
  author: RepositoryAuthor;
  commits: number;
};

export const TopContributorsChart = ({ history }: TopContributorsChartProps) => {
  const reducedCommits: AuthorWithCommitsTotal[] = [];

  const chartConfig = {} satisfies ChartConfig;

  history.target.history.nodes.reduce((acc, curr) => {
    if (!curr.author || !curr.author.user) return acc;

    const foundUser = acc.find((commit) => commit.author.login === curr.author!.user!.login);

    if (foundUser) {
      foundUser.commits++;
      return acc;
    }

    acc.push({
      author: curr.author.user,
      commits: 0,
    });

    return acc;
  }, reducedCommits);

  const authorsWithCommitsTotal = reducedCommits
    .filter((author) => !!author.commits)
    .sort((author1, author2) => {
      if (author1.commits > author2.commits) return -1;
      if (author1.commits < author2.commits) return 1;
      return 0;
    })
    .slice(0, 5)
    .map((item, index) => {
      const colors = [
        "oklch(0.282 0.091 267.935)",
        "oklch(0.546 0.245 262.881)",
        "oklch(0.707 0.165 254.624)",
        "oklch(0.882 0.059 254.128)",
        "oklch(0.97 0.014 254.604)",
      ];

      return { ...item, fill: colors[index] };
    });

  const data = authorsWithCommitsTotal.map((item) => {
    return {
      label: item.author.login,
      fill: item.fill,
    };
  });

  return (
    <div className="flex flex-col">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={authorsWithCommitsTotal}
          layout="vertical"
          margin={{
            right: 22,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="author.login"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            hide
          />
          <XAxis dataKey="commits" type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Bar
            dataKey="commits"
            layout="vertical"
            fill="var(--color-desktop)"
            radius={10}
            name="Commits"
          >
            <LabelList
              dataKey="commits"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <TopContributorsLegend data={data} />
    </div>
  );
};
