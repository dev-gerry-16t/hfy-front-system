import React from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Modal } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";
import CustomFileUpload from "./customFileUpload";

const CustomSubSectionCardDocument = (props) => {
  const { children, title, subtitle, visibleSubtitle } = props;
  return (
    <div
      className="section-card-documentation"
      style={{
        marginBottom: "15px",
      }}
    >
      <div className="section-title-card-doc">
        <strong>{title}</strong>
        <span
          style={{
            visibility: visibleSubtitle === true ? "visible" : "hidden",
          }}
        >
          {subtitle}
        </span>
      </div>
      <div
        className="section-content-card-doc"
        style={{
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SectionUploadDocument = (props) => {
  const { isModalVisible, onClose, dataDocuments } = props;
  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Documentación</h1>
        </div>
        <div className="main-form-information">
          <p>
            Sube aquí los documentos firmados por los involucrados o bien los
            documentos modificados con firma electrónica requerida.
          </p>

          <div className="content-typeform-formulary">
            <div
              className="section-top-documentation"
              style={{ flexDirection: "column" }}
            >
              <CustomSubSectionCardDocument
                title="Póliza"
                subtitle="N/A"
                visibleSubtitle={false}
              >
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[2]) === false
                      ? dataDocuments[2]
                      : {}
                  }
                  typeDocument={1}
                />
              </CustomSubSectionCardDocument>
              <CustomSubSectionCardDocument
                title="Contrato"
                subtitle="N/A"
                visibleSubtitle={false}
              >
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[0]) === false
                      ? dataDocuments[0]
                      : {}
                  }
                  typeDocument={1}
                />
              </CustomSubSectionCardDocument>
              <CustomSubSectionCardDocument
                title="Pagares"
                subtitle="N/A"
                visibleSubtitle={false}
              >
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[1]) === false
                      ? dataDocuments[1]
                      : {}
                  }
                  typeDocument={1}
                />
              </CustomSubSectionCardDocument>
            </div>
          </div>
        </div>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            <span>Listo</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SectionUploadDocument;
