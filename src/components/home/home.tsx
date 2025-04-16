"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { PackageSearch } from "./package-search";
import { NpmSearchResult } from "@/types";
import { searchAPI } from "@/actions";
import { PageContainer } from "../layout";
import { LoaderCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { compactNumberFormatter } from "@/utils";

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
                <Link
                  key={searchItem.package.name}
                  className="p-4 border rounded-xl flex flex-col gap-2 bg-blue-50/30 hover:bg-blue-100"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${searchItem.package.name}`}
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-semibold">{searchItem.package.name}</span>
                      <p className="leading-4 text-sm text-gray-500 line-clamp-3">
                        {searchItem.package.description}
                      </p>
                    </div>
                    <div className="">
                      <Badge> {searchItem.package.version} </Badge>
                    </div>
                  </div>
                  <p className="text-xs">
                    {" "}
                    N. of dependent packages:{" "}
                    <span className="font-semibold">
                      {compactNumberFormatter(searchItem.dependents)}
                    </span>
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};
