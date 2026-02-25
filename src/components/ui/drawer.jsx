import * as React from "react";
import { Drawer as V } from "vaul";
import { cn } from "@/lib/utils";

export const Drawer = V.Root;
export const DrawerTrigger = V.Trigger;
export const DrawerPortal = V.Portal;
export const DrawerClose = V.Close;
export const DrawerOverlay = React.forwardRef(({ className, ...p }, ref) => (
  <V.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...p} />
));
export const DrawerContent = React.forwardRef(({ className, ...p }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <V.Content ref={ref} className={cn("fixed bottom-0 left-0 right-0 z-50 border bg-background", className)} {...p} />
  </DrawerPortal>
));
export const DrawerHeader = ({ className, ...p }) => <div className={cn("p-4", className)} {...p} />;
export const DrawerFooter = ({ className, ...p }) => <div className={cn("p-4", className)} {...p} />;
export const DrawerTitle = V.Title;
export const DrawerDescription = V.Description;
