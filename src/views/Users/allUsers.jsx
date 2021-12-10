import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Table ,Progress} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";

const Content = styled.div`
  padding: 20px;
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
  const frontFunctions = new FrontFunctions();

  const handlerCallGetUserCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          topIndex: 0,
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
      width:250,
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
    handlerCallGetUserCoincidences();
  }, []);

  return (
    <Content>
      <Table
        columns={columns}
        dataSource={dataInvestigations}
        className="table-users-hfy"
        size="small"
        bordered
      />
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
