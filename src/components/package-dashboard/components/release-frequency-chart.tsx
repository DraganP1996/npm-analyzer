"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthVersions } from "@/utils";

type ReleaseFrequencyCardProps = {
  config: ChartConfig;
  monthReleases: MonthVersions[];
};

export const ReleaseFrequencyChart = ({ config, monthReleases }: ReleaseFrequencyCardProps) => {
  return (
    <ChartContainer config={config} className="w-full min-h-[200px] max-h-[340px]">
      <BarChart accessibilityLayer data={monthReleases}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={5} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total" radius={4} fill="oklch(50% 0.134 242.749)" />
      </BarChart>
    </ChartContainer>
  );
};
