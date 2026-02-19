"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!carouselApi) return;

    setActiveIndex(carouselApi.selectedScrollSnap());

    const handleSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
    };
  }, [carouselApi]);

  return (
    <>
      <div className="flex h-full min-h-0 items-center justify-center overflow-hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl"
          setApi={(api) => setCarouselApi(api)}
        >
          <CarouselContent className="-mt-1 h-[520px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[600px] lg:h-[680px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={
                  index === activeIndex
                    ? "basis-3/4 pt-2 transition-[flex-basis] duration-300 ease-out"
                    : "basis-2/3 pt-2 transition-[flex-basis] duration-300 ease-out"
                }
              >
                <div className="p-1">
                  <Card>
                    <CardContent
                      className={
                        index === activeIndex
                          ? "flex min-h-[260px] items-center justify-center p-12 transition-all duration-300 ease-out sm:min-h-[300px]"
                          : "flex min-h-[200px] items-center justify-center p-10 transition-all duration-300 ease-out sm:min-h-[240px]"
                      }
                    >
                      <span
                        className={
                          index === activeIndex
                            ? "text-5xl font-semibold transition-all duration-300 ease-out"
                            : "text-4xl font-semibold transition-all duration-300 ease-out"
                        }
                      >
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}