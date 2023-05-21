import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import queryString from "query-string";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  * { 
    box-sizing: border-box;
  }

  #${rootElement.id} {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    font-family: Consolas,monaco,monospace; 
    z-index: 999999999;
  }
`;

document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
