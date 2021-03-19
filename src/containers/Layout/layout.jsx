import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Layout, Menu, Drawer, Dropdown, Avatar } from "antd";
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
import IconCloseLogout from "../../assets/icons/Logout.svg";
import IconLead from "../../assets/icons/IconLead.svg";
import routes from "../../routes";
import SectionChangeImage from "./section/sectionChangeImage";
import { callSetImageProfile } from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";

const { Header, Sider } = Layout;

const Loading = () => (
  <div className="loader-auth-spiner">
    <div />
  </div>
);

const DefaultLayout = (props) => {
  const {
    history,
    authenticated,
    dataProfileMenu,
    dataProfile,
    callSetImageProfile,
    setDataUserProfile,
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [isVisibleAvatarSection, setIsVisibleAvatarSection] = useState(false);
  const [collapsedButton, setCollapsedButton] = useState(false);
  const arrayIconst = {
    IconDashboard,
    IconOwner,
    IconRenter,
    IconDocument,
    IconChat,
    IconEdit,
    IconClose,
    IconLead,
  };

  const nameLocation = () => {
    const name = routes.find((row) => {
      return row.path === props.location.pathname;
    });
    return isNil(name) === false && isNil(name.name) === false
      ? name.name
      : "Dashboard";
  };

  const [nameSection, setNameSection] = useState(nameLocation());
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handlerCallSetImageProfile = async (data) => {
    const { idCustomer, idLoginHistory, idSystemUser } = dataProfile;
    try {
      await callSetImageProfile(
        {
          idCustomer,
          idLoginHistory,
          documentName: "avatar_image",
          extension: "png/img",
          preview: null,
          thumbnail: data,
        },
        idSystemUser
      );
      await setDataUserProfile({
        ...dataProfile,
        thumbnail: data,
      });
    } catch (error) {}
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_self"
          rel="noopener noreferrer"
          onClick={() => {
            setIsVisibleAvatarSection(!isVisibleAvatarSection);
          }}
        >
          Imagen de perfil
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.ItemGroup title="Cambiar tema">
        <Menu.Item
          style={{ display: "flex" }}
          onClick={() => {
            const theme = document.getElementsByTagName("body")[0];
            theme.className = "theme-light";
            localStorage.setItem("theme-app", "theme-light");
          }}
        >
          <div
            style={{
              background: "#ff0282",
              padding: "0px 10px",
              color: "#fff",
            }}
          >
            Light
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex" }}
          onClick={() => {
            const theme = document.getElementsByTagName("body")[0];
            theme.className = "theme-dark";
            localStorage.setItem("theme-app", "theme-dark");
          }}
        >
          <div
            style={{
              background: "#0c101d",
              padding: "0px 10px",
              color: "#fff",
            }}
          >
            Dark
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex" }}
          onClick={() => {
            const theme = document.getElementsByTagName("body")[0];
            theme.className = "theme-purple";
            localStorage.setItem("theme-app", "theme-purple");
          }}
        >
          <div
            style={{
              background: "#9a78b0",
              padding: "0px 10px",
              color: "#fff",
            }}
          >
            Purple
          </div>
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex" }}
          onClick={() => {
            const theme = document.getElementsByTagName("body")[0];
            theme.className = "theme-dark-blue";
            localStorage.setItem("theme-app", "theme-dark-blue");
          }}
        >
          <div
            style={{
              background: "#072146",
              padding: "0px 10px",
              color: "#fff",
            }}
          >
            Dark Blue
          </div>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item style={{ display: "flex" }}>
        <img
          className="ant-menu-item-icon"
          width="15"
          src={IconCloseLogout}
          style={{ marginRight: "5px" }}
        />
        <a target="_self" rel="Cerrrar sesión" href="/logout">
          Cerrar sesión
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const documentHead = document.getElementsByTagName("head");
    const headExtractNode =
      isNil(documentHead) === false &&
      isEmpty(documentHead) === false &&
      isNil(documentHead[0]) === false
        ? documentHead[0]
        : [];
    if (isNil(dataProfile) === true) {
      history.push("/");
    }
    const getThemeApplication = localStorage.getItem("theme-app");

    if (isNil(getThemeApplication) === false) {
      const theme = document.getElementsByTagName("body")[0];
      theme.className = getThemeApplication;
      localStorage.setItem("theme-app", getThemeApplication);
    } else {
      const theme = document.getElementsByTagName("body")[0];
      theme.className = "theme-light";
      localStorage.setItem("theme-app", "theme-light");
    }
    if (dataProfile.idUserType !== 1) {
      const scriptCreate = document.createElement("script");
      scriptCreate.id = "script-make-smartsupp-hfy";
      scriptCreate.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = "c63bfecea33039226338a89e3da23617cb9fd6c0";
      window.smartsupp ||
        (function (d) {
          var s,
            c,
            o = (smartsupp = function () {
              o._.push(arguments);
            });
          o._ = [];
          s = d.getElementsByTagName("script")[0];
          c = d.createElement("script");
          c.type = "text/javascript";
          c.charset = "utf-8";
          c.async = true;
          c.src = "https://www.smartsuppchat.com/loader.js?";
          s.parentNode.insertBefore(c, s);
        })(document);`;
      headExtractNode.appendChild(scriptCreate);

      window.smartsupp("email", dataProfile.email);
      window.smartsupp("name", dataProfile.showName);
      window.smartsupp("variables", {
        userType: {
          label: "Tipo de usuario",
          value: dataProfile.userType,
        },
        idSystemUser: {
          label: "idSystemUser",
          value: dataProfile.idSystemUser,
        },
        idCustomer: {
          label: "idCustomer",
          value: dataProfile.idCustomer,
        },
        idCustomerTenant: {
          label: "Id Inquilino",
          value: dataProfile.idCustomerTenant,
        },
        agentNo: {
          label: "Numero de agente",
          value: dataProfile.agentNo,
        },
      });
    }
  }, []);

  useEffect(() => {
    const name = routes.find((row) => {
      return row.path === props.location.pathname;
    });

    setNameSection(
      isNil(name) === false && isNil(name.name) === false
        ? name.name
        : "Dashboard"
    );
  }, [props.location.pathname]);

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
            <div
              class="ant-layout-sider-trigger"
              style={{ width: "100%" }}
              onClick={() => {
                setCollapsedButton(!collapsedButton);
              }}
            >
              <span role="img" aria-label="left" class="anticon anticon-left">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="left"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                </svg>
              </span>
            </div>
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
              <SectionChangeImage
                isModalVisible={isVisibleAvatarSection}
                onClose={() => {
                  setIsVisibleAvatarSection(!isVisibleAvatarSection);
                }}
                onSelectImage={(preview) => {
                  handlerCallSetImageProfile(preview);
                }}
              />
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
                  <img className="icon-header-1" src={IconNotification} />
                </button>
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  arrow
                  trigger="click"
                >
                  <button className="button-header">
                    {isNil(dataProfile.thumbnail) === false ? (
                      <Avatar size={50} src={dataProfile.thumbnail} />
                    ) : (
                      <img className="icon-header-2" src={IconProfile} />
                    )}
                  </button>
                </Dropdown>
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

const mapDispatchToProps = (dispatch) => ({
  callSetImageProfile: (data, id) => dispatch(callSetImageProfile(data, id)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
