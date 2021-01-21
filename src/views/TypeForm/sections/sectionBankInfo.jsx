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
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionBankInfo = (props) => {
  const { onClickBack, onClickFinish } = props;
  return (
    <div className="content-typeform-formulary">
      <h3>Información Bancaria</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="Banco"
                onChange={(value, option) => {}}
              >
                <Option value={1} onClick={() => {}}>
                  Bancomer
                </Option>
                <Option value={2} onClick={() => {}}>
                  HSBC
                </Option>
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Sucursal"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input placeholder={"A nombre de"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <Input placeholder={"Numero de cuenta"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
              <Input placeholder={"Clave interbancaria"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DatePicker
                placeholder="Fecha de firma de contrato"
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
              onClick={onClickFinish}
              className="button_primary"
            >
              <span>Finalizar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionBankInfo;
