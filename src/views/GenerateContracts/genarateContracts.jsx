import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Pagination } from "antd";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { IconEditSquare, IconDelete } from "../../assets/iconSvg";
import { ReactComponent as IconSearch } from "../../assets/iconSvg/svgFile/Search.svg";
import CustomViewRequestContract from "../Home/sections/customViewRequestContract";
import ComponentLoadSection from "../../components/componentLoadSection";

const Content = styled.div`
  font-size: 16px;
  font-family: Poppins;
  width: 100%;
  min-height: 90vh;
  overflow-y: scroll;
  padding: 1em;
  @media screen and (max-width: 360px) {
    padding: 1em 2px;
  }
`;

const ContentFilter = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  margin-bottom: 1em;
  display: grid;
  padding: 1em;
  grid-template-columns: 1fr 1fr;
  .filter-search {
    display: flex;
    justify-content: flex-start;
    .search-table {
      display: flex;
      flex-wrap: nowrap;
      border: 1px solid #4e4b66;
      border-radius: 1em;
      padding: 0px 0px 0px 0.6em;
      input {
        border: none;
        outline: none;
        border-right: 1px solid #4e4b66;
      }
      button {
        border: none;
        outline: none;
        border-radius: 0px 1em 1em 0px;
        padding: 0px 1em;
        background: var(--color-primary);
      }
    }
  }
  .filter-add-new {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
    row-gap: 1em;
    .filter-search {
      justify-content: center;
    }
    .filter-add-new {
      justify-content: center;
    }
  }
`;

const ContentTable = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  .content-table {
    overflow-x: scroll;
    table {
      width: 100%;
      tr,
      th,
      td {
        border: 1px solid #d6d8e7;
        padding: 1em;
        font-size: 0.9em;
      }
      th {
        color: #4e4b66;
      }
    }
  }
  .content-pagination {
    display: flex;
    justify-content: center;
    margin-top: 1em;
    padding: 1em 0px;
  }
`;

const ButtonDetail = styled.button`
  background: transparent;
  border: none;
`;

const ButtonAdd = styled.button`
  border: none;
  background: var(--color-primary);
  color: #fff;
  border-radius: 1em;
  padding: 5px 1em;
`;

let channel = null;
let intervalWindow = null;
let openPayment = null;

