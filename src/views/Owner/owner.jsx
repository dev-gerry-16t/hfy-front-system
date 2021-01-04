import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import { callGetAllCustomerById } from "../../utils/actions/actions";

const { Content } = Layout;

const Owner = (props) => {
  const { dataProfile, callGetAllCustomerById, history } = props;
  const [dataCustomer, setDataCustomer] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dataOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Estadistica Mensual",
    },
    yAxis: {
      title: {
        text: "Monto",
      },
    },
    xAxis: {
      categories: ["Diciembre"],
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Ganancias",
        data: [18000],
        color: "#4E51D8",
      },
      {
        name: "Gastos",
        data: [-6000],
        color: "#EF280F",
      },
      {
        name: "Balance",
        data: [12000],
        color: "#32cd32",
      },
    ],
  };
  const handlerCallGetAllCustomerById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataCustomer(responseResult);
    } catch (error) {}
  };

  useEffect(() => {
    handlerCallGetAllCustomerById();
  }, []);

  return (
    <Content>
      <Modal
        title="Agregar Propiedad"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(!isModalVisible);
        }}
        onCancel={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Buenos días, {dataCustomer.shortName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataCustomer.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                setIsModalVisible(!isModalVisible);
              }}
            >
              <span>Registrar Propiedad</span>
            </button>
          </div>
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Registrar Inquilino</span>
            </button>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconOwner} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalCumulativeRentAmount}</h2>
            <span>
              Total Rentas Acumuladas ({dataCustomer.totalCumulativeRents})
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalExpensiveAmount}</h2>
            <span>Total Gastos Acumulados</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconActivity} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalCumulativeBalance}</h2>
            <span>Balance Acumulado</span>
          </div>
        </div>
        <div className="main-information-user">
          <div className="card-chart-information">
            <div className="title-cards">Ganancias</div>
            <div>
              <HighchartsReact highcharts={Highcharts} options={dataOptions} />
            </div>
          </div>
          <div className="renter-card-information">
            <div className="title-cards">Inquilinos</div>
            <div className="section-information-renters">
              <div className="data-renter-info">
                <div className="box-info-user">
                  <div className="avatar-user">
                    <Avatar
                      size={50}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </div>
                  <div className="info-user">
                    <strong>Pedro Ramirez</strong>
                    <Rate
                      style={{
                        fontSize: "15px",
                        position: "relative",
                        bottom: "5px",
                      }}
                      tooltips={[]}
                      onChange={() => {}}
                      value={5}
                    />
                    <div className="status-payment">
                      <span>PAGO PENDIENTE</span>
                    </div>
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Próximo Pago: <strong>03 Feb 21</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>$18,000.00</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  <button
                    type="button"
                    onClick={() => {
                      history.push("/websystem/dashboard-owner/tenant");
                    }}
                  >
                    <img src={IconArroRight} alt="arrow-right" width="15" />
                  </button>
                </div>
              </div>
              <div className="data-renter-info">
                <div className="box-info-user">
                  <div className="avatar-user">
                    <Avatar
                      size={50}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </div>
                  <div className="info-user">
                    <strong>Pedro Ramirez</strong>
                    <Rate
                      style={{
                        fontSize: "15px",
                        position: "relative",
                        bottom: "5px",
                      }}
                      tooltips={[]}
                      onChange={() => {}}
                      value={5}
                    />
                    <div className="status-payment">
                      <span>PAGO PENDIENTE</span>
                    </div>
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Próximo Pago: <strong>03 Feb 21</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>$18,000.00</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  <button>
                    <img src={IconArroRight} alt="arrow-right" width="15" />
                  </button>
                </div>
              </div>
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

const mapDispatchToProps = (dispatch) => ({
  callGetAllCustomerById: (data) => dispatch(callGetAllCustomerById(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
