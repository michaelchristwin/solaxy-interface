import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//import { ThemeProvider } from "@/providers/theme-provider.tsx";
import Navbar from "@/components/navbar.tsx";
import { AppContextProvider } from "./providers/app.context-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <div className={`p-[50px]`}>
        <Navbar />
        <App />
      </div>
    </AppContextProvider>
  </StrictMode>
);
