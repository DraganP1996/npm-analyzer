"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "../ui/input";
import { debounce } from "@/utils";
import { cn } from "@/lib/utils";

type PackageSearchProps = {
  onSearchChange: (value: string) => void;
  className?: string;
};

export const PackageSearch = ({ className, onSearchChange }: PackageSearchProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;

    debouncedChange(eventValue);
    setValue(eventValue);
  }, []);

  const debouncedChange = debounce(onSearchChange, 500);

  const handleClear = () => {
    setValue("");
    onSearchChange("");
  };

  return (
    <div
      className={cn("flex flex-row items-center border-gray-400 border-4 rounded-2xl pr-4 shadow")}
    >
      <Input
        type="search"
        className={cn(
          "flex-1 text-2xl md:text-4xl w-2xl px-6 py-8 text-gray-500 font-bold border-transparent focus:border-transparent focus:ring-0 focus:outline-none focus-within:border-transparent focus-within:ring-0 focus-within:outline-none focus-visible:outline-none focus-visible:border-transparent focus-visible:ring-0",
          className
        )}
        placeholder="Search for a npm package..."
        onChange={handleChange}
        value={value}
      />
      {!value && <SearchIcon className="w-[50px] h-[50px] text-gray-400" />}
      {value && (
        <XIcon className="w-[50px] h-[50px] text-gray-400 cursor-pointer" onClick={handleClear} />
      )}
    </div>
  );
};
