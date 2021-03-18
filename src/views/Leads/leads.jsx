import React from "react";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button } from "antd";
import Tickets from "../../assets/icons/tickets.svg";
import Calling from "../../assets/icons/Calling.svg";
import CallMissed from "../../assets/icons/CallMissed.svg";

const { Content } = Layout;

const LeadsLandingPage = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Teléfono",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Fecha de pre-registro",
      dataIndex: "dateStart",
      key: "dateStart",
      width: 200,
    },
    {
      title: "Prospecto a",
      dataIndex: "prospect",
      key: "prospect",
    },
    {
      title: "Póliza",
      dataIndex: "policy",
      key: "policy",
    },
    {
      title: "Renta",
      dataIndex: "currentRent",
      key: "currentRent",
    },
    {
      title: "Cotización",
      dataIndex: "quota",
      key: "quota",
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      render: (status, record) => {
        return (
          <span>
            <Tag color={record.colorStatus}>{status}</Tag>
          </span>
        );
      },
    },
    {
      title: "Asignar",
      dataIndex: "asign",
      key: "asign",
      fixed: "right",
      render: (asign, record) => {
        return (
          <Dropdown
            overlay={
              <Menu onClick={(value) => {}}>
                <Menu.Item key="0">
                  <a>Atendido</a>
                </Menu.Item>
                <Menu.Item key="1">
                  <a>No interesado</a>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="primary" shape="round" size="small">
              Asignar
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const data = [
    {
      name: "Javier Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "javi@email.com",
      prospect: "Propietario",
      status: "Recibido",
      colorStatus: "blue",
      policy: "Homify Pro",
      currentRent: "$27,000.00",
      quota: "$9,450.00",
      dateStart: "15 marzo 2021",
      asign: "",
    },
    {
      name: "Pabel Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "pabel@email.com",
      prospect: "Inquilino",
      status: "Recibido",
      colorStatus: "blue",
      policy: "",
      currentRent: "",
      quota: "",
      dateStart: "15 marzo 2021",
      asign: "",
    },
    {
      name: "Norma Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "norma@email.com",
      prospect: "Inquilino",
      status: "No interesado",
      colorStatus: "red",
      policy: "",
      currentRent: "",
      quota: "",
      dateStart: "16 marzo 2021",
      asign: "",
    },
    {
      name: "Francisco Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "frank@email.com",
      prospect: "Asesor",
      status: "Atendido",
      colorStatus: "green",
      policy: "",
      currentRent: "",
      quota: "",
      dateStart: "17 marzo 2021",
      asign: "",
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={Tickets} alt="icon" width="20px"></img>
            </div>
            <h2>102</h2>
            <span>Recibidos</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#98FF98" }}>
              <img src={Calling} alt="icon" width="20px"></img>
            </div>
            <h2>13</h2>
            <span>Atendidos</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#FF6961" }}>
              <img src={CallMissed} alt="icon" width="20px"></img>
            </div>
            <h2>12</h2>
            <span>No interesados</span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Leads</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={data}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 1500 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsLandingPage);
