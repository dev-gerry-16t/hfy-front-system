import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import CustomDialog from "../../../components/CustomDialog";
import { ReactComponent as IconCheck } from "../../../assets/iconSvg/svgFile/iconBigCheckWhite.svg";
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
} from "../constants/styles";
import SectionInfoUser from "./sectionInfoUser";
import SectionInfoProperty from "./sectionInfoProperty";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const CustomViewRequestContract = ({
  visibleDialog,
  onClose,
  dataProfile,
  callGlobalActionApi,
}) => {
  const initState = {
    startedAt: null,
    scheduleAt: null,
    isFaceToFace: null,
    jsonUserImplicated: [],
    jsonProperty: {},
    requiresLegalAdvice: null,
  };
  const initStateOwner = {
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
    requiresVerfication: null,
  };
  const initStateTenant = {
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
    requiresVerfication: null,
  };
  const [visibleSection, setVisibleSection] = useState(1);
  const [hasProperty, setHasProperty] = useState(null);
  const [dataForm, setDataForm] = useState(initState);
  const [dataOwner, setDataOwner] = useState(initStateOwner);
  const [dataTenant, setDataTenant] = useState(initStateTenant);
  const [dataProperty, setDataProperty] = useState([]);
  const [dataAddress, setDataAddress] = useState({});
  const [selectProperty, setSelectProperty] = useState({ id: null });
  const frontFunctions = new FrontFunctions();

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

  useEffect(() => {
    handlerCallGetAllProperties();
  }, []);
  return (
    <CustomDialog
      isVisibleDialog={visibleDialog}
      onClose={onClose}
      classNameDialog="onboarding-dialog"
    >
      {visibleSection === 1 && (
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
                      Si eliges que cada usuario ingrese su información personal
                      de forma independiente les enviaremos un link del
                      formulario a llenar via WhatsApp o Correo electrónico.
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
                      de uso de los servicios. Si quieres más información acerca
                      de cómo Homify recopila, utiliza y{" "}
                      <strong>protege tus datos</strong> personales, consulta el{" "}
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
                setVisibleSection(2);
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
      )}
      {visibleSection === 2 && (
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
                  type="date"
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
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={() => {
                setVisibleSection(3);
              }}
            >
              Siguiente
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(1);
              }}
            >
              Regresar
            </button>
          </MainButtons>
        </Container>
      )}
      {visibleSection === 3 && (
        <Container>
          <HeaderContainer>
            <h1>
              Información de <span>Arrendador</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>Ingresa la información del propietario del inmueble</span>
          </MainContainer>
          <SectionInfoUser
            {...dataOwner}
            onSaveState={(data) => {
              setDataOwner({
                ...dataOwner,
                ...data,
              });
            }}
          />
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={() => {
                setVisibleSection(4);
                setDataForm({
                  ...dataForm,
                  jsonUserImplicated: [dataOwner, dataTenant],
                });
              }}
            >
              Siguiente
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(2);
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
      )}
      {visibleSection === 4 && (
        <Container>
          <HeaderContainer>
            <h1>
              Información de <span>Arrendatario</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>
              Ingresa la información del inquilino que arrendará el inmueble
            </span>
          </MainContainer>
          <SectionInfoUser
            {...dataTenant}
            onSaveState={(data) => {
              setDataTenant({
                ...dataTenant,
                ...data,
              });
            }}
          />
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={() => {
                setVisibleSection(5);
                setDataForm({
                  ...dataForm,
                  jsonUserImplicated: [dataOwner, dataTenant],
                });
              }}
            >
              Siguiente
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(3);
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
      )}
      {visibleSection === 5 && (
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
                      No, ingresaré los datos
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
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={() => {
                if (hasProperty === true) {
                  setVisibleSection(7);
                } else if (hasProperty === false) {
                  setVisibleSection(6);
                }
              }}
            >
              Siguiente
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(4);
              }}
            >
              Regresar
            </button>
          </MainButtons>
        </Container>
      )}
      {visibleSection === 6 && (
        <Container>
          <HeaderContainer>
            <h1>
              Información de la <span>Propiedad</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>
              Ingresa la información de la propiedad que será arrendada
            </span>
          </MainContainer>
          <SectionInfoProperty
            onNext={(data, property) => {
              setVisibleSection(7);
              setDataAddress(data);
              setDataForm({
                ...dataForm,
                jsonProperty: property,
              });
            }}
            onBack={(data, property) => {
              setVisibleSection(5);
              setDataAddress(data);
              setDataForm({
                ...dataForm,
                jsonProperty: property,
              });
            }}
          />
        </Container>
      )}
      {visibleSection === 7 && (
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
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={() => {
                setVisibleSection(8);
              }}
            >
              Siguiente
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(6);
              }}
            >
              Regresar
            </button>
          </MainButtons>
        </Container>
      )}

      {visibleSection === 8 && (
        <Container>
          <HeaderContainer>
            <h1>
              Confirma la <span>Información</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>
              Asegurate de que la información este correcta y no tenga errores,
              si todo esta bien haz clic en Confirmar
            </span>
          </MainContainer>
          <p>
            <h2>Información de contrato</h2>
            <div>
              <span>Fecha de Inicio del contrato: </span>
              <strong> {dataForm.startedAt}</strong>
            </div>
            <div>
              <span>Fecha de firma: </span>
              <strong> {dataForm.scheduleAt}</strong>
            </div>
            <div>
              <span>Firma: </span>
              <strong>
                {dataForm.isFaceToFace == "1" ? "Presencial" : "En linea"}
              </strong>
            </div>
          </p>
          <p>
            <h2>Información del Arrendador</h2>
            <div>
              <span>Nombre: </span>
              <strong>
                {`${dataOwner.givenName} ${dataOwner.lastName} ${dataOwner.mothersMaidenName}`}
              </strong>
            </div>
            <div>
              <span>Correo: </span>
              <strong> {dataOwner.emailAddress}</strong>
            </div>
            <div>
              <span>Teléfono WhatsApp: </span>
              <strong> {dataOwner.phoneNumber}</strong>
            </div>
            <div>
              <strong>
                {dataOwner.isInfoProvidedByRequester === true
                  ? "Realizarás la captura manual de la información"
                  : "Se enviará un link al usuario para la captura de su información"}
              </strong>
            </div>
            <div>
              <strong>
                {dataOwner.requiresVerfication === true
                  ? "No se realizará la verificación de usuario"
                  : "Se realizará la verificación del usuario"}
              </strong>
            </div>
          </p>
          <p>
            <h2>Información del Arrendatario</h2>
            <div>
              <span>Nombre: </span>
              <strong>
                {`${dataTenant.givenName} ${dataTenant.lastName} ${dataTenant.mothersMaidenName}`}
              </strong>
            </div>
            <div>
              <span>Correo: </span>
              <strong> {dataTenant.emailAddress}</strong>
            </div>
            <div>
              <span>Teléfono WhatsApp: </span>
              <strong> {dataTenant.phoneNumber}</strong>
            </div>
            <div>
              <strong>
                {dataTenant.isInfoProvidedByRequester === true
                  ? "Realizarás la captura manual de la información"
                  : "Se enviará un link al usuario para la captura de su información"}
              </strong>
            </div>
            <div>
              <strong>
                {dataTenant.requiresVerfication === true
                  ? "No se realizará la verificación de usuario"
                  : "Se realizará la verificación del usuario"}
              </strong>
            </div>
          </p>
          <p>
            <h2>Información de la propiedad</h2>
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
                    <strong> {dataAddress.idCommercialActivity}</strong>
                  </div>
                  <div>
                    <span>Monto de renta: </span>
                    <strong>
                      {" "}
                      $ {dataAddress.currentRent} {dataAddress.idCurrency}
                    </strong>
                  </div>
                  <div>
                    <span>Mantenimiento: </span>
                    <strong>
                      $ {dataAddress.maintenanceAmount} {dataAddress.idCurrency}
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
              onClick={() => {
                const dataRequest = {
                  idRequest: null,
                  startedAt: dataForm.startedAt,
                  scheduleAt: dataForm.scheduleAt,
                  isFaceToFace: dataForm.isFaceToFace === "1" ? true : false,
                  jsonUserImplicated: JSON.stringify(
                    dataForm.jsonUserImplicated
                  ),
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

                if (dataOwner.isInfoProvidedByRequester === false) {
                  setVisibleSection(9);
                } else if (dataTenant.isInfoProvidedByRequester === false) {
                  setVisibleSection(10);
                } else if (
                  dataTenant.isInfoProvidedByRequester === true &&
                  dataOwner.isInfoProvidedByRequester === true
                ) {
                  setVisibleSection(11);
                }
              }}
            >
              Confirmar
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                setVisibleSection(2);
              }}
            >
              Ir al inicio
            </button>
          </MainButtons>
        </Container>
      )}
      {visibleSection === 9 && <Container>Formulario Propietario</Container>}
      {visibleSection === 10 && <Container>Formulario Inquilino</Container>}
      {visibleSection === 11 && <Container>Listo para Pagar</Container>}
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
