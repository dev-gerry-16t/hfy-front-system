import React from "react";
import { Modal } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import { ReactComponent as IconAlertMessage } from "../../../assets/iconSvg/svgFile/iconAlertMessage.svg";

const SectionConfirmChangeSubscription = (props) => {
  const { onCancel, onAccept, onclose, isVisibleModal, dataDetail } = props;

  const handlerGetMessage = (text) => {
    let message = "";
    switch (text) {
      case "C0":
        message =
          "Si actualizas ahora perderás todos los beneficios actuales de tu suscripción.";
        break;
      case "C1":
        message =
          "Si actualizas ahora aplicaremos un ajuste, por lo que es posible que el monto que veas en tu próximo ciclo de facturación sea menor.";
        break;
      case "C2":
        message =
          "Si actualizas ahora aplicaremos un ajuste, por lo que es posible que el monto que veas en tu próximo ciclo de facturación sea mayor.";
        break;
      case "C3":
        message =
          "Si cancelas ahora mantendremos todos tus beneficios hasta el termino de tu suscripción y después de ello pasarás a una suscripción gratuita.";
        break;

      default:
        message =
          "¿Estas completamente seguro de cambiar tu paquete contratado?";
        break;
    }
    return message;
  };

  return (
    <Modal
      visible={isVisibleModal}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onclose();
      }}
    >
      <FormModal>
        <h1>Cambio de paquete</h1>
        {/* <div className="icon-image-send">
          <IconAlertMessage />
        </div> */}
        <h3>{handlerGetMessage(dataDetail.acceptedCode)}</h3>
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
            Continuar
          </ButtonsModal>
        </div>
      </FormModal>
    </Modal>
  );
};

export default SectionConfirmChangeSubscription;
