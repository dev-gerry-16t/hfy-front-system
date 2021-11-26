import React, { useContext } from "react";
import styled from "styled-components";
import ContextProfile from "../context/contextProfile";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";

const WidgetCurrentAddressProfile = () => {
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;
  const {
    street,
    streetNumber,
    suite,
    zipCode,
    isOwn,
    neighborhood,
    lessorFullName,
    lessorPhoneNumber,
    state,
    city,
  } = dataCustomerDetail;

  return (
    <div className="card-header-profile">
      <div className="header-title-card-profile">
        <h1>Dirección Actual</h1>
        <button>
          <IconEditSquare color="var(--color-primary)" size="21px" />
        </button>
      </div>
      <div className="body-card-profile">
        <div className="label-strong">
          <span>Propietario:</span>
          <strong
            style={{
              color: "var(--color-primary)",
            }}
          >
            {isOwn == true ? "Si" : "No"}
          </strong>
        </div>
        <div className="label-strong">
          <span>Arrendador:</span>
          <strong>{lessorFullName}</strong>
        </div>
        <div className="label-strong">
          <span>Teléfono Arrendador:</span>
          <strong>{lessorPhoneNumber}</strong>
        </div>
        <div className="info-address-profile">
          <div>
            <span>Calle: </span>
            <strong>{street}</strong>
          </div>
          <div>
            <span>Colonia: </span>
            <strong>{neighborhood}</strong>
          </div>
        </div>
        <div className="info-address-profile">
          <div>
            <span>No. Ext: </span>
            <strong>{streetNumber}</strong>
          </div>
          <div>
            <span>No. Int: </span>
            <strong>{suite}</strong>
          </div>
          <div>
            <span>C.P: </span>
            <strong>{zipCode}</strong>
          </div>
        </div>
        <div className="info-address-profile">
          <div>
            <span>Estado: </span>
            <strong>{state}X</strong>
          </div>
        </div>
        <div className="info-address-profile">
          <div>
            <span>Municipio: </span>
            <strong>{city}X</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetCurrentAddressProfile;
