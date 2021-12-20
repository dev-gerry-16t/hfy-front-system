import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { Spin, Row, Col } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import {
  callGetAllRegisterUser,
  callGetAllVerifyCode,
} from "../../utils/actions/actions";
import { callGetAllCountries } from "../../utils/actions/catalogActions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import CustomInputTypeForm from "../../components/CustomInputTypeForm";
import CustomSelect from "../../components/CustomSelect";
import CityScape from "../../assets/img/cityscape.png";
import LogoHomify from "../../assets/img/logo.png";
import { ReactComponent as IconInclusive } from "../../assets/iconSvg/svgFile/iconInclusive.svg";
import { ReactComponent as IconCheck } from "../../assets/iconSvg/svgFile/iconCircleCheck.svg";
import { ReactComponent as IconPaymentCheck } from "../../assets/iconSvg/svgFile/iconPaymentCheck.svg";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
  font-family: Poppins;
  font-size: 16px;
  .form-button {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .form-button-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
  }
  .title-form {
    text-align: center;
    h1 {
      font-size: 1.7em;
      font-weight: 700;
    }
  }
  p {
    text-align: center;
  }
  .container-form {
    background: #fff;
    max-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    .container-logo {
      position: absolute;
      top: 4vh;
      left: 2vw;
      img {
        width: 120px;
      }
    }
    .container-img {
      width: 100%;
      position: absolute;
      top: 70vh;
      img {
        width: 100%;
      }
    }
  }
  .container-info {
    min-width: 370px;
    background: #f7f8fa;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .promo {
      position: absolute;
      bottom: 10px;
      left: 20px;
    }
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    font-size: 14px;
    .container-form {
      padding: 10px 10px 2em 10px;
      max-height: auto;
      display: flex;
      flex-direction: column;
      .container-logo {
        position: relative;
        top: auto;
        left: auto;
        margin-bottom: 1.5em;
      }
      .container-img {
      }
    }
    .container-info {
      padding: 2em 10px;
      min-width: auto;
    }
  }
  @media screen and (max-width: 360px) {
    .container-form {
      .container-img {
        top: 40em;
      }
    }
  }
`;

const ContainerForm = styled.div`
  width: 35%;
  z-index: 1;

  @media screen and (max-width: 1500px) {
    width: 45%;
  }
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 820px) {
    padding: 0px 10px;
    width: 100%;
  }
`;

const DividerText = styled.div`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  hr {
    width: 100%;
    flex: 1 1;
    background: #000;
  }
  span {
    text-align: center;
    flex: 1 2 auto;
    font-weight: bold;
    color: #000;
  }
`;

const ContainerInfo = styled.div`
  width: 60%;
  .title-include {
    margin: 3em 0px;
    width: 100%;
    text-align: center;
    h1 {
      font-weight: 700;
      span {
        color: var(--color-primary);
      }
    }
  }
  .content-plan-info {
    .info-check {
      margin-bottom: 10px;
      svg {
        padding-top: 3px;
      }
      span {
        margin-left: 5px;
      }
    }
  }

  @media screen and (max-width: 670px) {
    width: 100%;
  }
`;

const ButtonAction = styled.button`
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  background: ${(props) => (props.primary ? "var(--color-primary)" : "#fff")};
  border: none;
  border-radius: 16px;
  padding: 5px 3em;
`;

const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  .icon-inclusive {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 105px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 6px #ebebf1;
  }
`;

const ContainerVerifyCode = styled.div`
  position: relative;
  width: 360px;
  font-size: 16px;
  #code-verification {
    position: absolute;
    opacity: 0;
  }
  .section-code {
    display: flex;
    justify-content: space-around;
    .code-type {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.375em;
      height: 4.625em;
      border: 1px solid #a0a3bd;
      box-sizing: border-box;
      border-radius: 8px;
      .code-point {
        width: 0.9em;
        height: 0.9em;
        border-radius: 50%;
        background: #000;
      }
    }
  }
  @media screen and (max-width: 760px) {
    font-size: 12px;
    width: 300px;
  }
  @media screen and (max-width: 670px) {
    font-size: 15px;
    width: 90%;
    .section-code {
      justify-content: space-around;
    }
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const ContainerExitRegister = styled.div`
  z-index: 1;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 380px) {
    width: 100%;
  }
