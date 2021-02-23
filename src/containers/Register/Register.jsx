import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import "antd/dist/antd.css";
import {
  Radio,
  Select,
  Input,
  Spin,
  Skeleton,
  Alert,
  Progress,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  callGetAllCustomers,
  callGetAllPersons,
  callGetAllEndorsement,
  callGetAllRegisterUser,
  callGetAllVerifyCode,
  callGetInvitationUser,
} from "../../utils/actions/actions";
import logo from "../../assets/img/logo.png";
import admiration from "../../assets/icons/exclaim.svg";
import Arrow from "../../assets/icons/Arrow.svg";
import CustomInput from "../../components/CustomInput";

const { Option } = Select;

const Register = (props) => {
  const {
    history,
    callGetAllCustomers,
    callGetAllPersons,
    callGetAllEndorsement,
    callGetAllRegisterUser,
    callGetAllVerifyCode,
    callGetInvitationUser,
  } = props;
  const [userType, setUserType] = useState(null);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [userCustomer, setUserCustomer] = useState([]);
  const [securePass, setSecurePass] = useState({
    lengthCharacter: false,
    upperLowerword: false,
    numbers: false,
    specialCharacters: false,
    percentStatus: 0,
  });
  const [selectuserCustomer, setSelectUserCustomer] = useState(1);
  const [userPerson, setUserPerson] = useState([]);
  const [userEndorsement, setUserEndorsement] = useState([]);
  const [configComponents, setConfigComponents] = useState({});
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [spinVisible, setSpinVisible] = useState(false);
  const [dataForm, setDataForm] = useState({
    idPersonType: null,
    idEndorsement: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    username: null,
    password: null,
    idInvitation: null,
  });

  const LoadingSpin = <SyncOutlined spin />;

  const copyErrors = {
    errorPass: {
      error: false,
      message: "Las contraseñas no coinciden",
      errorEmpty: false,
      messageEmpty: "La contraseña es requerida",
    },
    errorPassSecure: {
      error: false,
      message: "Tu contraseña no es segura",
      errorEmpty: false,
      messageEmpty: "Tu contraseña no es segura",
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
    errorCodeVerify: {
      error: false,
      message: "El código de verificación ingresado es invalido",
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

  const handlerCallApiPersonTypes = async (data, person) => {
    const { match } = props;
    const params = isEmpty(match.params) === false ? match.params : {};
    try {
      const response = await callGetAllPersons(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      if (isEmpty(params) === false && isEmpty(responseResult) === false) {
        const filterCondition = responseResult.find((row) => {
          return row.idPersonType == person;
        });
        const parseResult = JSON.parse(filterCondition.jsonProperties);
        setConfigComponents(parseResult);
      }
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

  const handlerCallGetInvitationUser = async (id) => {
    try {
      const response = await callGetInvitationUser(id);
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      await handlerCallApiPersonTypes(
        {
          idType: 1,
          idCustomerType: responseResult.idCustomerType,
        },
        responseResult.idPersonType
      );
      await handlerCallApiEndorsement({
        idType: 1,
      });
      setSelectUserCustomer(responseResult.idCustomerType);
      setDataForm({
        ...dataForm,
        idPersonType: responseResult.idPersonType,
        givenName: responseResult.givenName,
        lastName:
          isNil(responseResult.lastName) === false
            ? responseResult.lastName
            : null,
        mothersMaidenName:
          isNil(responseResult.mothersMaidenName) === false
            ? responseResult.mothersMaidenName
            : null,
        username: responseResult.usernameRequested,
        idInvitation: responseResult.idInvitation,
      });
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
      setSpinVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const handlerVerifyInformation = async (data) => {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let objectErrors = errorsRegister;
    let validatePass = true;
    let validatePassSecure = true;
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

    if (securePass.percentStatus < 100) {
      objectErrors = {
        ...objectErrors,
        errorPassSecure: { ...objectErrors.errorPassSecure, error: true },
      };
      validatePassSecure = false;
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
      validatePass &&
      validateIdPerson &&
      validateGivenName &&
      validateUserName &&
      validatePassSecure
    );
  };

  const handlerEvalutePassword = (pass) => {
    const size = /^(?=.{8,}).*$/;
    const lowerInPass = /^(?=\w*[a-z])/;
    const upperInPass = /^(?=\w*[A-Z])/;
    const numberInPass = /^(?=.*\d)/;
    const specialCharacter = /^(?=.*[$@$!%*?&])/;

    let lengthCharacter = false;
    let upperLowerword = false;
    let numbers = false;
    let specialCharacters = false;
    let lengthCharacterPercent = 0;
    let upperLowerwordPercent = 0;
    let numbersPercent = 0;
    let specialCharactersPercent = 0;

    if (size.test(pass) === true) {
      lengthCharacter = true;
      lengthCharacterPercent = 25;
    }
    if (lowerInPass.test(pass) === true && upperInPass.test(pass) === true) {
      upperLowerword = true;
      upperLowerwordPercent = 25;
    }
    if (numberInPass.test(pass) === true) {
      numbers = true;
      numbersPercent = 25;
    }
    if (specialCharacter.test(pass) === true) {
      specialCharacters = true;
      specialCharactersPercent = 25;
    }
    setSecurePass({
      lengthCharacter,
      upperLowerword,
      numbers,
      specialCharacters,
      percentStatus:
        lengthCharacterPercent +
        upperLowerwordPercent +
        numbersPercent +
        specialCharactersPercent,
    });
  };

  const selectPerson = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1>
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                history.push("/login");
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            ¿Qué te trae por aquí?{" "}
          </h1>
          <div className="login_inputs_form">
            <Skeleton loading={isEmpty(userCustomer) === true} active />
            {isEmpty(userCustomer) === false && (
              <Radio.Group
                name="radiogroup"
                value={selectuserCustomer}
                defaultValue={1}
                onChange={(e) => {
                  setSelectUserCustomer(e.target.value);
                }}
              >
                {userCustomer.map((row) => {
                  return (
                    <p className="visible" style={{ marginBottom: "32px" }}>
                      <Radio value={row.id}> {row.text} </Radio>
                    </p>
                  );
                })}
              </Radio.Group>
            )}

            <div className="button_init_primary">
              <button
                type="button"
                onClick={async () => {
                  await handlerCallApiPersonTypes(
                    {
                      idType: 1,
                      idCustomerType: selectuserCustomer,
                    },
                    dataForm.idPersonType
                  );
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
    <div className="login_main" style={{ height: "150%" }}>
      <div className="login_card_form large">
        <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
          <div className="register_holder">
            <div className="login_top_form">
              <h1>
                <button
                  className="arrow-back-to"
                  type="button"
                  onClick={() => {
                    const { match } = props;
                    const params =
                      isEmpty(match.params) === false ? match.params : {};
                    if (isEmpty(params) === false) {
                      history.push("/login");
                    } else {
                      setUserType(1);
                    }
                  }}
                >
                  <img src={Arrow} alt="backTo" width="30" />
                </button>
                Completa tu perfil{" "}
              </h1>
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
                {errorsRegister.errorPassSecure.error && (
                  <div>
                    <img src={admiration} alt="exclaim" />
                    <span>{errorsRegister.errorPassSecure.message}</span>
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
                    <span>
                      {errorsRegister.errorUserName.messageFormatError}
                    </span>
                  </div>
                )}
              </div>
              <label className="fieldset_title">Información personal</label>
              {selectuserCustomer !== 3 && (
                <div className="register_row half">
                  <Select
                    placeholder="Tipo de Persona"
                    value={dataForm.idPersonType}
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
              )}{" "}
              <div className="register_row">
                <CustomInput
                  value={dataForm.givenName}
                  suffix={<UserOutlined />}
                  placeholder={
                    configComponents.lastName || selectuserCustomer === 3
                      ? "Nombre(s):"
                      : "Razón Social"
                  }
                  onChange={(e) => {
                    setDataForm({ ...dataForm, givenName: e });
                    setErrorsRegister(copyErrors);
                    setErrorFormulary(false);
                  }}
                />
              </div>
              <div className="register_row half">
                {isEmpty(configComponents) === false &&
                  selectuserCustomer !== 3 &&
                  configComponents.lastName && (
                    <CustomInput
                      value={dataForm.lastName}
                      suffix={<UserOutlined />}
                      placeholder="Primer Apellido"
                      onChange={(e) => {
                        setDataForm({ ...dataForm, lastName: e });
                      }}
                    />
                  )}
                {selectuserCustomer === 3 && (
                  <CustomInput
                    value={dataForm.lastName}
                    suffix={<UserOutlined />}
                    placeholder="Primer Apellido"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, lastName: e });
                    }}
                  />
                )}
                {isEmpty(configComponents) === false &&
                  selectuserCustomer !== 3 &&
                  configComponents.mothersMaidenName && (
                    <CustomInput
                      value={dataForm.mothersMaidenName}
                      suffix={<UserOutlined />}
                      placeholder="Segundo Apellido"
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          mothersMaidenName: e,
                        });
                      }}
                    />
                  )}
                {selectuserCustomer === 3 && (
                  <CustomInput
                    value={dataForm.mothersMaidenName}
                    suffix={<UserOutlined />}
                    placeholder="Segundo Apellido"
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        mothersMaidenName: e,
                      });
                    }}
                  />
                )}
              </div>
              <label className="fieldset_title">
                {" "}
                Información de contacto{" "}
              </label>
              <div className="register_row half">
                <CustomInput
                  value={dataForm.phoneNumber}
                  suffix={<PhoneOutlined />}
                  placeholder="Teléfono celular"
                  onChange={(e) => {
                    const regexp = /^([0-9])*$/;
                    if (regexp.test(e) === true) {
                      setDataForm({ ...dataForm, phoneNumber: e });
                    }
                  }}
                />
                <CustomInput
                  value={dataForm.username}
                  suffix={<MailOutlined />}
                  placeholder="Correo electrónico"
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      username: e,
                    });
                    setErrorsRegister(copyErrors);
                    setErrorFormulary(false);
                  }}
                />
              </div>
              <label className="fieldset_title"> Contraseña </label>
              <div className="register_row half">
                <CustomInput
                  value={dataForm.password}
                  suffix={<LockOutlined />}
                  placeholder="Contraseña"
                  type="password"
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      password: e,
                    });
                    setErrorsRegister(copyErrors);
                    setErrorFormulary(false);
                    handlerEvalutePassword(e);
                  }}
                />
                <CustomInput
                  value={verifyPassword}
                  suffix={<LockOutlined />}
                  placeholder="Confirmar Contraseña"
                  type="password"
                  onChange={(e) => {
                    setVerifyPassword(e);
                    setErrorsRegister(copyErrors);
                    setErrorFormulary(false);
                  }}
                />
              </div>
              <div>
                <Progress
                  percent={securePass.percentStatus}
                  status={
                    securePass.percentStatus === 100 ? "success" : "exception"
                  }
                />
                <p className="fieldset_title">
                  {securePass.percentStatus === 100
                    ? "Tu contraseña es segura"
                    : "La contraseña debe contener"}
                </p>
                {securePass.lengthCharacter === false && (
                  <Alert
                    message="Al menos 8 caracteres"
                    type="warning"
                    showIcon
                  />
                )}
                {securePass.upperLowerword === false && (
                  <Alert
                    message="Letras mayusculas y minusculas (AaBbCc)"
                    type="warning"
                    showIcon
                  />
                )}
                {securePass.numbers === false && (
                  <Alert message="Numeros" type="warning" showIcon />
                )}
                {securePass.specialCharacters === false && (
                  <Alert
                    message="Caracteres especiales (@$&!%*?)"
                    type="warning"
                    showIcon
                  />
                )}
              </div>
              <div>
                <Checkbox
                  checked={aceptTerms}
                  onChange={(e) => {
                    setAceptTerms(e.target.checked);
                  }}
                ></Checkbox>
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 10,
                    color: "gray",
                  }}
                >
                  Acepto los{" "}
                  <a href="https://segurent.mx/aviso-de-privacidad/">
                    Terminos y Condiciones{" "}
                  </a>
                  asi como el{" "}
                  <a href="https://segurent.mx/aviso-de-privacidad/">
                    Aviso de privacidad
                  </a>
                </span>
              </div>
              <div
                className={
                  aceptTerms === true
                    ? "button_init_primary"
                    : "button_init_primary_disabled"
                }
                style={{ margin: "16px 0 0" }}
              >
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
                        setSpinVisible(true);
                        await handlerCallApiRegister({
                          ...dataForm,
                          idCustomerType: selectuserCustomer,
                          offset: "-06:00",
                        });
                        setUserType(3);
                        setSpinVisible(false);
                      }
                    } catch (error) {
                      setSpinVisible(false);
                      setErrorFormulary(true);
                      setErrorBase({
                        ...errorBase,
                        error: true,
                        message: error,
                      });
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
                  setUserType(2);
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
              <strong>{dataForm.username}</strong>
            </p>
            <div className="codeForm">
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-0"
                  type="number"
                  value={codeVerify.value1}
                  maxLength={1}
                  minLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                    } else {
                      document.getElementById("input-code-validate-1").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value1: event,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-1"
                  type="number"
                  value={codeVerify.value2}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                      document.getElementById("input-code-validate-0").focus();
                    } else {
                      document.getElementById("input-code-validate-2").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value2: event,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-2"
                  type="number"
                  value={codeVerify.value3}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                      document.getElementById("input-code-validate-1").focus();
                    } else {
                      document.getElementById("input-code-validate-3").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value3: event,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-3"
                  type="number"
                  value={codeVerify.value4}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                      document.getElementById("input-code-validate-2").focus();
                    } else {
                      document.getElementById("input-code-validate-4").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value4: event,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-4"
                  type="number"
                  value={codeVerify.value5}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                      document.getElementById("input-code-validate-3").focus();
                    } else {
                      document.getElementById("input-code-validate-5").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value5: event,
                      });
                    }
                  }}
                />
              </div>
              <div className="codeFormItem">
                <CustomInput
                  id="input-code-validate-5"
                  type="number"
                  value={codeVerify.value6}
                  maxLength={1}
                  onChange={(event) => {
                    setErrorsRegister(copyErrors);
                    if (event === "") {
                      document.getElementById("input-code-validate-4").focus();
                    } else {
                      document.getElementById("button-send-code").focus();
                    }
                    if (event.length <= 1) {
                      setCodeVerify({
                        ...codeVerify,
                        value6: event,
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
                      code: numberResult,
                      idRequestSignUp,
                      offset: "-06:00",
                      idInvitation: dataForm.idInvitation,
                    });
                    setUserType(4);
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
                  setErrorsRegister(copyErrors);
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
                Reenviar código
              </p>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );

  const successRegister = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Registro completo </h1>
          <p className="recoverInstructions">
            Bienvenido(a) <strong>{dataForm.givenName}</strong>. Estamos muy
            emocionados de tenerte a bordo. Ingresa a tu cuenta y que comience
            la aventura.
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
    const { match } = props;
    const params = isEmpty(match.params) === false ? match.params : {};
    if (isEmpty(params) === false) {
      setUserType(2);
      handlerCallGetInvitationUser(params.idInvitation, params);
    } else {
      setUserType(1);
      handlerAsyncCallAppis();
    }
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
  callGetInvitationUser: (paramId) => dispatch(callGetInvitationUser(paramId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
