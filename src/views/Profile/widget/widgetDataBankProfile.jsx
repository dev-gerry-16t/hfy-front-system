import React, { useContext } from "react";
import ContextProfile from "../context/contextProfile";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";

const WidgetDataBankProfile = () => {
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;
  const { accountHolder, clabeNumber, accountNumber, bankBranch } =
    dataCustomerDetail;
  return (
    <div className="card-header-profile">
      <div className="header-title-card-profile">
        <h1>Datos Bancarios</h1>
        <button>
          <IconEditSquare color="var(--color-primary)" size="21px" />
        </button>
      </div>
      <div className="body-card-profile">
        <div className="label-strong">
          <span>Titular:</span>
          <strong>{accountHolder}</strong>
        </div>
        <div className="label-strong">
          <span>CLABE:</span>
          <strong>{clabeNumber}</strong>
        </div>
        <div className="label-strong">
          <span>Banco:</span>
          <strong>X</strong>
        </div>
        <div className="label-strong">
          <span>Cuenta:</span>
          <strong>{accountNumber}</strong>
        </div>
        <div className="label-strong">
          <span>Sucursal:</span>
          <strong>{bankBranch}</strong>
        </div>
      </div>
    </div>
  );
};

export default WidgetDataBankProfile;