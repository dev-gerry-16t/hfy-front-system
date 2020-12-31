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

const { Content } = Layout;

const Owner = (props) => {
  const { dataProfile } = props;

  return (
    <Content>
      <div className="margin-app-main">
        <div className="top-info-tenant">
          <div className="card-info-tenant">
            <div className="avatar-user">
              <Avatar
                size={70}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </div>
            <div className="info-tenant">
              <div className="info-user">
                <strong>Pedro Ramirez</strong>
                <Rate
                  style={{
                    fontSize: "30px",
                    position: "relative",
                    bottom: "5px",
                  }}
                  tooltips={[]}
                  onChange={() => {}}
                  value={5}
                />
              </div>
              <div className="data-contact">
                Telefrono: 55 55555 5555
                <br />
                Email: correo@correo.com
              </div>
            </div>
          </div>
          <div className="card-data-tenant">
            <div className="info-property-tenant">
              <div>
                <span>Propiedad:</span>
                <span>Departamento:</span>
                <span>Próximo Pago:</span>
                <span>Monto de Renta:</span>
                <span>Incidencias:</span>
              </div>
              <div>
                <strong>Grand del Valle</strong>
                <strong>I201</strong>
                <strong>03 Feb 21</strong>
                <strong>$18,000.00</strong>
                <strong>2</strong>
              </div>
            </div>
            <div className="status-tenant">
              <div className="status-payment">
                <span>PAGO PENDIENTE</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
