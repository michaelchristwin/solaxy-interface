import Swap from "~/components/swap";
import type { Route } from "./+types/trade";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trade SLX" },
    { name: "description", content: "Buy and Sell SLX" },
  ];
}

function Trade() {
  return (
    <div className={`flex justify-center items-center w-full`}>
      <Swap />
    </div>
  );
}

export default Trade;
