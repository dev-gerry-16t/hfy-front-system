import React, { useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { notification } from "antd";
import {
  callGetAllUserProfile,
  callGetAllMenuProfile,
} from "../../utils/actions/actions";
import {
  setDataUserProfile,
  setDataUserMenu,
} from "../../utils/dispatchs/userProfileDispatch";

const Auth = (props) => {
  const {
    history,
    callGetAllUserProfile,
    dataProfile,
    setDataUserProfile,
    setDataUserMenu,
    callGetAllMenuProfile,
    purgeStore,
  } = props;

  const handlerCallGetAllUserProfile = async () => {
    try {
      const response = await callGetAllUserProfile({
        idSystemUser: dataProfile.dataProfile.idSystemUser,
        token: dataProfile.dataProfile.token,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      const idSystemUser =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idSystemUser) === false
          ? responseResult.idSystemUser
          : null;
      const idLoginHistory =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idLoginHistory) === false
          ? responseResult.idLoginHistory
          : null;
      const responseMenu = await callGetAllMenuProfile({
        idSystemUser,
        idLoginHistory,
      });
      const responseResultMenu =
        isNil(responseMenu) === false &&
        isNil(responseMenu.response) === false &&
        isEmpty(responseMenu.response) === false
          ? responseMenu.response
          : [];
      await setDataUserMenu(responseResultMenu);
      await setDataUserProfile({
        ...dataProfile.dataProfile,
        ...responseResult,
      });
      history.push(
        isEmpty(responseResult) === false &&
          isNil(responseResult.path) === false
          ? responseResult.path
          : "/websystem"
      );
    } catch (error) {}
  };

  const handlerAsyncCallApiis = async () => {
    await handlerCallGetAllUserProfile();
  };

  const handlerFinishSession = async () => {
    await purgeStore();
    await sessionStorage.clear();
    await localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    if (window.location.pathname === "/auth") {
      handlerAsyncCallApiis();
    } else if (window.location.pathname === "/logout") {
      notification.destroy();
      handlerFinishSession();
    }
  }, []);

  return <div className="loader-auth-spiner" />;
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return { dataProfile };
};

const mapDispatchToProps = (dispatch) => ({
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  setDataUserMenu: (data) => dispatch(setDataUserMenu(data)),
  callGetAllUserProfile: (data) => dispatch(callGetAllUserProfile(data)),
  callGetAllMenuProfile: (data) => dispatch(callGetAllMenuProfile(data)),
  purgeStore: () => dispatch({ type: "PURGE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
