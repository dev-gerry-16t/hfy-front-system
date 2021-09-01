import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col, Modal, Checkbox, Tooltip } from "antd";
import CustomReferences from "./customReference";

const SectionInfoReferences = (props) => {
  const {
    onClickNext,
    dataFormSave,
    onClickSendReferences,
    dataReferences,
    onGetProperties,
    dataPropertiesInfo,
  } = props;

  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [dataReferenceProperties, setDataReferenceProperties] = useState([]);

  useEffect(() => {
    if (isEmpty(dataPropertiesInfo) === false) {
      const referenceOne = dataPropertiesInfo.filter((row) => {
        return row.stepIn === "Referencia 1";
      });
      const referenceTwo = dataPropertiesInfo.filter((row) => {
        return row.stepIn === "Referencia 2";
      });
      const referenceThree = dataPropertiesInfo.filter((row) => {
        return row.stepIn === "Referencia 3";
      });
      const newArray = [
        { labelReference: "Referencia 1", arrayInformation: referenceOne },
        { labelReference: "Referencia 2", arrayInformation: referenceTwo },
        { labelReference: "Referencia 3", arrayInformation: referenceThree },
      ];
      setDataReferenceProperties(newArray);
    }
  }, [dataPropertiesInfo]);

  useEffect(() => {
    const elementContent =
      document.getElementsByClassName("ant-layout-content");
    if (isNil(elementContent) === false && isNil(elementContent[0]) === false) {
      elementContent[0].scrollTop = 0;
    }
  }, []);

  const DescriptionItem = ({ title, content, isRequired }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontFamily: "Poppins",
        display: "flex",
        justifyContent: "space-around",
        fontSize: 12,
      }}
    >
      <Tooltip placement="right" title={title}>
        <div
          style={{
            width: "130px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <strong className="site-description-item-profile-p-label">
            {title}
          </strong>
        </div>
      </Tooltip>
      <Tooltip placement="left" title={content}>
        <div
          title={content}
          style={{
            width: "170px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              color: isRequired === true ? "red" : "",
              fontWeight: isRequired === true ? "bold" : "",
            }}
          >
            {content}
          </span>
        </div>
      </Tooltip>
    </div>
  );

  return (
    <div className="content-typeform-formulary">
      <h3>Referencias</h3>
      <p>
        {dataFormSave.isFirstTime === true
          ? "Los campos marcados con * (asterisco) son obligatorios."
          : "Por favor verifica la información, los campos marcados con * (asterisco) son obligatorios."}
      </p>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[0]) === false
                ? dataReferences[0]
                : []
            }
            title="Referencia 1"
            onClickAdd={async (data) => {
              try {
                await onClickSendReferences({
                  ...data,
                  idTypeForm: dataFormSave.idTypeForm,
                });
              } catch (error) {
                throw error;
              }
            }}
          />
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[1]) === false
                ? dataReferences[1]
                : []
            }
            title="Referencia 2"
            onClickAdd={async (data) => {
              try {
                await onClickSendReferences({
                  ...data,
                  idTypeForm: dataFormSave.idTypeForm,
                });
              } catch (error) {
                throw error;
              }
            }}
          />
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[2]) === false
                ? dataReferences[2]
                : []
            }
            title="Referencia 3"
            onClickAdd={async (data) => {
              try {
                await onClickSendReferences({
                  ...data,
                  idTypeForm: dataFormSave.idTypeForm,
                });
              } catch (error) {
                throw error;
              }
            }}
          />
          <div className="button_actions">
            <button
              type="button"
              onClick={async () => {
                try {
                  await onGetProperties({
                    idTypeForm: dataFormSave.idTypeForm,
                    stepIn: 3,
                    jsonProperties: JSON.stringify({}),
                  });
                  setConfirmData(true);
                } catch (error) {}
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
      <Modal
        style={{ top: 20 }}
        visible={confirmData}
        closable={false}
        footer={false}
      >
        <div className="form-modal">
          <div className="title-head-modal">
            <h1>Confirma tu información</h1>
          </div>
          <div className="main-form-information">
            <div
              style={{ fontFamily: "Poppins", fontSize: 12, marginBottom: 15 }}
            >
              <span>
                Verifica tu información antes de continuar ya que si se detectan
                inconsistencias podrían afectar el proceso de investigación y
                generación del contrato.
              </span>
            </div>
            {isEmpty(dataReferenceProperties) === false &&
              dataReferenceProperties.map((row) => {
                return (
                  <>
                    <p style={{ textAlign: "center" }}>{row.labelReference}</p>
                    <Row>
                      <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                        {isEmpty(row.arrayInformation) === false &&
                          row.arrayInformation.map((rowMap) => {
                            return (
                              <DescriptionItem
                                title={rowMap.typeFormProperty}
                                content={rowMap.typeFormPropertyValue}
                                isRequired={rowMap.isRequired}
                              />
                            );
                          })}
                      </Col>
                    </Row>
                  </>
                );
              })}

            {isEmpty(dataPropertiesInfo) === false &&
            dataPropertiesInfo[0].canBeSkiped === true ? (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
              >
                <Checkbox
                  checked={aceptTerms}
                  onChange={(e) => {
                    setAceptTerms(e.target.checked);
                  }}
                ></Checkbox>
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 10,
                    color: "black",
                  }}
                >
                  He verificado la información y acepto que es correcta.
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 10,
                    color: "black",
                  }}
                >
                  Aún no has completado la información de este paso, para
                  continuar es necesario ingresar la información que aparece
                  como{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *Requerido*
                  </span>
                  .
                </span>
              </div>
            )}
          </div>
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                setConfirmData(false);
              }}
            >
              <span>Regresar</span>
            </button>
            <button
              type="button"
              className={
                (isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo[0].canBeSkiped === false) ||
                aceptTerms === false
                  ? "disabled"
                  : ""
              }
              onClick={async () => {
                if (
                  isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo[0].canBeSkiped === true &&
                  aceptTerms === true
                ) {
                  onClickNext();
                  setConfirmData(false);
                }
              }}
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionInfoReferences;
