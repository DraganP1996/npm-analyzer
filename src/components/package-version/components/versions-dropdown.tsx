import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VersionsDropdownProps = {
  defaultVersion: string;
  versions: string[];
  onValueChange: (value: string) => void;
};

export const VersionsDropdown = ({
  defaultVersion,
  versions,
  onValueChange,
}: VersionsDropdownProps) => {
  return (
    <Select defaultValue={defaultVersion} onValueChange={onValueChange}>
      <SelectTrigger className="w-fit lg:w-[180px] p-1 text-xs font-semibold bg-white">
        <SelectValue placeholder="Select a version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Versions</SelectLabel>
          {versions.map((v) => (
            <SelectItem key={`left_${v}`} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
