import { Button } from "~/components/ui/button";
import type { Route } from "./+types/_index";
import Swap from "~/components/swap";

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
      <div className="w-full max-h-[400px] flex justify-between items-start mt-[150px]">
        <div className="block w-[49%] space-y-10">
          <div className="flex w-full justify-start items-center space-x-4">
            <p className="font-extrabold text-[50px] sm:text-[60px] md:text-[80px] lg:text-[90px] xl:text-[100px] text-yellow-500">
              Asset
            </p>
            <div className="block text-neutral-700 font-bold leading-[1.2]">
              <p className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px]">
                of the m3ters
              </p>
              <p className="text-yellow-500 text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px]">
                by the m3ters
              </p>
              <p className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px]">
                for the m3ters
              </p>
            </div>
          </div>

          <Button className="w-[250px] text-[20px] rounded-full h-[60px] bg-black hover:bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out">
            Visit Foundry
          </Button>
        </div>
        <Swap />
      </div>
    </div>
  );
}
