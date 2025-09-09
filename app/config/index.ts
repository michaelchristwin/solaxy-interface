import { http } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
if (!PROJECT_ID) console.error("Project ID unavailable.");

export const config = getDefaultConfig({
  appName: "Solaxy",
  projectId: PROJECT_ID,
  chains: [base, baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
