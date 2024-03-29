import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { Modal, Row, Col } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import styled from "styled-components";
import ContextProperty from "../context/contextProperty";
import CustomSelect from "../../../components/CustomSelect";
import { ReactComponent as IconAgentFile } from "../../../assets/iconSvg/svgFile/iconAgentFile.svg";
import { ReactComponent as IconAssociate } from "../../../assets/iconSvg/svgFile/iconAssociate.svg";
import { ReactComponent as IconRejected } from "../../../assets/iconSvg/svgFile/iconRejected.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";

const MultiSelect = styled.div`
  margin: 1em 0px;
  display: flex;
  flex-direction: column;
  .button-actions-select {
    display: flex;
    justify-content: space-around;
    gap: 1em;
  }
  @media screen and (max-width: 460px) {
    .button-actions-select {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`;

const ButtonCheck = styled.button`
  border: ${(props) =>
    props.select === true ? "1px solid #FF0083" : "1px solid #d6d8e7"};
  border-radius: 0.5em;
  background: ${(props) =>
    props.select === true ? "rgba(255, 0, 131, 0.2)" : "transparent"};
  color: #000;
  font-weight: 500;
  padding: 0.5em 0.8em;
  font-size: 14px;
  box-shadow: ${(props) =>
    props.select ? "0px 0px 5px 2px rgba(255, 0, 131, 0.15)" : "none"};
  @media screen and (max-width: 460px) {
    font-size: 12px;
  }
`;

const catalogAssociation = [
  { id: "1", text: "Vincular con existente" },
  { id: "2", text: "Aceptar" },
  { id: "3", text: "Rechazar" },
];

const catalogAssociationV2 = [
  { id: "2", text: "Aceptar" },
  { id: "3", text: "Rechazar" },
];

