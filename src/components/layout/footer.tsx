import { PageContainer } from "./page-container";

export const Footer = () => {
  return (
    <div className="w-full flex flex-col text-white text-xs">
      <div className="bg-black">
        <PageContainer className="p-2">
          This site is an independent open-source project and is not affiliated with, endorsed by,
          or sponsored by npm, Inc. or GitHub, Inc. The name “npm” is a registered trademark of npm,
          Inc., used here solely to describe compatibility and reference publicly available npm
          package data.
        </PageContainer>
      </div>
    </div>
  );
};
