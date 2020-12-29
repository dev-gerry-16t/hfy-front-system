import React from "react";
import { connect } from "react-redux";
import { Layout, Avatar } from "antd";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";

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
                      size={60}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </div>
                  <div className="info-user">
                    <div>Nombre</div>
                    <div>Rating</div>
                    <div>Status</div>
                  </div>
                  <div className="info-user-payment">
                    <div>
                      Proximo Pago: <strong>03 Feb 21</strong>
                    </div>
                    <div>
                      Monto de Rebta: <strong>$18,000.00</strong>
                    </div>
                  </div>
                </div>
                <div className="button-collapse">
                  <button>></button>
                </div>
              </div>
              <div className="data-renter-info">Inquilino 2</div>
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
