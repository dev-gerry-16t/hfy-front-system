import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconPolicy,
  IconContract,
  IconPayments,
} from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";
import CustomViewDocument from "../../../components/CustomViewDocument";
import CustomSignatureContractV2 from "../../../components/customSignatureContractv2";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import SectionContractAvailable from "../component/sectionContractAvailableOwner";
import ComponentLoadSection from "../../../components/componentLoadSection";
import { GeneralCard } from "../constants/styleConstants";

const EmptyData = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
`;

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

const SectionDocuments = (props) => {
  const { callGlobalActionApi, dataProfile, onReportClose = () => {} } = props;
  const dataContexProperty = useContext(ContextProperty);
  const {
    dataDetail = {},
    getById,
    isOpenComponent,
    dataDetailDocuments = [],
  } = dataContexProperty;
  const { isInContract, idContract } = dataDetail;
  const documentsArray =
    isNil(dataDetailDocuments) === false &&
    isEmpty(dataDetailDocuments) === false
      ? dataDetailDocuments
      : [];
  const [isVisibleModalDocument, setIsVisibleModalDocument] = useState(false);
  const [isVisibleModalContract, setIsVisibleModalContract] = useState(false);
  const [isVisibleModalSignature, setIsVisibleModalSignature] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataDocument, setDataDocument] = useState({});
  let component = <></>;
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

  const handlerCallSetContract = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idContract,
        API_CONSTANTS.CUSTOMER.SET_CONTRACT,
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

  const handlerCallGenerateDocument = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idContract,
        API_CONSTANTS.CUSTOMER.GENERATE_DOCUMENT,
        "PUT"
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
      getById();
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    if (isNil(isOpenComponent) === false && isOpenComponent === 2) {
      setIsVisibleModalContract(true);
    }
  }, [isOpenComponent]);

  if (isEmpty(documentsArray) === false) {
    component = (
      <GeneralCard id="section-view-docments">
        <CustomViewDocument
          isVisibleModal={isVisibleModalDocument}
          dataDocument={dataDocument}
          onClose={() => {
            setIsVisibleModalDocument(false);
            setDataDocument({});
          }}
        />
        <SectionContractAvailable
          isModalVisible={isVisibleModalContract}
          onClose={() => {
            setIsVisibleModalContract(false);
            setDataDocument({});
            onReportClose();
          }}
          dataGetContract={{}}
          onAcceptContract={async (data) => {
            try {
              await handlerCallSetContract({ ...data, type: 1 });
            } catch (error) {
              throw error;
            }
          }}
          dataProfile={dataProfile}
        />
        <CustomSignatureContractV2
          isModalVisible={isVisibleModalSignature}
          name={dataProfile.fullName}
          onSignContract={async (data) => {
            try {
              await handlerCallSetContract({
                ...data,
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
            } catch (error) {
              throw error;
            }
          }}
          titleSectionSignature={`Firma de ${dataDocument.documentType}`}
          componentTerms={
            <span
              style={{
                marginLeft: 5,
                textAlign: "center",
                fontSize: 10,
                color: "black",
                marginBottom: 10,
              }}
            >
              Acepto los términos publicados en la pagina{" "}
              <a
                href="https://www.homify.ai/aviso-de-privacidad"
                target="__blank"
              >
                https://www.homify.ai/aviso-de-privacidad
              </a>{" "}
              así como lo descrito en el contrato
            </span>
          }
          onClose={() => {
            setIsVisibleModalSignature(false);
            setDataDocument({});
          }}
        />
        <div className="header-title">
          <h1>Documentos</h1>
          {isInContract == true && (
            <button
              onClick={() => {
                setIsVisibleModalContract(true);
              }}
            >
              Modalidad de firma
            </button>
          )}
        </div>
        <ComponentLoadSection
          isLoadApi={isLoadApi}
          position="absolute"
          text="Generando..."
        >
          <div className="content-cards">
            {isEmpty(documentsArray) === false &&
              documentsArray.map((row) => {
                return (
                  <Card
                    colorDocument={
                      row.canSign == true ? "#eff0f6" : row.style.color
                    }
                  >
                    <div className="card-document">
                      <div className="top-info">
                        <div className="icon-info">
                          {handlerSelectIcon(row.style.icon, row.canSign)}
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
                                    idPreviousDocument: row.idPreviousDocument,
                                    idDocumentType: row.idDocumentType,
                                    bucketSource: row.bucketSource,
                                    previousBucketSource:
                                      row.previousBucketSource,
                                    canGenerateDocument:
                                      row.canGenerateDocument,
                                    type: row.type,
                                  });
                                setDataDocument({ ...row, url: response.url });
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
                              setIsVisibleModalSignature(true);
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
            {isEmpty(documentsArray) === true && (
              <EmptyData>
                <img
                  width="150"
                  src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
                  alt=""
                />
                <p>No hay Documentos disponibles</p>
              </EmptyData>
            )}
            {/* <Card>
            <div className="card-document">
              <div className="top-info">
                <div className="icon-info">
                  <IconPolicy backGround="#A0A3BD" color="#A0A3BD" size="34px" />
                </div>
                <div className="name-info">
                  <h3>Póliza jurídica</h3>
                  <span>Archivo listo para firmar</span>
                </div>
              </div>
              <div className="button-action">
                <ButtonDocument primary>Firmar</ButtonDocument>
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-document">
              <div className="top-info">
                <div className="icon-info">
                  <IconContract
                    backGround="#A0A3BD"
                    color="#A0A3BD"
                    size="34px"
                  />
                </div>
                <div className="name-info">
                  <h3>Contrato de arrendamiento</h3>
                  <span>Archivo listo para firmar</span>
                </div>
              </div>
              <div className="button-action">
                <ButtonDocument primary>Firmar</ButtonDocument>
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-document">
              <div className="top-info">
                <div className="icon-info">
                  <IconPayments
                    backGround="#A0A3BD"
                    color="#A0A3BD"
                    size="34px"
                  />
                </div>
                <div className="name-info">
                  <h3>Pagares</h3>
                  <span>Archivo listo para firmar</span>
                </div>
              </div>
              <div className="button-action">
                <ButtonDocument primary>Firmar</ButtonDocument>
              </div>
            </div>
          </Card> */}
          </div>
        </ComponentLoadSection>
      </GeneralCard>
    );
  } else {
    component = (
      <SectionContractAvailable
        isModalVisible={isVisibleModalContract}
        onClose={() => {
          setIsVisibleModalContract(false);
          setDataDocument({});
          onReportClose();
        }}
        dataGetContract={{}}
        onAcceptContract={async (data) => {
          try {
            await handlerCallSetContract({ ...data, type: 1 });
          } catch (error) {
            throw error;
          }
        }}
        dataProfile={dataProfile}
      />
    );
  }

  return component;
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionDocuments);
