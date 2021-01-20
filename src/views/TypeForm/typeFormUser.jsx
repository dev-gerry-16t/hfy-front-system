import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Steps, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IconCalendar from "../../assets/icons/Calendar.svg";
import HomeActive from "../../assets/iconSteps/iconHome.svg";
import HomeInactive from "../../assets/iconSteps/iconHomeInactive.svg";
import IconProfile from "../../assets/iconSteps/Profile.svg";
import IconProfileInactive from "../../assets/iconSteps/ProfileInactive.svg";
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
      content: <SectionInfoUser />,
      iconActive: IconProfile,
      iconInactive: IconProfileInactive,
    },
    {
      title: "Dirección actual",
      content: <SectionCurrentAddress />,
      iconActive: HomeActive,
      iconInactive: HomeInactive,
    },
    {
      title: "Información laboral",
      content: <SectionCurrentWork />,
      iconActive: Work,
      iconInactive: WorkInactive,
    },
    {
      title: "Referencias",
      content: <SectionInfoReferences />,
      iconActive: Renter,
      iconInactive: RenterInactive,
    },
    {
      title: "Documentación",
      content: "Second-content",
      iconActive: DocumentIcon,
      iconInactive: DocumentIconInactive,
    },
    {
      title: "Información aval",
      content: "Last-content",
      iconActive: Shield,
      iconInactive: ShieldInactive,
    },
  ];
  return (
    <Content>
      <div className="margin-app-main">
        <div className="steps-style-header">
          <hr />
          {steps.map((row, index) => {
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
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
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
