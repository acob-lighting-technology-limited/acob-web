import type React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("2xl:container max-w-7xl mx-auto px-4 py-8", className)}>
      <div className="">{children}</div>
    </div>
  );
}
