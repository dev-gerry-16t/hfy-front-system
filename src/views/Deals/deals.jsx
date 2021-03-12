import React from "react";
import { connect } from "react-redux";
import { Layout, Table, Tag } from "antd";

const { Content } = Layout;

const DealsLandingPage = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
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
      title: "Prospecto a",
      dataIndex: "prospect",
      key: "prospect",
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
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
      asign: "",
    },
    {
      name: "Pabel Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "pabel@email.com",
      prospect: "Inquilino",
      status: "Recibido",
      colorStatus: "blue",
      asign: "",
    },
    {
      name: "Norma Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "norma@email.com",
      prospect: "Inquilino",
      status: "No interesado",
      colorStatus: "red",
      asign: "",
    },
    {
      name: "Francisco Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "frank@email.com",
      prospect: "Asesor",
      status: "Atendido",
      colorStatus: "green",
      asign: "",
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="indicators-amount-renter">
          {/* <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={Tickets} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.grandTotalSale}</h2>
            <span>
              Ventas <strong>({dataStats.totalClosings})</strong>
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#FF6961" }}>
              <img src={Payments} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalCommissionAmount}</h2>
            <span>
              Comisiones pagadas <strong>({dataStats.totalCommissions})</strong>
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#98FF98" }}>
              <img src={Balance} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalBalance}</h2>
            <span>Balance</span>
          </div>
       */}
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Pre-registrados</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={data}
                className="table-users-hfy"
                size="small"
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

export default connect(mapStateToProps, mapDispatchToProps)(DealsLandingPage);
