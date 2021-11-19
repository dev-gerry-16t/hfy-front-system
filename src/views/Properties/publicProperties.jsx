import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Layout } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import CustomCardProperty from "../../components/customCardProperty";
import ComponentFilter from "./component/componentFilter";
import { method } from "lodash";

const { Content } = Layout;

const Container = styled.div`
  padding: 1em 2em;
  font-size: 16px;
`;

const ContentCards = styled.div`
  font-family: Poppins;
  letter-spacing: 0.75px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2%;
  padding: 1em 0;
`;

const ContentCardsProcess = styled.div`
  font-family: Poppins;
  letter-spacing: 0.75px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 2%;
  padding: 1em 0;
  overflow-x: scroll;
`;

const ContentAddFilter = styled.div`
  font-family: Poppins;
  padding: 1em 2em;
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 1em;
  h1 {
    font-weight: 700;
    margin: 0px;
    color: #4e4b66;
    font-size: 20px;
  }
  .button-actions-header {
    display: flex;
    justify-content: flex-end;
    button {
      border-radius: 0.8em;
      border: none;
      background: ${(props) => props.background};
      color: #fff;
      padding: 0.125em 2em;
      font-weight: 600;
      letter-spacing: 0.75px;
    }
  }
  .filter-actions-components {
    display: flex;
  }
`;

const PropertiesOwner = (props) => {
  const { dataProfile, callGlobalActionApi, history } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataCoincidencesPublic, setDataCoincidencesPublic] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyCoincidencesV2 = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          pagination: JSON.stringify({ currentPage: 1, userConfig: 10 }),
          jsonConditions: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_COINCIDENCES_V2
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      const responseResultPublic =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[1]) === false
          ? response.response[1]
          : [];
      setDataCoincidences(responseResult);
      setDataCoincidencesPublic(responseResultPublic);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SET_FAVORITE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallApplyToProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.APPLY_TO_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    handlerCallGetPropertyCoincidencesV2();
  }, []);

  return (
    <Content>
      <Container>
        <ContentAddFilter background="var(--color-primary)">
          <h1>Propiedades de tu interes</h1>
        </ContentAddFilter>
        <ContentCardsProcess>
          {isEmpty(dataCoincidences) === false &&
            dataCoincidences.map((row) => {
              return (
                <CustomCardProperty
                  src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png"
                  alt={row.identifier}
                  onClickDetail={() => {
                    history.push(
                      `/websystem/detail-property-users/${row.idProperty}`
                    );
                  }}
                  onClickFavorite={async (data, id) => {
                    try {
                      await handlerCallUpdateProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  onClickApply={async (data, id) => {
                    try {
                      await handlerCallApplyToProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  data={row}
                  idUserType={dataProfile.idUserType}
                  owner={false}
                />
              );
            })}
        </ContentCardsProcess>
      </Container>
      <Container>
        <ContentAddFilter background="var(--color-primary)">
          <ComponentFilter />
        </ContentAddFilter>
        <ContentCards>
          {isEmpty(dataCoincidencesPublic) === false &&
            dataCoincidencesPublic.map((row) => {
              return (
                <CustomCardProperty
                  src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png"
                  alt={row.identifier}
                  onClickDetail={() => {
                    history.push(
                      `/websystem/detail-property/${row.idProperty}`
                    );
                  }}
                  onClickFavorite={async (data, id) => {
                    try {
                      await handlerCallUpdateProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  onClickApply={async (data, id) => {
                    try {
                      await handlerCallApplyToProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  data={row}
                  idUserType={dataProfile.idUserType}
                  owner={false}
                />
              );
            })}
        </ContentCards>
      </Container>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesOwner);