/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

/**
 * All the application infrastructure are based on here
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
