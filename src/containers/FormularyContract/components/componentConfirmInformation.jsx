import React, { useState } from "react";
import { Modal } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import { ReactComponent as IconForm } from "../../../assets/iconSvg/svgFile/iconForm.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";

const ComponentConfirmInformation = (props) => {
  const { isModalVisible, onClose, onSendConfirmation } = props;
  const [isLoadApi, setIsLoadApi] = useState(false);

  return (
    <Modal
      visible={isModalVisible}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onClose();
      }}
    >
      <FormModal>
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          <h1>Confirma tu información</h1>
          <div className="icon-image-send">
            <IconForm />
          </div>
          <h2>¿Deseas confirmar tu información?</h2>
          <p>
            Por favor considera que una vez que confirmes tu información no
            podrás realizar cambios, a excepción de tu información bancaria y de
            contacto
          </p>
          <div className="button-action">
            <ButtonsModal
              onClick={async () => {
                try {
                  setIsLoadApi(true);
                  await onSendConfirmation();
                  onClose();
                  setIsLoadApi(false);
                } catch (error) {
                  setIsLoadApi(false);
                }
              }}
              primary
            >
              Confirmar
            </ButtonsModal>
          </div>
        </ComponentLoadSection>
      </FormModal>
    </Modal>
  );
};

export default ComponentConfirmInformation;
