import React, { useEffect, useState } from "react";
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
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const { Option } = Select;

const SectionAddUsers = (props) => {
  const { isModalVisible, onClose, spinVisible } = props;
  const frontFunctions = new FrontFunctions();
  const initialDataForm = { emailOwner: null };
  const [dataForm, setDataForm] = useState(initialDataForm);

  const LoadingSpin = <SyncOutlined spin />;

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Agregar Prospectos</h1>
          </div>
          <div className="main-form-information">
            <p>Ingresa la información del Propietario</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailOwner}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailOwner: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.nameOwner}
                  placeholder={"Nombre"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.lastNameOwner}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      lastNameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.mothersLastNameOwner}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      mothersLastNameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <p>Ingresa la información del Inquilino</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailTenant}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailTenant: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Select
                  placeholder="Tipo de persona"
                  value={dataForm.personType}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, personType: value });
                  }}
                >
                  <Option value={1}>Fisica</Option>
                  <Option value={2}>Moral</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.nameTenant}
                  placeholder={
                    dataForm.personType !== 2 ? "Nombre" : "Razon social"
                  }
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameTenant: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            {dataForm.personType !== 2 && (
              <Row>
                <Col span={11}>
                  <Input
                    value={dataForm.lastNameTenant}
                    placeholder={"Apellido paterno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        lastNameTenant: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Input
                    value={dataForm.mothersLastNameTenant}
                    placeholder={"Apellido materno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        mothersLastNameTenant: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            )}
            <p>Ingresa la información del Asesor</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailAdviser}
                  placeholder={"Correo/No Asesor"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.nameAdviser}
                  placeholder={"Nombre"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.lastNameAdviser}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      lastNameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.mothersLastNameAdviser}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      mothersLastNameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Enviar Prospectos</span>
            </button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionAddUsers;
