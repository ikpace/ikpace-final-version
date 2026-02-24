import * as React from "react";
import * as D from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export const DropdownMenu = D.Root;
export const DropdownMenuTrigger = D.Trigger;
export const DropdownMenuContent = React.forwardRef(({ className, ...p }, ref) => (
  <D.Portal><D.Content ref={ref} className={cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 shadow", className)} {...p} /></D.Portal>
));
export const DropdownMenuItem = React.forwardRef(({ className, ...p }, ref) => (
  <D.Item ref={ref} className={cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", className)} {...p} />
));
