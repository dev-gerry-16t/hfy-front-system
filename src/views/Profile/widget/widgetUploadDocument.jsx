import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { Row, Col, Modal } from "antd";
import Magnifier from "react-magnifier";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callAddDocument,
} from "../../../utils/actions/actions";
import { ReactComponent as IconActivity } from "../../../assets/iconSvg/svgFile/iconActivity.svg";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";
import ContextProfile from "../context/contextProfile";
import Arrow from "../../../assets/icons/Arrow.svg";

const UploadSection = styled.div`
  width: 18em;
  height: 8.8em;
  border: 1px dashed #a0a3bd;
  border-radius: 4px;
  background: #f7f7fc;
  position: relative;
  .upload-file {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 1em 0;
    cursor: pointer;
    span {
      font-size: 0.8em;
      color: #a0a3bd;
      text-align: center;
      font-weight: 700;
    }
  }
  .content-file-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    background: #fff;
    height: 100%;
    margin: 0px auto;
    font-size: 3em;
    color: var(--color-primary);
    img {
      width: 2.4em;
      height: 2.9em;
      object-fit: cover;
    }
  }
  .content-buttons-file {
    position: absolute;
    bottom: 1em;
    right: 1em;
    display: none;
  }
  &:hover {
    .content-buttons-file {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    .content-buttons-file {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 320px) {
    .content-file-preview {
      img {
        width: 100%;
      }
    }
  }
`;

const ButtonFiles = styled.button`
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
  background: rgba(214, 216, 231, 0.64);
  border: none;
  margin-right: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentFile = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0px;
  @media screen and (max-width: 320px) {
    width: 100%;
    font-size: 12px;
  }
`;

