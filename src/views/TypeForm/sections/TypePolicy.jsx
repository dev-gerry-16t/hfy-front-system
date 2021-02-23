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
  Radio,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomFileUpload from "./customFileUpload";

const { Option } = Select;

const TypePolicy = (props) => {
  const {
    onClickBack,
    onClickNext,
    dataPolicies,
    dataDocuments,
    typeDocument,
    dataFormSave,
  } = props;
  const initialForm = {
    idPolicy: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  const getTypeIdDocument = (type) => {
    let word = "";

    switch (type) {
      case 1:
        word = "IFE/INE Frontal y Vuelta";
        break;
      case 2:
        word = "Pasaporte";
        break;
      case 3:
        word = "FM3";
        break;
      default:
        word = "IFE/INE Frontal y Vuelta";
        break;
    }
    return word;
  };

  return (
    <div className="content-typeform-formulary">
      <h3>Poliza y Documentos</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <p>Poliza</p>
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <Select
                value={dataForm.idPolicy}
                placeholder="¿Que póliza contratas?"
                onChange={(value, option) => {
                  setDataForm({ ...dataForm, idPolicy: value });
                }}
              >
                {isEmpty(dataPolicies) === false &&
                  dataPolicies.map((row) => {
                    return (
                      <Option
                        value={row.id}
                        onClick={() => {
                          return row;
                        }}
                      >
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <p>Documentos</p>
          <div className="section-top-documentation">
            <div className="section-card-documentation">
              <div className="section-title-card-doc">
                <strong>Identificación oficial</strong>
                <span>{getTypeIdDocument(dataForm.idType)}</span>
              </div>
              <div className="section-content-card-doc">
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[0]) === false
                      ? dataDocuments[0]
                      : {}
                  }
                  typeDocument={typeDocument}
                />
                {(dataForm.idType === 1 || isNil(dataForm.idType) === true) && (
                  <CustomFileUpload
                    acceptFile="image/png, image/jpeg, image/jpg"
                    dataDocument={
                      isEmpty(dataDocuments) === false &&
                      isNil(dataDocuments[1]) === false
                        ? dataDocuments[1]
                        : {}
                    }
                    typeDocument={typeDocument}
                  />
                )}
              </div>
            </div>
            <div className="section-card-documentation">
              <div className="section-title-card-doc">
                <strong style={{ textAlign: "center" }}>
                  Póliza seguro de responsabilidad <br />
                  civíl para la propiedad
                </strong>
                <span></span>
              </div>
              <div className="section-content-card-doc">
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[2]) === false
                      ? dataDocuments[2]
                      : {}
                  }
                  typeDocument={typeDocument}
                />
              </div>
            </div>
          </div>
          <div className="button_actions">
            {/* <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button> */}
            <button
              type="button"
              onClick={() => {
                onClickNext(dataForm);
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default TypePolicy;
