import React from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Router } from "react-router";
import Loadable from "react-loadable";
import { ConfigProvider } from "antd";
import { Route, Switch } from "react-router-dom";
import es_ES from "antd/lib/locale-provider/es_ES";
import "intro.js/introjs.css";
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

const RegistroAgente = Loadable({
  loader: () => import("./containers/Register/RegisterAgent"),
  loading,
});

const RegistroPropietario = Loadable({
  loader: () => import("./containers/Register/RegisterOwner"),
  loading,
});

const RecoveryPassword = Loadable({
  loader: () => import("./containers/Recovery/RecoveryPass"),
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

const Signature = Loadable({
  loader: () => import("./containers/Signature/SignatureDocument"),
  loading,
});

const Property = Loadable({
  loader: () => import("./views/Properties/propertyPublicNotSession"),
  loading,
});

const ReportInvitation = Loadable({
  loader: () => import("./containers/Invitation/reporInvitation"),
  loading,
});

const App = (props) => {
  const { history, dataProfile } = props;
  const accessDev = false; //window.location.hostname === "localhost";
  return (
    <Router history={history}>
      <ConfigProvider locale={es_ES}>
        <Switch>
          <Route exact path="/" name="Login Page" component={Login} />
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/index" name="Login Page" component={Login} />
          <Route exact path="/registro" name="Registro" component={Registro} />

          <Route
            exact
            path="/registro-propietario"
            name="Registro Propietarios"
            component={RegistroPropietario}
          />
          <Route
            exact
            path="/registro-asesor"
            name="Registro Asesores"
            component={RegistroAgente}
          />
          <Route
            exact
            path="/registro-asesor/:idContact"
            name="Registro Asesores"
            component={RegistroAgente}
          />
          <Route
            exact
            path="/recoveryPass"
            name="Recuperar contraseña"
            component={RecoveryPassword}
          />

          <Route
            exact
            path="/registro/:idInvitation/:idCustomerType"
            name="Registro"
            component={Registro}
          />
          <Route
            exact
            path="/signature/document/:idExternalUserInDC"
            name="Firma de documento"
            component={Signature}
          />
          <Route
            exact
            path="/property/:idProperty"
            name="Firma de documento"
            component={Property}
          />
          <Route
            exact
            path="/report/:idInvitation"
            name="Firma de documento"
            component={ReportInvitation}
          />
          <Route path="/auth" name="Autorizacion" component={Auth} />
          <Route path="/logout" name="Clean App and Close" component={Auth} />
          <Route
            history={history}
            path="/websystem/"
            name="Home"
            render={(props) => (
              <DefaultLayout
                {...props}
                authenticate={
                  isNil(dataProfile.idSystemUser) === false &&
                  isEmpty(dataProfile.idSystemUser) === false
                }
                authenticated={
                  (isNil(dataProfile.dataProfile) === false &&
                    isNil(dataProfile.dataProfile.idSystemUser) === false &&
                    isEmpty(dataProfile.dataProfile.idSystemUser) === false) ||
                  accessDev
                }
              />
            )}
          />
        </Switch>
      </ConfigProvider>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return { dataProfile };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
