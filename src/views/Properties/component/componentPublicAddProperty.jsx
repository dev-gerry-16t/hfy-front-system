import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomTextArea from "../../../components/customTextArea";
import { ReactComponent as IconStyleCheck } from "../../../assets/iconSvg/svgFile/iconStyleCheck.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";

const ComponentPublicAddProperty = (props) => {
  const {
    isModalVisible,
    onClose,
    onPublicProperty,
    detailPublicProperty,
    dataDetail = {},
  } = props;
  const initialForm = {
    isPublished: false,
    title: null,
    description: null,
  };
  const [finishInvitation, setFinishInvitation] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataForm, setDataForm] = useState(initialForm);

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

  const handlerDefaultTitleDescription = (data) => {
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
    setDataForm({
      title: title.toUpperCase(),
      description: description.toUpperCase(),
      idApartment: data.idApartment,
      identifier: data.identifier,
    });
  };

  useEffect(() => {
    if (isEmpty(detailPublicProperty) === false) {
      setDataForm({
        isPublished: detailPublicProperty.isPublished,
        title: detailPublicProperty.title,
        description: detailPublicProperty.description,
      });
    } else {
      if (
        isEmpty(detailPublicProperty.title) === true &&
        isEmpty(detailPublicProperty.description) === true &&
        isEmpty(dataDetail) === false
      ) {
        handlerDefaultTitleDescription(dataDetail);
      }
    }
  }, [detailPublicProperty, dataDetail]);

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
                <label className="input-checkbox">
                  <input
                    type="checkbox"
                    id="cbox1"
                    value="first_checkbox"
                    checked={dataForm.isPublished === true}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        isPublished: e.target.checked,
                      });
                    }}
                  />{" "}
                  <img
                    height="30"
                    src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.jpg"
                    alt=""
                  />
                </label>
              </div>
              <div className="button-action">
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      if (dataForm.isPublished == true) {
                        setIsLoadApi(true);
                        await onPublicProperty(dataForm, dataDetail.idProperty);
                        setDataForm(initialForm);
                        setFinishInvitation(true);
                        setIsLoadApi(false);
                      }
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  Publicar inmueble
                </ButtonsModal>
                <ButtonsModal
                  onClick={() => {
                    onClose();
                  }}
                >
                  Mantener privado
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
              <h2>¡El inmueble ha sido publicado!</h2>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                Ahora podrás ver tu inmueble publicado en las siguientes
                plataformas
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

export default ComponentPublicAddProperty;
