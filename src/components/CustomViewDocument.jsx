import React from "react";
import Arrow from "../assets/icons/Arrow.svg";
import Magnifier from "react-magnifier";
import { Modal } from "antd";
import styled from "styled-components";
import ENVIROMENT from "../utils/constants/enviroments";

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

const CustomViewDocument = (props) => {
  const { isVisibleModal, dataDocument, onClose } = props;

  return (
    <Modal
      style={{ top: 20 }}
      visible={isVisibleModal}
      closable={false}
      footer={false}
      className="modal-signature-contract"
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <h1>Documento</h1>
        </div>
        <div className="contract-children-information">
          {dataDocument.extension === "docx" ||
          dataDocument.extension === "pdf" ? (
            <iframe
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
              title="Vista documento"
              className="iframe-docx-hfy"
              src={`https://docs.google.com/gview?url=${ENVIROMENT}/api/viewFilesDocx/${dataDocument.idDocument}/${dataDocument.bucketSource}&embedded=true`}
            />
          ) : (
            <Magnifier
              src={`${ENVIROMENT}/api/viewFile/${dataDocument.idDocument}/${dataDocument.bucketSource}`}
            />
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <ButtonDocument
          primary
          onClick={() => {
            onClose();
          }}
        >
          Cerrar
        </ButtonDocument>
      </div>
    </Modal>
  );
};

export default CustomViewDocument;
