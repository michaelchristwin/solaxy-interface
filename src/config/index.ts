import { createConfig, http } from "wagmi";
import { gnosis } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [gnosis],
    transports: {
      [gnosis.id]: http(),
    },
    walletConnectProjectId: import.meta.env.VITE_PROJECT_ID,
    appName: "Solaxy",
    appUrl: "",
    appIcon: "",
  }),
);
