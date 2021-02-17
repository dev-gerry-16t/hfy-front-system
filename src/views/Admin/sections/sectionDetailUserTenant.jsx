import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
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
  Drawer,
  Collapse,
  Menu,
  Dropdown,
  Button,
  Popover,
} from "antd";
import {
  SyncOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const { Option } = Select;
const { Panel } = Collapse;

const SectionDetailUserTenant = (props) => {
  const { isDrawerVisible, onClose, spinVisible } = props;
  const frontFunctions = new FrontFunctions();
  const [valueCalification, setValueCalification] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);

  const LoadingSpin = <SyncOutlined spin />;

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {content}
    </div>
  );

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a>Whatsapp</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Notificación</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Mensaje app</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Correo</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Drawer
      width={500}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isDrawerVisible}
    >
      <div className="content-infomation-drawer">
        <h3>Detalle de Inquilino</h3>
        <div className="ant-divider ant-divider-horizontal" role="separator" />
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            <Row>
              <Col span={20} xs={{ span: 24 }} md={{ span: 20 }}>
                <strong>Cambiar Roles Inquilino-Obligado Solidario</strong>
              </Col>
              <Col span={4} xs={{ span: 24 }} md={{ span: 4 }}>
                <Button type="primary" shape="round" icon={<SyncOutlined />} />
              </Col>
            </Row>
            <h3>Inquilino</h3>
            <Row>
              <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                <strong>Resultado de investigación</strong>
                <Popover
                  content={
                    <>
                      <Row>
                        <Col span={24}>
                          <NumberFormat
                            id={null}
                            customInput={Input}
                            thousandSeparator=","
                            decimalSeparator="."
                            decimalPrecision={2}
                            allowNegative={false}
                            prefix=""
                            suffix=""
                            value={valueCalification}
                            className="inputLogin"
                            floatingLabelText=""
                            isVisible
                            toBlock={false}
                            disable={false}
                            placeholder="Calificación"
                            onValueChange={(values) => {
                              const {
                                formattedValue,
                                value,
                                floatValue,
                              } = values;
                              setValueCalification(floatValue);
                            }}
                            onClick={(event) => {}}
                            onFocus={(event) => {}}
                            onBlur={(event) => {}}
                          />
                        </Col>
                      </Row>
                      <div
                        className="ant-divider ant-divider-horizontal"
                        role="separator"
                      />
                      <Row>
                        <Col span={11}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={<CloseOutlined />}
                            size="small"
                            danger
                          >
                            Rechazada
                          </Button>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={<CheckOutlined />}
                            size="small"
                            className="color-green"
                          >
                            Aprobada
                          </Button>
                        </Col>
                      </Row>
                    </>
                  }
                  title="Resultado de investigación 1-5"
                  trigger="click"
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => {}}
                  >
                    Asignar
                  </Button>
                </Popover>
              </Col>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem title="Calificación 1-5" content="5" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Nombre completo"
                  content="Sebastian Perez Guitierrez"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Correo"
                  content="testUser-homify@example.com"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-63-15-98-07" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Tipo de cliente" content="Inquilino" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Ocupación" content="Ingeniero" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Salario mensual" content="$45,000.00" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="RFC" content="SBLGTE941625ML5" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="CURP" content="SBLGTE941625HMCNMR00" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content="Rio Serna 36, El sol, Miguel Hidalgo, 57200"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Enviar mensaje"
                  content={
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a>Enviar</a>
                    </Dropdown>
                  }
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="TypeForm" content={<a>Ver</a>} />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Obligado solidario</h3>
            <Row>
              <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                <strong>Resultado de investigación</strong>
                <Popover
                  content={
                    <>
                      <Row>
                        <Col span={24}>
                          <NumberFormat
                            id={null}
                            customInput={Input}
                            thousandSeparator=","
                            decimalSeparator="."
                            decimalPrecision={2}
                            allowNegative={false}
                            prefix=""
                            suffix=""
                            value={valueCalification}
                            className="inputLogin"
                            floatingLabelText=""
                            isVisible
                            toBlock={false}
                            disable={false}
                            placeholder="Calificación"
                            onValueChange={(values) => {
                              const {
                                formattedValue,
                                value,
                                floatValue,
                              } = values;
                              setValueCalification(floatValue);
                            }}
                            onClick={(event) => {}}
                            onFocus={(event) => {}}
                            onBlur={(event) => {}}
                          />
                        </Col>
                      </Row>
                      <div
                        className="ant-divider ant-divider-horizontal"
                        role="separator"
                      />
                      <Row>
                        <Col span={11}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={<CloseOutlined />}
                            size="small"
                            danger
                          >
                            Rechazada
                          </Button>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={<CheckOutlined />}
                            size="small"
                            className="color-green"
                          >
                            Aprobada
                          </Button>
                        </Col>
                      </Row>
                    </>
                  }
                  title="Resultado de investigación 1-5"
                  trigger="click"
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => {}}
                  >
                    Asignar
                  </Button>
                </Popover>
              </Col>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem title="Calificación 1-5" content="5" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Nombre completo"
                  content="Pedro Perez Guitierrez"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Correo"
                  content="testUser-homify@example.com"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-63-15-98-07" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Tipo de cliente" content="Inquilino" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Ocupación" content="Ingeniero" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Salario mensual" content="$40,000.00" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="RFC" content="SBLGTE941625ML5" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="CURP" content="SBLGTE941625HMCNMR00" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content="Rio Serna 36, El sol, Miguel Hidalgo, 57200"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Enviar mensaje"
                  content={
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a>Enviar</a>
                    </Dropdown>
                  }
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="TypeForm" content={<a>Ver</a>} />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Fiador</h3>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Nombre completo"
                  content="Sebastian Perez Guitierrez"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Correo" content="fiador@example.com" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-63-15-98-07" />
              </Col>
            </Row>
          </Panel>
          <Panel header={<h3 role="title-section">Referencias</h3>} key="2">
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Nombre"
                  content="Nombre de la primer referencia"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Correo"
                  content="referencia1@test.com"
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-77-63-52-12" />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Nombre"
                  content="Nombre de la segunda referencia"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Correo"
                  content="referencia2@test.com"
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-77-63-52-12" />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Nombre"
                  content="Nombre de la tercer referencia"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Correo"
                  content="referencia3@test.com"
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Telefono" content="55-77-63-52-12" />
              </Col>
            </Row>
          </Panel>
          <Panel
            header={<h3 role="title-section">Documentos Legales</h3>}
            key="3"
          >
            <p>
              <h3>Contrato</h3>
            </p>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Tipo de persona fiscal"
                  content="Fisica"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Estatus" content="Vigente" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Folio" content="212234334" />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Vencimiento" content="29 Enero 2017" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <a>Descargar Contrato</a>
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <p>
              <h3>Poliza</h3>
            </p>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem title="Poliza" content="Homify Basica" />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <a>Descargar Poliza</a>
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <p>
              <h3>Pagares</h3>
            </p>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <a>Descargar Pagares</a>
              </Col>
            </Row>
          </Panel>

          <Panel
            header={<h3 role="title-section">Documentos personales</h3>}
            key="4"
          >
            <h3>Inquilino</h3>
            <Row>
              <Col span={8}>
                <DescriptionItem title="Selfie" content={<a>Descargar</a>} />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine frontal"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine vuelta"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Carta laboral"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 1"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 2"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 3"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Obligado solidario</h3>
            <Row>
              <Col span={8}>
                <DescriptionItem title="Selfie" content={<a>Descargar</a>} />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine frontal"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine vuelta"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Carta laboral"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 1"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 2"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Comprobante de ingreso 3"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Fiador</h3>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Escrituras"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine frontal"
                  content={<a>Descargar</a>}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Ine vuelta"
                  content={<a>Descargar</a>}
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </div>
    </Drawer>
  );
};

export default SectionDetailUserTenant;
