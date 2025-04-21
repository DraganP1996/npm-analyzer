"use client";

import { NpmPackageVersion } from "@/types";
import { filterStableVersions, formatBytes } from "@/utils";
import { VersionsDropdown } from "../components";
import { ComplexCard } from "@/components/ui/complex-card";
import { useCallback, useState } from "react";

type VersionsCompareProps = {
  versions: Record<string, NpmPackageVersion>;
  currVersion: string;
};

export const VersionsCompare = ({ currVersion, versions }: VersionsCompareProps) => {
  const versionsList = filterStableVersions(
    Object.keys(versions).map((version) => versions[version].version)
  );
  const currVersionIndex = versionsList.findIndex((v) => v === currVersion);
  const [currVersionMetadata, setCurrVersionMetada] = useState(versions[currVersion]);
  const [prevVersion, setPrevVersion] = useState(versions[versionsList[currVersionIndex + 1]]);

  const handleCurrentVersionChange = useCallback(
    (value: string) => {
      const foundVersionIndex = versionsList.findIndex((v) => v === value);

      if (foundVersionIndex < 0) return;

      setCurrVersionMetada(versions[versionsList[foundVersionIndex]]);
    },
    [versions, versionsList]
  );

  const handlePrevVersionChange = useCallback(
    (value: string) => {
      const foundVersionIndex = versionsList.findIndex((v) => v === value);

      if (foundVersionIndex < 0) return;

      setPrevVersion(versions[versionsList[foundVersionIndex]]);
    },
    [versions, versionsList]
  );

  return (
    <ComplexCard
      title="Comparision With Previous Version"
      description="Identify the differences between the current version of the package and the previous one."
    >
      <div className="">
        <div className="grid bg-gray-50 p-1 lg:p-2 rounded-xl border text-xs lg:text-sm">
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Version </div>
            <VersionsDropdown
              defaultVersion={currVersion}
              versions={versionsList}
              onValueChange={handleCurrentVersionChange}
            />
            <VersionsDropdown
              defaultVersion={prevVersion.version}
              versions={versionsList}
              onValueChange={handlePrevVersionChange}
            />
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Dependencies </div>
            <div className="p-2">{Object.keys(currVersionMetadata.dependencies || {}).length}</div>
            <div className="p-2">{Object.keys(prevVersion.dependencies || {}).length}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Dev Dependencies </div>
            <div className="p-2">
              {Object.keys(currVersionMetadata.devDependencies || {}).length}
            </div>
            <div className="p-2">{Object.keys(prevVersion.peerDependencies || {}).length}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Peer Dependencies </div>
            <div className="p-2">
              {Object.keys(currVersionMetadata.devDependencies || {}).length}
            </div>
            <div className="p-2">{Object.keys(prevVersion.peerDependencies || {}).length}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Distributed Files </div>
            <div className="p-2">{currVersionMetadata.dist.fileCount || "N/A"}</div>
            <div className="p-2">{prevVersion.dist.fileCount || "N/A"}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 font-semibold"> Unpacked Size </div>
            <div className="p-2">
              {currVersionMetadata.dist.unpackedSize !== undefined
                ? formatBytes(currVersionMetadata.dist.unpackedSize)
                : "N/A"}
            </div>
            <div className="p-2">
              {prevVersion.dist.unpackedSize !== undefined
                ? formatBytes(prevVersion.dist.unpackedSize)
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </ComplexCard>
  );
};
