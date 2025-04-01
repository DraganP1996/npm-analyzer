import { EyeIcon, GitFork, StarIcon } from "lucide-react";
import { ValueCard } from "./value-card";

type RepositoryLeadingInfoProps = {
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

export const RepositoryLeadingInfo = ({
  defaultBranchName,
  stars,
  forks,
  watchers,
  isLocked,
  isArchived,
  isDisabled,
  isSecurityPolicyEnabled,
  isFork,
}: RepositoryLeadingInfoProps) => {
  return (
    <div className="flex flex-row gap-2">
      <ValueCard title="Default Branch">{defaultBranchName}</ValueCard>
      <ValueCard title="Stars">
        <div className="flex flex-row items-center justify-center gap-1">
          <StarIcon /> {stars}
        </div>
      </ValueCard>
      <ValueCard title="Forks">
        <div className="flex flex-row items-center justify-center gap-1">
          <GitFork /> {forks}
        </div>
      </ValueCard>
      <ValueCard title="Watchers">
        <div className="flex flex-row items-center justify-center gap-1">
          <EyeIcon /> {watchers}
        </div>
      </ValueCard>
      <ValueCard title="Is Archived?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isArchived ? "YES" : "NO"}
        </span>
      </ValueCard>
      <ValueCard title="Is Disabled?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isDisabled ? "YES" : "NO"}
        </span>
      </ValueCard>
      <ValueCard title="Is Fork?"> {isFork ? "YES" : "NO"} </ValueCard>
      <ValueCard title="Is Locked?">
        <span className={isLocked ? "text-red-600" : "text-green-600 font-bold"}>
          {isLocked ? "YES" : "NO"}
        </span>
      </ValueCard>
      <ValueCard title="Security Policy Enabled?">
        <span className={isSecurityPolicyEnabled ? "text-red-600" : "text-green-600 font-bold"}>
          {isSecurityPolicyEnabled ? "YES" : "NO"}
        </span>
      </ValueCard>
    </div>
  );
};
