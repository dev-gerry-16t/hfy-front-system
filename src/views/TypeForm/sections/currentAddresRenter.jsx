import React, { useState } from "react";
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

const CurrentAddressRenter = (props) => {
  const { onClickBack, onClickNext } = props;
  const [furnished, setFurnished] = useState(true);
  return (
    <div className="content-typeform-formulary">
      <h3>Datos del Inmueble a Rentar</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input placeholder={"Calle"} onChange={(e) => {}} />
            </Col>
          </Row>
          <Row>
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input placeholder={"Numero interior"} onChange={(e) => {}} />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input placeholder={"Numero exterior"} onChange={(e) => {}} />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
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
              <Select
                placeholder="Tipo de inmueble"
                onChange={(value, option) => {}}
              >
                <Option value={1} onClick={() => {}}>
                  Casa
                </Option>
                <Option value={2} onClick={() => {}}>
                  Departamento
                </Option>
                <Option value={3} onClick={() => {}}>
                  Oficina
                </Option>
                <Option value={4} onClick={() => {}}>
                  Local Comercial
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <div className="option-select-radio">
                <span style={{ color: "#ff0282", fontWeight: "bold" }}>
                  ¿El inmueble está amueblado?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setFurnished(e.target.value);
                  }}
                  value={furnished}
                >
                  <Radio value={true}>Si</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
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
                placeholder="Monto de renta"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
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
                placeholder={"Monto de mandetimiento"}
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
                placeholder={"Lugares de estacionamiento"}
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
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

export default CurrentAddressRenter;
