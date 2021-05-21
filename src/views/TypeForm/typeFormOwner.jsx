import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Layout, message } from "antd";
import HomeActive from "../../assets/iconSteps/iconHome.svg";
import HomeInactive from "../../assets/iconSteps/iconHomeInactive.svg";
import IconProfile from "../../assets/iconSteps/Profile.svg";
import IconProfileInactive from "../../assets/iconSteps/ProfileInactive.svg";
import Wallet from "../../assets/iconSteps/wallet.svg";
import WalletInactive from "../../assets/iconSteps/walletInactive.svg";
import DocumentIcon from "../../assets/iconSteps/document.svg";
import DocumentIconInactive from "../../assets/iconSteps/documentInactive.svg";
import SectionInfoOwner from "./sections/sectionInfoOwner";
import CurrentAddressRenter from "./sections/currentAddresRenter";
import TypePolicy from "./sections/TypePolicy";
import {
  callGetTypeFormDocumentTenant,
  callGetAllBankCatalog,
  callSetTypeFormOwner,
  callGetTypeFormOwner,
  callGetMaritalStatus,
  callGetZipCodeAdress,
  callGetPropertyTypes,
  callGetPolicies,
  callGetNationalities,
  callGetIdTypes,
  callGetTypeFormProperties,
  callGetPolicyPaymentMethod,
  callGetAllCommercialSocietyTypes,
  callGetAllStates,
  callPostPaymentService,
  callGetAllCommercialActivities,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import SectionBankInfo from "./sections/sectionBankInfo";
import "moment/locale/es";
import SectionPaymentPolicy from "./sections/sectionPaymentPolicy";

const { Content } = Layout;

const TypeFormOwner = (props) => {
  const {
    callGetTypeFormDocumentTenant,
    dataProfile,
    history,
    callGetAllBankCatalog,
    callSetTypeFormOwner,
    callGetTypeFormOwner,
    callGetMaritalStatus,
    callGetZipCodeAdress,
    callGetPropertyTypes,
    callGetPolicies,
    callGetNationalities,
    callGetIdTypes,
    match,
    callGetTypeFormProperties,
    callGetPolicyPaymentMethod,
    callGetAllCommercialSocietyTypes,
    callGetAllStates,
    callPostPaymentService,
    callGetAllCommercialActivities,
  } = props;
  const frontFunctions = new FrontFunctions();
  const [current, setCurrent] = useState(0);
  const [dataForm, setDataForm] = useState({});
  const [dataBank, setDataBank] = useState([]);
  const [dataProperties, setDataProperties] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataPolicyMethods, setDataPolicyMethods] = useState([]);
  const [dataCommerceSociality, setDataCommerceSociety] = useState([]);
  const [dataStates, setDataStates] = useState([]);
  const [dataCommercialActivity, setDataCommercialActivity] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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

  const hanlderCallGetTypeFormProperties = async (id, step) => {
    const {
      idSystemUser,
      idLoginHistory,
      idCustomerTenantTF,
      idCustomerTF,
      idContract,
    } = dataProfile;
    try {
      const response = await callGetTypeFormProperties({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idContract,
        idTypeForm: id,
        idSystemUser,
        idLoginHistory,
        stepIn: step,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0].typeFormProperties) === false
          ? JSON.parse(response.response[0].typeFormProperties)
          : [];
      setDataProperties(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCommercialSocietyTypes = async () => {
    const { idCustomerTF, idCustomerTenantTF, idSystemUser, idLoginHistory } =
      dataProfile;
    try {
      const response = await callGetAllCommercialSocietyTypes({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataCommerceSociety(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllStates = async () => {
    const { idCustomerTF, idCustomerTenantTF, idSystemUser, idLoginHistory } =
      dataProfile;
    try {
      const response = await callGetAllStates({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataStates(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetPolicyPaymentMethod = async (id, step) => {
    const { idSystemUser, idLoginHistory, idCustomerTenantTF, idCustomerTF } =
      dataProfile;
    try {
      const response = await callGetPolicyPaymentMethod({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idTypeForm: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPolicyMethods(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetTypeFormTenant = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory, idContract } =
      dataProfile;
    try {
      const response = await callSetTypeFormOwner({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idContract,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0].message) === false
          ? response.response[0].message
          : "";
      showMessageStatusApi(
        isEmpty(responseResult) === false
          ? responseResult
          : "Información actualizada exitosamente.",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetTypeFormDocument = async (data, type) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTypeFormDocumentTenant({
        idCustomer,
        idCustomerTenant: null,
        idSystemUser,
        idLoginHistory,
        idTypeForm: data.idTypeForm,
        isFirstTime: data.isFirstTime,
        type,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];

      setDataDocuments(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdress = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetZipCodeAdress({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      setDataZipCodeAdress(responseResult1);
      setDataZipCatalog(responseResult2);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetNationalities = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetNationalities({
        idCustomer,
        idCustomerTenant: null,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataNationalities(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetIdTypes = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetIdTypes({
        idCustomer,
        idCustomerTenant: null,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataIdTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallBankCatalog = async (clabe = null) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllBankCatalog({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
        clabe,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataBank(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const stepsOwner = [
    {
      title: "Información personal",
      content: (
        <SectionInfoOwner
          dataCommerceSociality={dataCommerceSociality}
          dataStates={dataStates}
          dataProperties={dataProperties}
          dataMaritalStatus={dataMaritalStatus}
          dataFormSave={dataForm}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 1 });
              next();
              setDataForm({ ...dataForm, ...data });
              setDataZipCodeAdress({});
              setDataZipCatalog([]);
            } catch (error) {}
          }}
          onChangeZipCode={(zipCode) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode });
          }}
          dataZipCodeAdress={dataZipCodeAdress}
          dataNationalities={dataNationalities}
          dataIdTypes={dataIdTypes}
          dataZipCatalog={dataZipCatalog}
        />
      ),
      iconActive: IconProfile,
      iconInactive: IconProfileInactive,
    },
    {
      title: "Inmueble a rentar",
      content: (
        <CurrentAddressRenter
          dataProperties={dataProperties}
          dataCommercialActivity={dataCommercialActivity}
          frontFunctions={frontFunctions}
          dataFormSave={dataForm}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 2 });
              next();
              setDataForm({ ...dataForm, ...data });
              setDataZipCodeAdress({});
              setDataZipCatalog([]);
            } catch (error) {}
          }}
          dataPropertyTypes={dataPropertyTypes}
          onChangeZipCode={(zipCode) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode });
          }}
          dataZipCodeAdress={dataZipCodeAdress}
          dataZipCatalog={dataZipCatalog}
          onClickBack={() => {
            setDataZipCodeAdress({});
            setDataZipCatalog([]);
            prev();
          }}
        />
      ),
      iconActive: HomeActive,
      iconInactive: HomeInactive,
    },
    {
      title: "Póliza",
      content: (
        <TypePolicy
          dataProperties={dataProperties}
          frontFunctions={frontFunctions}
          dataFormSave={dataForm}
          dataPolicies={dataPolicies}
          dataDocuments={dataDocuments}
          dataPolicyMethods={dataPolicyMethods}
          typeDocument={3}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 3 });
              next();
              setDataForm({ ...dataForm, ...data });
            } catch (error) {}
          }}
          onClickBack={() => prev()}
        />
      ),
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Datos bancarios",
      content: (
        <SectionBankInfo
          dataProperties={dataProperties}
          dataFormSave={dataForm}
          dataBank={dataBank}
          onSearchBank={handlerCallBankCatalog}
          onClickFinish={async (data) => {
            const { params } = match;
            const idSection = params.idSection;
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 3 });
              if (isNil(idSection) === false) {
                if (dataProfile.idUserType === 1) {
                  history.push("/websystem/dashboard-admin");
                } else if (dataProfile.idUserType === 5) {
                  history.push("/websystem/dashboard-attorney");
                } else if (dataProfile.idUserType === 7) {
                  history.push("/websystem/dashboard-controldesk");
                }
              } else {
                if (dataForm.requiresPayment === true) {
                  await handlerCallGetTypeFormTenant();
                  next();
                } else {
                  history.push("/websystem/dashboard-owner");
                }
              }
            } catch (error) {}
          }}
          onClickBack={() => prev()}
        />
      ),
      iconActive: Wallet,
      iconInactive: WalletInactive,
    },
    {
      title: "Pago de Póliza",
      content: (
        <SectionPaymentPolicy
          callPostPaymentServices={callPostPaymentService}
          dataProfile={dataProfile}
          dataFormSave={dataForm}
          totalPolicy={dataForm.totalCustomerPolicyAmount}
          onRedirect={() => {
            history.push("/websystem/dashboard-owner");
          }}
        />
      ),
      iconActive: Wallet,
      iconInactive: WalletInactive,
    },
  ];

  const handlerCallGetTypeFormTenant = async () => {
    const { params } = match;
    const { idCustomer, idSystemUser, idLoginHistory, idContract } =
      dataProfile;
    const idSection = params.idSection;
    try {
      const response = await callGetTypeFormOwner({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idContract,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false
          ? response.response[0]
          : {};
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.stepIn) === false &&
        isNil(idSection) === true
      ) {
        setCurrent(responseResult.stepIn);
      }
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.requiresCustomerEntInfo) === false &&
        responseResult.requiresCustomerEntInfo === true
      ) {
        handlerCallGetAllCommercialSocietyTypes();
        handlerCallGetAllStates();
      }
      setDataForm(responseResult);
      handlerCallGetTypeFormDocument(responseResult, 3);
      hanlderCallGetPolicyPaymentMethod(responseResult.idTypeForm);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetMaritalStatus = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetMaritalStatus({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataMaritalStatus(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPropertyTypes = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPropertyTypes({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPropertyTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPolicies = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPolicies({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataPolicies(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCommercialActivities = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCommercialActivities({
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCommercialActivity(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAsyncApis = async () => {
    await handlerCallGetTypeFormTenant();
    await handlerCallGetMaritalStatus();
    await handlerCallGetPropertyTypes();
    await handlerCallGetPolicies();
    await hanlderCallGetNationalities();
    await hanlderCallGetIdTypes();
    handlerCallGetAllCommercialActivities();
  };

  useEffect(() => {
    const { params } = match;
    handlerCallAsyncApis();
    const idSection = params.idSection;
    if (isNil(idSection) === false) {
      setCurrent(Number(idSection));
    }
  }, []);

  useEffect(() => {
    if (isEmpty(dataForm) === false) {
      hanlderCallGetTypeFormProperties(dataForm.idTypeForm, current);
    }
  }, [current, dataForm]);

  return (
    <Content>
      <div className="margin-app-main">
        <div className="steps-style-header">
          <hr />
          {isEmpty(stepsOwner) === false &&
            stepsOwner.map((row, index) => {
              return (
                <div className="step-icon">
                  <div
                    className={
                      current === index
                        ? "background-circle-active"
                        : "background-circle-inactive"
                    }
                  >
                    <img
                      src={
                        current === index ? row.iconActive : row.iconInactive
                      }
                      alt=""
                    />
                  </div>
                  <span
                    style={{
                      visibility: current !== index ? "visible" : "hidden",
                      color: "#d6d8e7",
                    }}
                    className="title-steps-typeform"
                  >
                    {row.title}
                  </span>
                </div>
              );
            })}
        </div>
        {isEmpty(stepsOwner) === false && (
          <div className="steps-content">{stepsOwner[current].content}</div>
        )}
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetTypeFormDocumentTenant: (data) =>
    dispatch(callGetTypeFormDocumentTenant(data)),
  callGetAllBankCatalog: (data) => dispatch(callGetAllBankCatalog(data)),
  callGetTypeFormOwner: (data) => dispatch(callGetTypeFormOwner(data)),
  callGetMaritalStatus: (data) => dispatch(callGetMaritalStatus(data)),
  callGetZipCodeAdress: (data) => dispatch(callGetZipCodeAdress(data)),
  callGetPropertyTypes: (data) => dispatch(callGetPropertyTypes(data)),
  callGetPolicies: (data) => dispatch(callGetPolicies(data)),
  callSetTypeFormOwner: (data) => dispatch(callSetTypeFormOwner(data)),
  callGetNationalities: (data) => dispatch(callGetNationalities(data)),
  callGetIdTypes: (data) => dispatch(callGetIdTypes(data)),
  callGetTypeFormProperties: (data) =>
    dispatch(callGetTypeFormProperties(data)),
  callGetPolicyPaymentMethod: (data) =>
    dispatch(callGetPolicyPaymentMethod(data)),
  callGetAllCommercialSocietyTypes: (data) =>
    dispatch(callGetAllCommercialSocietyTypes(data)),
  callGetAllStates: (data) => dispatch(callGetAllStates(data)),
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
  callGetAllCommercialActivities: (data) =>
    dispatch(callGetAllCommercialActivities(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormOwner);
