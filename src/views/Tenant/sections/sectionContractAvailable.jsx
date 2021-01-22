import React, { useState, useEffect, useRef } from "react";
import isNil from "lodash/isNil";
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
  const { isModalVisible, onClose } = props;
  const [signature, setSignature] = useState("");
  const [openSection, setOpenSection] = useState(1);
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
              } else {
                setOpenSection(1);
                signatureRef.current.clear();
              }
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
            }}
          >
            <img src={ChatContract} alt="backTo" width="30" />
          </button>
        </div>
        <div className="main-form-information">
          <div className="contract-card-information">
            {openSection === 1 && (
              <div className="contract-children-information">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                alias distinctio ab debitis magni perferendis sapiente? Facilis
                eos quos optio, totam deserunt ad reprehenderit minus. Laborum
                corrupti aperiam quisquam sit. Voluptatum, ducimus sequi
                blanditiis vel libero facere exercitationem iste et obcaecati
                asperiores magnam possimus voluptatem quam tempora quisquam sed
                eveniet quae amet quaerat unde molestias? Qui vitae fugit
                ratione deserunt! Fugit mollitia, dolorem vitae facere, eos non
                reprehenderit dicta voluptate quidem voluptatum ipsam quaerat,
                fugiat error qui voluptatem quis iste ducimus ad exercitationem
                veritatis possimus soluta quos cumque. Assumenda, esse!
                Repellendus architecto eveniet doloribus quia molestias, porro
                beatae quas quibusdam reprehenderit iusto. Facere laboriosam
                nemo hic est obcaecati tempore! Vero minima nostrum officiis
                exercitationem nemo animi harum a tempora eum. Sunt nobis
                voluptate officia architecto autem? Aperiam ipsam ipsum magnam,
                minus tempora illo nisi animi maxime voluptate, neque sint harum
                consequuntur, corporis quas! Voluptas alias perferendis
                temporibus autem, odit velit. Natus tenetur sint voluptatum
                ullam illum nulla, suscipit eaque corrupti voluptas error quae
                excepturi, vel alias provident quas beatae voluptate illo iure
                quos? Et alias eaque placeat molestias impedit fugiat.
                Exercitationem commodi, corrupti porro asperiores provident, hic
                mollitia facere debitis autem numquam, reiciendis molestias
                libero enim iure sint delectus placeat quam amet harum sit
                distinctio nobis incidunt necessitatibus vero! Quisquam!
                Provident distinctio asperiores cumque, minus magnam ex impedit
                omnis, maxime temporibus facere exercitationem voluptatem.
                Temporibus, autem sed. Repudiandae voluptatum vel deserunt qui
                officiis quasi tempora expedita, magnam similique molestiae
                esse! Quibusdam perferendis, in eum velit corrupti dicta
                similique assumenda autem ipsum nesciunt. Unde quaerat
                consectetur quos enim, iste ipsa dicta doloribus quasi
                consequatur architecto, earum dolore soluta fugiat in
                aspernatur. Ipsum voluptatum quo autem, architecto earum
                pariatur accusamus ea perspiciatis quas labore debitis quia
                totam. Temporibus blanditiis similique totam vitae? Velit itaque
                quas, aliquam perferendis dolorem porro necessitatibus.
                Consequuntur, ad!
              </div>
            )}
            {openSection === 2 && (
              <div className="contract-section-signature">
                <p style={{ fontSize: "12px" }}>
                  Firma dentro del reacuadro negro
                </p>
                <div className="signature">
                  <SignatureCanvas
                    penColor="green"
                    canvasProps={{
                      width: 320,
                      height: 150,
                      className: "sigCanvas",
                    }}
                    ref={signatureRef}
                  />
                </div>
                <div className="conditions-name">
                  <strong>GERARDO ALDAIR GONZALEZ JIMENEZ</strong>
                </div>
                <Checkbox onChange={() => {}}></Checkbox>
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
              </div>
            )}
          </div>
        </div>
        {openSection === 1 && (
          <div className="two-action-buttons">
            <button type="button" onClick={() => {}}>
              <span>Descargar contrato</span>
            </button>
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
              }}
            >
              <span>Limpiar firma</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const signatureBase64 = signatureRef.current.toDataURL();
                setSignature(signatureBase64);
              }}
            >
              <span>Aceptar</span>
            </button>
          </div>
        )}
        {openSection === 3 && (
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Enviar</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SectionContractAvailable;
