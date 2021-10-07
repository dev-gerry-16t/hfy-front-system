import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import ContextProfile from "../context/contextProfile";
import moment from "moment";

const SectionPersonalInformation = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
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
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataCommerceSociality, setDataCommerceSociety] = useState([]);
  const [dataStates, setDataStates] = useState([]);
  const [fieldDescription, setFieldDescription] = useState("");
  const [legalRepFieldDescription, setLegalRepFieldDescription] = useState("");

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataUserType } = dataContexProfile;

  const handlerCallUpdateCustomerAccount = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
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
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
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

  const handlerCallGetMaritalStatus = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_MARITAL_STATUS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataMaritalStatus(responseResult);
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

  const formTenantUser = (
    <>
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
      <CustomInputTypeForm
        value={dataForm.idTypeNumber}
        placeholder=""
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
    </>
  );

  const formMoralTenantUser = (
    <>
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
      <h1>Información acta constitutiva</h1>
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
      <h1>Representante Legal</h1>
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
      <h1>
        Información del documento que acredita la legalidad del representante
      </h1>
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
    </>
  );

  const formOwnerUser = (
    <>
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
      <CustomInputTypeForm
        value={dataForm.idTypeNumber}
        placeholder=""
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
      <CustomInputTypeForm
        value={dataForm.dateOfBirth}
        placeholder="dd-mm-yy"
        label="Fecha de nacimiento"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          console.log("value", value);
          setDataForm({
            ...dataForm,
            dateOfBirth: value,
          });
        }}
        type="date"
      />
      <CustomSelect
        value={dataForm.idMaritalStatus}
        placeholder=""
        label="Estado civil"
        data={dataMaritalStatus}
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            idMaritalStatus: value,
          });
        }}
      />
    </>
  );

  const formMoralOwnerUser = (
    <>
      <CustomInputTypeForm
        value={dataForm.givenName}
        placeholder=""
        label="Razón social"
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
      <h1>Información acta constitutiva</h1>
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
      <h1>Representante Legal</h1>
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
      <CustomInputTypeForm
        value={dataForm.legalRepDateOfBirth}
        placeholder="dd-mm-yy"
        label="Fecha de nacimiento"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            legalRepDateOfBirth: value,
          });
        }}
        type="date"
      />
      <h1>
        Información del documento que acredita la legalidad del representante
      </h1>
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
    </>
  );

  const typeFormUser = (userType) => {
    let component = <div />;
    switch (userType) {
      case "1":
        component = formTenantUser;
        break;
      case "2":
        component = formMoralTenantUser;
        break;
      case "3":
        component = formOwnerUser;
        break;
      case "4":
        component = formMoralOwnerUser;
        break;
      default:
        component = <div />;

        break;
    }
    return component;
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
      dateOfBirth: moment(dateOfBirth).parseZone().format("YYYY-MM-DD"),
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
    await handlerCallGetMaritalStatus();
    await handlerCallGetAllCommercialSocietyTypes();
    await handlerCallGetAllStates();
  };

  useEffect(() => {
    if (
      isEmpty(dataContexProfile) === false &&
      isEmpty(dataContexProfile.dataCustomerDetail) === false
    ) {
      handlerSetStateDataDetail(dataContexProfile.dataCustomerDetail);
    }
  }, [dataContexProfile]);

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
    <div
      style={{
        width: 200,
        fontSize: 12,
      }}
    >
      <h1>Información personal</h1>
      <div>Foto de perfil</div>
      {typeFormUser(dataUserType)}
      <button
        onClick={() => {
          handlerCallUpdateCustomerAccount(dataForm);
        }}
      >
        Guardar
      </button>
    </div>
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
