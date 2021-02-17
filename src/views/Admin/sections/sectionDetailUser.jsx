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
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const { Option } = Select;
const { Panel } = Collapse;

const SectionDetailUser = (props) => {
  const { isDrawerVisible, onClose, spinVisible } = props;
  const frontFunctions = new FrontFunctions();
  const initialDataForm = { emailOwner: null };
  const [dataForm, setDataForm] = useState(initialDataForm);

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
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Detalle de Propietario</h1>
          </div>
        </div>
        <div className="ant-divider ant-divider-horizontal" role="separator" />
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            <Row>
              <Col span={12}>
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
              <Col span={12}>
                <DescriptionItem title="Telefono" content="55-63-15-98-07" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Tipo de cliente"
                  content="Propietario"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="RFC" content="SBLGTE941625ML5" />
              </Col>
              <Col span={12}>
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
              <Col span={12}>
                <DescriptionItem
                  title="Enviar mensaje"
                  content={
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a>Enviar</a>
                    </Dropdown>
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem title="TypeForm" content={<a>Ver</a>} />
              </Col>
            </Row>
          </Panel>
          <Panel header={<h3 role="title-section">Propiedades</h3>} key="2">
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content="Rio Serna 36, El sol, Miguel Hidalgo, 57200"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Monto de renta" content="$ 18,000.00" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Subir inventario"
                  content={<a>seleccionar</a>}
                />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content="Rio Serna 36, El sol, Miguel Hidalgo, 57200"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Monto de renta" content="$ 18,000.00" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Subir inventario"
                  content={<a>seleccionar</a>}
                />
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
              <Col span={12}>
                <DescriptionItem
                  title="Tipo de persona fiscal"
                  content="Fisica"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Estatus" content="Vigente" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Folio" content="212234334" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Vencimiento" content="29 Enero 2017" />
              </Col>
              <Col span={12}>
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
              <Col span={12}>
                <DescriptionItem title="Poliza" content="Homify Basica" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Vencimiento" content="29 Enero 2017" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <a>Descargar Poliza</a>
              </Col>
            </Row>
          </Panel>

          <Panel
            header={<h3 role="title-section">Documentación personal</h3>}
            key="4"
          >
            <Row>
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

export default SectionDetailUser;
