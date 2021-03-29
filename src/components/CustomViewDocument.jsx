import React from "react";
import isNil from "lodash/isNil";
import Arrow from "../assets/icons/Arrow.svg";
import Magnifier from "react-magnifier";
import { Modal } from "antd";
import ENVIROMENT from "../utils/constants/enviroments";

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
          <button className="arrow-back-to" type="button" onClick={onClose}>
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Documento</h1>
        </div>
        <div className="contract-children-information">
          {dataDocument.extension === "docx" ||
          dataDocument.extension === "pdf" ? (
            <iframe
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
    </Modal>
  );
};

export default CustomViewDocument;
