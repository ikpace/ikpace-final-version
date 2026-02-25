import { FormProvider, Controller, useFormContext } from "react-hook-form";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Form = FormProvider;
export function FormField({ control, name, render }) {
  return <Controller control={control} name={name} render={render} />;
}
export const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
export const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium", className)} {...props} />
));
export const FormControl = React.forwardRef((props, ref) => <div ref={ref} {...props} />);
export const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
export const FormMessage = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-destructive", className)} {...props} />
));
