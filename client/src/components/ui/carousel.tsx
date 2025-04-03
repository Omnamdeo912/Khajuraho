import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel as CarouselPrimitive,
  type CarouselApi,
} from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  opts?: CarouselOptions;
  className?: string;
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
};

type CarouselOptions = Parameters<typeof CarouselPrimitive>[0]["options"];

const Carousel = ({
  opts,
  className,
  children,
  autoplay = false,
  autoplayInterval = 5000,
}: CarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  
  React.useEffect(() => {
    if (!api || !autoplay) return;
    
    const intervalId = setInterval(() => {
      const nextSlide = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
      api.scrollTo(nextSlide);
    }, autoplayInterval);
    
    return () => clearInterval(intervalId);
  }, [api, autoplay, autoplayInterval]);
  
  return (
    <CarouselPrimitive
      opts={opts}
      className={cn("relative", className)}
      setApi={setApi}
    >
      {children}
    </CarouselPrimitive>
  );
};

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 flex-shrink-0 flex-grow-0", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    setCanScrollPrev(api.canScrollPrev());
    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
    });
  }, [api]);

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100",
        className
      )}
      disabled={!canScrollPrev}
      onClick={() => api?.scrollPrev()}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    setCanScrollNext(api.canScrollNext());
    api.on("select", () => {
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100",
        className
      )}
      disabled={!canScrollNext}
      onClick={() => api?.scrollNext()}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
