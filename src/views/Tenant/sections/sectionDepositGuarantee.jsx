import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import ReactPlayer from "react-player";
import { Modal, Row, Col, Input } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";
import admiration from "../../../assets/icons/exclaim.svg";
import ENVIROMENT from "../../../utils/constants/enviroments";
import CustomSignatureContract from "../../../components/customSignatureContract";

const SectionDepositGuarantee = (props) => {
  const {
    isModalVisible,
    onClose,
    dataLoan,
    handlerCallUpdateCustomerLoan,
    handlerCallGetCustomerLoanProperties,
    onSearchBank,
    dataBank,
  } = props;

  const initialForm = {
    idBank: null,
    idBankText: null,
    accountHolder: null,
    clabeNumber: null,
  };

  const [openSection, setOpenSection] = useState(1);
  const [dataProperties, setDataProperties] = useState({});
  const [isCorrectClabe, setIsCorrectClabe] = useState(null);
  const [dataForm, setDataForm] = useState(initialForm);

  const parseDataClabe = (str) => {
    if (isNil(str) === false) {
      const bank = str.slice(0, 3);
      if (bank.length === 3) {
        onSearchBank(bank);
      } else if (bank.length < 3) {
        onSearchBank("000");
      }
    }
  };

  useEffect(() => {
    if (isEmpty(dataBank) === false) {
      setDataForm({
        ...dataForm,
        idBank: dataBank[0].idBank,
        idBankText: dataBank[0].bankName,
      });
      setIsCorrectClabe(true);
    } else {
      setDataForm({
        ...dataForm,
        idBank: null,
        idBankText: null,
      });
      if (isEmpty(dataForm.clabeNumber) === false) {
        setIsCorrectClabe(false);
      }
    }
  }, [dataBank]);

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
              setOpenSection(1);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>
            {openSection === 1 && "Depósito en garantía"}
            {openSection === 3 && "Contrato de depósito en garantía"}
            {openSection === 4 && "¿Cómo funciona?"}
          </h1>
          {/* {openSection === 1 && (
            <button
              className="chat-contract-icon"
              type="button"
              onClick={() => {
                setOpenSection(3);
              }}
              style={{
                border: "1px solid var(--color-primary)",
                borderRadius: "5px",
              }}
            >
              <span style={{ fontSize: 15 }}>?</span>
            </button>
          )} */}
        </div>
        <div className="main-form-information-guarantee">
          {openSection === 1 && (
            <>
              <div className="policy-information-modal">
                <span>
                  <strong>¡Homify paga por ti!</strong>
                  <p style={{ marginTop: 10 }}>
                    Eres candidat@ a obtener el beneficio de ausentar el pago
                    por concepto de <strong>Depósito en garantía</strong>, a
                    continuación te presentamos la información para hacer valido
                    tu beneficio.
                  </p>
                </span>
              </div>
              <span>
                Para obtener el beneficio es necesario pagar un monto mensual
                equivalente al{" "}
                <strong>{dataLoan.commissionForLoan} + IVA mensual</strong>{" "}
                sobre el monto de renta descrito en tu contrato.
              </span>
              <Row style={{ marginTop: 10 }}>
                <Col
                  span={24}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  className="total-advancement-amount"
                >
                  <div className="content-amount">
                    <p>Monto mensual a pagar</p>
                    <div>
                      <h2>
                        {isEmpty(dataLoan) === false
                          ? `${dataLoan.commissionForLoanAmount} + IVA`
                          : "$ 0.00 MXN"}
                      </h2>
                    </div>
                  </div>
                </Col>
              </Row>
              <div style={{ marginBottom: 10 }}>
                <span>Si estás de acuerdo haz clic en Aceptar.</span>
              </div>
            </>
          )}

          {openSection === 3 && (
            <div className="value-calculator-policy">
              <CustomSignatureContract
                srcIframe={`https://docs.google.com/gview?url=${ENVIROMENT}${dataProperties.url}&embedded=true`}
                cancelButton={() => {
                  setOpenSection(1);
                  onClose();
                }}
                finishButton={() => {
                  setOpenSection(5);
                  setTimeout(() => {
                    onClose();
                  }, 6000);
                }}
                textSignature="Antes de dar clic en 'Firmar' te recomendamos leer detenidamente tu contrato."
                titleCustom=""
                titleSectionSignature="Firma de Contrato"
                componentTerms={
                  <span
                    style={{
                      marginLeft: 5,
                      textAlign: "center",
                      fontSize: 10,
                      color: "black",
                      marginBottom: 10,
                    }}
                  >
                    Acepto los términos publicados en la pagina{" "}
                    <a
                      href="https://www.homify.ai/aviso-de-privacidad"
                      target="__blank"
                    >
                      https://www.homify.ai/aviso-de-privacidad
                    </a>{" "}
                    así como lo descrito en el contrato
                  </span>
                }
                name={dataProperties.fullNameTenant}
                onSignContract={async (data) => {
                  try {
                    await handlerCallUpdateCustomerLoan(
                      {
                        ...data,
                        ...dataForm,
                        idCustomerTenant: dataLoan.idCustomerTenant,
                        isAccepted: true,
                      },
                      dataLoan.idContract
                    );
                  } catch (error) {
                    throw error;
                  }
                }}
              />
            </div>
          )}
          {openSection === 4 && (
            <div className="video-how-functionaly">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=5UBYS7DEiAk"
                width="100%"
                height="200px"
              />
            </div>
          )}
          {openSection === 5 && (
            <div className="main-form-information">
              <p style={{ textAlign: "center" }}>
                ¡Tu solicitud se procesó exitosamente!
              </p>
              <div className="position-result-transaction">
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
              </div>
              <span style={{ fontFamily: "Poppins" }}>
                Una vez terminado el proceso de arrendamiento pagaremos el{" "}
                <strong>Depósito en garantía</strong> a tu arrendador.
              </span>
            </div>
          )}
        </div>
        {openSection === 1 && (
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={async () => {
                try {
                  await handlerCallUpdateCustomerLoan(
                    {
                      digitalSignature: null,
                      idCustomerTenant: dataLoan.idCustomerTenant,
                      isAccepted: false,
                      idBank: null,
                      clabeNumber: null,
                      accountHolder: null,
                    },
                    dataLoan.idContract
                  );
                  onClose();
                } catch (error) {
                  throw error;
                }
              }}
            >
              <span>Rechazar</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                const {
                  idContract,
                  idDocument,
                  idDocumentType,
                  idPreviousDocument,
                  bucketSource,
                } = dataLoan;
                try {
                  const dataGet = await handlerCallGetCustomerLoanProperties({
                    idContract,
                    idDocument,
                    idDocumentType,
                    idPreviousDocument,
                    bucketSource,
                  });
                  setDataProperties(dataGet);
                  setOpenSection(3);
                } catch (error) {}
              }}
            >
              <span>Aceptar</span>
            </button>
          </div>
        )}
        {openSection === 4 && (
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                setOpenSection(2);
              }}
            >
              <span>Autorizar</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SectionDepositGuarantee;
