import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Table } from "antd";
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

const InvitationProspects = (props) => {
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
      <SectionAddUsers
        isModalVisible={isVisibleAddUser}
        dataOwnerSearch={dataOwnerSearch}
        dataTenantSearch={dataTenantSearch}
        dataAdviserSearch={dataAdviserSearch}
        dataSecondTenant={dataSecondTenant}
        onClose={() => {
          setIsVisibleAddUser(!isVisibleAddUser);
          handlerCallGetProspectCoincidences();
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
            handlerCallGetProspectCoincidences();
          } catch (error) {
            throw error;
          }
        }}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationProspects);
