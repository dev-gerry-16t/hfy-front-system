import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col, Tooltip, Modal } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";

const WidgetModalConfirmation = (props) => {
  const { data, isVisibleModal, onClose, onNextStep, finish = false } = props;
  return (
    <Modal
      style={{ top: 70 }}
      visible={isVisibleModal}
      closable={true}
      footer={false}
      onCancel={() => {
        onClose();
      }}
    >
      <FormModal>
        <h1>Información incompleta</h1>
        <p>
          <strong>Los siguientes campos son requeridos:</strong>
        </p>
        <div>
          {isEmpty(data) === false &&
            data.map((row) => {
              return <div>{row.label}</div>;
            })}
        </div>
        <div className="button-action-row">
          <ButtonsModal
            primary
            onClick={async () => {
              try {
                onClose();
              } catch (error) {}
            }}
          >
            Completar
          </ButtonsModal>
          {finish === false && (
            <ButtonsModal
              onClick={() => {
                onClose();
                onNextStep();
              }}
            >
              Avanzar >>
            </ButtonsModal>
          )}
        </div>
      </FormModal>
    </Modal>
  );
};

export default WidgetModalConfirmation;
