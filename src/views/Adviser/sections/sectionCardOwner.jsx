import React from "react";
import { Avatar, Rate, Skeleton, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { UserOutlined } from "@ant-design/icons";
import IconMessages from "../../../assets/icons/ChatContract.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";

moment.locale("es");

const SectionCardOwner = (props) => {
  const { tenantCoincidences, finishCallApis } = props;

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

  return (
    <div className="renter-card-information">
      <div className="title-cards flex-title-card">
        <span>Pólizas</span>
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
                    <strong>{row.fullName}</strong>
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
                      <span>{row.contractStatus}</span>
                    </div>
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Vencimiento de contrato: <strong>{row.expireAt}</strong>
                    </div>
                    <div>
                      Póliza: <strong>{row.policy}</strong>
                    </div>
                    <div>
                      {row.commissionType}:{" "}
                      <strong>{row.commissionAmount}</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  <button
                    type="button"
                    onClick={() => {
                      if (isNil(row.phoneNumber) === false) {
                        window.location.href = `https://api.whatsapp.com/send?phone=52${row.phoneNumber}`;
                      } else {
                        showMessageStatusApi(
                          "Aún no contamos con la información del contacto, intentalo mas tarde",
                          GLOBAL_CONSTANTS.STATUS_API.SUCCES
                        );
                      }
                    }}
                  >
                    <img src={IconMessages} alt="arrow-right" width="20" />
                  </button>
                </div>
              </div>
            );
          })}{" "}
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
