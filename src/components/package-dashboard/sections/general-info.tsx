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
    <>
      <section className="hidden lg:flex flex-row gap-1 lg:gap-3 flex-wrap">
        <SimpleCard title="Author">
          {authorLink ? (
            <Link href={authorLink} target="_blank" prefetch={false}>
              {authorName}
            </Link>
          ) : (
            authorName
          )}
        </SimpleCard>
        <SimpleCard title="License">{licence}</SimpleCard>
        <SimpleCard title="Unpacked Size">{unpackedSize}</SimpleCard>
        <SimpleCard title="Packed Size">{packedSize}</SimpleCard>
        <SimpleCard title="Last Activity">{lastActivity}</SimpleCard>
      </section>
      <section className="flex lg:hidden flex-row gap-2 lg:gap-3 flex-wrap">
        <SimpleCard title="Wkly Downloads">322K</SimpleCard>
        <SimpleCard title="Unpacked Size">{unpackedSize}</SimpleCard>
        <SimpleCard title="Packed Size">{packedSize}</SimpleCard>
        <SimpleCard title="License">{licence}</SimpleCard>
        <SimpleCard title="Author">
          {authorLink ? (
            <Link href={authorLink} target="_blank" prefetch={false}>
              {authorName}
            </Link>
          ) : (
            authorName
          )}
        </SimpleCard>
        <SimpleCard title="Last Activity">{lastActivity}</SimpleCard>
      </section>
    </>
  );
};
