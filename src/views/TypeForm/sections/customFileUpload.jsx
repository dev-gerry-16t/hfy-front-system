import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import Magnifier from "react-magnifier";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Upload,
  Radio,
  message,
  Progress,
} from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";
import Show from "../../../assets/icons/Show.svg";
import Delete from "../../../assets/icons/Delete.svg";
import { callAddDocument } from "../../../utils/actions/actions";

const { Dragger } = Upload;

const CustomFileUpload = (props) => {
  const {
    acceptFile,
    isUploadDocument,
    dataDocument,
    callAddDocument,
    dataProfile,
  } = props;
  const [fileList, setFileList] = useState({});
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [timeUpload, setTimeUpload] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);

  const LoadingSpin = (
    <div
      style={{
        top: "20px",
        position: "absolute",
        left: "50px",
      }}
    >
      <Progress type="circle" percent={timeUpload} />
    </div>
  );

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("¡El archivo que intentas subir debe ser menor que 5MB!");
    }
    return isLt2M;
  };

  const handlerAddDocument = async (data, type) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    const dataDocument = {
      documentName: data.name,
      extension: data.type,
      preview: null,
      thumbnail: null,
      idDocumentType: type,
      idCustomer,
      idSystemUser,
      idLoginHistory,
    };
    try {
      const response = await callAddDocument(
        data.originFileObj,
        dataDocument,
        (percent) => {
          setTimeUpload(percent);
        }
      );
      const documentId =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.idDocument) === false
          ? response.response.idDocument
          : null;
      setTimeout(() => {
        setSpinVisible(false);
      }, 3000);
      console.log('documentId',documentId);
    } catch (error) {
      setSpinVisible(false);
    }
  };
  
  useEffect(() => {
    if (
      isUploadDocument === true &&
      isEmpty(dataDocument) === false &&
      isEmpty(fileList) === false
    ) {
      setSpinVisible(true);
      handlerAddDocument(fileList, dataDocument.idDocumentType);
    }
  }, [isUploadDocument]);

  return (
    <Spin indicator={LoadingSpin} spinning={spinVisible}>
      <div
        className={`section-drop-document ${
          isNil(preview) === false && "border-dashed-none"
        }`}
      >
        {isNil(preview) === true ? (
          <Dragger
            action="/"
            onChange={({ file }) => {
              if (isNil(file.originFileObj) === false) {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = (event) => {
                  if (file.type !== "application/pdf") {
                    setPreview(event.target.result);
                  } else {
                    setPreview("");
                  }
                };
                setFileList(file);
                setFileName(file.name);
              }
            }}
            method="get"
            showUploadList={false}
            accept={acceptFile}
            beforeUpload={beforeUpload}
          >
            <span>
              Arrastra tu documento
              <br /> aqui o haz Clic
            </span>
          </Dragger>
        ) : (
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
            <img src={preview} alt="Preview" />
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
                <h1>{fileName}</h1>
              </div>
            </div>
          }
          closable={false}
          footer={null}
          style={{ top: "20px" }}
        >
          <Magnifier src={preview} />
        </Modal>
      </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomFileUpload);
