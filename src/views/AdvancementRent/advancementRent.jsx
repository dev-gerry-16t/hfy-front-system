import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Table, message } from "antd";
import moment from "moment";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import {
  callGetRequestAdvancePymtCoincidences,
  callGetRequestAdvancePymtById,
  callGetAllRequestAdvancePymtStatus,
  callUpdateRequestAdvancePym,
  callGetRequestAdvancePymtProperties,
} from "../../utils/actions/actions";
import SectionAdvancementDetail from "./sections/sectionAdvancementDetail";

const { Content } = Layout;

const AdvancementRent = (props) => {
  const {
    dataProfile,
    callGetRequestAdvancePymtCoincidences,
    callGetRequestAdvancePymtById,
    callGetAllRequestAdvancePymtStatus,
    callUpdateRequestAdvancePym,
    callGetRequestAdvancePymtProperties,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataDetailAdvancement, setDataDetailAdvancement] = useState({});
  const [dataDetailTableAdvancement, setDataDetailTableAdvancement] = useState(
    []
  );
  const [dataStatus, setDataStatus] = useState([]);
  const [isVisibleDetail, setIsVisibleDetail] = useState(false);

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

  const handlerCallGetRequestAdvancePymtCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtCoincidences({
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

  const handlerCallGetRequestAdvancePymtById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtById({
        idRequestAdvancePymt: id,
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response[1]) === false &&
        isNil(response.response[1]) === false
          ? response.response[1]
          : [];
      setDataDetailAdvancement(responseResult);
      setDataDetailTableAdvancement(responseResult1);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllRequestAdvancePymtStatus = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllRequestAdvancePymtStatus({
        idRequestAdvancePymt: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataStatus(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateRequestAdvancePym = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateRequestAdvancePym(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "Tu solicitud se procesó exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetRequestAdvancePymtProperties = async (id, data, name) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtProperties({
        ...data,
        idRequestAdvancePymt: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      if (isEmpty(responseResult) === false) {
        const { token } = dataProfile;
        const response = await fetch(`${ENVIROMENT}${responseResult.url}`, {
          method: "GET",
        });
        if (isNil(response.status) === false && response.status !== 200) {
          const responseResult = await response.json();
          const responseText =
            isNil(responseResult) === false &&
            isNil(responseResult.response) === false &&
            isNil(responseResult.response.statusText) === false
              ? responseResult.response.statusText
              : "";
          throw responseText;
        }
        const label = `${name}_${moment().format("YYYYMMDD-HHmm")}`;
        const blob = await response.blob();
        const link = document.createElement("a");
        link.className = "download";
        link.download = `${label}.${"docx"}`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    handlerCallGetRequestAdvancePymtCoincidences();
  }, []);

  const columns = [
    {
      title: "Contrato",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
    },
    {
      title: "Solicitante (Propietario)",
      dataIndex: "customerFullName",
      key: "customerFullName",
      width: 300,
    },
    {
      title: "Fecha de Solicitud",
      dataIndex: "requestedAt",
      key: "requestedAt",
    },
    {
      title: "Plazos para pago de renta",
      dataIndex: "totalTerm",
      key: "totalTerm",
    },
    {
      title: "Monto de adelanto",
      dataIndex: "advanceRentsRequestedAmount",
      key: "advanceRentsRequestedAmount",
    },
    {
      title: "Balance actual",
      dataIndex: "currentBalance",
      key: "currentBalance",
    },
    {
      title: "Estatus",
      dataIndex: "requestAdvancePymtStatus",
      key: "requestAdvancePymtStatus",
    },
    {
      title: "Detalle",
      dataIndex: "idRequestAdvancePymt",
      key: "idRequestAdvancePymt",
      render: (id, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer", // text === true ? "pointer" : "none",
          }}
          onClick={async () => {
            await handlerCallGetAllRequestAdvancePymtStatus(id);
            await handlerCallGetRequestAdvancePymtById(id);
            setIsVisibleDetail(true);
          }}
        >
          {
            <EyeTwoTone /> /*text === true ? <EyeTwoTone /> : <EyeInvisibleOutlined />*/
          }
        </div>
      ),
    },
  ];

  return (
    <Content>
      <SectionAdvancementDetail
        isModalVisible={isVisibleDetail}
        onClose={() => {
          setIsVisibleDetail(!isVisibleDetail);
          handlerCallGetRequestAdvancePymtCoincidences();
        }}
        onSendInformation={async (data, id) => {
          try {
            await handlerCallUpdateRequestAdvancePym(data, id);
            handlerCallGetRequestAdvancePymtCoincidences();
          } catch (error) {
            throw error;
          }
        }}
        dataDetailAdvancement={dataDetailAdvancement}
        dataDetailTableAdvancement={dataDetailTableAdvancement}
        dataStatus={dataStatus}
        onGetDocument={async (id, data) => {
          try {
            await handlerCallGetRequestAdvancePymtProperties(
              id,
              data,
              "Contrato_adelanto"
            );
          } catch (error) {
            throw error;
          }
        }}
      />
      <div className="margin-app-main">
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Solicitudes de adelanto de renta</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
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
  callGetRequestAdvancePymtCoincidences: (data) =>
    dispatch(callGetRequestAdvancePymtCoincidences(data)),
  callGetRequestAdvancePymtById: (data) =>
    dispatch(callGetRequestAdvancePymtById(data)),
  callGetAllRequestAdvancePymtStatus: (data) =>
    dispatch(callGetAllRequestAdvancePymtStatus(data)),
  callUpdateRequestAdvancePym: (data, id) =>
    dispatch(callUpdateRequestAdvancePym(data, id)),
  callGetRequestAdvancePymtProperties: (data) =>
    dispatch(callGetRequestAdvancePymtProperties(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancementRent);
