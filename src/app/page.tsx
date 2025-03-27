"use client";

import { searchAPI } from "@/actions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { columns } from "@/components/packages-search-results/columns";
import { DataTable } from "@/components/packages-search-results/data-table";
import { PackageSearch } from "@/components/home";
import { NpmSearchResult } from "@/types";

export default function Home() {
  const [results, setResults] = useState<NpmSearchResult[]>([]);

  const handlePackageSearch = async (value: string) => {
    if (value.length === 0) setResults([]);
    if (value.length < 3) return;

    const { objects } = await searchAPI(value);
    setResults(objects);
  };

  return (
    <div
      className={cn(
        "grid-cols-1 justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]",
        results.length ? "items-start py-2 px-4" : "items-center content-center p-8 pb-20"
      )}
    >
      <main className={cn("flex flex-col gap-3 sm:items-start")}>
        <h1 className="font-bold text-6xl text-center text-gray-600"> NPM Checker</h1>
        <PackageSearch onSearchChange={handlePackageSearch} />
        {!!results.length && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={results} />
          </div>
        )}
      </main>
    </div>
  );
}
