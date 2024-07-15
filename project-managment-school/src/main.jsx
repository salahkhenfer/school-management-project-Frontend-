import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./Redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={Router} />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
