import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import IconDashboard from "../../assets/icons/iconDashboard.svg";
import IconOwner from "../../assets/icons/iconHome.svg";
import IconRenter from "../../assets/icons/renter.svg";
import IconDocument from "../../assets/icons/document.svg";
import IconChat from "../../assets/icons/chat.svg";
import IconEdit from "../../assets/icons/edit.svg";
import IconShortLogo from "../../assets/icons/logoShortWhite.svg";
import IconLongtLogo from "../../assets/icons/logoLongWhite.svg";
import IconNotification from "../../assets/icons/Notification.svg";
import IconProfile from "../../assets/icons/Profile.svg";
import routes from "../../routes";

const { Header, Sider } = Layout;

const Loading = () => (
  <div className="loader-auth-spiner">
    <div />
  </div>
);

const DefaultLayout = (props) => {
  const { history, authenticated } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onClick={(e) => {}}
        >
          <div className="logo">
            <img
              src={IconLongtLogo}
              alt="Logo short"
              style={{ display: collapsed === true ? "none" : "block" }}
            />
            <img
              src={IconShortLogo}
              alt="Logo short"
              style={{ display: collapsed === true ? "block" : "none" }}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={(event) => {}}>
              <img
                className="ant-menu-item-icon"
                width="15"
                src={IconDashboard}
              />
              <span className="tex-menu-icon-ant">Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <img className="ant-menu-item-icon" width="15" src={IconOwner} />
              <span className="tex-menu-icon-ant">Propiedades</span>
            </Menu.Item>
            <Menu.Item key="3">
              <img className="ant-menu-item-icon" width="15" src={IconRenter} />
              <span className="tex-menu-icon-ant">Inquilinos</span>
            </Menu.Item>
            <Menu.Item key="4">
              <img
                className="ant-menu-item-icon"
                width="15"
                src={IconDocument}
              />
              <span className="tex-menu-icon-ant">Documentos</span>
            </Menu.Item>
            <Menu.Item key="5">
              <img className="ant-menu-item-icon" width="15" src={IconChat} />
              <span className="tex-menu-icon-ant">Mensajes</span>
            </Menu.Item>
            <Menu.Item key="6">
              <img className="ant-menu-item-icon" width="15" src={IconEdit} />
              <span>Incidencias</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header-title-button">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  onClick: toggle,
                }
              )}
              <h2>Dashboard</h2>
            </div>
            <div className="header-info-user">
              <h2>
                Hola, <strong>Usuario</strong>
              </h2>
              <button className="button-header">
                <img src={IconNotification} />
              </button>
              <button className="button-header">
                <img src={IconProfile} />
              </button>
            </div>
          </Header>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route
                    history={history}
                    key={route.id}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(prop) => {
                      if (authenticated === true) {
                        return <route.component {...prop} history={history} />;
                      } else {
                        return (
                          <Redirect
                            to={{
                              pathname: "/",
                              state: { from: props.location },
                            }}
                          />
                        );
                      }
                    }}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
