import React, { useState } from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import styled from "styled-components";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callAddDocument,
  callSetImageProfile,
} from "../../../utils/actions/actions";
import { setDataUserProfile } from "../../../utils/dispatchs/userProfileDispatch";
import { IconEditSquare } from "../../../assets/iconSvg";
import SectionChangeImage from "../../../containers/Layout/section/sectionChangeImage";

const AvatarUpload = styled.div`
  display: flex;
  justify-content: center;
  margin: 3em 0px;
  .edit-profile-image {
    position: relative;
    button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: var(--color-primary);
      bottom: 0;
      right: 0.5em;
    }
  }
`;

const WidgetUploadImageProfile = (props) => {
  const { dataProfile, callSetImageProfile, setDataUserProfile } = props;
  const [isVisibleAvatarSection, setIsVisibleAvatarSection] = useState(false);
  const frontFunctions = new FrontFunctions();

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

  return (
    <>
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
      <AvatarUpload>
        <div className="edit-profile-image">
          <Avatar
            size={150}
            src={`${ENVIROMENT}/api/viewFile/${dataProfile.idDocument}/${dataProfile.bucketSource}`}
          />
          <button
            onClick={() => {
              setIsVisibleAvatarSection(!isVisibleAvatarSection);
            }}
          >
            <IconEditSquare color="#fff" />
          </button>
        </div>
      </AvatarUpload>
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callSetImageProfile: (file, data, id, callback) =>
    dispatch(callSetImageProfile(file, data, id, callback)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetUploadImageProfile);
