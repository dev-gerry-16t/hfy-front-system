import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Layout, Pagination } from "antd";
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
import ComponentAddCandidate from "../../views/Properties/component/componentAddCandidate";
import ComponentFilter from "./component/componentFilter";
import SectionViewTicket from "./sectionsDetail/sectionViewTicket";
import {
  Container,
  ContentCards,
  ContentAddFilter,
  EmptyData,
} from "./constants/styleDashboardProperties";

const { Content } = Layout;

const PropertiesPublic = (props) => {
  const { dataProfile, callGlobalActionApi, history } = props;
  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [dataTicket, setDataTicket] = useState({});
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataCoincidencesPublic, setDataCoincidencesPublic] = useState([]);
  const [totalCoincidences, setTotalCoincidences] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [visibleAddUser, setVisibleAddUser] = useState({
    openModal: false,
    idApartment: null,
    idProperty: null,
  });
  const [jsonConditionsState, setJsonConditionsState] = useState("[]");
  const [pageSize, setPageSize] = useState(10);
  const [paginationState, setPaginationState] = useState(
    JSON.stringify({
      currentPage: currentPagination,
      userConfig: pageSize,
    })
  );
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyCoincidencesV2 = async (
    jsonConditions = null,
    pagination = "{}"
  ) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          pagination,
          jsonConditions,
          type: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_COINCIDENCES_V2
      );
      const responseResultPublic =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      const responseResultTotal =
        isEmpty(responseResultPublic) === false &&
        isNil(responseResultPublic[0]) === false &&
        isNil(responseResultPublic[0].total) === false
          ? responseResultPublic[0].total
          : 0;
      setDataCoincidencesPublic(responseResultPublic);
      setTotalCoincidences(responseResultTotal);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallUpdateProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SEND_TENANT_INVITATION,
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

  const handlerCallSetFavoriteProperty = async (data, id) => {
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
    handlerCallGetPropertyCoincidencesV2(jsonConditionsState, paginationState);
  }, []);

  return (
    <Content>
      <ComponentAddCandidate
        isModalVisible={visibleAddUser.openModal}
        sendInvitation={async (data, id) => {
          try {
            await handlerCallUpdateProperty(
              { ...data, idProperty: visibleAddUser.idProperty },
              visibleAddUser.idApartment
            );
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setVisibleAddUser({
            openModal: false,
            idApartment: null,
            idProperty: null,
          });
        }}
      />
      <SectionViewTicket
        onClose={() => {
          setIsOpenTicket(false);
          setDataTicket({});
        }}
        isVisibleModal={isOpenTicket}
        dataTicket={dataTicket}
      />
      <Container>
        <ContentAddFilter owner={false} background="var(--color-primary)">
          <div className="button-actions-header"></div>
          <div className="content-filter-dad">
            <ComponentFilter
              onSendFilter={async (data) => {
                try {
                  const objectConditions = JSON.stringify({
                    currentPage: 1,
                    userConfig: 10,
                  });
                  await handlerCallGetPropertyCoincidencesV2(
                    data,
                    objectConditions
                  );
                  setPaginationState(objectConditions);
                  setCurrentPagination(1);
                  setPageSize(10);
                  setJsonConditionsState(data);
                } catch (error) {
                  throw error;
                }
              }}
            />
          </div>
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
                      await handlerCallSetFavoriteProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                  data={row}
                  idUserType={dataProfile.idUserType}
                  onClickApply={async (data, id) => {
                    try {
                      await handlerCallApplyToProperty(data, id);
                      handlerCallGetPropertyCoincidencesV2();
                    } catch (error) {
                      throw error;
                    }
                  }}
                />
              );
            })}
          {isEmpty(dataCoincidencesPublic) === true && (
            <EmptyData>
              <img
                width="150"
                src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
                alt=""
              />
              <p>No se encontraron resultados</p>
            </EmptyData>
          )}
        </ContentCards>
        {isEmpty(dataCoincidencesPublic) === false && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              current={currentPagination}
              total={totalCoincidences}
              pageSize={pageSize}
              pageSizeOptions={[10, 20, 50, 100]}
              onChange={(page, sizePage) => {
                setCurrentPagination(page);
                setPageSize(sizePage);
                const objectConditions = JSON.stringify({
                  currentPage: page,
                  userConfig: sizePage,
                });
                setPaginationState(objectConditions);
                handlerCallGetPropertyCoincidencesV2(
                  jsonConditionsState,
                  objectConditions
                );
              }}
            />
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesPublic);
