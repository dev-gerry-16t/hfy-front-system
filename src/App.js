import React from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Router } from "react-router";
import Loadable from "react-loadable";
import { ConfigProvider } from "antd";
import { Route, Switch } from "react-router-dom";
import es_ES from "antd/lib/locale-provider/es_ES";
import "./App.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const Login = Loadable({
  loader: () => import("./containers/Login/login"),
  loading,
});

const Registro = Loadable({
  loader: () => import("./containers/Register/Register"),
  loading,
});

const Auth = Loadable({
  loader: () => import("./containers/Auth/auth"),
  loading,
});

const DefaultLayout = Loadable({
  loader: () => import("./containers/Layout/layout"),
  loading,
});

const App = (props) => {
  const { history, token } = props;
  const authenticate = localStorage.getItem("idSystemUser");
  console.log("APP STORAGE", authenticate);
  return (
    <Router history={history}>
      <ConfigProvider locale={es_ES}>
        <Switch>
          <Route exact path="/" name="Login Page" component={Login} />
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/index" name="Login Page" component={Login} />
          <Route path="/registro" name="Registro" component={Registro} />
          <Route path="/auth" name="Autorizacion" component={Auth} />
          <Route
            history={history}
            path="/app/"
            name="Home"
            render={(props) => (
              <DefaultLayout
                {...props}
                authenticate={
                  isNil(authenticate) === false &&
                  isEmpty(authenticate) === false
                }
                authenticated
              />
            )}
          />
        </Switch>
      </ConfigProvider>
    </Router>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
