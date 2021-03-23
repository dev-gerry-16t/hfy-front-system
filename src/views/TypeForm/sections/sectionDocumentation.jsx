import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
  } = props;

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
      <h3>Documentación</h3>
      <p>
        Selecciona el documento que se te indica, si estás seguro de que es el documento correcto haz clic en
        Subir
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
        {/* <button
          type="button"
          onClick={onClickBack}
          className="button_secondary"
        >
          <span>Regresar</span>
        </button> */}
        <button type="button" onClick={onClickNext} className="button_primary">
          <span>Continuar</span>
        </button>
      </div>
    </div>
  );
};

export default SectionDocumentation;
