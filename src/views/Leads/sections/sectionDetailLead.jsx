import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { Row, Col, Drawer, Collapse, Menu, Dropdown, Button } from "antd";
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Panel } = Collapse;

const SectionDetailLead = (props) => {
  const { isDrawerVisible, onClose, dataDetalLead, dataUserAssignStatus } =
    props;
  const [dataDetailInfoUser, setDataDetailInfoUser] = useState({});
  const [dataDetailCommentUser, setDataDetailCommentUser] = useState([]);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {content}
    </div>
  );

  useEffect(() => {
    if (isEmpty(dataDetalLead) === false) {
      const detailInfo =
        isNil(dataDetalLead[0]) === false &&
        isNil(dataDetalLead[0][0]) === false
          ? dataDetalLead[0][0]
          : {};
      const detailComment =
        isNil(dataDetalLead[1]) === false ? dataDetalLead[1] : {};
      setDataDetailInfoUser(detailInfo);
      setDataDetailCommentUser(detailComment);
    }
  }, [dataDetalLead]);

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
            <h1>Detalle de Lead</h1>
          </div>
        </div>
        <div
          style={{
            padding: "0px 15px",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: "1 1 auto",
            }}
          >
            <div>
              Recibido el dia <strong>{dataDetailInfoUser.receivedAt}</strong>
            </div>
            <div>
              Asignado a <strong>{dataDetailInfoUser.assignedTo}</strong>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1 1 auto",
            }}
          >
            <Dropdown
              overlay={
                <Menu onClick={(value, option) => {}}>
                  {isEmpty(dataUserAssignStatus) === false &&
                    dataUserAssignStatus.map((row) => {
                      return (
                        <Menu.Item key={row.id} onClick={() => {}}>
                          <a>{row.text}</a>
                        </Menu.Item>
                      );
                    })}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button
                type="primary"
                shape="round"
                size="small"
                onClick={() => {}}
              >
                Asignar
              </Button>
            </Dropdown>
          </div>
        </div>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            <h3>Datos personales</h3>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Nombre"
                  content={`${dataDetailInfoUser.givenName} ${dataDetailInfoUser.lastName} ${dataDetailInfoUser.mothersMaidenName}`}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Télefono"
                  content={dataDetailInfoUser.phoneNumber}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Correo"
                  content={dataDetailInfoUser.emailAddress}
                />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Perfil</h3>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Prospecto a"
                  content={dataDetailInfoUser.prospectType}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Póliza"
                  content={dataDetailInfoUser.policy}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Monto de renta"
                  content={dataDetailInfoUser.budgeAmount}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Inmobiliaria"
                  content={dataDetailInfoUser.realEstate}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Comentario agregado"
                  content={dataDetailInfoUser.additionalComment}
                />
              </Col>
            </Row>
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />
            <h3>Ubicación</h3>
            <Row>
              <iframe
                width="430"
                height="300"
                id="gmap_canvas"
                src={`${dataDetailInfoUser.urlGMaps}oom=18`}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              />
            </Row>
          </Panel>
        </Collapse>
      </div>
      <div>
        Última actualización realizada por{" "}
        <strong>{dataDetailInfoUser.lastUpdatedBy}</strong> el dia{" "}
        <strong>{dataDetailInfoUser.lastUpdatedAt}</strong>
      </div>
    </Drawer>
  );
};

export default SectionDetailLead;
