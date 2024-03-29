import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore, { history } from "./Store/configureStore";
import "axios-progress-bar/dist/nprogress.css";
import "./assets/css/_index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import swConfig from './swConfig'

const { store, persistor } = configureStore();

// serviceWorker.register();

const loading = (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={loading} persistor={persistor}>
      <React.StrictMode>
        <App history={history} />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister(swConfig);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
