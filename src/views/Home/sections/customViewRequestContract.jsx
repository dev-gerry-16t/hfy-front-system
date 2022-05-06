import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import Fade from "react-reveal/Fade";
import { Row, Col, message } from "antd";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import CustomDialog from "../../../components/CustomDialog";
import { ReactComponent as IconCheck } from "../../../assets/iconSvg/svgFile/iconBigCheckWhite.svg";
import { IconEditSquare } from "../../../assets/iconSvg";
import saqareX from "../../../assets/icons/saqareX.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import {
  Container,
  HeaderContainer,
  MainContainer,
  MainInfo,
  InfoVerify,
  MainButtons,
  ComponentRadio,
  ErrorMessage,
  InfoPayment,
} from "../constants/styles";
import SectionInfoUser from "./sectionInfoUser";
import SectionInfoProperty from "./sectionInfoProperty";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import ComponentLoadSection from "../../../components/componentLoadSection";

const CustomViewRequestContract = ({
  visibleDialog,
  idRequest = null,
  onClose,
  dataProfile,
  callGlobalActionApi,
  isEditable = false,
  dataDetail = {},
  onConfirmOk = () => {},
  history,
}) => {
  const stepInit = 1;
  const stepContractInfo = 2;
  const stepInfoOwner = 3;
  const stepInfoTenant = 4;
  const stepProperty = 5;
  const stepPropertyInfo = 6;
  const stepLegalAdvice = 7;
  const stepConfirmInformation = 8;
  const stepFormOwner = 9;
  const stepFormTenant = 10;
  const stepPayment = 11;
  const initState = {
    startedAt: null,
    scheduleAt: null,
    isFaceToFace: null,
    jsonUserImplicated: [],
    jsonProperty: {},
    requiresLegalAdvice: null,
  };
  const initStateOwner = {
    idCountryNationality: null,
    idUserInRequest: null,
    idCustomerType: 2,
    idPersonType: 1,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    idCountryPhoneNumber: 1,
    idPhoneType: 1,
    phoneNumber: null,
    isInfoProvidedByRequester: null,
    requiresVerification: null,
  };
  const initStateTenant = {
    idCountryNationality: null,
    idUserInRequest: null,
    idCustomerType: 1,
    idPersonType: 1,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    idCountryPhoneNumber: 1,
    idPhoneType: 1,
    phoneNumber: null,
    isInfoProvidedByRequester: null,
    requiresVerification: null,
  };
  const [visibleSection, setVisibleSection] = useState(
    isEditable === false ? stepInit : stepContractInfo
  );
  const [hasProperty, setHasProperty] = useState(null);
  const [dataForm, setDataForm] = useState(initState);
  const [requestId, setRequestId] = useState(null);
  const [dataOwner, setDataOwner] = useState(initStateOwner);
  const [dataTenant, setDataTenant] = useState(initStateTenant);
  const [dataProperty, setDataProperty] = useState([]);
  const [dataAddress, setDataAddress] = useState({});
  const [dataInfoRequest, setDataInfoRequest] = useState({
    request: {},
    payment: {},
  });
  const [selectProperty, setSelectProperty] = useState({ id: null });
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [finishForm, setFinishForm] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [isVisibleSection, setIsVisibleSection] = useState(true);
  const [isInConfirmInfo, setIsInConfirmInfo] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerShowInclusive = (arrayString) => {
    const arrayParse =
      isEmpty(arrayString) === false ? JSON.parse(arrayString) : [];
    return arrayParse.map((row) => {
      return (
        <div className="inclusive-info">
          <span>{row.label}</span>
          <strong>{row.text}</strong>
        </div>
      );
    });
  };

  const handlerCallGetRequestById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idRequest: id,
        },
        null,
        API_CONSTANTS.EXTERNAL.GET_REQUEST_BY_ID
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      const responseInfoRequest =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isEmpty(responseResult[0]) === false &&
        isNil(responseResult[0][0]) === false &&
        isEmpty(responseResult[0][0]) === false
          ? responseResult[0][0]
          : {};
      const responseInfoPayment =
        isEmpty(responseResult) === false &&
        isNil(responseResult[1]) === false &&
        isEmpty(responseResult[1]) === false &&
        isNil(responseResult[1][0]) === false &&
        isEmpty(responseResult[1][0]) === false
          ? responseResult[1][0]
          : {};
      setDataInfoRequest({
        request: responseInfoRequest,
        payment: responseInfoPayment,
      });
      setRequestId(id);
    } catch (error) {
      throw error;
    }
  };

  const handlerCallSetRequest = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idLoginHistory,
          ...data,
        },
        idSystemUser,
        API_CONSTANTS.EXTERNAL.SET_REQUEST,
        "PUT"
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      const idRequest =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idRequest) === false
          ? responseResult.idRequest
          : null;

      await handlerCallGetRequestById(idRequest);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetAllProperties = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PROPERTIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataProperty(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerOnClickForm = () => {
    setIsLoadApi(true);
    const channelName = "form_users_contract";
    const channel = new BroadcastChannel(channelName);
    const openForm = window.open("/formUser/1/2/1", "_blank");

    let intervalWindow = setInterval(() => {
      if (openForm.closed === true) {
        setIsLoadApi(false);
        channel.close();
        clearInterval(intervalWindow);
      }
    }, 2000);

    channel.onmessage = (message) => {
      if (message.data === "close_form_contract") {
        clearInterval(intervalWindow);
        openForm.close();
        setTimeout(() => {
          setIsLoadApi(false);
          setFinishForm(true);
        }, 1500);
      }
    };
  };

  const handlerOnClickPayment = () => {
    setIsLoadApi(true);
    const channelName = "payment_users_contract";
    const channel = new BroadcastChannel(channelName);

    const openPayment = window.open(
      `/websystem/payment-service/${dataInfoRequest.payment.idOrderPayment}`,
      "targetWindow",
      `scrollbars=yes,
    resizable=yes,
    width=360,
    height=900`
    );

    let intervalWindow = setInterval(() => {
      if (openPayment.closed === true) {
        setIsLoadApi(false);
        channel.close();
        clearInterval(intervalWindow);
      }
    }, 2000);

    channel.onmessage = (message) => {
      if (message.data === "close_payment_contract") {
        clearInterval(intervalWindow);
        openPayment.close();
        setTimeout(() => {
          setIsLoadApi(false);
        }, 1500);
      }
      if (message.data === "payment_succesed") {
        clearInterval(intervalWindow);
        openPayment.close();
        setTimeout(() => {
          setIsLoadApi(false);
        }, 1500);

        if (
          dataOwner.isInfoProvidedByRequester === false &&
          dataTenant.isInfoProvidedByRequester === false
        ) {
          history.push(`/websystem/detalle-contrato-generado/${requestId}`);
        } else if (
          dataOwner.isInfoProvidedByRequester === true &&
          dataTenant.isInfoProvidedByRequester === false
        ) {
          setIsVisibleSection(false);
          setTimeout(() => {
            setVisibleSection(stepFormOwner);
            setIsVisibleSection(true);
          }, 1000);
        } else if (
          dataOwner.isInfoProvidedByRequester === false &&
          dataTenant.isInfoProvidedByRequester === true
        ) {
          setIsVisibleSection(false);
          setTimeout(() => {
            setVisibleSection(stepFormTenant);
            setIsVisibleSection(true);
          }, 1000);
        } else if (
          dataOwner.isInfoProvidedByRequester === true &&
          dataTenant.isInfoProvidedByRequester === true
        ) {
          setIsVisibleSection(false);
          setTimeout(() => {
            setVisibleSection(stepFormOwner);
            setIsVisibleSection(true);
          }, 1000);
        }
      }
    };
  };

  const handlerVerifyInfoUser = (data, goTo) => {
    const {
      idCountryNationality,
      givenName,
      lastName,
      emailAddress,
      phoneNumber,
      isInfoProvidedByRequester,
      requiresVerification,
    } = data;
    if (
      isNil(givenName) === false &&
      isEmpty(givenName) === false &&
      isNil(lastName) === false &&
      isEmpty(lastName) === false &&
      isNil(isInfoProvidedByRequester) === false &&
      isNil(requiresVerification) === false
    ) {
      if (
        (dataForm.isFaceToFace === "1" || dataForm.isFaceToFace === true) &&
        isInfoProvidedByRequester === false
      ) {
        if (isNil(emailAddress) === false && isEmpty(emailAddress) === false) {
          setDataForm({
            ...dataForm,
            jsonUserImplicated: [dataOwner, dataTenant],
          });
          setIsVisibleSection(false);
          setTimeout(() => {
            setVisibleSection(goTo);
            setIsVisibleSection(true);
          }, 1000);
        } else {
          setIsVisibleError(true);
          setTimeout(() => {
            setIsVisibleError(false);
          }, 5000);
        }
      } else if (
        (dataForm.isFaceToFace === "1" || dataForm.isFaceToFace === true) &&
        isInfoProvidedByRequester === true
      ) {
        setDataForm({
          ...dataForm,
          jsonUserImplicated: [dataOwner, dataTenant],
        });
        setIsVisibleSection(false);
        setTimeout(() => {
          setVisibleSection(goTo);
          setIsVisibleSection(true);
        }, 1000);
      } else if (
        dataForm.isFaceToFace === "2" ||
        dataForm.isFaceToFace === false
      ) {
        if (isNil(emailAddress) === false && isEmpty(emailAddress) === false) {
          setDataForm({
            ...dataForm,
            jsonUserImplicated: [dataOwner, dataTenant],
          });
          setIsVisibleSection(false);
          setTimeout(() => {
            setVisibleSection(goTo);
            setIsVisibleSection(true);
          }, 1000);
        } else {
          setIsVisibleError(true);
          setTimeout(() => {
            setIsVisibleError(false);
          }, 5000);
        }
      }
    } else {
      setIsVisibleError(true);
      setTimeout(() => {
        setIsVisibleError(false);
      }, 5000);
    }
  };

  const handlerConfirmInformation = async () => {
    try {
      const dataRequest = {
        idRequest,
        startedAt: dataForm.startedAt,
        scheduleAt: dataForm.scheduleAt,
        isFaceToFace:
          dataForm.isFaceToFace === "1" || dataForm.isFaceToFace === true
            ? true
            : false,
        jsonUserImplicated: JSON.stringify(dataForm.jsonUserImplicated),
        idProperty:
          hasProperty === true && isNil(selectProperty.id) === false
            ? selectProperty.idProperty
            : null,
        idApartment:
          hasProperty === true && isNil(selectProperty.id) === false
            ? selectProperty.idApartment
            : null,
        jsonProperty:
          isEmpty(dataForm.jsonProperty) === false
            ? JSON.stringify(dataForm.jsonProperty)
            : null,
        requiresLegalAdvice: dataForm.requiresLegalAdvice,
      };
      setIsLoadApi(true);
      await handlerCallSetRequest(dataRequest);
      onConfirmOk();
      setIsLoadApi(false);
      setIsVisibleSection(false);
      setTimeout(() => {
        if (isEditable === false) {
          setVisibleSection(stepPayment);
          setIsVisibleSection(true);
        } else {
          setVisibleSection(stepContractInfo);
          onClose();
          setIsVisibleSection(true);
        }
      }, 1000);
    } catch (error) {
      setIsLoadApi(false);
    }
  };

  useEffect(() => {
    handlerCallGetAllProperties();
  }, []);

  useEffect(() => {
    if (isEmpty(dataDetail) === false && isEditable === true) {
      const {
        startedAt,
        scheduleAt,
        isFaceToFace,
        jsonUserImplicated,
        requiresLegalAdvice,
      } = dataDetail;
      let infoOwner = {};
      let infoTenant = {};
      const userImplicated =
        isEmpty(jsonUserImplicated) === false
          ? JSON.parse(jsonUserImplicated)
          : [];
      userImplicated.forEach((element) => {
        const {
          idCountryNationality,
          idUserInRequest,
          idCustomerType,
          idPersonType,
          givenName,
          lastName,
          mothersMaidenName,
          emailAddress,
          idCountryPhoneNumber,
          idPhoneType,
          phoneNumber,
          isInfoProvidedByRequester,
          requiresVerification,
        } = element;
        if (element.idCustomerType === 2) {
          infoOwner = {
            idCountryNationality,
            idUserInRequest,
            idCustomerType,
            idPersonType,
            givenName,
            lastName,
            mothersMaidenName,
            emailAddress,
            idCountryPhoneNumber,
            idPhoneType,
            phoneNumber,
            isInfoProvidedByRequester,
            requiresVerification,
          };
        }
        if (element.idCustomerType === 1) {
          infoTenant = {
            idCountryNationality,
            idUserInRequest,
            idCustomerType,
            idPersonType,
            givenName,
            lastName,
            mothersMaidenName,
            emailAddress,
            idCountryPhoneNumber,
            idPhoneType,
            phoneNumber,
            isInfoProvidedByRequester,
            requiresVerification,
          };
        }
      });

      setDataOwner(infoOwner);
      setDataTenant(infoTenant);
      setDataForm({
        ...dataForm,
        startedAt:
          isEmpty(startedAt) === false && isNil(startedAt) === false
            ? moment(startedAt).format("YYYY-MM-DD")
            : null,
        scheduleAt:
          isEmpty(scheduleAt) === false && isNil(scheduleAt) === false
            ? moment(scheduleAt, "YYYY-MM-DDThh:mm").format("YYYY-MM-DDThh:mm")
            : null,
        isFaceToFace,
        requiresLegalAdvice,
      });
    }
  }, [dataDetail]);
  return (
    <CustomDialog
      isVisibleDialog={visibleDialog}
      onClose={() => {}}
      classNameDialog="onboarding-dialog"
    >
      <div
        style={{
          position: "absolute",
          right: "1em",
          top: "5px",
          zIndex: "2",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </button>
      </div>
      {visibleSection === stepInit && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Contrato de arrendamiento <span>Automatizado</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Bienvenido a uno de nuestros productos mas solicitados por la
                comunidad Homify
              </span>
            </MainContainer>
            <MainInfo>
              <InfoVerify>
                <div className="icon-top">
                  <div className="circle-icon">
                    <IconCheck />
                  </div>
                </div>
                <div className="info-main">
                  <h2>Para tener un proceso fluido te damos algunos tips</h2>
                  <p>
                    <ul>
                      <li>
                        Tener la información de fecha de inicio de contrato y
                        fecha de firma de contrato.
                      </li>
                      <li>
                        Tener la información de la propiedad a ser arrendada.
                      </li>
                      <li>
                        Puedes elegir ingresar la información personal de las
                        partes involucrada o cada parte ingresará su información
                        de forma independiente.
                      </li>
                      <li>
                        Si ingresas la información de las partes involucradas te
                        recomendamos tener a la mano la identificación oficial
                        (INE ambos lados, Pasaporte o FM3) original o copia de
                        cada parte involucrada.
                      </li>
                      <li>
                        Si eliges que cada usuario ingrese su información
                        personal de forma independiente les enviaremos un link
                        del formulario a llenar via WhatsApp o Correo
                        electrónico.
                      </li>
                      <li>
                        En el menu "Contratos" puedes monitorear el avance del
                        formulario de ambas partes involucradas y descargar tu
                        contrato generado.
                      </li>
                    </ul>
                  </p>
                  <p>
                    <div
                      style={{
                        fontSize: 12,
                      }}
                    >
                      <span>
                        Puedes ver nuestros{" "}
                        <a
                          href="https://www.homify.ai/terminos-y-condiciones"
                          target="_blank"
                        >
                          Términos y condiciones
                        </a>{" "}
                        de uso de los servicios. Si quieres más información
                        acerca de cómo Homify recopila, utiliza y{" "}
                        <strong>protege tus datos</strong> personales, consulta
                        el{" "}
                        <a
                          href="https://www.homify.ai/aviso-de-privacidad"
                          target="_blank"
                        >
                          aviso de privacidad
                        </a>{" "}
                        de Homify.
                      </span>
                    </div>
                  </p>
                </div>
              </InfoVerify>
            </MainInfo>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  setIsVisibleSection(false);
                  setTimeout(() => {
                    setVisibleSection(stepContractInfo);
                    setIsVisibleSection(true);
                  }, 1000);
                }}
              >
                Continuar
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  onClose();
                }}
              >
                Salir
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}
      {visibleSection === stepContractInfo && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Información <span>Inicial</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>Ingresa la información que se te pide a continuación</span>
            </MainContainer>
            <div>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.startedAt}
                    placeholder="dd-mm-yy"
                    label="¿Cuando inicia el contrato de arrendamiento?"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        startedAt: isEmpty(value) === false ? value : null,
                      });
                    }}
                    type="date"
                    isBlock={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.scheduleAt}
                    placeholder="dd-mm-yy"
                    label="¿Cuando se firma el contrato de arrendamiento?"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        scheduleAt: isEmpty(value) === false ? value : null,
                      });
                    }}
                    type="datetime-local"
                    isBlock={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomSelect
                    value={dataForm.isFaceToFace}
                    placeholder=""
                    label="¿Cómo se firmará el contrato?"
                    data={[
                      { id: "1", text: "Presencial" },
                      { id: "2", text: "En linea" },
                    ]}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        isFaceToFace: value,
                      });
                    }}
                    isBlock={false}
                  />
                </Col>
              </Row>
            </div>
            <ErrorMessage error={isVisibleError}>
              <img src={saqareX} alt="exclaim" />
              <span>Revisa que la información este completa</span>
            </ErrorMessage>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  const { startedAt, scheduleAt, isFaceToFace } = dataForm;
                  if (
                    isNil(startedAt) === false &&
                    isNil(scheduleAt) === false &&
                    isNil(isFaceToFace) === false
                  ) {
                    setIsVisibleSection(false);
                    setTimeout(() => {
                      setVisibleSection(
                        isInConfirmInfo === false
                          ? stepInfoOwner
                          : stepConfirmInformation
                      );
                      setIsVisibleSection(true);
                      setIsVisibleError(false);
                    }, 1000);
                  } else {
                    setIsVisibleError(true);
                    setTimeout(() => {
                      setIsVisibleError(false);
                    }, 5000);
                  }
                }}
              >
                {isInConfirmInfo === false ? "Siguiente" : "Confirmar"}
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  setVisibleSection(stepInit);
                }}
              >
                Regresar
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}
      {visibleSection === stepInfoOwner && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Información del <span>Propietario</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>Ingresa la información del propietario del inmueble</span>
            </MainContainer>
            <SectionInfoUser
              {...dataOwner}
              isFaceToFace={dataForm.isFaceToFace}
              onSaveState={(data) => {
                setDataOwner({
                  ...dataOwner,
                  ...data,
                });
              }}
            />
            <ErrorMessage error={isVisibleError}>
              <img src={saqareX} alt="exclaim" />
              <span>Revisa que la información este completa</span>
            </ErrorMessage>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  handlerVerifyInfoUser(
                    dataOwner,
                    isInConfirmInfo === false
                      ? stepInfoTenant
                      : stepConfirmInformation
                  );
                }}
              >
                {isInConfirmInfo === false ? "Siguiente" : "Confirmar"}
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  setVisibleSection(stepContractInfo);
                  setDataForm({
                    ...dataForm,
                    jsonUserImplicated: [dataOwner, dataTenant],
                  });
                }}
              >
                Regresar
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}
      {visibleSection === stepInfoTenant && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Información del <span>Inquilino</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Ingresa la información del inquilino que arrendará el inmueble
              </span>
            </MainContainer>
            <SectionInfoUser
              {...dataTenant}
              isFaceToFace={dataForm.isFaceToFace}
              onSaveState={(data) => {
                setDataTenant({
                  ...dataTenant,
                  ...data,
                });
              }}
            />
            <ErrorMessage error={isVisibleError}>
              <img src={saqareX} alt="exclaim" />
              <span>Revisa que la información este completa</span>
            </ErrorMessage>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  handlerVerifyInfoUser(
                    dataTenant,
                    isInConfirmInfo === false
                      ? stepProperty
                      : stepConfirmInformation
                  );
                }}
              >
                {isInConfirmInfo === false ? "Siguiente" : "Confirmar"}
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  setVisibleSection(stepInfoOwner);
                  setDataForm({
                    ...dataForm,
                    jsonUserImplicated: [dataOwner, dataTenant],
                  });
                }}
              >
                Regresar
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}
      {visibleSection === stepProperty && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Información de la <span>Propiedad</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Puedes seleccionar una propiedad agregada o ingresar la
                información manualmente
              </span>
            </MainContainer>
            <div>
              <Row>
                <Col span={24}>
                  <ComponentRadio>
                    <strong>
                      ¿Deseas utilizar los datos de una de tus propiedades
                      agregadas?
                    </strong>
                    <div className="radio-inputs-options">
                      <label className="input-radio">
                        <input
                          type="radio"
                          checked={hasProperty === true}
                          name="add-property"
                          onClick={() => {
                            setHasProperty(true);
                          }}
                        />
                        Si
                      </label>
                      <label className="input-radio">
                        <input
                          type="radio"
                          name="add-property"
                          checked={hasProperty === false}
                          onClick={() => {
                            setHasProperty(false);
                          }}
                        />
                        No, yo ingresaré los datos de la propiedad
                      </label>
                    </div>
                  </ComponentRadio>
                </Col>
              </Row>
              {hasProperty === true && (
                <Row>
                  <Col span={24}>
                    <CustomSelect
                      value={selectProperty.id}
                      placeholder=""
                      label="Selecciona la propiedad que será arrendada"
                      data={dataProperty}
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value, option) => {
                        setSelectProperty(option);
                      }}
                      isBlock={false}
                    />
                  </Col>
                </Row>
              )}
            </div>
            <ErrorMessage error={isVisibleError}>
              <img src={saqareX} alt="exclaim" />
              <span>Selecciona una opción</span>
            </ErrorMessage>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  if (hasProperty === true) {
                    if (isNil(selectProperty.id) === false) {
                      setIsVisibleSection(false);
                      setTimeout(() => {
                        setVisibleSection(
                          isInConfirmInfo === false
                            ? stepLegalAdvice
                            : stepConfirmInformation
                        );
                        setIsVisibleSection(true);
                      }, 1000);
                    } else {
                      setIsVisibleError(true);
                      setTimeout(() => {
                        setIsVisibleError(false);
                      }, 5000);
                    }
                  } else if (hasProperty === false) {
                    setIsVisibleSection(false);
                    setTimeout(() => {
                      setVisibleSection(stepPropertyInfo);
                      setIsVisibleSection(true);
                    }, 1000);
                  } else {
                    setIsVisibleError(true);
                    setTimeout(() => {
                      setIsVisibleError(false);
                    }, 5000);
                  }
                }}
              >
                {isInConfirmInfo === false ? "Siguiente" : "Confirmar"}
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  setVisibleSection(stepInfoTenant);
                }}
              >
                Regresar
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}
      {visibleSection === stepPropertyInfo && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Información de la <span>Propiedad</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Ingresa la información de la propiedad que será arrendada, los
                campos marcados con un "*" son obligatorios
              </span>
            </MainContainer>
            <SectionInfoProperty
              onNext={(data, property) => {
                setDataAddress(data);
                setDataForm({
                  ...dataForm,
                  jsonProperty: property,
                });
                setIsVisibleSection(false);
                setTimeout(() => {
                  setVisibleSection(stepLegalAdvice);
                  setIsVisibleSection(true);
                }, 1000);
              }}
              onBack={(data, property) => {
                setVisibleSection(stepProperty);
                setDataAddress(data);
                setDataForm({
                  ...dataForm,
                  jsonProperty: property,
                });
              }}
            />
          </Container>
        </Fade>
      )}
      {visibleSection === stepLegalAdvice && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <HeaderContainer>
              <h1>
                Asesoría <span>Jurídica</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Contamos con servicio de asesoría jurídica que puede ayudarte a
                realizar cambios personalizados en tu contrato de arrendamiento,
                de esta manera podrás tener un documento blindado.
              </span>
            </MainContainer>
            <div>
              <Row>
                <Col span={24}>
                  <ComponentRadio>
                    <strong>
                      ¿Deseas contratar el servicio de asesoría jurídica?
                    </strong>
                    <div className="radio-inputs-options">
                      <label className="input-radio">
                        <input
                          type="radio"
                          checked={dataForm.requiresLegalAdvice === true}
                          name="service-contract"
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              requiresLegalAdvice: true,
                            });
                          }}
                        />
                        Si
                      </label>
                      <label className="input-radio">
                        <input
                          type="radio"
                          name="service-contract"
                          checked={dataForm.requiresLegalAdvice === false}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              requiresLegalAdvice: false,
                            });
                          }}
                        />
                        No por el momento
                      </label>
                    </div>
                  </ComponentRadio>
                </Col>
              </Row>
            </div>
            <ErrorMessage error={isVisibleError}>
              <img src={saqareX} alt="exclaim" />
              <span>Selecciona una opción</span>
            </ErrorMessage>
            <MainButtons>
              <button
                className="hfy-primary-button"
                onClick={() => {
                  if (isNil(dataForm.requiresLegalAdvice) === false) {
                    setIsVisibleSection(false);
                    setTimeout(() => {
                      setVisibleSection(stepConfirmInformation);
                      setIsVisibleSection(true);
                      setIsInConfirmInfo(true);
                    }, 1000);
                  } else {
                    setIsVisibleError(true);
                    setTimeout(() => {
                      setIsVisibleError(false);
                    }, 5000);
                  }
                }}
              >
                {isInConfirmInfo === false ? "Siguiente" : "Confirmar"}
              </button>
              <button
                className="hfy-secondary-button"
                onClick={() => {
                  setVisibleSection(stepPropertyInfo);
                }}
              >
                Regresar
              </button>
            </MainButtons>
          </Container>
        </Fade>
      )}

      {visibleSection === stepConfirmInformation && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <ComponentLoadSection
              isLoadApi={isLoadApi}
              text="LLenando información"
            >
              <HeaderContainer>
                <h1>
                  Confirma la <span>Información</span>
                </h1>
              </HeaderContainer>
              <MainContainer>
                <span>
                  Asegurate de que la información este correcta y no tenga
                  errores, si todo esta bien haz clic en Confirmar
                </span>
              </MainContainer>
              <p>
                <h2
                  className="subTitle-confirm-info"
                  onClick={() => {
                    setVisibleSection(stepContractInfo);
                  }}
                >
                  Información de contrato{" "}
                  <IconEditSquare color="var(--color-primary)" />
                </h2>
                <div>
                  <span>Fecha de Inicio del contrato: </span>
                  <strong>
                    {" "}
                    {moment(dataForm.startedAt, "YYYY-MM-DD").format(
                      "DD MMMM YYYY"
                    )}
                  </strong>
                </div>
                <div>
                  <span>Fecha de firma: </span>
                  <strong>
                    {" "}
                    {moment(dataForm.scheduleAt, "YYYY-MM-DD").format(
                      "DD MMMM YYYY"
                    )}
                  </strong>
                </div>
                <div>
                  <span>Firma: </span>
                  <strong>
                    {dataForm.isFaceToFace == "1" ||
                    dataForm.isFaceToFace == true
                      ? "Presencial"
                      : "En linea"}
                  </strong>
                </div>
              </p>
              <p>
                <h2
                  className="subTitle-confirm-info"
                  onClick={() => {
                    setVisibleSection(stepInfoOwner);
                  }}
                >
                  Información del Propietario{" "}
                  <IconEditSquare color="var(--color-primary)" />
                </h2>
                <div>
                  <span>Nombre: </span>
                  <strong>
                    {`${dataOwner.givenName} ${dataOwner.lastName} ${dataOwner.mothersMaidenName}`}
                  </strong>
                </div>
                <div>
                  <span>Nacionalidad: </span>
                  <strong>{dataOwner.idCountryNationalityText}</strong>
                </div>
                <div>
                  <span>Correo: </span>
                  <strong>
                    {" "}
                    {isNil(dataOwner.emailAddress) === true ||
                    isEmpty(dataOwner.emailAddress) === true
                      ? "N/A"
                      : dataOwner.emailAddress}
                  </strong>
                </div>
                <div>
                  <span>Teléfono WhatsApp: </span>
                  <strong>
                    {" "}
                    {isNil(dataOwner.phoneNumber) === true ||
                    isEmpty(dataOwner.phoneNumber) === true
                      ? "N/A"
                      : dataOwner.phoneNumber}
                  </strong>
                </div>
                <div>
                  <strong>
                    {dataOwner.isInfoProvidedByRequester === true
                      ? "- Realizarás la captura manual de la información"
                      : "- Se enviará un link al usuario para la captura de su información"}
                  </strong>
                </div>
                <div>
                  <strong>
                    {dataOwner.requiresVerification === true
                      ? "- Se realizará la verificación del usuario"
                      : "- No se realizará la verificación de usuario"}
                  </strong>
                </div>
              </p>
              <p>
                <h2
                  className="subTitle-confirm-info"
                  onClick={() => {
                    setVisibleSection(stepInfoTenant);
                  }}
                >
                  Información del Inquilino{" "}
                  <IconEditSquare color="var(--color-primary)" />
                </h2>
                <div>
                  <span>Nombre: </span>
                  <strong>
                    {`${dataTenant.givenName} ${dataTenant.lastName} ${dataTenant.mothersMaidenName}`}
                  </strong>
                </div>
                <div>
                  <span>Nacionalidad: </span>
                  <strong>{dataTenant.idCountryNationalityText}</strong>
                </div>
                <div>
                  <span>Correo: </span>
                  <strong>
                    {isNil(dataTenant.emailAddress) === true ||
                    isEmpty(dataTenant.emailAddress) === true
                      ? "N/A"
                      : dataTenant.emailAddress}
                  </strong>
                </div>
                <div>
                  <span>Teléfono WhatsApp: </span>
                  <strong>
                    {" "}
                    {isNil(dataTenant.phoneNumber) === true ||
                    isEmpty(dataTenant.phoneNumber) === true
                      ? "N/A"
                      : dataTenant.phoneNumber}
                  </strong>
                </div>
                <div>
                  <strong>
                    {dataTenant.isInfoProvidedByRequester === true
                      ? "- Realizarás la captura manual de la información"
                      : "- Se enviará un link al usuario para la captura de su información"}
                  </strong>
                </div>
                <div>
                  <strong>
                    {dataTenant.requiresVerification === true
                      ? "- Se realizará la verificación del usuario"
                      : "- No se realizará la verificación de usuario"}
                  </strong>
                </div>
              </p>
              <p>
                <h2
                  className="subTitle-confirm-info"
                  onClick={() => {
                    setVisibleSection(stepProperty);
                  }}
                >
                  Información de la propiedad{" "}
                  <IconEditSquare color="var(--color-primary)" />
                </h2>
                {hasProperty === false && (
                  <>
                    <p>
                      <h3>Especificación</h3>
                      <div>
                        <span>Tipo de propiedad: </span>
                        <strong> {dataAddress.idPropertyType}</strong>
                      </div>
                      <div>
                        <span>Actividad comercial: </span>
                        <strong>
                          {" "}
                          {isNil(dataAddress.idCommercialActivity) === true ||
                          isEmpty(dataAddress.idCommercialActivity) === true
                            ? "N/A"
                            : dataAddress.idCommercialActivity}
                        </strong>
                      </div>
                      <div>
                        <span>Monto de renta: </span>
                        <strong>
                          {" "}
                          {dataAddress.currentRent} {dataAddress.idCurrency}
                        </strong>
                      </div>
                      <div>
                        <span>Mantenimiento: </span>
                        <strong>
                          {dataAddress.maintenanceAmount}{" "}
                          {dataAddress.idCurrency}
                        </strong>
                      </div>
                      <div>
                        <span>Cajones de estacionamiento: </span>
                        <strong>{dataAddress.totalParkingSpots}</strong>
                      </div>
                      <div>
                        <span>Amueblado: </span>
                        <strong>{dataAddress.isFurnished}</strong>
                      </div>
                    </p>
                    <p>
                      <h3>Dirección</h3>
                      <div>
                        <span>Calle: </span>
                        <strong> {dataAddress.street}</strong>
                      </div>
                      <div>
                        <span>Número exterior: </span>
                        <strong> {dataAddress.streetNumber}</strong>
                      </div>
                      <div>
                        <span>Número interior: </span>
                        <strong> {dataAddress.suite}</strong>
                      </div>
                      <div>
                        <span>Estado: </span>
                        <strong> {dataAddress.state}</strong>
                      </div>
                      <div>
                        <span>Delegación/ Municipio: </span>
                        <strong> {dataAddress.city}</strong>
                      </div>
                      <div>
                        <span>Colonia: </span>
                        <strong> {dataAddress.neighborhood}</strong>
                      </div>
                      <div>
                        <span>Código postal: </span>
                        <strong> {dataAddress.zipCode}</strong>
                      </div>
                    </p>
                  </>
                )}
                {hasProperty === true && (
                  <>
                    <p>
                      <h3>Dirección</h3>
                      <a
                        href={`/websystem/detail-property-users/${selectProperty.idProperty}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectProperty.text}
                      </a>
                    </p>
                  </>
                )}
              </p>
              <MainButtons>
                <button
                  className="hfy-primary-button"
                  onClick={handlerConfirmInformation}
                >
                  Confirmar
                </button>
                <button
                  className="hfy-secondary-button"
                  onClick={() => {
                    setVisibleSection(stepContractInfo);
                  }}
                >
                  Ir al inicio
                </button>
              </MainButtons>
            </ComponentLoadSection>
          </Container>
        </Fade>
      )}
      {visibleSection === stepPayment && (
        <Fade right opposite when={isVisibleSection}>
          <Container>
            <ComponentLoadSection isLoadApi={isLoadApi} text="Realizando Pago">
              <HeaderContainer>
                <h1>
                  Pago de <span>Generación de Contrato</span>
                </h1>
              </HeaderContainer>
              {/* <MainContainer>
              <h1>Generación de contrato</h1>
            </MainContainer> */}
              <InfoPayment>
                <div className="header-card-payment">
                  <div className="amount-to-pay">
                    <strong>Monto a pagar</strong>{" "}
                    <span>{dataInfoRequest.payment.amountFormatted}</span>
                  </div>
                </div>
                <div className="inclusive-payment">
                  <h3
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Incluye
                  </h3>
                  {handlerShowInclusive(
                    dataInfoRequest.payment.serviceDescription
                  )}
                </div>
              </InfoPayment>
              <MainButtons>
                <button
                  className="hfy-primary-button"
                  onClick={handlerOnClickPayment}
                >
                  Realizar Pago
                </button>
                <button
                  className="hfy-secondary-button"
                  onClick={() => {
                    window.open(`/websystem`, "_blank");
                  }}
                >
                  Modificar información
                </button>
              </MainButtons>
            </ComponentLoadSection>
          </Container>
        </Fade>
      )}
      {visibleSection === stepFormOwner && (
        <Container>
          <ComponentLoadSection
            isLoadApi={isLoadApi}
            text="LLenando información"
          >
            <HeaderContainer>
              <h1>
                Información personal del <span>Propietario</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Elegiste ingresar la información del propietario, esta
                información es fundamental para la correcta elaboración del
                contrato de arrendamiento automatizado, a continuación te
                redirigiremos al formulario
              </span>
            </MainContainer>
            {finishForm === false && (
              <MainButtons>
                <button
                  className="hfy-primary-button"
                  onClick={handlerOnClickForm}
                >
                  Abrir Formulario
                </button>
              </MainButtons>
            )}
            {finishForm === true && (
              <MainButtons>
                <button
                  className="hfy-primary-button"
                  onClick={() => {
                    if (dataTenant.isInfoProvidedByRequester === false) {
                      setVisibleSection(stepPayment);
                    } else if (dataTenant.isInfoProvidedByRequester === true) {
                      setVisibleSection(stepFormTenant);
                    }
                    setFinishForm(false);
                  }}
                >
                  Continuar
                </button>
              </MainButtons>
            )}
          </ComponentLoadSection>
        </Container>
      )}
      {visibleSection === stepFormTenant && (
        <Container>
          <ComponentLoadSection
            isLoadApi={isLoadApi}
            text="LLenando información"
          >
            <HeaderContainer>
              <h1>
                Información personal del <span>Inquilino</span>
              </h1>
            </HeaderContainer>
            <MainContainer>
              <span>
                Elegiste ingresar la información del inquilino, esta información
                es fundamental para la correcta elaboración del contrato de
                arrendamiento automatizado, a continuación te redirigiremos al
                formulario
              </span>
            </MainContainer>
            <MainButtons>
              {finishForm === false && (
                <button
                  className="hfy-primary-button"
                  onClick={handlerOnClickForm}
                >
                  Abrir Formulario
                </button>
              )}
              {finishForm === true && (
                <button
                  className="hfy-primary-button"
                  onClick={() => {
                    setVisibleSection(stepPayment);
                    setFinishForm(false);
                  }}
                >
                  Continuar
                </button>
              )}
            </MainButtons>
          </ComponentLoadSection>
        </Container>
      )}
    </CustomDialog>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomViewRequestContract);
