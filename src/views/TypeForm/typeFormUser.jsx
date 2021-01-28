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
import {
  callGetTypeFormTenant,
  callSetTypeFormTenant,
  callGetTypeFormDocumentTenant,
} from "../../utils/actions/actions";

const { Step } = Steps;
const { Content } = Layout;

const TypeFormUser = (props) => {
  const {
    dataProfile,
    callGetTypeFormTenant,
    callSetTypeFormTenant,
    callGetTypeFormDocumentTenant,
  } = props;
  const [current, setCurrent] = React.useState(0);
  const [dataForm, setDataForm] = useState({});
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
      const response = await callSetTypeFormTenant({
        idCustomer,
        idCustomerTenant: idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      console.log("response", response);
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
    } catch (error) {}
  };

  const steps = [
    {
      title: "Información personal",
      content: (
        <SectionInfoUser
          dataFormSave={dataForm}
          onClickNext={(data) => {
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
            setDataForm({ ...dataForm, ...data });
            next();
          }}
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
            setDataForm({ ...dataForm, ...data });
            next();
          }}
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
          onClickNext={() => {
            next();
          }}
          onClickBack={() => prev()}
          dataDocuments={dataDocuments}
        />
      ),
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Información aval",
      content: (
        <SectionInfoAval
          onClickFinish={() => {
            console.log("click", dataForm);
            handlerCallSetTypeFormTenant(dataForm);
          }}
          onClickBack={() => prev()}
        />
      ),
      iconActive: Shield,
      iconInactive: ShieldInactive,
    },
  ];

  const handlerCallGetTypeFormDocumentTenant = async (id) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTypeFormDocumentTenant({
        idCustomer,
        idCustomerTenant: idCustomer,
        idSystemUser,
        idLoginHistory,
        idTypeForm: id,
        type: 1,
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

  const handlerCallGetTypeFormTenant = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTypeFormTenant({
        idCustomer,
        idCustomerTenant: idCustomer,
        idSystemUser,
        idLoginHistory,
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
      await handlerCallGetTypeFormDocumentTenant(responseResult1.idTypeForm);
    } catch (error) {}
  };

  const handlerCallAsyncApis = async () => {
    await handlerCallGetTypeFormTenant();
  };

  useEffect(() => {
    handlerCallAsyncApis();
  }, []);
  console.log("click", dataForm);

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
  callGetTypeFormDocumentTenant: (data) =>
    dispatch(callGetTypeFormDocumentTenant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormUser);
