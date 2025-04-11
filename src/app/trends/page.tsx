import { PageContainer } from "@/components/layout";
import { BreadCrumbNavigation } from "@/components/ui/breadcrumb-navigation";

export default async function Page() {
  const breadcrumbNavigationItems = [
    {
      title: "Home",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      title: "Trends",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
    },
  ];

  return (
    <PageContainer>
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl">Trends </h1>
        <p className="text-gray-500 text-sm">
          A full version history of the package with size, number of distributed files and
          dependency evolution.
        </p>
      </div>
    </PageContainer>
  );
}
