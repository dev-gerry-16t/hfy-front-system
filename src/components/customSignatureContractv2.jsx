import React, { useState, useRef } from "react";
import isNil from "lodash/isNil";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";
import { Checkbox, Modal } from "antd";
import ComponentLoadSection from "./componentLoadSection";

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const CustomSignatureContractV2 = ({
  isModalVisible,
  name,
  onSignContract,
  titleSectionSignature,
  componentTerms,
  onClose,
}) => {
  const [viewSignatureMovement, setViewSignatureMovement] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [signature, setSignature] = useState("");

  const signatureRef = useRef(null);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
      className="modal-signature-contract"
    >
      <ComponentLoadSection
        isLoadApi={isLoadApi}
        position="absolute"
        text="Generando..."
      >
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
                          setIsLoadApi(true);
                          await onSignContract({
                            isFaceToFace: false,
                            digitalSignature: signature,
                          });
                          signatureRef.current.clear();
                          setIsLoadApi(false);
                          setAceptTerms(false);
                          setViewSignatureMovement(false);
                          onClose();
                        }
                      } catch (error) {
                        setIsLoadApi(false);
                      }
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
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <ButtonDocument
            primary
            onClick={() => {
              signatureRef.current.clear();
              setAceptTerms(false);
              setViewSignatureMovement(false);
              onClose();
            }}
          >
            Cerrar
          </ButtonDocument>
        </div>
      </ComponentLoadSection>
    </Modal>
  );
};

export default CustomSignatureContractV2;
