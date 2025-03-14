import { Button } from "~/components/ui/button";
import type { Route } from "./+types/_index";
import Swap from "~/components/swap";
import HeroText from "~/components/hero-text";
import { SLX } from "~/assets/token-logos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Solaxy" },
    { name: "description", content: "One token to rule them all!" },
  ];
}

export default function Index() {
  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <div className="w-full min-h-[400px] flex justify-between items-start mt-32">
        <div className="flex flex-col w-1/2 space-y-10">
          <div className="block jetbrains-mono">
            <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-800">
              Asset
            </p>
            <HeroText />
          </div>

          <Button className="w-64 text-xl rounded-full h-16 bg-black hover:bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
            Visit Foundry
            <img alt="Solaxy logo" src={SLX} className={`w-[20px] h-[20px]`} />
          </Button>
        </div>
        <div className="w-1/2">
          <Swap />
        </div>
      </div>
      {/* <Carousel>
        <CarouselContent>
          <CarouselItem className={`md:basis-1/2 lg:basis-1/3`}>
            1234
          </CarouselItem>
          <CarouselItem className={`md:basis-1/2 lg:basis-1/3`}>
            1234
          </CarouselItem>
          <CarouselItem className={`md:basis-1/2 lg:basis-1/3`}>
            1234
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}
