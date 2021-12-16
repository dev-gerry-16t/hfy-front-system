import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import ContextProfile from "../../context/contextProfile";
import moment from "moment";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../../constants/styleConstants";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import WidgetUploadImageProfile from "../../widget/widgetUploadImageProfile";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";

const SectionPersonalInformation = (props) => {
  const { callGlobalActionApi, dataProfile, onclickNext } = props;
  const [dataForm, setDataForm] = useState({
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    dateOfBirth: null,
    taxId: null,
    citizenId: null,
    idMaritalStatus: null,
    idCountryNationality: null,
    idType: null,
    idTypeNumber: null,
    placeOfIssue: null,
    enterpriseIdCommercialSocietyType: null,
    enterprisePublicWrtitingNo: null,
    enterprisePublicBookNo: null,
    enterpriseNotaryName: null,
    enterpriseNotaryOfficeNo: null,
    enterpriseSignedAtPlace: null,
    enterpriseIdStatePublicProperty: null,
    enterpriseCommercialInvoice: null,
    legalRepGivenName: null,
    legalRepLastName: null,
    legalRepMothersMaidenName: null,
    legalRepPublicWritingNo: null,
    legalRepPublicBookNo: null,
    legalRepNotaryName: null,
    legalRepNotaryOfficeNo: null,
    legalRepSignedAtPlace: null,
    legalRepIdType: null,
    legalRepIdTypeNumber: null,
    legalRepDateOfBirth: null,
    isDataConfirmed: null,
    boundSolidarityGivenName: null,
    boundSolidarityEmailAddress: null,
    deactivateBoundSolidarity: null,
    sendReminderBoundSolidarity: null,
  });
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataCommerceSociality, setDataCommerceSociety] = useState([]);
  const [dataStates, setDataStates] = useState([]);
  const [legalRepFieldDescription, setLegalRepFieldDescription] = useState("");
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail, matchParams, history, identifier } =
    dataContexProfile;

  const handlerCallUpdateCustomerAccount = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.UPDATE_CUSTOMER_ACCOUNT,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.VALIDATE_CUSTOMER_PROPERTIES_IN_TAB
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].properties) === false &&
        isEmpty(response.response[0][0].properties) === false
          ? JSON.parse(response.response[0][0].properties)
          : [];

      setDataVerificationInfo(responseResult);
      if (isEmpty(responseResult) === false) {
        setIsOpenVerification(true);
        throw "Revisa la información requerida";
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const hanlderCallGetIdTypes = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_ID_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataIdTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCommercialSocietyTypes = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_COMMERCIAL_SOCIETY_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataCommerceSociety(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllStates = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_ALL_STATES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataStates(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerSetStateDataDetail = (data) => {
    const {
      givenName,
      lastName,
      mothersMaidenName,
      dateOfBirth,
      taxId,
      citizenId,
      idMaritalStatus,
      idCountryNationality,
      idType,
      idTypeNumber,
      placeOfIssue,
      enterpriseIdCommercialSocietyType,
      enterprisePublicWrtitingNo,
      enterprisePublicBookNo,
      enterpriseNotaryName,
      enterpriseNotaryOfficeNo,
      enterpriseSignedAtPlace,
      enterpriseIdStatePublicProperty,
      enterpriseCommercialInvoice,
      legalRepGivenName,
      legalRepLastName,
      legalRepMothersMaidenName,
      legalRepPublicWritingNo,
      legalRepPublicBookNo,
      legalRepNotaryName,
      legalRepNotaryOfficeNo,
      legalRepSignedAtPlace,
      legalRepIdType,
      legalRepIdTypeNumber,
      legalRepDateOfBirth,
      isDataConfirmed,
      boundSolidarityGivenName,
      boundSolidarityEmailAddress,
      deactivateBoundSolidarity,
      sendReminderBoundSolidarity,
    } = data;
    setDataForm({
      givenName,
      lastName,
      mothersMaidenName,
      dateOfBirth:
        isNil(dateOfBirth) === false && isEmpty(dateOfBirth) === false
          ? moment(dateOfBirth).parseZone().format("YYYY-MM-DD")
          : null,
      taxId,
      citizenId,
      idMaritalStatus,
      idCountryNationality,
      idType,
      idTypeNumber,
      placeOfIssue,
      enterpriseIdCommercialSocietyType,
      enterprisePublicWrtitingNo,
      enterprisePublicBookNo,
      enterpriseNotaryName,
      enterpriseNotaryOfficeNo,
      enterpriseSignedAtPlace,
      enterpriseIdStatePublicProperty,
      enterpriseCommercialInvoice,
      legalRepGivenName,
      legalRepLastName,
      legalRepMothersMaidenName,
      legalRepPublicWritingNo,
      legalRepPublicBookNo,
      legalRepNotaryName,
      legalRepNotaryOfficeNo,
      legalRepSignedAtPlace,
      legalRepIdType,
      legalRepIdTypeNumber,
      legalRepDateOfBirth:
        isNil(legalRepDateOfBirth) === false &&
        isEmpty(legalRepDateOfBirth) === false
          ? moment(legalRepDateOfBirth).parseZone().format("YYYY-MM-DD")
          : null,
      isDataConfirmed,
      boundSolidarityGivenName,
      boundSolidarityEmailAddress,
      deactivateBoundSolidarity,
      sendReminderBoundSolidarity,
    });
  };

  const handlerCallInitApis = async () => {
    await hanlderCallGetIdTypes();
    await handlerCallGetAllCommercialSocietyTypes();
    await handlerCallGetAllStates();
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataCustomerDetail]);

  useEffect(() => {
    handlerCallInitApis();
  }, []);

  useEffect(() => {
    if (
      isEmpty(dataIdTypes) === false &&
      isNil(dataForm.legalRepIdType) === false
    ) {
      const selectDefaultLegalIdType = dataIdTypes.find((row) => {
        return dataForm.legalRepIdType === row.idType;
      });
      setLegalRepFieldDescription(
        isNil(selectDefaultLegalIdType) === false
          ? selectDefaultLegalIdType.fieldDescription
          : ""
      );
    }
  }, [dataIdTypes]);

  return (
    <ContentForm>
      {isNil(matchParams) === false && (
        <div className="back-button">
          <button
            onClick={() => {
              history.push("/websystem/profile");
            }}
          >
            <Arrow width="35px" />
          </button>
        </div>
      )}
      <div className="header-title">
        <h1>Información personal</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
            </Col>
          </Row>
        </div>
        <WidgetModalConfirmation
          data={dataVerificationInfo}
          isVisibleModal={isOpenVerification}
          onNextStep={() => {
            onclickNext(dataForm); //verifica que sea next o finish
          }}
          onClose={() => {
            setIsOpenVerification(false);
          }}
        />
        <WidgetUploadImageProfile />
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.givenName}
                placeholder=""
                label="Razón social"
                error={false}
                errorMessage="Este campo es requerido"
                info='La razón no debe incluir su tipo de sociedad mercantil, por ejemplo "Empresa SA de CV " capturar  "Empresa".'
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    givenName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.enterpriseIdCommercialSocietyType}
                placeholder=""
                label="Tipo de sociedad mercantil"
                data={dataCommerceSociality}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseIdCommercialSocietyType: value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.taxId}
                placeholder=""
                label="RFC con Homoclave"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    taxId: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row>
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        ></div>
        <h1 className="subtitle-header">Contacto</h1>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.phoneNumber}
                placeholder=""
                label="Teléfono"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    phoneNumber: value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.email}
                placeholder=""
                label="Correo"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    email: value,
                  });
                }}
                type="email"
              />
            </Col>
          </Row>
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        ></div>
        <h1 className="subtitle-header">Información acta constitutiva</h1>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.enterpriseIdStatePublicProperty}
                placeholder=""
                label="Estado de emisión"
                data={dataStates}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseIdStatePublicProperty: value,
                  });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterpriseCommercialInvoice}
                placeholder=""
                label="Folio mercantil"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseCommercialInvoice: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterprisePublicWrtitingNo}
                placeholder=""
                label="Escritura pública No."
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterprisePublicWrtitingNo: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterprisePublicBookNo}
                placeholder=""
                label="Libro"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterprisePublicBookNo: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterpriseNotaryName}
                placeholder=""
                label="Nombre del notario"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseNotaryName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterpriseNotaryOfficeNo}
                placeholder=""
                label="Número de notaría"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseNotaryOfficeNo: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.enterpriseSignedAtPlace}
                placeholder=""
                label="Lugar de firma de escritura"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    enterpriseSignedAtPlace: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row>
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        ></div>
        <h1 className="subtitle-header">Representante Legal</h1>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepGivenName}
                placeholder=""
                label="Nombres"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepGivenName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepLastName}
                placeholder=""
                label="Apellido paterno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepLastName: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepMothersMaidenName}
                placeholder=""
                label="Apellido materno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepMothersMaidenName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.legalRepIdType}
                placeholder=""
                label="Identificación oficial"
                data={dataIdTypes}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    legalRepIdType: value,
                  });
                  setLegalRepFieldDescription(option.fieldDescription);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepIdTypeNumber}
                placeholder=""
                label={legalRepFieldDescription}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepIdTypeNumber: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepDateOfBirth}
                placeholder="dd-mm-yy"
                label="Fecha de nacimiento"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepDateOfBirth:
                      isEmpty(value) === false ? value : null,
                  });
                }}
                type="date"
              />
            </Col>
          </Row>
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        ></div>
        <h1 className="subtitle-header">
          Información del documento que acredita la legalidad del representante
        </h1>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.repeatInfoMoral}
                placeholder=""
                label="¿La legalidad del representante está indicada en el Acta Constitutiva?"
                data={[
                  {
                    id: 1,
                    text: "Si",
                  },
                  {
                    id: 0,
                    text: "No, es diferente",
                  },
                ]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    repeatInfoMoral: value,
                  });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepPublicWritingNo}
                placeholder=""
                label="Escritura pública No."
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepPublicWritingNo: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepPublicBookNo}
                placeholder=""
                label="Libro"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepPublicBookNo: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepNotaryName}
                placeholder=""
                label="Nombre del notario"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepNotaryName: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepNotaryOfficeNo}
                placeholder=""
                label="Número de notaría"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepNotaryOfficeNo: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.legalRepSignedAtPlace}
                placeholder=""
                label="Lugar de firma de escritura"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    legalRepSignedAtPlace: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallUpdateCustomerAccount(dataForm);
                handlerCallValidateCustomerPropertiesInTab();
              } catch (error) {}
            }}
          >
            Guardar
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallUpdateCustomerAccount(dataForm);
                await handlerCallValidateCustomerPropertiesInTab();
                onclickNext(dataForm);
              } catch (error) {}
            }}
          >
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
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
)(SectionPersonalInformation);
