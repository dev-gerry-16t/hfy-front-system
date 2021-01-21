import React, { useEffect, useState, useRef } from "react";
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
import SectionBankInfo from "./sections/sectionBankInfo";

const { Step } = Steps;
const { Content } = Layout;

const TypeFormUser = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Información personal",
      content: <SectionInfoUser onClickNext={() => next()} />,
      iconActive: IconProfile,
      iconInactive: IconProfileInactive,
    },
    {
      title: "Dirección actual",
      content: (
        <SectionCurrentAddress
          onClickNext={() => next()}
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
          onClickNext={() => next()}
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
          onClickNext={() => next()}
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
          onClickNext={() => next()}
          onClickBack={() => prev()}
        />
      ),
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Información aval",
      content: (
        <SectionInfoAval onClickFinish={() => {}} onClickBack={() => prev()} />
      ),
      iconActive: Shield,
      iconInactive: ShieldInactive,
    },
  ];

  const stepsOwner = [
    {
      title: "Información personal",
      content: <SectionInfoOwner onClickNext={() => next()} />,
      iconActive: IconProfile,
      iconInactive: IconProfileInactive,
    },
    {
      title: "Inmueble a rentar",
      content: (
        <CurrentAddressRenter
          onClickNext={() => next()}
          onClickBack={() => prev()}
        />
      ),
      iconActive: HomeActive,
      iconInactive: HomeInactive,
    },
    {
      title: "Poliza",
      content: (
        <TypePolicy onClickNext={() => next()} onClickBack={() => prev()} />
      ),
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Datos bancarios",
      content: (
        <SectionBankInfo onClickFinish={() => {}} onClickBack={() => prev()} />
      ),
      iconActive: Wallet,
      iconInactive: WalletInactive,
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="steps-style-header">
          <hr />
          {stepsOwner.map((row, index) => {
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
                    src={current === index ? row.iconActive : row.iconInactive}
                    alt=""
                  />
                </div>
                <span
                  style={{
                    visibility: current !== index ? "visible" : "hidden",
                    color: "#d6d8e7",
                  }}
                >
                  {row.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="steps-content">{stepsOwner[current].content}</div>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TypeFormUser);
