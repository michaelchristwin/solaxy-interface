import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
    walletConnectProjectId: import.meta.env.VITE_PROJECT_ID,
    appName: "Solaxy",
    appUrl: "",
    appIcon: "",
  })
);
