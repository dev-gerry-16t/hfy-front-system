import React, { useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Modal } from "antd";
import Magnifier from "react-magnifier";
import styled from "styled-components";
import Arrow from "../../../assets/icons/Arrow.svg";
import { FileUnknownOutlined } from "@ant-design/icons";
import ENVIROMENT from "../../../utils/constants/enviroments";

const CardDocuments = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }
`;

const CardInfoDocuments = styled.div`
  overflow-y: scroll;
  max-height: 30em;
  padding: 1em;
  .info-document {
    display: grid;
    grid-template-columns: auto 1fr;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 6px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 1em;
    margin-bottom: 1em;
    cursor: pointer;
    div {
      padding: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const InformationDocument = styled.div`
  display: flex;
  flex-direction: column;
  .title-document {
    font-size: 0.8em;
  }
  .data-document {
    font-size: 0.7em;
    font-weight: 400;
  }
`;

const Document = ({ documentType, uploadedByUser, uploadedAt, onClick }) => {
  return (
    <div className="info-document" onClick={onClick}>
      <div>
        <i
          className="fa fa-picture-o"
          style={{
            color: "#D6D7E8",
            fontSize: "2em",
          }}
        />
      </div>
      <InformationDocument>
        <strong className="title-document">{documentType}</strong>
        <span className="data-document">
          Subido por {uploadedByUser}, {uploadedAt}
        </span>
      </InformationDocument>
    </div>
  );
};

const WidgetDocuments = (props) => {
  const { dataDocument } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dataFile, setDataFile] = useState({});
  return (
    <CardDocuments>
      <h1>Documentos</h1>
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
                {isEmpty(dataFile) === false &&
                isNil(dataFile.idDocument) === false
                  ? dataFile.documentType
                  : ""}
              </h1>
            </div>
          </div>
        }
        closable={false}
        footer={null}
        style={{ top: "20px" }}
      >
        {/* {isNil(preview) === false &&
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
          )} */}

        {isEmpty(dataFile) === false && isNil(dataFile.idDocument) === false && (
          <>
            {isNil(dataFile.extension) === true ||
            dataFile.extension === "docx" ||
            dataFile.extension === "pdf" ? (
              <div style={{ textAlign: "center" }}>
                <iframe
                  sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                  className="iframe-docx-hfy"
                  src={`https://docs.google.com/gview?url=${ENVIROMENT}/api/viewFile/${dataFile.idDocument}/${dataFile.bucketSource}&embedded=true`}
                ></iframe>
              </div>
            ) : (
              <Magnifier
                src={`${ENVIROMENT}/api/viewFile/${dataFile.idDocument}/${dataFile.bucketSource}`}
              />
            )}
          </>
        )}
      </Modal>
      <CardInfoDocuments>
        {dataDocument.map((row) => {
          return (
            <Document
              {...row}
              onClick={() => {
                setDataFile(row);
                setPreviewVisible(true);
              }}
            />
          );
        })}
      </CardInfoDocuments>
    </CardDocuments>
  );
};

export default WidgetDocuments;
