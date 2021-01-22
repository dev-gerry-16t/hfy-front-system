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
  const { onClickNext, dataFormSave } = props;
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

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  return (
    <div className="content-typeform-formulary">
      <h3>Información personal</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <Input
                value={dataForm.givenName}
                placeholder={"Nombres"}
                onChange={(e) => {
                  const value = e.target.value;
                  setDataForm({ ...dataForm, givenName: value });
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
                  const value = e.target.value;
                  setDataForm({ ...dataForm, lastName: value });
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
                  const value = e.target.value;
                  setDataForm({ ...dataForm, mothersMaidenName: value });
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
                  const value = e.target.value;
                  setDataForm({ ...dataForm, phoneNumber: value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.emailAddress}
                placeholder={"Correo"}
                onChange={(e) => {
                  const value = e.target.value;
                  setDataForm({ ...dataForm, emailAddress: value });
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
                  value={dataForm.hasCar}
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            {dataForm.hasCar === 1 && (
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
                onClickNext(dataForm);
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionInfoUser;
