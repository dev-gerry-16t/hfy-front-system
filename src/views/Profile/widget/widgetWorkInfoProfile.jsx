import React, { useContext } from "react";
import isNil from "lodash/isNil";
import ContextProfile from "../context/contextProfile";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";

const WidgetWorkInfoProfile = (props) => {
  const { identifier, history } = props;
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;
  const {
    companyName,
    idOccupationActivity,
    bossName,
    bossEmailAddress,
    bossPhoneNumber,
    hasCar,
  } = dataCustomerDetail;
  let component = <div />;

  if (isNil(identifier) === false) {
    component = (
      <div className="card-header-profile">
        <div className="header-title-card-profile">
          <h1>Información Socioeconómica</h1>
          <button
            onClick={() => {
              history.push(`/websystem/edit-profile/${identifier}`);
            }}
          >
            <IconEditSquare color="var(--color-primary)" size="21px" />
          </button>
        </div>
        <div className="body-card-profile">
          <div className="label-strong">
            <span>Empresa:</span>
            <strong>{companyName}</strong>
          </div>
          <div className="label-strong">
            <span>Puesto:</span>
            <strong>{idOccupationActivity}</strong>
          </div>
          <div className="line-separate"></div>
          <div className="info-work-person">
            <h3>Jefe Directo</h3>
            <span>{bossName}</span>
            <u>{bossEmailAddress}</u>
            <span>{bossPhoneNumber}</span>
          </div>
          <div className="line-separate"></div>
          <div
            className="label-strong"
            style={{
              marginTop: "1em",
            }}
          >
            <span>Otros ingresos:</span>
            <strong
              style={{
                color: "var(--color-primary)",
              }}
            >
              x
            </strong>
          </div>
          <div className="line-separate"></div>
          <div
            className="label-strong"
            style={{
              marginTop: "1em",
            }}
          >
            <span>Auto</span>
            <strong
              style={{
                color: "var(--color-primary)",
              }}
            >
              {hasCar == true ? "Si" : "No"}
            </strong>
          </div>
        </div>
      </div>
    );
  }

  return component;
};

export default WidgetWorkInfoProfile;
