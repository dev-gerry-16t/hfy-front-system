import React, { useState } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import { Modal, Row, Col, DatePicker } from "antd";
import { MobileOutlined, SnippetsOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import { ReactComponent as IconBigCheck } from "../../../assets/iconSvg/svgFile/iconBigCheck.svg";

const SectionContractAvailable = (props) => {
  const {
    isModalVisible,
    onClose,
    dataGetContract,
    onAcceptContract,
    dataProfile,
  } = props;
  const [startedAt, setStartedAt] = useState(null);
  const [finishProcess, setFinishProcess] = useState(false);
  const [scheduleSignatureDate, setScheduleSignatureDate] = useState(null);
  const [openSection, setOpenSection] = useState(1);

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
              onClose();
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Modalidad de firma</h1>
        </div>
        {finishProcess === false && (
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
                      ¿Selecciona una modalidad de firma?
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
                        Electrónicamente
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
                        Presencialmente
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
                      Selecciona el dia que quieres firmar el contrato y el dia
                      de inicio de tu contrato de arrendamiento
                    </label>
                  </div>
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <DatePicker
                        value={
                          isNil(scheduleSignatureDate) === false
                            ? moment(
                                scheduleSignatureDate,
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : null
                        }
                        placeholder="Fecha y hora de firma"
                        onChange={(momentFormat, date) => {
                          setScheduleSignatureDate(
                            moment(momentFormat).format("YYYY-MM-DD HH:mm:ss")
                          );
                        }}
                        showTime={{
                          defaultValue: moment("00:00:00", "HH:mm:ss"),
                        }}
                        format="DD MMMM YYYY HH:mm"
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
                        setOpenSection(1);
                      }}
                    >
                      <span>Cancelar</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await onAcceptContract({
                            digitalSignature: null,
                            anex2: null,
                            startedAt: startedAt,
                            scheduleSignatureDate: scheduleSignatureDate,
                            collectionDays: null,
                            type: 1,
                            isFaceToFace: true,
                          });
                          setFinishProcess(true);
                        } catch (error) {}
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
                      Selecciona el dia que iniciara el contrato de
                      arrendamiento
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
                        try {
                          await onAcceptContract({
                            digitalSignature: null,
                            anex2: null,
                            startedAt: startedAt,
                            scheduleSignatureDate:
                              dataProfile.idUserType === 3
                                ? moment().format("YYYY-MM-DD HH:mm:ss")
                                : null,
                            collectionDays: null,
                            type: 1,
                            isFaceToFace: false,
                          });
                          setFinishProcess(true);
                        } catch (error) {}
                      }}
                    >
                      <span>Aceptar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {finishProcess === true && (
          <FormModal>
            <div className="icon-image-send">
              <IconBigCheck />
            </div>
            <h2>
              Tu solicitud para la firma de contrato se actualizo con éxito
            </h2>
            <div className="button-action">
              <ButtonsModal
                onClick={() => {
                  onClose();
                  setFinishProcess(false);
                  setOpenSection(1);
                }}
                primary
              >
                Cerrar
              </ButtonsModal>
            </div>
          </FormModal>
        )}
      </div>
    </Modal>
  );
};

export default SectionContractAvailable;
