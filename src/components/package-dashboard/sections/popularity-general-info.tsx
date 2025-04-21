import { SimpleCard } from "@/components/ui/simple-card";
import { EyeIcon, GitFork, StarIcon } from "lucide-react";

type PopularityGeneralInfoProps = {
  stars?: string;
  forks?: string;
  watchers?: string;
};

export const PopularityGeneralInfo = ({ stars, forks, watchers }: PopularityGeneralInfoProps) => {
  return (
    <div className="flex flex-row gap-2">
      <SimpleCard title="GH Stars">
        <div className="flex flex-row items-center justify-center gap-1">
          <StarIcon fill="oklch(90.5% 0.182 98.111)" stroke="oklch(90.5% 0.182 98.111)" /> {stars}
        </div>
      </SimpleCard>
      <SimpleCard title="GH Forks">
        <div className="flex flex-row items-center justify-center gap-1">
          <GitFork stroke="oklch(76.5% 0.177 163.223)" /> {forks}
        </div>
      </SimpleCard>
      <SimpleCard title="GH Watchers">
        <div className="flex flex-row items-center justify-center gap-1">
          <EyeIcon stroke="oklch(66.6% 0.179 58.318)" /> {watchers}
        </div>
      </SimpleCard>
    </div>
  );
};
