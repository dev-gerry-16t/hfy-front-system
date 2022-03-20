import React from "react";
import { Modal } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import { ReactComponent as IconAlertMessage } from "../../../assets/iconSvg/svgFile/iconAlertMessage.svg";

const SectionConfirmPaymentMethod = (props) => {
  const { onCancel, onAccept, onclose, isVisibleModal } = props;

  return (
    <Modal
      visible={isVisibleModal}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onclose();
      }}
    >
      <FormModal>
        <h1>Se requiere un método de pago</h1>
        {/* <div className="icon-image-send">
          <IconAlertMessage />
        </div> */}
        <h3>Nos complace saber que deseas uno de nuestros paquetes, para disfrutar de los beneficios es necesario ingresar un método de pago.</h3>
        <div
          className="button-action"
          style={{
            marginTop: "2em",
          }}
        >
          <ButtonsModal primary={false} onClick={onCancel}>
            Cancelar
          </ButtonsModal>
          <ButtonsModal primary onClick={onAccept}>
            Ingresar Método de pago
          </ButtonsModal>
        </div>
      </FormModal>
    </Modal>
  );
};

export default SectionConfirmPaymentMethod;