const WidgetUploadDocument = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    callAddDocument,
    handlerCallGetCustomerDocument,
    dataDocument,
    detail = false,
    type,
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dataPreviewDocument, setDataPreviewDocument] = useState({});
  const dataContexProfile = useContext(ContextProfile);
  const { idCustomerOwner = null } = dataContexProfile;

  const frontFunctions = new FrontFunctions();

  const handlerCallDeactivateCustomerDocument = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.DEACTIVATE_CUSTOMER_DOCUMENT,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      handlerCallGetCustomerDocument();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAddCustomerDocument = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
        API_CONSTANTS.CUSTOMER.ADD_CUSTOMER_DOCUMENT,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      handlerCallGetCustomerDocument();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerAddDocument = async (data, infoDoc) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    const dataDocument = {
      documentName: data.name,
      extension: data.type,
      preview: null,
      thumbnail: null,
      idDocumentType: infoDoc.idDocumentType,
      idCustomer:
        isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
      idSystemUser,
      idLoginHistory,
    };
    try {
      const response = await callAddDocument(
        data,
        dataDocument,
        (percent) => {}
      );
      const documentId =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.idDocument) === false
          ? response.response.idDocument
          : null;
      await handlerCallAddCustomerDocument({
        idDocument: documentId,
        type,
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  return (
    <div className="type-property">
      <Modal
        visible={previewVisible}
        title={
          <div className="form-modal">
            <div className="title-head-modal">
              <button
                className="arrow-back-to"
                type="button"
                onClick={() => {
                  setPreviewVisible(!previewVisible);
                  setDataPreviewDocument({});
                }}
              >
                <img src={Arrow} alt="backTo" width="30" />
              </button>
              <h1>
                {isEmpty(dataPreviewDocument) === false &&
                  dataPreviewDocument.documentType}
              </h1>
            </div>
          </div>
        }
        closable={false}
        footer={null}
        style={{ top: "20px" }}
      >
        {isNil(dataPreviewDocument.extension) === true ||
        dataPreviewDocument.extension === "docx" ||
        dataPreviewDocument.extension === "pdf" ? (
          <div style={{ textAlign: "center" }}>
            <iframe
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
              className="iframe-docx-hfy"
              src={`https://docs.google.com/gview?url=${ENVIROMENT}/api/viewFile/${dataPreviewDocument.idDocument}/${dataPreviewDocument.bucketSource}&embedded=true`}
            ></iframe>
          </div>
        ) : (
          <Magnifier
            src={`${ENVIROMENT}/api/viewFile/${dataPreviewDocument.idDocument}/${dataPreviewDocument.bucketSource}`}
          />
        )}
      </Modal>
      {detail === false && (
        <Row>
          {isEmpty(dataDocument) === false &&
            dataDocument.map((row, ix) => {
              return (
                <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                  <ContentFile>
                    <UploadSection>
                      {isNil(row.idDocument) === true && (
                        <>
                          <label className="upload-file" for={`id-file-${ix}`}>
                            <IconActivity
                              width="55px"
                              height="55px"
                              stroke="#A0A3BD"
                            />
                            <span>{row.documentType}</span>
                          </label>
                          <input
                            id={`id-file-${ix}`}
                            accept="image/*,.pdf,.docx"
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => {
                              const fileIndex = e.target.files[0];
                              handlerAddDocument(fileIndex, row);
                            }}
                          />
                        </>
                      )}
                      {isNil(row.idDocument) === false && (
                        <div className="content-file-preview">
                          {row.extension === "jpg" && (
                            <img
                              src={`${ENVIROMENT}/api/viewFile/${row.idDocument}/${row.bucketSource}/${row.extension}`}
                              alt="preview"
                            />
                          )}
                          {row.extension === "pdf" && (
                            <i className="fa fa-file-pdf-o" />
                          )}
                          {row.extension === "docx" && (
                            <i className="fa fa-file-word-o" />
                          )}
                        </div>
                      )}
                      {isNil(row.idDocument) === false && (
                        <div className="content-buttons-file">
                          <ButtonFiles
                            onClick={() => {
                              setPreviewVisible(!previewVisible);
                              setDataPreviewDocument(row);
                            }}
                          >
                            <IconEye color="var(--color-primary)" />
                          </ButtonFiles>
                          <ButtonFiles
                            onClick={async () => {
                              try {
                                await handlerCallDeactivateCustomerDocument(
                                  {
                                    bucketSource: row.bucketSource,
                                  },
                                  row.idDocument
                                );
                              } catch (error) {}
                            }}
                          >
                            <IconDelete color="var(--color-primary)" />
                          </ButtonFiles>
                        </div>
                      )}
                    </UploadSection>
                  </ContentFile>
                </Col>
              );
            })}
        </Row>
      )}
      {detail === true && (
        <Row>
          {isEmpty(dataDocument) === false &&
            dataDocument.map((row, ix) => {
              return (
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <ContentFile>
                    <UploadSection>
                      {isNil(row.idDocument) === true && (
                        <>
                          <label className="upload-file" for={`id-file-${ix}`}>
                            <IconActivity
                              width="55px"
                              height="55px"
                              stroke="#A0A3BD"
                            />
                            <span>{row.documentType}</span>
                          </label>
                          <input
                            id={`id-file-${ix}`}
                            accept="image/*,.pdf,.docx"
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => {
                              const fileIndex = e.target.files[0];
                              handlerAddDocument(fileIndex, row);
                            }}
                          />
                        </>
                      )}
                      {isNil(row.idDocument) === false && (
                        <div className="content-file-preview">
                          {row.extension === "jpg" && (
                            <img
                              src={`${ENVIROMENT}/api/viewFile/${row.idDocument}/${row.bucketSource}/${row.extension}`}
                              alt="preview"
                            />
                          )}
                          {row.extension === "pdf" && (
                            <i className="fa fa-file-pdf-o" />
                          )}
                          {row.extension === "docx" && (
                            <i className="fa fa-file-word-o" />
                          )}
                        </div>
                      )}
                      {isNil(row.idDocument) === false && (
                        <div className="content-buttons-file">
                          <ButtonFiles
                            onClick={() => {
                              setPreviewVisible(!previewVisible);
                              setDataPreviewDocument(row);
                            }}
                          >
                            <IconEye color="var(--color-primary)" />
                          </ButtonFiles>
                          <ButtonFiles
                            onClick={async () => {
                              try {
                                await handlerCallDeactivateCustomerDocument(
                                  {
                                    bucketSource: row.bucketSource,
                                  },
                                  row.idDocument
                                );
                              } catch (error) {}
                            }}
                          >
                            <IconDelete color="var(--color-primary)" />
                          </ButtonFiles>
                        </div>
                      )}
                    </UploadSection>
                  </ContentFile>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "1em",
                      marginBottom: "10px",
                      color: "#A0A3BD",
                      fontWeight: "600",
                    }}
                  >
                    {row.documentType}
                  </div>
                  <div className="line-separate"></div>
                </Col>
              );
            })}
        </Row>
      )}
    </div>
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
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetUploadDocument);
