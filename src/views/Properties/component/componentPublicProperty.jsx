import React, { useState } from "react";
import { Modal, Row, Col } from "antd";
import styled from "styled-components";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomTextArea from "../../../components/customTextArea";
import { ReactComponent as IconStyleCheck } from "../../../assets/iconSvg/svgFile/iconStyleCheck.svg";

const ComponentPublicProperty = (props) => {
  const { isModalVisible, onClose, onPublicProperty } = props;
  const initialForm = {
    isPublished: null,
    title: null,
    description: null,
  };
  const [finishInvitation, setFinishInvitation] = useState(false);
  const [dataForm, setDataForm] = useState(initialForm);

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
            <h1>Pública tu inmueble</h1>
            <p>
              Tu inmueble será publicado en las plataformas que elijas con la
              información que ingreses en los siguientes campos
            </p>
            <div>
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.title}
                    placeholder=""
                    label="Titulo del anuncio"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        title: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomTextArea
                    value={dataForm.description}
                    placeholder=""
                    label="Descripción"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        description: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
            <div className="image-platforms">
              <label className="input-checkbox">
                <input
                  type="checkbox"
                  id="cbox1"
                  value="first_checkbox"
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      isPublished: e.target.checked,
                    });
                  }}
                />{" "}
                <img
                  height="30"
                  src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.jpg"
                  alt=""
                />
              </label>
            </div>
            <div className="button-action">
              {dataForm.isPublished === true && (
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      await onPublicProperty(dataForm);
                      setDataForm(initialForm);
                      setFinishInvitation(true);
                    } catch (error) {}
                  }}
                >
                  Publicar
                </ButtonsModal>
              )}
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
              <IconStyleCheck />
            </div>
            <h2>El inmueble ha sido publicado</h2>
            <p
              style={{
                padding: "0px 4em",
                textAlign: "center",
                fontSize: "1em",
              }}
            >
              Ahora podrás ver tu inmueble publicado en las siguientes
              plataformas
            </p>
            <div
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              <img
                height="30"
                src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.jpg"
                alt=""
              />
            </div>
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

export default ComponentPublicProperty;