const SectionAssociationProperty = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const dataContexProperty = useContext(ContextProperty);
  const {
    dataDetail,
    updateProperty,
    getById,
    isOpenComponent,
    onCloseComponent,
  } = dataContexProperty;
  const {
    fullAddress,
    idProperty,
    idApartment,
    canBeAssociated,
    canBeAssociatedWith,
  } = dataDetail;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [finishProcess, setFinishProcess] = useState(false);
  const [selectAssociation, setSelectAssociation] = useState(null);
  const [methodAssociation, setMethodAssociation] = useState(null);
  const [selectProperty, setSelectProperty] = useState(null);
  const [acceptProperty, setAcceptProperty] = useState(true);
  const [dataPropertyParent, setDataPropertyParent] = useState({});
  const [newInfoProperty, setNewInfoProperty] = useState({});
  const [dataProperty, setDataProperty] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetAllProperties = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PROPERTIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataProperty(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetPropertyAssociation = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SET_PROPERTY_ASSOCIATION,
        "PUT"
      );
      return response.response;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    if (canBeAssociated === true) {
      handlerCallGetAllProperties();
      setVisibleModal(true);
    }
  }, [canBeAssociated]);

  return (
    <Modal
      visible={visibleModal || isOpenComponent === 8}
      closable={finishProcess === false}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onCloseComponent();
        if (finishProcess === false) {
          setVisibleModal(false);
        }
      }}
    >
      {finishProcess === false && (
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          <FormModal>
            <h1>Vincula o crea la propiedad</h1>
            <p>
              {dataProfile.idUserType === 4 ? "El propietario" : "Tu asesor"}{" "}
              {canBeAssociatedWith} ha indicado que{" "}
              {dataProfile.idUserType === 4
                ? "administraras esta propiedad"
                : "esta propiedad te pertenece:"}
            </p>
            <div className="icon-image-send">
              <IconAgentFile />
            </div>

            <div>
              <Row>
                <Col span={24}>
                  <MultiSelect>
                    <span>¿Qué deseas hacer con esta propiedad?</span>
                    <div className="button-actions-select">
                      {isEmpty(dataProperty) === false &&
                        catalogAssociation.map((row) => {
                          return (
                            <ButtonCheck
                              select={row.id === selectAssociation}
                              onClick={() => {
                                if (row.id !== "1") {
                                  setSelectProperty(null);
                                  setDataPropertyParent({});
                                  setMethodAssociation(null);
                                }
                                if (row.id === "3") {
                                  setAcceptProperty(false);
                                } else {
                                  setAcceptProperty(true);
                                }
                                setSelectAssociation(row.id);
                              }}
                            >
                              {row.text}
                            </ButtonCheck>
                          );
                        })}
                      {isEmpty(dataProperty) === true &&
                        catalogAssociationV2.map((row) => {
                          return (
                            <ButtonCheck
                              select={row.id === selectAssociation}
                              onClick={() => {
                                if (row.id !== "1") {
                                  setSelectProperty(null);
                                  setDataPropertyParent({});
                                  setMethodAssociation(null);
                                }
                                if (row.id === "3") {
                                  setAcceptProperty(false);
                                } else {
                                  setAcceptProperty(true);
                                }
                                setSelectAssociation(row.id);
                              }}
                            >
                              {row.text}
                            </ButtonCheck>
                          );
                        })}
                    </div>
                  </MultiSelect>
                </Col>
              </Row>
              {selectAssociation === "1" && (
                <Row>
                  <Col span={24}>
                    <CustomSelect
                      value={selectProperty}
                      placeholder=""
                      label="Propiedad a vincular"
                      data={dataProperty}
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value, row) => {
                        setSelectProperty(value);
                        setDataPropertyParent(row);
                      }}
                    />
                  </Col>
                </Row>
              )}
              {selectAssociation === "1" && isNil(selectProperty) === false && (
                <Row>
                  <Col span={24}>
                    <label className="input-radio">
                      <input
                        type="radio"
                        id={`type-association-1`}
                        name="associate"
                        value={""}
                        onClick={() => {
                          setMethodAssociation(1);
                        }}
                      />
                      Vincular y actualizar con la ficha técnica{" "}
                      {dataProfile.idUserType === 4
                        ? "del propietario"
                        : "de mi agente"}
                      .
                    </label>
                  </Col>
                  <label className="input-radio">
                    <input
                      type="radio"
                      id={`type-association-2`}
                      name="associate"
                      value={""}
                      onClick={() => {
                        setMethodAssociation(2);
                      }}
                    />
                    Vincular y actualizar con la ficha técnica de mi propiedad
                  </label>
                  <Col span={24}></Col>
                </Row>
              )}
            </div>
            {(selectAssociation === "2" ||
              selectAssociation === "3" ||
              (selectAssociation === "1" &&
                isNil(methodAssociation) === false)) && (
              <div
                className="button-action"
                style={{
                  marginTop: "2em",
                }}
              >
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      setIsLoadApi(true);
                      const response = await handlerCallSetPropertyAssociation(
                        {
                          idPropertyParent:
                            isEmpty(dataPropertyParent) === false
                              ? dataPropertyParent.idProperty
                              : null,
                          idApartmentParent:
                            isEmpty(dataPropertyParent) === false
                              ? dataPropertyParent.idApartment
                              : null,
                          isAccepted: acceptProperty,
                          method: methodAssociation,
                          idApartment,
                          idProperty,
                        },
                        idProperty
                      );
                      setNewInfoProperty(response);
                      setFinishProcess(true);
                      setIsLoadApi(false);
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  Finalizar
                </ButtonsModal>
              </div>
            )}
          </FormModal>
        </ComponentLoadSection>
      )}
      {finishProcess === true && (
        <FormModal>
          <h1>Se procesó con éxito tu solicitud</h1>
          <p>
            {selectAssociation === "3"
              ? "Has rechazado la vinculación con esta propiedad"
              : "La propiedad ha sido vinculada exitosamente"}
          </p>
          <div className="icon-image-send">
            {selectAssociation === "3" ? <IconRejected /> : <IconAssociate />}
          </div>
          <p>
            Recuerda estar al pendiente de tu correo en donde estaremos
            informándote de los pasos a seguir.
          </p>
          {dataProfile.idUserType === 3 && (
            <p>
              Si aún no has ingresado la información de tu cuenta puedes hacerlo
              dando clic <a href="/websystem/profile">aquí</a>.
            </p>
          )}
          <div
            className="button-action"
            style={{
              marginTop: "2em",
            }}
          >
            <ButtonsModal
              primary
              onClick={() => {
                if (selectAssociation === "3") {
                  window.location.href = "/websystem/dashboard-properties";
                } else {
                  window.location.href = `/websystem/detail-property-users/${newInfoProperty.idProperty}`;
                }
                setVisibleModal(false);
                // getById();
              }}
            >
              Cerrar
            </ButtonsModal>
          </div>
        </FormModal>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionAssociationProperty);
