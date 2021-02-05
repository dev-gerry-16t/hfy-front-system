import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Skeleton } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { UserOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../../assets/icons/wallet.svg";
import IconActivity from "../../../assets/icons/activity.svg";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import IconMessages from "../../../assets/icons/ChatContract.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardOwner = (props) => {
  const {
    history,
    tenantCoincidences,
    finishCallApis,
    onClickSendInvitation,
  } = props;

  const formatDate = (date) => {
    let dateFormat = "";
    if (date !== "NA") {
      dateFormat = moment(date, "DD/MM/YYYY").format("DD MMMM YYYY");
    } else {
      dateFormat = date;
    }
    return dateFormat;
  };

  return (
    <div className="renter-card-information">
      <div className="title-cards flex-title-card">
        <span>Propietarios</span>
      </div>
      <div className="section-information-renters">
        <div className="data-renter-info">
          <div className="box-info-user">
            <div className="avatar-user">
              <Avatar size={50} icon={<UserOutlined />} />
            </div>
            <div className="info-user">
              <strong>Juan Carlos Gutierrez</strong>
              <Rate
                style={{
                  fontSize: "15px",
                  position: "relative",
                  bottom: "5px",
                }}
                tooltips={[]}
                onChange={() => {}}
                value={5}
              />
              <div className="status-payment">
                <span>Cerrado</span>
              </div>
            </div>
            <div className="info-user-payment">
              <div>
                Vencimiento de contrato: <strong>25 enero 2022</strong>
              </div>
              <div>
                Poliza: <strong>Renta Segura</strong>
              </div>
              <div>
                Comisión 35%: <strong>$3,500.00</strong>
              </div>
            </div>
          </div>
          <div className="button-collapse">
            <button type="button" onClick={() => {}}>
              <img src={IconMessages} alt="arrow-right" width="20" />
            </button>
          </div>
        </div>
        <div className="data-renter-info">
          <div className="box-info-user">
            <div className="avatar-user">
              <Avatar size={50} icon={<UserOutlined />} />
            </div>
            <div className="info-user">
              <strong>Alberto Hernandez</strong>
              <Rate
                style={{
                  fontSize: "15px",
                  position: "relative",
                  bottom: "5px",
                }}
                tooltips={[]}
                onChange={() => {}}
                value={5}
              />
              <div className="status-payment">
                <span>Por cerrar</span>
              </div>
            </div>
            <div className="info-user-payment">
              <div>
                Vencimiento de contrato: <strong>3 Febrero 2021</strong>
              </div>
              <div>
                Poliza: <strong>PRO</strong>
              </div>
              <div>
                Comisión por renovación 10%: <strong>$1,500.00</strong>
              </div>
            </div>
          </div>
          <div className="button-collapse">
            <button type="button" onClick={() => {}}>
              <img src={IconMessages} alt="arrow-right" width="20" />
            </button>
          </div>
        </div>
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes propietarios</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardOwner;
