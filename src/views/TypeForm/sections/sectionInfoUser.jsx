import React, { useState } from "react";
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
  const { onClickNext } = props;
  const [haveCar, setHaveCar] = useState(true);
  
  return (
    <div className="content-typeform-formulary">
      <h3>Información personal</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <Input
                placeholder={"Nombres"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input
                placeholder={"Apellido paterno"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input
                placeholder={"Apellido materno"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Telefono"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Correo"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"RFC con Homoclave"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"CURP"} onChange={(e) => {}} />
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
                    setHaveCar(e.target.value);
                  }}
                  value={haveCar}
                >
                  <Radio value={true}>Si</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            {haveCar === true && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  placeholder={"Ingresa las placas"}
                  onChange={(e) => {}}
                />
              </Col>
            )}
          </Row>
          <div className="button_actions">
            <button
              type="button"
              onClick={onClickNext}
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
