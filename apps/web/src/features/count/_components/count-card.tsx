import { Link } from "@tanstack/react-router";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// Root component
export const CountCard = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={`w-full max-w-md ${className ?? ""}`} {...props}>
      {children}
    </Card>
  );
};

// Header component
CountCard.Header = ({ title, description }: { title: string; description: string }) => {
  return (
    <CardHeader>
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
  );
};

// Display component
CountCard.Display = ({ count, description }: { count: number; description: string }) => {
  return (
    <CardContent className="pt-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl font-bold">{count}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  );
};

// Actions component
CountCard.Actions = ({
  onIncrement,
  onRefresh,
  isLoading,
  backTo = "/count",
}: {
  onIncrement: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  backTo?: string;
}) => {
  return (
    <CardFooter className="flex flex-col gap-4">
      <Button onClick={onIncrement} className="w-full" disabled={isLoading}>
        {isLoading ? "Updating..." : "Increment Count"}
      </Button>

      <div className="flex w-full justify-between">
        <Link to={backTo}>
          <Button variant="outline">Back to Hub</Button>
        </Link>
        <Button variant="ghost" onClick={onRefresh} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    </CardFooter>
  );
};

// Legacy support for direct usage with props
export const CountCardLegacy = ({
  title,
  description,
  count,
  isUpdating,
  onIncrement,
  onRefresh,
  backTo = "/count",
}: {
  title: string;
  description: string;
  count: number;
  isUpdating: boolean;
  onIncrement: () => void;
  onRefresh: () => void;
  backTo?: string;
}) => {
  return (
    <CountCard>
      <CountCard.Header title={title} description={description} />
      <CountCard.Display count={count} description={description} />
      <CountCard.Actions
        onIncrement={onIncrement}
        onRefresh={onRefresh}
        isLoading={isUpdating}
        backTo={backTo}
      />
    </CountCard>
  );
};
