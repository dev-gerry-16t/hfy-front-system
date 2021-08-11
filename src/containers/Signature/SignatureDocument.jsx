import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import "antd/dist/antd.css";
import { Checkbox } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import CustomInput from "../../components/CustomInput";

const SignatureDocument = (props) => {
  console.log("props", props);
  const [viewContent, setViewContent] = useState(1);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [signature, setSignature] = useState("");
  const [isFinishProcess, setIsFinishProcess] = useState(false);
  const [dataForm, setDataForm] = useState({
    phoneNumber: null,
    username: null,
    comments: "",
  });

  const signatureRef = useRef(null);

  const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
  `;

  const InformationLabel = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const SectionButtons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  `;

  const ButtonPrimary = styled.div`
    border: none;
    background: var(--color-primary);
    color: #fff;
    padding: 5px 15px;
    border-radius: 16px;
    cursor: pointer;
  `;

  const ButtonSecondary = styled.div`
    border: none;
    background: #fff;
    color: var(--color-primary);
    padding: 5px 15px;
    border-radius: 16px;
    border: 1px solid var(--color-primary);
    cursor: pointer;
  `;

  return (
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Homify Logo" className="login_logo" />
      </div>
      <div className="login_main">
        <div className="login_card_form" style={{ padding: "10px 5px" }}>
          <div className="register_holder">
            <div
              className="login_top_form"
              style={{ fontFamily: "Poppins", fontSize: 14 }}
            >
              <h1>Firma digital </h1>
              {viewContent === 0 && (
                <div className="position-result-transaction">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 130.2 130.2"
                  >
                    <circle
                      class="path circle"
                      fill="none"
                      stroke="#D06079"
                      stroke-width="6"
                      stroke-miterlimit="10"
                      cx="65.1"
                      cy="65.1"
                      r="62.1"
                    />
                    <line
                      class="path line"
                      fill="none"
                      stroke="#D06079"
                      stroke-width="6"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      x1="34.4"
                      y1="37.9"
                      x2="95.8"
                      y2="92.3"
                    />
                    <line
                      class="path line"
                      fill="none"
                      stroke="#D06079"
                      stroke-width="6"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      x1="95.8"
                      y1="38"
                      x2="34.4"
                      y2="92.2"
                    />
                  </svg>
                  <span style={{ textAlign: "center", marginBottom: 10 }}>
                    Notificaremos que haz rechazado la firma del documento,
                    agradecemos tu tiempo.
                  </span>
                </div>
              )}
              {viewContent === 1 && (
                <>
                  {isFinishProcess === false && (
                    <>
                      {" "}
                      <div>
                        <InformationLabel>
                          <strong>Nombre:</strong>
                          <span>Agustín Pérez Macias</span>
                        </InformationLabel>
                        <InformationLabel>
                          <strong>Tipo de usuario:</strong>
                          <span>Aval</span>
                        </InformationLabel>
                        <InformationLabel>
                          <strong>Documento:</strong>
                          <span>Contrato arrendamiento</span>
                        </InformationLabel>
                      </div>
                      <div style={{ margin: "25px 0px 10px 0px" }}>
                        <span>
                          Para continuar con el proceso de firma de documento es
                          necesario autorizar la solicitud.
                        </span>
                      </div>
                      <SectionButtons>
                        <ButtonSecondary
                          onClick={() => {
                            setViewContent(0);
                          }}
                        >
                          Rechazar
                        </ButtonSecondary>
                        <ButtonPrimary
                          onClick={() => {
                            setViewContent(3);
                          }}
                        >
                          Autorizar
                        </ButtonPrimary>
                      </SectionButtons>
                    </>
                  )}
                  {isFinishProcess === true && (
                    <div className="position-result-transaction">
                      <h3>Se ha concluido este proceso.</h3>
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 130.2 130.2"
                      >
                        <circle
                          class="path circle"
                          fill="none"
                          stroke="#73AF55"
                          stroke-width="6"
                          stroke-miterlimit="10"
                          cx="65.1"
                          cy="65.1"
                          r="62.1"
                        />
                        <polyline
                          class="path check"
                          fill="none"
                          stroke="#73AF55"
                          stroke-width="6"
                          stroke-linecap="round"
                          stroke-miterlimit="10"
                          points="100.2,40.2 51.5,88.8 29.8,67.5 "
                        />
                      </svg>

                      <span>
                        Este proceso ya no se encuentra disponible, ya que ha
                        concluido o caducado.
                      </span>
                    </div>
                  )}
                </>
              )}
              {viewContent === 3 && (
                <>
                  <h2 style={{ textAlign: "center" }}>
                    Contrato de arrendamiento
                  </h2>
                  <iframe
                    title="Vista Documento Contrato"
                    className="iframe-docx-hfy"
                    src={`https://docs.google.com/gview?url=https://www.unirioja.es/cu/jearansa/1011/ficheros/Tema_1.pdf&embedded=true`}
                  ></iframe>
                  <SectionButtons>
                    <ButtonSecondary
                      onClick={() => {
                        setViewContent(4);
                      }}
                    >
                      Comentarios
                    </ButtonSecondary>
                    <ButtonPrimary
                      onClick={() => {
                        setViewContent(5);
                      }}
                    >
                      Firmar
                    </ButtonPrimary>
                  </SectionButtons>
                </>
              )}
              {viewContent === 4 && (
                <>
                  <div style={{ marginBottom: 15 }}>
                    <span>
                      Si detectaste algún error en tu información, no estas de
                      acuerdo con lo establecido en el contrato o tienes dudas
                      sobre el proceso, ingresa la siguiente información y
                      pronto estaremos contactándote.
                    </span>
                  </div>
                  <div className="register_row">
                    <CustomInput
                      value={dataForm.phoneNumber}
                      suffix={<PhoneOutlined />}
                      placeholder="Teléfono celular"
                      onChange={(e) => {
                        const regexp = /^([0-9])*$/;
                        if (regexp.test(e) === true) {
                          setDataForm({ ...dataForm, phoneNumber: e });
                        }
                      }}
                    />
                  </div>
                  <div className="register_row">
                    <CustomInput
                      value={dataForm.username}
                      suffix={<MailOutlined />}
                      placeholder="Correo electrónico"
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          username: e,
                        });
                      }}
                    />
                  </div>
                  <div className="register_row">
                    <textarea
                      className="textarea-form-modal ant-input"
                      placeholder="Comentarios"
                      value={dataForm.comments}
                      maxlength="1000"
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          comments: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <SectionButtons>
                    <ButtonSecondary
                      onClick={() => {
                        setViewContent(3);
                      }}
                    >
                      Regresar
                    </ButtonSecondary>
                    <ButtonPrimary
                      onClick={() => {
                        setViewContent(6);
                      }}
                    >
                      Enviar
                    </ButtonPrimary>
                  </SectionButtons>
                </>
              )}
              {viewContent === 5 && (
                <>
                  <div
                    id="step_5_contract_signature"
                    className="contract-section-signature"
                    style={{ padding: "0px 5px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="BorderSignature">
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
                    </div>
                    <FlexCenter>
                      <strong>Gerardo Aldair Gonzalez Jimenez</strong>
                    </FlexCenter>
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
                        textAlign: "center",
                        fontSize: 10,
                        color: "black",
                      }}
                    >
                      Acepto los{" "}
                      <a
                        href="https://www.homify.ai/terminos-y-condiciones"
                        target="_blank"
                      >
                        términos y condiciones
                      </a>{" "}
                      a si como el{" "}
                      <a
                        href="https://www.homify.ai/aviso-de-privacidad"
                        target="_blank"
                      >
                        aviso de privacidad
                      </a>{" "}
                      publicados en la{" "}
                      <a href="https://www.homify.ai/" target="_blank">
                        página oficial
                      </a>{" "}
                      de Homify
                    </span>
                    <SectionButtons>
                      <ButtonSecondary
                        type="button"
                        onClick={() => {
                          signatureRef.current.clear();
                          setAceptTerms(false);
                        }}
                      >
                        Limpiar firma
                      </ButtonSecondary>
                      <ButtonPrimary
                        type="button"
                        onClick={async () => {
                          try {
                            if (aceptTerms === true) {
                              setViewContent(7);
                            }
                          } catch (error) {}
                        }}
                        className={aceptTerms === true ? "" : "disabled-button"}
                      >
                        Aceptar
                      </ButtonPrimary>
                    </SectionButtons>
                  </div>
                </>
              )}
              {viewContent === 6 && (
                <>
                  <div className="position-result-transaction">
                    <h3>Comentario enviado</h3>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 130.2 130.2"
                    >
                      <circle
                        class="path circle"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-miterlimit="10"
                        cx="65.1"
                        cy="65.1"
                        r="62.1"
                      />
                      <polyline
                        class="path check"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                      />
                    </svg>

                    <span>
                      Tu información se envío correctamente, pronto nos
                      comunicaremos contigo, agradecemos tu tiempo.
                    </span>
                  </div>
                </>
              )}
              {viewContent === 7 && (
                <>
                  <div className="position-result-transaction">
                    <h3>
                      Se ha concluido el proceso de firma de documento con
                      éxito.
                    </h3>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 130.2 130.2"
                    >
                      <circle
                        class="path circle"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-miterlimit="10"
                        cx="65.1"
                        cy="65.1"
                        r="62.1"
                      />
                      <polyline
                        class="path check"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                      />
                    </svg>

                    <span>
                      Hemos notificado a las personas correspondientes la
                      autorización y firma proporcionadas por tu parte,
                      agradecemos tu tiempo.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignatureDocument);
