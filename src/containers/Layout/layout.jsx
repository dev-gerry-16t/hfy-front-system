import React, { useState, useEffect, Suspense } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
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
import IconHome from "../../assets/icons/iconDashboard.svg";
import IconDashboard from "../../assets/icons/iconChart.svg";
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
import IconProfileWhite from "../../assets/icons/Profilewhite.svg";
import IconSetting from "../../assets/icons/iconSetting.svg";
import IconLocation from "../../assets/icons/iconLocation.svg";
import IconTwoUser from "../../assets/icons/iconTwoUser.svg";
import IconPercent from "../../assets/icons/iconPercent.svg";
import IconTimesShield from "../../assets/icons/IconTimesShield.svg";
import IconEditSquare from "../../assets/icons/iconEditSquare.svg";
import routes from "../../routes";
import SectionChangeImage from "./section/sectionChangeImage";
import {
  callSetImageProfile,
  callUpdateNotifications,
  callGetNotifications,
  callSetThemeProfile,
  callGlobalActionApi,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import ENVIROMENTSOCKET from "../../utils/constants/enviromentSocket";
import { ReactComponent as IconAlerMessage } from "../../assets/iconSvg/svgFile/iconAlertMessage.svg";

const ErrorMessage = styled.div`
  position: relative;
  padding: 8px 0px;
  background: #eb5757;
  color: #fff;
  left: -400px;
  z-index: 1001;
  padding: 5px 5px 5px 25px;
  border-radius: 0px 6px 6px 0px;
  font-size: 14px;
  transition: all 0.5s ease-in;
  width: fit-content;
  display: flex;
  .message-api {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  button {
    border: none;
    background: transparent;
    margin-left: 20px;
  }
`;

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
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [dataNotifications, setDataNotifications] = useState([]);
  const [notificationTopIndex, setNotificationTopIndex] = useState(null);
  const [numberNotifications, setNumberNotifications] = useState(0);
  const [isVisibleAvatarSection, setIsVisibleAvatarSection] = useState(false);
  const [isVisibleNotification, setIsVisibleNotification] = useState(false);
  const [collapsedButton, setCollapsedButton] = useState(false);
  const arrayIconst = {
    IconDashboard,
    IconHome,
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
    IconSetting,
    IconProfileWhite,
    IconLocation,
    IconTwoUser,
    IconPercent,
    IconTimesShield,
    IconEditSquare,
  };

  const [nameSection, setNameSection] = useState("");

  const frontFunctions = new FrontFunctions();
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handlerCallSetImageProfile = async (file, data) => {
    const {
      idCustomer,
      idLoginHistory,
      idSystemUser,
      idDocument,
      bucketSource,
    } = dataProfile;
    try {
      const response = await callSetImageProfile(
        file,
        {
          idCustomer,
          idLoginHistory,
          documentName: data.documentName,
          extension: data.extension,
          preview: null,
          thumbnail: null,
          idDocument,
          bucketSource,
        },
        idSystemUser,
        () => {}
      );
      const responseResult =
        isNil(response.response) === false ? response.response : {};
      await setDataUserProfile({
        ...dataProfile,
        idDocument:
          isNil(responseResult.idDocument) === false
            ? responseResult.idDocument
            : idDocument,
        bucketSource:
          isNil(responseResult.bucketSource) === false
            ? responseResult.bucketSource
            : bucketSource,
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      await handlerCallGetNotifications(notificationTopIndex);
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

  const handlerLimitText = (text) => {
    let textTransform = "";
    if (isNil(text) === false && isEmpty(text) === false) {
      const splitText = text.split(" ");
      if (splitText.length >= 2) {
        textTransform = `${splitText[0]} ${splitText[1]}`;
      }
    }
    return textTransform;
  };

  useEffect(() => {
    if (isNil(dataProfile) === true) {
      return history.push("/");
    }
    handlerCallGetNotifications();
    const documentHead = document.getElementsByTagName("head");
    const headExtractNode =
      isNil(documentHead) === false &&
      isEmpty(documentHead) === false &&
      isNil(documentHead[0]) === false
        ? documentHead[0]
        : [];
    const { themeConfig } = dataProfile;

    const theme = document.getElementsByTagName("body")[0];
    theme.className = themeConfig;

    if (
      dataProfile.idUserType === 3 ||
      dataProfile.idUserType === 2 ||
      dataProfile.idUserType === 4
    ) {
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
      reconnectionAttempts: 5,
    });
    interval = setInterval(() => {
      socket.emit("user_subscribed", {
        idSystemUser: dataProfile.idSystemUser,
        idLoginHistory: dataProfile.idLoginHistory,
      });
    }, 15000);

    socket.io.on("reconnect_failed", () => {
      clearInterval(interval);
    });

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
                  width: "100%",
                }}
                onClick={async () => {
                  try {
                    await handlerCallUpdateNotifications(
                      element.idNotification
                    );
                    if (isNil(element.path) === false) {
                      setIsVisibleNotification(false);
                      history.push(element.path);
                    }
                    notification.destroy();
                  } catch (error) {}
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

    const myChat = document.getElementById("chat-application");
    if (
      isNil(myChat) === false &&
      (dataProfile.idUserType === 3 ||
        dataProfile.idUserType === 2 ||
        dataProfile.idUserType === 4)
    ) {
      myChat.style.display = "block";
    }

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

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
                onSelectImage={async (file, data) => {
                  try {
                    await handlerCallSetImageProfile(file, data);
                  } catch (error) {
                    throw error;
                  }
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
                <h2 id="name-screen-hfy">{nameSection}</h2>
              </div>
              <div className="header-info-user">
                <div className="hi-user-name-type">
                  <strong>{handlerLimitText(dataProfile.showName)}</strong>
                  <span>{dataProfile.userType}</span>
                </div>
                <Popover
                  visible={isVisibleNotification}
                  className="popover-list-notification"
                  id="layout-popover-list"
                  placement="bottomRight"
                  onVisibleChange={(visible) => {
                    if (visible === false) {
                      setIsVisibleNotification(false);
                    }
                  }}
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
                              setIsVisibleNotification(false);
                              history.push(
                                `/websystem/notificaciones/${item.idNotification}`
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
                                width: "100%",
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
                              setIsVisibleNotification(false);
                              history.push(`/websystem/notificaciones/1`);
                              // handlerCallGetNotifications(notificationTopIndex);
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
                    onClick={() => {
                      setIsVisibleNotification(!isVisibleNotification);
                    }}
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
                    {isNil(dataProfile.idDocument) === false ? (
                      <Avatar
                        size={50}
                        src={`${ENVIROMENT}/api/viewFile/${dataProfile.idDocument}/${dataProfile.bucketSource}`}
                      />
                    ) : (
                      <img className="icon-header-2" src={IconProfile} />
                    )}
                  </button>
                </Dropdown>
              </div>
            </Header>
            <div
              style={{
                position: "relative",
                height: "0px",
              }}
            >
              <div>
                <ErrorMessage id="error-message-api" visible={true}>
                  <div className="message-api">
                    <IconAlerMessage /> <span id="error-description"></span>{" "}
                  </div>
                  <button id="btn-action-error-message">X</button>
                </ErrorMessage>
              </div>
            </div>
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
                        const name = dataProfileMenu.find((row) => {
                          return row.path === route.path;
                        });
                        setNameSection(
                          isNil(name) === false &&
                            isNil(name.menuName) === false
                            ? name.menuName
                            : route.name
                        );
                        if (authenticated === true) {
                          return (
                            <route.component
                              {...prop}
                              history={history}
                              onGetNotifications={() => {
                                handlerCallGetNotifications();
                              }}
                            />
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
  callSetImageProfile: (file, data, id, callback) =>
    dispatch(callSetImageProfile(file, data, id, callback)),
  callUpdateNotifications: (data, id) =>
    dispatch(callUpdateNotifications(data, id)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetNotifications: (data) => dispatch(callGetNotifications(data)),
  callSetThemeProfile: (data, id) => dispatch(callSetThemeProfile(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
