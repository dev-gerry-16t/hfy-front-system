import React, { useState } from "react";
import { Modal, Row, Col } from "antd";
import styled from "styled-components";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import { ReactComponent as IconSendInvitation } from "../../../assets/iconSvg/svgFile/iconSendInvitation.svg";

const ComponentAddCandidate = (props) => {
  const { isModalVisible, onClose, sendInvitation } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    emailAddress: null,
    idCustomer: null,
    idInvitation: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [finishInvitation, setFinishInvitation] = useState(false);

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <FormModal>
        {finishInvitation === false && (
          <>
            <h1>Agrega a tu candidato</h1>
            <p>
              Se le enviará una notificación a tu candidato para ser invitado a
              conocer esta propiedad
            </p>
            <div>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.emailAddress}
                    placeholder=""
                    label="Correo electrónico"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        emailAddress: value,
                      });
                    }}
                    type="email"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.givenName}
                    placeholder=""
                    label="Nombre"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        givenName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.lastName}
                    placeholder=""
                    label="Apellido paterno"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        lastName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
            <div className="button-action">
              <ButtonsModal
                primary
                onClick={async () => {
                  try {
                    await sendInvitation({
                      customerTenantInvitation: JSON.stringify(dataForm),
                    });
                    setDataForm(initialForm);
                    setFinishInvitation(true);
                  } catch (error) {}
                }}
              >
                Enviar invitación
              </ButtonsModal>
              <ButtonsModal
                onClick={() => {
                  onClose();
                }}
              >
                Cancelar
              </ButtonsModal>
            </div>
          </>
        )}
        {finishInvitation === true && (
          <>
            <h1>¡Todo está listo!</h1>
            <div className="icon-image-send">
              <IconSendInvitation />
            </div>
            <h2>La invitación ha sido enviada</h2>
            <p
              style={{
                padding: "0px 8em",
                textAlign: "justify",
                fontSize: "1em",
              }}
            >
              El candidato ha sido notificado, te deseamos mucho exito en tu
              proceso
            </p>
            <div className="button-action">
              <ButtonsModal
                onClick={() => {
                  onClose();
                  setFinishInvitation(false);
                }}
                primary
              >
                Cerrar
              </ButtonsModal>
            </div>
          </>
        )}
      </FormModal>
    </Modal>
  );
};

export default ComponentAddCandidate;
