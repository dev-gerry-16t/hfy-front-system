import React, { useState, useEffect, Suspense } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  Layout,
  Menu,
  Drawer,
  Dropdown,
  Avatar,
  notification,
  List,
  Popover,
  Steps,
} from "antd";
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
import IconLetter from "../../assets/icons/IconLetter.svg";
import IconCheck from "../../assets/icons/IconCheck.svg";
import IconWallet from "../../assets/iconSteps/wallet.svg";
import IconProvider from "../../assets/icons/IconProvider.svg";
import IconRequest from "../../assets/icons/IconRequest.svg";
import IconDeal from "../../assets/icons/IconDeal.svg";
import IconTicket from "../../assets/icons/IconTicket.svg";
import IconAgents from "../../assets/icons/agent.svg";
import routes from "../../routes";
import SectionChangeImage from "./section/sectionChangeImage";
import {
  callSetImageProfile,
  callUpdateNotifications,
  callGetNotifications,
  callSetThemeProfile,
  callGlobalActionApi,
} from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import ENVIROMENTSOCKET from "../../utils/constants/enviromentSocket";

const { Header, Sider } = Layout;
const { Step } = Steps;

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
    callSetThemeProfile,
    setDataUserProfile,
    callUpdateNotifications,
    callGetNotifications,
    callGlobalActionApi,
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [dataNotifications, setDataNotifications] = useState([]);
  const [notificationTopIndex, setNotificationTopIndex] = useState(null);
  const [numberNotifications, setNumberNotifications] = useState(0);
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
    IconLetter,
    IconCheck,
    IconWallet,
    IconProvider,
    IconRequest,
    IconDeal,
    IconTicket,
    IconAgents,
  };

  const [nameSection, setNameSection] = useState("");
  const [dataTimeLine, setDataTimeLine] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const frontFunctions = new FrontFunctions();
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handlerCallGetCustomerTimeLine = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_TIME_LINE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      const stepCurrent = responseResult.find((row) => {
        return row.isCurrent === true;
      });
      setDataTimeLine(responseResult);
      setCurrentStep(stepCurrent.idTimeLineStep - 1);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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

  const handlerCallSetThemeProfile = async (theme) => {
    const { idLoginHistory, idSystemUser } = dataProfile;
    try {
      await callSetThemeProfile(
        {
          idLoginHistory,
          themeConfig: theme,
        },
        idSystemUser
      );
      await setDataUserProfile({
        ...dataProfile,
        themeConfig: theme,
      });
    } catch (error) {}
  };

  const handlerCallGetNotifications = async (top = null) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetNotifications({
        idSystemUser,
        idLoginHistory,
        type: 1,
        topIndex: top,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataNotifications(responseResult);
      setNotificationTopIndex(
        isEmpty(responseResult) === false &&
          isNil(responseResult[0]) === false &&
          isNil(responseResult[0].topIndex) === false
          ? responseResult[0].topIndex
          : null
      );
      setNumberNotifications(
        isEmpty(responseResult) === false &&
          isNil(responseResult[0]) === false &&
          isNil(responseResult[0].totalToBeRead) === false
          ? responseResult[0].totalToBeRead
          : 0
      );
    } catch (error) {}
  };

  const handlerCallUpdateNotifications = async (id) => {
    const { idLoginHistory, idSystemUser } = dataProfile;
    try {
      await callUpdateNotifications(
        {
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      handlerCallGetNotifications(notificationTopIndex);
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
            handlerCallSetThemeProfile("theme-light");
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
            handlerCallSetThemeProfile("theme-dark");
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
            handlerCallSetThemeProfile("theme-purple");
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
            handlerCallSetThemeProfile("theme-dark-blue");
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
    handlerCallGetNotifications();
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
    const { themeConfig } = dataProfile;

    const theme = document.getElementsByTagName("body")[0];
    theme.className = themeConfig;

    if (dataProfile.idUserType === 3 || dataProfile.idUserType === 2) {
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
          label: "Número de agente",
          value: dataProfile.agentNo,
        },
      });
    }
    let interval;

    const socket = socketIOClient(ENVIROMENTSOCKET, {
      reconnectionDelayMax: 60000,
    });

    interval = setInterval(() => {
      socket.emit("user_subscribed", {
        idSystemUser: dataProfile.idSystemUser,
        idLoginHistory: dataProfile.idLoginHistory,
      });
    }, 30000);

    socket.on("get_notification", (data) => {
      if (isEmpty(data) === false) {
        handlerCallGetNotifications();
        document.getElementById("audio-notice-hfy").play();
        data.forEach((element) => {
          notification.open({
            message: (
              <div className="title-notification">{element.subject}</div>
            ),
            duration: 15,
            description: (
              <div
                className="title-body-description"
                style={{
                  background: "rgba(255,255,255,1)",
                  cursor: "pointer",
                }}
              >
                <div className="section-circle-description">
                  <div
                    className="icon-notification"
                    style={{
                      background:
                        element.isRead === true
                          ? "#DF90B8"
                          : "var(--color-primary)",
                    }}
                  >
                    <img
                      width="25"
                      src={arrayIconst[element.style]}
                      alt="icons-notification-homify"
                    />
                  </div>
                </div>
                <div
                  className="section-info-notification"
                  dangerouslySetInnerHTML={{
                    __html:
                      isNil(element.content) === false ? element.content : "",
                  }}
                />
              </div>
            ),
            onClick: () => {},
          });
        });
      }
    });
    //handlerCallGetCustomerTimeLine();
    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isEmpty(dataProfileMenu) === false) {
      const name = dataProfileMenu.find((row) => {
        return row.path === props.location.pathname;
      });
      if (isNil(name) === false) {
        setNameSection(
          isNil(name.menuName) === false && isNil(name.menuName) === false
            ? name.menuName
            : "Dashboard"
        );
      } else {
        const nameRoutes = routes.find((row) => {
          return props.location.pathname.indexOf(row.path) !== -1;
        });
        setNameSection(
          isNil(nameRoutes) === false &&
            isNil(nameRoutes.name) === false &&
            isNil(nameRoutes.name) === false
            ? nameRoutes.name
            : "Dashboard"
        );
      }
    }
  }, [props.location.pathname, dataProfileMenu]);

  return (
    <div className="App">
      <audio id="audio-notice-hfy">
        <source src="https://homify-docs-users.s3.us-east-2.amazonaws.com/SD_ALERT_31.mp3" />
      </audio>
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
            <Menu theme="dark" mode="inline">
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
                      className={
                        props.location.pathname === row.path
                          ? "ant-menu-item-selected"
                          : ""
                      }
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
            <Menu theme="dark" mode="inline">
              {isEmpty(dataProfileMenu) === false &&
                dataProfileMenu.map((row) => {
                  return (
                    <Menu.Item
                      key={`${row.idMenu}`}
                      onClick={(event) => {
                        setNameSection(row.menuName);
                        history.push(row.path);
                      }}
                      className={
                        props.location.pathname === row.path
                          ? "ant-menu-item-selected"
                          : ""
                      }
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
              <div>
                <Steps size="small" current={currentStep}>
                  {isEmpty(dataTimeLine) === false &&
                    dataTimeLine.map((row) => {
                      return (
                        <Step
                          title={row.title}
                          description={<span style={{fontSize:10}}>{row.description}</span>}
                          status={row.hasError === true ? "error" : ""}
                          onClick={() => {
                            console.log(`Click in ${row.idTimeLineStep}`);
                          }}
                          icon={
                            <span
                              className="ant-step-icon"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <i className={row.style}></i>
                            </span>
                          }
                        />
                      );
                    })}
                </Steps>
              </div>
              <div className="header-info-user">
                <div className="hi-user-name-type">
                  <strong>{dataProfile.showName}</strong>
                  <span>{dataProfile.userType}</span>
                </div>
                <Popover
                  className="popover-list-notification"
                  id="layout-popover-list"
                  placement="bottomRight"
                  title={
                    <div className="title-notification-small">
                      Notificaciones
                    </div>
                  }
                  content={
                    <>
                      <List
                        size="small"
                        style={{
                          width: 360,
                          maxHeight: 400,
                          overflowY: "scroll",
                        }}
                        dataSource={dataNotifications}
                        renderItem={(item) => (
                          <List.Item
                            style={{ padding: "0px 0px !important" }}
                            onClick={() => {
                              handlerCallUpdateNotifications(
                                item.idNotification
                              );
                            }}
                          >
                            <div
                              className="title-body-description-1"
                              style={{
                                background:
                                  item.isRead === true
                                    ? "rgba(255,255,255,1)"
                                    : "rgba(223, 144, 184, 0.2)",
                                cursor: "pointer",
                              }}
                            >
                              <div className="section-circle-description">
                                <div
                                  className="icon-notification"
                                  style={{
                                    background:
                                      item.isRead === true
                                        ? "#DF90B8"
                                        : "var(--color-primary)",
                                  }}
                                >
                                  <img
                                    width="25"
                                    src={arrayIconst[item.style]}
                                    alt="icons-notification-homify"
                                  />
                                </div>
                              </div>
                              <div className="section-info-notification">
                                <div className="title-notification-child">
                                  <span>{item.subject}</span>
                                  <span>{item.sentAtFormat}</span>
                                </div>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      isNil(item.content) === false
                                        ? item.content
                                        : "",
                                  }}
                                />
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                      {notificationTopIndex !== -1 && (
                        <div
                          style={{ padding: "5px 0px", textAlign: "center" }}
                        >
                          <a
                            onClick={() => {
                              handlerCallGetNotifications(notificationTopIndex);
                            }}
                          >
                            Mostrar más
                          </a>
                        </div>
                      )}
                    </>
                  }
                  trigger="click"
                >
                  <button
                    className="button-header"
                    style={{ position: "relative" }}
                    onClick={() => {}}
                  >
                    <div
                      className="notification-header"
                      style={{
                        display: numberNotifications === 0 ? "none" : "block",
                      }}
                    >
                      <span>
                        {numberNotifications > 10 ? "+10" : numberNotifications}
                      </span>
                    </div>
                    <img className="icon-header-1" src={IconNotification} />
                  </button>
                </Popover>
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
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
  callSetImageProfile: (data, id) => dispatch(callSetImageProfile(data, id)),
  callUpdateNotifications: (data, id) =>
    dispatch(callUpdateNotifications(data, id)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetNotifications: (data) => dispatch(callGetNotifications(data)),
  callSetThemeProfile: (data, id) => dispatch(callSetThemeProfile(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
