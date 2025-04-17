"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { PackageSearch } from "./package-search";
import { NpmSearchResult } from "@/types";
import { searchAPI } from "@/actions";
import { PageContainer } from "../layout";
import { Card, CardContent } from "../ui/card";
import { SearchResult } from "./serch-result";

export const Home = () => {
  const [results, setResults] = useState<NpmSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePackageSearch = async (value: string) => {
    if (value.length === 0) setResults([]);
    if (value.length < 3) return;

    setIsLoading(true);

    const { objects } = await searchAPI(value);

    setIsLoading(false);
    setResults(objects);
  };

  return (
    <PageContainer>
      <div
        className={cn(
          "flex flex-col gap-2 transition-[margin] duration-500 ease-out mx-2 lg:mx-0",
          isLoading || results.length ? "mt-4" : "mt-[calc(50vh-140px)]"
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
      <div className="flex-1 flex flex-col">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <LoaderCircle className="animate-spin text-blue-500" width={54} height={54} />
          </div>
        )}
        {!!results.length && !isLoading && (
          <Card>
            <CardContent className="flex flex-col gap-2">
              {results.map((searchItem) => (
                <SearchResult
                  key={searchItem.package.name}
                  packageName={searchItem.package.name}
                  version={searchItem.package.version}
                  description={searchItem.package.description}
                  dependents={searchItem.dependents}
                />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};
