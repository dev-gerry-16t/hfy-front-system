import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Modal, Row, Col, Select } from "antd";
import { FormModal, ButtonsModal } from "../../constants/styleConstants";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";

const { Option } = Select;

const ComponentAddReference = (props) => {
  const { isModalVisible, onClose } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    emailAddress: null,
    idCustomer: null,
    idInvitation: null,
    mothersMaidenName: null,
    commissionAmount: null,
    isActive: true,
  };
  const [dataForm, setDataForm] = useState(initialForm);

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
        <h1>Agrega una Referencia</h1>
        <p>
          Nos comunicaremos con tu referencia para saber que eres un inquilino
          de confianza
        </p>
        <div>
          <Row>
            <Col span={24}>
              <CustomInputTypeForm
                value={dataForm.givenName}
                placeholder=""
                label="Nombre *"
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
                value={dataForm.givenName}
                placeholder=""
                label="Apellido paterno *"
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
                label="Apellido materno"
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
          <Row>
            <Col span={24}>
              <CustomInputTypeForm
                value={dataForm.lastName}
                placeholder=""
                label="Teléfono"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    lastName: value,
                  });
                }}
                type="number"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <CustomInputTypeForm
                value={dataForm.lastName}
                placeholder=""
                label="Correo *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    lastName: value,
                  });
                }}
                type="number"
              />
            </Col>
          </Row>
        </div>
        <div className="button-action">
          <ButtonsModal
            onClick={() => {
              onClose();
            }}
            primary
          >
            Agregar
          </ButtonsModal>
        </div>
      </FormModal>
    </Modal>
  );
};

export default ComponentAddReference;
