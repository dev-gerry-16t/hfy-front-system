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
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../../assets/icons/wallet.svg";
import IconActivity from "../../../assets/icons/activity.svg";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardOwner = (props) => {
  const {
    history,
    tenantCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onAddUser,
    onOpenDetail,
  } = props;

  const columns = [
    {
      title: "Propietario",
      dataIndex: "nameOwner",
      key: "nameOwner",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Propietario", 1);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Inquilino",
      dataIndex: "nameTenant",
      key: "nameTenant",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Inquilino", 2);
          }}
          style={{ color: "gray" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Asesor",
      dataIndex: "adviser",
      key: "adviser",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Asesor", 3);
          }}
          style={{ color: "brown" }}
        >
          {text}
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
            <Tag color={record.colorContract} key="1">
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Folio",
      dataIndex: "numberContract",
      key: "numberContract",
    },
    {
      title: "Poliza",
      dataIndex: "policyType",
      key: "policyType",
    },
    {
      title: "Vencimiento de contrato",
      dataIndex: "dateContractEnd",
      key: "dateContractEnd",
      align: "center",
    },
    {
      title: "Estatus de poliza",
      dataIndex: "statusPolicy",
      key: "statusPolicy",
      align: "center",
      render: (status, record) => {
        let component = <div />;
        if (status === true) {
          component = (
            <div>
              <Button
                type="primary"
                shape="round"
                icon={<CheckSquareOutlined />}
                size="small"
              >
                Cerrar
              </Button>
            </div>
          );
        } else if (status === false) {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className="fa fa-handshake-o" aria-hidden="true" />
                </span>
              }
              color="#00bb2d"
            >
              Cerrado
            </Tag>
          );
        }
        return component;
      },
    },
  ];

  const data = [
    {
      key: "1",
      nameOwner: "Juan Carlos Gutierres",
      nameTenant: "Sebastian Perez",
      contractStatus: "VIGENTE",
      colorContract: "green",
      numberContract: "59029488",
      policyType: "Homify Basica",
      dateContractEnd: "25/01/2022",
      adviser: "Angel Cortez Avendaño",
      statusPolicy: false,
    },
    {
      key: "2",
      nameOwner: "Pedro Alvarez Saldaña",
      nameTenant: "Joaquin Gutierrez Mendez",
      contractStatus: "EN PROCESO",
      colorContract: "blue",
      numberContract: "N/A",
      policyType: "N/A",
      dateContractEnd: "N/A",
      adviser: "Angel Cortez Avendaño",
      statusPolicy: true,
    },
    {
      key: "3",
      nameOwner: "Jose Luis Manriquez",
      nameTenant: "Alberto Guzman Ortiz",
      contractStatus: "POR CONCLUIR",
      colorContract: "red",
      numberContract: "34874792",
      policyType: "Homify Premium",
      dateContractEnd: "03/02/2021",
      adviser: "Francisco Ortega",
      statusPolicy: true,
    },
  ];

  const formatDate = (date) => {
    let dateFormat = "";
    if (date !== "NA") {
      dateFormat = moment(date, "DD/MM/YYYY").format("DD MMMM YYYY");
    } else {
      dateFormat = date;
    }
    return dateFormat;
  };

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
        <Table columns={columns} dataSource={data} />
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes propietarios</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardOwner;
