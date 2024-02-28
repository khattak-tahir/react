import React from "react";
import ReactDOMClient from "react-dom/client";
import { CreateAccountScreen } from "./screens/CreateAccountScreen";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<CreateAccountScreen />);
