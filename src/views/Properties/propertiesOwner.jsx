import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, message, Card, Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  callGetAllCustomerById,
  callGetPropertyTypes,
  callAddProperty,
  callGetZipCodeAdress,
  callGetPropertyCoincidences,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import SectionAddProperty from "../Owner/sections/sectionAddProperty";

const { Content } = Layout;
const { Meta } = Card;

const PropertiesOwner = (props) => {
  const {
    dataProfile,
    callGetAllCustomerById,
    callGetPropertyTypes,
    callAddProperty,
    callGetZipCodeAdress,
    callGetPropertyCoincidences,
  } = props;
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);

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

  const handlerCallGetAllCustomerById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataCustomer(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPropertyCoincidences = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPropertyCoincidences({
        idCustomer,
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

  const handlerCallGetPropertyTypes = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPropertyTypes({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPropertyTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdress = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetZipCodeAdress({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      setDataZipCodeAdress(responseResult1);
      setDataZipCatalog(responseResult2);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAddProperty = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callAddProperty({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setSpinVisible(false);
      setIsModalVisible(!isModalVisible);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAllCustomerById();
    handlerCallGetPropertyCoincidences();
  }, []);

  return (
    <Content>
      <SectionAddProperty
        dataPropertyTypes={dataPropertyTypes}
        spinVisible={spinVisible}
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        onClickAddProperty={async (data) => {
          setSpinVisible(true);
          await handlerCallAddProperty(data);
          await handlerCallGetAllCustomerById();
        }}
        dataZipCodeAdress={dataZipCodeAdress}
        dataZipCatalog={dataZipCatalog}
        onChangeZipCode={(zipCode) => {
          hanlderCallGetZipCodeAdress({ type: 1, zipCode });
        }}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataCustomer.shortName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataCustomer.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="action-buttons-top">
            {(dataCustomer.canRequestProperty === 1 ||
              dataCustomer.canRequestProperty === true) && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    handlerCallGetPropertyTypes();
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  <span>Registrar Propiedad</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="main-information-user">
          <div
            style={{
              marginTop: "4em",
              width: "100%",
            }}
          >
            <Row>
              {isEmpty(dataCoincidences) === false &&
                dataCoincidences.map((row) => {
                  return (
                    <Col
                      span={8}
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      md={{ span: 8 }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card
                        hoverable
                        style={{
                          borderRadius: 16,
                          marginTop: 20,
                          width: 340,
                          fontSize: 12,
                          boxShadow:
                            " rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                        }}
                        cover={
                          <img
                            alt="example"
                            src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png"
                          />
                        }
                      >
                        <Meta
                          title="Estatus"
                          description={row.propertyStatus}
                        />

                        <Meta
                          title="Dirección"
                          description={row.fullAddress}
                          style={{ marginTop: 15 }}
                        />
                        <Meta
                          title="Monto de renta"
                          description={row.currentRent}
                          style={{ marginTop: 15 }}
                        />
                        <Meta
                          title="Monto de mantenimiento"
                          description={row.maintenanceAmount}
                          style={{ marginTop: 15 }}
                        />
                        <Meta
                          title="Tipo de propiedad"
                          description={row.propertyType}
                          style={{ marginTop: 15 }}
                        />
                        <Meta
                          title="Cajones de estacionamiento"
                          description={row.totalParkingSpots}
                          style={{ marginTop: 15 }}
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
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
  callGetAllCustomerById: (data) => dispatch(callGetAllCustomerById(data)),
  callGetPropertyTypes: (data) => dispatch(callGetPropertyTypes(data)),
  callAddProperty: (data) => dispatch(callAddProperty(data)),
  callGetZipCodeAdress: (data) => dispatch(callGetZipCodeAdress(data)),
  callGetPropertyCoincidences: (data) =>
    dispatch(callGetPropertyCoincidences(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesOwner);
