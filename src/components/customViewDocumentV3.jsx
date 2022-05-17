import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import ENVIROMENT from "../utils/constants/enviroments";
import CustomDialog from "./CustomDialog";

const MainButtons = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  button {
    border-radius: 1em;
    border: none;
    padding: 0.5em 0px;
    font-weight: 600;
  }
  .hfy-primary-button {
    background: var(--color-primary);
    color: #fff;
  }
  .hfy-secondary-button {
    background: #fff;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
`;

const ContentDocumentView = styled.div`
  height: 100%;
  padding: 1em 5px;
  font-family: Poppins;
  .title-view-doc {
    text-align: center;
    h1 {
      font-weight: 700;
    }
  }
  .section-button-doc {
    margin: 10px 0px;
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
    button {
      border: none;
      background: var(--color-primary);
      color: #fff;
      font-weight: 500;
      border-radius: 12px;
      padding: 2px 10px;
    }
  }
`;

let ifrm = null;
const CustomViewDocumentV3 = (props) => {
  const { isVisibleModal, dataDocument, onClose, downloadDoc = false } = props;

  const handlerUpdateDocument = () => {
    if (isNil(ifrm) === false) {
      ifrm.remove();
    }
    setTimeout(() => {
      ifrm = document.createElement("iframe");
      ifrm.setAttribute(
        "src",
        `https://docs.google.com/gview?url=${ENVIROMENT}${dataDocument.url}&embedded=true`
      );
      ifrm.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
      );
      ifrm.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
      );
      ifrm.setAttribute("title", dataDocument.documentType);
      ifrm.style.width = "100%";
      ifrm.style.height = "100%";
      const el = document.getElementById("data-iframe-document");
      el.appendChild(ifrm);
    }, 3000);
  };

  const handlerDownloadDocument = (url) => {
    const aElement = document.createElement("a");
    aElement.href = url;
    aElement.target = "_blank";
    aElement.download = true;
    const el = document.getElementById("data-iframe-document");
    el.appendChild(aElement);
    aElement.click();
    aElement.remove();
  };

  useEffect(() => {
    if (isVisibleModal === true && isEmpty(dataDocument) === false) {
      ifrm = document.createElement("iframe");
      ifrm.setAttribute(
        "src",
        `https://docs.google.com/gview?url=${ENVIROMENT}${dataDocument.url}&embedded=true`
      );
      ifrm.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
      );
      ifrm.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
      );
      ifrm.setAttribute("title", dataDocument.documentType);
      ifrm.style.width = "100%";
      ifrm.style.height = "100%";
      setTimeout(() => {
        const el = document.getElementById("data-iframe-document");
        el.appendChild(ifrm);
      }, 1000);
    } else if (isVisibleModal === false) {
      if (isNil(ifrm) === false) {
        ifrm.remove();
        ifrm = null;
      }
    }
  }, [isVisibleModal, dataDocument]);

  return (
    <CustomDialog
      isVisibleDialog={isVisibleModal}
      onClose={() => {}}
      classNameDialog="onboarding-dialog"
      full="lg"
    >
      <div
        style={{
          position: "absolute",
          right: "1em",
          top: "5px",
          zIndex: "2",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </button>
      </div>
      <ContentDocumentView>
        <div className="title-view-doc">
          <h1>{dataDocument.documentType}</h1>
        </div>
        <div className="section-button-doc">
          <button onClick={handlerUpdateDocument}>
            Actualizar <i className="fa fa-refresh"></i>
          </button>
          {downloadDoc === true && (
            <button
              onClick={() => {
                handlerDownloadDocument(
                  `${ENVIROMENT}/api/viewFileDownload/${dataDocument.newIdDocument}/${dataDocument.newBucketSorce}/${dataDocument.extension}`
                );
              }}
            >
              Descargar <i className="fa fa-download"></i>
            </button>
          )}
        </div>
        <span>Si no visualizas el documento haz clic en "Actualizar".</span>
        <div
          style={{
            height: "100%",
          }}
          id="data-iframe-document"
        ></div>
        <MainButtons>
          <button
            className="hfy-secondary-button"
            onClick={() => {
              onClose();
            }}
          >
            Salir
          </button>
        </MainButtons>
      </ContentDocumentView>
    </CustomDialog>
  );
};

export default CustomViewDocumentV3;
