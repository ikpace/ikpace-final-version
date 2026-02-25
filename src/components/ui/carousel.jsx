import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const Carousel = React.forwardRef(({ className, opts, orientation = "horizontal", ...props }, ref) => {
  const [carouselRef] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" });
  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <div ref={carouselRef} className="overflow-hidden">{props.children}</div>
    </div>
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props} />
));
export { Carousel, CarouselContent, CarouselItem };