const GenerateContracts = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(false);
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [totalCoincidences, setTotalCoincidences] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [dataFee, setDataFee] = useState({});
  const [paginationState, setPaginationState] = useState(
    JSON.stringify({
      currentPage: currentPagination,
      userConfig: pageSize,
    })
  );
  const [jsonConditionsState, setJsonConditionsState] = useState(
    JSON.stringify([
      {
        queryCondition: 1,
        compValue: null,
      },
    ])
  );

  const frontFunctions = new FrontFunctions();

  const handlerCallGetServiceFee = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_SERVICE_FEE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].serviceFee) === false &&
        isEmpty(response.response[0][0].serviceFee) === false
          ? JSON.parse(response.response[0][0].serviceFee)
          : {};
      setDataFee(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestCoincidences = async (condition, pag) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          jsonConditions: condition,
          pagination: pag,
        },
        null,
        API_CONSTANTS.EXTERNAL.GET_REQUEST_COINCIDENCES
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
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
    }
  };

  const handlerCallSetRequest = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idRequest: id,
          idCustomer,
          idLoginHistory,
          ...data,
        },
        idSystemUser,
        API_CONSTANTS.EXTERNAL.SET_REQUEST,
        "PUT"
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : {};

      frontFunctions.showMessageStatusApi(
        isEmpty(responseResult) === false &&
          isNil(responseResult.message) === false
          ? responseResult.message
          : "Petición ejecutada con éxito",
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

  const handlerOnClickPayment = (idOrder) => {
    setIsLoadApi(true);
    const channelName = "payment_users_contract";
    channel = new BroadcastChannel(channelName);

    const openPayment = window.open(
      `/websystem/payment-service/${idOrder}`,
      "targetWindow",
      `scrollbars=yes,
    resizable=yes,
    width=360,
    height=900`
    );

    intervalWindow = setInterval(() => {
      if (openPayment.closed === true) {
        setIsLoadApi(false);
        channel.close();
        clearInterval(intervalWindow);
      }
    }, 2000);

    channel.onmessage = (message) => {
      if (message.data === "close_payment_contract") {
        clearInterval(intervalWindow);
        openPayment.close();
        setTimeout(() => {
          setIsLoadApi(false);
        }, 1500);
      }
      if (message.data === "payment_succesed") {
        clearInterval(intervalWindow);
        openPayment.close();
        setTimeout(() => {
          setIsLoadApi(false);
          handlerCallGetRequestCoincidences(
            jsonConditionsState,
            paginationState
          );
        }, 1500);
      }
    };
  };

  useEffect(() => {
    handlerCallGetServiceFee();
    handlerCallGetRequestCoincidences(jsonConditionsState, paginationState);
    return () => {
      if (
        isNil(channel) === false &&
        isNil(intervalWindow) === false &&
        isNil(openPayment) === false
      ) {
        openPayment.close();
        clearInterval(intervalWindow);
        channel.close();
      }
    };
  }, []);

  return (
    <Content>
      <CustomViewRequestContract
        dataFee={dataFee}
        visibleDialog={visibleComponent}
        onConfirmOk={() => {
          handlerCallGetRequestCoincidences(
            jsonConditionsState,
            paginationState
          );
        }}
        onClose={() => {
          setVisibleComponent(false);
        }}
        history={history}
      />
      <ContentFilter>
        <div className="filter-search">
          <div className="search-table">
            <input
              placeholder="Campo abierto"
              value={valueSearch}
              type="text"
              onChange={(e) => {
                setValueSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  const conditional = JSON.stringify([
                    {
                      queryCondition: 1,
                      compValue:
                        isEmpty(valueSearch) === false ? valueSearch : null,
                    },
                  ]);
                  const pagination = JSON.stringify({
                    currentPage: 1,
                    userConfig: 10,
                  });
                  setCurrentPagination(1);
                  setPageSize(10);
                  setPaginationState(pagination);
                  setJsonConditionsState(conditional);
                  handlerCallGetRequestCoincidences(conditional, pagination);
                }
              }}
            />
            <button
              onClick={() => {
                const conditional = JSON.stringify([
                  {
                    queryCondition: 1,
                    compValue:
                      isEmpty(valueSearch) === false ? valueSearch : null,
                  },
                ]);
                const pagination = JSON.stringify({
                  currentPage: 1,
                  userConfig: 10,
                });
                setCurrentPagination(1);
                setPageSize(10);
                setPaginationState(pagination);
                setJsonConditionsState(conditional);
                handlerCallGetRequestCoincidences(conditional, pagination);
              }}
            >
              <IconSearch width="18px" />
            </button>
          </div>
        </div>
        <div className="filter-add-new">
          <ButtonAdd
            onClick={() => {
              setVisibleComponent(true);
            }}
          >
            Generar nuevo contrato
          </ButtonAdd>
        </div>
      </ContentFilter>
      <ComponentLoadSection isLoadApi={isLoadApi} text="Realizando pago">
        <ContentTable>
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>Propietario</th>
                  <th>Inquilino</th>
                  <th>Vigencia de contrato</th>
                  <th>Fecha de Firma</th>
                  <th>Estatus</th>
                  <th>Detalle</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {isEmpty(dataCoincidences) === false &&
                  dataCoincidences.map((row) => {
                    return (
                      <tr>
                        <td>{row.ownerShortName}</td>
                        <td>{row.tenantShortName}</td>
                        <td>{row.contractTerm}</td>
                        <td>
                          {row.scheduleAtFormatted}{" "}
                          <strong>
                            {row.isFaceToFace === true
                              ? "Presencial"
                              : "En linea"}
                          </strong>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div
                            style={{
                              background: row.style,
                              color: "#fff",
                              borderRadius: "5px",
                              padding: "5px",
                              width: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (row.requiresPymt === true) {
                                handlerOnClickPayment(row.idOrderPayment);
                              }
                            }}
                          >
                            {row.requestStatus}
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <ButtonDetail
                            onClick={() => {
                              history.push(
                                `/websystem/detalle-contrato-generado/${row.idRequest}`
                              );
                            }}
                          >
                            <IconEditSquare color="#000" size="16px" />
                          </ButtonDetail>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <ButtonDetail
                            onClick={async () => {
                              try {
                                await handlerCallSetRequest(
                                  {
                                    isActive: false,
                                  },
                                  row.idRequest
                                );
                                handlerCallGetRequestCoincidences(
                                  jsonConditionsState,
                                  paginationState
                                );
                              } catch (error) {}
                            }}
                          >
                            <IconDelete color="#000" size="16px" />
                          </ButtonDetail>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="content-pagination">
            <Pagination
              size="small"
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
                handlerCallGetRequestCoincidences(
                  jsonConditionsState,
                  objectConditions
                );
              }}
            />
          </div>
        </ContentTable>
      </ComponentLoadSection>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateContracts);
