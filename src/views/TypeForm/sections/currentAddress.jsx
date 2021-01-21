import React, { useState } from "react";
import moment from "moment";
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
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionCurrentAddress = (props) => {
  const { onClickBack, onClickNext } = props;
  const [currentProperty, setCurrentProperty] = useState(true);

  return (
    <div className="content-typeform-formulary">
      <h3>Domicilio actual</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input placeholder={"Calle"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Numero"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Código postal"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Estado"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Municipio/Delegación"}
                onChange={(e) => {}}
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
                <span style={{ color: "#ff0282", fontWeight: "bold" }}>
                  La propiedad actual es
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setCurrentProperty(e.target.value);
                  }}
                  value={currentProperty}
                >
                  <Radio value={true}>Rentada</Radio>
                  <Radio value={false}>Propia</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    placeholder={"Tiempo habitando"}
                    onChange={(e) => {}}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Periodo"
                    onChange={(value, option) => {}}
                  >
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
          </Row>
          <Row>
            <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
              <DatePicker
                placeholder="Fecha cambio proximo domicilio"
                onChange={(momentFormat, date) => {}}
                format="DD MMMM YYYY"
              />
            </Col>
          </Row>
          <div className="button_actions">
            <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button>
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

export default SectionCurrentAddress;
