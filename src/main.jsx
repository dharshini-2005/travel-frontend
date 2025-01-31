import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App.jsx"; // Make sure the App component exists and is correctly implemented

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* This renders your App component */}
  </StrictMode>
);
