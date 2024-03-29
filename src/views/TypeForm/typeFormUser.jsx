import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import "moment/locale/es";
import HomeActive from "../../assets/iconSteps/iconHome.svg";
import HomeInactive from "../../assets/iconSteps/iconHomeInactive.svg";
import IconProfile from "../../assets/iconSteps/Profile.svg";
import IconProfileInactive from "../../assets/iconSteps/ProfileInactive.svg";
import Wallet from "../../assets/iconSteps/wallet.svg";
import WalletInactive from "../../assets/iconSteps/walletInactive.svg";
import Work from "../../assets/iconSteps/Work.svg";
import WorkInactive from "../../assets/iconSteps/WorkInactive.svg";
import DocumentIcon from "../../assets/iconSteps/document.svg";
import DocumentIconInactive from "../../assets/iconSteps/documentInactive.svg";
import Renter from "../../assets/iconSteps/renter.svg";
import RenterInactive from "../../assets/iconSteps/renterInactive.svg";
import Shield from "../../assets/iconSteps/Shield.svg";
import ShieldInactive from "../../assets/iconSteps/ShieldInactive.svg";
import SectionInfoUser from "./sections/sectionInfoUser";
import SectionCurrentAddress from "./sections/currentAddress";
import SectionCurrentWork from "./sections/sectionCurrentWork";
import SectionInfoReferences from "./sections/sectionInfoReferences";
import SectionDocumentation from "./sections/sectionDocumentation";
import SectionInfoAval from "./sections/sectionInfoAval";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetTypeFormTenant,
  callSetTypeFormTenant,
  callGetZipCodeAdress,
  callGetTypeFormDocumentTenant,
  callSetTypeFormReferences,
  callGetNationalities,
  callGetIdTypes,
  callGetOccupations,
  callGetMaritalStatus,
  callGetMaritalRegime,
  callGetAllCommercialSocietyTypes,
  callGetAllStates,
  callGetTypeFormProperties,
  callPostPaymentService,
  callValidateTypeFormProperties,
} from "../../utils/actions/actions";
import SectionPaymentPolicy from "./sections/sectionPaymentPolicy";

const { Content } = Layout;

