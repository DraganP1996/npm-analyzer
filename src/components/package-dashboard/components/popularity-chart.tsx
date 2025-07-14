"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DownloadDay } from "@/types";
import { aggregateDownloadsByMonth } from "@/utils/aggregateDownloadsByMonth";

type PopularityChartProps = {
  config: ChartConfig;
  data: DownloadDay[];
};

export const PopularityChart = ({ config, data }: PopularityChartProps) => {
  const downloadsByMonth = aggregateDownloadsByMonth(data);

  return (
    <ChartContainer config={config} className="w-full max-h-[200px]">
      <AreaChart accessibilityLayer data={downloadsByMonth}>
        <CartesianGrid vertical={false} />
        <YAxis domain={["0", "dataMax + 1"]} hide />

        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="downloads"
          type="natural"
          fill="oklch(82.8% 0.111 230.318)"
          stroke="oklch(68.5% 0.169 237.323)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
