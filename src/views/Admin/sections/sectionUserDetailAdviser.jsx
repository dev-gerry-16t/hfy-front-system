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

const SectionDetailUserAdviser = (props) => {
  const { isDrawerVisible, onClose, spinVisible, dataDetailAgent } = props;
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
            <h1>Detalle de Asesor</h1>
          </div>
        </div>
        <div className="ant-divider ant-divider-horizontal" role="separator" />
        <h3>Información general</h3>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Nombre completo"
              content="Sebastian Perez Guitierrez"
            />
          </Col>
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
            <DescriptionItem title="Polizas Totales" content="15" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Renovaciones" content="4" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Comisiones totales" content="$12,700,00" />
          </Col>
        </Row>
        <h3>Información de poliza actual</h3>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Comisión por" content="Renovación 10%" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Comisión poliza Actual" content="$2,5000" />
          </Col>
        </Row>
        <Row></Row>
      </div>
    </Drawer>
  );
};

export default SectionDetailUserAdviser;
