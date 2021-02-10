import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, notification } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { UserOutlined } from "@ant-design/icons";
import IconCalendar from "../../assets/icons/Calendar.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconDanger from "../../assets/icons/Danger.svg";
import FileReport from "../../assets/icons/FileReport.svg";
import MessagesIcon from "../../assets/icons/MessagesIcon.svg";
import DocumentsIcon from "../../assets/icons/DocumentsIcon.svg";
import Tools from "../../assets/icons/Tools.svg";
import Transport from "../../assets/icons/Transport.svg";
import SectionContractAvailable from "./sections/sectionContractAvailable";
import SectionDepositGuarantee from "./sections/sectionDepositGuarantee";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGetAllCustomerTenantDashboardById } from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";

const { Content } = Layout;

const Tenant = (props) => {
  const {
    history,
    callGetAllCustomerTenantById,
    dataProfile,
    setDataUserProfile,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataTenant, setDataTenant] = useState([]);
  const [isModalVisiblePolicy, setIsModalVisiblePolicy] = useState(false);
  const frontFunctions = new FrontFunctions();

  const args = {
    description: (
      <div style={{ fontFamily: "Poppins" }}>
        <span style={{ fontSize: "12px" }}>
          Antes de iniciar el formulario debes tener lista una identificación
          oficial, tus últimos 3 comprobantes de ingresos y una carta de la
          empresa donde trabajas que acredite desde cuando estas laborando en la
          empresa. Adicional, necesitaras la escritura del inmueble que quedara
          como garantía y los datos e identificación del Aval.
        </span>
        <button
          type="button"
          onClick={() => {
            notification.destroy();
            history.push("/websystem/typeform-user");
          }}
          className="button-action-primary"
          style={{ marginTop: "25px" }}
        >
          <span>Ir al formulario</span>
        </button>
      </div>
    ),
    message: (
      <div
        style={{
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "var(--color-primary)",
        }}
      >
        Solicitud de Investigación Persona Física con Aval
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
  };

  const argsv2 = {
    description: (
      <div style={{ fontFamily: "Poppins" }}>
        <span style={{ fontSize: "12px" }}>
          Buen dia <strong>Sebastian</strong>, estamos en espera del pago de tu{" "}
          <strong>depósito en ganarantía</strong>.<br /> <br />
          Si no puedes pagar el
          <strong> depósito en ganarantía</strong> tenemos estas opciones para
          ti
        </span>
        <button
          type="button"
          onClick={() => {
            setIsModalVisiblePolicy(!isModalVisiblePolicy);
            notification.destroy();
          }}
          className="button-action-primary"
          style={{ marginTop: "25px" }}
        >
          <span>Revisar opciones</span>
        </button>
      </div>
    ),
    message: (
      <div
        style={{
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "var(--color-primary)",
        }}
      >
        Depósito en Garantia
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
  };

  const handlerCallGetAllCustomerTenantById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerTenantById({
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
      setDataTenant(responseResult);
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.isTypeFormCompleted) === false &&
        responseResult.isTypeFormCompleted === false
      ) {
        setDataUserProfile({
          ...dataProfile,
          idCustomerTenantTF: responseResult.idCustomerTenant,
          idCustomerTF: responseResult.idCustomer,
          idContract: responseResult.idContract,
        });
        notification.open(args);
        notification.open(argsv2);
      }
    } catch (error) {}
  };
  
  useEffect(() => {
    // notification.open(argsv2);
    // notification.open(args);
    handlerCallGetAllCustomerTenantById();
  }, []);
  return (
    <Content>
      <SectionContractAvailable
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      />
      <SectionDepositGuarantee
        isModalVisible={isModalVisiblePolicy}
        onClose={() => {
          setIsModalVisiblePolicy(!isModalVisiblePolicy);
        }}
        frontFunctions={frontFunctions}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataTenant.shortNameTenant}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataTenant.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="action-buttons-top">
            <div className="button_init_primary"></div>
            {dataTenant.canSignContract === true && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  <span>¡Contrato Disponible!</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconCalendar} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.nextPaymentAt}</h2>
            <span>Fecha de próximo pago</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.currentRent}</h2>
            <span>Monto de renta</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconDanger} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.interestAmount}</h2>
            <span>Moratorios</span>
          </div>
        </div>
        {dataTenant.canRequestMove !== 0 && (
          <div className="main-information-owner">
            <div className="title-cards">
              <span>Acciones</span>
            </div>
            <div className="section-information-actions">
              <div className="section-information-buttons">
                <div className="section-information-button-2">
                  <img src={Tools} height={62} alt="Reportar incidencia" />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="button-action-primary"
                  >
                    <span>Cotizar incidencia</span>
                  </button>
                </div>
                <div className="section-information-button-3">
                  <img src={Transport} alt="Reportar incidencia" height={62} />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="button-action-primary"
                  >
                    <span>Solicitar mudanza</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="main-information-owner">
          <div className="title-cards flex-title-card">
            <span>Propietario</span>
            <div className="button_init_secondary">
              <button type="button" onClick={() => {}}>
                <span>Reportar Propietario</span>
              </button>
            </div>
          </div>
          <div className="section-information-actions">
            <div className="section-information-info">
              <div className="section-information-data">
                <Avatar size={50} icon={<UserOutlined />} />
                <div className="info-user">
                  <strong>{dataTenant.fullName}</strong>
                  <Rate
                    style={{
                      fontSize: "15px",
                      position: "relative",
                      bottom: "5px",
                    }}
                    tooltips={[]}
                    onChange={() => {}}
                    value={dataTenant.ratingRate}
                  />
                </div>
              </div>
              <div className="section-information-button-1">
                <img src={FileReport} height={62} alt="Reportar incidencia" />
                <button
                  type="button"
                  onClick={() => {}}
                  className="button-action-primary"
                >
                  <span>Reportar incidencia</span>
                </button>
              </div>
            </div>
            <div className="section-information-buttons">
              <div className="section-information-button-2">
                <img src={MessagesIcon} height={62} alt="Reportar incidencia" />
                <button
                  type="button"
                  onClick={() => {}}
                  className="button-action-primary"
                >
                  <span>Enviar mensaje</span>
                </button>
              </div>
              <div className="section-information-button-3">
                <img
                  src={DocumentsIcon}
                  alt="Reportar incidencia"
                  height={62}
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="button-action-primary"
                >
                  <span>Subir documento</span>
                </button>
              </div>
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),

  callGetAllCustomerTenantById: (data) =>
    dispatch(callGetAllCustomerTenantDashboardById(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);
