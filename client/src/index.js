import React from "react";
import App from "./App";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";

const router = createBrowserRouter([
    {
        path: '/',
    }
]);

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
            <Provider store={store}>
        <Router>
                <App />
        </Router>
            </Provider>
    </React.StrictMode>
);