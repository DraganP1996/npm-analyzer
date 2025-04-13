import { SimpleCard } from "../../ui/simple-card";

type ReposGeneralInfoProps = {
  defaultBranchName: string;
  isLocked: boolean;
  isArchived: boolean;
  isDisabled: boolean;
  isSecurityPolicyEnabled: boolean;
  isFork: boolean;
};

export const ReposGeneralInfo = ({
  defaultBranchName,
  isLocked,
  isArchived,
  isDisabled,
  isSecurityPolicyEnabled,
  isFork,
}: ReposGeneralInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <SimpleCard title="Default Branch">{defaultBranchName}</SimpleCard>
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
