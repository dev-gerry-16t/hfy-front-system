import React, { useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  callGetAllUserProfile,
  callGetAllMenuProfile,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";

const Auth = (props) => {
  const {
    history,
    callGetAllUserProfile,
    dataProfile,
    setDataUserProfile,
    callGetAllMenuProfile,
  } = props;

  const handlerCallGetAllUserProfile = async () => {
    try {
      const response = await callGetAllUserProfile(dataProfile.dataProfile);
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
      console.log('responseMenu',responseMenu);
      await setDataUserProfile({
        ...dataProfile.dataProfile,
        ...responseResult,
      });
    } catch (error) {}
  };

  const handlerAsyncCallApiis = async () => {
    await handlerCallGetAllUserProfile();
  };

  useEffect(() => {
    handlerAsyncCallApiis();
  }, []);

  return <div className="loader-auth-spiner" />;
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return { dataProfile };
};

const mapDispatchToProps = (dispatch) => ({
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetAllUserProfile: (data) => dispatch(callGetAllUserProfile(data)),
  callGetAllMenuProfile: (data) => dispatch(callGetAllMenuProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
