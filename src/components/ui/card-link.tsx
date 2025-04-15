import Link from "next/link";
import { ReactNode } from "react";

type CardLinkProps = {
  href: string;
  children: ReactNode;
};

export const CardLink = ({ href, children }: CardLinkProps) => {
  return (
    <Link
      href={href}
      className="flex flex-row items-center rounded-sm p-2 text-sm hover:bg-gray-200 font-semibold text-gray-800"
      prefetch={false}
    >
      {children}
    </Link>
  );
};
