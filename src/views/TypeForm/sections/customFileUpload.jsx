import React, { useState } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import Magnifier from "react-magnifier";
import { Modal, Spin, Upload, message, Progress } from "antd";
import { FileUnknownOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import Show from "../../../assets/icons/Show.svg";
import Delete from "../../../assets/icons/Delete.svg";
import {
  callAddDocument,
  callAddTypeFormDocument,
} from "../../../utils/actions/actions";
import ENVIROMENT from "../../../utils/constants/enviroments";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";

const { Dragger } = Upload;

const CustomFileUpload = (props) => {
  const {
    acceptFile,
    typeDocument,
    dataDocument,
    callAddDocument,
    callAddTypeFormDocument,
    dataProfile,
  } = props;
  const [fileList, setFileList] = useState({});
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [timeUpload, setTimeUpload] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);
  const [spinVisibleUpload, setSpinVisibleUpload] = useState(true);

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const LoadingSpin = (
    <div
      style={{
        top: "20px",
        position: "absolute",
        left: "50px",
      }}
    >
      <Progress
        type="circle"
        percent={isNil(timeUpload) === false ? timeUpload : 0}
      />
    </div>
  );

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("¡El archivo que intentas subir debe ser menor que 5MB!");
    }
    return isLt2M;
  };

  const handlerAddTypeFormDocument = async (data, id) => {
    try {
      await callAddTypeFormDocument(data, id);
      setSpinVisibleUpload(false);
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "No se pudo asociar el documento al contrato indicado",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerAddDocument = async (data, infoDoc) => {
    const {
      idCustomer,
      idSystemUser,
      idLoginHistory,
      idCustomerTF,
      idContract,
      idCustomerTenantTF,
    } = dataProfile;
    const dataDocument = {
      documentName: data.name,
      extension: data.type,
      preview: null,
      thumbnail: null,
      idDocumentType: infoDoc.idDocumentType,
      idCustomer: idCustomerTF,
      idSystemUser,
      idLoginHistory,
    };
    try {
      const response = await callAddDocument(data, dataDocument, (percent) => {
        setTimeUpload(percent);
      });
      const documentId =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.idDocument) === false
          ? response.response.idDocument
          : null;
      await handlerAddTypeFormDocument(
        {
          idCustomer: idCustomerTF,
          idTypeForm: infoDoc.idTypeForm,
          idCustomerTenant: idCustomerTenantTF,
          type: typeDocument,
          idContract,
          idSystemUser,
          idLoginHistory,
        },
        documentId
      );
      setTimeout(() => {
        setSpinVisible(false);
      }, 3000);
      showMessageStatusApi(
        "Documento subido exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        "No se logro subir el archivo, intenta nuevamente o mas tarde",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      setSpinVisible(false);
    }
  };

  return (
    <Spin indicator={LoadingSpin} spinning={spinVisible}>
      {dataDocument.isRequired === true && (
        <div
          style={{
            textAlign: "center",
            color: "var(--color-primary)",
            fontSize: 12,
          }}
        >
          Documento obligatorio
        </div>
      )}
      <div
        className={`section-drop-document ${
          (isNil(preview) === false ||
            (isEmpty(dataDocument) === false &&
              isNil(dataDocument.idDocument) === false)) &&
          "border-dashed-none"
        }`}
      >
        {isNil(preview) === true &&
          isEmpty(dataDocument) === false &&
          isNil(dataDocument.idDocument) === true && (
            <>
              {/* <Dragger
              action="/"
              onChange={({ file }) => {
                // if (isNil(file.originFileObj) === false) {
                //   const reader = new FileReader();
                //   reader.readAsDataURL(file.originFileObj);
                //   reader.onload = (event) => {
                //     if (file.type !== "application/pdf" && file.type !== "") {
                //       setPreview(event.target.result);
                //     } else {
                //       setPreview("");
                //     }
                //   };
                //   // setFileList(file);
                //   //setFileName(file.name);
                //   // handlerAddDocument(file, dataDocument);
                // }
                console.log('hola',file);
              }}
              method="get"
              showUploadList={false}
              accept={acceptFile}
              beforeUpload={beforeUpload}
            > */}
              <label for={`id-file-${dataDocument.idDocumentType}`}>
                Haz Clic aquí para subir tu documento
              </label>
              {isNil(preview) === false && (
                <img id="blah" src={preview} alt="your image" />
              )}

              <input
                id={`id-file-${dataDocument.idDocumentType}`}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  const fileIndex = e.target.files[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(fileIndex);
                  reader.onload = (event) => {
                    if (
                      fileIndex.type !== "application/pdf" &&
                      fileIndex.type !== ""
                    ) {
                      setPreview(event.target.result);
                    } else {
                      setPreview("");
                    }
                  };
                  setSpinVisible(true);
                  setFileName(fileIndex.name);
                  handlerAddDocument(fileIndex, dataDocument);
                }}
              />
            </>
          )}
        {isNil(preview) === false &&
          isEmpty(dataDocument) === false &&
          isNil(dataDocument.idDocument) === true && (
            <div className="content-preview-document">
              <div className="screen-hover-action">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewVisible(!previewVisible);
                  }}
                >
                  <img src={Show} alt="preview" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFileList({});
                    setPreview(null);
                    setFileName(null);
                  }}
                >
                  <img src={Delete} alt="eliminar" />
                </button>
              </div>
              {isEmpty(preview) === true ? (
                <FileUnknownOutlined style={{ fontSize: 100, color: "grey" }} />
              ) : (
                <img src={preview} alt="Preview" />
              )}
            </div>
          )}
        {isEmpty(dataDocument) === false &&
          isNil(dataDocument.idDocument) === false && (
            <div className="content-preview-document">
              <div className="screen-hover-action">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewVisible(!previewVisible);
                  }}
                >
                  <img src={Show} alt="preview" />
                </button>
              </div>
              {isNil(dataDocument.extension) === true ||
              dataDocument.extension === "docx" ||
              dataDocument.extension === "pdf" ? (
                <FileUnknownOutlined style={{ fontSize: 100, color: "grey" }} />
              ) : (
                <img
                  src={`${ENVIROMENT}/api/viewFile/${dataDocument.idDocument}/${dataDocument.bucketSource}`}
                  alt="Preview"
                />
              )}
            </div>
          )}
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
                  }}
                >
                  <img src={Arrow} alt="backTo" width="30" />
                </button>
                <h1>
                  {isEmpty(dataDocument) === false &&
                  isNil(dataDocument.idDocument) === false
                    ? dataDocument.documentType
                    : fileName}
                </h1>
              </div>
            </div>
          }
          closable={false}
          footer={null}
          style={{ top: "20px" }}
        >
          {isNil(preview) === false &&
            isEmpty(dataDocument) === false &&
            isNil(dataDocument.idDocument) === true && (
              <>
                {isEmpty(preview) === true ? (
                  <div style={{ textAlign: "center" }}>
                    <FileUnknownOutlined
                      style={{ fontSize: 100, color: "grey" }}
                    />
                  </div>
                ) : (
                  <Magnifier src={preview} />
                )}
              </>
            )}

          {isEmpty(dataDocument) === false &&
            isNil(dataDocument.idDocument) === false && (
              <>
                {isNil(dataDocument.extension) === true ||
                dataDocument.extension === "docx" ||
                dataDocument.extension === "pdf" ? (
                  <div style={{ textAlign: "center" }}>
                    <iframe
                      className="iframe-docx-hfy"
                      src={`https://docs.google.com/gview?url=${ENVIROMENT}/api/viewFile/${dataDocument.idDocument}/${dataDocument.bucketSource}&embedded=true`}
                    ></iframe>
                  </div>
                ) : (
                  <Magnifier
                    src={`${ENVIROMENT}/api/viewFile/${dataDocument.idDocument}/${dataDocument.bucketSource}`}
                  />
                )}
              </>
            )}
        </Modal>
      </div>
      {/* {isNil(preview) === false &&
        isEmpty(dataDocument) === false &&
        isNil(dataDocument.idDocument) === true &&
        spinVisibleUpload === true && (
          <div className="confirm-upload-document button_actions">
            <button
              className="button_primary"
              type="button"
              onClick={() => {
                console.log("entro", isEmpty(dataDocument) === false);
                console.log("entro1", isEmpty(fileList));
                if (isEmpty(dataDocument) === false) {
                  console.log("entro al if");
                  setSpinVisible(true);
                  handlerAddDocument(fileList, dataDocument);
                }
              }}
            >
              <span>
                <i className="fa fa-upload" /> Subir
              </span>
            </button>
          </div>
        )} */}
    </Spin>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
  callAddTypeFormDocument: (data, id) =>
    dispatch(callAddTypeFormDocument(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomFileUpload);
