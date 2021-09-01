import React, { Suspense } from "react";
import "./fontawesome.js";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-day-picker/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

import "./main.scss";
import { store } from "./redux";
import App from "./App";

import "./i18n"; // needs to be bundled

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Suspense fallback={<div>Loading ....</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
