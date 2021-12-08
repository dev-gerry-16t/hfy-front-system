import React from "react";
import styled from "styled-components";
import isNil from "lodash/isNil";
import { Payment } from "../constants/styleConstants";

const SectionSpeiPayment = (props) => {
  const { dataPayment } = props;

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {},
      (err) => {}
    );
  };

  const parseNumberClabe = (num) => {
    let numClabe = "";
    if (isNil(num) === false) {
      const num1 = num.slice(0, 4);
      const num2 = num.slice(4, 8);
      const num3 = num.slice(8, 12);
      const num4 = num.slice(12, 16);
      const num5 = num.slice(16, 18);
      numClabe = `${num1} ${num2} ${num3} ${num4} ${num5}`;
    }
    return numClabe;
  };

  return (
    <Payment>
      <div className="icon-method">
        <img
          src="https://homify-docs-users.s3.us-east-2.amazonaws.com/favicon-64.png"
          alt="icon-homify"
          width="45px"
        />
        <h1>Transferencia SPEI</h1>
      </div>
      <div className="steps-yo-pay">
        <p
          style={{
            marginBottom: "20px",
          }}
        >
          1.- Inicia una transferencia desde tu banca en línea o app de tu
          banco.
        </p>
        <p>2.- Ingresa los siguientes datos.</p>
        <div
          className="card-data-bank"
          style={{
            marginBottom: "20px",
          }}
        >
          <div className="info-bank">
            <span>Nombre del beneficiario</span>
            <strong>{dataPayment.beneficiary}</strong>
          </div>
          <div className="info-bank">
            <span>CLABE interbancaria</span>
            <strong>
              {parseNumberClabe(dataPayment.clabe)}{" "}
              <i
                className="fa fa-clone"
                style={{
                  fontSize: 18,
                  color: "#6E7191",
                  cursor: "pointer",
                }}
                onClick={() => {
                  copyTextToClipboard(dataPayment.clabe);
                }}
              />
            </strong>
          </div>
          <div className="info-bank">
            <span>Banco</span>
            <strong>{dataPayment.bank}</strong>
          </div>
        </div>
        <p>
          3.- Ingresa el monto a pagar y finaliza la operación. Puedes guardar
          tu comprobante de pago o una captura de pantalla en caso de requerir
          alguna aclaración.
        </p>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <strong>
            ¡Listo! Finalmente recibirás una notificación por tu pago
          </strong>
        </div>
      </div>
    </Payment>
  );
};

export default SectionSpeiPayment;
