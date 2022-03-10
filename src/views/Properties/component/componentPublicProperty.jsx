import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomTextArea from "../../../components/customTextArea";
import { ReactComponent as IconStyleCheck } from "../../../assets/iconSvg/svgFile/iconStyleCheck.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const ImgPlatform = styled.img`
  filter: ${(props) =>
    props.requiresSubscription === true ? "grayscale(100%)" : "grayscale(0%)"};
`;

const SectionRequired = styled.div`
  border: 1px solid var(--color-primary);
  border-radius: 16px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  .info-required {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
`;

const ComponentPublicProperty = (props) => {
  const {
    isModalVisible,
    onClose,
    onPublicProperty,
    detailPublicProperty,
    dataSites = [],
    dataDetail = {},
    dataProfile,
    callGlobalActionApi,
    history,
  } = props;
  const initialForm = {
    isPublished: false,
    title: null,
    description: null,
    sites: [],
  };

  const [finishInvitation, setFinishInvitation] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [isVisibleSuscription, setIsVisibleSuscription] = useState(false);
  const [isVisibleDataRequired, setIsVisibleDataRequired] = useState(false);
  const [dataRequired, setDataRequired] = useState({});
  const [dataForm, setDataForm] = useState(initialForm);
  const [statesPlatformSelect, setStatesPlatformSelect] = useState({});
  const frontFunctions = new FrontFunctions();

  const handlerLimitText = (text) => {
    let textTransform = "";
    if (isNil(text) === false && isEmpty(text) === false) {
      const splitText = text.split(",");
      if (splitText.length >= 2) {
        textTransform = `${splitText[0]}`;
      }
    }
    return textTransform;
  };

  const handlerCallValidateClassified = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idProperty: data.idProperty,
          idApartment: data.idApartment,
        },
        null,
        API_CONSTANTS.PROPERTY.VALIDATE_CLASSIFIED
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerDefaultTitleDescription = (data, data1) => {
    let title = "";
    let description = "";
    const amenities =
      isEmpty(data.propertyAmenities) === false
        ? JSON.parse(data.propertyAmenities)
        : [];

    const characteristics =
      isEmpty(data.propertyGeneralCharacteristics) === false
        ? JSON.parse(data.propertyGeneralCharacteristics)
        : [];

    if (isEmpty(data.operationType) === false) {
      title = `${data.propertyType} en ${
        data.operationType
      } en ${handlerLimitText(data.shortAddress)}`;
      description = `Bonit@ ${data.propertyType} en ${
        data.operationType
      } en ${handlerLimitText(data.shortAddress)}`;
    }
    if (isEmpty(amenities) === false) {
      description = `${description}
con ${isNil(amenities[0]) === false ? amenities[0].text : ""}

caracteristicas:`;
    }
    if (isNil(data.isFurnished) === false && data.isFurnished == true) {
      description = `${description}
- Amueblado`;
    }
    if (isNil(data.totalSquareMetersBuilt) === false) {
      description = `${description}
- ${data.totalSquareMetersBuilt} m² de construcción`;
    }
    if (isNil(data.totalSquareMetersLand) === false) {
      description = `${description}
- ${data.totalSquareMetersLand} m² de terreno`;
    }
    if (isNil(data.totalBedrooms) === false) {
      description = `${description}
- ${data.totalBedrooms} recámaras`;
    }
    if (isNil(data.totalBathrooms) === false) {
      description = `${description}
- ${data.totalBathrooms} baños completos`;
    }
    if (isNil(data.totalParkingSpots) === false) {
      description = `${description}
- ${data.totalParkingSpots} lugares de estacionamiento`;
    }
    if (isEmpty(characteristics) === false) {
      for (const element of characteristics) {
        description = `${description}
- ${element.text}`;
      }
    }

    if (isEmpty(amenities) === false) {
      description = `${description}

Amenidades:`;
      for (const element of amenities) {
        description = `${description}
- ${element.text}`;
      }
    }

    const arraySites = [];
    const objectStates = {};

    data1.forEach((element) => {
      objectStates[element.id] = element.isPublished;
      if (element.requiresSubscription === true) {
        setIsVisibleSuscription(true);
      }
      arraySites.push({
        idSite: element.id,
        isPublished: element.isPublished,
        url: element.path,
        src: element.source,
      });
    });
    setStatesPlatformSelect(objectStates);
    setDataForm({
      title: title.toUpperCase(),
      description: description.toUpperCase(),
      sites: arraySites,
    });
  };

  const handlerOnPublicProperty = async () => {
    try {
      if (
        isEmpty(detailPublicProperty) === true &&
        dataForm.isPublished == false
      ) {
        return false;
      }
      setIsLoadApi(true);
      const validData = await handlerCallValidateClassified(dataDetail);
      if (
        isEmpty(validData.attributesRequired) === true ||
        isNil(validData.attributesRequired) === true
      ) {
        if (validData.hasSubscription === true) {
          await onPublicProperty(
            {
              ...dataForm,
              idApartment: dataDetail.idApartment,
              sites: JSON.stringify(dataForm.sites),
            },
            dataDetail.idProperty
          );
          setFinishInvitation(true);
          setIsVisibleSuscription(false);
        } else {
          setIsVisibleSuscription(true);
        }
      } else {
        const parseAttributesRequired = JSON.parse(
          validData.attributesRequired
        );
        setIsVisibleDataRequired(true);
        setDataRequired({
          ...validData,
          attributesRequired: parseAttributesRequired,
        });
      }

      setIsLoadApi(false);
    } catch (error) {
      setIsLoadApi(false);
    }
  };

  useEffect(() => {
    if (
      isEmpty(detailPublicProperty) === false &&
      isEmpty(dataSites) === false
    ) {
      const arraySites = [];
      const objectStates = {};

      dataSites.forEach((element) => {
        objectStates[element.id] = element.isPublished;
        if (element.requiresSubscription === true) {
          setIsVisibleSuscription(true);
        }
        arraySites.push({
          idSite: element.id,
          isPublished: element.isPublished,
          url: element.path,
          src: element.source,
        });
      });
      setStatesPlatformSelect(objectStates);
      setDataForm({
        isPublished: detailPublicProperty.isPublished,
        title: detailPublicProperty.title,
        description: detailPublicProperty.description,
        sites: arraySites,
      });
    } else {
      if (
        isEmpty(detailPublicProperty.title) === true &&
        isEmpty(detailPublicProperty.description) === true &&
        isEmpty(dataDetail) === false &&
        isEmpty(dataSites) === false
      ) {
        handlerDefaultTitleDescription(dataDetail, dataSites);
      }
    }
  }, [detailPublicProperty, dataDetail, dataSites]);

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <FormModal>
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          {isVisibleDataRequired === false && (
            <>
              {finishInvitation === false && (
                <>
                  <h1>Pública tu inmueble</h1>
                  <p>
                    Tu inmueble será publicado en las plataformas que elijas con
                    la información que ingreses en los siguientes campos
                  </p>
                  <div>
                    <Row>
                      <Col span={24}>
                        <CustomInputTypeForm
                          value={dataForm.title}
                          placeholder=""
                          label="Titulo del anuncio"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              title: value,
                            });
                          }}
                          type="text"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <CustomTextArea
                          value={dataForm.description}
                          placeholder=""
                          label="Descripción"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              description: value,
                            });
                          }}
                          type="text"
                          height="200px"
                        />
                      </Col>
                    </Row>
                  </div>
                  <p>Selecciona una opción</p>
                  <div className="image-platforms">
                    {isEmpty(dataSites) === false &&
                      dataSites.map((row) => {
                        return (
                          <label
                            className="input-checkbox"
                            style={{
                              position: "relative",
                            }}
                          >
                            {row.requiresSubscription === false && (
                              <div className="limit-to-public">
                                <span>{row.limit}</span>
                              </div>
                            )}
                            {row.requiresSubscription === true && (
                              <div className="pay-publication">
                                <button>Pagar publicación</button>
                              </div>
                            )}
                            <input
                              type="checkbox"
                              disabled={row.requiresSubscription}
                              id={`check-sites-${row.id}`}
                              value={`value-sites-${row.id}`}
                              checked={statesPlatformSelect[row.id]}
                              onChange={(e) => {
                                const objectAdd = dataForm.sites.find(
                                  (rowFind) => {
                                    return rowFind.idSite === row.id;
                                  }
                                );
                                const arrayFilter = dataForm.sites.filter(
                                  (rowFilter) => {
                                    return rowFilter.idSite != row.id;
                                  }
                                );
                                objectAdd.isPublished = e.target.checked;
                                setStatesPlatformSelect({
                                  ...statesPlatformSelect,
                                  [row.id]: e.target.checked,
                                });
                                arrayFilter.push(objectAdd);
                                setDataForm({
                                  ...dataForm,
                                  sites: arrayFilter,
                                });
                              }}
                            />{" "}
                            <ImgPlatform
                              requiresSubscription={row.requiresSubscription}
                              height="30"
                              src={row.source}
                              alt=""
                            />
                          </label>
                        );
                      })}
                  </div>
                  {isVisibleSuscription === true && (
                    <div className="button-action-subscription">
                      <p>
                        **Agotaste las publicaciones en algunas plataformas, si
                        quieres continuar publicando haz clic en suscribirme
                      </p>
                      <button
                        onClick={() => {
                          window.open("/websystem/subscription", "_blank");
                        }}
                      >
                        Suscribirme
                      </button>
                    </div>
                  )}
                  <div className="button-action">
                    <ButtonsModal primary onClick={handlerOnPublicProperty}>
                      {dataForm.isPublished === true ||
                      isEmpty(detailPublicProperty) === true
                        ? "Publicar inmueble"
                        : "Quitar publicación"}
                    </ButtonsModal>
                    <ButtonsModal
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Cancelar
                    </ButtonsModal>
                  </div>
                </>
              )}
              {finishInvitation === true && (
                <>
                  <h1>¡Todo está listo!</h1>
                  <div className="icon-image-send">
                    <IconStyleCheck />
                  </div>
                  <h2>
                    {isEmpty(detailPublicProperty) === false &&
                    dataForm.isPublished === false
                      ? "Se retiró la publicación"
                      : "¡El inmueble ha sido publicado!"}
                  </h2>
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {isEmpty(detailPublicProperty) === false &&
                    dataForm.isPublished === false
                      ? "Ahora tu inmueble se encuentra privado, esperamos pronto lo publiques para recibir prospectos"
                      : " Ahora podrás ver tu inmueble publicado en las siguientes plataformas"}
                  </p>
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "25px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    {isEmpty(dataForm.sites) === false &&
                      dataForm.sites.map((row) => {
                        return row.isPublished === true ? (
                          <img
                            style={{
                              cursor: "pointer",
                            }}
                            height="30"
                            src={row.src}
                            alt=""
                            onClick={() => {
                              window.open(row.url, "_blank");
                            }}
                          />
                        ) : (
                          <></>
                        );
                      })}
                  </div>
                  <div className="button-action">
                    <ButtonsModal
                      onClick={() => {
                        onClose();
                        setIsVisibleDataRequired(false);
                        setFinishInvitation(false);
                        setDataForm(initialForm);
                      }}
                      primary
                    >
                      Cerrar
                    </ButtonsModal>
                  </div>
                </>
              )}
            </>
          )}
          {isVisibleDataRequired === true && (
            <>
              <h1>¡Información incompleta!</h1>
              <SectionRequired>
                {isEmpty(dataRequired) === false &&
                  isEmpty(dataRequired.attributesRequired) === false &&
                  dataRequired.attributesRequired.map((row) => {
                    return (
                      <div className="info-required">
                        <span>{row.label}</span>
                        <u
                          onClick={() => {
                            history.push(
                              `/websystem/edit-property/${dataDetail.idProperty}`
                            );
                          }}
                        >
                          Completar
                        </u>
                      </div>
                    );
                  })}
                {dataRequired.isPropertyTypeValid === false && (
                  <div className="info-required">
                    <span>El tipo de propiedad no es valido</span>
                    <u
                      onClick={() => {
                        history.push(
                          `/websystem/edit-property/${dataDetail.idProperty}`
                        );
                      }}
                    >
                      Cambiar
                    </u>
                  </div>
                )}
                {dataRequired.isCurrencyValid === false && (
                  <div className="info-required">
                    <span>El tipo de moneda es invalido</span>
                    <u
                      onClick={() => {
                        history.push(
                          `/websystem/edit-property/${dataDetail.idProperty}`
                        );
                      }}
                    >
                      Cambiar
                    </u>
                  </div>
                )}
                {dataRequired.isSellerContactValid === false && (
                  <div className="info-required">
                    <span>Información de contacto incompleta</span>
                    <u
                      onClick={() => {
                        history.push(`/websystem/edit-profile`);
                      }}
                    >
                      Completar
                    </u>
                  </div>
                )}
                {dataRequired.hasSubscription === false && (
                  <div className="info-required">
                    <span>No tienes una suscripción activa</span>
                    <u
                      onClick={() => {
                        history.push(`/websystem/subscription`);
                      }}
                    >
                      Activar
                    </u>
                  </div>
                )}
                {dataRequired.hasPromotionPackage === false && (
                  <div className="info-required">
                    <span>En las próximas horas se publicara tu inmueble</span>
                  </div>
                )}
              </SectionRequired>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <span>{dataRequired.message}</span>
              </div>
              <div className="button-action">
                <ButtonsModal
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancelar
                </ButtonsModal>
              </div>
            </>
          )}
        </ComponentLoadSection>
      </FormModal>
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
)(ComponentPublicProperty);
