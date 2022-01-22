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
  font-size: 16px;
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
  @media screen and (max-width: 640px) {
    font-size: 12px;
    .section-select-option {
      flex-direction: column;
      .option-select {
        span {
          font-size: 12px;
        }
      }
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
    h1 {
      text-align: center;
    }
  }
`;

const SectionCandidate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .edit-public-property {
    display: flex;
    justify-content: center;
    button {
      border: none;
      background: transparent;
      color: var(--color-primary);
      font-weight: 500;
    }
  }
  h1 {
    font-weight: bold;
    color: var(--color-primary);
  }
  .info-user-select {
    display: flex;
    gap: 2em;
    color: #4e4b66;
    margin-top: 3em;
    padding: 0px 10px;
    .score-user {
      position: absolute;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--color-primary);
      bottom: 10px;
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
  @media screen and (max-width: 640px) {
    .info-user-select {
      flex-direction: column;
      align-items: center;
      .content-info-public {
        font-size: 12px;
        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
`;

const SectionPublicProperty = (props) => {
  const { idUserType, callGlobalActionApi, dataProfile } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updateProperty, getById } = dataContexProperty;
  const {
    applicants,
    isPublished,
    infoTenant,
    idApartment,
    canInviteTenant,
    title,
    description,
    isOwner,
  } = dataDetail;

  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [visiblePublicProperty, setVisiblePublicProperty] = useState(false);
  const [detailPublicProperty, setDetailPublicProperty] = useState({});
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

  const handlerLimitText = (text) => {
    let textTransform = "";
    if (isNil(text) === false && isEmpty(text) === false) {
      const splitText = text.split(",");
      if (splitText.length >= 2) {
        textTransform = `${splitText[0]}, ${splitText[1]}`;
      }
    }
    return textTransform;
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
        detailPublicProperty={detailPublicProperty}
        onClose={() => {
          setVisiblePublicProperty(false);
          setDetailPublicProperty({});
        }}
        dataDetail={dataDetail}
      />

      {isNil(infoTenant) === true && isPublished === false && (
        <NoticeProperty>
          <h1>Ayuda a un inquilino a encontrar su nuevo hogar</h1>
          <div className="section-select-option">
            {isOwner === true && (
              <div className="option-select" id="public-property-add-post">
                <span>Quiero publicar el inmueble</span>
                <ButtonAction
                  onClick={() => {
                    setVisiblePublicProperty(true);
                  }}
                >
                  <IconSpeakChat size="51px" color="##4E4B66" />
                </ButtonAction>
              </div>
            )}
            {canInviteTenant === true && (
              <div className="option-select" id="public-property-add-candidate">
                <span>Ya tengo un candidato</span>
                <ButtonAction
                  onClick={() => {
                    setVisibleAddUser(true);
                  }}
                >
                  <IconAgreement size="51px" color="##4E4B66" />
                </ButtonAction>
              </div>
            )}
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
                <strong>{applicantsParse.score}</strong>
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
                <strong>Dirección:</strong>{" "}
                <span>{handlerLimitText(applicantsParse.fullAddress)}</span>
              </div>
              {/* <div className="status-user">
                Solicitud pendiente de aceptación
              </div> */}
            </div>
          </div>
        </SectionCandidate>
      )}
      {isPublished === true && isNil(infoTenant) === true && (
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
            <div className="content-info-public">
              <div className="info">
                <strong>Titulo:</strong> <span>{title}</span>
              </div>
              <div className="info">
                <strong>Descripción:</strong>

                <div
                  className="section-info-notification"
                  dangerouslySetInnerHTML={{
                    __html:
                      isNil(description) === false
                        ? description.replace(/\n/g, "<br />")
                        : "",
                  }}
                />
              </div>
              {isOwner === true && (
                <div className="edit-public-property">
                  <button
                    onClick={() => {
                      setVisiblePublicProperty(true);
                      setDetailPublicProperty({
                        title,
                        description,
                        isPublished,
                      });
                    }}
                  >
                    <u>Editar</u>
                  </button>
                </div>
              )}
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
