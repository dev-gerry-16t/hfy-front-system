import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import CustomStepsHomify from "../../components/customStepsHomifyV2";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "./constants/styleConstants";
import SectionIdentity from "./sections/sectionIdentity";
import SectionInfoOwner from "./sections/sectionInfoOwner";
import SectionAddress from "./sections/sectionAddress";
import SectionBankInfo from "./sections/sectionBankInfo";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  background: #f0f2f5;
  height: 100vh;
  @media screen and (max-width: 420px) {
    font-size: 12px;
    padding: 1em 5px;
  }
`;

let channel = null;

const infoTabsOwner = [
  { style: "fa fa-address-card-o", tab: "Identidad", identifier: 1 },
  { style: "fa fa-user-o", tab: "Información personal", identifier: 2 },
  { style: "fa fa-map-marker", tab: "Domicilio actual", identifier: 3 },
  { style: "fa fa-university", tab: "Información bancaria", identifier: 4 },
];

const infoTabsTenant = [
  { style: "fa fa-address-card-o", tab: "Identidad", identifier: 1 },
  { style: "fa fa-user-o", tab: "Información personal", identifier: 2 },
  { style: "fa fa-map-marker", tab: "Domicilio actual", identifier: 3 },
];

const FormUsersContract = (props) => {
  const { match } = props;
  const { params } = match;

  const [dataConfigForm, setDataConfigForm] = useState({});
  const [current, setCurrent] = useState(0);
  const [dataTabs, setDataTabs] = useState([]);

  const handlerOnClickClose = () => {
    channel.postMessage("close_form_contract");
    channel.close();
  };

  useEffect(() => {
    const channelName = "form_users_contract";
    channel = new BroadcastChannel(channelName);
    if (params.idCustomerType === "2") {
      setDataTabs(infoTabsOwner);
    }
    if (params.idCustomerType === "1") {
      setDataTabs(infoTabsTenant);
    }
  }, []);

  return (
    <Content>
      <CustomStepsHomify
        steps={dataTabs}
        onClick={(ix, record) => {
          setCurrent(ix);
        }}
        callBackFind={(record) => {
          setDataConfigForm(record);
        }}
        current={current}
      />
      {dataConfigForm.identifier === 1 && (
        <SectionIdentity
          onClickNext={() => {
            setCurrent(current + 1);
          }}
        />
      )}
      {dataConfigForm.identifier === 2 && (
        <SectionInfoOwner
          onClickBack={() => {
            setCurrent(current - 1);
          }}
          onClickNext={() => {
            setCurrent(current + 1);
          }}
        />
      )}
      {dataConfigForm.identifier === 3 && (
        <SectionAddress
          onClickBack={() => {
            setCurrent(current - 1);
          }}
          onClickNext={() => {
            setCurrent(current + 1);
          }}
        />
      )}
      {dataConfigForm.identifier === 4 && (
        <SectionBankInfo
          onClickBack={() => {
            setCurrent(current - 1);
          }}
          onClickNext={() => {
            handlerOnClickClose();
          }}
        />
      )}
    </Content>
  );
};

export default FormUsersContract;
