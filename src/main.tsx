import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <main className="to-whiteish h-screen w-full overflow-hidden bg-linear-to-br from-white text-black">
            <App />
        </main>
    </StrictMode>
);
