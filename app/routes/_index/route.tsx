import { Button } from "~/components/ui/button";
import type { Route } from "./+types/route";
import TradeInterface from "~/components/swap";
import HeroText from "~/components/hero-text";
import { SLX } from "~/assets/token-logos";
import GemAnimation from "~/components/gem-animation";
import { Four626, Four626_2, VXD, TEC, BC } from "~/assets/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Solaxy" },
    { name: "description", content: "One token to rule them all!" },
  ];
}

export default function Index() {
  return (
    <div className="w-full relative">
      <GemAnimation />
      {/* Hero Section */}

      <div className="w-full min-h-[400px] flex justify-center items-center lg:mt-32 md:mt-28 mt-20">
        <div className="block space-y-10 w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
          <div className="block ibm-plex-mono lg:text-start md:text-start text-center">
            <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-800">
              Asset
            </p>
            <HeroText />
          </div>
          <Link
            to={`#trade`}
            className="w-64 text-xl rounded-full h-16 bg-black hover:bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out flex justify-center items-center space-x-2 lg:mx-0 md:mx-0 mx-auto"
          >
            <span>Visit Foundry</span>
            <img alt="Solaxy logo" src={SLX} className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div
        id="trade"
        className={`w-full lg:mt-[300px] md:mt-[200px] mt-[150px] p-4`}
      >
        <TradeInterface />
      </div>
      <div
        className={`bg-white mt-[100px] h-[400px] w-full relative flex items-center`}
      >
        <Carousel className={`w-[80%] mx-auto`}>
          <CarouselContent>
            <CarouselItem className={`md:basis-1/3 lg:basis-1/4`}>
              <img
                className={`w-[400px] h-[100px]`}
                src={Four626}
                alt="4626 logo"
              />
            </CarouselItem>
            <CarouselItem className={`md:basis-1/3 lg:basis-1/4`}>
              <img
                className={`w-[400px] h-[100px]`}
                src={Four626_2}
                alt="4626 logo 2"
              />
            </CarouselItem>
            <CarouselItem className={`md:basis-1/3 lg:basis-1/4`}>
              <img className={`w-[400px] h-[100px]`} src={VXD} alt="VXD logo" />
            </CarouselItem>
            <CarouselItem className={`md:basis-1/3 lg:basis-1/4`}>
              <img className={`w-[400px] h-[100px]`} src={TEC} alt="VXD logo" />
            </CarouselItem>
            <CarouselItem className={`md:basis-1/3 lg:basis-1/4`}>
              <img className={`w-[400px] h-[100px]`} src={BC} alt="VXD logo" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
