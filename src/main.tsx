import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Navbar from "@/components/navbar.tsx";
import { AppContextProvider } from "./providers/app.context-provider.tsx";
import { Web3Provider } from "./providers/web3provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <AppContextProvider>
        <div className={`lg:p-[50px] md:p-[40px] p-[20px]`}>
          <Navbar />
          <App />
        </div>
      </AppContextProvider>
    </Web3Provider>
  </StrictMode>,
);
