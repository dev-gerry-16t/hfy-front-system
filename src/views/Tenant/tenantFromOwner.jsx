import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Tabs,
  Pagination,
  Carousel,
  Select,
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import SectionDocuments from "./sectionDocuments/sectionDocuments";
import SectionInfoTenant from "./sectionDocuments/sectionCardInformation";
import SectionMessages from "./sectionDocuments/sectionMessages";
import SectionRegisterPayment from "./sectionDocuments/sectionRegisterPayment";
import { callGetAllCustomerTenantById } from "../../utils/actions/actions";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

const TenantFromOwner = (props) => {
  const { dataProfile, match, callGetAllCustomerTenantById } = props;
  const [dataTenant, setDataTenant] = useState([]);
  const dotChange = useRef(null);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const handlerCallGetAllCustomerTenantById = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerTenantById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataTenant(responseResult);
    } catch (error) {}
  };

  useEffect(() => {
    const { params } = match;
    handlerCallGetAllCustomerTenantById({
      idCustomerTenant: params.idCustomerTenant,
    });
  }, []);
  return (
    <Content>
      <div className="margin-app-main">
        <SectionInfoTenant dataTenant={dataTenant} />
        <div className="actions-information-tenant">
          <div className="tabs-tenant-information">
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              tabBarStyle={{ color: "#A0A3BD" }}
            >
              <TabPane tab="Registrar pago" key="1">
                <SectionRegisterPayment />
              </TabPane>
              <TabPane tab="Documentos" key="2">
                <SectionDocuments />
              </TabPane>
              <TabPane tab="Mensajes" key="3">
                <SectionMessages />
              </TabPane>
              <TabPane tab="Cotizar incidencia" key="4" />
            </Tabs>
          </div>
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

const mapDispatchToProps = (dispatch) => ({
  callGetAllCustomerTenantById: (data) =>
    dispatch(callGetAllCustomerTenantById(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TenantFromOwner);
