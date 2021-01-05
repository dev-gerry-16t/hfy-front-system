import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Skeleton } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { UserOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../../assets/icons/wallet.svg";
import IconActivity from "../../../assets/icons/activity.svg";
import IconArroRight from "../../../assets/icons/arrowRight.svg";

const SectionCardTenant = (props) => {
  const { history, tenantCoincidences, finishCallApis } = props;
  return (
    <div className="renter-card-information">
      <div className="title-cards">Inquilinos</div>
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
                    <div className="status-payment">
                      <span>{row.customerStatus}</span>
                    </div>
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Próximo Pago: <strong>{row.nextPayment}</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>{row.rentAmount}</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  {isNil(row.idCustomer) === false && (
                    <button
                      type="button"
                      onClick={() => {
                        history.push(
                          `/websystem/dashboard-owner/tenant/${row.idCustomer}`
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

        {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
          <div>Sin Inquilinos</div>
        )}
        {finishCallApis === false && <Skeleton loading active />}
      </div>
    </div>
  );
};

export default SectionCardTenant;
