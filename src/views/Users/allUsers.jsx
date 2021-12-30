import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Table, Progress } from "antd";
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
import SectionAddUsers from "../Admin/sections/sectionAddUsers";

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

const SectionButton = styled.div`
  padding: 20px 10px;

  button {
    border-radius: 16px;
    background: var(--color-primary);
    border: none;
    color: #fff;
    font-weight: 600;
    padding: 5px 20px;
  }
`;

const AllUsers = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    history,
    callGetSearchProspect,
    callGetAddProspect,
  } = props;
  const [dataInvestigations, setDataInvestigations] = useState([]);
  const [isVisibleAddUser, setIsVisibleAddUser] = useState(false);
  const [dataOwnerSearch, setDataOwnerSearch] = useState({
    idPersonType: 1,
    idCustomer: null,
  });
  const [dataTenantSearch, setDataTenantSearch] = useState({
    idCustomerTenant: null,
    idCustomerType: null,
    idPersonType: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    phoneNumber: null,
  });
  const [dataSecondTenant, setDataSecondTenant] = useState({
    idCustomerTenant: null,
    idCustomerType: null,
    idPersonType: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    phoneNumber: null,
  });
  const [dataAdviserSearch, setDataAdviserSearch] = useState({
    idCustomerAgent: null,
  });
  const frontFunctions = new FrontFunctions();

  const handlerCallGetAddProspect = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callGetAddProspect({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      frontFunctions.showMessageStatusApi(
        "La solicitud se procesó exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetSearchProspect = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataOwnerSearch(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetSearchProspectTenant = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 2,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataTenantSearch(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetSearchSecondTenant = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: id,
        type: 2,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataSecondTenant(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetSearchProspectAdviser = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 3,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataAdviserSearch(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

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
    handlerCallGetUserCoincidences();
  }, []);

  return (
    <Content>
      <SectionButton>
        <button
          type="button"
          onClick={() => {
            setIsVisibleAddUser(true);
          }}
        >
          Agregar usuarios
        </button>
      </SectionButton>
      <SectionAddUsers
        isModalVisible={isVisibleAddUser}
        dataOwnerSearch={dataOwnerSearch}
        dataTenantSearch={dataTenantSearch}
        dataAdviserSearch={dataAdviserSearch}
        dataSecondTenant={dataSecondTenant}
        onClose={() => {
          setIsVisibleAddUser(!isVisibleAddUser);
          handlerCallGetUserCoincidences();
        }}
        spinVisible={false}
        onSearchOwner={(data) => {
          handlerCallGetSearchProspect(data);
        }}
        onSearchTenant={(data) => {
          handlerCallGetSearchProspectTenant(data);
        }}
        onSearchSecondTenant={(data, id) => {
          handlerCallGetSearchSecondTenant(data, id);
        }}
        onSearchAdviser={(data) => {
          handlerCallGetSearchProspectAdviser(data);
        }}
        onSendInformation={async (data) => {
          try {
            await handlerCallGetAddProspect(data);
            handlerCallGetUserCoincidences();
          } catch (error) {
            throw error;
          }
        }}
      />
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
  callGetSearchProspect: (data) => dispatch(callGetSearchProspect(data)),
  callGetAddProspect: (data) => dispatch(callGetAddProspect(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
