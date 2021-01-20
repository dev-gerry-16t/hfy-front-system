import React from "react";
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

const { Option } = Select;

const SectionCurrentAddress = () => {
  return (
    <div className="content-typeform-formulary">
      <h3>Domicilio actual</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                placeholder={"Calle"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Numero"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Código postal"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Estado"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Municipio/Delegación"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select placeholder="Colonia" onChange={(value, option) => {}}>
                <Option value={1} onClick={() => {}}>
                  Granjas
                </Option>
                <Option value={2} onClick={() => {}}>
                  Americas
                </Option>
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span>La propiedad actual es</span>
                <Radio.Group onChange={() => {}} value={1}>
                  <Radio value={1}>Rentada</Radio>
                  <Radio value={2}>Propia</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Tiempo de vivir en el domicilio actual"}
                onChange={(e) => {}}
                suffix={<img src={IconProfile} alt="profile" width="15" />}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select placeholder="Periodo" onChange={(value, option) => {}}>
                <Option value={1} onClick={() => {}}>
                  Meses
                </Option>
                <Option value={2} onClick={() => {}}>
                  Años
                </Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionCurrentAddress;
