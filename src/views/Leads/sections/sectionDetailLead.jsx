import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import {
  Row,
  Col,
  Drawer,
  Collapse,
  Menu,
  Dropdown,
  Button,
  DatePicker,
  Timeline,
} from "antd";
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Panel } = Collapse;

const SectionDetailLead = (props) => {
  const {
    isDrawerVisible,
    onClose,
    dataDetalLead,
    dataUserAssignStatus,
    onUpdateInformation,
    dataHistory,
  } = props;
  const [dataDetailInfoUser, setDataDetailInfoUser] = useState({});
  const [dataDetailCommentUser, setDataDetailCommentUser] = useState([]);
  const [dataForm, setDataForm] = useState({
    scheduleAt: null,
    comment: null,
  });

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
                        <Menu.Item
                          key={row.id}
                          onClick={async () => {
                            try {
                              await onUpdateInformation({
                                assignedToUser: row.id,
                                idLandingProspect:
                                  dataDetailInfoUser.idLandingProspect,
                              });
                            } catch (error) {}
                          }}
                        >
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
                  title="Fecha de cita"
                  content={dataDetailInfoUser.scheduleAt}
                />
              </Col>
            </Row>
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
                  content={dataDetailInfoUser.budgeAmountFormat}
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
                  title="Comentario del cliente"
                  content={dataDetailInfoUser.additionalComment}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <strong>Re-agendar cita</strong>
                <DatePicker
                  value={
                    isNil(dataForm.scheduleAt) === false
                      ? moment(dataForm.scheduleAt, "YYYY-MM-DDTHH:mm:ss")
                      : null
                  }
                  placeholder="Programar para"
                  onChange={async (momentFormat, date) => {
                    const scheduleAtParse = moment(momentFormat).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    setDataForm({
                      ...dataForm,
                      scheduleAt: scheduleAtParse,
                    });
                    try {
                      await onUpdateInformation({
                        scheduleAt: scheduleAtParse,
                        idLandingProspect: dataDetailInfoUser.idLandingProspect,
                      });
                    } catch (error) {}
                  }}
                  showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                  }}
                  format="DD MMMM YYYY HH:mm"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <strong>Agrega un comentario</strong>
                <textarea
                  className="textarea-form-modal ant-input"
                  placeholder="Comentarios"
                  value={dataForm.comment}
                  maxlength="1000"
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      comment: e.target.value,
                    });
                  }}
                />
                <Button
                  type="primary"
                  shape=""
                  size="small"
                  onClick={async () => {
                    try {
                      await onUpdateInformation({
                        comment: dataForm.comment,
                        idLandingProspect: dataDetailInfoUser.idLandingProspect,
                      });
                      setDataForm({
                        ...dataForm,
                        comment: "",
                      });
                    } catch (error) {}
                  }}
                >
                  Agregar
                </Button>
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
          <Panel
            header={<h3 role="title-section">Comentarios Administrador</h3>}
            key="2"
          >
            <div className="panel-comment-user">
              {isEmpty(dataDetailCommentUser) === false ? (
                <Timeline>
                  {dataDetailCommentUser.map((row) => {
                    return (
                      <Timeline.Item>
                        <div>
                          <p>
                            <strong>
                              {row.commentedByUser} | {row.commentedAt}
                            </strong>
                          </p>
                          {row.comment}
                        </div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              ) : (
                <strong>No has agregado comentarios</strong>
              )}
            </div>
          </Panel>
          <Panel
            header={<h3 role="title-section">Historial de cambios</h3>}
            key="3"
          >
            <div className="panel-comment-user">
              {isEmpty(dataHistory) === false ? (
                <Timeline>
                  {dataHistory.map((row) => {
                    return (
                      <Timeline.Item>
                        <div>
                          <p>
                            <strong>
                              {row.createdByUser} | {row.createdAt}
                            </strong>
                          </p>
                          <div
                            style={{ color: "black !important" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                isNil(row.description) === false
                                  ? row.description
                                  : "",
                            }}
                          />
                        </div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              ) : (
                <strong>No has agregado comentarios</strong>
              )}
            </div>
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
