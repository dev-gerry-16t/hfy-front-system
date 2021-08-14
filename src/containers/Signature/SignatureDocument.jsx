import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import "antd/dist/antd.css";
import { Checkbox, message, Spin } from "antd";
import { PhoneOutlined, SyncOutlined } from "@ant-design/icons";
import {
  callSetRequestExternalDS,
  callGetRequestExternalDS,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import logo from "../../assets/img/logo.png";
import CustomInput from "../../components/CustomInput";

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

const SignatureDocument = (props) => {
  const { callSetRequestExternalDS, callGetRequestExternalDS, match } = props;
  const [viewContent, setViewContent] = useState(1);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [signature, setSignature] = useState("");
  const [isFinishProcess, setIsFinishProcess] = useState(false);
  const [isSendCommentReject, setIsSendCommentReject] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);
  const [dataForm, setDataForm] = useState({
    phoneNumber: null,
    bucketSource: null,
    documentList: [],
    idDocument: null,
    idExternalUserInDC: null,
    isEditable: null,
    digitalSignature: null,
    rejectRequest: null,
    isBadData: null,
    comment: null,
    type: null,
  });

  const signatureRef = useRef(null);

  const LoadingSpin = <SyncOutlined spin />;

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const handlerCallGetRequestExternalDS = async (data) => {
    try {
      setSpinVisible(true);
      const response = await callGetRequestExternalDS({
        idExternalUserInDC: data.id,
        type: data.type,
        idDocumentType: data.idDocumentType,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      const documentList =
        isNil(responseResult.documentList) === false
          ? JSON.parse(responseResult.documentList)
          : [];
      setIsFinishProcess(!responseResult.isEditable);
      setDataForm({
        ...dataForm,
        ...responseResult,
        documentList:
          isNil(documentList) === false && isNil(documentList[0]) === false
            ? documentList[0]
            : {},
        type: documentList[0].type,
        idDocumentType: documentList[0].idDocumentType,
      });
      setSpinVisible(false);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetRequestExternalDS = async (data) => {
    const {
      idExternalUserInDC,
      digitalSignature,
      rejectRequest,
      isBadData,
      comment,
      phoneNumber,
      type,
    } = data;
    try {
      setSpinVisible(true);
      await callSetRequestExternalDS(
        {
          digitalSignature,
          rejectRequest,
          isBadData,
          comment,
          phoneNumber,
          type,
        },
        idExternalUserInDC
      );
      showMessageStatusApi(
        "Tu solicitud se procesó exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      setSpinVisible(false);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    const params =
      isEmpty(match.params) === false &&
      isNil(match.params.idExternalUserInDC) === false
        ? match.params.idExternalUserInDC
        : null;
    handlerCallGetRequestExternalDS({
      id: params,
      type: null,
      idDocumentType: null,
    });
  }, []);

  return (
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Homify Logo" className="login_logo" />
      </div>
      <div className="login_main">
        <div className="login_card_form" style={{ padding: "10px 5px" }}>
          <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
            <div className="register_holder">
              <div
                className="login_top_form"
                style={{ fontFamily: "Poppins", fontSize: 14 }}
              >
                <h1>Firma digital </h1>
                {viewContent === 0 && (
                  <>
                    {isSendCommentReject === true && (
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
                          Notificaremos que has rechazado la firma del
                          documento, agradecemos tu tiempo.
                        </span>
                      </div>
                    )}
                    {isSendCommentReject === false && (
                      <>
                        <div style={{ marginBottom: 15 }}>
                          <span>
                            Dejanos tus comentarios para saber el motivo de tu
                            rechazo de firma y dar seguimiento a la situación.
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
                          <textarea
                            className="textarea-form-modal ant-input"
                            placeholder="Comentarios"
                            value={dataForm.comments}
                            maxlength="1000"
                            onChange={(e) => {
                              setDataForm({
                                ...dataForm,
                                comment: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <SectionButtons>
                          <ButtonSecondary
                            onClick={() => {
                              setViewContent(1);
                              setDataForm({
                                ...dataForm,
                                phoneNumber: "",
                                comment: "",
                              });
                            }}
                          >
                            Regresar
                          </ButtonSecondary>
                          <ButtonPrimary
                            onClick={async () => {
                              try {
                                await handlerCallSetRequestExternalDS({
                                  idExternalUserInDC:
                                    dataForm.idExternalUserInDC,
                                  digitalSignature: null,
                                  rejectRequest: true,
                                  isBadData: false,
                                  comment: dataForm.comment,
                                  phoneNumber: dataForm.phoneNumber,
                                  type: dataForm.type,
                                });
                                setIsSendCommentReject(true);
                              } catch (error) {}
                            }}
                          >
                            Enviar
                          </ButtonPrimary>
                        </SectionButtons>
                      </>
                    )}
                  </>
                )}
                {viewContent === 1 && (
                  <>
                    {isFinishProcess === false && (
                      <>
                        {" "}
                        <div>
                          <InformationLabel>
                            <strong>Nombre:</strong>
                            <span>
                              {isEmpty(dataForm.documentList) === false
                                ? dataForm.documentList.fullName
                                : ""}
                            </span>
                          </InformationLabel>
                          <InformationLabel>
                            <strong>Tipo de usuario:</strong>
                            <span>
                              {isEmpty(dataForm.documentList) === false
                                ? dataForm.documentList.externalUserType
                                : ""}
                            </span>
                          </InformationLabel>
                          <InformationLabel>
                            <strong>Documento:</strong>
                            <span>
                              {isEmpty(dataForm.documentList) === false
                                ? dataForm.documentList.documentName
                                : ""}
                            </span>
                          </InformationLabel>
                        </div>
                        <div style={{ margin: "25px 0px 10px 0px" }}>
                          <span>
                            Para continuar con el proceso de firma de documento
                            es necesario autorizar la solicitud.
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
                            onClick={async () => {
                              try {
                                await handlerCallGetRequestExternalDS({
                                  id: dataForm.idExternalUserInDC,
                                  type: dataForm.type,
                                  idDocumentType: dataForm.idDocumentType,
                                });
                                setViewContent(3);
                              } catch (error) {}
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
                      {isEmpty(dataForm.documentList) === false
                        ? dataForm.documentList.documentName
                        : ""}
                    </h2>
                    <iframe
                      title="Vista Documento Contrato"
                      className="iframe-docx-hfy"
                      src={`https://docs.google.com/gview?url=${ENVIROMENT}${dataForm.url}&embedded=true`}
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
                      <textarea
                        className="textarea-form-modal ant-input"
                        placeholder="Comentarios"
                        value={dataForm.comments}
                        maxlength="1000"
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            comment: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <SectionButtons>
                      <ButtonSecondary
                        onClick={() => {
                          setViewContent(3);
                          setDataForm({
                            ...dataForm,
                            phoneNumber: "",
                            comment: "",
                          });
                        }}
                      >
                        Regresar
                      </ButtonSecondary>
                      <ButtonPrimary
                        onClick={async () => {
                          try {
                            await handlerCallSetRequestExternalDS({
                              idExternalUserInDC: dataForm.idExternalUserInDC,
                              digitalSignature: null,
                              rejectRequest: false,
                              isBadData: true,
                              comment: dataForm.comment,
                              phoneNumber: dataForm.phoneNumber,
                              type: dataForm.type,
                            });
                            setViewContent(6);
                          } catch (error) {}
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
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                        <strong>
                          {isEmpty(dataForm.documentList) === false
                            ? dataForm.documentList.fullName
                            : ""}
                        </strong>
                      </FlexCenter>
                      <Checkbox
                        checked={aceptTerms}
                        onChange={(e) => {
                          const signatureCurrent = signatureRef.current;
                          if (signatureCurrent.isEmpty() === false) {
                            setAceptTerms(e.target.checked);
                            const signatureBase64 =
                              signatureCurrent.toDataURL();
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
                                await handlerCallSetRequestExternalDS({
                                  idExternalUserInDC:
                                    dataForm.idExternalUserInDC,
                                  digitalSignature: signature,
                                  rejectRequest: false,
                                  isBadData: false,
                                  comment: null,
                                  phoneNumber: null,
                                  type: dataForm.type,
                                });
                                setViewContent(7);
                              }
                            } catch (error) {}
                          }}
                          className={
                            aceptTerms === true ? "" : "disabled-button"
                          }
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
          </Spin>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  callSetRequestExternalDS: (data, id) =>
    dispatch(callSetRequestExternalDS(data, id)),
  callGetRequestExternalDS: (data) => dispatch(callGetRequestExternalDS(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignatureDocument);
