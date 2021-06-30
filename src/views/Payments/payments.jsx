import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Table, message } from "antd";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGetTransactions } from "../../utils/actions/actions";

const { Content } = Layout;

const Payments = (props) => {
  const { dataProfile, callGetTransactions } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const handlerCallGetTransactions = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTransactions({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCoincidences(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetTransactions();
  }, []);

  const columns = [
    {
      title: "Clave STP",
      dataIndex: "idSTP",
      key: "idSTP",
    },
    {
      title: "Operación",
      dataIndex: "operationType",
      key: "operationType",
    },
    {
      title: "Origen",
      dataIndex: "operationSource",
      key: "operationSource",
    },
    {
      title: "Folio Contrato",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
    },
    {
      title: "Fecha Operación",
      dataIndex: "operationDate",
      key: "operationDate",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Razón Rechazo",
      dataIndex: "rejectionReason",
      key: "rejectionReason",
    },
    {
      title: "Clave Rastreo",
      dataIndex: "trackingKey",
      key: "trackingKey",
    },
    {
      title: "Información Ordenante",
      dataIndex: "accountHolderOrdering",
      key: "accountHolderOrdering",
    },
    {
      title: "Información Beneficiario",
      dataIndex: "accountHolderBeneficiary",
      key: "accountHolderBeneficiary",
    },
  ];

  return (
    <Content>
      <div className="margin-app-main">
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Transacciones</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 2500 }}
              />
            </div>
          </div>
        </div>
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
  callGetTransactions: (data) => dispatch(callGetTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
