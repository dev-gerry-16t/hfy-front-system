import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
import {
  Input,
  Row,
  Col,
  Drawer,
  Collapse,
  Menu,
  Dropdown,
  Button,
  Popover,
  Timeline,
} from "antd";
import {
  SyncOutlined,
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Panel } = Collapse;

const SectionDetailUserTenant = (props) => {
  const {
    isDrawerVisible,
    onClose,
    dataDetailCustomerTenant,
    dataDetailReferences,
    changeRolesCustomers,
    onSendRatingUser,
    onRedirectTo,
    dataMessages,
    onDownloadDocumentById,
  } = props;

  const [valueCalification, setValueCalification] = useState({});
  const [dataIsMainTenant, setDataIsMainTenant] = useState({});
  const [openPopover, setOpenPopover] = useState({});

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {isNil(content) === false ? content : "N/A"}
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
        {/* <Menu.Item key="1">
          <a>Notificación</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>Mensaje app</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a>Correo</a>
        </Menu.Item> */}
      </Menu>
    );
  };

  useEffect(() => {
    if (isEmpty(dataDetailCustomerTenant) === false) {
      const dataFilter = dataDetailCustomerTenant.find((row) => {
        return row.isMain === true;
      });
      setDataIsMainTenant(dataFilter);
    }
  }, [dataDetailCustomerTenant]);

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
            <div
              className="ant-divider ant-divider-horizontal"
              role="separator"
            />

            {isEmpty(dataDetailCustomerTenant) === false &&
              dataDetailCustomerTenant.map((row) => {
                const catalogProperties =
                  isNil(row.typeFormProperties) === false
                    ? JSON.parse(row.typeFormProperties)
                    : [];
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
                                        : row.ratingNumber
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
                                            : row.ratingNumber,
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
                                            : row.ratingNumber,
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
                          title={
                            <div>
                              <span>Resultado definitivo</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenPopover({
                                    [row.idCustomerTenant]:
                                      isNil(
                                        openPopover[row.idCustomerTenant]
                                      ) === false
                                        ? !openPopover[row.idCustomerTenant]
                                        : false,
                                  });
                                }}
                                style={{
                                  marginLeft: 5,
                                  background: "transparent",
                                  border: "none",
                                }}
                              >
                                <i className="fa fa-times" />
                              </button>
                            </div>
                          }
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
                            isNil(row.rating) === false ? row.rating : "N/A"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Nombre completo"
                          content={
                            isNil(row.fullName) === false ? row.fullName : "N/A"
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
                              : "N/A"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Teléfono"
                          content={
                            isNil(row.phoneNumber) === false
                              ? row.phoneNumber
                              : "N/A"
                          }
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Tipo de cliente"
                          content={
                            isNil(row.customerType) === false
                              ? row.customerType
                              : "N/A"
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
                              : "N/A"
                          }
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Salario mensual"
                          content={
                            isNil(row.currentSalary) === false
                              ? row.currentSalary
                              : "N/A"
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="RFC"
                          content={isNil(row.taxId) === false ? row.taxId : "N/A"}
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="CURP"
                          content={
                            isNil(row.citizenId) === false ? row.citizenId : "N/A"
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
                              : "N/A"
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
                                      row.idCustomer,
                                      row.idContract,
                                      row.idCustomerTenant
                                    );
                                  }}
                                >
                                  {isEmpty(catalogProperties) === false &&
                                    catalogProperties.map((rowMap) => {
                                      return (
                                        <Menu.Item
                                          key={`${rowMap.idStepIn}`}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <a style={{ marginRight: 2 }}>
                                            {rowMap.stepIn}
                                          </a>
                                          {rowMap.isCompleted === true ? (
                                            <CheckCircleFilled
                                              style={{ color: "green" }}
                                            />
                                          ) : (
                                            <CloseCircleFilled
                                              style={{ color: "red" }}
                                            />
                                          )}
                                        </Menu.Item>
                                      );
                                    })}
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
                    {isNil(row.hasEndorsement) === false &&
                      row.hasEndorsement === true &&
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
                                title="Teléfono"
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
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Nombre"
                          content={`${row.fullName} ${row.detailTenant}`}
                        />
                      </Col>
                      <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                        <DescriptionItem
                          title="Tipo de referencia"
                          content={row.referenceType}
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
                          title="Teléfono"
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
                  content={dataIsMainTenant.personType}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Estatus"
                  content={dataIsMainTenant.contractStatus}
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Folio"
                  content={dataIsMainTenant.hfInvoice}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Vencimiento"
                  content={dataIsMainTenant.expireAt}
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <a
                  onClick={() => {
                    if (isEmpty(dataIsMainTenant) === false) {
                      onDownloadDocumentById(
                        {
                          idContract: dataIsMainTenant.idContract,
                          idCustomer: dataIsMainTenant.idCustomer,
                          idCustomerTenant: dataIsMainTenant.idCustomerTenant,
                          type: 1,
                        },
                        `Contrato_${dataIsMainTenant.idContract}`
                      );
                    }
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
              <h3>Póliza</h3>
            </p>
            <Row>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="Póliza"
                  content={dataIsMainTenant.policy}
                />
              </Col>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <a
                  onClick={() => {
                    if (isEmpty(dataIsMainTenant) === false) {
                      onDownloadDocumentById(
                        {
                          idContract: dataIsMainTenant.idContract,
                          idCustomer: dataIsMainTenant.idCustomer,
                          idCustomerTenant: dataIsMainTenant.idCustomerTenant,
                          type: 3,
                        },
                        `Poliza_${dataIsMainTenant.idContract}`
                      );
                    }
                  }}
                >
                  Descargar Póliza
                </a>
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
                <a
                  onClick={() => {
                    if (isEmpty(dataIsMainTenant) === false) {
                      onDownloadDocumentById(
                        {
                          idContract: dataIsMainTenant.idContract,
                          idCustomer: dataIsMainTenant.idCustomer,
                          idCustomerTenant: dataIsMainTenant.idCustomerTenant,
                          type: 2,
                        },
                        `Pagares_${dataIsMainTenant.idContract}`
                      );
                    }
                  }}
                >
                  Descargar Pagares
                </a>
              </Col>
            </Row>
          </Panel>

          <Panel
            header={<h3 role="title-section">Documentos personales</h3>}
            key="4"
          >
            {isEmpty(dataDetailCustomerTenant) === false &&
              dataDetailCustomerTenant.map((row) => {
                return (
                  <>
                    <h3>
                      {row.isMain === true ? "Inquilino" : "Obligado Solidario"}
                    </h3>
                    <Row>
                      <Col span={8}>
                        <DescriptionItem
                          title="Selfie"
                          content={
                            <a
                              onClick={() => {
                                onDownloadDocumentById(
                                  {
                                    idContract: row.idContract,
                                    idCustomer: row.idCustomer,
                                    idCustomerTenant: row.idCustomerTenant,
                                    type: 5,
                                  },
                                  `Selfie_${row.idContract}`
                                );
                              }}
                            >
                              Descargar
                            </a>
                          }
                        />
                      </Col>
                      {row.hasINECustomerTenant === 1 ||
                      row.hasINECustomerTenant === true ? (
                        <>
                          <Col span={8}>
                            <DescriptionItem
                              title="Ine frontal"
                              content={
                                <a
                                  onClick={() => {
                                    onDownloadDocumentById(
                                      {
                                        idContract: row.idContract,
                                        idCustomer: row.idCustomer,
                                        idCustomerTenant: row.idCustomerTenant,
                                        type: 6,
                                      },
                                      `Identificacion1_${row.idContract}`
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
                                        idContract: row.idContract,
                                        idCustomer: row.idCustomer,
                                        idCustomerTenant: row.idCustomerTenant,
                                        type: 7,
                                      },
                                      `Identificacion2_${row.idContract}`
                                    );
                                  }}
                                >
                                  Descargar
                                </a>
                              }
                            />
                          </Col>
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
                                      idContract: row.idContract,
                                      idCustomer: row.idCustomer,
                                      idCustomerTenant: row.idCustomerTenant,
                                      type: 6,
                                    },
                                    `Identificacion1_${row.idContract}`
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
                    <Row>
                      <Col span={8}>
                        <DescriptionItem
                          title="Carta laboral"
                          content={
                            <a
                              onClick={() => {
                                onDownloadDocumentById(
                                  {
                                    idContract: row.idContract,
                                    idCustomer: row.idCustomer,
                                    idCustomerTenant: row.idCustomerTenant,
                                    type: 8,
                                  },
                                  `Carta_Laboral_${row.idContract}`
                                );
                              }}
                            >
                              Descargar
                            </a>
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <DescriptionItem
                          title="Comprobante de ingreso 1"
                          content={
                            <a
                              onClick={() => {
                                onDownloadDocumentById(
                                  {
                                    idContract: row.idContract,
                                    idCustomer: row.idCustomer,
                                    idCustomerTenant: row.idCustomerTenant,
                                    type: 9,
                                  },
                                  `Comprobante_1_${row.idContract}`
                                );
                              }}
                            >
                              Descargar
                            </a>
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <DescriptionItem
                          title="Comprobante de ingreso 2"
                          content={
                            <a
                              onClick={() => {
                                onDownloadDocumentById(
                                  {
                                    idContract: row.idContract,
                                    idCustomer: row.idCustomer,
                                    idCustomerTenant: row.idCustomerTenant,
                                    type: 10,
                                  },
                                  `Comprobante_2_${row.idContract}`
                                );
                              }}
                            >
                              Descargar
                            </a>
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <DescriptionItem
                          title="Comprobante de ingreso 3"
                          content={
                            <a
                              onClick={() => {
                                onDownloadDocumentById(
                                  {
                                    idContract: row.idContract,
                                    idCustomer: row.idCustomer,
                                    idCustomerTenant: row.idCustomerTenant,
                                    type: 11,
                                  },
                                  `Comprobante_3_${row.idContract}`
                                );
                              }}
                            >
                              Descargar
                            </a>
                          }
                        />
                      </Col>
                    </Row>

                    {isNil(row.hasEndorsement) === false &&
                      row.hasEndorsement === true &&
                      row.isMain === true && (
                        <>
                          <div
                            className="ant-divider ant-divider-horizontal"
                            role="separator"
                          />
                          <h3>Fiador</h3>
                          <Row>
                            <Col span={8}>
                              <DescriptionItem
                                title="Escrituras"
                                content={
                                  <a
                                    onClick={() => {
                                      onDownloadDocumentById(
                                        {
                                          idContract: row.idContract,
                                          idCustomer: row.idCustomer,
                                          idCustomerTenant:
                                            row.idCustomerTenant,
                                          type: 12,
                                        },
                                        `Escrituras_${row.idContract}`
                                      );
                                    }}
                                  >
                                    Descargar
                                  </a>
                                }
                              />
                            </Col>
                            {row.hasINEEndorsement === 1 ||
                            row.hasINEEndorsement === true ? (
                              <>
                                <Col span={8}>
                                  <DescriptionItem
                                    title="Ine frontal"
                                    content={
                                      <a
                                        onClick={() => {
                                          onDownloadDocumentById(
                                            {
                                              idContract: row.idContract,
                                              idCustomer: row.idCustomer,
                                              idCustomerTenant:
                                                row.idCustomerTenant,
                                              type: 13,
                                            },
                                            `Identificacion1_${row.idContract}`
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
                                              idContract: row.idContract,
                                              idCustomer: row.idCustomer,
                                              idCustomerTenant:
                                                row.idCustomerTenant,
                                              type: 14,
                                            },
                                            `Identificacion1_${row.idContract}`
                                          );
                                        }}
                                      >
                                        Descargar
                                      </a>
                                    }
                                  />
                                </Col>
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
                                            idContract: row.idContract,
                                            idCustomer: row.idCustomer,
                                            idCustomerTenant:
                                              row.idCustomerTenant,
                                            type: 13,
                                          },
                                          `Identificacion1_${row.idContract}`
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
                        </>
                      )}
                    <div
                      className="ant-divider ant-divider-horizontal"
                      role="separator"
                    />
                  </>
                );
              })}
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
                <strong>No existen comentarios por parte del Inquilino</strong>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    </Drawer>
  );
};

export default SectionDetailUserTenant;