`;

const contentPlan = [
  "Crea fichas y comparte con otros asesores.",
  "Solicita Contratos o Pólizas Jurídicas en menos de 1 hora.",
  "Califica a tus inquilinos.",
  "Acceso a prospección homify (80% comisión para ti).",
];
const LoadingSpin = <SyncOutlined spin />;

const RegisterAgent = (props) => {
  const {
    callGlobalActionApi,
    callGetAllCountries,
    history,
    callGetAllRegisterUser,
    callGetAllVerifyCode,
  } = props;
  const [dataForm, setDataForm] = useState({
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    username: null,
    phoneNumber: null,
    password: null,
    idCountryNationality: null,
  });
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [idRequestSignUp, setIdRequestSignUp] = useState(null);
  const [errorPass, setErrorPass] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);
  const [stepsProcess, setStepProcess] = useState(1);
  const [spinVisible, setSpinVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState([]);
  const [codeVerify, setCodeVerify] = useState("");
  const refInput = useRef(null);
  const recaptchaV3 = useRef(null);

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

  const handlerCallGetAllCountries = async () => {
    try {
      const response = await callGetAllCountries({ type: 2 });
      const responseResult =
        isNil(response) === false && isEmpty(response.response) === false
          ? response.response
          : [];
      setDataCountries(responseResult);
    } catch (error) {}
  };

  const handlerCallVerifyCode = async (data) => {
    try {
      await callGetAllVerifyCode(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handlerCallGetAllCountries();
  }, []);

  return (
    <Container>
      <div className="container-form">
        <div className="container-logo">
          <img src={LogoHomify} alt="" srcset="" />
        </div>
        {stepsProcess === 1 && (
          <ContainerForm>
            <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
              <div className="title-form">
                <h1>Registro</h1>
              </div>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.givenName}
                    suffix={<UserOutlined color="#4E4B66" />}
                    placeholder="Nombre(s)"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, givenName: e });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.lastName}
                    suffix={<UserOutlined color="#4E4B66" />}
                    placeholder="Apellido Paterno"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, lastName: e });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.mothersMaidenName}
                    suffix={<UserOutlined color="#4E4B66" />}
                    placeholder="Apellido Materno"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, mothersMaidenName: e });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomSelect
                    value={dataForm.idCountryNationality}
                    placeholder=""
                    label="Nacionalidad"
                    data={dataCountries}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        idCountryNationality: value,
                      });
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.username}
                    suffix={<MailOutlined color="#4E4B66" />}
                    placeholder="Correo electrónico"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, username: e });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.phoneNumber}
                    suffix={<PhoneOutlined color="#4E4B66" />}
                    placeholder="Teléfono celular"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, phoneNumber: e });
                    }}
                    type="number"
                  />
                </Col>
              </Row>
              <DividerText>
                <hr />
                <span>Crea tu contraseña</span>
                <hr />
              </DividerText>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.password}
                    suffix={
                      visiblePass === false ? (
                        <EyeInvisibleOutlined
                          color="#4E4B66"
                          onClick={() => {
                            setVisiblePass(!visiblePass);
                          }}
                        />
                      ) : (
                        <EyeTwoTone
                          color="#4E4B66"
                          onClick={() => {
                            setVisiblePass(!visiblePass);
                          }}
                        />
                      )
                    }
                    placeholder="Contraseña"
                    onChange={(e) => {
                      setDataForm({ ...dataForm, password: e });
                    }}
                    type={visiblePass === false ? "password" : "text"}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={verifyPassword}
                    background="#fff"
                    error={errorPass}
                    errorMessage="Las contraseñas no coinciden"
                    suffix={
                      visiblePassConfirm === false ? (
                        <EyeInvisibleOutlined
                          color="#4E4B66"
                          onClick={() => {
                            setVisiblePassConfirm(!visiblePassConfirm);
                          }}
                        />
                      ) : (
                        <EyeTwoTone
                          color="#4E4B66"
                          onClick={() => {
                            setVisiblePassConfirm(!visiblePassConfirm);
                          }}
                        />
                      )
                    }
                    placeholder="Confirmar contraseña"
                    onChange={(e) => {
                      setVerifyPassword(e);
                      setErrorPass(false);
                    }}
                    type={visiblePassConfirm === false ? "password" : "text"}
                  />
                </Col>
              </Row>
              <div className="form-button">
                <ButtonAction
                  primary
                  onClick={async () => {
                    try {
                      if (
                        isEmpty(dataForm.password) === false &&
                        isEmpty(verifyPassword) === false &&
                        dataForm.password === verifyPassword
                      ) {
                        const getCaptchaToken =
                          await recaptchaV3.current.executeAsync();
                        await handlerCallApiRegister({
                          ...dataForm,
                          idCustomerType: 3,
                          captchaToken: getCaptchaToken,
                        });
                        setStepProcess(2);
                      } else {
                        setErrorPass(true);
                      }
                    } catch (error) {}
                  }}
                >
                  Registrarme
                </ButtonAction>
              </div>
            </Spin>
          </ContainerForm>
        )}
        {stepsProcess === 2 && (
          <ContainerVerifyCode>
            <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
              <div className="title-form">
                <h1>Ingresa tu código</h1>
              </div>
              <p>
                Enviamos un código de confirmación al correo{" "}
                <strong>{dataForm.username}</strong>
              </p>
              <div
                id="input-ref-div"
                className="section-code"
                onClick={() => {
                  refInput.current.focus();
                }}
              >
                <div className="code-type">
                  {codeVerify.length >= 1 && <div className="code-point"></div>}
                </div>
                <div className="code-type">
                  {codeVerify.length >= 2 && <div className="code-point"></div>}
                </div>
                <div className="code-type">
                  {codeVerify.length >= 3 && <div className="code-point"></div>}
                </div>
                <div className="code-type">
                  {codeVerify.length >= 4 && <div className="code-point"></div>}
                </div>
                <div className="code-type">
                  {codeVerify.length >= 5 && <div className="code-point"></div>}
                </div>
                <div className="code-type">
                  {codeVerify.length === 6 && (
                    <div className="code-point"></div>
                  )}
                </div>
              </div>
              <form autocomplete="off" action="">
                <input
                  id="code-verification"
                  name="hidden"
                  autocomplete="false"
                  autoFocus
                  value={codeVerify}
                  type="number"
                  ref={refInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 6) {
                      setCodeVerify(value);
                    }
                  }}
                  onFocus={() => {}}
                />
              </form>
              <div className="form-button-column">
                <ButtonAction
                  primary
                  onClick={async () => {
                    try {
                      await handlerCallVerifyCode({
                        code: codeVerify,
                        idRequestSignUp,
                        idInvitation: null,
                      });
                      setStepProcess(3);
                    } catch (error) {}
                  }}
                >
                  Validar
                </ButtonAction>
                <ButtonAction>Reenviar código</ButtonAction>
              </div>
            </Spin>
          </ContainerVerifyCode>
        )}
        {stepsProcess === 3 && (
          <ContainerExitRegister>
            <div className="title-form">
              <h1>¡Registro exitoso!</h1>
            </div>
            <IconPaymentCheck width={"250px"} />
            <p>
              Bienvenido(a) <strong>{dataForm.givenName}</strong>. Estamos muy
              emocionados de tenerte a bordo. Ingresa a tu cuenta y que comience
              la aventura.
            </p>
            <div className="form-button">
              <ButtonAction
                primary
                onClick={() => {
                  history.push("/login");
                }}
              >
                Ir al login
              </ButtonAction>
            </div>
          </ContainerExitRegister>
        )}

        <div className="container-img">
          <img src={CityScape} alt="" srcset="" />
        </div>
      </div>
      <div className="container-info">
        <ContainerInfo>
          <CardIcon>
            <div className="icon-inclusive">
              <IconInclusive />
            </div>
          </CardIcon>
          <div className="title-include">
            <h1>
              Tu plan <span>incluye</span>
            </h1>
          </div>
          <div className="content-plan-info">
            {contentPlan.map((row) => {
              return (
                <div className="info-check">
                  <IconCheck /> <span>{row}</span>
                </div>
              );
            })}
          </div>
          <div className="promo">
            <span>Por lanzamiento la suscripción es gratis</span>
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
        </ContainerInfo>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  callGetAllRegisterUser: (data) => dispatch(callGetAllRegisterUser(data)),
  callGetAllVerifyCode: (data) => dispatch(callGetAllVerifyCode(data)),
  callGetAllCountries: (data) => dispatch(callGetAllCountries(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAgent);
