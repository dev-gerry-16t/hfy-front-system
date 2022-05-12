import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { Row, Col, message } from "antd";
import { connect } from "react-redux";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomDialog from "../../../components/CustomDialog";
import {
  ErrorMessage,
  Container,
  HeaderContainer,
  MainContainer,
  MainButtons,
  ComponentRadio,
} from "../constants/styles";
import saqareX from "../../../assets/icons/saqareX.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";

const SpanPrice = styled.span`
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
`;

const ComponentDetailUser = (props) => {
  const {
    dataProfile,
    callGlobalActionApi,
    visibleDialog,
    onClose,
    dataInfoRequest,
    onSaveInfo,
    dataRequest,
    dataFee,
  } = props;
  const initState = {
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
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataForm, setDataForm] = useState(initState);
  const [dataNationalities, setDataNationalities] = useState([]);

  const frontFunctions = new FrontFunctions();

  const hanlderCallGetNationalities = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_NATIONALITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataNationalities(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    hanlderCallGetNationalities();
  }, []);

  useEffect(() => {
    if (isEmpty(dataInfoRequest) === false) {
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
      } = dataInfoRequest;
      setDataForm({
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
      });
    }
  }, [dataInfoRequest]);

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
      <Container>
        <ComponentLoadSection
          isLoadApi={isLoadApi}
          text="Guardando información"
        >
          <HeaderContainer>
            <h1>
              Información del <span>{dataInfoRequest.customerType}</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>Ingresa la información que se te pide a continuación</span>
          </MainContainer>
          <div>
            <Row>
              <Col span={24}>
                <CustomInputTypeForm
                  value={dataForm.givenName}
                  placeholder=""
                  label="Nombre *"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      givenName: value,
                    });
                  }}
                  type="text"
                  isBlock={false}
                />
              </Col>
            </Row>
            <Row gutter={10}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <CustomInputTypeForm
                  value={dataForm.lastName}
                  placeholder=""
                  label="Apellido Paterno *"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      lastName: value,
                    });
                  }}
                  type="text"
                  isBlock={false}
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <CustomInputTypeForm
                  value={dataForm.mothersMaidenName}
                  placeholder=""
                  label="Apellido Materno"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      mothersMaidenName: value,
                    });
                  }}
                  type="text"
                  isBlock={false}
                />
              </Col>
            </Row>
            {isNil(dataRequest.isFaceToFace) === false &&
              (dataRequest.isFaceToFace === "2" ||
                dataRequest.isFaceToFace === false) && (
                <>
                  <Row>
                    <Col span={24}>
                      <CustomInputTypeForm
                        value={dataForm.emailAddress}
                        placeholder=""
                        label="Correo *"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            emailAddress: value,
                          });
                        }}
                        type="email"
                        isBlock={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <CustomInputTypeForm
                        value={dataForm.phoneNumber}
                        placeholder=""
                        label="Teléfono WhatsApp"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            phoneNumber: value,
                          });
                        }}
                        type="tel"
                        isBlock={false}
                      />
                    </Col>
                  </Row>
                </>
              )}
            <Row>
              <Col span={24}>
                <CustomSelect
                  value={dataForm.idCountryNationality}
                  placeholder=""
                  label="Nacionalidad"
                  data={dataNationalities}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value, option) => {
                    setDataForm({
                      ...dataForm,
                      idCountryNationality: value,
                      idCountryNationalityText: option.text,
                    });
                  }}
                  isBlock={false}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ComponentRadio>
                  <strong>
                    ¿Quién ingresará la información personal para la elaboración
                    del contrato?
                  </strong>
                  <div className="radio-inputs-options">
                    <label className="input-radio">
                      <input
                        type="radio"
                        checked={dataForm.isInfoProvidedByRequester === true}
                        name="ingress-information"
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            isInfoProvidedByRequester: true,
                          });
                        }}
                      />
                      Yo ingresaré su información
                    </label>
                    <label className="input-radio">
                      <input
                        type="radio"
                        name="ingress-information"
                        checked={dataForm.isInfoProvidedByRequester === false}
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            isInfoProvidedByRequester: false,
                          });
                        }}
                      />
                      El usuario ingresará su información
                    </label>
                  </div>
                </ComponentRadio>
              </Col>
            </Row>
            {isNil(dataForm.isInfoProvidedByRequester) === false &&
              dataForm.isInfoProvidedByRequester === false &&
              (dataRequest.isFaceToFace === "1" ||
                dataRequest.isFaceToFace === true) && (
                <>
                  <Row>
                    <Col span={24}>
                      <CustomInputTypeForm
                        value={dataForm.emailAddress}
                        placeholder=""
                        label="Correo *"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            emailAddress: value,
                          });
                        }}
                        type="email"
                        isBlock={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <CustomInputTypeForm
                        value={dataForm.phoneNumber}
                        placeholder=""
                        label="Teléfono WhatsApp"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            phoneNumber: value,
                          });
                        }}
                        type="tel"
                        isBlock={false}
                      />
                    </Col>
                  </Row>
                </>
              )}
            <Row>
              <Col span={24}>
                <ComponentRadio>
                  <strong>
                    ¿Deseas que el usuario sea verificado para evitar una
                    suplantación de identidad? * <br />
                    <SpanPrice>
                      * Costo adicional: {dataFee.userIdentity}
                    </SpanPrice>
                    <br />
                  </strong>
                  <div className="radio-inputs-options">
                    <label className="input-radio">
                      <input
                        type="radio"
                        checked={dataForm.requiresVerification === true}
                        name="verify-information"
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            requiresVerification: true,
                          });
                        }}
                      />
                      Si
                    </label>
                    <label className="input-radio">
                      <input
                        type="radio"
                        name="verify-information"
                        checked={dataForm.requiresVerification === false}
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            requiresVerification: false,
                          });
                        }}
                      />
                      No
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
              onClick={async () => {
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
                } = dataForm;
                if (
                  isNil(givenName) === false &&
                  isEmpty(givenName) === false &&
                  isNil(lastName) === false &&
                  isEmpty(lastName) === false &&
                  isNil(isInfoProvidedByRequester) === false &&
                  isNil(requiresVerification) === false
                ) {
                  if (
                    (dataRequest.isFaceToFace === "1" ||
                      dataRequest.isFaceToFace === true) &&
                    isInfoProvidedByRequester === false
                  ) {
                    if (
                      isNil(emailAddress) === false &&
                      isEmpty(emailAddress) === false
                    ) {
                      setIsLoadApi(true);
                      await onSaveInfo({
                        jsonUserImplicated: JSON.stringify([
                          {
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
                          },
                        ]),
                      });
                      setIsLoadApi(false);
                    } else {
                      setIsVisibleError(true);
                      setTimeout(() => {
                        setIsVisibleError(false);
                      }, 5000);
                    }
                  } else if (
                    (dataRequest.isFaceToFace === "1" ||
                      dataRequest.isFaceToFace === true) &&
                    isInfoProvidedByRequester === true
                  ) {
                    setIsLoadApi(true);
                    await onSaveInfo({
                      jsonUserImplicated: JSON.stringify([
                        {
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
                        },
                      ]),
                    });
                    setIsLoadApi(false);
                  } else if (
                    dataRequest.isFaceToFace === "2" ||
                    dataRequest.isFaceToFace === false
                  ) {
                    if (
                      isNil(emailAddress) === false &&
                      isEmpty(emailAddress) === false
                    ) {
                      setIsLoadApi(true);
                      await onSaveInfo({
                        jsonUserImplicated: JSON.stringify([
                          {
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
                          },
                        ]),
                      });
                      setIsLoadApi(false);
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
              }}
            >
              Guardar
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
        </ComponentLoadSection>
      </Container>
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
)(ComponentDetailUser);
