import React from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate } from "antd";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";

const { Content } = Layout;

const ViewContent = () => {
  return (
    <Content>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Buenos días, Patricia</h2>
            <span>
              Último inicio de sesión: <strong>03 Dic 20 10:48 am</strong>
            </span>
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
            <h2>$38,000.00</h2>
            <span>Total Rentas Acumuladas (3)</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>$8,500.00</h2>
            <span>Total Rentas Acumuladas (3)</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconActivity} alt="icon" width="20px"></img>
            </div>
            <h2>$29,500.00</h2>
            <span>Total Rentas Acumuladas (3)</span>
          </div>
        </div>
        <div className="main-information-user">
          <div className="card-chart-information">
            <div className="title-cards">Ganancias</div>
            <div>Grafica</div>
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
                  <button>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewContent);
