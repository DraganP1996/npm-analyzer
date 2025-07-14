import { NpmFormattedMetadata } from "@/components/pages";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generatePackageSummary, formatParagraphs } from "@/lib/ai";
import { Terminal } from "lucide-react";

type PackageSummaryProps = {
  packageMetada: NpmFormattedMetadata;
};

export const PackageSummary = async ({ packageMetada }: PackageSummaryProps) => {
  const summarizedByAI = await generatePackageSummary(packageMetada.name);

  if (!summarizedByAI) return;

  return (
    <section className="flex flex-col mb-6">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>
          <h3>Package Summary</h3>
        </AlertTitle>
        <AlertDescription className="leading-4">
          {formatParagraphs(summarizedByAI)}
        </AlertDescription>
      </Alert>
    </section>
  );
};
