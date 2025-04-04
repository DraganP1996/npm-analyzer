"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type VersionsChartProps<ChartData> = {
  chartConfig: ChartConfig;
  data: ChartData[];
  dataKey: string;
};

export function VersionsChart<ChartData>({
  chartConfig,
  data,
  dataKey,
}: VersionsChartProps<ChartData>) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="version" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Area
          dataKey={dataKey}
          type="natural"
          fill="oklch(70.7% 0.165 254.624)"
          fillOpacity={0.4}
          stroke="oklch(54.6% 0.245 262.881)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
