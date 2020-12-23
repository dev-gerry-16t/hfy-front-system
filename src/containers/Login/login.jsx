import React, { useState } from "react";
import "antd/dist/antd.css";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import logo from "../../assets/img/logo.png";
import admiration from "../../assets/icons/exclaim.svg";
import saqareX from "../../assets/icons/saqareX.svg";
import { isNil } from "lodash";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props) => {
  const { history, callApiLogin } = props;
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const [errorsLogin, setErrorsLogin] = useState({
    error: false,
    message: "",
    errorEmail: false,
    errorPass: false,
  });

  const handlerCallApiLogin = async (data) => {
    try {
      if (isEmpty(data.password) === false && isEmpty(data.email) === false) {
        const response = await callApiLogin(data);
        const idSystemUser =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response.isSystemUser) === false
            ? response.response.isSystemUser
            : null;
        console.log("idSystemUser", idSystemUser);
        history.push("/auth");
      } else {
        if (isEmpty(data.password) || isEmpty(data.email)) {
          setErrorsLogin({
            ...errorsLogin,
            errorPass: isEmpty(data.password),
            errorEmail: isEmpty(data.email),
          });
        }
      }
    } catch (error) {
      setErrorsLogin({ ...errorsLogin, error: true, message: error });
    }
  };

  return (
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Girl in a jacket" className="login_logo" />
      </div>
      <div className="login_main">
        <div className="login_card_form">
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
                <label className="login-label-placeholder">Usuario</label>
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
              <p>Olvidé mi contraseña</p>
            </div>
            <div className="button_init_primary">
              <button
                type="button"
                onClick={() => {
                  handlerCallApiLogin(dataLogin);
                }}
              >
                <span>Iniciar sesión</span>
              </button>
            </div>
          </div>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  callApiLogin: (data) => dispatch(callApiLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
