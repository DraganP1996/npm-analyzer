"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { groupVersionsByMonth } from "@/utils";
import { ComplexCard } from "./complex-card";

type ReleaseFrequencyCardProps = {
  history: Record<string, string>;
};

export const ReleaseFrequencyCard = ({ history }: ReleaseFrequencyCardProps) => {
  const monthReleases = groupVersionsByMonth(history);

  console.log("Month releases", monthReleases);

  const chartConfig = {
    total: {
      label: "Number of releases",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ComplexCard
      title="Release Frequency"
      description="Historycal data about package versions"
      showInfoIcon
      className="w-full"
      contentClassName=""
    >
      <ChartContainer config={chartConfig} className="w-full min-h-[200px] max-h-[340px]">
        <BarChart accessibilityLayer data={monthReleases}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={5} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ComplexCard>
  );
};
