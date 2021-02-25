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

  const menu = (row) => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a
            href={
              isNil(row.phoneNumber) === false
                ? `https://api.whatsapp.com/send?phone=52${row.phoneNumber}`
                : "#"
            }
            target="_blank"
          >
            Whatsapp
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a>Notificación</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>Mensaje app</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a>Correo</a>
        </Menu.Item>
      </Menu>
    );
  };

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
        <h3>Información general</h3>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Nombre completo"
              content={dataDetailAgent.fullName}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Enviar mensaje"
              content={
                <Dropdown overlay={menu(dataDetailAgent)} trigger={["click"]}>
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
              content={dataDetailAgent.emailAddress}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Telefono"
              content={dataDetailAgent.phoneNumber}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Polizas Totales"
              content={dataDetailAgent.totalCommissions}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Renovaciones"
              content={
                isNil(dataDetailAgent.totalRenewals) === false &&
                isNil(dataDetailAgent.totalRenewals[0]) === false
                  ? dataDetailAgent.totalRenewals[0]
                  : "-"
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Comisiones totales"
              content={dataDetailAgent.totalCommissionsAmount}
            />
          </Col>
        </Row>
        <h3>Información de poliza actual</h3>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Comisión por"
              content={dataDetailAgent.commissionType}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Comisión poliza Actual"
              content={dataDetailAgent.totalCommissionAmount}
            />
          </Col>
        </Row>
        <Row></Row>
      </div>
    </Drawer>
  );
};

export default SectionDetailUserAdviser;
