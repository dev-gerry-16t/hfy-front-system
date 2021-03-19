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
  CheckSquareOutlined,
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
          title: "Fecha inicial",
          dataIndex: "tenantStartedAt",
          key: "tenantStartedAt",
        },
        {
          title: "Avance formulario",
          dataIndex: "tenantPercentCompleted",
          key: "tenantPercentCompleted",
          width: 200,
          render: (percent, record) => (
            <Progress percent={percent} size="small" status="succes" />
          ),
        },
      ],
    },
    {
      title: "Evaluación inquilino disponible",
      dataIndex: "canTenantBeEvaluated",
      key: "canTenantBeEvaluated",
      render: (status, record) => {
        return <span>{status === true ? "Si" : "No"}</span>;
      },
    },
    {
      title: "Referencias por evaluar",
      dataIndex: "hasPendingReferences",
      key: "hasPendingReferences",
      render: (status, record) => {
        return <span>{status === true ? "Si" : "No"}</span>;
      },
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
  ];

  return (
    <div className="renter-card-information total-width">
      <div className="title-cards flex-title-card">
        <span>Usuarios</span>
      </div>
      <div className="section-information-renters">
        {isEmpty(dataCoincidences) === false && finishCallApis === true && (
          <Table
            columns={columns}
            dataSource={dataCoincidences}
            className="table-users-hfy"
            size="small"
            bordered
            scroll={{ x: 1500 }}
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
