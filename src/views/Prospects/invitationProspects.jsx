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

const InvitationProspects = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const [dataInvestigations, setDataInvestigations] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetProspectCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          topIndex: 0,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROSPECT_COINCIDENCES
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      const arrayKeys = responseResult.map((rowMap) => {
        return { ...rowMap, key: rowMap.idInvitation };
      });
      const newArray = [];
      arrayKeys.forEach((element) => {
        if (isNil(element.idProspectParent) === true) {
          const idParent = element.idProspect;

          const childrens = arrayKeys.filter((row) => {
            return row.idProspectParent === idParent;
          });
          newArray.push({ ...element, children: childrens });
        }
      });
      setDataInvestigations(newArray);
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
      title: "Correo",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Fecha de invitación",
      dataIndex: "createdAtFormat",
      key: "createdAtFormat",
    },
    {
      title: "Fecha de expiración",
      dataIndex: "expiredAtFormat",
      key: "expiredAtFormat",
    },
    {
      title: "Invitado por",
      dataIndex: "invitatedByUser",
      key: "invitatedByUser",
    },
    {
      title: "Estatus de invitación",
      dataIndex: "invitationStatus",
      key: "invitationStatus",
    },
  ];

  useEffect(() => {
    handlerCallGetProspectCoincidences();
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
)(InvitationProspects);
