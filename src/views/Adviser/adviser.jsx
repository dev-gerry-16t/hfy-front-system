import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import IconPolicy from "../../assets/icons/Policy.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import {} from "../../utils/actions/actions";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionCardOwner from "./sections/sectionCardOwner";

const { Content } = Layout;

const Adviser = (props) => {
  const { dataProfile, history } = props;
  return (
    <Content>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, Asesor</h2>
            <span>
              Último inicio de sesión: <strong>25 enero 2021</strong>
            </span>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>$18,000.00</h2>
            <span>Total Comisiones</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconPolicy} alt="icon" width="20px"></img>
            </div>
            <h2>45</h2>
            <span>Polizas</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconActivity} alt="icon" width="20px"></img>
            </div>
            <h2>2</h2>
            <span>Renovaciones</span>
          </div>
        </div>
        <div className="main-information-user">
          <SectionStatsChart
            dataStatsChart={[
              {
                mes: "Noviembre, 2021",
                ganancia: 35307.5,
                gananciaFormat: "$ 35,307.50 MXN",
                colorGanancia: "#4E51D8",
                gasto: 0,
                gastoFormat: "$ 0.00 MXN",
                colorGasto: "#EF280F",
                balance: 55307.5,
                balanceFormat: "$ 35,307.50 MXN",
                colorBalance: "#32cd32",
              },
              {
                mes: "Diciembre, 2021",
                ganancia: 15307.5,
                gananciaFormat: "$ 15,307.50 MXN",
                colorGanancia: "#4E51D8",
                gasto: 0,
                gastoFormat: "$ 0.00 MXN",
                colorGasto: "#EF280F",
                balance: 55307.5,
                balanceFormat: "$ 15,307.50 MXN",
                colorBalance: "#32cd32",
              },
              {
                mes: "Enero, 2021",
                ganancia: 55307.5,
                gananciaFormat: "$ 55,307.50 MXN",
                colorGanancia: "#4E51D8",
                gasto: 0,
                gastoFormat: "$ 0.00 MXN",
                colorGasto: "#EF280F",
                balance: 55307.5,
                balanceFormat: "$ 55,307.50 MXN",
                colorBalance: "#32cd32",
              },
            ]}
            finishCallApis
          />
          <SectionCardOwner
            history={history}
            tenantCoincidences={[{}]}
            finishCallApis
            onClickSendInvitation={() => {}}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Adviser);
