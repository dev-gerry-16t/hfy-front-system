import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Modal, Input, Row, Col, Select, Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const SectionAddTenant = (props) => {
  const {
    isModalVisible,
    onClose,
    onClickAddProperty,
    spinVisible,
    dataPersonType,
    dataCatalogProperty,
    onChangeSelectProperty,
    dataDepartment,
  } = props;
  const initialDataForm = {
    idApartment: null,
    idPersonType: null,
    givenName: null,
    email: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [property, setProperty] = useState(null);

  const LoadingSpin = <SyncOutlined spin />;

  return (
    <Modal visible={isModalVisible} closable={false} footer={false}>
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
            <h1>Invitar inquilino</h1>
          </div>
          <div className="main-form-information">
            <p>Enviaremos una solicitud al inquilino invitado</p>
            <Row>
              <Col span={24}>
                <Select
                  placeholder="Propiedad"
                  value={property}
                  onChange={(value, option) => {
                    setProperty(value);
                    onChangeSelectProperty(value);
                  }}
                >
                  {isEmpty(dataCatalogProperty) === false &&
                    dataCatalogProperty.map((row) => {
                      return <Option value={row.id}>{row.text}</Option>;
                    })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Tipo de persona"
                  value={dataForm.idPersonType}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, idPersonType: value });
                  }}
                >
                  {isEmpty(dataPersonType) === false &&
                    dataPersonType.map((row) => {
                      return <Option value={row.id}>{row.text}</Option>;
                    })}
                </Select>
              </Col>
              <Col
                span={2}
                xs={{ span: 24 }}
                md={{ span: 2 }}
                style={{ marginBottom: "15px" }}
              />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Departamento"
                  value={dataForm.idApartment}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, idApartment: value });
                  }}
                >
                  {isEmpty(dataDepartment) === false &&
                    dataDepartment.map((row) => {
                      return <Option value={row.id}>{row.text}</Option>;
                    })}
                </Select>
              </Col>
            </Row>
            <p>Datos del inquilino</p>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.givenName}
                  placeholder={"Nombre del inquilino"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      givenName: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.email}
                  placeholder={"Correo electrónico del inquilino"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      email: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                onClickAddProperty(dataForm);
                setDataForm(initialDataForm);
              }}
            >
              <span>Invitar inquilino</span>
            </button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionAddTenant;
