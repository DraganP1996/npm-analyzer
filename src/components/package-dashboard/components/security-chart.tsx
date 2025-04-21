"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { VersionVulnerabilityCounter } from "../sections";

type SecurityChartProps = {
  config: ChartConfig;
  data: VersionVulnerabilityCounter[];
};

export const SecurityChart = ({ config, data }: SecurityChartProps) => {
  return (
    <ChartContainer config={config} className="w-full max-h-[250px]">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <YAxis domain={["0", "dataMax + 1"]} hide />

        <XAxis dataKey="version" tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="count"
          type="linear"
          fill="oklch(82.8% 0.111 230.318)"
          stroke="oklch(68.5% 0.169 237.323)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
