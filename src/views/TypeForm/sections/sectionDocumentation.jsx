import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
  message,
  Radio,
} from "antd";
import CustomFileUpload from "./customFileUpload";

const { Dragger } = Upload;

const CustomSubSectionCardDocument = (props) => {
  const { children, title, subtitle, visibleSubtitle } = props;
  return (
    <div className="section-card-documentation">
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
      <div className="section-content-card-doc">{children}</div>
    </div>
  );
};

const SectionDocumentation = (props) => {
  const { onClickBack, onClickNext, dataDocuments } = props;
  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [cardsUpload, setCardsUpload] = useState(false);
  const [cardsUpload1, setCardsUpload1] = useState(false);
  const [cardsUpload2, setCardsUpload2] = useState(false);
  const [cardsUpload3, setCardsUpload3] = useState(false);
  const [cardsUpload4, setCardsUpload4] = useState(false);
  const [cardsUpload5, setCardsUpload5] = useState(false);
  const [cardsUpload6, setCardsUpload6] = useState(false);

  const handlerOnConfirmDocuments = () => {
    message.loading("Tus documentos se estan subiendo", 0);
    setIsUploadDocument(true);
  };

  useEffect(() => {
    if (
      cardsUpload === true &&
      cardsUpload1 === true &&
      cardsUpload2 === true &&
      cardsUpload3 === true &&
      cardsUpload4 === true &&
      cardsUpload5 === true &&
      cardsUpload6 === true
    ) {
      message.destroy();
      onClickNext();
    }
  }, [
    cardsUpload,
    cardsUpload1,
    cardsUpload2,
    cardsUpload3,
    cardsUpload4,
    cardsUpload5,
    cardsUpload6,
  ]);

  return (
    <div className="content-typeform-formulary">
      <h3>Documentación</h3>
      <div className="section-top-documentation">
        <CustomSubSectionCardDocument
          title="Selfie"
          subtitle="N/A"
          visibleSubtitle={false}
        >
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[6]) === false
                ? dataDocuments[6]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload(true);
            }}
          />
        </CustomSubSectionCardDocument>
        <CustomSubSectionCardDocument
          title="INE"
          subtitle="Frente y vuelta"
          visibleSubtitle
        >
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[0]) === false
                ? dataDocuments[0]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload1(true);
            }}
          />
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[1]) === false
                ? dataDocuments[1]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload2(true);
            }}
          />
        </CustomSubSectionCardDocument>
        <CustomSubSectionCardDocument
          title="Carta laboral"
          subtitle="Membretada y firmada"
          visibleSubtitle
        >
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[5]) === false
                ? dataDocuments[5]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload3(true);
            }}
          />
        </CustomSubSectionCardDocument>
      </div>
      <div className="section-bottom-documentation">
        <CustomSubSectionCardDocument
          title="últimos 3 comprobantes de ingreso"
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
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload4(true);
            }}
          />
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[3]) === false
                ? dataDocuments[3]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload5(true);
            }}
          />
          <CustomFileUpload
            acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
            dataDocument={
              isEmpty(dataDocuments) === false &&
              isNil(dataDocuments[4]) === false
                ? dataDocuments[4]
                : {}
            }
            isUploadDocument={isUploadDocument}
            onSuccesUpload={(succes) => {
              setCardsUpload6(true);
            }}
          />
        </CustomSubSectionCardDocument>
      </div>
      <div className="button_actions">
        <button
          type="button"
          onClick={onClickBack}
          className="button_secondary"
        >
          <span>Regresar</span>
        </button>
        <button
          type="button"
          onClick={handlerOnConfirmDocuments}
          className="button_primary"
        >
          <span>Continuar</span>
        </button>
      </div>
    </div>
  );
};

export default SectionDocumentation;
