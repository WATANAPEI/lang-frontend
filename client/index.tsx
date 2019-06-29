import React from "react";
import ReactDOM from "react-dom";

// @ts-ignore
import { App } from "./components/App.tsx";

ReactDOM.render(
  <App compiler="TypeScript" framework="React" />,
  document.getElementById("app")
);
