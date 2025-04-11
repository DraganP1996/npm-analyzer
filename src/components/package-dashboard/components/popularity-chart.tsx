"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DownloadDay } from "@/types";

type PopularityChartProps = {
  config: ChartConfig;
  data: DownloadDay[];
};

type DownloadMonth = {
  month: string;
  downloads: number;
};

const aggregateDownloadsByMonth = (dailyData: DownloadDay[]): DownloadMonth[] => {
  const monthlyAggregation: Record<string, number> = {};

  dailyData.forEach(({ day, downloads }) => {
    const date = new Date(day);
    const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

    monthlyAggregation[monthYear] = (monthlyAggregation[monthYear] || 0) + downloads;
  });

  return Object.entries(monthlyAggregation).map(([month, downloads]) => ({
    month,
    downloads,
  }));
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
        <Area dataKey="downloads" type="natural" fill="black" fillOpacity={0.4} stroke="black" />
      </AreaChart>
    </ChartContainer>
  );
};
