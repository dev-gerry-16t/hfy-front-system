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
import CustomFileUpload from "./customFileUpload";

const { Option } = Select;

const TypePolicy = (props) => {
  const { onClickBack, onClickNext } = props;
  return (
    <div className="content-typeform-formulary">
      <h3>Poliza y Documentos</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <p>Poliza</p>
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <Select
                placeholder="¿Que póliza contratas?"
                onChange={(value, option) => {}}
              >
                <Option value={1} onClick={() => {}}>
                  Homify Básica
                </Option>
                <Option value={2} onClick={() => {}}>
                  Homify Pro
                </Option>
                <Option value={3} onClick={() => {}}>
                  Homify Renta Segura
                </Option>
              </Select>
            </Col>
          </Row>
          <p>Documentos</p>
          <div className="section-top-documentation">
            <div className="section-card-documentation">
              <div className="section-title-card-doc">
                <strong>INE</strong>
                <span>Frente y vuelta</span>
              </div>
              <div className="section-content-card-doc">
                <CustomFileUpload />
                <CustomFileUpload />
              </div>
            </div>
          </div>
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

export default TypePolicy;
