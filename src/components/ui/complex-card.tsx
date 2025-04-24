import { ReactNode } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { InfoIcon } from "lucide-react";

export type ComplexTabProps = {
  title: string;
  description: string;
  showInfoIcon?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export const ComplexCard = ({
  title,
  description,
  showInfoIcon,
  children,
  className,
  contentClassName,
}: ComplexTabProps) => {
  return (
    <Card className={className}>
      <CardHeader className="gap-1">
        <CardTitle>
          <h3>{title} </h3>
        </CardTitle>
        <CardDescription className="leading-4"> {description} </CardDescription>
        {showInfoIcon && (
          <CardAction>
            {" "}
            <InfoIcon className="cursor-pointer" />{" "}
          </CardAction>
        )}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
};
