import React, { useState } from "react";
import {
  Skeleton,
  Table,
  Tag,
  Button,
  Popover,
  Row,
  Col,
  Select,
  Progress,
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import {
  CheckOutlined,
  CheckCircleTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";
import DocumentIcon from "../../../assets/icons/DocumentsIcon.svg";
import Lock from "../../../assets/icons/Lock.svg";

moment.locale("es");
const { Option } = Select;

const SectionCardOwner = (props) => {
  const {
    dataCoincidences,
    finishCallApis,
    onAddUser,
    onOpenDetail,
    onGetPolicyStatus,
    dataAllPolicyStatus,
    onClosePolicy,
    onOpenUploadDocument,
    onSendActionInvitation,
  } = props;

  const [openPopover, setOpenPopover] = useState({});
  const [selectPolicy, setSelectPolicy] = useState(null);

  const columns = [
    {
      title: "Folio",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
      width: 100,
      fixed: "left",
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
      title: "Propietario",
      children: [
        {
          title: "Nombre",
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
          title: "Inicio TypeForm",
          dataIndex: "customerStartedAt",
          key: "customerStartedAt",
        },
        {
          title: "Avance formulario",
          dataIndex: "customerPercentCompleted",
          key: "customerPercentCompleted",
          width: 200,
          render: (percent, record) => (
            <div style={{ padding: "0px 15px 0px 0px" }}>
              <Progress
                percent={isNil(percent) === false ? percent : 0}
                size="small"
                status="succes"
              />
            </div>
          ),
        },
      ],
    },
    {
      title: "Inquilino",
      children: [
        {
          title: "Nombre",
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
          title: "Inicio TypeForm",
          dataIndex: "tenantStartedAt",
          key: "tenantStartedAt",
        },
        {
          title: "Avance formulario",
          dataIndex: "tenantPercentCompleted",
          key: "tenantPercentCompleted",
          width: 200,
          render: (percent, record) => (
            <div style={{ padding: "0px 15px 0px 0px" }}>
              <Progress
                percent={isNil(percent) === false ? percent : 0}
                size="small"
                status="succes"
              />
            </div>
          ),
        },
      ],
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
      width: 250,
      render: (status, record) => {
        let component = <div />;
        const styleStatus =
          isNil(record.plicyStatusStyle) === false &&
          isEmpty(record.plicyStatusStyle) === false
            ? JSON.parse(record.plicyStatusStyle)
            : {};
        if (record.canBeChanged === true) {
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
                  icon={
                    <span className="anticon">
                      <i className={styleStatus.style} aria-hidden="true" />
                    </span>
                  }
                  size="small"
                  style={{
                    background: styleStatus.color,
                    border: "none",
                  }}
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
        } else {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className={styleStatus.style} aria-hidden="true" />
                </span>
              }
              color={styleStatus.color}
            >
              {record.policyStatus}
            </Tag>
          );
        }
        return component;
      },
    },
    {
      title: (
        <div>
          <span>Invitación</span>
          <br />
          <span>Eliminar/Reenviar</span>
        </div>
      ),
      dataIndex: "actions",
      key: "actions",
      align: "center",
      fixed: "right",
      render: (documents, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {record.canBeDeleted === true && (
              <button
                type="button"
                style={{ border: "none", background: "transparent" }}
                onClick={async () => {
                  try {
                    await onSendActionInvitation(
                      {
                        isActive: false,
                        requestResend: false,
                      },
                      record.idProspect
                    );
                  } catch (error) {}
                }}
              >
                <i
                  className="fa fa-trash-o"
                  style={{ fontSize: 18, color: "red" }}
                />
              </button>
            )}
            {record.canRequestResend === true && (
              <button
                type="button"
                style={{ border: "none", background: "transparent" }}
                onClick={async () => {
                  try {
                    await onSendActionInvitation(
                      {
                        isActive: true,
                        requestResend: true,
                      },
                      record.idProspect
                    );
                  } catch (error) {}
                }}
              >
                <i
                  className="fa fa-paper-plane-o"
                  style={{ fontSize: 18, color: "#1890ff" }}
                />
              </button>
            )}
            {record.canBeDeleted === false &&
              record.canRequestResend === false && (
                <i
                  className="fa fa-circle-o"
                  style={{ fontSize: 18, color: "gray" }}
                />
              )}
          </div>
        );
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
            bordered
            scroll={{ x: 3000 }}
          />
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
