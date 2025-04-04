import { ReactNode } from "react";
import { Card, CardContent } from "./card";

type ValueCardProps = {
  title: string;
  children: ReactNode;
};

export const SimpleCard = ({ title, children }: ValueCardProps) => {
  return (
    <Card className="gap-0 py-2">
      <CardContent className="gap-0 px-4">
        <span className="text-xs text-gray-500"> {title} </span>
        <div className="text-xl font-semibold text-center"> {children} </div>
      </CardContent>
    </Card>
  );
};
