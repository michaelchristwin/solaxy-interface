import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import Navbar from "@/components/navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Navbar />
      <App />
    </ThemeProvider>
  </StrictMode>
);
