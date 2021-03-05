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
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardTenant = (props) => {
  const {
    history,
    tenantCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onOpenContract,
    dataCustomer,
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
        <span>Inquilinos</span>
        {isEmpty(dataCustomer) === false &&
          (dataCustomer.canInviteTendant === 1 ||
            dataCustomer.canInviteTendant === true) && (
            <div className="button_init_primary">
              <button
                type="button"
                onClick={() => {
                  onClickSendInvitation();
                }}
              >
                <span>Invitar Inquilino</span>
              </button>
            </div>
          )}
      </div>
      <div className="section-information-renters">
        {isEmpty(tenantCoincidences) === false &&
          finishCallApis === true &&
          tenantCoincidences.map((row) => {
            return (
              <div className="data-renter-info">
                <div className="box-info-user">
                  <div className="avatar-user">
                    {isNil(row.profileThumbnail) === false ? (
                      <Avatar size={50} src={row.profileThumbnail} />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                  </div>
                  <div className="info-user">
                    <strong>{row.shortName}</strong>
                    <Rate
                      style={{
                        fontSize: "15px",
                        position: "relative",
                        bottom: "5px",
                      }}
                      tooltips={[]}
                      onChange={() => {}}
                      value={row.ratingRate}
                    />
                    {row.canSignContract === true ? (
                      <div
                        className="status-payment-contract"
                        onClick={() => {
                          onOpenContract(row);
                        }}
                      >
                        <span>Contrato disponible</span>
                      </div>
                    ) : (
                      <div
                        className="status-payment"
                        style={{
                          background: row.customerStatusStyle,
                          opacity: "0.5",
                          color: "black",
                        }}
                      >
                        <span>{row.customerStatus}</span>
                      </div>
                    )}
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Próximo Pago:{" "}
                      <strong>{formatDate(row.nextPayment)}</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>{row.rentAmount}</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  {isNil(row.canSeeTenantDetail) === false &&
                    row.canSeeTenantDetail === true && (
                      <button
                        type="button"
                        onClick={() => {
                          history.push(
                            `/websystem/dashboard-owner/tenant/${row.idCustomerTenant}`
                          );
                        }}
                      >
                        <img src={IconArroRight} alt="arrow-right" width="15" />
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes inquilinos registrados</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardTenant;
