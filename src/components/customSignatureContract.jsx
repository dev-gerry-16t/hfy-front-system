import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Checkbox } from "antd";

const CustomSignatureContract = ({
  srcIframe,
  cancelButton,
  name,
  onSignContract,
  titleCustom,
  titleSectionSignature,
  componentTerms,
}) => {
  const [viewSignatureMovement, setViewSignatureMovement] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [signature, setSignature] = useState("");

  const signatureRef = useRef(null);

  return viewSignatureMovement === false ? (
    <>
      <h1>{titleCustom}</h1>
      <iframe className="iframe-docx-hfy" src={srcIframe}></iframe>
      <span>
        Antes de dar clic en "Firmar" te recomendamos leer detenidamente tu
        contrato de servicio.
      </span>
      <div className="two-action-buttons-banner" style={{ marginTop: 25 }}>
        <button type="button" onClick={cancelButton}>
          <span>Ahora no</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setViewSignatureMovement(true);
          }}
        >
          <span>Firmar</span>
        </button>
      </div>
    </>
  ) : (
    <div className="form-modal">
      <div className="main-form-information">
        <div className="contract-card-information-dialog">
          <div
            id="step_5_contract_signature"
            className="contract-section-signature"
          >
            <p style={{ fontSize: "18px" }}>{titleSectionSignature}</p>
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
              <strong>{name}</strong>
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
            {componentTerms}
            <div className="two-action-buttons" style={{ marginTop: 10 }}>
              <button
                type="button"
                onClick={() => {
                  signatureRef.current.clear();
                  setAceptTerms(false);
                }}
              >
                <span>Limpiar</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    if (aceptTerms === true) {
                      await onSignContract({
                        isFaceToFace: false,
                        digitalSignature: signature,
                      });
                      signatureRef.current.clear();
                      setAceptTerms(false);
                      setViewSignatureMovement(false);
                      cancelButton();
                    }
                  } catch (error) {}
                }}
                className={aceptTerms === true ? "" : "disabled-button"}
              >
                <span>Aceptar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSignatureContract;
