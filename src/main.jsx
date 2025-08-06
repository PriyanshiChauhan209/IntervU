import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import IntervUHome from "./components/IntervUHome";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
  <IntervUHome />
</div>

  </React.StrictMode>
);
