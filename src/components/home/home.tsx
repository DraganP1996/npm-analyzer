"use client";

import { cn } from "@/lib/utils";
import { PackageSearch } from "./package-search";
import { useState } from "react";
import { NpmSearchResult } from "@/types";
import { searchAPI } from "@/actions";
import { Row } from "@tanstack/react-table";
import { DataTable } from "../packages-search-results/data-table";
import { columns } from "../packages-search-results/columns";
import { useRouter } from "next/navigation";

export const Home = () => {
  const [results, setResults] = useState<NpmSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlePackageSearch = async (value: string) => {
    if (value.length === 0) setResults([]);
    if (value.length < 3) return;

    setIsLoading(true);

    const { objects } = await searchAPI(value);

    setIsLoading(false);
    setResults(objects);
  };

  const handleRowClick = (row: Row<NpmSearchResult>) => {
    const name = row.original.package.name;

    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/package/${name}`);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-2 transition-transform duration-500 ease-out mx-2 lg:mx-0",
          isLoading || results.length ? "mt-0" : "mt-12"
        )}
      >
        <h1
          className="text-2xl sm:text-2xl lg:text-4xl"
          style={{ fontFamily: "var(--font-sigmar)" }}
        >
          Analyze dependencies, vulnerabilities & more
        </h1>
        <PackageSearch onSearchChange={handlePackageSearch} />
      </div>
      {!!results.length && (
        <div className="container mx-auto py-10 transition-all duration-500">
          <DataTable columns={columns} data={results} onRowClick={handleRowClick} />
        </div>
      )}
    </>
  );
};
