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
  Timeline,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const { Option } = Select;
const { Panel } = Collapse;

const SectionDetailUser = (props) => {
  const {
    isDrawerVisible,
    onClose,
    spinVisible,
    dataDetailCustomer,
    onRedirectTo,
    dataMessages,
    onDownloadDocumentById,
  } = props;
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

  const replaceUrl = (address) => {
    let domainPath = "https://www.google.com/maps/search/";

    if (isNil(address) === false) {
      const replaceString = address.replaceAll(" ", "+");
      domainPath = domainPath + replaceString;
    }
    return (
      <a href={domainPath} target="_blank">
        {address}
      </a>
    );
  };

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
            <h1>Detalle de Propietario</h1>
          </div>
        </div>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Nombre completo"
                  content={dataDetailCustomer.fullName}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Correo"
                  content={dataDetailCustomer.emailAddress}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Telefono"
                  content={dataDetailCustomer.phoneNumber}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Tipo de cliente"
                  content={dataDetailCustomer.customerType}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="RFC"
                  content={dataDetailCustomer.taxId}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="CURP"
                  content={dataDetailCustomer.citizenId}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content={replaceUrl(dataDetailCustomer.fullAddress)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Enviar mensaje"
                  content={
                    <Dropdown
                      overlay={menu(dataDetailCustomer)}
                      trigger={["click"]}
                    >
                      <a>Enviar</a>
                    </Dropdown>
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="TypeForm"
                  content={
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(value) => {
                            onRedirectTo(
                              value.key,
                              dataDetailCustomer.idCustomer,
                              dataDetailCustomer.idContract
                            );
                          }}
                        >
                          <Menu.Item key="0">
                            <a>Información personal</a>
                          </Menu.Item>
                          <Menu.Item key="1">
                            <a>Inmueble a rentar</a>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <a>Póliza</a>
                          </Menu.Item>
                          <Menu.Item key="3">
                            <a>Datos bancarios</a>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <a>Ver</a>
                    </Dropdown>
                  }
                />
              </Col>
            </Row>
          </Panel>
          <Panel header={<h3 role="title-section">Propiedad</h3>} key="2">
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content={replaceUrl(dataDetailCustomer.fullAddressProperty)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Monto de renta"
                  content={dataDetailCustomer.currentRent}
                />
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
                  content={dataDetailCustomer.personType}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Estatus"
                  content={dataDetailCustomer.contractStatus}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Folio"
                  content={dataDetailCustomer.hfInvoice}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Vencimiento"
                  content={dataDetailCustomer.expireAt}
                />
              </Col>
              <Col span={12}>
                <a
                  onClick={() => {
                    onDownloadDocumentById(
                      {
                        idContract: dataDetailCustomer.idContract,
                        idCustomer: dataDetailCustomer.idCustomer,
                        idCustomerTenant: null,
                        type: 1,
                      },
                      `Contrato_${dataDetailCustomer.idContract}`
                    );
                  }}
                >
                  Descargar Contrato
                </a>
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
                <DescriptionItem
                  title="Poliza"
                  content={dataDetailCustomer.policy}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Vencimiento"
                  content={dataDetailCustomer.expireAtPolicy}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <a
                  onClick={() => {
                    onDownloadDocumentById(
                      {
                        idContract: dataDetailCustomer.idContract,
                        idCustomer: dataDetailCustomer.idCustomer,
                        idCustomerTenant: null,
                        type: 3,
                      },
                      `Poliza_${dataDetailCustomer.idContract}`
                    );
                  }}
                >
                  Descargar Poliza
                </a>
              </Col>
            </Row>
          </Panel>

          <Panel
            header={<h3 role="title-section">Documentación personal</h3>}
            key="4"
          >
            <Row>
              {dataDetailCustomer.hasINECustomer === 1 ||
              dataDetailCustomer.hasINECustomer === true ? (
                <>
                  <Col span={8}>
                    <DescriptionItem
                      title="Ine frontal"
                      content={
                        <a
                          onClick={() => {
                            onDownloadDocumentById(
                              {
                                idContract: dataDetailCustomer.idContract,
                                idCustomer: dataDetailCustomer.idCustomer,
                                idCustomerTenant: null,
                                type: 6,
                              },
                              "Identificacion_1"
                            );
                          }}
                        >
                          Descargar
                        </a>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <DescriptionItem
                      title="Ine vuelta"
                      content={
                        <a
                          onClick={() => {
                            onDownloadDocumentById(
                              {
                                idContract: dataDetailCustomer.idContract,
                                idCustomer: dataDetailCustomer.idCustomer,
                                idCustomerTenant: null,
                                type: 7,
                              },
                              "Identificacion_2"
                            );
                          }}
                        >
                          Descargar
                        </a>
                      }
                    />
                  </Col>{" "}
                </>
              ) : (
                <Col span={16}>
                  <DescriptionItem
                    title="Identificación oficial"
                    content={
                      <a
                      onClick={() => {
                        onDownloadDocumentById(
                          {
                            idContract: dataDetailCustomer.idContract,
                            idCustomer: dataDetailCustomer.idCustomer,
                            idCustomerTenant: null,
                            type: 6,
                          },
                          "Identificacion_1"
                        );
                      }}
                      >
                        Descargar
                      </a>
                    }
                  />
                </Col>
              )}
            </Row>
          </Panel>
          <Panel
            header={<h3 role="title-section">Comentarios Contrato</h3>}
            key="5"
          >
            <div className="panel-comment-user">
              {isEmpty(dataMessages) === false ? (
                <Timeline>
                  {dataMessages.map((row) => {
                    return (
                      <Timeline.Item>
                        <div>
                          <p>
                            <strong>
                              {row.createdByUser} | {row.createdAt}
                            </strong>
                          </p>
                          {row.comment}
                        </div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              ) : (
                <strong>
                  No existen comentarios por parte del Propietario
                </strong>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    </Drawer>
  );
};

export default SectionDetailUser;
