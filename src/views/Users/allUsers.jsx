import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Table, Progress, Pagination } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callGetSearchProspect,
  callGetAddProspect,
} from "../../utils/actions/actions";

const Content = styled.div`
  padding: 20px;
  overflow-y: scroll;
  font-family: Poppins;
`;

const DataPipeline = styled.div`
  background: var(--color-primary);
  width: 50%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;
  font-size: 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    color: #fff;
    font-weight: 500;
    margin: 0px;
    margin-right: 3px;
  }
`;

const AllUsers = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const [dataInvestigations, setDataInvestigations] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [totalCoincidences, setTotalCoincidences] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
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

  const handlerCallGetUserCoincidences = async (condition, pag) => {
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
        API_CONSTANTS.CUSTOMER.GET_USER_COINCIDENCES
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
      setTotalCoincidences(responseResultTotal);
      setDataInvestigations(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div
          style={{
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push(`/websystem/userType-detail/${record.idCustomer}`);
          }}
        >
          <u>{text}</u>
        </div>
      ),
    },
    {
      title: "Tipo de usuario",
      dataIndex: "customerType",
      key: "customerType",
    },
    {
      title: "Invitado por",
      dataIndex: "invitedByUser",
      key: "invitedByUser",
    },
    {
      title: "Registo el dia",
      dataIndex: "registeredAt",
      key: "registeredAt",
    },
    {
      title: "Avance",
      dataIndex: "percentDataCompleted",
      key: "percentDataCompleted",
      width: 250,
      render: (percent, record) => (
        <div style={{ padding: "0px 15px 0px 0px" }}>
          <Progress
            percent={isNil(percent) === false ? percent : 0}
            size="small"
            status="succes"
          />
        </div>
      ),
    },
    {
      title: "Proceso Actual",
      dataIndex: "currentTimeLine",
      key: "currentTimeLine",
      align: "center",
      render: (text, record) => {
        const parseString = isEmpty(text) === false ? JSON.parse(text) : {};
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DataPipeline>
              <div>
                <h1>{parseString.title}</h1>{" "}
                <i className={parseString.style}></i>
              </div>
              <span>{parseString.description}</span>
            </DataPipeline>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    handlerCallGetUserCoincidences(jsonConditionsState, paginationState);
  }, []);

  return (
    <Content>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <input
          style={{
            border: "1px solid var(--color-primary)",
            borderRadius: "16px",
            padding: "5px 10px",
            width: "300px",
          }}
          placeholder="Busca por Nombre o Folio de contrato"
          type="text"
          value={valueSearch}
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
              handlerCallGetUserCoincidences(conditional, pagination);
            }
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataInvestigations}
        className="table-users-hfy"
        size="small"
        bordered
        pagination={false}
      />
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
            handlerCallGetUserCoincidences(
              jsonConditionsState,
              objectConditions
            );
          }}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
