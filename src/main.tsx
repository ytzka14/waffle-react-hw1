import React from "react";
import ReactDOM from "react-dom/client";
import { SnackProvider } from "./contexts/SnackContext.tsx";
import "./index.css";
import router from "./Router.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
		<SnackProvider>
    	<RouterProvider router={router} />
		</SnackProvider>
  </React.StrictMode>,
);
