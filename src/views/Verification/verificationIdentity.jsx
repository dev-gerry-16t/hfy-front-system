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

const VerificationIdentity = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const [dataInvestigations, setDataInvestigations] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetVerificationIdentityCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          topIndex: 0,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_VERIFICATION_IDENTITY_COINCIDENCES
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
      dataIndex: "customerFullName",
      key: "customerFullName",
      render: (text, record) => (
        <div
          style={{
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            // history.push(
            //   `/websystem/user-detail/${record.idInvestigationProcess}`
            // );
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
      title: "Inicio de verificación",
      dataIndex: "startedAt",
      key: "startedAt",
    },
    {
      title: "Fin de verificación",
      dataIndex: "finishedAt",
      key: "finishedAt",
    },
    {
      title: "Estatus de la verificación",
      dataIndex: "verificationIdentityStatus",
      key: "verificationIdentityStatus",
    },
    {
      title: "Visualizar en Mati",
      dataIndex: "matiDashboardUrl",
      key: "matiDashboardUrl",
      render: (text, record) => (
        <a target="_blank" href={`${text}`}>
          Ver
        </a>
      ),
    },
  ];

  useEffect(() => {
    handlerCallGetVerificationIdentityCoincidences();
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationIdentity);
