import React, { useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  callUpdateNotifications,
  callGetNotifications,
  callGlobalActionApi,
} from "../../utils/actions/actions";
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
import { useEffect } from "react";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em 1em 1em 0px;
  letter-spacing: 0.75px;
  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 1em;
  min-height: 90vh;
  .content-left {
    height: 100%;
    .notifications-left {
      height: 100%;
      box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
      background: #fff;
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    padding: 1em 0px;
  }
`;

const TopTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 0.5px solid #4e4b66;
`;

const TabNotification = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  padding: 15px 0px 10px 0px;
  font-weight: ${(props) => (props.select === true ? "800" : "600")};
  color: ${(props) =>
    props.select === true ? "var(--color-primary)" : "#000"};
  border-bottom: ${(props) =>
    props.select === true ? "2px solid var(--color-primary)" : "0px"};
`;

const ContentNotifications = styled.div`
  width: 100%;
  padding: 5px;
  max-height: 90vh;
  overflow-y: scroll;
`;

const InfoNotification = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  margin-top: 20px;
  padding: 15px;
  .time-at {
    text-align: right;
  }
  .subject-notification {
    color: var(--color-primary);
    font-weight: 800;
  }
`;

const Notifications = (props) => {
  const { dataProfile, callGetNotifications, callUpdateNotifications, match } =
    props;
  const [tabsSelect, setTabsSelect] = useState(1);
  const [dataNotifications, setDataNotifications] = useState([]);
  const [infoNotification, setInfoNotification] = useState({});
  const [notificationTopIndex, setNotificationTopIndex] = useState(null);
  const [numberNotifications, setNumberNotifications] = useState(0);
  const { params } = match;
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

  const handlerCallGetNotifications = async (
    top = null,
    type = 1,
    id = null
  ) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetNotifications({
        idSystemUser,
        idLoginHistory,
        type,
        idNotification: id,
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
      const filterNotification = responseResult.find((row) => {
        return row.idNotification == params.idNotification;
      });
      setInfoNotification(filterNotification);
    } catch (error) {}
  };

  const handlerCallUpdateNotifications = async (id, tab) => {
    const { idLoginHistory, idSystemUser } = dataProfile;
    try {
      await callUpdateNotifications(
        {
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      await handlerCallGetNotifications(notificationTopIndex, tab, id);
    } catch (error) {}
  };

  useEffect(() => {
    handlerCallGetNotifications();
  }, []);

  return (
    <Content>
      <div className="content-left">
        <div className="notifications-left">
          <TopTabs>
            <TabNotification
              onClick={() => {
                handlerCallGetNotifications(null, 1);
                setTabsSelect(1);
              }}
              select={tabsSelect === 1}
            >
              <span>Todo</span>
            </TabNotification>
            <TabNotification
              onClick={() => {
                handlerCallGetNotifications(null, 2);
                setTabsSelect(2);
              }}
              select={tabsSelect === 2}
            >
              <span>Sin leer</span>
            </TabNotification>
            <TabNotification
              onClick={() => {
                handlerCallGetNotifications(null, 3);
                setTabsSelect(3);
              }}
              select={tabsSelect === 3}
            >
              <span>Leídos</span>
            </TabNotification>
          </TopTabs>
          <ContentNotifications>
            {isEmpty(dataNotifications) === false &&
              dataNotifications.map((item) => {
                return (
                  <div
                    className="title-body-description-1"
                    style={{
                      background:
                        item.isRead === true
                          ? "rgba(255,255,255,1)"
                          : "rgba(223, 144, 184, 0.2)",
                      cursor: "pointer",
                      marginBottom: "7px",
                    }}
                    onClick={async () => {
                      try {
                        await handlerCallUpdateNotifications(
                          item.idNotification,
                          tabsSelect
                        );
                        setInfoNotification(item);
                        if (isNil(item.path) === false) {
                          //   history.push(item.path);
                        }
                      } catch (error) {}
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
                );
              })}
          </ContentNotifications>
        </div>
      </div>
      <div className="content-notification">
        {isEmpty(infoNotification) === false && (
          <InfoNotification>
            <div className="time-at">
              <span>{infoNotification.sentAtFormat}</span>
            </div>
            <h1 className="subject-notification">{infoNotification.subject}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  isNil(infoNotification.content) === false
                    ? infoNotification.content
                    : "",
              }}
            />
          </InfoNotification>
        )}
      </div>
    </Content>
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
  callUpdateNotifications: (data, id) =>
    dispatch(callUpdateNotifications(data, id)),
  callGetNotifications: (data) => dispatch(callGetNotifications(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
