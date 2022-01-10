import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Layout, Pagination } from "antd";
import { Steps } from "intro.js-react";
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
import { IconVector } from "../../assets/iconSvg";
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
  ButtonIcon,
} from "./constants/styleDashboardProperties";

const { Content } = Layout;

const PropertiesOwner = (props) => {
  const { dataProfile, callGlobalActionApi, history } = props;
  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [dataTicket, setDataTicket] = useState({});
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataCoincidencesPublic, setDataCoincidencesPublic] = useState([]);
  const [totalCoincidences, setTotalCoincidences] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [enableIntro, setEnableIntro] = useState(false);
  const [visibleAddUser, setVisibleAddUser] = useState({
    openModal: false,
    idApartment: null,
    idProperty: null,
  });
  const [jsonConditionsState, setJsonConditionsState] = useState(
    JSON.stringify([
      {
        queryCondition: 7,
        compValue: 1,
      },
    ])
  );
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
          type: 1,
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
      const responseResultTotal =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isNil(responseResult[0].total) === false
          ? responseResult[0].total
          : 0;
      setDataCoincidences(responseResult);
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
      <Steps
        enabled={enableIntro}
        steps={[
          {
            title: "Bienvenido",
            intro:
              "Esta es la sección de tus propiedades, en la cual te daremos un tour para que conozcas cada una de las acciones que puedes realizar.",
          },
          {
            title: "Agrega",
            element: "#add-property",
            intro:
              "Puedes agregar una propiedad la cual aparecerá en esta pantalla.",
          },
          {
            title: "Busca",
            element: "#filter-coincidences",
            intro: "Busca tu propiedad con ayuda de este filtro.",
          },
          {
            title: "Tu propiedad",
            element: "#property-0",
            intro:
              "Esta es tu propiedad, en la cual puedes hacer diferentes acciones.",
          },
          {
            title: "Proceso",
            element: "#process-property-0",
            intro: "Aqui puedes ver en que proceso se encuentra tu propiedad.",
          },
          {
            title: "Acciones",
            element: "#button-top-property-0",
            intro: "Comparte la propiedad o marcala como favorita.",
          },
          {
            title: "Acciones",
            element: "#button-bottom-property-0",
            intro:
              "Descarga la ficha en formato pdf o invita a un inquilino para que aplique a esta propiedad.",
          },
          {
            title: "Listo",
            intro: "Ahora puedes continuar con tus procesos.",
          },
        ]}
        initialStep={0}
        options={{
          nextLabel: " >> ",
          prevLabel: " << ",
          doneLabel: "Finalizar",
          hideNext: false,
        }}
        onComplete={() => {}}
        onExit={() => {
          setEnableIntro(false);
        }}
      />
      <Container>
        <ContentAddFilter owner background="var(--color-primary)">
          <div className="button-actions-header">
            <h1></h1>
            {dataProfile.idUserType !== 2 && (
              <button
                onClick={() => {
                  history.push("/websystem/add-property");
                }}
                id="add-property"
              >
                Agregar propiedad
              </button>
            )}
          </div>
          <div className="content-filter-dad" id="filter-coincidences">
            <ComponentFilter
              owner
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
        {isEmpty(dataCoincidences) === false && (
          <div className="total-coincidences">
            <h1>
              Se encontraron <span>{totalCoincidences} propiedades</span>
            </h1>
          </div>
        )}
        <ContentCards>
          {isEmpty(dataCoincidences) === false && (
            <>
              <div className="button-actions-header">
                <h1>Resultados</h1>
                <div>
                  <ButtonIcon
                    onClick={() => {
                      setIsHorizontal(!isHorizontal);
                    }}
                  >
                    <IconVector
                      color="var(--color-primary)"
                      backGround="var(--color-primary)"
                      size="20px"
                    />
                  </ButtonIcon>
                </div>
              </div>
              <div
                className={
                  isHorizontal === false
                    ? "body-cards-property"
                    : "body-cards-property-x"
                }
              >
                {dataCoincidences.map((row, ix) => {
                  return (
                    <CustomCardProperty
                      id={`property-${ix}`}
                      src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png"
                      alt={row.identifier}
                      onClickAddUser={(idApartment, idProperty) => {
                        setVisibleAddUser({
                          openModal: true,
                          idApartment,
                          idProperty,
                        });
                      }}
                      onClickDetail={() => {
                        history.push(
                          `/websystem/detail-property-users/${row.idProperty}`
                        );
                      }}
                      data={row}
                      idUserType={dataProfile.idUserType}
                      onClickFavorite={async (data, id) => {
                        try {
                          await handlerCallSetFavoriteProperty(data, id);
                          handlerCallGetPropertyCoincidencesV2(
                            jsonConditionsState,
                            paginationState
                          );
                        } catch (error) {
                          throw error;
                        }
                      }}
                      onOpenTicket={(data) => {
                        setIsOpenTicket(true);
                        setDataTicket(data);
                      }}
                      onClickApply={async (data, id) => {
                        try {
                          await handlerCallApplyToProperty(data, id);
                          handlerCallGetPropertyCoincidencesV2(
                            jsonConditionsState,
                            paginationState
                          );
                        } catch (error) {
                          throw error;
                        }
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}

          {isEmpty(dataCoincidences) === true && (
            <EmptyData>
              <img
                width="150"
                src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296S.png"
                alt=""
              />
              <p>Aún no tienes ninguna propiedad agregada :( </p>
            </EmptyData>
          )}
        </ContentCards>
        {isEmpty(dataCoincidences) === false && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesOwner);
