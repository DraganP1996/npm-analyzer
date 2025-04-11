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
          <StarIcon /> {stars}
        </div>
      </SimpleCard>
      <SimpleCard title="GH Forks">
        <div className="flex flex-row items-center justify-center gap-1">
          <GitFork /> {forks}
        </div>
      </SimpleCard>
      <SimpleCard title="GH Watchers">
        <div className="flex flex-row items-center justify-center gap-1">
          <EyeIcon /> {watchers}
        </div>
      </SimpleCard>
    </div>
  );
};
