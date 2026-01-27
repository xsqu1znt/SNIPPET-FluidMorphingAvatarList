import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <main className="bg-whiteish h-screen w-full overflow-hidden text-black">
            <App />
        </main>
    </StrictMode>
);
