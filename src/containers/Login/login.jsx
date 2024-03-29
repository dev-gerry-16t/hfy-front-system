import React, { useState, useRef, useEffect } from "react";
import "antd/dist/antd.css";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { Input, Spin } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import logo from "../../assets/img/logo.png";
import admiration from "../../assets/icons/exclaim.svg";
import saqareX from "../../assets/icons/saqareX.svg";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";

const Login = (props) => {
  const { history, callApiLogin, setDataUserProfile } = props;
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const [spinVisible, setSpinVisible] = useState(false);
  const [errorsLogin, setErrorsLogin] = useState({
    error: false,
    message: "",
    errorEmail: false,
    errorPass: false,
  });
  const recaptchaV3 = useRef(null);

  const LoadingSpin = <SyncOutlined spin />;

  const handlerCallApiLogin = async (data) => {
    try {
      if (isEmpty(data.password) === false && isEmpty(data.email) === false) {
        const getCaptchaToken = await recaptchaV3.current.executeAsync();
        const response = await callApiLogin({
          email: data.email.trim(),
          password: data.password.trim(),
          captchaToken: getCaptchaToken,
        });
        const idSystemUser =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response.idSystemUser) === false
            ? response.response.idSystemUser
            : null;
        const token =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response.token) === false
            ? response.response.token
            : null;
        const publicKeyStripe =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response.publicKeyStripe) === false
            ? response.response.publicKeyStripe
            : null;
        await setDataUserProfile({
          idSystemUser,
          token,
          publicKeyStripe,
          email: data.email.trim(),
        });
        // localStorage.setItem("idSystemUser", idSystemUser);
        // localStorage.setItem("token", token);
        // localStorage.setItem("publicKeyStripe", publicKeyStripe);
        // localStorage.setItem("email", data.email.trim());
        setSpinVisible(false);
        history.push("/auth");
      } else {
        setSpinVisible(false);
        if (isEmpty(data.password) || isEmpty(data.email)) {
          setErrorsLogin({
            ...errorsLogin,
            errorPass: isEmpty(data.password),
            errorEmail: isEmpty(data.email),
          });
        }
      }
    } catch (error) {
      setSpinVisible(false);
      setErrorsLogin({ ...errorsLogin, error: true, message: error });
    }
  };

  useEffect(() => {
    const { dataProfile } = props;
    if (isNil(dataProfile) === false && isEmpty(dataProfile) === false) {
      history.push(dataProfile.path);
    }
  }, []);

  return (
    <div className="App">
      <div className="login_head_logo">
        <img
          src={logo}
          alt="Homify-Pólizas de arrendamiento"
          className="login_logo"
        />
      </div>
      <div className="login_main">
        <div className="login_card_form">
          <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
            <div className="login_top_form">
              <h1>Inicia sesión</h1>
              <div
                className={`error_login_incorrect_data ${
                  errorsLogin.error === false ? "hide" : "visible"
                }`}
              >
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsLogin.message}</span>
                </div>
              </div>
              <div className="login_inputs_form">
                <div className="login-ant-input">
                  <label className="login-label-placeholder">
                    Correo electrónico
                  </label>
                  <Input
                    value={dataLogin.email}
                    onChange={(e) => {
                      setDataLogin({ ...dataLogin, email: e.target.value });
                      setErrorsLogin({
                        ...errorsLogin,
                        error: false,
                        errorEmail: false,
                      });
                    }}
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        setSpinVisible(true);
                        handlerCallApiLogin(dataLogin);
                      }
                    }}
                    suffix={<UserOutlined className="site-form-item-icon" />}
                  />
                </div>
                <div
                  className={`error_login_incorrect_data_field ${
                    errorsLogin.errorEmail === false ? "hide" : "visible"
                  }`}
                >
                  <img src={saqareX} alt="exclaim" />
                  <span>Este campo es requerido</span>
                </div>
                <div className="login-ant-input">
                  <label className="login-label-placeholder">Contraseña</label>
                  <Input.Password
                    value={dataLogin.password}
                    onChange={(e) => {
                      setDataLogin({ ...dataLogin, password: e.target.value });
                      setErrorsLogin({
                        ...errorsLogin,
                        error: false,
                        errorPass: false,
                      });
                    }}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        setSpinVisible(true);
                        handlerCallApiLogin(dataLogin);
                      }
                    }}
                  />
                </div>
                <div
                  className={`error_login_incorrect_data_field ${
                    errorsLogin.errorPass === false ? "hide" : "visible"
                  }`}
                >
                  <img src={saqareX} alt="exclaim" />
                  <span>Este campo es requerido</span>
                </div>
              </div>
              <div className="login-recover-pass">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/recoveryPass");
                  }}
                >
                  Olvidé mi contraseña
                </p>
              </div>
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    setSpinVisible(true);
                    handlerCallApiLogin(dataLogin);
                  }}
                >
                  <span>Iniciar sesión</span>
                </button>
              </div>
              <div>
                <ReCAPTCHA
                  sitekey="6LegXpMbAAAAANSPSPVL8QaYBb1g6zw7LzIF3WHg"
                  onChange={(e) => {}}
                  style={{ display: "inline-block" }}
                  size="invisible"
                  ref={recaptchaV3}
                />
              </div>
            </div>
          </Spin>
          <div className="login_divider">
            <hr />
            <span>No tengo cuenta</span>
            <hr />
          </div>
          <div className="login_bottom_form">
            <div className="button_init_secondary">
              <button
                type="button"
                onClick={() => {
                  history.push("/registro");
                }}
              >
                <span>Crear cuenta</span>
              </button>
            </div>
          </div>
        </div>
        <div className="login_footer_version">
          <h3>{GLOBAL_CONSTANTS.VERSION}</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callApiLogin: (data) => dispatch(callApiLogin(data)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
