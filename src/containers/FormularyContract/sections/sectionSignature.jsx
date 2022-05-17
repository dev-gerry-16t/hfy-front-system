import React, { useEffect, useRef, useState, useContext } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isArray from "lodash/isArray";
import styled from "styled-components";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import ContextForm from "../context/contextForm";
import {
  IconPolicy,
  IconContract,
  IconPayments,
} from "../../../assets/iconSvg";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import CustomSignature from "../../../components/customSignature";
import ComponentLoadSection from "../../../components/componentLoadSection";
import CustomViewDocument from "../../../components/CustomViewDocument";
import CustomViewDocumentV3 from "../../../components/customViewDocumentV3";

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: ${(props) => props.colorDocument};
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        position: relative;
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const ContentDocuments = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const CodeQrSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .qr-code-section {
    padding: 1em;
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const SectionSignature = ({ callGlobalActionApi, dataProfile }) => {
  const [viewSignature, setViewSignature] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataDocument, setDataDocument] = useState({});
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [isVisibleModalDocument, setIsVisibleModalDocument] = useState(false);

  const dataContextForm = useContext(ContextForm);
  const { idRequest, idUserInRequest, dataFormSave } = dataContextForm;

  const frontFunctions = new FrontFunctions();

  const handlerSelectIcon = (key, sign) => {
    let component = null;
    const color = sign === true ? "#A0A3BD" : "#FFF";
    switch (key) {
      case "IconContract":
        component = (
          <IconContract backGround={color} color={color} size="34px" />
        );
        break;
      case "IconPolicy":
        component = <IconPolicy backGround={color} color={color} size="34px" />;
        break;
      case "IconPayments":
        component = (
          <IconPayments backGround={color} color={color} size="34px" />
        );
        break;

      default:
        component = (
          <IconContract backGround={color} color={color} size="34px" />
        );
        break;
    }
    return component;
  };

  const handlerCallGetRequestDocuments = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idRequest,
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_REQUEST_DOCUMENTS,
        "POST",
        false
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocuments(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGenerateDocument = async (data) => {
    try {
      const response = await callGlobalActionApi(
        {
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
          ...data,
        },
        idRequest,
        API_CONSTANTS.ANONYMOUS.GET_DOCUMENT_PROPERTIES,
        "PUT",
        false
      );
      const responseResultMessage =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      frontFunctions.showMessageStatusApi(
        responseResultMessage,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSignDocument = async (data) => {
    try {
      const response = await callGlobalActionApi(
        {
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
          ...data,
        },
        idRequest,
        API_CONSTANTS.ANONYMOUS.SIGN_DOCUMENT,
        "PUT",
        false
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
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  useEffect(() => {
    handlerCallGetRequestDocuments();
  }, []);

  return (
    <ContentForm>
      {/* <CustomViewDocument
        isVisibleModal={isVisibleModalDocument}
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModalDocument(false);
          setDataDocument({});
        }}
      /> */}
      <CustomViewDocumentV3
        isVisibleModal={isVisibleModalDocument}
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModalDocument(false);
          setDataDocument({});
        }}
        downloadDoc={true}
      />
      <CustomSignature
        fullName={`${dataFormSave.givenName} ${dataFormSave.lastName} ${dataFormSave.mothersMaidenName}`}
        documentName={dataDocument.documentType}
        isVisible={viewSignature}
        onClose={() => {
          setViewSignature(false);
          setDataDocument({});
        }}
        onSuccessSign={async (data) => {
          try {
            await handlerCallSignDocument({
              signature: data,
              type: dataDocument.type,
            });
            await handlerCallGenerateDocument({
              idDocument: dataDocument.idDocument,
              idPreviousDocument: dataDocument.idPreviousDocument,
              idDocumentType: dataDocument.idDocumentType,
              bucketSource: dataDocument.bucketSource,
              previousBucketSource: dataDocument.previousBucketSource,
              canGenerateDocument: dataDocument.canGenerateDocument,
              type: dataDocument.type,
            });
            handlerCallGetRequestDocuments();
            setViewSignature(false);
            setDataDocument({});
          } catch (error) {
            throw error;
          }
        }}
      />
      <div className="header-title">
        <h1>Firma de Documentos</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>
                Por favor revisa que tu información este correcta y firma, para
                este proceso es necesario utilizar un dispositivo móvil.
              </span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          {window.mobileCheck() === false && (
            <CodeQrSection>
              <div className="qr-code-section">
                <img
                  id="qr-code-hfy"
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&amp;size=200x200`}
                  alt=""
                  title="HELLO"
                  width="200"
                  height="200"
                />
              </div>
              <span>
                Escanea el Código QR para abrirlo desde tu dispositivo móvil
              </span>
            </CodeQrSection>
          )}
          {window.mobileCheck() === true && (
            <ComponentLoadSection
              isLoadApi={isLoadApi}
              position="absolute"
              text="Generando..."
            >
              <ContentDocuments>
                {isEmpty(dataDocuments) === false &&
                  dataDocuments.map((row) => {
                    const style =
                      isNil(row.style) === false && isEmpty(row.style) === false
                        ? JSON.parse(row.style)
                        : {};

                    return (
                      <Card
                        colorDocument={
                          row.canSign == true ? "#eff0f6" : style.color
                        }
                      >
                        <div className="card-document">
                          <div className="top-info">
                            <div className="icon-info">
                              {handlerSelectIcon(style.icon, row.canSign)}
                            </div>
                            <div className="name-info">
                              <h3>{row.documentType}</h3>
                              {row.canSign === true && (
                                <span>Archivo listo para firmar</span>
                              )}
                            </div>
                          </div>
                          <div className="button-action">
                            {row.canSeeDetail == true && (
                              <ButtonDocument
                                onClick={async () => {
                                  try {
                                    setIsLoadApi(true);
                                    const response =
                                      await handlerCallGenerateDocument({
                                        idDocument: row.idDocument,
                                        idPreviousDocument:
                                          row.idPreviousDocument,
                                        idDocumentType: row.idDocumentType,
                                        bucketSource: row.bucketSource,
                                        previousBucketSource:
                                          row.previousBucketSource,
                                        canGenerateDocument:
                                          row.canGenerateDocument,
                                        type: row.type,
                                      });
                                    setDataDocument({
                                      ...row,
                                      url: response.url,
                                      newBucketSorce: response.newBucketSorce,
                                      newIdDocument: response.newIdDocument,
                                    });
                                    setTimeout(() => {
                                      setIsLoadApi(false);
                                      setIsVisibleModalDocument(true);
                                    }, 4000);
                                  } catch (error) {
                                    setIsLoadApi(false);
                                  }
                                }}
                              >
                                Ver documento
                              </ButtonDocument>
                            )}
                            {row.canBeDownload == true && (
                              <ButtonDocument
                                onClick={async () => {
                                  window.open(
                                    `${ENVIROMENT}/api/viewFileDownload/${row.idDocument}/${row.bucketSource}/${row.extension}?name=${row.documentType}`,
                                    "_blank"
                                  );
                                }}
                              >
                                Descargar
                              </ButtonDocument>
                            )}
                            {row.canSign == true && (
                              <ButtonDocument
                                primary
                                onClick={() => {
                                  setDataDocument(row);
                                  setViewSignature(true);
                                }}
                              >
                                Firmar
                              </ButtonDocument>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </ContentDocuments>
            </ComponentLoadSection>
          )}
        </div>
      </FormProperty>
    </ContentForm>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionSignature);
