import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Steps, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import "moment/locale/es";
import IconCalendar from "../../assets/icons/Calendar.svg";
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
import SectionInfoOwner from "./sections/sectionInfoOwner";
import CurrentAddressRenter from "./sections/currentAddresRenter";
import TypePolicy from "./sections/TypePolicy";
import SectionBankInfo from "./sections/sectionBankInfo";
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
} from "../../utils/actions/actions";

const { Step } = Steps;
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
    history,
    match,
  } = props;
  const frontFunctions = new FrontFunctions();
  const [current, setCurrent] = useState(0);
  const [dataForm, setDataForm] = useState({});
  const [dataReferences, setDataReferences] = useState([]);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataDocumentsEndorsement, setDataDocumentsEndorsement] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataOccupations, setDataOccupations] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataMaritalRegime, setDataMaritalRegime] = useState([]);

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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handlerCallSetTypeFormTenant = async (data) => {
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idSystemUser,
      idLoginHistory,
    } = dataProfile;
    try {
      const response = await callSetTypeFormTenant({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetTypeFormReferences = async (data) => {
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idSystemUser,
      idLoginHistory,
    } = dataProfile;
    try {
      const response = await callSetTypeFormReferences({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
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
    const {
      idCustomer,
      idSystemUser,
      idLoginHistory,
      idCustomerTenantTF,
      idCustomerTF,
    } = dataProfile;
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
    const {
      idCustomer,
      idSystemUser,
      idLoginHistory,
      idCustomerTenantTF,
      idCustomerTF,
    } = dataProfile;
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
    const {
      idCustomer,
      idSystemUser,
      idLoginHistory,
      idCustomerTenantTF,
      idCustomerTF,
    } = dataProfile;
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

  const handlerCallGetTypeFormDocumentTenant = async (id, type) => {
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idCustomer,
      idSystemUser,
      idLoginHistory,
    } = dataProfile;
    try {
      const response = await callGetTypeFormDocumentTenant({
        idCustomer: idCustomerTF,
        idCustomerTenant: idCustomerTenantTF,
        idSystemUser,
        idLoginHistory,
        idTypeForm: id,
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
      title: "Información personal",
      content: (
        <SectionInfoUser
          dataFormSave={dataForm}
          dataNationalities={dataNationalities}
          dataIdTypes={dataIdTypes}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            next();
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
          dataFormSave={dataForm}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            setDataZipCodeAdress({});
            setDataZipCatalog([]);
            next();
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
          dataFormSave={dataForm}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            next();
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
          dataFormSave={dataForm}
          dataReferences={dataReferences}
          onClickSendReferences={(data) => {
            handlerCallSetTypeFormReferences(data);
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
          dataForm={dataForm}
          onClickNext={() => {
            handlerCallGetTypeFormDocumentTenant(dataForm.idTypeForm, 1);
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
          frontFunctions={frontFunctions}
          dataNationalities={dataNationalities}
          dataIdTypes={dataIdTypes}
          dataFormSave={dataForm}
          dataDocuments={dataDocumentsEndorsement}
          onClickFinish={async (data) => {
            const { params } = match;
            const idSection = params.idSection;
            try {
              await handlerCallSetTypeFormTenant(data);
              if (isNil(idSection) === false) {
                history.push("/websystem/dashboard-admin");
              } else {
                history.push("/websystem/dashboard-tenant");
              }
            } catch (error) {}
          }}
          dataZipCatalog={dataZipCatalog}
          onChangeZipCode={(zipCode) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode });
          }}
          dataZipCodeAdress={dataZipCodeAdress}
          onClickBack={() => {
            prev();
            setDataZipCodeAdress({});
            setDataZipCatalog([]);
          }}
          typeDocument={2}
          dataMaritalStatus={dataMaritalStatus}
          dataMaritalRegime={dataMaritalRegime}
        />
      ),
      iconActive: Shield,
      iconInactive: ShieldInactive,
    },
  ];

  const handlerCallGetTypeFormTenant = async () => {
    const {
      idCustomerTenantTF,
      idCustomerTF,
      idCustomer,
      idContract,
      idSystemUser,
      idLoginHistory,
    } = dataProfile;
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
      setDataForm(responseResult1);
      setDataReferences(responseResult2);
      await handlerCallGetTypeFormDocumentTenant(responseResult1.idTypeForm, 1);
      await handlerCallGetTypeFormDocumentTenant(responseResult1.idTypeForm, 2);
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
  };

  useEffect(() => {
    const { params } = match;
    handlerCallAsyncApis();
    const idSection = params.idSection;
    if (isNil(idSection) === false) {
      setCurrent(Number(idSection));
    }
  }, []);

  return (
    <Content>
      <div className="margin-app-main">
        <div className="steps-style-header">
          <hr />
          {isEmpty(steps) === false &&
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
        {isEmpty(steps) === false && (
          <div className="steps-content">{steps[current].content}</div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormUser);
