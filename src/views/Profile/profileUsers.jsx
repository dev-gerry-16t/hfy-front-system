import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import FrontFunctions from "../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callAddDocument,
  callSetImageProfile,
} from "../../utils/actions/actions";
import ContextProfile from "./context/contextProfile";
import styled from "styled-components";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "./constants/styleConstants";
import { IconDelete, IconEditSquare, IconEye } from "../../assets/iconSvg";
import WidgetUploadDocument from "./widget/widgetUploadDocument";
import WidgetReferenceProfile from "./widget/widgetReferenceProfile";
import WidgetWorkInfoProfile from "./widget/widgetWorkInfoProfile";
import WidgetDataBankProfile from "./widget/widgetDataBankProfile";
import WidgetCurrentAddressProfile from "./widget/widgetCurrentAddressProfile";
import WidgetPersonalInfoProfile from "./widget/widgetPersonalInfoProfile";
import WidgetDataContactProfile from "./widget/widgetDataContactProfile";

const DetailProfileContent = styled.div`
  padding: 2em 3em;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  column-gap: 10px;
  .subtitle-card {
    margin: 0;
    color: var(--color-primary);
    font-weight: 700;
  }
  .card-header-profile {
    background: #ffffff;
    box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
    border-radius: 10px;
    .header-title-card-profile {
      display: flex;
      justify-content: space-between;
      padding: 0.8em 1em;
      h1 {
        margin: 0;
        color: var(--color-primary);
        font-weight: 700;
        font-size: 1em;
      }
      button {
        background: transparent;
        border: none;
        height: 25px;
        width: 25px;
      }
      border-bottom: 0.5px solid var(--color-primary);
    }
    .body-documents {
      max-height: 550px;
      overflow-y: scroll;
    }
    .body-card-profile {
      padding: 0.8em 1em;
      color: #4e4b66;
      .info-address-profile {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
      }
      .line-separate {
        border-bottom: 1px solid rgba(78, 75, 102, 0.3);
      }
      .label-strong {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
      }
      .info-work-person {
        margin: 1em 0px;
        display: flex;
        flex-direction: column;
        h3 {
          font-weight: 600;
        }
        span,
        u {
          margin-bottom: 10px;
        }
      }
      .name-user {
        margin: 2em 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(78, 75, 102, 0.3);
        padding: 0px 0px 10px 0px;
        h1 {
          font-size: 2em;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0px;
        }
        h2 {
          font-size: 1.5em;
          font-weight: 600;
          color: #4e4b66;
          margin: 0px;
        }
      }
    }
  }
  .column-grid-1 {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0px 1em;
  }
  .column-grid-2 {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0px 1em;
  }
  .column-grid-3 {
    padding: 0px 1em;
    .card-reference-profile {
      margin-top: 2em;
      display: flex;
      flex-direction: column;
      gap: 1em;
      align-items: center;
    }
  }
`;

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const ProfileUsers = (props) => {
  const {
    callGlobalActionApi,
    callAddDocument,
    callSetImageProfile,
    dataProfile,
    history,
  } = props;
  const [dataDocument, setDataDocument] = useState([]);
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});
  const [dataDetailReference, setDataDetailReference] = useState([]);
  const [dataEmail, setDataEmail] = useState([]);
  const [dataPhoneNumber, setDataPhoneNumber] = useState([]);
  const [dataTabs, setDataTabs] = useState([]);

  const frontFunctions = new FrontFunctions();

  const handlerCallGetCustomerDocument = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          identifier: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DOCUMENT
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocument(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerData = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DATA
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      const responseResultReference =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[3]) === false &&
        isEmpty(response.response[3]) === false
          ? response.response[3]
          : [];
      const responseResultPhoneNumber =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[1]) === false &&
        isEmpty(response.response[1]) === false
          ? response.response[1]
          : [];
      const responseResultEmail =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[2]) === false &&
        isEmpty(response.response[2]) === false
          ? response.response[2]
          : [];
      setDataCustomerDetail(responseResult);
      setDataDetailReference(responseResultReference);
      setDataPhoneNumber(responseResultPhoneNumber);
      setDataEmail(responseResultEmail);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerTabById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_TAB_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      let objectIdentifier = {};
      responseResult.forEach((element) => {
        objectIdentifier[`identifier-${element.identifier}`] =
          element.identifier;
      });
      setDataTabs(objectIdentifier);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerTabById();
    handlerCallGetCustomerData();
    handlerCallGetCustomerDocument();
  }, []);

  return (
    <Content>
      <ContextProfile.Provider
        value={{
          dataCustomerDetail,
          dataDetailReference,
          getById: () => {
            handlerCallGetCustomerData();
          },
        }}
      >
        <ContentForm>
          <div className="header-title">
            <h1>Detalle de perfil</h1>
          </div>
          <DetailProfileContent>
            <div className="column-grid-1">
              <WidgetPersonalInfoProfile
                history={history}
                dataProfile={dataProfile}
                identifier={
                  dataTabs["identifier-1"] ||
                  dataTabs["identifier-2"] ||
                  dataTabs["identifier-8"] ||
                  dataTabs["identifier-9"] ||
                  dataTabs["identifier-12"] ||
                  dataTabs["identifier-13"]
                }
              />
              {(dataTabs["identifier-1"] || dataTabs["identifier-2"]) && (
                <div className="card-header-profile">
                  <div className="header-title-card-profile">
                    <h1>Obligado Solidario</h1>
                    <button
                      onClick={() => {
                        const identifierMatch =
                          dataTabs["identifier-1"] || dataTabs["identifier-2"];
                        history.push(
                          `/websystem/edit-profile/${identifierMatch}`
                        );
                      }}
                    >
                      <IconEditSquare
                        color="var(--color-primary)"
                        size="21px"
                      />
                    </button>
                  </div>
                  <div className="body-card-profile">
                    <div className="label-strong">
                      <span>¿Tienes Obligado solidario?</span>
                      <strong
                        style={{
                          color: "var(--color-primary)",
                        }}
                      >
                        {dataCustomerDetail.hasBoundSolidarity == true
                          ? "Si"
                          : "No"}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {dataTabs["identifier-7"] && (
                <div className="card-header-profile">
                  <div className="header-title-card-profile">
                    <h1>Aval</h1>
                    <button
                      onClick={() => {
                        const identifierMatch = dataTabs["identifier-7"];
                        history.push(
                          `/websystem/edit-profile/${identifierMatch}`
                        );
                      }}
                    >
                      <IconEditSquare
                        color="var(--color-primary)"
                        size="21px"
                      />
                    </button>
                  </div>
                  <div className="body-card-profile">
                    <div className="label-strong">
                      <span>¿Cuentas con Aval?</span>
                      <strong
                        style={{
                          color: "var(--color-primary)",
                        }}
                      >
                        {dataCustomerDetail.hasEndorsement == true
                          ? "Si"
                          : "No"}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              <WidgetDataContactProfile
                dataEmail={dataEmail}
                dataPhoneNumber={dataPhoneNumber}
              />
            </div>
            <div className="column-grid-2">
              <WidgetCurrentAddressProfile
                identifier={
                  dataTabs["identifier-3"] || dataTabs["identifier-10"]
                }
                history={history}
              />
              <WidgetDataBankProfile
                identifier={
                  dataTabs["identifier-11"] || dataTabs["identifier-14"]
                }
                history={history}
              />
              <WidgetWorkInfoProfile
                identifier={
                  dataTabs["identifier-4"] || dataTabs["identifier-5"]
                }
                history={history}
                frontFunctions={frontFunctions}
              />
              {isEmpty(dataDocument) === false && (
                <div className="card-header-profile">
                  <div className="header-title-card-profile">
                    <h1>Documentos</h1>
                    <button></button>
                  </div>
                  <div className="body-card-profile body-documents">
                    <WidgetUploadDocument
                      handlerCallGetCustomerDocument={() => {
                        handlerCallGetCustomerDocument();
                      }}
                      dataDocument={dataDocument}
                      type={null}
                      detail={true}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="column-grid-3">
              <WidgetReferenceProfile identifier={dataTabs["identifier-6"]} />
            </div>
          </DetailProfileContent>
        </ContentForm>
      </ContextProfile.Provider>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callSetImageProfile: (file, data, id, callback) =>
    dispatch(callSetImageProfile(file, data, id, callback)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUsers);
