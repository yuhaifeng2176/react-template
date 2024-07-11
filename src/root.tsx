import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Index from "./index";

const rootElement = document.getElementById("root") as HTMLElement;

const render = (Component: React.FC) => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <Component />
      </Router>
    </React.StrictMode>
  );
};

render(Index);
