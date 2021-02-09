import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Layout, Menu, Drawer, notification } from "antd";
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
import IconClose from "../../assets/icons/LogoutWhite.svg";
import routes from "../../routes";

const { Header, Sider } = Layout;

const Loading = () => (
  <div className="loader-auth-spiner">
    <div />
  </div>
);

const DefaultLayout = (props) => {
  const { history, authenticated, dataProfileMenu, dataProfile } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [nameSection, setNameSection] = useState("Dashboard");
  const [collapsedButton, setCollapsedButton] = useState(false);
  const arrayIconst = {
    IconDashboard,
    IconOwner,
    IconRenter,
    IconDocument,
    IconChat,
    IconEdit,
    IconClose,
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (isNil(dataProfile) === true) {
      history.push("/");
    }
  }, []);

  return (
    <div className="App">
      {isNil(dataProfile) === false && (
        <Layout>
          <Drawer
            placement="left"
            className="drawer-menu_header"
            closable={false}
            onClose={() => {
              setCollapsedButton(!collapsedButton);
            }}
            visible={collapsedButton}
            key="left"
          >
            {" "}
            <div className="logo">
              <img src={IconLongtLogo} alt="Logo short" />
              <img
                src={IconShortLogo}
                alt="Logo short"
                style={{ display: collapsed === true ? "block" : "none" }}
              />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {isEmpty(dataProfileMenu) === false &&
                dataProfileMenu.map((row) => {
                  return (
                    <Menu.Item
                      key={`${row.idMenu}`}
                      onClick={(event) => {
                        history.push(row.path);
                        setNameSection(row.menuName);
                        setCollapsedButton(!collapsedButton);
                      }}
                    >
                      <img
                        className="ant-menu-item-icon"
                        width="15"
                        src={arrayIconst[row.icon]}
                      />
                      <span className="tex-menu-icon-ant">{row.menuName}</span>
                    </Menu.Item>
                  );
                })}
            </Menu>
          </Drawer>
          <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
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
              {isEmpty(dataProfileMenu) === false &&
                dataProfileMenu.map((row) => {
                  return (
                    <Menu.Item
                      key={`${row.idMenu}`}
                      onClick={(event) => {
                        setNameSection(row.menuName);
                        history.push(row.path);
                      }}
                    >
                      <img
                        className="ant-menu-item-icon"
                        width="15"
                        src={arrayIconst[row.icon]}
                      />
                      <span className="tex-menu-icon-ant">{row.menuName}</span>
                    </Menu.Item>
                  );
                })}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="header-title-button">
                <button
                  className="button-drawer-header"
                  onClick={() => {
                    setCollapsedButton(!collapsedButton);
                  }}
                >
                  {React.createElement(
                    collapsedButton ? MenuUnfoldOutlined : MenuFoldOutlined
                  )}
                </button>
                <h2>{nameSection}</h2>
              </div>
              <div className="header-info-user">
                <div className="hi-user-name-type">
                  <strong>{dataProfile.showName}</strong>
                  <span>{dataProfile.userType}</span>
                </div>
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
                          return (
                            <route.component {...prop} history={history} />
                          );
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataProfileMenu: dataProfileMenu.dataProfileMenu,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
