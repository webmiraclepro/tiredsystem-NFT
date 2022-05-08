import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { ChainId, DAppProvider, Rinkeby, Polygon } from "@usedapp/core";
import * as serviceWorker from "./serviceWorker";
import "react-toastify/dist/ReactToastify.css";

const config = {
  readOnlyChainId: ChainId.Rinkeby,

  networks: [Polygon, Rinkeby],
  readOnlyUrls: {
    [ChainId.Polygon]: "https://polygon-rpc.com/",
    [ChainId.Rinkeby]: `https://rinkeby.infura.io/v3/5886873a084344e98b23a4d692394011`,
  },
  pollingInterval: 1000,
};

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <DAppProvider config={config} children={<App />} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
