import React, { useState, useEffect, useRef } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Modal, Row, Col, Checkbox, DatePicker } from "antd";
import SignatureCanvas from "react-signature-canvas";
import {
  SyncOutlined,
  MobileOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  CreditCardOutlined,
  FolderOpenOutlined,
  CloudDownloadOutlined,
  CheckOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import EmptyDocument from "../../../assets/icons/EmptyDocument.svg";
import ENVIROMENT from "../../../utils/constants/enviroments";

const SectionContractAvailable = (props) => {
  const {
    isModalVisible,
    onClose,
    onAddCommentContract,
    dataGetContract,
    onDownloadDocument,
    onAcceptContract,
    dataProfile,
    onVisualiceDocument,
    onFinishContractFlow,
  } = props;
  const [signature, setSignature] = useState("");
  const reconstructOriginal = {
    contract: true,
    policy: true,
    contractTenant: true,
    payments: true,
  };
  const [reconstructionSection, setReconstructionSection] = useState(
    reconstructOriginal
  );
  const [startedAt, setStartedAt] = useState(null);
  const [scheduleSignatureDate, setScheduleSignatureDate] = useState(null);
  const [valueText, setValueText] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [internalModal, setInternalModal] = useState(false);
  const [isEditableContract, setIsEditableContract] = useState(false);
  const [typeSignatureDigital, setTypeSignatureDigital] = useState(1);
  const [documentSigned, setDocumentSigned] = useState({
    contract: false,
    policy: false,
    payment: false,
  });
  const [isDownloadDocument, setIsDownloadDocument] = useState(false);
  const [signaturePrecencial, setSignaturePrecencial] = useState(false);
  const signatureRef = useRef(null);

  const LoadingSpin = <SyncOutlined spin />;

  useEffect(() => {
    if (isEmpty(dataGetContract) === false && isNil(openSection) === true) {
      if (
        dataGetContract.isEditable === 1 ||
        dataGetContract.isEditable === true
      ) {
        if (
          dataProfile.idUserType === 3 &&
          isNil(dataGetContract.startedAt) === true
        ) {
          setOpenSection(1);
        } else {
          setOpenSection(4);
          setSignaturePrecencial(true);
        }
        setIsEditableContract(true);
      } else {
        setOpenSection(4);
        setIsEditableContract(false);
      }
    }
  }, [dataGetContract]);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
      className="modal-signature-contract"
    >
      <Modal
        style={{ top: 20 }}
        visible={internalModal}
        closable={false}
        footer={false}
        className="modal-signature-contract"
      >
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                setInternalModal(!internalModal);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Documento</h1>
          </div>
          <div className="contract-children-information">
            {isNil(dataGetContract) === false &&
            isNil(dataGetContract.url) === false ? (
              <iframe
                className="iframe-docx-hfy"
                src={`https://docs.google.com/gview?url=${ENVIROMENT}${dataGetContract.url}&embedded=true`}
              ></iframe>
            ) : (
              <div className="empty-data-document">
                <img
                  src={EmptyDocument}
                  alt="make-page"
                  width={50}
                  height={40}
                />
                <label>No está disponible el documento</label>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              onClose();
              setReconstructionSection(reconstructOriginal);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Contrato</h1>
          {/* <button
            className="chat-contract-icon"
            type="button"
            onClick={() => {
              setOpenSection(3);
              setAceptTerms(false);
            }}
          >
            <img src={ChatContract} alt="backTo" width="30" />
          </button> */}
        </div>

        <div className="main-form-information">
          <div className="contract-card-information">
            {openSection === 1 && (
              <div id="step_1_contract" className="main-form-information">
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <h3
                    style={{
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    ¿Como quieres firmar tu contrato?
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontFamily: "Poppins",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <MobileOutlined
                      style={{
                        fontSize: "80px",
                        color: "#a0a3bd",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOpenSection(3);
                        setSignaturePrecencial(true);
                      }}
                    />
                    <label
                      style={{
                        color: "#4e4b66",
                        fontWeight: 600,
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      Firma electrónica
                    </label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <SnippetsOutlined
                      style={{
                        fontSize: "80px",
                        color: "#a0a3bd",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOpenSection(2);
                        setSignaturePrecencial(false);
                      }}
                    />
                    <label
                      style={{
                        color: "#4e4b66",
                        fontWeight: 600,
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      Firma presencial
                    </label>
                  </div>
                </div>
              </div>
            )}
            {openSection === 2 && (
              <div
                id="step_2_contract_presencial"
                className="contract-children-information"
              >
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Selecciona el dia que quieres firmar el contrato y el dia de
                    inicio de tu contrato de arrendamiento
                  </label>
                </div>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DatePicker
                      value={
                        isNil(scheduleSignatureDate) === false
                          ? moment(scheduleSignatureDate, "YYYY-MM-DD")
                          : null
                      }
                      placeholder="Fecha de firma"
                      onChange={(momentFormat, date) => {
                        setScheduleSignatureDate(
                          moment(momentFormat).format("YYYY-MM-DD")
                        );
                      }}
                      format="DD MMMM YYYY"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DatePicker
                      value={
                        isNil(startedAt) === false
                          ? moment(startedAt, "YYYY-MM-DD")
                          : null
                      }
                      placeholder="Fecha de inicio del contrato"
                      onChange={(momentFormat, date) => {
                        setStartedAt(moment(momentFormat).format("YYYY-MM-DD"));
                      }}
                      format="DD MMMM YYYY"
                    />
                  </Col>
                </Row>
                <div className="two-action-buttons">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSection(1);
                    }}
                  >
                    <span>Cancelar</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await onAcceptContract({
                        idCustomer: dataGetContract.idCustomer,
                        idCustomerTenant: dataGetContract.idCustomerTenant,
                        idPolicy: dataGetContract.idPolicy,
                        idContract: dataGetContract.idContract,
                        digitalSignature: signature,
                        anex2: null,
                        startedAt: startedAt,
                        scheduleSignatureDate: scheduleSignatureDate,
                        collectionDays: null,
                        type: 1,
                      });
                      setOpenSection(4);
                    }}
                  >
                    <span>Aceptar</span>
                  </button>
                </div>
              </div>
            )}
            {openSection === 3 && (
              <div
                id="step_3_contract_digital"
                className="contract-children-information"
              >
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Selecciona el dia que iniciara el contrato de arrendamiento
                  </label>
                </div>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DatePicker
                      value={
                        isNil(startedAt) === false
                          ? moment(startedAt, "YYYY-MM-DD")
                          : null
                      }
                      placeholder="Fecha de inicio del contrato"
                      onChange={(momentFormat, date) => {
                        setStartedAt(moment(momentFormat).format("YYYY-MM-DD"));
                      }}
                      format="DD MMMM YYYY"
                    />
                  </Col>
                </Row>
                <div className="two-action-buttons">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSection(1);
                    }}
                  >
                    <span>Cancelar</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await onAcceptContract({
                        idCustomer: dataGetContract.idCustomer,
                        idCustomerTenant: dataGetContract.idCustomerTenant,
                        idPolicy: dataGetContract.idPolicy,
                        idContract: dataGetContract.idContract,
                        digitalSignature: null,
                        anex2: null,
                        startedAt: startedAt,
                        scheduleSignatureDate:
                          dataProfile.idUserType === 3
                            ? moment().format("YYYY-MM-DD")
                            : null,
                        collectionDays: null,
                        type: 1,
                      });
                      setOpenSection(4);
                    }}
                  >
                    <span>Aceptar</span>
                  </button>
                </div>
              </div>
            )}
            {openSection === 4 && isDownloadDocument === false && (
              <div id="step_4_contract_docs">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    fontFamily: "Poppins",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Contrato de Arrendamiento
                  </h3>
                  <div style={{ display: "flex", marginBottom: 20 }}>
                    <FileDoneOutlined
                      style={{
                        fontSize: "50px",
                        color:
                          documentSigned.contract === false
                            ? "#a0a3bd"
                            : "var(--color-primary)",
                      }}
                      onClick={() => {}}
                    />
                    <div className="button-contract-actions">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            if (reconstructionSection.contract === true) {
                              await onVisualiceDocument({
                                download: false,
                                process: true,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 1,
                              });
                              setReconstructionSection({
                                ...reconstructionSection,
                                contract: false,
                              });
                            }

                            setInternalModal(!internalModal);
                          } catch (error) {}
                        }}
                      >
                        <FolderOpenOutlined style={{ fontSize: 15 }} /> Ver
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setIsDownloadDocument(true);
                            await onDownloadDocument(
                              {
                                download: true,
                                process: false,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 1,
                              },
                              "Contrato"
                            );
                            setIsDownloadDocument(false);
                          } catch (error) {
                            setIsDownloadDocument(false);
                          }
                        }}
                      >
                        <CloudDownloadOutlined style={{ fontSize: 15 }} />{" "}
                        Descargar
                      </button>
                      {signaturePrecencial === true &&
                        isEditableContract === true && (
                          <button
                            type="button"
                            onClick={() => {
                              if (documentSigned.contract === false) {
                                setOpenSection(5);
                                setTypeSignatureDigital(1);
                              }
                            }}
                          >
                            {documentSigned.contract === false ? (
                              <FormOutlined style={{ fontSize: 15 }} />
                            ) : (
                              <CheckOutlined
                                style={{
                                  fontSize: 15,
                                  color: "var(--color-primary)",
                                }}
                              />
                            )}{" "}
                            {documentSigned.contract === false
                              ? "Firmar"
                              : "Firmado"}
                          </button>
                        )}
                    </div>
                  </div>
                  <h3
                    style={{
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Póliza
                  </h3>
                  <div style={{ display: "flex", marginBottom: 20 }}>
                    <FileProtectOutlined
                      style={{
                        fontSize: "50px",
                        color:
                          documentSigned.policy === false
                            ? "#a0a3bd"
                            : "var(--color-primary)",
                      }}
                      onClick={() => {}}
                    />
                    <div className="button-contract-actions">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            if (reconstructionSection.policy === true) {
                              await onVisualiceDocument({
                                download: false,
                                process: true,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 2,
                              });
                              setReconstructionSection({
                                ...reconstructionSection,
                                policy: false,
                              });
                            }
                            setInternalModal(!internalModal);
                          } catch (error) {}
                        }}
                      >
                        <FolderOpenOutlined style={{ fontSize: 15 }} /> Ver
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setIsDownloadDocument(true);
                            await onDownloadDocument(
                              {
                                download: true,
                                process: false,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 2,
                              },
                              "Poliza"
                            );
                            setIsDownloadDocument(false);
                          } catch (error) {
                            setIsDownloadDocument(false);
                          }
                        }}
                      >
                        <CloudDownloadOutlined style={{ fontSize: 15 }} />{" "}
                        Descargar
                      </button>
                      {signaturePrecencial === true &&
                        isEditableContract === true && (
                          <button
                            type="button"
                            onClick={() => {
                              if (documentSigned.policy === false) {
                                setOpenSection(5);
                                setTypeSignatureDigital(2);
                              }
                            }}
                          >
                            {documentSigned.policy === false ? (
                              <FormOutlined style={{ fontSize: 15 }} />
                            ) : (
                              <CheckOutlined
                                style={{
                                  fontSize: 15,
                                  color: "var(--color-primary)",
                                }}
                              />
                            )}{" "}
                            {documentSigned.policy === false
                              ? "Firmar"
                              : "Firmado"}
                          </button>
                        )}
                    </div>
                  </div>
                  <h3
                    style={{
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Pagarés
                  </h3>
                  <div style={{ display: "flex", marginBottom: 20 }}>
                    <CreditCardOutlined
                      style={{
                        fontSize: "50px",
                        color:
                          documentSigned.payment === false
                            ? "#a0a3bd"
                            : "var(--color-primary)",
                      }}
                      onClick={() => {}}
                    />
                    <div className="button-contract-actions">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            if (reconstructionSection.payments === true) {
                              await onVisualiceDocument({
                                download: false,
                                process: true,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 4,
                              });
                              setReconstructionSection({
                                ...reconstructionSection,
                                payments: false,
                              });
                            }

                            setInternalModal(!internalModal);
                          } catch (error) {}
                        }}
                      >
                        <FolderOpenOutlined style={{ fontSize: 15 }} /> Ver
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setIsDownloadDocument(true);
                            await onDownloadDocument(
                              {
                                download: true,
                                process: false,
                                url: dataGetContract.url,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                                type: 4,
                              },
                              "Pagare"
                            );
                            setIsDownloadDocument(false);
                          } catch (error) {
                            setIsDownloadDocument(false);
                          }
                        }}
                      >
                        <CloudDownloadOutlined style={{ fontSize: 15 }} />{" "}
                        Descargar
                      </button>
                      {signaturePrecencial === true &&
                        dataProfile.idUserType !== 3 &&
                        isEditableContract === true && (
                          <button
                            type="button"
                            onClick={() => {
                              if (documentSigned.payment === false) {
                                setOpenSection(5);
                                setTypeSignatureDigital(4);
                              }
                            }}
                          >
                            {documentSigned.payment === false ? (
                              <FormOutlined style={{ fontSize: 15 }} />
                            ) : (
                              <CheckOutlined
                                style={{
                                  fontSize: 15,
                                  color: "var(--color-primary)",
                                }}
                              />
                            )}{" "}
                            {documentSigned.payment === false
                              ? "Firmar"
                              : "Firmado"}
                          </button>
                        )}
                    </div>
                  </div>
                </div>
                <div className="two-action-buttons">
                  <button
                    type="button"
                    onClick={async () => {
                      setOpenSection(6);
                    }}
                  >
                    <span>Comentarios</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      onClose();
                      setOpenSection(1);
                      onFinishContractFlow();
                      setReconstructionSection(reconstructOriginal);
                    }}
                  >
                    <span>Terminar</span>
                  </button>
                </div>
              </div>
            )}
            {openSection === 4 && isDownloadDocument === true && (
              <div
                id="step_4_contract_docs_download"
                style={{
                  height: "269px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "var(--color-primary)",
                    textAlign: "center",
                    width: "98%",
                  }}
                >
                  Descargando...
                </div>
                <div class="loader"></div>
                <div class="shadow"></div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                    textAlign: "center",
                    margn: "0px auto",
                    width: "98%",
                  }}
                >
                  Estamos procesando tu documento
                  <br /> espera por favor
                </div>
              </div>
            )}
            {openSection === 5 && (
              <div
                id="step_5_contract_signature"
                className="contract-section-signature"
              >
                <p style={{ fontSize: "18px" }}>
                  {typeSignatureDigital === 1 &&
                    "Firma de Contrato de arrendamiento"}
                  {typeSignatureDigital === 2 && "Firma de Póliza"}
                  {typeSignatureDigital === 4 && "Firma de Pagarés"}
                </p>
                <div className="signature">
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 320,
                      height: 150,
                      className: "sigCanvas",
                    }}
                    ref={signatureRef}
                  />
                </div>
                <div className="conditions-name">
                  <strong>{dataGetContract.fullName}</strong>
                </div>
                <Checkbox
                  checked={aceptTerms}
                  onChange={(e) => {
                    const signatureCurrent = signatureRef.current;
                    if (signatureCurrent.isEmpty() === false) {
                      setAceptTerms(e.target.checked);
                      const signatureBase64 = signatureCurrent.toDataURL();
                      setSignature(signatureBase64);
                    }
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
                  Acepto que al dar click en aceptar estoy aceptando los
                  terminos y condiciones publicados en la pagina
                  https//homify.ai/terminos-y-condiciones amparados bajo la ley
                </span>
                <div className="two-action-buttons">
                  <button
                    type="button"
                    onClick={() => {
                      signatureRef.current.clear();
                      setAceptTerms(false);
                    }}
                  >
                    <span>Limpiar firma</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      signatureRef.current.clear();
                      setAceptTerms(false);
                      await onAcceptContract({
                        idCustomer: dataGetContract.idCustomer,
                        idCustomerTenant: dataGetContract.idCustomerTenant,
                        idPolicy: dataGetContract.idPolicy,
                        idContract: dataGetContract.idContract,
                        digitalSignature: signature,
                        anex2: null,
                        startedAt: startedAt,
                        scheduleSignatureDate:
                          dataProfile.idUserType === 3
                            ? moment().format("YYYY-MM-DD")
                            : null,
                        collectionDays: null,
                        type: typeSignatureDigital,
                      });
                      if (typeSignatureDigital === 1) {
                        setDocumentSigned({
                          ...documentSigned,
                          contract: true,
                        });
                        setReconstructionSection({
                          ...reconstructionSection,
                          contract: true,
                        });
                      } else if (typeSignatureDigital === 2) {
                        setDocumentSigned({ ...documentSigned, policy: true });
                        setReconstructionSection({
                          ...reconstructionSection,
                          policy: true,
                        });
                      } else if (typeSignatureDigital === 4) {
                        setDocumentSigned({ ...documentSigned, payment: true });
                        setReconstructionSection({
                          ...reconstructionSection,
                          payments: true,
                        });
                      }
                      setOpenSection(4);
                    }}
                    className={aceptTerms === true ? "" : "disabled-button"}
                  >
                    <span>Aceptar</span>
                  </button>
                </div>
              </div>
            )}
            {openSection === 6 && (
              <>
                <div
                  id="step_6_contract_comments"
                  className="contract-section-signature"
                >
                  <p style={{ fontSize: "12px" }}>
                    No estás de acuerdo con tu contrato, puedes mandarnos tus
                    observaciones
                  </p>
                  <div className="section-type-messages-fixed">
                    <div className="section-type-messages">
                      <div className="text-header">Redactar mensaje</div>
                      <textarea
                        value={valueText}
                        maxlength="200"
                        style={{ fontFamily: "Poppins" }}
                        onChange={(e) => {
                          setValueText(e.target.value);
                        }}
                        className="text-area-contract"
                      />
                    </div>
                  </div>
                </div>
                <div className="two-action-buttons" style={{ marginTop: 20 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSection(4);
                    }}
                  >
                    <span>Cancelar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onAddCommentContract({
                        idCustomer: dataGetContract.idCustomer,
                        idCustomerTenant: dataGetContract.idCustomerTenant,
                        idDigitalContract: dataGetContract.idDigitalContract,
                        idContract: dataGetContract.idContract,
                        comment: valueText,
                      });
                      setOpenSection(1);
                      onClose();
                      setReconstructionSection(reconstructOriginal);
                    }}
                  >
                    <span>Enviar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SectionContractAvailable;
