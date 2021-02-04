import React, { useEffect, useState, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Steps, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
import {
  callGetTypeFormDocumentTenant,
  callGetAllBankCatalog,
  callSetTypeFormOwner,
  callGetTypeFormOwner,
  callGetMaritalStatus,
  callGetZipCodeAdress,
  callGetPropertyTypes,
  callGetPolicies,
} from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import SectionBankInfo from "./sections/sectionBankInfo";
import "moment/locale/es";

const { Step } = Steps;
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
  } = props;
  const frontFunctions = new FrontFunctions();
  const [current, setCurrent] = React.useState(0);
  const [dataForm, setDataForm] = useState({});
  const [dataBank, setDataBank] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataDocuments, setDataDocuments] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handlerCallSetTypeFormTenant = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callSetTypeFormOwner({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
    } catch (error) {}
  };

  const handlerCallGetTypeFormDocument = async (id, type) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTypeFormDocumentTenant({
        idCustomer,
        idCustomerTenant: null,
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

      setDataDocuments(responseResult);
    } catch (error) {}
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
    } catch (error) {}
  };

  const stepsOwner = [
    {
      title: "Información personal",
      content: (
        <SectionInfoOwner
          dataMaritalStatus={dataMaritalStatus}
          dataFormSave={dataForm}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            setDataZipCodeAdress({});
            setDataZipCatalog([]);
            next();
          }}
          onChangeZipCode={(zipCode) => {
            hanlderCallGetZipCodeAdress({ type: 1, zipCode });
          }}
          dataZipCodeAdress={dataZipCodeAdress}
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
          frontFunctions={frontFunctions}
          dataFormSave={dataForm}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            setDataZipCodeAdress({});
            setDataZipCatalog([]);
            next();
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
      title: "Poliza",
      content: (
        <TypePolicy
          dataFormSave={dataForm}
          dataPolicies={dataPolicies}
          dataDocuments={dataDocuments}
          typeDocument={3}
          onClickNext={(data) => {
            handlerCallSetTypeFormTenant(data);
            setDataForm({ ...dataForm, ...data });
            next();
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
          dataFormSave={dataForm}
          dataBank={dataBank}
          onClickFinish={(data) => {
            handlerCallSetTypeFormTenant(data);
            history.push("/websystem/dashboard-owner");
          }}
          onClickBack={() => prev()}
        />
      ),
      iconActive: Wallet,
      iconInactive: WalletInactive,
    },
  ];

  const handlerCallGetTypeFormTenant = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTypeFormOwner({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataForm(responseResult);
      handlerCallGetTypeFormDocument(responseResult.idTypeForm, 3);
    } catch (error) {}
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
    } catch (error) {}
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
          : {};
      setDataPropertyTypes(responseResult);
    } catch (error) {}
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
    } catch (error) {}
  };

  const handlerCallBankCatalog = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllBankCatalog({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataBank(responseResult);
    } catch (error) {}
  };

  const handlerCallAsyncApis = async () => {
    await handlerCallGetTypeFormTenant();
    await handlerCallGetMaritalStatus();
    await handlerCallGetPropertyTypes();
    await handlerCallGetPolicies();
    await handlerCallBankCatalog();
  };

  useEffect(() => {
    handlerCallAsyncApis();
  }, []);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormOwner);
