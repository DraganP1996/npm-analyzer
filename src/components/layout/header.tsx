import Link from "next/link";
import { PageContainer } from "./page-container";

import Image from "next/image";

export const Header = () => {
  return (
    <div className="bg-[#fcfcfc] border-b border-b-[#e5e5e5]">
      <PageContainer className="flex flex-row items-center justify-between">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/`} prefetch={false}>
          <Image src="/logo.png" width={200} height={68} alt="Picture of the author" priority />
        </Link>
        <div className="flex flex-row items-center gap-2 text-sm">
          <Link href="" className="hover:text-blue-400" prefetch={false}>
            Trends
          </Link>
        </div>
      </PageContainer>
    </div>
  );
};
