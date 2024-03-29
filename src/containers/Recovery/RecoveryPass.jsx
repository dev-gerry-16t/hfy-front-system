import React, { useState } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import "antd/dist/antd.css";
import { Input, Spin, Alert, Progress, message } from "antd";
import { MailOutlined, LockOutlined, SyncOutlined } from "@ant-design/icons";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetAllRequestRecoveryPass,
  callGetAllVerifyCodeRecoveryPass,
  callPutRecoveryPass,
} from "../../utils/actions/actions";
import logo from "../../assets/img/logo.png";
import admiration from "../../assets/icons/exclaim.svg";
import Arrow from "../../assets/icons/Arrow.svg";

const RecoveryPassword = (props) => {
  const {
    history,
    callGetAllRequestRecoveryPass,
    callGetAllVerifyCodeRecoveryPass,
    callPutRecoveryPass,
  } = props;
  const copyErrors = {
    errorCodeVerify: {
      error: false,
      message: "El código de verificación ingresado es invalido",
    },
  };
  const [errorsRegister, setErrorsRegister] = useState(copyErrors);
  const [userType, setUserType] = useState(1);
  const [spinVisible, setSpinVisible] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [dataForm, setDataForm] = useState({
    username: null,
    password: null,
  });
  const [securePass, setSecurePass] = useState({
    lengthCharacter: false,
    upperLowerword: false,
    numbers: false,
    percentStatus: 0,
  });
  const [codeVerify, setCodeVerify] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  const LoadingSpin = <SyncOutlined spin />;

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const testMailFunction = (email) => {
    try {
      const regExp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const validateEmail = regExp.test(email);
      if (validateEmail === true) {
        return true;
      } else if (isEmpty(email) === false && validateEmail === false) {
        throw new Error("Formato de correo no válido.");
      } else if (isEmpty(email) === true) {
        throw new Error("El correo electrónico es un campo requerido.");
      }
    } catch (error) {
      throw error.message;
    }
  };

  const handlerCallApiRegister = async (data) => {
    try {
      await testMailFunction(data);
      const response = await callGetAllRequestRecoveryPass({
        userName: data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : "";
      setDataForm({ ...dataForm, ...responseResult });
      setSpinVisible(false);
      setUserType(2);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallChangePassword = async (data, id) => {
    try {
      await callPutRecoveryPass(data, id);
      setSpinVisible(false);
      setUserType(4);
    } catch (error) {
      setSpinVisible(false);
      throw error;
    }
  };

  const handlerCallVerifyCode = async (data) => {
    try {
      await callGetAllVerifyCodeRecoveryPass(data);
      setSpinVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const handlerEvalutePassword = (pass) => {
    const size = /^(?=.{8,}).*$/;
    const lowerInPass = /^(?=\w*[a-z])/;
    const upperInPass = /^(?=\w*[A-Z])/;
    const numberInPass = /^(?=.*\d)/;

    let lengthCharacter = false;
    let upperLowerword = false;
    let numbers = false;
    let lengthCharacterPercent = 0;
    let upperLowerwordPercent = 0;
    let numbersPercent = 0;

    if (size.test(pass) === true) {
      lengthCharacter = true;
      lengthCharacterPercent = 25;
    }
    if (lowerInPass.test(pass) === true && upperInPass.test(pass) === true) {
      upperLowerword = true;
      upperLowerwordPercent = 50;
    }
    if (numberInPass.test(pass) === true) {
      numbers = true;
      numbersPercent = 25;
    }

    setSecurePass({
      lengthCharacter,
      upperLowerword,
      numbers,
      percentStatus:
        lengthCharacterPercent + upperLowerwordPercent + numbersPercent,
    });
  };

  const selectEmail = (
    <div className="login_main">
      <div className="login_card_form">
        <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
          <div className="login_top_form">
            <h1> ¿Tienes problemas para iniciar sesión? </h1>
            <p className="recoverInstructions">
              Ingresa el correo con el que te registraste para poder
              reestablecer tu contraseña.
            </p>
            <div className="login_inputs_form">
              <Input
                value={dataForm.username}
                suffix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Correo electrónico"
                onChange={(e) => {
                  const value = e.target.value;
                  setDataForm({
                    ...dataForm,
                    username: value,
                  });
                }}
              />
            </div>
            <div className="button_init_primary" style={{ margin: "60px 0 0" }}>
              <button
                type="button"
                onClick={() => {
                  setSpinVisible(true);
                  handlerCallApiRegister(dataForm.username);
                }}
              >
                <span> Enviar código </span>
              </button>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );

  const insterCodeCompoent = (
    <div className="login_main">
      <div className="login_card_form">
        <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
          <div className="login_top_form">
            <h1>
              <button
                className="arrow-back-to"
                type="button"
                onClick={() => {
                  setUserType(1);
                }}
              >
                <img src={Arrow} alt="backTo" width="30" />
              </button>
              Ingresa tu código{" "}
            </h1>
            <div
              className={`error_login_incorrect_data ${
                errorsRegister.errorCodeVerify.error === false
                  ? "hide"
                  : "visible"
              }`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {errorsRegister.errorCodeVerify.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorCodeVerify.message}</span>
                </div>
              )}
            </div>
            <p className="recoverInstructions">
              Enviamos un código de confirmación al correo{" "}
              <strong>{dataForm.username}</strong>, te recomendamos revisar tu
              correo no deseado.
            </p>
            <div className="codeForm">
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-0"
                  type="number"
                  value={codeVerify.value1}
                  maxLength={1}
                  minLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                    } else {
                      document.getElementById("input-code-validate-1").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value1: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-1"
                  type="number"
                  value={codeVerify.value2}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                      document.getElementById("input-code-validate-0").focus();
                    } else {
                      document.getElementById("input-code-validate-2").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value2: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-2"
                  type="number"
                  value={codeVerify.value3}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                      document.getElementById("input-code-validate-1").focus();
                    } else {
                      document.getElementById("input-code-validate-3").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value3: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-3"
                  type="number"
                  value={codeVerify.value4}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                      document.getElementById("input-code-validate-2").focus();
                    } else {
                      document.getElementById("input-code-validate-4").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value4: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-4"
                  type="number"
                  value={codeVerify.value5}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                      document.getElementById("input-code-validate-3").focus();
                    } else {
                      document.getElementById("input-code-validate-5").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value5: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <Input
                  id="input-code-validate-5"
                  type="number"
                  value={codeVerify.value6}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event.target.value === "") {
                      document.getElementById("input-code-validate-4").focus();
                    } else {
                      document.getElementById("button-send-code").focus();
                    }
                    if (event.target.value.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value6: event.target.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="button_init_primary" style={{ margin: "60px 0 0" }}>
              <button
                type="button"
                id="button-send-code"
                onClick={async () => {
                  setSpinVisible(true);
                  try {
                    let numberResult = "";
                    for (const property in codeVerify) {
                      numberResult += codeVerify[property];
                    }
                    await handlerCallVerifyCode({
                      idRequestRecoveryPassword:
                        dataForm.idRequestPasswordRecovery,
                      code: numberResult,
                    });
                    setDataForm({
                      ...dataForm,
                      code: numberResult,
                    });
                    setUserType(3);
                  } catch (error) {
                    const objectErrors = {
                      ...errorsRegister,
                      errorCodeVerify: {
                        ...errorsRegister.errorCodeVerify,
                        error: true,
                        message: error,
                      },
                    };
                    setErrorsRegister(objectErrors);
                    setSpinVisible(false);
                  }
                }}
              >
                <span> Validar </span>
              </button>
            </div>
            <div
              className="login-recover-pass"
              style={{ marginTop: "15px", cursor: "pointer" }}
            >
              <p
                type="button"
                onClick={async () => {
                  document.getElementById("input-code-validate-0").focus();
                  setCodeVerify({
                    value1: "",
                    value2: "",
                    value3: "",
                    value4: "",
                    value5: "",
                    value6: "",
                  });
                  setDataForm({ ...dataForm, code: null });
                  setErrorsRegister(copyErrors);
                  setSpinVisible(true);
                  handlerCallApiRegister(dataForm.username);
                }}
              >
                Reenviar código
              </p>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );

  const insterNewPassword = (
    <div className="login_main" style={{ height: "150%" }}>
      <div className="login_card_form">
        <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
          <div className="login_top_form">
            <h1> Reestablece tu contraseña </h1>
            <p className="recoverInstructions">
              ¡Perfecto! Ingresa tu nueva contraseña
            </p>
            <div className="login_inputs_form">
              <div className="confirmPasswordHolder">
                <Input
                  value={dataForm.password}
                  suffix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Contraseña nueva"
                  type="password"
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({
                      ...dataForm,
                      password: value,
                    });
                    handlerEvalutePassword(value);
                  }}
                />
                <p
                  className="fieldset_title"
                  style={{ margin: "10px 0px 0px 0px" }}
                >
                  {securePass.percentStatus === 100
                    ? "Tu contraseña es segura"
                    : "La contraseña debe contener"}
                </p>
                <Progress
                  percent={
                    isNil(securePass.percentStatus) === false
                      ? securePass.percentStatus
                      : 0
                  }
                  status={
                    securePass.percentStatus === 100 ? "success" : "exception"
                  }
                />
                {securePass.lengthCharacter === false && (
                  <Alert
                    message="Al menos 8 caracteres"
                    type="warning"
                    showIcon
                  />
                )}
                {securePass.upperLowerword === false && (
                  <Alert
                    message="Letras mayúsculas y minúsculas (AaBbCc)"
                    type="warning"
                    showIcon
                  />
                )}
                {securePass.numbers === false && (
                  <Alert message="Números" type="warning" showIcon />
                )}
              </div>

              <div
                className="confirmPasswordHolder"
                style={{ margin: "48px 0 0" }}
              >
                <Input
                  value={verifyPassword}
                  type="password"
                  suffix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirma contraseña"
                  onChange={(e) => {
                    const value = e.target.value;
                    setVerifyPassword(value);
                  }}
                />
              </div>
              <div>
                {isNil(dataForm.password) === false &&
                  isEmpty(dataForm.password) === false &&
                  isNil(verifyPassword) === false &&
                  isEmpty(verifyPassword) === false && (
                    <p className="fieldset_title">
                      {dataForm.password === verifyPassword
                        ? "Las contraseñas coinciden"
                        : " Las contraseñas no coinciden"}
                    </p>
                  )}
              </div>
            </div>
            <div
              className={
                securePass.percentStatus === 100 &&
                dataForm.password === verifyPassword
                  ? "button_init_primary"
                  : "button_init_primary_disabled"
              }
              style={{ margin: "60px 0 0" }}
            >
              <button
                type="button"
                onClick={() => {
                  if (
                    securePass.percentStatus === 100 &&
                    dataForm.password === verifyPassword
                  ) {
                    setSpinVisible(true);
                    handlerCallChangePassword(
                      {
                        password: dataForm.password,
                        code: dataForm.code,
                      },
                      dataForm.idRequestPasswordRecovery
                    );
                  }
                }}
              >
                <span> Guardar y Continuar </span>
              </button>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );

  const successChangePassword = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¡Muy bien! </h1>
          <p className="recoverInstructions">
            Tu contraseña se restablecio exitosamente.
          </p>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                history.push("/login");
              }}
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypeComponent = (type) => {
    let component = <div />;
    switch (type) {
      case 1:
        component = selectEmail;
        break;
      case 2:
        component = insterCodeCompoent;
        break;
      case 3:
        component = insterNewPassword;
        break;
      case 4:
        component = successChangePassword;
        break;
      default:
        component = <div />;
        break;
    }
    return component;
  };

  return (
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Homify Logo" className="login_logo" />
      </div>
      {renderTypeComponent(userType)}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  callGetAllRequestRecoveryPass: (data) =>
    dispatch(callGetAllRequestRecoveryPass(data)),
  callGetAllVerifyCodeRecoveryPass: (data) =>
    dispatch(callGetAllVerifyCodeRecoveryPass(data)),
  callPutRecoveryPass: (data, id) => dispatch(callPutRecoveryPass(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPassword);
