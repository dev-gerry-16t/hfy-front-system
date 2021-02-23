import React, { useState, useEffect, useRef } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
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
  Checkbox,
  DatePicker,
} from "antd";
import SignatureCanvas from "react-signature-canvas";
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import ChatContract from "../../../assets/icons/ChatContract.svg";

const { Option } = Select;

const SectionContractAvailable = (props) => {
  const {
    isModalVisible,
    onClose,
    onAddCommentContract,
    dataGetContract,
    onDownloadDocument,
    onAcceptContract,
    dataProfile,
  } = props;
  const [signature, setSignature] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [scheduleSignatureDate, setScheduleSignatureDate] = useState(null);
  const [valueText, setValueText] = useState(null);
  const [openSection, setOpenSection] = useState(1);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [isDownloadDocument, setIsDownloadDocument] = useState(false);
  const [signaturePrecencial, setSignaturePrecencial] = useState(false);
  const signatureRef = useRef(null);

  const LoadingSpin = <SyncOutlined spin />;

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
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
              if (openSection === 1) {
                onClose();
                setSignaturePrecencial(false);
              } else {
                setOpenSection(1);
              }
              setAceptTerms(false);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>
            {openSection === 1 && "Contrato"}
            {openSection === 2 && "Firma electrónica"}
            {openSection === 3 && "Observaciones"}
          </h1>
          <button
            className="chat-contract-icon"
            type="button"
            onClick={() => {
              setOpenSection(3);
              setAceptTerms(false);
            }}
          >
            <img src={ChatContract} alt="backTo" width="30" />
          </button>
        </div>
        <div className="main-form-information">
          <div className="contract-card-information">
            {openSection === 1 && (
              <>
                {signaturePrecencial === false ? (
                  <>
                    <div
                      className="two-action-buttons"
                      style={{ marginTop: "0px", marginBottom: "10px" }}
                    >
                      {isDownloadDocument === false ? (
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              setIsDownloadDocument(true);
                              await onDownloadDocument({
                                download: true,
                                idCustomer: dataGetContract.idCustomer,
                                idCustomerTenant:
                                  dataGetContract.idCustomerTenant,
                                idContract: dataGetContract.idContract,
                              });
                              setIsDownloadDocument(false);
                            } catch (error) {
                              setIsDownloadDocument(false);
                            }
                          }}
                        >
                          <span>Descargar</span>
                        </button>
                      ) : (
                        <div
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "var(--color-primary)",
                            textAlign: "center",
                            margn: "0px auto",
                            width: "98%",
                          }}
                        >
                          Descargando
                        </div>
                      )}
                    </div>
                    <div className="contract-children-information">
                      {isNil(dataGetContract) === false &&
                        isNil(dataGetContract.contractContent) === false &&
                        isDownloadDocument === false && (
                          <div
                            style={{ color: "black !important" }}
                            dangerouslySetInnerHTML={{
                              __html: dataGetContract.contractContent,
                            }}
                          />
                        )}
                      {isDownloadDocument === true && (
                        <div
                          style={{
                            height: "269px",
                            position: "relative",
                          }}
                        >
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
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "15px" }}>
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "var(--color-primary)",
                        }}
                      >
                        Selecciona la fecha de firmar de contrato y el dia en el
                        que quieras que inicie el contrato de arrendamiento.
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
                            setStartedAt(
                              moment(momentFormat).format("YYYY-MM-DD")
                            );
                          }}
                          format="DD MMMM YYYY"
                        />
                      </Col>
                    </Row>
                    <div className="two-action-buttons">
                      <button
                        type="button"
                        onClick={() => {
                          setSignaturePrecencial(!signaturePrecencial);
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
                          });
                          onClose();
                          setSignaturePrecencial(false);
                        }}
                      >
                        <span>Aceptar</span>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
            {openSection === 2 && (
              <div className="contract-section-signature">
                <p style={{ fontSize: "12px" }}>
                  Firma dentro del reacuadro negro
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
                    color: "gray",
                  }}
                >
                  Acepto que al dar click en aceptar estoy aceptando los
                  terminos y condiciones publicados en la pagina
                  https//homify.ai/terminos-y-condiciones amparados bajo la ley
                </span>
                {dataProfile.idUserType !== 2 && (
                  <>
                    <div style={{ margin: "15px 0px" }}>
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "var(--color-primary)",
                        }}
                      >
                        Selecciona el dia en el que quieras que inicie el
                        contrato de arrendamiento.
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
                            setStartedAt(
                              moment(momentFormat).format("YYYY-MM-DD")
                            );
                          }}
                          format="DD MMMM YYYY"
                        />
                      </Col>
                    </Row>
                  </>
                )}{" "}
              </div>
            )}
            {openSection === 3 && (
              <div className="contract-section-signature">
                <p style={{ fontSize: "12px" }}>
                  No estas de acuerdo con tu contrato, puedes mandarnos tus
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
            )}
          </div>
        </div>
        {openSection === 1 && signaturePrecencial === false && (
          <div className="two-action-buttons">
            {dataProfile.idUserType !== 2 && (
              <button
                type="button"
                onClick={() => {
                  setSignaturePrecencial(!signaturePrecencial);
                }}
              >
                <span>Firma presencial</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setOpenSection(2);
              }}
            >
              <span>Firma electrónica</span>
            </button>
          </div>
        )}
        {openSection === 2 && (
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
                await onAcceptContract({
                  idCustomer: dataGetContract.idCustomer,
                  idCustomerTenant: dataGetContract.idCustomerTenant,
                  idPolicy: dataGetContract.idPolicy,
                  idContract: dataGetContract.idContract,
                  digitalSignature: signature,
                  anex2: null,
                  startedAt: startedAt,
                  scheduleSignatureDate: moment().format("YYYY-MM-DD"),
                  collectionDays: null,
                });
                onClose();
                setSignaturePrecencial(false);
              }}
              className={aceptTerms === true ? "" : "disabled-button"}
            >
              <span>Aceptar</span>
            </button>
          </div>
        )}
        {openSection === 3 && (
          <div className="button_init_primary">
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
              }}
            >
              <span>Enviar</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SectionContractAvailable;
