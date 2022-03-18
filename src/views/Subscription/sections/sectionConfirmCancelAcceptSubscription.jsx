import React from "react";
import { Modal } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import { ReactComponent as IconAlertMessage } from "../../../assets/iconSvg/svgFile/iconAlertMessage.svg";

const SectionConfirmCancelAcceptSubscription = (props) => {
  const {
    onCancel,
    onAccept,
    onclose,
    isVisibleModal,
    dataDetail,
    title,
    subTitleMessage,
  } = props;

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
        <h1>{title}</h1>
        {/* <div className="icon-image-send">
          <IconAlertMessage />
        </div> */}
        <h3>{subTitleMessage}</h3>
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

export default SectionConfirmCancelAcceptSubscription;
