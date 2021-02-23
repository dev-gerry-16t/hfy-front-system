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
  const {
    isDrawerVisible,
    onClose,
    spinVisible,
    dataDetailCustomerTenant,
    dataDetailReferences,
    changeRolesCustomers,
    onSendRatingUser,
    onRedirectTo,
  } = props;
  const frontFunctions = new FrontFunctions();
  const [valueCalification, setValueCalification] = useState({});
  const [openPopover, setOpenPopover] = useState({});

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
            <h1>Detalle de Inquilino</h1>
          </div>
        </div>
        <div className="ant-divider ant-divider-horizontal" role="separator" />
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            {dataDetailCustomerTenant.length === 2 && (
              <Row>
                <Col span={20} xs={{ span: 24 }} md={{ span: 20 }}>
                  <strong>Cambiar Roles Inquilino-Obligado Solidario</strong>
                </Col>
                <Col span={4} xs={{ span: 24 }} md={{ span: 4 }}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<SyncOutlined />}
                    onClick={() => {
                      changeRolesCustomers(
                        dataDetailCustomerTenant[0].idContract
                      );
                    }}
                  />
                </Col>
              </Row>
            )}

            {isEmpty(dataDetailCustomerTenant) === false &&
              dataDetailCustomerTenant.map((row) => {
                return (
                  <>
                    <h3>
                      {row.isMain === true ? "Inquilino" : "Obligado Solidario"}
                    </h3>
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
                                    value={
                                      isNil(
                                        valueCalification[row.idCustomerTenant]
                                      ) === false
                                        ? valueCalification[
                                            row.idCustomerTenant
                                          ]
                                        : row.rating
                                    }
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
                                      setValueCalification({
                                        ...valueCalification,
                                        [row.idCustomerTenant]: floatValue,
                                      });
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
                                    onClick={() => {
                                      onSendRatingUser({
                                        idContract: row.idContract,
                                        idCustomer: null,
                                        idCustomerTenant: row.idCustomerTenant,
                                        idPolicyStatus: null,
                                        rating:
                                          isNil(
                                            valueCalification[
                                              row.idCustomerTenant
                                            ]
                                          ) === false
                                            ? valueCalification[
                                                row.idCustomerTenant
                                              ]
                                            : row.rating,
                                        isApproved: false,
                                      });
                                      setOpenPopover({
                                        [row.idCustomerTenant]:
                                          isNil(
                                            openPopover[row.idCustomerTenant]
                                          ) === false
                                            ? !openPopover[row.idCustomerTenant]
                                            : false,
                                      });
                                    }}
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
                                    onClick={() => {
                                      onSendRatingUser({
                                        idContract: row.idContract,
                                        idCustomer: null,
                                        idCustomerTenant: row.idCustomerTenant,
                                        idPolicyStatus: null,
                                        rating:
                                          isNil(
                                            valueCalification[
                                              row.idCustomerTenant
                                            ]
                                          ) === false
                                            ? valueCalification[
                                                row.idCustomerTenant
                                              ]
                                            : row.rating,
                                        isApproved: true,
                                      });
                                      setOpenPopover({
                                        [row.idCustomerTenant]:
                                          isNil(
                                            openPopover[row.idCustomerTenant]
                                          ) === false
                                            ? !openPopover[row.idCustomerTenant]
                                            : false,
                                      });
                                    }}
                                  >
                                    Aprobada
                                  </Button>
                                </Col>
                              </Row>
                            </>
                          }
                          title="Resultado de investigación 0-5"
                          trigger="click"
                          visible={
                            isNil(openPopover[row.idCustomerTenant]) === false
                              ? openPopover[row.idCustomerTenant]
                              : false
                          }
                        >
                          <Button
                            type="primary"
                            shape="round"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => {
                              setOpenPopover({
                                [row.idCustomerTenant]:
                                  isNil(openPopover[row.idCustomerTenant]) ===
                                  false
                                    ? !openPopover[row.idCustomerTenant]
                                    : true,
                              });
                            }}
                          >
                            Asignar
                          </Button>
                        </Popover>
                      </Col>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <DescriptionItem
                          title="Calificación 0-5"
                          content={
                            isNil(row.rating) === false ? row.rating : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Nombre completo"
                          content={
                            isNil(row.fullName) === false ? row.fullName : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DescriptionItem
                          title="Correo"
                          content={
                            isNil(row.emailAddress) === false
                              ? row.emailAddress
                              : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Telefono"
                          content={
                            isNil(row.phoneNumber) === false
                              ? row.phoneNumber
                              : "-"
                          }
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Tipo de cliente"
                          content={
                            isNil(row.customerType) === false
                              ? row.customerType
                              : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Ocupación"
                          content={
                            isNil(row.occupationActivity) === false
                              ? row.occupationActivity
                              : "-"
                          }
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Salario mensual"
                          content={
                            isNil(row.currentSalary) === false
                              ? row.currentSalary
                              : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="RFC"
                          content={isNil(row.taxId) === false ? row.taxId : "-"}
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="CURP"
                          content={
                            isNil(row.citizenId) === false ? row.citizenId : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DescriptionItem
                          title="Dirección"
                          content={
                            isNil(row.fullAddress) === false
                              ? replaceUrl(row.fullAddress)
                              : "-"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Enviar mensaje"
                          content={
                            <Dropdown overlay={menu(row)} trigger={["click"]}>
                              <a>Enviar</a>
                            </Dropdown>
                          }
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="TypeForm"
                          content={
                            <Dropdown
                              overlay={
                                <Menu
                                  onClick={(value) => {
                                    onRedirectTo(
                                      value.key,
                                      row.idCustomerTenant,
                                      row.idContract
                                    );
                                  }}
                                >
                                  <Menu.Item key="0">
                                    <a>Información personal</a>
                                  </Menu.Item>
                                  <Menu.Item key="1">
                                    <a>Dirección actual</a>
                                  </Menu.Item>
                                  <Menu.Item key="2">
                                    <a>Información laboral</a>
                                  </Menu.Item>
                                  <Menu.Item key="3">
                                    <a>Referencias</a>
                                  </Menu.Item>
                                  <Menu.Item key="4">
                                    <a>Documentación</a>
                                  </Menu.Item>
                                  <Menu.Item key="5">
                                    <a>Información aval</a>
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
                    <div
                      className="ant-divider ant-divider-horizontal"
                      role="separator"
                    />
                    {isNil(row.endorsementEmailAddress) === false &&
                      row.isMain === true && (
                        <>
                          <h3>Fiador</h3>
                          <Row>
                            <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                              <DescriptionItem
                                title="Nombre completo"
                                content={row.endorsementFullName}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                              <DescriptionItem
                                title="Correo"
                                content={row.endorsementEmailAddress}
                              />
                            </Col>
                            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                              <DescriptionItem
                                title="Telefono"
                                content={
                                  <a
                                    href={
                                      isNil(row.endorsementPhoneNumber) ===
                                      false
                                        ? `https://api.whatsapp.com/send?phone=52${row.endorsementPhoneNumber}`
                                        : "#"
                                    }
                                    target="_blank"
                                  >
                                    {row.endorsementPhoneNumber}
                                  </a>
                                }
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                  </>
                );
              })}
          </Panel>
          <Panel header={<h3 role="title-section">Referencias</h3>} key="2">
            {isEmpty(dataDetailReferences) === false &&
              dataDetailReferences.map((row) => {
                return (
                  <>
                    <Row>
                      <Col span={24}>
                        <DescriptionItem
                          title="Nombre"
                          content={row.fullName}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Correo"
                          content={row.emailAddress}
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Telefono"
                          content={
                            <a
                              href={
                                isNil(row.phoneNumber) === false
                                  ? `https://api.whatsapp.com/send?phone=52${row.phoneNumber}`
                                  : "#"
                              }
                              target="_blank"
                            >
                              {row.phoneNumber}
                            </a>
                          }
                        />
                      </Col>
                    </Row>
                    <div
                      className="ant-divider ant-divider-horizontal"
                      role="separator"
                    />
                  </>
                );
              })}
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
