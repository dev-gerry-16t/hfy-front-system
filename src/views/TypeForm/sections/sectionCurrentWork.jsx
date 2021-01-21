import React from "react";
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
  Tooltip,
  Radio,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionCurrentWork = (props) => {
  const { onClickBack, onClickNext } = props;
  return (
    <div className="content-typeform-formulary">
      <h3>Información laboral</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Puesto"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix=""
                suffix=""
                value={""}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Numero de dependientes economicos"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                placeholder={"Nombre de la empresa"}
                onChange={(e) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix="$"
                suffix=""
                value={""}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Sueldo mensual"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Antiguedad"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Nombre de tu jefe"} onChange={(e) => {}} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Correo de tu jefe"} onChange={(e) => {}} />
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

export default SectionCurrentWork;
