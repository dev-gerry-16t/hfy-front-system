import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Skeleton,
  Table,
  Tag,
  Button,
  Popover,
  Row,
  Col,
  Select,
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import {
  UserOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CheckOutlined,
  CheckCircleTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../../assets/icons/wallet.svg";
import IconActivity from "../../../assets/icons/activity.svg";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import Arrow from "../../../assets/icons/Arrow.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";
import DocumentIcon from "../../../assets/icons/DocumentsIcon.svg";
import Lock from "../../../assets/icons/Lock.svg";

moment.locale("es");
const { Option } = Select;

const SectionCardOwner = (props) => {
  const {
    history,
    dataCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onAddUser,
    onOpenDetail,
    onGetPolicyStatus,
    dataAllPolicyStatus,
    onClosePolicy,
    onOpenUploadDocument,
  } = props;

  const [openPopover, setOpenPopover] = useState({});
  const [selectPolicy, setSelectPolicy] = useState(null);

  const renderCardComponent = (status, record) => {
    let component = <div />;
    const contractStatus = record.contractStatus;
    if (status === 1) {
      component = (
        <Popover
          visible={
            isNil(openPopover[`popover1-${record.idContract}`]) === false
              ? openPopover[`popover1-${record.idContract}`]
              : false
          }
          content={
            <>
              <Row style={{ marginBottom: 10 }}>
                <Col span={24}>
                  <Select
                    placeholder="Póliza por"
                    onChange={(value, option) => {
                      setSelectPolicy(value);
                    }}
                    style={{ width: "100%" }}
                  >
                    {isEmpty(dataAllPolicyStatus) === false &&
                      dataAllPolicyStatus.map((row) => {
                        return (
                          <Option
                            value={row.idPolicyStatus}
                            onClick={() => {
                              return row;
                            }}
                          >
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={6} />
                <Col span={12}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<CheckOutlined />}
                    size="small"
                    className="color-green"
                    onClick={() => {
                      onClosePolicy({
                        ...record,
                        idPolicyStatus: selectPolicy,
                      });
                      setOpenPopover({
                        [`popover1-${record.idContract}`]: false,
                      });
                    }}
                  >
                    Aceptar
                  </Button>
                </Col>
                <Col span={6} />
              </Row>
            </>
          }
          title={
            <div>
              <span>Asignar cierre de Póliza</span>
              <button
                type="button"
                onClick={() => {
                  setOpenPopover({
                    [`popover1-${record.idContract}`]: false,
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
        >
          <Button
            type="primary"
            shape="round"
            icon={<CheckSquareOutlined />}
            size="small"
            onClick={() => {
              setOpenPopover({
                [`popover1-${record.idContract}`]: true,
              });
              onGetPolicyStatus(record.idContract);
            }}
          >
            {record.policyStatus}
          </Button>
        </Popover>
      );
    } else if (status === 2 || status === 3) {
      component = (
        <Tag
          icon={
            <span className="anticon">
              <i className="fa fa-handshake-o" aria-hidden="true" />
            </span>
          }
          color="#00bb2d"
        >
          {record.policyStatus}
        </Tag>
      );
    } else if (status === 4) {
      component = (
        <Tag
          icon={
            <span className="anticon">
              <i className="fa fa-ban" aria-hidden="true" />
            </span>
          }
          color="#ff0000"
        >
          {record.policyStatus}
        </Tag>
      );
    }
    return component;
  };

  const columns = [
    {
      title: "Propietario",
      dataIndex: "customerFullName",
      key: "customerFullName",
      width: 230,
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            onClick={() => {
              onOpenDetail(record.idContract, 1, record);
            }}
            style={{ marginRight: "5PX" }}
          >
            {text}
          </a>
          {record.hasCustomerFinishedTF === true ? (
            <CheckCircleTwoTone twoToneColor="#32cd32" />
          ) : (
            <EditTwoTone twoToneColor="#4169e1" />
          )}
        </div>
      ),
    },
    {
      title: "Inquilino",
      width: 230,
      dataIndex: "customerTenantFullName",
      key: "customerTenantFullName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            onClick={() => {
              onOpenDetail(record.idContract, 2, record);
            }}
            style={{ color: "gray", marginRight: "5PX" }}
          >
            {text}
          </a>
          {record.hasCustomerTenantFinishedTF === true ? (
            <CheckCircleTwoTone twoToneColor="#32cd32" />
          ) : (
            <EditTwoTone twoToneColor="#4169e1" />
          )}
        </div>
      ),
    },
    {
      title: "Asesor",
      width: 200,
      dataIndex: "customerAgentFullName",
      key: "customerAgentFullName",
      render: (text, record) => (
        <a
          onClick={() => {
            if (isNil(text) === false) {
              onOpenDetail(record.idContract, 3, record);
            }
          }}
          style={{ color: "brown" }}
        >
          {isNil(text) === false ? text : "N/A"}
        </a>
      ),
    },
    {
      title: "Contrato",
      dataIndex: "contractStatus",
      key: "contractStatus",
      align: "center",
      render: (status, record) => {
        return (
          <span>
            <Tag color={record.contractStatusStyle} key="1">
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Folio",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
      render: (label, record) => {
        const recorsStyle =
          isNil(record.hfInvoiceStyle) === false &&
          isEmpty(record.hfInvoiceStyle) === false
            ? JSON.parse(record.hfInvoiceStyle)
            : {};
        return <span style={recorsStyle}>{label}</span>;
      },
    },
    {
      title: "Monto Renta",
      dataIndex: "currentRent",
      key: "currentRent",
      width: 150,
    },
    {
      title: "Monto total de contrato",
      dataIndex: "totalContractAmount",
      key: "totalContractAmount",
      width: 150,
    },
    {
      title: "Póliza",
      dataIndex: "policy",
      key: "policy",
    },
    {
      title: "Valor de la póliza",
      dataIndex: "totalPolicyAmount",
      key: "totalPolicyAmount",
      width: 150,
    },
    {
      title: "Comisión asesor",
      dataIndex: "commissionDescription",
      key: "commissionDescription",
      width: 250,
    },
    {
      title: "Vencimiento de contrato",
      dataIndex: "expireAt",
      key: "expireAt",
      align: "center",
    },
    {
      title: "Estatus de póliza",
      dataIndex: "idPolicyStatus",
      key: "idPolicyStatus",
      fixed: "right",
      align: "center",
      render: (status, record) => {
        let component = <div />;
        const contractStatus = record.contractStatus;
        if (status === 1) {
          component = (
            <div>
              <Popover
                visible={
                  isNil(openPopover[`popover-${record.idContract}`]) === false
                    ? openPopover[`popover-${record.idContract}`]
                    : false
                }
                content={
                  <>
                    <Row style={{ marginBottom: 10 }}>
                      <Col span={24}>
                        <Select
                          placeholder="Póliza por"
                          onChange={(value, option) => {
                            setSelectPolicy(value);
                          }}
                          style={{ width: "100%" }}
                        >
                          {isEmpty(dataAllPolicyStatus) === false &&
                            dataAllPolicyStatus.map((row) => {
                              return (
                                <Option
                                  value={row.idPolicyStatus}
                                  onClick={() => {
                                    return row;
                                  }}
                                >
                                  {row.text}
                                </Option>
                              );
                            })}
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6} />
                      <Col span={12}>
                        <Button
                          type="primary"
                          shape="round"
                          icon={<CheckOutlined />}
                          size="small"
                          className="color-green"
                          onClick={() => {
                            onClosePolicy({
                              ...record,
                              idPolicyStatus: selectPolicy,
                            });
                            setOpenPopover({
                              [`popover-${record.idContract}`]: false,
                            });
                          }}
                        >
                          Aceptar
                        </Button>
                      </Col>
                      <Col span={6} />
                    </Row>
                  </>
                }
                title={
                  <div>
                    <span>Asignar cierre de Póliza</span>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenPopover({
                          [`popover-${record.idContract}`]: false,
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
              >
                <Button
                  type="primary"
                  shape="round"
                  icon={<CheckSquareOutlined />}
                  size="small"
                  onClick={() => {
                    setOpenPopover({
                      [`popover-${record.idContract}`]: true,
                    });
                    onGetPolicyStatus(record.idContract);
                  }}
                >
                  {record.policyStatus}
                </Button>
              </Popover>
            </div>
          );
        } else if (status === 2 || status === 3) {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className="fa fa-handshake-o" aria-hidden="true" />
                </span>
              }
              color="#00bb2d"
            >
              {record.policyStatus}
            </Tag>
          );
        } else if (status === 4) {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className="fa fa-ban" aria-hidden="true" />
                </span>
              }
              color="#ff0000"
            >
              {record.policyStatus}
            </Tag>
          );
        }
        return component;
      },
    },
    {
      title: "Documentos",
      dataIndex: "hasAllDocumentation",
      key: "hasAllDocumentation",
      align: "center",
      fixed: "right",
      render: (documents, record) => {
        return (
          <div>
            <button
              className="arrow-back-to"
              type="button"
              style={{ border: "none", background: "transparent" }}
              onClick={() => {
                if (documents === false) {
                  onOpenUploadDocument(record.idContract);
                }
              }}
            >
              {documents === false ? (
                <img src={DocumentIcon} alt="backTo" width="20" />
              ) : (
                <img src={Lock} alt="backTo" width="20" />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="renter-card-information total-width">
      <div className="title-cards flex-title-card">
        <span>Usuarios</span>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={() => {
              onAddUser();
            }}
          >
            <span>Agregar</span>
          </button>
        </div>
      </div>
      <div className="section-information-renters">
        {isEmpty(dataCoincidences) === false && finishCallApis === true && (
          <Table
            columns={columns}
            dataSource={dataCoincidences}
            className="table-users-hfy"
            size="small"
            scroll={{ x: 2500 }}
          />
        )}
        {isEmpty(dataCoincidences) === false && (
          <div className="table-card-users-hfy">
            {dataCoincidences.map((row) => {
              const recorsStyle =
                isNil(row.hfInvoiceStyle) === false &&
                isEmpty(row.hfInvoiceStyle) === false
                  ? JSON.parse(row.hfInvoiceStyle)
                  : {};

              return (
                <div className="card-users-hfy">
                  <table>
                    <tr>
                      <td>
                        <strong>Propietario: </strong>
                        <a
                          onClick={() => {
                            onOpenDetail(row.idContract, 1, row);
                          }}
                          style={{ marginRight: "5px" }}
                        >
                          {row.customerFullName}
                        </a>
                        {row.hasCustomerFinishedTF === true ? (
                          <CheckCircleTwoTone twoToneColor="#32cd32" />
                        ) : (
                          <EditTwoTone twoToneColor="#4169e1" />
                        )}
                      </td>
                      <td>
                        <strong>Inquilino:</strong>{" "}
                        <a
                          onClick={() => {
                            onOpenDetail(row.idContract, 2, row);
                          }}
                          style={{ color: "gray", marginRight: "5px" }}
                        >
                          {row.customerTenantFullName}
                        </a>
                        {row.hasCustomerTenantFinishedTF === true ? (
                          <CheckCircleTwoTone twoToneColor="#32cd32" />
                        ) : (
                          <EditTwoTone twoToneColor="#4169e1" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Asesor:</strong>{" "}
                        <a
                          onClick={() => {
                            if (isNil(row.customerAgentFullName) === false) {
                              onOpenDetail(row.idContract, 3, row);
                            }
                          }}
                          style={{ color: "brown" }}
                        >
                          {isNil(row.customerAgentFullName) === false
                            ? row.customerAgentFullName
                            : "N/A"}
                        </a>
                      </td>
                      <td>
                        <strong>Contrato:</strong>{" "}
                        <span>
                          <Tag color={row.contractStatusStyle} key="1">
                            {row.contractStatus}
                          </Tag>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Folio:</strong>{" "}
                        <span style={recorsStyle}>{row.hfInvoice}</span>
                      </td>
                      <td>
                        <strong>Póliza:</strong> <span> {row.policy}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Vencimiento:</strong>{" "}
                        <span> {row.expireAt}</span>
                      </td>
                      <td>
                        <strong>Estatus:</strong>{" "}
                        {renderCardComponent(row.idPolicyStatus, row)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Monto Renta:</strong>
                        <span> {row.currentRent}</span>
                      </td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <strong>Documentos:</strong>
                        <div>
                          <button
                            className="arrow-back-to"
                            type="button"
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                            onClick={() => {
                              if (row.hasAllDocumentation === false) {
                                onOpenUploadDocument(row.idContract);
                              }
                            }}
                          >
                            {row.hasAllDocumentation === false ? (
                              <img src={DocumentIcon} alt="backTo" width="20" />
                            ) : (
                              <img src={Lock} alt="backTo" width="20" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          </div>
        )}
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(dataCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes propietarios</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardOwner;
