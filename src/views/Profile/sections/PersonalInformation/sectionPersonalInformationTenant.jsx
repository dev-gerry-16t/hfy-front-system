import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Avatar } from "antd";
import moment from "moment";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import ENVIROMENT from "../../../../utils/constants/enviroments";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callSetImageProfile,
} from "../../../../utils/actions/actions";
import { setDataUserProfile } from "../../../../utils/dispatchs/userProfileDispatch";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../../constants/styleConstants";
import { IconDelete, IconEditSquare } from "../../../../assets/iconSvg";
import SectionChangeImage from "../../../../containers/Layout/section/sectionChangeImage";

const ComponentCheck = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  .radio-check-option {
    margin-left: 2em;
    .input-checkbox {
      input[type="checkbox"] {
        appearance: none;
        background-color: #fff;
        font: inherit;
        color: #fff;
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        display: inline-grid;
        place-content: center;
      }
      input[type="checkbox"]::before {
        content: "\\2713";
        transform: scale(0);
        width: 1.05em;
        height: 1.05em;
        border-radius: 5px;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input[type="checkbox"]:checked::before {
        transform: scale(1);
      }
    }
  }
`;

const ComponentRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .radio-inputs-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    .input-radio {
      input[type="radio"] {
        appearance: none;
        background-color: #fff;
        margin-right: 5px;
        font: inherit;
        color: var(--color-primary);
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        display: inline-grid;
        place-content: center;
      }
      input[type="radio"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
      }
      input[type="radio"]:checked::before {
        transform: scale(1);
      }
    }
  }
`;

const AvatarUpload = styled.div`
  display: flex;
  justify-content: center;
  .edit-profile-image {
    position: relative;
    button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: var(--color-primary);
      bottom: 0;
      right: 0.5em;
    }
  }
`;

const SectionPersonalInformation = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    onclickNext,
    callSetImageProfile,
    setDataUserProfile,
  } = props;
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
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [fieldDescription, setFieldDescription] = useState("");
  const [isVisibleAvatarSection, setIsVisibleAvatarSection] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;

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
          identifier: 0,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.VALIDATE_CUSTOMER_PROPERTIES_IN_TAB
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetNationalities = async () => {
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

  const handlerCallSetImageProfile = async (file, data) => {
    const {
      idCustomer,
      idLoginHistory,
      idSystemUser,
      idDocument,
      bucketSource,
    } = dataProfile;
    try {
      const response = await callSetImageProfile(
        file,
        {
          idCustomer,
          idLoginHistory,
          documentName: data.documentName,
          extension: data.extension,
          preview: null,
          thumbnail: null,
          idDocument,
          bucketSource,
        },
        idSystemUser,
        () => {}
      );
      const responseResult =
        isNil(response.response) === false ? response.response : {};
      await setDataUserProfile({
        ...dataProfile,
        idDocument:
          isNil(responseResult.idDocument) === false
            ? responseResult.idDocument
            : idDocument,
        bucketSource:
          isNil(responseResult.bucketSource) === false
            ? responseResult.bucketSource
            : bucketSource,
      });
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
      dateOfBirth: dateOfBirth,
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
    });
  };

  const handlerCallInitApis = async () => {
    await handlerCallValidateCustomerPropertiesInTab();
    await hanlderCallGetNationalities();
    await hanlderCallGetIdTypes();
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
    if (isEmpty(dataIdTypes) === false && isNil(dataForm.idType) === false) {
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataForm.idType === row.idType;
      });
      setFieldDescription(
        isNil(selectDefaultIdType) === false
          ? selectDefaultIdType.fieldDescription
          : ""
      );
    }
  }, [dataIdTypes]);

  return (
    <ContentForm>
      <SectionChangeImage
        isModalVisible={isVisibleAvatarSection}
        onClose={() => {
          setIsVisibleAvatarSection(!isVisibleAvatarSection);
        }}
        onSelectImage={async (file, data) => {
          try {
            await handlerCallSetImageProfile(file, data);
          } catch (error) {
            throw error;
          }
        }}
      />
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
        <AvatarUpload>
          <div className="edit-profile-image">
            <Avatar
              size={150}
              src={`${ENVIROMENT}/api/viewFile/${dataProfile.idDocument}/${dataProfile.bucketSource}`}
            />
            <button
              onClick={() => {
                setIsVisibleAvatarSection(!isVisibleAvatarSection);
              }}
            >
              <IconEditSquare color="#fff" />
            </button>
          </div>
        </AvatarUpload>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.givenName}
                placeholder=""
                label="Nombres"
                error={false}
                errorMessage="Este campo es requerido"
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
              <CustomInputTypeForm
                value={dataForm.lastName}
                placeholder=""
                label="Apellido paterno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    lastName: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.mothersMaidenName}
                placeholder=""
                label="Apellido materno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    mothersMaidenName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.idCountryNationality}
                placeholder=""
                label="Nacionalidad"
                data={dataNationalities}
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
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.idType}
                placeholder=""
                label="Identificación oficial"
                data={dataIdTypes}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idType: value,
                  });
                  setFieldDescription(option.fieldDescription);
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.idTypeNumber}
                placeholder="Numero de identificación"
                label={fieldDescription}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    idTypeNumber: value,
                  });
                }}
                type="text"
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
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.citizenId}
                placeholder=""
                label="CURP"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    citizenId: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ComponentRadio>
                <strong>¿Tienes un obligado solidario?</strong>
                <div className="radio-inputs-options">
                  <label className="input-radio">
                    <input
                      type="radio"
                      checked={dataForm.deactivateBoundSolidarity == true}
                      name="obligado-solidario"
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          deactivateBoundSolidarity: true,
                        });
                      }}
                    />
                    Si
                  </label>
                  <label className="input-radio">
                    <input
                      type="radio"
                      name="obligado-solidario"
                      checked={dataForm.deactivateBoundSolidarity == false}
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          deactivateBoundSolidarity: false,
                        });
                      }}
                    />
                    No
                  </label>
                </div>
              </ComponentRadio>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.boundSolidarityEmailAddress}
                placeholder=""
                label="Correo del obligado solidario"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    boundSolidarityEmailAddress: value,
                  });
                }}
                type="email"
              />
            </Col>
          </Row>
          {/* <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ComponentCheck>
                <strong>¿Cuentas con Aval?</strong>
                <div className="radio-check-option">
                  <label className="input-checkbox">
                    <input
                      type="checkbox"
                      id="cbox1"
                      value="first_checkbox"
                      onChange={(e) => {}}
                    />
                  </label>
                </div>
              </ComponentCheck>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row> */}
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        >
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>
                Antes de continuar por favor verifica que tus datos sean
                correctos.
              </span>
            </Col>
          </Row>
        </div>
        <h1 className="subtitle-header">Datos de contacto</h1>
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
  callSetImageProfile: (file, data, id, callback) =>
    dispatch(callSetImageProfile(file, data, id, callback)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionPersonalInformation);
