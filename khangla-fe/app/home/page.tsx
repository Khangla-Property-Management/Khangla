"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Jost } from "next/font/google";
import Image from "next/image";

// Shared font for all home-page hero slides.
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Secondary CTA used in slide 2.
export function ButtonSecondary() {
  return (
    <Button
      variant="secondary"
      className={`${jost.className} min-w-40 px-8 text-lg bg-[#C2C9CD] text-[#547794] transition-all duration-300 hover:-translate-y-px hover:scale-[1.01] hover:bg-[#C2C9CD]/85`}
    >
      Get Started
    </Button>
  );
}

export default function HomePage() {
  // Active slide index in the vertical carousel.
  const [activeIndex, setActiveIndex] = React.useState(0);
  // Carousel API from shadcn/embla wrapper.
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const slideHeadings = [
    "Browse Through Houses",
    "Manage Your Properties",
    "Book Your Hotel",
  ];
  const slideCount = slideHeadings.length;

  React.useEffect(() => {
    if (!carouselApi) return;

    // Keep the slide indicator headings in sync with the currently visible slide.
    const handleSelect = () => {
      const nextIndex = carouselApi.selectedScrollSnap();
      setActiveIndex((prevIndex) =>
        prevIndex === nextIndex ? prevIndex : nextIndex
      );
    };

    handleSelect();
    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
    };
  }, [carouselApi]);

  // Background image layer per slide.
  const renderSlideBackground = (index: number) => {
    if (index !== 0 && index !== 1 && index !== 2) return null;

    return (
      <div
        className={`pointer-events-none absolute rounded-2xl ${
          index === 0
            ? "inset-0 bg-[url('/browse-houses.png')] bg-cover bg-center opacity-20"
            : index === 1
            ? "inset-x-0 top-6 bottom-0 bg-[url('/manage-properties.png')] bg-size-[100%_100%] bg-top bg-no-repeat opacity-20"
            : "inset-x-0 top-6 bottom-0 bg-[url('/search-hotels.png')] bg-cover bg-position-[20%_72%] bg-no-repeat opacity-20"
        }`}
        aria-hidden="true"
      />
    );
  };

  // Main text/content per slide.
  const renderSlideContent = (index: number) => {
    if (index === 0) {
      return (
        <div
          className={`${jost.className} relative z-10 -mt-16 flex w-full max-w-none flex-col items-start gap-8 px-8 py-10 text-left sm:-mt-20 sm:px-16 lg:-mt-24 lg:px-24`}
        >
          <div className="space-y-3">
            <h2 className="text-5xl font-semibold text-[#547794] sm:text-6xl lg:text-7xl">
              Browse Through Houses
            </h2>
            <p className="text-lg text-[#547794] sm:text-xl">
              Browse a wide range of houses and apartments,
              <br />
              and choose the place that perfectly matches your lifestyle, comfort, and budget.
            </p>
          </div>
          <InputGroup className="max-w-xs bg-[#C2C9CD] text-slate-900">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </div>
      );
    }

    if (index === 1) {
      return (
        <div
          className={`${jost.className} relative z-10 flex w-full max-w-none flex-col items-start gap-6 px-8 py-10 text-left sm:px-16 lg:px-24`}
        >
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold text-[#547794] sm:text-5xl lg:text-6xl">
              Manage Your Properties
            </h2>
            <p className="text-base text-[#547794] sm:text-lg lg:text-xl">
              Easily manage your houses and apartments, collect rent securely, and keep track of tenants who haven’t paid — all in one simple dashboard.
            </p>
          </div>
          <ButtonSecondary />
        </div>
      );
    }

    return (
      <div
        className={`${jost.className} relative z-10 flex w-full max-w-none flex-col items-start gap-6 px-8 py-10 text-left sm:px-16 lg:px-24`}
      >
        <div className="max-w-4xl space-y-3">
          <h2 className="text-4xl font-semibold text-[#547794] drop-shadow-[0_1px_1px_rgba(246,243,238,0.75)] sm:text-5xl lg:text-6xl">
            Book Your Hotel
          </h2>
          <p className="text-base text-[#547794] drop-shadow-[0_1px_1px_rgba(246,243,238,0.75)] sm:text-lg lg:text-xl">
            Discover comfortable, verified hotels and book your stay in just a few clicks — fast, secure, and hassle-free.
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Page-level base background to avoid empty flashes while slides render. */}
      <div className="fixed inset-0 -z-10 bg-[#f6f3ee]" aria-hidden="true" />
      {/* Preload hero images used in slides for smoother first paint. */}
      <div className="hidden" aria-hidden="true">
        <Image src="/browse-houses.png" alt="" width={1} height={1} priority />
        <Image src="/manage-properties.png" alt="" width={1} height={1} priority />
        <Image src="/search-hotels.png" alt="" width={1} height={1} priority />
      </div>
      <div className="relative flex h-full flex-col items-center justify-start gap-2 overflow-hidden bg-[#f6f3ee] pt-0 pb-6">
        <Carousel
          opts={{
            align: "center",
          }}
          orientation="vertical"
          className="w-full max-w-full sm:max-w-5xl md:max-w-7xl lg:max-w-7xl"
          setApi={(api) => setCarouselApi(api)}
        >
          <CarouselContent className="-mt-6 h-[110vh] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform">
            {Array.from({ length: slideCount }).map((_, index) => {
              // All current slides are image-first hero slides.
              const isImageSlide = index === 0 || index === 1 || index === 2;

              const carouselItemClass = `${isImageSlide ? "overflow-hidden rounded-2xl " : ""}basis-full pt-2`;
              const cardClass = isImageSlide
                ? "h-full overflow-hidden rounded-2xl border-0 bg-transparent shadow-none ring-0 outline-none"
                : "border-0 bg-[#E0E0E0] shadow-none ring-0 outline-none";
              const cardContentClass = `relative flex min-h-[85vh] items-center justify-center sm:min-h-[90vh] ${
                isImageSlide ? "h-full w-full overflow-hidden rounded-2xl p-0" : "p-20"
              }`;

              return (
                <CarouselItem key={index} className={carouselItemClass}>
                  <div className={isImageSlide ? "overflow-hidden rounded-2xl p-0" : "p-0"}>
                    <Card className={cardClass}>
                      <CardContent className={cardContentClass}>
                        {renderSlideBackground(index)}
                        {renderSlideContent(index)}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        {/* Manual slide heading indicators for quick navigation. */}
        <div className="pointer-events-auto absolute top-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 sm:gap-3">
          {slideHeadings.map((heading, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Go to ${heading}`}
              aria-current={index === activeIndex}
              onClick={() => carouselApi?.scrollTo(index)}
              className={
                index === activeIndex
                  ? `${jost.className} px-1 py-1 text-xs font-semibold text-[#547794] opacity-100 transition-[color,opacity] duration-200 ease-out sm:text-sm`
                  : `${jost.className} px-1 py-1 text-xs font-semibold text-[#547794] opacity-55 transition-[color,opacity] duration-200 ease-out hover:opacity-80 sm:text-sm`
              }
            >
              {heading}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}