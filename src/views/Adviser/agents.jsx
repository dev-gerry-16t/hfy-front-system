import React from "react";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button } from "antd";
import Agents from "../../assets/icons/agent.svg";

const { Content } = Layout;

const AgentsSystem = () => {
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
      title: "Inmobiliaria",
      dataIndex: "realState",
      key: "realState",
      width: 200,
    },
    {
      title: "% Cierres",
      dataIndex: "closures",
      key: "closures",
    },
    {
      title: "Comisiones Primera vez",
      dataIndex: "amountFirstTime",
      key: "amountFirstTime",
    },
    {
      title: "Comisión por renovación",
      dataIndex: "amountLastTime",
      key: "amountLastTime",
    },
    {
      title: "Comisión global",
      dataIndex: "quota",
      key: "quota",
    },
    {
      title: "Última comisión",
      dataIndex: "dateComission",
      key: "dateComission",
    },
  ];

  const data = [
    {
      name: "Javier Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "javi@email.com",
      realState: "Ainsa",
      closures: "2%",
      amountFirstTime: "$15,230.00",
      amountLastTime: "$3,250.00",
      quota: "$18,480.00",
      dateComission: "12 Marzo 2021",
    },
    {
      name: "Pabel Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "pabel@email.com",
      realState: "Remax",
      closures: "21%",
      amountFirstTime: "$15,230.00",
      amountLastTime: "$3,250.00",
      quota: "$18,480.00",
      dateComission: "12 Marzo 2021",
    },
    {
      name: "Norma Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "norma@email.com",
      realState: "century",
      closures: "24%",
      amountFirstTime: "$15,230.00",
      amountLastTime: "$3,250.00",
      quota: "$18,480.00",
      dateComission: "14 Marzo 2021",
    },
    {
      name: "Francisco Rodríguez Pérez",
      phoneNumber: "5775598757",
      email: "frank@email.com",
      realState: "inmuebles21",
      closures: "15%",
      amountFirstTime: "$15,230.00",
      amountLastTime: "$3,250.00",
      quota: "$18,480.00",
      dateComission: "18 Marzo 2021",
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={Agents} alt="icon" width="20px"></img>
            </div>
            <h2>500</h2>
            <span>Total de asesores</span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Asesores</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentsSystem);
