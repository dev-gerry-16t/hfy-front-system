import React from "react";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button } from "antd";
import Agents from "../../assets/icons/agent.svg";

const { Content } = Layout;

const Attorney = () => {
  const columns = [
    {
      title: "Folio",
      dataIndex: "invoice",
      key: "invoice",
      fixed: "left",
    },
    {
      title: "Contrato",
      children: [
        {
          title: "Estatus",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Documento",
          dataIndex: "documentContract",
          key: "documentContract",
        },
        {
          title: "Modificación",
          dataIndex: "modify",
          key: "modify",
        },
        {
          title: "Fecha de inicio",
          dataIndex: "startDate",
          key: "startDate",
        },
        {
          title: "Fecha de vencimiento",
          dataIndex: "endDate",
          key: "endDate",
        },
      ],
    },
    {
      title: "Póliza",
      children: [
        {
          title: "Estatus",
          dataIndex: "statusPolicy",
          key: "statusPolicy",
        },
        {
          title: "Documento",
          dataIndex: "documentPolicy",
          key: "documentPolicy",
        },
        {
          title: "Modificación",
          dataIndex: "modifyPolicy",
          key: "modifyPolicy",
        },
      ],
    },
    {
      title: "Pagarés",
      children: [
        {
          title: "Documento",
          dataIndex: "documentPayment",
          key: "documentPayment",
        },
        {
          title: "Modificación",
          dataIndex: "modifyPayment",
          key: "modifyPayment",
        },
      ],
    },
    {
      title: "Partes involucradas",
      children: [
        { title: "Arrendador", dataIndex: "owner", key: "owner" },
        { title: "Arrendatario", dataIndex: "tenant", key: "tenant" },
        { title: "Mensajes", dataIndex: "messages", key: "messages" },
        { title: "Documentación", dataIndex: "documents", key: "documents" },
      ],
    },
    { title: "Incidencias", dataIndex: "incidents", key: "incidents" },
  ];

  const data = [
    {
      invoice: "HOM0004",
      status: "Firmado",
      documentContract: "Ver Descargar",
      modify: "Subir",
      startDate: "25 marzo 2021",
      endDate: "25 marzo 2022",
      statusPolicy: "Asignación",
      documentPolicy: "Ver Descargar",
      modifyPolicy: "Subir",
      documentPayment: "Ver Descargar",
      modifyPayment: "Subir",
      owner: "Javier Perez Primo",
      tenant: "Martin Rodriguez Perez",
      messages: "Ver",
      documents: "Ver Descargar",
      incidents: "5 Ver",
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, Fernando</h2>
            <span>
              Último inicio de sesión: <strong>27 de marzo 2021</strong>
            </span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Información legal</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={data}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 2500 }}
              />
              <div className="table-card-users-hfy">Table</div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Attorney);
