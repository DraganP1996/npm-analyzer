import { redirect } from "next/navigation";

export const revalidate = 432_000;

export default function Page() {
  redirect("/");
}
