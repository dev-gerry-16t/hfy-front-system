import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col, Modal, Checkbox } from "antd";
import CustomFileUpload from "./customFileUpload";

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
  const {
    onClickBack,
    onClickNext,
    dataDocuments,
    typeDocument,
    dataForm,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
    onGetDocument,
  } = props;

  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);

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
      <div
        title={title}
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
    </div>
  );

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

  useEffect(() => {
    onGetDocument();
  }, []);

  return (
    <div className="content-typeform-formulary">
      <h3>Documentación</h3>
      <p>
        Selecciona el documento que se te indica, si estás seguro de que es el
        documento correcto haz clic en Subir
      </p>
      {dataForm.requiresCustomerTenantEntInfo === false && (
        <>
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
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
            <CustomSubSectionCardDocument
              title="Identificación oficial"
              subtitle={getTypeIdDocument(dataForm.idType)}
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
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
          </div>
          <div className="section-bottom-documentation">
            <CustomSubSectionCardDocument
              title="últimos 3 estados bancarios"
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
                typeDocument={typeDocument}
              />
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[3]) === false
                    ? dataDocuments[3]
                    : {}
                }
                typeDocument={typeDocument}
              />
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[4]) === false
                    ? dataDocuments[4]
                    : {}
                }
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
            {(dataForm.isOwn === 0 || dataForm.isOwn === false) && (
              <CustomSubSectionCardDocument
                title="Contrato de arrendamiento"
                subtitle="sólo caratula"
                visibleSubtitle
              >
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[7]) === false
                      ? dataDocuments[7]
                      : {}
                  }
                  typeDocument={typeDocument}
                />
              </CustomSubSectionCardDocument>
            )}
          </div>
        </>
      )}
      {dataForm.requiresCustomerTenantEntInfo === true && (
        <>
          <div className="section-top-documentation">
            <CustomSubSectionCardDocument
              title="Identificación oficial"
              subtitle={getTypeIdDocument(dataForm.legalRepIdType)}
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
                typeDocument={typeDocument}
              />
              {(dataForm.legalRepIdType === 1 ||
                isNil(dataForm.legalRepIdType) === true) && (
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
            </CustomSubSectionCardDocument>
            <CustomSubSectionCardDocument
              title="Acta Constitutiva"
              subtitle="N/A"
              visibleSubtitle={false}
            >
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[5]) === false
                    ? dataDocuments[5]
                    : {}
                }
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
            <CustomSubSectionCardDocument
              title="Testimonio notarial"
              subtitle="N/A"
              visibleSubtitle={false}
            >
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[6]) === false
                    ? dataDocuments[6]
                    : {}
                }
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
          </div>
          <div className="section-bottom-documentation">
            <CustomSubSectionCardDocument
              title="últimos 3 estados bancarios"
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
                typeDocument={typeDocument}
              />
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[3]) === false
                    ? dataDocuments[3]
                    : {}
                }
                typeDocument={typeDocument}
              />
              <CustomFileUpload
                acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                dataDocument={
                  isEmpty(dataDocuments) === false &&
                  isNil(dataDocuments[4]) === false
                    ? dataDocuments[4]
                    : {}
                }
                typeDocument={typeDocument}
              />
            </CustomSubSectionCardDocument>
            {(dataForm.isOwn === 0 || dataForm.isOwn === false) && (
              <CustomSubSectionCardDocument
                title="Contrato de arrendamiento"
                subtitle="sólo caratula"
                visibleSubtitle
              >
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[7]) === false
                      ? dataDocuments[7]
                      : {}
                  }
                  typeDocument={typeDocument}
                />
              </CustomSubSectionCardDocument>
            )}
          </div>
        </>
      )}
      <div className="button_actions">
        <button
          type="button"
          onClick={async () => {
            try {
              await onGetProperties({
                idTypeForm: dataForm.idTypeForm,
                stepIn: 4,
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
            <p style={{ textAlign: "center" }}>
              {isEmpty(dataPropertiesInfo) === false &&
              isNil(dataPropertiesInfo[0].stepIn) === false
                ? dataPropertiesInfo[0].stepIn
                : ""}
            </p>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                {isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo.map((row) => {
                    return (
                      <DescriptionItem
                        title={row.typeFormProperty}
                        content={row.typeFormPropertyValue}
                        isRequired={row.isRequired}
                      />
                    );
                  })}
              </Col>
            </Row>
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

export default SectionDocumentation;