const TypeFormUser = (props) => {
  const {
    dataProfile,
    callGetTypeFormTenant,
    callSetTypeFormTenant,
    callGetTypeFormDocumentTenant,
    callGetMaritalRegime,
    callGetMaritalStatus,
    callGetZipCodeAdress,
    callSetTypeFormReferences,
    callGetNationalities,
    callGetIdTypes,
    callGetOccupations,
    callGetAllCommercialSocietyTypes,
    callGetAllStates,
    callGetTypeFormProperties,
    callPostPaymentService,
    history,
    match,
    callValidateTypeFormProperties,
  } = props;
  const frontFunctions = new FrontFunctions();
  const [current, setCurrent] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [dataReferences, setDataReferences] = useState([]);
  const [dataProperties, setDataProperties] = useState([]);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataDocumentsEndorsement, setDataDocumentsEndorsement] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCodeAdressEndorsement, setDataZipCodeAdressEndorsement] =
    useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataZipCatalogEndorsement, setDataZipCatalogEndorsement] = useState(
    []
  );
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataOccupations, setDataOccupations] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataMaritalRegime, setDataMaritalRegime] = useState([]);
  const [dataCommerceSociality, setDataCommerceSociety] = useState([]);
  const [dataStates, setDataStates] = useState([]);
  const [finishCallApis, setFinishCallApis] = useState(false);
  const [dataPropertiesInfo, setDataPropertiesInfo] = useState([]);

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

  const next = (stepTwo = false) => {
    if (stepTwo === false) {
      setCurrent(current + 1);
    } else {
      setCurrent(current + 2);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handlerCallSetTypeFormTenant = async (data) => {
    const { idCustomerTenantTF, idCustomerTF, idSystemUser, idLoginHistory } =
      dataProfile;
    try {
      const response = await callSetTypeFormTenant({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const { params } = match;
      const idSection = params.idSection;

      const responseComplete =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.isCompleted) === false
          ? response.response.isCompleted
          : "";
      if (responseComplete === true) {
        if (isNil(idSection) === false) {
          if (dataProfile.idUserType === 1) {
            history.push("/websystem/dashboard-admin");
          } else if (dataProfile.idUserType === 5) {
            history.push("/websystem/dashboard-attorney");
          } else if (dataProfile.idUserType === 7) {
            history.push("/websystem/dashboard-controldesk");
          }
        } else {
          history.push("/websystem/dashboard-tenant");
        }
      }

      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
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

  const handlerCallValidateTypeFormProperties = async (data) => {
    const { idSystemUser, idLoginHistory, idContract } = dataProfile;
    try {
      const response = await callValidateTypeFormProperties({
        ...data,
        idSystemUser,
        idLoginHistory,
        idContract,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPropertiesInfo(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetTypeFormReferences = async (data) => {
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idSystemUser,
      idLoginHistory,
      idContract,
    } = dataProfile;
    try {
      await callSetTypeFormReferences({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        idContract,
        ...data,
      });
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

  const hanlderCallGetZipCodeAdress = async (data, isEndorsement = false) => {
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
      if (isEndorsement === true) {
        setDataZipCodeAdressEndorsement(responseResult1);
        setDataZipCatalogEndorsement(responseResult2);
      } else {
        setDataZipCodeAdress(responseResult1);
        setDataZipCatalog(responseResult2);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
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

  const hanlderCallGetNationalities = async () => {
    const { idSystemUser, idLoginHistory, idCustomerTenantTF, idCustomerTF } =
      dataProfile;
    try {
      const response = await callGetNationalities({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
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
    const { idSystemUser, idLoginHistory, idCustomerTenantTF, idCustomerTF } =
      dataProfile;
    try {
      const response = await callGetIdTypes({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
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

  const hanlderCallGetOccupations = async () => {
    const { idSystemUser, idLoginHistory, idCustomerTenantTF, idCustomerTF } =
      dataProfile;
    try {
      const response = await callGetOccupations({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataOccupations(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetMaritalStatus = async () => {
    const { idCustomerTF, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetMaritalStatus({
        idCustomer: idCustomerTF,
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

  const handlerCallGetMaritalRegime = async () => {
    const { idCustomerTF, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetMaritalRegime({
        idCustomer: idCustomerTF,
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
      setDataMaritalRegime(responseResult);
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

  const handlerCallGetTypeFormDocumentTenant = async (data, type) => {
    const { idCustomerTenantTF, idCustomerTF, idSystemUser, idLoginHistory } =
      dataProfile;
    try {
      const response = await callGetTypeFormDocumentTenant({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
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
      if (type === 1) {
        setDataDocuments(responseResult);
      } else if (type === 2) {
        setDataDocumentsEndorsement(responseResult);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const steps = [
    {
      title: "Información general",
      content: (
        <SectionInfoUser
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          dataFormSave={dataForm}
          dataProperties={dataProperties}
          dataNationalities={dataNationalities}
          dataCommerceSociality={dataCommerceSociality}
          dataStates={dataStates}
          dataIdTypes={dataIdTypes}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 1 });
              next();
              setDataForm({ ...dataForm, ...data });
            } catch (error) {}
          }}
        />
      ),
      iconActive: IconProfile,
      iconInactive: IconProfileInactive,
    },
    {
      title: "Dirección actual",
      content: (
        <SectionCurrentAddress
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          dataFormSave={dataForm}
          dataProperties={dataProperties}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({
                ...data,
                stepIn:
                  dataForm.requiresCustomerTenantEntInfo === false ? 2 : 4,
              });
              next(
                dataForm.requiresCustomerTenantEntInfo === false ? false : true
              );
              setDataForm({ ...dataForm, ...data });
              setDataZipCodeAdress({});
              setDataZipCatalog([]);
            } catch (error) {}
          }}
          dataZipCatalog={dataZipCatalog}
          onChangeZipCode={(zipCode) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode });
          }}
          dataZipCodeAdress={dataZipCodeAdress}
          onClickBack={() => prev()}
        />
      ),
      iconActive: HomeActive,
      iconInactive: HomeInactive,
    },
    {
      title: "Información laboral",
      content: (
        <SectionCurrentWork
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          dataFormSave={dataForm}
          dataProperties={dataProperties}
          onClickNext={async (data) => {
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 3 });
              next();
              setDataForm({ ...dataForm, ...data });
            } catch (error) {}
          }}
          dataOccupations={dataOccupations}
          frontFunctions={frontFunctions}
          onClickBack={() => prev()}
        />
      ),
      iconActive: Work,
      iconInactive: WorkInactive,
    },
    {
      title: "Referencias",
      content: (
        <SectionInfoReferences
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          dataFormSave={dataForm}
          dataReferences={dataReferences}
          onClickSendReferences={async (data) => {
            try {
              await handlerCallSetTypeFormReferences(data);
            } catch (error) {
              throw error;
            }
          }}
          onClickNext={() => {
            next();
          }}
          onClickBack={() => prev()}
        />
      ),
      iconActive: Renter,
      iconInactive: RenterInactive,
    },
    {
      title: "Documentación",
      content: (
        <SectionDocumentation
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          onGetDocument={() => {
            handlerCallGetTypeFormDocumentTenant(dataForm, 1);
          }}
          dataForm={dataForm}
          onClickNext={() => {
            next();
          }}
          onClickBack={() => prev()}
          dataDocuments={dataDocuments}
          typeDocument={1}
        />
      ),
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Información aval",
      content: (
        <SectionInfoAval
          dataPropertiesInfo={dataPropertiesInfo}
          onGetProperties={async (data) => {
            try {
              await handlerCallValidateTypeFormProperties(data);
            } catch (error) {
              throw error;
            }
          }}
          getDocument={() => {
            handlerCallGetTypeFormDocumentTenant(dataForm, 2);
          }}
          frontFunctions={frontFunctions}
          dataProperties={dataProperties}
          dataNationalities={dataNationalities}
          dataIdTypes={dataIdTypes}
          dataFormSave={dataForm}
          dataDocuments={dataDocumentsEndorsement}
          onClickFinish={async (data) => {
            const { params } = match;
            const idSection = params.idSection;
            try {
              await handlerCallSetTypeFormTenant({ ...data, stepIn: 5 });
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
                  history.push("/websystem/dashboard-tenant");
                }
              }
            } catch (error) {}
          }}
          onChangeZipCode={(zipCode, fiador) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode }, fiador);
          }}
          dataZipCatalog={dataZipCatalog}
          dataZipCodeAdress={dataZipCodeAdress}
          dataZipCatalogEndorsement={dataZipCatalogEndorsement}
          dataZipCodeAdressEndorsement={dataZipCodeAdressEndorsement}
          onClickBack={() => {
            prev();
          }}
          typeDocument={2}
          dataMaritalStatus={dataMaritalStatus}
          dataMaritalRegime={dataMaritalRegime}
        />
      ),
      iconActive: Shield,
      iconInactive: ShieldInactive,
    },
    {
      title: "Pago de Póliza",
      content: (
        <SectionPaymentPolicy
          callPostPaymentServices={callPostPaymentService}
          dataProfile={dataProfile}
          dataFormSave={dataForm}
          totalPolicy={dataForm.totalCustomerTenantPolicyAmount}
          totalPolicyFormat={dataForm.totalCustomerTenantPolicyAmountFormat}
          onRedirect={() => {
            history.push("/websystem/dashboard-tenant");
          }}
        />
      ),
      iconActive: Wallet,
      iconInactive: WalletInactive,
    },
  ];

  const handlerCallGetTypeFormTenant = async () => {
    const { params } = match;
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idContract,
      idSystemUser,
      idLoginHistory,
    } = dataProfile;
    const idSection = params.idSection;
    try {
      const response = await callGetTypeFormTenant({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        idContract,
      });
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false &&
        isEmpty(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false &&
        isNil(response.response2) === false &&
        isEmpty(response.response2) === false
          ? response.response2
          : [];
      if (
        isEmpty(responseResult1) === false &&
        isNil(responseResult1.stepIn) === false &&
        isNil(idSection) === true
      ) {
        setCurrent(responseResult1.stepIn);
      }
      if (
        isEmpty(responseResult1) === false &&
        isNil(responseResult1.requiresCustomerTenantEntInfo) === false &&
        responseResult1.requiresCustomerTenantEntInfo === true
      ) {
        handlerCallGetAllCommercialSocietyTypes();
        handlerCallGetAllStates();
      }
      setDataForm(responseResult1);
      setDataReferences(responseResult2);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAsyncApis = async () => {
    await handlerCallGetTypeFormTenant();
    await hanlderCallGetNationalities();
    await hanlderCallGetIdTypes();
    await hanlderCallGetOccupations();
    await handlerCallGetMaritalStatus();
    await handlerCallGetMaritalRegime();
    setFinishCallApis(true);
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
          {isEmpty(steps) === false &&
            finishCallApis === true &&
            steps.map((row, index) => {
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
        {isEmpty(steps) === false &&
        finishCallApis === true &&
        isNil(steps[current]) === false &&
        isNil(steps[current].content) === false ? (
          <div className="steps-content">{steps[current].content}</div>
        ) : (
          <div className="loader-auth-spiner" />
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
  callGetTypeFormTenant: (data) => dispatch(callGetTypeFormTenant(data)),
  callSetTypeFormTenant: (data) => dispatch(callSetTypeFormTenant(data)),
  callSetTypeFormReferences: (data) =>
    dispatch(callSetTypeFormReferences(data)),
  callGetZipCodeAdress: (data) => dispatch(callGetZipCodeAdress(data)),
  callGetTypeFormDocumentTenant: (data) =>
    dispatch(callGetTypeFormDocumentTenant(data)),
  callGetNationalities: (data) => dispatch(callGetNationalities(data)),
  callGetIdTypes: (data) => dispatch(callGetIdTypes(data)),
  callGetOccupations: (data) => dispatch(callGetOccupations(data)),
  callGetMaritalStatus: (data) => dispatch(callGetMaritalStatus(data)),
  callGetMaritalRegime: (data) => dispatch(callGetMaritalRegime(data)),
  callGetAllCommercialSocietyTypes: (data) =>
    dispatch(callGetAllCommercialSocietyTypes(data)),
  callGetAllStates: (data) => dispatch(callGetAllStates(data)),
  callGetTypeFormProperties: (data) =>
    dispatch(callGetTypeFormProperties(data)),
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
  callValidateTypeFormProperties: (data) =>
    dispatch(callValidateTypeFormProperties(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormUser);
