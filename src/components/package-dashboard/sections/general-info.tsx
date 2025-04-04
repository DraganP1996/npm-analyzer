import Link from "next/link";

import { SimpleCard } from "@/components/ui/simple-card";

type PackageGeneralInfoProps = {
  unpackedSize: string;
  packedSize: string;
  licence: string;
  authorLink?: string;
  lastActivity: string;
  authorName: string;
};

export const PackageGeneralInfo = ({
  unpackedSize,
  packedSize,
  licence,
  authorLink,
  lastActivity,
  authorName,
}: PackageGeneralInfoProps) => {
  return (
    <div className="flex flex-row gap-3">
      <SimpleCard title="Weekly Downloads">322K</SimpleCard>
      <SimpleCard title="Unpacked Size">{unpackedSize}</SimpleCard>
      <SimpleCard title="Packed Size">{packedSize}</SimpleCard>
      <SimpleCard title="License">{licence}</SimpleCard>
      <SimpleCard title="Author">
        {authorLink ? (
          <Link href={authorLink} target="_blank">
            {authorName}
          </Link>
        ) : (
          authorName
        )}
      </SimpleCard>
      <SimpleCard title="Last Activity">{lastActivity}</SimpleCard>
    </div>
  );
};
