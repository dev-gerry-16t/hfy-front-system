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
import styled from "styled-components";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "./constants/styleConstants";
import { IconDelete, IconEditSquare, IconEye } from "../../assets/iconSvg";
import WidgetUploadDocument from "./widget/widgetUploadDocument";

const AvatarUpload = styled.div`
  display: flex;
  justify-content: center;
`;

const CardReference = styled.div`
  width: 290px;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  .header-buttons {
    display: flex;
    justify-content: right;
    padding: 10px;
  }
  .info-reference {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px 0.8em 0.8em 0.8em;
  }
`;

const ButtonHeader = styled.button`
  background: transparent;
  border: none;
`;

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
    .body-documents{
      max-height: 550px;
      overflow-y: scroll;
    }
    .body-card-profile {
      padding: 0.8em 1em;
      color: #4e4b66;
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
  } = props;
  const [dataDocument, setDataDocument] = useState([]);
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});
  const [dataDetailReference, setDataDetailReference] = useState([]);

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
      setDataCustomerDetail(responseResult);
      setDataDetailReference(responseResultReference);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerData();
    handlerCallGetCustomerDocument();
  }, []);

  return (
    <Content>
      <ContentForm>
        <div className="header-title">
          <h1>Detalle de perfil</h1>
        </div>
        <DetailProfileContent>
          <div className="column-grid-1">
            <div className="card-header-profile">
              <div
                className="header-title-card-profile"
                style={{
                  border: "none",
                }}
              >
                <h1></h1>
                <button>
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
                  <h1>Juan Ignacio</h1>
                  <h2>Covarrubias Ruiz</h2>
                </div>
                <div className="label-strong">
                  <span>Nacimiento:</span>
                  <strong>25/10/1985</strong>
                </div>
                <div className="label-strong">
                  <span>Nacionalidad:</span>
                  <strong>Mexicana</strong>
                </div>
                <div className="label-strong">
                  <span>CURP:</span>
                  <strong>GOJG931216HMCNMR01</strong>
                </div>
                <div className="label-strong">
                  <span>RFC:</span>
                  <strong>GOJG931216ML6</strong>
                </div>
                <div className="label-strong">
                  <span>Clave de elector:</span>
                  <strong>12345678978912</strong>
                </div>
              </div>
            </div>
            <div className="card-header-profile">
              <div className="header-title-card-profile">
                <h1>Obligado Solidario</h1>
                <button>
                  <IconEditSquare color="var(--color-primary)" size="21px" />
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
                    No
                  </strong>
                </div>
              </div>
            </div>
            <div className="card-header-profile">
              <div className="header-title-card-profile">
                <h1>Aval</h1>
                <button>
                  <IconEditSquare color="var(--color-primary)" size="21px" />
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
                    No
                  </strong>
                </div>
              </div>
            </div>
            <h1 className="subtitle-card">Datos de contacto</h1>
            <div></div>
          </div>
          <div className="column-grid-2">
            <div className="card-header-profile">
              <div className="header-title-card-profile">
                <h1>Dirección Actual</h1>
                <button>
                  <IconEditSquare color="var(--color-primary)" size="21px" />
                </button>
              </div>
              <div className="body-card-profile"></div>
            </div>
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
                  <strong>Francisco Perez Gutierrez</strong>
                </div>
                <div className="label-strong">
                  <span>CLABE:</span>
                  <strong>XXXXXXXXXXXXXXXXXX</strong>
                </div>
                <div className="label-strong">
                  <span>Banco:</span>
                  <strong>BBVA</strong>
                </div>
                <div className="label-strong">
                  <span>Cuenta:</span>
                  <strong>xxxxxx</strong>
                </div>
                <div className="label-strong">
                  <span>Sucursal:</span>
                  <strong>xxxxxx</strong>
                </div>
              </div>
            </div>
            <div className="card-header-profile">
              <div className="header-title-card-profile">
                <h1>Información Socioeconómica</h1>
                <button>
                  <IconEditSquare color="var(--color-primary)" size="21px" />
                </button>
              </div>
              <div className="body-card-profile">
                <div className="label-strong">
                  <span>Empresa:</span>
                  <strong>Grut Studio</strong>
                </div>
                <div className="label-strong">
                  <span>Puesto:</span>
                  <strong>Recursos Humanos</strong>
                </div>
                <div className="line-separate"></div>
                <div className="info-work-person">
                  <h3>Jefe Directo</h3>
                  <span>Ana Laura Paredes Tapia</span>
                  <u>analaupt@email.com</u>
                  <span>5562100512</span>
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
                    No
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
                    No
                  </strong>
                </div>
              </div>
            </div>
            <div className="card-header-profile">
              <div className="header-title-card-profile">
                <h1>Documentos</h1>
                <button>
                  <IconEditSquare color="var(--color-primary)" size="21px" />
                </button>
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
          </div>
          <div className="column-grid-3">
            <h1 className="subtitle-card">Referencias</h1>
            <div className="card-reference-profile">
              {isEmpty(dataDetailReference) === false &&
                dataDetailReference.map((row) => {
                  return (
                    <CardReference>
                      <div className="header-buttons">
                        <ButtonHeader
                          onClick={() => {
                            // setDataDefaultReference(row);
                            // setIsOpenAddReferences(true);
                          }}
                        >
                          <IconEditSquare
                            color="var(--color-primary)"
                            size="15px"
                          />
                        </ButtonHeader>
                        <ButtonHeader
                          onClick={async () => {
                            // try {
                            //   await handlerCallSetPersonalReference({
                            //     idPersonalReference: row.idPersonalReference,
                            //     isActive: false,
                            //   });
                            //   getById();
                            // } catch (error) {}
                          }}
                        >
                          <IconDelete
                            color="var(--color-primary)"
                            size="15px"
                          />
                        </ButtonHeader>
                      </div>
                      <div className="info-reference">
                        <strong>
                          {row.givenName} {row.lastName} {row.mothersMaidenName}
                        </strong>
                        <u>{row.emailAddress}</u>
                        <span>{row.phoneNumber}</span>
                      </div>
                    </CardReference>
                  );
                })}
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <ButtonNextBackPage
                block={false}
                onClick={() => {}}
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <u>{"Agregar referencia +"}</u>
                </div>
              </ButtonNextBackPage>
            </div>
          </div>
        </DetailProfileContent>
      </ContentForm>
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
