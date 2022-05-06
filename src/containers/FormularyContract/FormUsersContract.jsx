import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isArray from "lodash/isArray";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import CustomStepsHomify from "../../components/customStepsHomifyV2";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import LogoHomify from "../../assets/img/logo.png";
import ContextForm from "./context/contextForm";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "./constants/styleConstants";
import SectionIdentity from "./sections/sectionIdentity";
import SectionInfoOwner from "./sections/sectionInfoOwner";
import SectionAddress from "./sections/sectionAddress";
import SectionBankInfo from "./sections/sectionBankInfo";
import ComponentPropsIncomplete from "./components/componentPropsIncomplete";
import ComponentConfirmInformation from "./components/componentConfirmInformation";
import ComponentLoadSection from "../../components/componentLoadSection";
import SectionSignature from "./sections/sectionSignature";
import { ReactComponent as IconAlerMessage } from "../../assets/iconSvg/svgFile/iconAlertMessage.svg";

const ErrorMessage = styled.div`
  position: absolute;
  padding: 8px 0px;
  background: #eb5757;
  color: #fff;
  left: -400px;
  z-index: 1001;
  padding: 5px 5px 5px 25px;
  border-radius: 0px 6px 6px 0px;
  font-size: 14px;
  transition: all 0.5s ease-in;
  width: fit-content;
  display: flex;
  .message-api {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  button {
    border: none;
    background: transparent;
    margin-left: 20px;
  }
`;

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  background: #f0f2f5;
  height: 100vh;
  @media screen and (max-width: 420px) {
    font-size: 12px;
    padding: 1em 5px;
  }
