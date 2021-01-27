import React, { useState } from "react";
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
} from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";
import Show from "../../../assets/icons/Show.svg";
import Delete from "../../../assets/icons/Delete.svg";

const { Dragger } = Upload;

const CustomFileUpload = (props) => {
  const { acceptFile } = props;
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("¡El archivo que intentas subir debe ser menor que 5MB!");
    }
    return isLt2M;
  };

  return (
    <div
      className={`section-drop-document ${
        isNil(preview) === false && "border-dashed-none"
      }`}
    >
      {isNil(preview) === true ? (
        <Dragger
          action="/"
          onChange={({ file }) => {
            console.log("file", file);
            if (isNil(file.originFileObj) === false) {
              const reader = new FileReader();
              reader.readAsDataURL(file.originFileObj);
              reader.onload = (event) => {
                if (file.type !== "application/pdf") {
                  setPreview(event.target.result);
                }else{
                  setPreview("");
                }
              };
              setFileList(fileList);
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
                setFileList([]);
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
  );
};

export default CustomFileUpload;
