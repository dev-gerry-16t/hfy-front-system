import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import "antd/dist/antd.css";
import { Radio, Select, Input } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  callGetAllCustomers,
  callGetAllPersons,
  callGetAllEndorsement,
  callGetAllRegisterUser,
  callGetAllVerifyCode,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import logo from "../../assets/img/logo.png";
import admiration from "../../assets/icons/exclaim.svg";
import saqareX from "../../assets/icons/saqareX.svg";

const { Option } = Select;

const Register = (props) => {
  const {
    history,
    callGetAllCustomers,
    callGetAllPersons,
    callGetAllEndorsement,
    callGetAllRegisterUser,
    callGetAllVerifyCode,
  } = props;
  const [userType, setUserType] = useState(1);
  const [userCustomer, setUserCustomer] = useState([]);
  const [selectuserCustomer, setSelectUserCustomer] = useState(1);
  const [userPerson, setUserPerson] = useState([]);
  const [userEndorsement, setUserEndorsement] = useState([]);
  const [configComponents, setConfigComponents] = useState({});
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [dataForm, setDataForm] = useState({
    idPersonType: null,
    idEndorsement: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    username: null,
    password: null,
  });
  const copyErrors = {
    errorPass: {
      error: false,
      message: "Las contraseñas no coinciden",
      errorEmpty: false,
      messageEmpty: "La contraseña es requerida",
    },
    errorGivenName: {
      error: false,
      message: "El Nombre o Razón social es requerido",
    },
    errorUserName: {
      error: false,
      message: "El correo electrónico es requerido",
      errorFormat: false,
      messageFormatError: "El correo electronico no es valido",
    },
    errorPersonType: {
      error: false,
      message: "El tipo de persona es requerido",
    },
  };
  const [errorsRegister, setErrorsRegister] = useState(copyErrors);
  const [errorFormulary, setErrorFormulary] = useState(false);
  const [idRequestSignUp, setIdRequestSignUp] = useState(null);
  const [codeVerify, setCodeVerify] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });
  const errorCatchBase = {
    error: false,
    message: "",
  };
  const [errorBase, setErrorBase] = useState(errorCatchBase);

  const handlerCallApiCustomer = async (data) => {
    try {
      const response = await callGetAllCustomers(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      setUserCustomer(responseResult);
    } catch (error) {}
  };

  const handlerCallApiPersonTypes = async (data) => {
    try {
      const response = await callGetAllPersons(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      setUserPerson(responseResult);
    } catch (error) {}
  };

  const handlerCallApiEndorsement = async (data) => {
    try {
      const response = await callGetAllEndorsement(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      setUserEndorsement(responseResult);
    } catch (error) {}
  };

  const handlerCallApiRegister = async (data) => {
    try {
      const response = await callGetAllRegisterUser(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : "";
      setIdRequestSignUp(
        isEmpty(responseResult) === false ? responseResult.idRequestSignUp : ""
      );
    } catch (error) {
      throw error;
    }
  };

  const handlerCallVerifyCode = async (data) => {
    try {
      await callGetAllVerifyCode(data);
    } catch (error) {
      throw error;
    }
  };

  const handlerVerifyInformation = async (data) => {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let objectErrors = errorsRegister;
    let validatePass = true;
    let validateIdPerson = true;
    let validateGivenName = true;
    let validateUserName = true;
    const validateTypeEmail =
      isNil(data.username) === false ? emailRegex.test(data.username) : false;

    if (
      isEmpty(data.password) === false &&
      isEmpty(data.verifyPassword) === false &&
      data.password === data.verifyPassword
    ) {
      validatePass = true;
    } else if (isEmpty(data.password) || isEmpty(data.verifyPassword)) {
      objectErrors = {
        ...objectErrors,
        errorPass: { ...objectErrors.errorPass, errorEmpty: true },
      };
      validatePass = false;
    } else if (data.password !== data.verifyPassword) {
      objectErrors = {
        ...objectErrors,
        errorPass: { ...objectErrors.errorPass, error: true },
      };
      validatePass = false;
    }

    if (isNil(data.idPersonType) === false) {
      validateIdPerson = true;
    } else {
      objectErrors = {
        ...objectErrors,
        errorPersonType: { ...objectErrors.errorPersonType, error: true },
      };
      validateIdPerson = false;
    }

    if (isNil(data.givenName) === false && isEmpty(data.givenName) === false) {
      validateGivenName = true;
    } else {
      objectErrors = {
        ...objectErrors,
        errorGivenName: { ...objectErrors.errorGivenName, error: true },
      };
      validateGivenName = false;
    }

    if (
      isNil(data.username) === false &&
      isEmpty(data.username) === false &&
      validateTypeEmail === true
    ) {
      validateUserName = true;
    } else {
      if (isEmpty(data.username) || isEmpty(data.username)) {
        objectErrors = {
          ...objectErrors,
          errorUserName: { ...objectErrors.errorUserName, error: true },
        };
      } else if (validateTypeEmail === false) {
        objectErrors = {
          ...objectErrors,
          errorUserName: { ...objectErrors.errorUserName, errorFormat: true },
        };
      }
      validateUserName = false;
    }

    setErrorsRegister(objectErrors);

    return (
      validatePass && validateIdPerson && validateGivenName && validateUserName
    );
  };

  const selectPerson = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¿Qué te trae por aquí? </h1>
          <div className="login_inputs_form">
            <Radio.Group
              name="radiogroup"
              value={selectuserCustomer}
              defaultValue={1}
              onChange={(e) => {
                setSelectUserCustomer(e.target.value);
              }}
            >
              {isEmpty(userCustomer) === false &&
                userCustomer.map((row) => {
                  return (
                    <p className="visible" style={{ marginBottom: "32px" }}>
                      <Radio value={row.id}> {row.text} </Radio>
                    </p>
                  );
                })}
            </Radio.Group>
            <div className="button_init_primary">
              <button
                type="button"
                onClick={async () => {
                  await handlerCallApiPersonTypes({
                    idType: 1,
                    idCustomerType: selectuserCustomer,
                  });
                  await handlerCallApiEndorsement({
                    idType: 1,
                  });
                  setUserType(2);
                }}
              >
                <span>Continuar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const selectForm = (
    <div className="login_main" style={{ height: "100%" }}>
      <div className="login_card_form large">
        <div className="register_holder">
          <div className="login_top_form">
            <h1> Completa tu perfil </h1>
            <div
              className={`error_login_incorrect_data ${
                errorFormulary === false ? "hide" : "visible"
              }`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {errorBase.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorBase.message}</span>
                </div>
              )}
              {errorsRegister.errorGivenName.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorGivenName.message}</span>
                </div>
              )}
              {errorsRegister.errorPass.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorPass.message}</span>
                </div>
              )}
              {errorsRegister.errorPass.errorEmpty && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorPass.messageEmpty}</span>
                </div>
              )}
              {errorsRegister.errorPersonType.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorPersonType.message}</span>
                </div>
              )}
              {errorsRegister.errorUserName.error && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorUserName.message}</span>
                </div>
              )}
              {errorsRegister.errorUserName.errorFormat && (
                <div>
                  <img src={admiration} alt="exclaim" />
                  <span>{errorsRegister.errorUserName.messageFormatError}</span>
                </div>
              )}
            </div>
            <label className="fieldset_title">Información personal</label>
            <div className="register_row half">
              <Select
                placeholder="Tipo de Persona"
                onChange={(value, option) => {
                  const configureOption = option.onClick();
                  setConfigComponents(configureOption);
                  setErrorsRegister(copyErrors);
                  setErrorFormulary(false);
                  setDataForm({ ...dataForm, idPersonType: value });
                }}
              >
                {isEmpty(userPerson) === false &&
                  userPerson.map((row) => {
                    return (
                      <Option
                        value={row.id}
                        onClick={() => {
                          return isNil(row) === false &&
                            isNil(row.jsonProperties) === false
                            ? JSON.parse(row.jsonProperties)
                            : {};
                        }}
                      >
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
              {isEmpty(configComponents) === false &&
                configComponents.idEndorsement && (
                  <Select
                    placeholder="Aval"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, idEndorsement: value });
                    }}
                  >
                    {isEmpty(userEndorsement) === false &&
                      userEndorsement.map((row) => {
                        return <Option value={row.id}>{row.text}</Option>;
                      })}
                  </Select>
                )}
            </div>
            <div className="register_row">
              <Input
                value={dataForm.givenName}
                suffix={<UserOutlined />}
                placeholder={
                  configComponents.lastName ? "Nombre(s):" : "Razón Social"
                }
                onChange={(e) => {
                  setDataForm({ ...dataForm, givenName: e.target.value });
                  setErrorsRegister(copyErrors);
                  setErrorFormulary(false);
                }}
              />
            </div>
            <div className="register_row half">
              {isEmpty(configComponents) === false &&
                configComponents.lastName && (
                  <Input
                    value={dataForm.lastName}
                    suffix={<UserOutlined />}
                    placeholder="Primer Apellido"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, lastName: e.target.value });
                    }}
                  />
                )}
              {isEmpty(configComponents) === false &&
                configComponents.mothersMaidenName && (
                  <Input
                    value={dataForm.mothersMaidenName}
                    suffix={<UserOutlined />}
                    placeholder="Segundo Apellido"
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        mothersMaidenName: e.target.value,
                      });
                    }}
                  />
                )}
            </div>
            <label className="fieldset_title"> Información de contacto </label>
            <div className="register_row half">
              <Input
                value={dataForm.phoneNumber}
                suffix={<PhoneOutlined />}
                placeholder="Teléfono celular"
                onChange={(e) => {
                  const regexp = /^([0-9])*$/;
                  if (regexp.test(e.target.value) === true) {
                    setDataForm({ ...dataForm, phoneNumber: e.target.value });
                  }
                }}
              />
              <Input
                value={dataForm.username}
                suffix={<MailOutlined />}
                placeholder="Correo electrónico"
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    username: e.target.value,
                  });
                  setErrorsRegister(copyErrors);
                  setErrorFormulary(false);
                }}
              />
            </div>
            <label className="fieldset_title"> Contraseña </label>
            <div className="register_row half">
              <Input
                value={dataForm.password}
                suffix={<LockOutlined />}
                placeholder="Contraseña"
                type="password"
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    password: e.target.value,
                  });
                  setErrorsRegister(copyErrors);
                  setErrorFormulary(false);
                }}
              />
              <Input
                value={verifyPassword}
                suffix={<LockOutlined />}
                placeholder="Confirmar Contraseña"
                type="password"
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                  setErrorsRegister(copyErrors);
                  setErrorFormulary(false);
                }}
              />
            </div>
            <div className="button_init_primary" style={{ margin: "16px 0 0" }}>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const verifyData = await handlerVerifyInformation({
                      ...dataForm,
                      verifyPassword,
                    });
                    setErrorFormulary(!verifyData);
                    if (verifyData === true) {
                      await handlerCallApiRegister({
                        ...dataForm,
                        idCustomerType: selectuserCustomer,
                        offset: "-06:00",
                      });
                      setUserType(3);
                    }
                  } catch (error) {
                    setErrorFormulary(true);
                    setErrorBase({ ...errorBase, error: true, message: error });
                    setTimeout(() => {
                      setErrorFormulary(false);
                      setErrorBase(errorCatchBase);
                    }, 3000);
                  }
                }}
              >
                <span> Registrarme </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const insterCodeCompoent = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Ingresa tu código </h1>
          <p className="recoverInstructions">
            Enviamos un código de confirmación al correo {dataForm.username}
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
                  const arrayCode = codeVerify;
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
                  const arrayCode = codeVerify;
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
                  const arrayCode = codeVerify;
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
                  const arrayCode = codeVerify;
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
                  const arrayCode = codeVerify;
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
                  const arrayCode = codeVerify;
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
                try {
                  let numberResult = "";
                  for (const property in codeVerify) {
                    numberResult += codeVerify[property];
                  }
                  await handlerCallVerifyCode({
                    code: numberResult,
                    idRequestSignUp,
                    offset: "-06:00",
                  });
                  setUserType(4);
                } catch (error) {}
              }}
            >
              <span> Validar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const successRegister = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Registro completo </h1>
          <p className="recoverInstructions">
            Felicidades tu registro se realizó con éxito!
          </p>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                history.push("/login");
              }}
            >
              <span>Ir al Login</span>
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
        component = selectPerson;
        break;
      case 2:
        component = selectForm;
        break;
      case 3:
        component = insterCodeCompoent;
        break;
      case 4:
        component = successRegister;
        break;
      default:
        component = <div />;
        break;
    }
    return component;
  };

  const handlerAsyncCallAppis = async () => {
    await handlerCallApiCustomer({ idType: 1 });
  };

  useEffect(() => {
    handlerAsyncCallAppis();
  }, []);
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
  callGetAllCustomers: (data) => dispatch(callGetAllCustomers(data)),
  callGetAllPersons: (data) => dispatch(callGetAllPersons(data)),
  callGetAllEndorsement: (data) => dispatch(callGetAllEndorsement(data)),
  callGetAllRegisterUser: (data) => dispatch(callGetAllRegisterUser(data)),
  callGetAllVerifyCode: (data) => dispatch(callGetAllVerifyCode(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
