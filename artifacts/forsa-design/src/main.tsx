import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
flushSync(() => {
  createRoot(root).render(<App />);
});
root.removeAttribute("data-prerendered");
