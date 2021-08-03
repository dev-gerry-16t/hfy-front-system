import React from "react";
import { Skeleton, Table, Tag, Progress } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { CheckCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardOwner = (props) => {
  const { dataCoincidences, finishCallApis, onOpenDetail } = props;

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
          width: 230,
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
        {
          title: "Avance formulario Obligado S.",
          dataIndex: "boundSolidarityPercentCompleted",
          key: "boundSolidarityPercentCompleted",
          width: 230,
          render: (percent, record) => (
            <div style={{ padding: "0px 15px 0px 0px" }}>
              {record.hasBoundSolidarity === true ? (
                <Progress
                  percent={isNil(percent) === false ? percent : 0}
                  size="small"
                  status="succes"
                />
              ) : (
                "N/A"
              )}
            </div>
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
      fixed: "right",
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
            scroll={{ x: 2500 }}
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
