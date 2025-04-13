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
  if (currentValue === undefined)
    return <div className="text-right text-xs lg:text-sm w-full"> N/A </div>;

  if (previousValue === undefined) {
    return tooltipContent ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-right w-full">
            <div className="text-right w-full text-xs lg:text-sm">
              {formatValue ? formatValue(currentValue) : currentValue}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <div className="text-right w-full text-xs lg:text-sm">
        {formatValue ? formatValue(currentValue) : currentValue}
      </div>
    );
  }

  const percentageDiff = getPercentualDifference(currentValue as number, previousValue as number);
  const percetageDiffRounded = Math.round(percentageDiff * 10) / 10;

  return (
    <div className="flex flex-row items-center justify-end gap-0 lg:gap-2 text-xs lg:text-sm">
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
              <span className="w-6 lg:w-16 text-right">
                {formatValue ? formatValue(currentValue) : currentValue}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="w-6 lg:w-16 text-right">
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
      <>
        <span
          className={cn(
            percentageDiff > 0 ? positiveDiffClassName : negativeDiffClassName,
            "hidden lg:flex flex-row items-center gap-1 text-[8px] lg:text-[10px] font-semibold"
          )}
        >
          {percentageDiff > 0 && <TrendingUp width={16} height={16} />}
          {percentageDiff < 0 && <TrendingDown width={16} height={16} />}
          {!!percentageDiff && `${percentageDiff}%`}
        </span>
        <span
          className={cn(
            percentageDiff > 0 ? positiveDiffClassName : negativeDiffClassName,
            "flex: lg:hidden flex-row items-center gap-1 text-[8px] lg:text-[10px] font-semibold"
          )}
        >
          {percentageDiff > 0 && <TrendingUp width={8} height={8} />}
          {percentageDiff < 0 && <TrendingDown width={8} height={8} />}
          {!!percentageDiff && `${percentageDiff}%`}
        </span>
      </>
    )
  );
};
