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
            isNil(openPopover[`popover1-${record.key}`]) === false
              ? openPopover[`popover1-${record.key}`]
              : false
          }
          content={
            <>
              <Row style={{ marginBottom: 10 }}>
                <Col span={24}>
                  <Select
                    placeholder="Poliza por"
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
                    }}
                  >
                    Cerrar
                  </Button>
                </Col>
                <Col span={6} />
              </Row>
            </>
          }
          title={
            <div>
              <span>Asignar cierre de Poliza</span>
              <button
                type="button"
                onClick={() => {
                  setOpenPopover({
                    [`popover1-${record.key}`]: false,
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
                [`popover1-${record.key}`]: true,
              });
              onGetPolicyStatus(record.idContract);
            }}
          >
            {record.policyStatus}
          </Button>
        </Popover>
      );
    } else if (status === 2) {
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
    } else if (contractStatus === 3) {
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
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            onClick={() => {
              onOpenDetail("Propietario", 1);
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
      dataIndex: "customerTenantFullName",
      key: "customerTenantFullName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            onClick={() => {
              onOpenDetail("Inquilino", 2);
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
      dataIndex: "customerAgentFullName",
      key: "customerAgentFullName",
      render: (text) => (
        <a
          onClick={() => {
            if (isNil(text) === false) {
              onOpenDetail("Asesor", 3);
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
    },
    {
      title: "Monto Renta",
      dataIndex: "currentRent",
      key: "currentRent",
    },
    {
      title: "Poliza",
      dataIndex: "policy",
      key: "policy",
    },
    {
      title: "Vencimiento de contrato",
      dataIndex: "expireAt",
      key: "expireAt",
      align: "center",
    },
    {
      title: "Estatus de poliza",
      dataIndex: "idPolicyStatus",
      key: "idPolicyStatus",
      align: "center",
      render: (status, record) => {
        let component = <div />;
        const contractStatus = record.contractStatus;
        if (status === 1) {
          component = (
            <div>
              <Popover
                visible={
                  isNil(openPopover[`popover-${record.key}`]) === false
                    ? openPopover[`popover-${record.key}`]
                    : false
                }
                content={
                  <>
                    <Row style={{ marginBottom: 10 }}>
                      <Col span={24}>
                        <Select
                          placeholder="Poliza por"
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
                          }}
                        >
                          Cerrar
                        </Button>
                      </Col>
                      <Col span={6} />
                    </Row>
                  </>
                }
                title={
                  <div>
                    <span>Asignar cierre de Poliza</span>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenPopover({
                          [`popover-${record.key}`]: false,
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
                      [`popover-${record.key}`]: true,
                    });
                    onGetPolicyStatus(record.idContract);
                  }}
                >
                  {record.policyStatus}
                </Button>
              </Popover>
            </div>
          );
        } else if (status === 2) {
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
        } else if (contractStatus === 3) {
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
          />
        )}
        {isEmpty(dataCoincidences) === false && (
          <div className="table-card-users-hfy">
            {dataCoincidences.map((row) => {
              return (
                <div className="card-users-hfy">
                  <table>
                    <tr>
                      <td>
                        <strong>Propietario: </strong>
                        <a
                          onClick={() => {
                            onOpenDetail("Propietario", 1);
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
                            onOpenDetail("Inquilino", 2);
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
                              onOpenDetail("Asesor", 3);
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
                        <strong>Folio:</strong> <span>{row.hfInvoice} </span>
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
