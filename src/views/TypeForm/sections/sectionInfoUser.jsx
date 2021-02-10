import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
  Tooltip,
  Radio,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const SectionInfoUser = (props) => {
  const { onClickNext, dataFormSave, dataNationalities, dataIdTypes } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
    taxId: null,
    citizenId: null,
    hasCar: null,
    carriagePlate: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ textAlign: "center" }}
    >
      <strong className="site-description-item-profile-p-label">{title}</strong>
      <br />
      {content}
    </div>
  );

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información personal"
          : "Confirmar Información Personal"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <Input
                  value={dataForm.givenName}
                  placeholder={"Nombres"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, givenName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.lastName}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, lastName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.mothersMaidenName}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, mothersMaidenName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.phoneNumber}
                  placeholder={"Telefono"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, phoneNumber: value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.emailAddress}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, emailAddress: value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.taxId}
                  placeholder={"RFC con Homoclave"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, taxId: value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.citizenId}
                  placeholder={"CURP"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, citizenId: value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span style={{ color: "#ff0282", fontWeight: "bold" }}>
                    Tienes Auto
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, hasCar: value });
                    }}
                    value={
                      dataForm.hasCar === true || dataForm.hasCar === 1 ? 1 : 0
                    }
                  >
                    <Radio value={1}>Si</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              {(dataForm.hasCar === 1 || dataForm.hasCar === true) && (
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.carriagePlate}
                    placeholder={"Ingresa las placas"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, carriagePlate: value });
                    }}
                  />
                </Col>
              )}
            </Row>
            <div className="button_actions">
              <button
                type="button"
                onClick={() => {
                  setConfirmData(true);
                }}
                className="button_primary"
              >
                <span>Continuar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
      {confirmData === true && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Nombre completo"
                  content={`${dataForm.givenName} ${dataForm.lastName} ${dataForm.mothersMaidenName}`}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Telefono"
                  content={dataForm.phoneNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Correo"
                  content={dataForm.emailAddress}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="RFC con Homoclave"
                  content={dataForm.taxId}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem title="CURP" content={dataForm.citizenId} />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={3} xs={{ span: 24 }} md={{ span: 3 }}>
                <DescriptionItem
                  title="Tienes Auto"
                  content={dataForm.hasCar === 1 ? "Si" : "No"}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              {dataForm.hasCar === 1 && (
                <Col span={3} xs={{ span: 24 }} md={{ span: 3 }}>
                  <DescriptionItem
                    title="Placas"
                    content={dataForm.carriagePlate}
                  />
                </Col>
              )}
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            </Row>
            <div className="button_actions">
              <button
                type="button"
                onClick={() => {
                  setConfirmData(false);
                }}
                className="button_secondary"
              >
                <span>Cancelar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClickNext(dataForm);
                }}
                className="button_primary"
              >
                <span>Confirmar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
    </div>
  );
};

export default SectionInfoUser;
