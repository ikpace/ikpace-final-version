import * as M from "@radix-ui/react-menubar";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Menubar = React.forwardRef(({ className, ...p }, ref) => (
  <M.Root ref={ref} className={cn("flex h-10 items-center rounded-md border p-1", className)} {...p} />
));
export const MenubarMenu = M.Menu;
export const MenubarTrigger = M.Trigger;
export const MenubarContent = M.Content;
export const MenubarItem = M.Item;
export const MenubarGroup = M.Group;
export const MenubarPortal = M.Portal;
export const MenubarSub = M.Sub;
export const MenubarRadioGroup = M.RadioGroup;
export const MenubarSeparator = M.Separator;
