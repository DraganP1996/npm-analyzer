import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Oops, Page Not Found",
    authors: [{ name: "Dragan Petrovic", url: "https://github.com/DraganP1996" }],
    creator: "Dragan Petrovic",
  };
}

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-160px)]">
      <h1 className="font-electrolize text-4xl sm:text-6xl font-bold"> Oops, Page Not Found </h1>
      <p className="text-xl sm:text-2xl mt-2">The page you are looking for does not exist.</p>
    </div>
  );
}
