import React, { useContext } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { Avatar, Row, Col } from "antd";
import styled from "styled-components";
import ContextProfile from "../context/contextProfile";
import ENVIROMENT from "../../../utils/constants/enviroments";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";

const AvatarUpload = styled.div`
  display: flex;
  justify-content: center;
`;

const WidgetPersonalInfoProfile = (props) => {
  const { dataProfile, identifier, history } = props;

  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;
  const {
    givenName,
    lastName,
    mothersMaidenName,
    dateOfBirth,
    taxId,
    citizenId,
    idTypeNumber,
    nationality,
  } = dataCustomerDetail;
  return (
    <div className="card-header-profile">
      <div
        className="header-title-card-profile"
        style={{
          border: "none",
        }}
      >
        <h1></h1>
        <button
          onClick={() => {
            history.push(`/websystem/edit-profile/${identifier}`);
          }}
        >
          <IconEditSquare color="var(--color-primary)" size="21px" />
        </button>
      </div>
      <div className="body-card-profile">
        <AvatarUpload>
          <div className="edit-profile-image">
            <Avatar
              size={150}
              src={`${ENVIROMENT}/api/viewFile/${dataProfile.idDocument}/${dataProfile.bucketSource}`}
            />
          </div>
        </AvatarUpload>
        <div className="name-user">
          <h1>{givenName}</h1>
          <h2>
            {lastName} {mothersMaidenName}
          </h2>
        </div>
        <div className="label-strong">
          <span>Nacimiento:</span>
          <strong>
            {isNil(dateOfBirth) === false
              ? moment(dateOfBirth, "YYYY-MM-DD").format("DD/MM/YYYY")
              : ""}
          </strong>
        </div>
        <div className="label-strong">
          <span>Nacionalidad:</span>
          <strong>{nationality}</strong>
        </div>
        <div className="label-strong">
          <span>CURP:</span>
          <strong>{citizenId}</strong>
        </div>
        <div className="label-strong">
          <span>RFC:</span>
          <strong>{taxId}</strong>
        </div>
        <div className="label-strong">
          <span>Clave de elector:</span>
          <strong>{idTypeNumber}</strong>
        </div>
      </div>
    </div>
  );
};

export default WidgetPersonalInfoProfile;
