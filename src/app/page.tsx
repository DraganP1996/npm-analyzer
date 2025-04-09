"use client";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { searchAPI } from "@/actions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { columns } from "@/components/packages-search-results/columns";
import { DataTable } from "@/components/packages-search-results/data-table";
import { PackageSearch } from "@/components/home";
import { NpmSearchResult } from "@/types";

export default function Home() {
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
    <div
      className={cn("flex-1 flex flex-col gap-16 font-[family-name:var(--font-geist-sans)]")}
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_URL}/pattern2.png')`,
      }}
    >
      <main className={cn("flex-1 flex flex-col gap-3 items-center justify-center")}>
        <div
          className={cn(
            "flex flex-col gap-2 transition-transform duration-500 ease-out",
            isLoading || results.length ? "mt-0" : "mt--12"
          )}
        >
          <h1 className="text-4xl" style={{ fontFamily: "var(--font-sigmar)" }}>
            {" "}
            Analyze dependencies, vulnerabilities & more{" "}
          </h1>
          <PackageSearch onSearchChange={handlePackageSearch} />
        </div>
        {!!results.length && (
          <div className="container mx-auto py-10 transition-all duration-500">
            <DataTable columns={columns} data={results} onRowClick={handleRowClick} />
          </div>
        )}
      </main>
    </div>
  );
}
