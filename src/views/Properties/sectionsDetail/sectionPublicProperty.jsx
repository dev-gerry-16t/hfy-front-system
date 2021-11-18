import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconBed,
  IconAgreement,
  IconSpeakChat,
  IconTenant,
} from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import ContextProperty from "../context/contextProperty";
import ComponentAddCandidate from "../component/componentAddCandidate";
import ComponentPublicProperty from "../component/componentPublicProperty";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";

const ContentPublicProperty = styled(Container)`
  margin-top: 1em;
  padding: 3em 0px;
`;

const ButtonAction = styled.button`
  border: none;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  width: 92.89px;
  height: 79.49px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeProperty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  h1 {
    font-weight: 600;
  }
  .section-select-option {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    gap: 4em;
    .option-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.8em;
        margin-bottom: 10px;
      }
    }
  }
`;

const SectionCandidate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    color: var(--color-primary);
  }
  .info-user-select {
    display: flex;
    gap: 2em;
    color: #4e4b66;
    margin-top: 3em;
    .score-user {
      position: absolute;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--color-primary);
      bottom: 40px;
      right: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
      color: #fff;
      span {
        font-weight: 300;
      }
    }
    .image-user {
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
    }
    .info {
      margin-bottom: 15px;
    }
    .status-user {
      margin-top: 10px;
      font-size: 0.8em;
      color: var(--color-primary);
    }
  }
`;

const SectionPublicProperty = (props) => {
  const { idUserType, callGlobalActionApi, dataProfile } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updateProperty, getById } = dataContexProperty;
  const { applicants, isPublished, infoTenant, idApartment } = dataDetail;
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [visiblePublicProperty, setVisiblePublicProperty] = useState(false);
  const applicantsParse =
    isNil(infoTenant) === false && isEmpty(infoTenant) === false
      ? JSON.parse(infoTenant)
      : {};
  const frontFunctions = new FrontFunctions();

  const handlerCallSendTenantInvitation = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idApartment,
        API_CONSTANTS.CUSTOMER.SEND_TENANT_INVITATION,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      getById();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <ContentPublicProperty id="public-property">
      <ComponentAddCandidate
        isModalVisible={visibleAddUser}
        sendInvitation={async (data) => {
          try {
            await handlerCallSendTenantInvitation(data);
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setVisibleAddUser(false);
        }}
      />
      <ComponentPublicProperty
        isModalVisible={visiblePublicProperty}
        onPublicProperty={async (data) => {
          try {
            await updateProperty({ ...data, idApartment });
            getById();
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setVisiblePublicProperty(false);
        }}
      />

      {isNil(applicants) === true &&
        isNil(infoTenant) === true &&
        isPublished === false && (
          <NoticeProperty>
            <h1>Ayuda a un inquilino a encontrar su nuevo hogar</h1>
            <div className="section-select-option">
              <div className="option-select">
                <span>Ya tengo un candidato</span>
                <ButtonAction
                  onClick={() => {
                    setVisibleAddUser(true);
                  }}
                >
                  <IconAgreement size="51px" color="##4E4B66" />
                </ButtonAction>
              </div>
              <div className="option-select">
                <span>Quiero publicar el inmueble</span>
                <ButtonAction
                  onClick={() => {
                    setVisiblePublicProperty(true);
                  }}
                >
                  <IconSpeakChat size="51px" color="##4E4B66" />
                </ButtonAction>
              </div>
            </div>
          </NoticeProperty>
        )}
      {isNil(infoTenant) === false && (
        <SectionCandidate>
          <h1>Datos de candidato</h1>
          <div className="info-user-select">
            <div
              style={{
                position: "relative",
              }}
            >
              <div className="image-user">
                <IconTenant size="100%" color="#4E4B66" />
              </div>
              <div className="score-user">
                <span>Score</span>
                <strong>4.3</strong>
              </div>
            </div>
            <div>
              <div className="info">
                <strong>Nombre:</strong> <span>{applicantsParse.fullName}</span>
              </div>
              <div className="info">
                <strong>Correo:</strong>{" "}
                <span>{applicantsParse.emailAddress}</span>
              </div>
              <div className="info">
                <strong>Teléfono:</strong>{" "}
                <span>{applicantsParse.phoneNumber}</span>
              </div>
              <div className="info">
                <strong>Dirección:</strong> <span>Nezahualcoyotl, MX</span>
              </div>
              <div className="info">
                <strong>Ocupación:</strong> <span>Arquitecto</span>
              </div>
              {/* <div className="status-user">
                Solicitud pendiente de aceptación
              </div> */}
            </div>
          </div>
        </SectionCandidate>
      )}
      {isPublished === true && (
        <SectionCandidate>
          <h1>Inmueble publicado en:</h1>
          <div className="info-user-select">
            <div className="app-list">
              <img
                width="100px"
                src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.png"
                alt="homify"
              />
            </div>
            <div>
              <div className="info">
                <strong>Titulo:</strong> <span>Zona el Mirador</span>
              </div>
              <div className="info">
                <strong>Descripcion:</strong> <span>El Marquez Queretaro</span>
              </div>
            </div>
          </div>
        </SectionCandidate>
      )}
    </ContentPublicProperty>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionPublicProperty);
