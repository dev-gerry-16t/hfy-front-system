import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, Tabs, Pagination, Carousel } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";

const { Content } = Layout;
const { TabPane } = Tabs;

const TenantFromOwner = (props) => {
  const { dataProfile } = props;
  const dotChange = useRef(null);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

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
        <div className="actions-information-tenant">
          <div className="tabs-tenant-information">
            <Tabs
              defaultActiveKey="2"
              onChange={() => {}}
              tabBarStyle={{ color: "#A0A3BD" }}
            >
              <TabPane tab="Registrar pago" key="1">
                <div className="main-content-tabs">Hola</div>
              </TabPane>
              <TabPane tab="Documentos" key="2">
                <div className="main-content-tabs">
                  <div className="content-documents">
                    <div className="content-history">
                      <div>Select</div>
                      <div>Historial Documentos</div>
                    </div>
                    <div className="content-upload">
                      <div className="button_init_primary">
                        <label
                          type="button"
                          for="file-input"
                          onClick={() => {}}
                        >
                          <span>Subir documentos</span>
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          onChange={(e) => {
                            console.log("e.target.files", e.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="section-container-action-up">
                        <div className="container-carousel">
                          <Carousel
                            afterChange={() => {}}
                            ref={dotChange}
                            dots={false}
                          >
                            <div className="main-carousel">
                              <img
                                src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                                alt="imagen-beach"
                                width={208}
                                height={202}
                              />
                            </div>
                            <div className="main-carousel">
                              <img
                                src="data:image/jpeg;base64,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"
                                alt="imagen-beach"
                                width={208}
                                height={202}
                              />
                            </div>
                            <div className="main-carousel">
                              <img
                                src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                                alt="imagen-beach"
                                width={208}
                                height={202}
                              />
                            </div>
                          </Carousel>
                        </div>
                        <Pagination
                          pageSize={1}
                          size="small"
                          total={3}
                          onChange={(event) => {
                            dotChange.current.goTo(event - 1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Mensajes" key="3" />
              <TabPane tab="Historial de pagos" key="4" />
              <TabPane tab="Cotizar incidencia" key="5" />
            </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(TenantFromOwner);
