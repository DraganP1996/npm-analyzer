import { EyeIcon, GitFork, StarIcon } from "lucide-react";

import { SimpleCard } from "../../ui/simple-card";

type ReposGeneralInfoProps = {
  defaultBranchName: string;
  stars: string;
  forks: string;
  watchers: string;
  isLocked: boolean;
  isArchived: boolean;
  isDisabled: boolean;
  isSecurityPolicyEnabled: boolean;
  isFork: boolean;
};

export const ReposGeneralInfo = ({
  defaultBranchName,
  stars,
  forks,
  watchers,
  isLocked,
  isArchived,
  isDisabled,
  isSecurityPolicyEnabled,
  isFork,
}: ReposGeneralInfoProps) => {
  return (
    <div className="flex flex-row gap-2">
      <SimpleCard title="Default Branch">{defaultBranchName}</SimpleCard>
      <SimpleCard title="Stars">
        <div className="flex flex-row items-center justify-center gap-1">
          <StarIcon /> {stars}
        </div>
      </SimpleCard>
      <SimpleCard title="Forks">
        <div className="flex flex-row items-center justify-center gap-1">
          <GitFork /> {forks}
        </div>
      </SimpleCard>
      <SimpleCard title="Watchers">
        <div className="flex flex-row items-center justify-center gap-1">
          <EyeIcon /> {watchers}
        </div>
      </SimpleCard>
      <SimpleCard title="Is Archived?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isArchived ? "YES" : "NO"}
        </span>
      </SimpleCard>
      <SimpleCard title="Is Disabled?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isDisabled ? "YES" : "NO"}
        </span>
      </SimpleCard>
      <SimpleCard title="Is Fork?"> {isFork ? "YES" : "NO"} </SimpleCard>
      <SimpleCard title="Is Locked?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isLocked ? "YES" : "NO"}
        </span>
      </SimpleCard>
      <SimpleCard title="Security Policy Enabled?">
        <span className={!isSecurityPolicyEnabled ? "text-red-600" : "text-green-600 font-bold"}>
          {isSecurityPolicyEnabled ? "YES" : "NO"}
        </span>
      </SimpleCard>
    </div>
  );
};
