import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Table } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";

const Content = styled.div`
  padding: 20px;
`;

const Invesitgations = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const [dataInvestigations, setDataInvestigations] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetInvestigationProcessCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          topIndex: 0,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_INVESTIGATION_PROCESS_COINCIDENCES
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
      title: "Inquilino",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div
          style={{
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push(
              `/websystem/user-detail/${record.idInvestigationProcess}`
            );
          }}
        >
          <u>{text}</u>
        </div>
      ),
    },
    {
      title: "Obligado solidario",
      dataIndex: "bsFullName",
      key: "bsFullName",
    },
    {
      title: "Solicitado el dia",
      dataIndex: "requestedAt",
      key: "requestedAt",
    },
    {
      title: "Actualizado por",
      dataIndex: "lastUpdatedBy",
      key: "lastUpdatedBy",
      render: (text, record) => (
        <div>
          {text} {record.lastUpdatedAt}
        </div>
      ),
    },
    {
      title: "Aprobado por",
      dataIndex: "approvedByUser",
      key: "approvedByUser",
      render: (text, record) => (
        <div>
          {text} {record.approvedAt}
        </div>
      ),
    },
    {
      title: "Estatus",
      dataIndex: "investigationStatus",
      key: "investigationStatus",
    },
  ];

  useEffect(() => {
    handlerCallGetInvestigationProcessCoincidences();
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

export default connect(mapStateToProps, mapDispatchToProps)(Invesitgations);
