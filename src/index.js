import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>

        <App />

        <Toaster />
    </BrowserRouter>
);

