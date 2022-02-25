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
  } = props;
  const initialForm = {
    isPublished: false,
    title: null,
    description: null,
    sites: [],
  };
  const [finishInvitation, setFinishInvitation] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
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
      arraySites.push({
        idSite: element.id,
        isPublished: element.isPublished,
      });
    });
    setStatesPlatformSelect(objectStates);
    setDataForm({
      title: title.toUpperCase(),
      description: description.toUpperCase(),
      sites: arraySites,
    });
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
        arraySites.push({
          idSite: element.id,
          isPublished: element.isPublished,
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
          {finishInvitation === false && (
            <>
              <h1>Pública tu inmueble</h1>
              <p>
                Tu inmueble será publicado en las plataformas que elijas con la
                información que ingreses en los siguientes campos
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
                      <label className="input-checkbox">
                        <input
                          type="checkbox"
                          id={`check-sites-${row.id}`}
                          value={`value-sites-${row.id}`}
                          checked={statesPlatformSelect[row.id]}
                          onChange={(e) => {
                            const objectAdd = dataForm.sites.find((rowFind) => {
                              return rowFind.idSite === row.id;
                            });
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
                        <img height="30" src={row.source} alt="" />
                      </label>
                    );
                  })}
              </div>
              <div className="button-action">
                <button>Suscribirme</button>
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      if (
                        isEmpty(detailPublicProperty) === true &&
                        dataForm.isPublished == false
                      ) {
                        return false;
                      }
                      setIsLoadApi(true);
                      const validData = await handlerCallValidateClassified(
                        dataDetail
                      );
                      if (validData.canPublish === true) {
                        await onPublicProperty({
                          ...dataForm,
                          sites: JSON.stringify(dataForm.sites),
                        });
                        setDataForm(initialForm);
                        setFinishInvitation(true);
                      } else {
                      }
                      setIsLoadApi(false);
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  {dataForm.isPublished === true ||
                  isEmpty(detailPublicProperty) === true
                    ? "Publicar"
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
                }}
              >
                <img
                  height="30"
                  src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.jpg"
                  alt=""
                />
              </div>
              <div className="button-action">
                <ButtonsModal
                  onClick={() => {
                    onClose();
                    setFinishInvitation(false);
                  }}
                  primary
                >
                  Cerrar
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
