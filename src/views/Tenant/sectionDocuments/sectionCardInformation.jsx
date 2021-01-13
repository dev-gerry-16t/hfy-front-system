import React from "react";
import moment from "moment";
import "moment/locale/es";
import { Avatar, Rate, Tooltip } from "antd";
moment.locale("es");

const SectionInfoTenant = (props) => {
  const { dataTenant } = props;

  const formatDate = (date) => {
    const dateFormat = moment(date, "DD/MM/YYYY").format("DD MMM YY");
    return dateFormat;
  };
  return (
    <div className="top-info-tenant">
      <div className="card-info-tenant" style={{ position: "relative" }}>
        <div className="avatar-user">
          <Avatar
            size={70}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </div>
        <div className="info-tenant">
          <div className="info-user">
            <strong>{dataTenant.fullName}</strong>
            <Rate
              style={{
                fontSize: "20px",
                position: "relative",
                bottom: "5px",
              }}
              tooltips={[]}
              onChange={() => {}}
              value={dataTenant.ratingRate}
            />
          </div>
          <div className="data-contact">
            Telefrono: {dataTenant.phoneNumber}
            <br />
            Email: {dataTenant.emailAddress}
          </div>
          <div className="status-tenant">
            <div className="status-payment">
              <span style={{ textTransform: "uppercase" }}>
                {dataTenant.customerStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-data-tenant">
        <div className="info-property-tenant">
          <div>
            <span>Propiedad:</span>
            <span>Departamento:</span>
            <span>Próximo Pago:</span>
            <span>Monto de Renta:</span>
          </div>
          <div>
            <Tooltip title={dataTenant.tooltipAddress}>
              <strong>{dataTenant.propertyAddress}</strong>
            </Tooltip>
            <strong>A210</strong>
            <strong>{formatDate(dataTenant.nextPaymentAt)}</strong>
            <strong>{dataTenant.currentRent}</strong>
          </div>
        </div>
        <div className="info-property-tenant">
          <div>
            <span>Incidencias:</span>
            <span>Reparaciones:</span>
            <span>Inicio de contrato:</span>
            <span>Fin de contrato:</span>
          </div>
          <div>
            <strong>{dataTenant.totalIncidences}</strong>
            <strong>{dataTenant.totalFixes}</strong>
            <strong>{formatDate(dataTenant.startedAt)}</strong>
            <strong>{formatDate(dataTenant.expireAt)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInfoTenant;
