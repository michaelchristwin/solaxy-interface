import HeroText from "~/components/HeroText";
import type { Route } from "./+types/home";
import GemAnimation from "~/components/GemAnimation";
import { Link } from "react-router";
import { SLX } from "~/assets/token-logos";
import TradeInterface from "~/components/TradeInterface";
import FAQMenu from "~/components/FaqMenu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="w-full relative">
      <GemAnimation />
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="block space-y-10 w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
          <div className="block lg:text-start md:text-start text-center">
            <p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-800 roboto">
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
        className="w-full lg:mt-[300px] md:mt-[200px] mt-[150px] p-4"
      >
        <TradeInterface />
      </div>
      <FAQMenu />
    </div>
  );
}
