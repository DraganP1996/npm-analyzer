import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { getPercentualDifference } from "@/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type VersionCellProps = {
  currentValue?: number;
  previousValue?: number;
  positiveDiffClassName: string;
  negativeDiffClassName: string;
  formatValue?: (value: number) => string;
  tooltipContent?: string;
};

export function VersionCell({
  currentValue,
  previousValue,
  positiveDiffClassName,
  negativeDiffClassName,
  tooltipContent,
  formatValue,
}: VersionCellProps) {
  if (currentValue === undefined) return <div className="text-right px-2"> N/A </div>;

  if (previousValue === undefined) {
    return tooltipContent ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-right">
            <div className="text-right w-full">
              {formatValue ? formatValue(currentValue) : currentValue}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <div className="text-right w-full">
        {formatValue ? formatValue(currentValue) : currentValue}
      </div>
    );
  }

  const percentageDiff = getPercentualDifference(currentValue as number, previousValue as number);
  const percetageDiffRounded = Math.round(percentageDiff * 10) / 10;

  return (
    <div className="flex flex-row items-center justify-end gap-2">
      <DifferenceSpan
        showPercentage={
          percentageDiff !== 0 &&
          !!(!formatValue || formatValue(currentValue) !== formatValue(previousValue))
        }
        percentageDiff={percetageDiffRounded}
        positiveDiffClassName={positiveDiffClassName}
        negativeDiffClassName={negativeDiffClassName}
      />
      {tooltipContent ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="w-16 text-right">
                {formatValue ? formatValue(currentValue) : currentValue}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="w-16 text-right">
          {formatValue ? formatValue(currentValue) : currentValue}
        </span>
      )}
    </div>
  );
}

type DifferenceSpanProps = {
  showPercentage: boolean;
  percentageDiff: number;
  positiveDiffClassName: string;
  negativeDiffClassName: string;
};

export const DifferenceSpan = ({
  showPercentage,
  percentageDiff,
  positiveDiffClassName,
  negativeDiffClassName,
}: DifferenceSpanProps) => {
  return (
    showPercentage && (
      <span
        className={cn(
          percentageDiff > 0 ? positiveDiffClassName : negativeDiffClassName,
          "flex flex-row items-center gap-1 text-[10px] font-semibold"
        )}
      >
        {percentageDiff > 0 && <TrendingUp width={16} height={16} />}
        {percentageDiff < 0 && <TrendingDown width={16} height={16} />}
        {!!percentageDiff && `${percentageDiff}%`}
      </span>
    )
  );
};
