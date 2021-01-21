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
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomFileUpload from "./customFileUpload";

const { Option } = Select;

const SectionInfoAval = (props) => {
  const { onClickBack, onClickFinish } = props;
  return (
    <div className="content-typeform-formulary">
      <h3>Información Aval</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <p>Información personal</p>
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
          <p>Dirección de la propiedad en garantia</p>
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
          </Row>
          <p>Escrituras</p>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Numero de las escrituras"}
                onChange={(e) => {}}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DatePicker
                placeholder="Fecha de firma de las escrituras"
                onChange={(momentFormat, date) => {}}
                format="DD MMMM YYYY"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                placeholder={"Lugar de firma de la escritura"}
                onChange={(e) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                placeholder={"Número de la notaria"}
                onChange={(e) => {}}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input placeholder={"Nombre del notario"} onChange={(e) => {}} />
            </Col>
          </Row>
          <p>Documentación</p>

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
            <div className="section-card-documentation">
              <div className="section-title-card-doc">
                <strong>Escrituras de la propiedad</strong>
                <span style={{ visibility: "hidden" }}>N/A</span>
              </div>
              <div className="section-content-card-doc">
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

export default SectionInfoAval;