`;

let channel = null;

const infoTabsOwner = [
  { style: "fa fa-address-card-o", tab: "Identidad", identifier: 1 },
  { style: "fa fa-user-o", tab: "Información personal", identifier: 2 },
  { style: "fa fa-map-marker", tab: "Domicilio actual", identifier: 3 },
  { style: "fa fa-university", tab: "Información bancaria", identifier: 4 },
];

const infoTabsTenant = [
  { style: "fa fa-address-card-o", tab: "Identidad", identifier: 1 },
  { style: "fa fa-user-o", tab: "Información personal", identifier: 2 },
  { style: "fa fa-map-marker", tab: "Domicilio actual", identifier: 3 },
];

const FormUsersContract = (props) => {
  const { match, callGlobalActionApi } = props;
  const { params } = match;
  const idRequest = params.idRequest;
  const idUserInRequest = params.idUserInRequest;
  const idCustomerType = params.idCustomerType;

  const [dataConfigForm, setDataConfigForm] = useState({});
  const [current, setCurrent] = useState(0);
  const [dataTabs, setDataTabs] = useState([]);
  const [dataForm, setDataForm] = useState({});
  const [dataIncomplete, setDataIncomplete] = useState([]);
  const [isOpenIncomplete, setIsOpenIncomplete] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [isVisibleSignature, setIsVisibleSignature] = useState(true);

  const frontFunctions = new FrontFunctions();

  const handlerOnClickClose = () => {
    channel.postMessage("close_form_contract");
    channel.close();
  };

  const handlerCallGetTenantById = async () => {
    const dataProfile =
      isNil(props.dataProfile) === false ? props.dataProfile : {};

    try {
      const response = await callGlobalActionApi(
        {
          idRequest,
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_TENANT_BY_ID,
        "POST",
        false
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      setDataForm(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetOwnerById = async () => {
    const dataProfile =
      isNil(props.dataProfile) === false ? props.dataProfile : {};

    try {
      const response = await callGlobalActionApi(
        {
          idRequest,
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_OWNER_BY_ID,
        "POST",
        false
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      setDataForm(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetOwner = async (data) => {
    const dataProfile =
      isNil(props.dataProfile) === false ? props.dataProfile : {};

    try {
      await callGlobalActionApi(
        {
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
          ...data,
        },
        idRequest,
        API_CONSTANTS.ANONYMOUS.SET_OWNER,
        "PUT",
        false
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetTenant = async (data) => {
    const dataProfile =
      isNil(props.dataProfile) === false ? props.dataProfile : {};

    try {
      await callGlobalActionApi(
        {
          idUserInRequest,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
          ...data,
        },
        idRequest,
        API_CONSTANTS.ANONYMOUS.SET_TENANT,
        "PUT",
        false
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallValidateProperties = async () => {
    const dataProfile =
      isNil(props.dataProfile) === false ? props.dataProfile : {};

    try {
      const response = await callGlobalActionApi(
        {
          idRequest,
          idUserInRequest,
          identifier: null,
          idSystemUser:
            isEmpty(dataProfile) === false ? dataProfile.idSystemUser : null,
          idLoginHistory:
            isEmpty(dataProfile) === false ? dataProfile.idLoginHistory : null,
        },
        null,
        API_CONSTANTS.ANONYMOUS.VALIDATE_PROPERTIES,
        "POST",
        false
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.properties) === false &&
        isEmpty(responseResult.properties) === false
      ) {
        const dataIncomplete = JSON.parse(responseResult.properties);
        if (isArray(dataIncomplete) === false) {
          setDataIncomplete([dataIncomplete]);
        } else {
          setDataIncomplete(dataIncomplete);
        }
        setIsOpenIncomplete(true);
      } else {
        setIsOpenConfirm(true);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const confirmInformation = async () => {
    try {
      if (idCustomerType === "2") {
        await handlerCallSetOwner({ isConfirmed: true });
        handlerCallGetOwnerById();
      } else if (idCustomerType === "1") {
        await handlerCallSetTenant({ isConfirmed: true });
        handlerCallGetTenantById();
      }
      await handlerOnClickClose();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const channelName = "form_users_contract";
    channel = new BroadcastChannel(channelName);
    if (idCustomerType === "2") {
      handlerCallGetOwnerById();
      setDataTabs(infoTabsOwner);
    }
    if (idCustomerType === "1") {
      handlerCallGetTenantById();
      setDataTabs(infoTabsTenant);
    }
  }, []);

  return (
    <Content>
      <ErrorMessage id="error-message-api" visible={true}>
        <div className="message-api">
          <IconAlerMessage /> <span id="error-description"></span>{" "}
        </div>
        <button id="btn-action-error-message">X</button>
      </ErrorMessage>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "1.5em",
          }}
        >
          {dataForm.isDocAvail === false
            ? "Formulario para Contrato de Arrendamiento"
            : "Firma digital"}
        </h1>
      </div>
      <ComponentPropsIncomplete
        data={dataIncomplete}
        isVisibleModal={isOpenIncomplete}
        onClose={() => {
          setIsOpenIncomplete(false);
        }}
        onNextStep={() => {}}
        finish={true}
      />
      <ComponentConfirmInformation
        isModalVisible={isOpenConfirm}
        onClose={() => {
          setIsOpenConfirm(false);
        }}
        onSendConfirmation={async () => {
          try {
            await confirmInformation();
          } catch (error) {
            throw error;
          }
        }}
      />

      <ContextForm.Provider
        value={{
          dataFormSave: dataForm,
          idRequest,
          idUserInRequest,
          idCustomerType,
          onSetInformation: async (data) => {
            try {
              if (idCustomerType === "2") {
                await handlerCallSetOwner(data);
                handlerCallGetOwnerById();
              } else if (idCustomerType === "1") {
                await handlerCallSetTenant(data);
                handlerCallGetTenantById();
              }
            } catch (error) {
              throw error;
            }
          },
        }}
      >
        {dataForm.isDocAvail === false && (
          <>
            <CustomStepsHomify
              clickAble={false}
              steps={dataTabs}
              onClick={(ix, record) => {
                setCurrent(ix);
              }}
              callBackFind={(record) => {
                setDataConfigForm(record);
              }}
              current={current}
            />
            {dataConfigForm.identifier === 1 && (
              <ComponentLoadSection
                isLoadApi={isLoadApi}
                text="Obteniendo información"
                position="absolute"
              >
                <SectionIdentity
                  onUpdateInformation={() => {
                    setIsLoadApi(true);
                    setTimeout(() => {
                      if (idCustomerType === "2") {
                        handlerCallGetOwnerById();
                      }
                      if (idCustomerType === "1") {
                        handlerCallGetTenantById();
                      }
                      setIsLoadApi(false);
                    }, 5000);
                  }}
                  onClickNext={() => {
                    setCurrent(current + 1);
                  }}
                />
              </ComponentLoadSection>
            )}
            {dataConfigForm.identifier === 2 && (
              <SectionInfoOwner
                onClickBack={() => {
                  setCurrent(current - 1);
                }}
                onClickNext={() => {
                  setCurrent(current + 1);
                }}
              />
            )}
            {dataConfigForm.identifier === 3 && (
              <SectionAddress
                onClickBack={() => {
                  setCurrent(current - 1);
                }}
                onClickNext={() => {
                  if (idCustomerType === "2") {
                    setCurrent(current + 1);
                  } else {
                    handlerCallValidateProperties();
                  }
                }}
              />
            )}
            {dataConfigForm.identifier === 4 && (
              <SectionBankInfo
                onClickBack={() => {
                  setCurrent(current - 1);
                }}
                onClickNext={() => {
                  handlerCallValidateProperties();
                }}
              />
            )}
          </>
        )}
        {dataForm.isDocAvail === true && <SectionSignature />}
      </ContextForm.Provider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <img src={LogoHomify} alt="" srcset="" width={100} />
        <div
          style={{
            paddingTop: "20px",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          <span>
            Puedes ver nuestros{" "}
            <a
              href="https://www.homify.ai/terminos-y-condiciones"
              target="_blank"
            >
              Términos y condiciones
            </a>{" "}
            de uso de los servicios. Si quieres más información acerca de cómo
            Homify recopila, utiliza y protege tus datos personales, consulta el{" "}
            <a href="https://www.homify.ai/aviso-de-privacidad" target="_blank">
              aviso de privacidad
            </a>{" "}
            de Homify.
          </span>
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormUsersContract);
