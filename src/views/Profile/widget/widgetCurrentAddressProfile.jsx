import React, { useContext } from "react";
import isNil from "lodash/isNil";
import styled from "styled-components";
import ContextProfile from "../context/contextProfile";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";

const WidgetCurrentAddressProfile = (props) => {
  const { identifier, history } = props;
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
    municipality,
  } = dataCustomerDetail;
  let component = <div />;

  if (isNil(identifier) === false) {
    component = (
      <div className="card-header-profile">
        <div className="header-title-card-profile">
          <h1>Dirección Actual</h1>
          <button
            onClick={() => {
              history.push(`/websystem/edit-profile/${identifier}`);
            }}
          >
            <IconEditSquare color="var(--color-primary)" size="21px" />
          </button>
        </div>
        <div className="body-card-profile">
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
              <strong>{state}</strong>
            </div>
          </div>
          <div className="info-address-profile">
            <div>
              <span>Municipio: </span>
              <strong>{municipality}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return component;
};

export default WidgetCurrentAddressProfile;
