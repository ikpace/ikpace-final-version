import * as React from "react";
import { cn } from "@/lib/utils";

export function ChartContainer({ className, ...props }) {
  return <div className={cn("w-full", className)} {...props} />;
}
export function ChartTooltip({ className, ...props }) {
  return <div className={cn("rounded-lg border bg-background px-3 py-2 text-sm shadow-md", className)} {...props} />;
}
