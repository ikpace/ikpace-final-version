import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export function Calendar({ className, ...props }) {
  return <DayPicker className={cn("p-3", className)} {...props} />;
}
