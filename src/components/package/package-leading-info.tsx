import Link from "next/link";

import { ValueCard } from "./value-card";

type PackageLeadingInfoProps = {
  unpackedSize: string;
  packedSize: string;
  licence: string;
  authorLink?: string;
  lastActivity: string;
  authorName: string;
};

export const PackageLeadingInfo = ({
  unpackedSize,
  packedSize,
  licence,
  authorLink,
  lastActivity,
  authorName,
}: PackageLeadingInfoProps) => {
  return (
    <div className="flex flex-row gap-3">
      <ValueCard title="Weekly Downloads">322K</ValueCard>
      <ValueCard title="Unpacked Size">{unpackedSize}</ValueCard>
      <ValueCard title="Packed Size">{packedSize}</ValueCard>
      <ValueCard title="License">{licence}</ValueCard>
      <ValueCard title="Author">
        {authorLink ? (
          <Link href={authorLink} target="_blank">
            {authorName}
          </Link>
        ) : (
          authorName
        )}
      </ValueCard>
      <ValueCard title="Last Activity">{lastActivity}</ValueCard>
    </div>
  );
};
