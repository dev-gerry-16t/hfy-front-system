import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Layout } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  callGetAllCustomerById,
  callGetPropertyTypes,
  callAddProperty,
  callGetZipCodeAdress,
  callGetPropertyCoincidences,
  callGlobalActionApi,
} from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import CustomCardProperty from "../../components/customCardProperty";

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

const ContentAddFilter = styled.div`
  font-family: Poppins;
  padding: 1em 2em;
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 1em;
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

  useEffect(() => {
    handlerCallGetPropertyCoincidencesV2();
  }, []);

  return (
    <Content>
      <h1>Propiedades de tu interés</h1>
      <Container>
        <ContentCards>
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
                  data={row}
                  idUserType={dataProfile.idUserType}
                  owner={false}
                />
              );
            })}
        </ContentCards>
      </Container>
      <h1>Propiedades que puedes aplicar</h1>
      <Container>
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
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesOwner);
