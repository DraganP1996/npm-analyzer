export const revalidate = 86400;

import { Home } from "@/components/home/home";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div
      className={cn("flex-1 flex flex-col gap-16 font-[family-name:var(--font-geist-sans)]")}
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_URL}/pattern2.png')`,
      }}
    >
      <main className={cn("flex-1 flex flex-col gap-3 items-center")}>
        <Home />
      </main>
    </div>
  );
}
