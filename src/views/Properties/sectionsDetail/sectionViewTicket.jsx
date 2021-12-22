import React, { useContext, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
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
import { LineSeparator } from "../constants/styleConstants";
import {
  IconBathroom,
  IconBed,
  IconCar,
  IconHalfBathroom,
} from "../../../assets/iconSvg";
import ComponentLoadSection from "../../../components/componentLoadSection";

const SectionGalery = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .image-content {
    width: 150px;
    height: 100px;
    border-radius: 0.5em;
    object-fit: cover;
    border: 2px solid #a0a3bd;
  }
`;

const ContentAmenities = styled.div`
  .container-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .border-1 {
      border-bottom: 0.5px solid #e5e5e5;
      border-right: 0.5px solid #e5e5e5;
    }
    .border-2 {
      border-bottom: 0.5px solid #e5e5e5;
    }
    .section-chips {
      padding: 0.5em;
      .chips {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.3em;
        font-size: 12px;
      }
    }
  }
  .bottom-chips {
    padding: 1em;
    display: flex;
    .chips {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 0.5em;
    }
  }
`;

const Chip = styled.span`
  border: 1px solid #d6d8e7;
  border-radius: 5px;
  color: #4e4b66;
  font-size: 1em;
  padding: 0.3em;
`;

const Title = styled.h2`
  font-size: 1em;
  font-weight: 700;
  color: var(--color-primary);
  text-align: left !important;
`;

const Location = styled.div`
  border: 1px solid #d6d8e7;
  border-radius: 0.5em;
  width: 31em;
  height: 21em;
`;

const ContentLocation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .location-map {
    width: 31em;
    height: 21em;
    display: flex;
    position: relative;
  }
`;

const ContentAddress = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  .content-address {
    width: 21.8em;
    font-size: 14px;
    h1 {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 1.17em;
      text-align: left;
    }
  }
`;

const ContainerUp = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
  display: flex;
  justify-content: space-around;
  gap: 2em;
  position: relative;
  .contain-carousel {
    display: flex;
    justify-content: center;
    gap: 2em;
    .carousel-x {
      position: relative;
      .slide-carousel {
        display: flex;
        justify-content: space-between;
        width: 36.125em;
        .slide-images {
          flex-wrap: nowrap;
          gap: 0.5em;
          overflow-x: scroll;
          display: flex;
          ::-webkit-scrollbar {
            display: none;
          }
          .preview-carousel {
            width: 6.75em;
            height: 4.68em;
            border-radius: 0.5em;
            object-fit: cover;
          }
          .select {
            box-shadow: 0px 0px 5px 5px rgba(255, 0, 131, 0.4);
          }
        }
      }
    }
    .preview-carousel {
      width: 36.125em;
      height: 24.625em;
      border-radius: 0.5em;
      object-fit: cover;
      margin-bottom: 0.5em;
    }
  }
`;

const ShortDetail = styled.div`
  width: 350px;
  .header-title-short {
    position: relative;
    h1 {
      font-size: 2em;
      font-weight: 600;
      max-width: 14em;
    }
  }

  .info-data-property {
    display: flex;
    flex-direction: column;
    height: 55%;
    justify-content: space-between;
    font-size: 14px;
    .item-description {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const TabsProperty = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Tab = styled.div`
  line-height: 5px;
  cursor: pointer;
  h1 {
    font-weight: bold;
    color: ${(props) =>
      props.selected === true ? "var(--color-primary)" : "#4e4b66"};
  }
  hr {
    width: 30%;
    background: #d6d8e7;
    margin: 0;
    border: 2px solid var(--color-primary);
    display: ${(props) => (props.selected === true ? "block" : "none")};
  }
`;

const CardAmenity = styled.div`
  display: flex;
  background: #fff;
  padding: 0.8em;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 1em;
  .circle-content {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.3em;
      height: 3.3em;
      border-radius: 50%;
      background: var(--color-primary);
    }
  }
  .info-amenity {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin: 0;
    }
    span {
      font-size: 12px;
    }
  }
`;

const ContentFeatures = styled.div`
  display: flex;
  flex-direction: column;
  .container-features {
    display: flex;
    justify-content: space-between;
  }
  hr {
    border: 0.5px solid #e5e5e5;
    opacity: 0.3;
    width: 100%;
    margin: 2em 0px;
  }
  .container-cards {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    .card-content {
      padding: 0.7em;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 1em;
      span {
        font-weight: bold;
        color: var(--color-primary);
      }
      label {
        color: #4e4b66;
        font-size: 0.9em;
      }
    }
  }
`;

const catalogPrice = [
  { id: "1", text: "Valor total" },
  { id: "2", text: "por m²" },
  { id: "3", text: "por ha" },
];
const imageLogo =
  "data:image/jpeg;base64,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";

const SectionViewTicket = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    history,
    onClose,
    isVisibleModal,
    dataTicket,
  } = props;
  const [dataDetail, setDataDetail] = useState({});
  const [isLoadApi, setIsLoadApi] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyById = async (id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty: id,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      const parseDocument =
        isEmpty(responseResult) === false &&
        isNil(responseResult.apartmentDocuments) === false
          ? JSON.parse(responseResult.apartmentDocuments)
          : [];
      setDataDetail({ ...responseResult, apartmentDocuments: parseDocument });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerLimitText = (text) => {
    let textTransform = "";
    if (isNil(text) === false && isEmpty(text) === false) {
      const splitText = text.split(",");
      if (splitText.length >= 2) {
        textTransform = `${splitText[0]}, ${splitText[1]}`;
      }
    }
    return textTransform;
  };

  const handlerSelectCatalog = (id) => {
    let result = null;
    const find = catalogPrice.find((row) => {
      return row.id == id;
    });
    if (isNil(find) === false) {
      result = find.text;
    }
    return result;
  };

  const handlerOnClick = async (name) => {
    setIsLoadApi(true);
    var opt = {
      image: { type: "png", quality: 1 },
      filename: name,
      margin: 1,
      html2canvas: {
        dpi: 300,
        letterRendering: false,
        useCORS: true,
        scale: 2,
      },
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };
    try {
      var element = document.getElementById("section-print-pdf");
      var worker = await html2pdf().from(element).set(opt).save();
      setIsLoadApi(false);
    } catch (error) {
      setIsLoadApi(false);
    }
  };

  const GMapCircle = (lat, lng, rad, key, detail = 8) => {
    var uri = "https://maps.googleapis.com/maps/api/staticmap?";
    var staticMapSrc = "center=" + lat + "," + lng;
    staticMapSrc += "&size=310x210";
    staticMapSrc += "&zoom=14";
    staticMapSrc += "&path=color:0xFF0282|fillcolor:0xFF028260|weight:1";
    var r = 6371;

    var pi = Math.PI;

    var _lat = (lat * pi) / 180;
    var _lng = (lng * pi) / 180;
    var d = rad / 1000 / r;

    var i = 0;

    for (i = 0; i <= 360; i += detail) {
      var brng = (i * pi) / 180;

      var pLat = Math.asin(
        Math.sin(_lat) * Math.cos(d) +
          Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
      );
      var pLng =
        ((_lng +
          Math.atan2(
            Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
            Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
          )) *
          180) /
        pi;
      pLat = (pLat * 180) / pi;

      staticMapSrc += "|" + pLat + "," + pLng;
    }

    return uri + encodeURI(staticMapSrc) + `&key=${key}`;
  };

  useEffect(() => {
    if (isEmpty(dataTicket) === false) {
      handlerCallGetPropertyById(dataTicket.idProperty);
    }
  }, [dataTicket]);

  return (
    <Modal
      visible={isVisibleModal}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={1000}
      onCancel={() => {
        onClose();
      }}
    >
      <FormModal>
        <ComponentLoadSection text="Descargando..." isLoadApi={isLoadApi}>
          <h1>Esta es tu ficha de la propiedad </h1>
          <p>
            Puedes descargarla para compartirla con otros asesores o usuarios.
          </p>
          <div className="view-ticket-property">
            <div
              id="section-print-pdf"
              style={{
                fontSize: "10px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 50px",
                }}
              >
                <h1
                  style={{
                    fontWeight: "700",
                    margin: "0px",
                    textAlign: "left",
                  }}
                >
                  {handlerLimitText(dataDetail.shortAddress)}
                </h1>
                <img src={imageLogo} alt="homify" />
              </div>
              <ContainerUp>
                <div className="contain-carousel">
                  <div className="carousel-x">
                    <img
                      className="preview-carousel"
                      src={dataTicket.documentMainPic}
                      alt="imagen"
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: "-2em",
                        color: "#9295AD",
                        fontSize: "1em",
                      }}
                    >
                      {dataTicket.identifier}
                    </div>
                  </div>
                </div>
                <ShortDetail>
                  <div className="header-title-short">
                    <h1>Datos de propiedad</h1>
                  </div>
                  <LineSeparator opacity="0.3" />
                  <div className="info-data-property">
                    <div className="item-description">
                      <span>Tipo de propiedad</span>
                      <strong>{dataDetail.propertyType}</strong>
                    </div>
                    <div className="item-description">
                      <span>Precio Renta</span>
                      <strong>{dataDetail.currentRentFormat}</strong>
                    </div>
                    <div className="item-description">
                      <span>Mantenimiento Mensual</span>
                      <strong>{dataDetail.manitenanceAmountFormat}</strong>
                    </div>
                    <div className="item-description">
                      <span>Precio Basado en</span>
                      <strong>
                        {handlerSelectCatalog(dataDetail.priceBasedBy)}
                      </strong>
                    </div>
                  </div>
                </ShortDetail>
              </ContainerUp>
              <LineSeparator opacity="0.3" />
              <div
                style={{
                  padding: "0px 3em",
                }}
              >
                <TabsProperty>
                  <Tab selected>
                    <h1>Características</h1>
                    <hr />
                  </Tab>
                </TabsProperty>
                <ContentFeatures>
                  <div className={`container-features`}>
                    <CardAmenity>
                      <div className="circle-content">
                        <div>
                          <IconBed size="25" color="#fff" backGround="#fff" />
                        </div>
                      </div>
                      <div className="info-amenity">
                        <h1>{dataDetail.totalBedrooms}</h1>
                        <span>Recámaras</span>
                      </div>
                    </CardAmenity>
                    <CardAmenity>
                      <div className="circle-content">
                        <div>
                          <IconBathroom
                            size="25"
                            color="#fff"
                            backGround="#fff"
                          />
                        </div>
                      </div>
                      <div className="info-amenity">
                        <h1>{dataDetail.totalBathrooms}</h1>
                        <span>Baños</span>
                      </div>
                    </CardAmenity>
                    <CardAmenity>
                      <div className="circle-content">
                        <div>
                          <IconHalfBathroom
                            size="25"
                            color="#fff"
                            backGround="#fff"
                          />
                        </div>
                      </div>
                      <div className="info-amenity">
                        <h1>{dataDetail.totalHalfBathrooms}</h1>
                        <span>Medios Baños</span>
                      </div>
                    </CardAmenity>
                    <CardAmenity>
                      <div className="circle-content">
                        <div>
                          <IconCar size="25" color="#fff" backGround="#fff" />
                        </div>
                      </div>
                      <div className="info-amenity">
                        <h1>{dataDetail.totalParkingSpots}</h1>
                        <span>Estacionamiento</span>
                      </div>
                    </CardAmenity>
                  </div>
                  <hr />
                  <div className="container-cards">
                    <div className="card-content">
                      <span>{dataDetail.totalSquareMetersBuilt} m²</span>
                      <label htmlFor="">De construcción</label>
                    </div>
                    <div className="card-content">
                      <span>{dataDetail.totalSquareMetersLand} m²</span>
                      <label htmlFor="">De Terreno</label>
                    </div>
                    <div className="card-content">
                      <span>{dataDetail.totalFloors}</span>
                      <label htmlFor="">Cantidad de pisos</label>
                    </div>
                    <div className="card-content">
                      <span>{dataDetail.floorDescription}</span>
                      <label htmlFor="">Piso en el que se encuentra</label>
                    </div>
                  </div>
                </ContentFeatures>
              </div>
              <LineSeparator opacity="0.3" />
              <div
                style={{
                  padding: "0px 3em",
                }}
              >
                <TabsProperty>
                  <Tab selected>
                    <h1>Ubicación</h1>
                    <hr />
                  </Tab>
                </TabsProperty>
                <ContentLocation>
                  <div className="location-map">
                    <Location>
                      {isNil(dataDetail.jsonCoordinates) === false &&
                        isEmpty(dataDetail.jsonCoordinates) === false && (
                          <>
                            {dataDetail.isGMapsExact === true ? (
                              <img
                                src={`https://maps.googleapis.com/maps/api/staticmap?size=310x210&center=${
                                  JSON.parse(dataDetail.jsonCoordinates).lat
                                },${
                                  JSON.parse(dataDetail.jsonCoordinates).lng
                                }&zoom=14&markers=icon:https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296Q.png%7C${
                                  JSON.parse(dataDetail.jsonCoordinates).lat
                                },
                         ${
                           JSON.parse(dataDetail.jsonCoordinates).lng
                         }&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`}
                                alt="mapa"
                              />
                            ) : (
                              <img
                                src={GMapCircle(
                                  JSON.parse(dataDetail.jsonCoordinates).lat,
                                  JSON.parse(dataDetail.jsonCoordinates).lng,
                                  700,
                                  "AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ"
                                )}
                                alt="mapa"
                              />
                            )}
                          </>
                        )}
                    </Location>
                  </div>
                  <div>
                    <ContentAddress>
                      <div className="content-address">
                        <h1>{handlerLimitText(dataDetail.shortAddress)}</h1>
                        <hr />
                        <div>
                          <span>{dataDetail.fullAddress}</span>
                        </div>
                      </div>
                    </ContentAddress>
                  </div>
                </ContentLocation>
              </div>
              <div class="html2pdf__page-break"></div>
              <LineSeparator opacity="0.3" />
              <div
                style={{
                  padding: "0px 3em",
                }}
              >
                <TabsProperty>
                  <Tab selected>
                    <h1>Amenidades</h1>
                    <hr />
                  </Tab>
                </TabsProperty>
                <ContentAmenities>
                  <div className="container-chips">
                    <div className="section-chips border-1">
                      <Title>AMENIDADES</Title>
                      <div className="chips">
                        {isEmpty(dataDetail.propertyAmenities) === false &&
                          JSON.parse(dataDetail.propertyAmenities).map(
                            (row) => {
                              return <Chip>{row.text}</Chip>;
                            }
                          )}
                      </div>
                    </div>
                    <div className="section-chips border-2">
                      <Title>GENERAL</Title>
                      <div className="chips">
                        {isEmpty(dataDetail.propertyGeneralCharacteristics) ===
                          false &&
                          JSON.parse(
                            dataDetail.propertyGeneralCharacteristics
                          ).map((row) => {
                            return <Chip>{row.text}</Chip>;
                          })}
                      </div>
                    </div>
                  </div>
                </ContentAmenities>
              </div>
              <LineSeparator opacity="0.3" />
              <div
                style={{
                  padding: "0px 3em",
                }}
              >
                <TabsProperty>
                  <Tab selected>
                    <h1>Galeria</h1>
                    <hr />
                  </Tab>
                </TabsProperty>
                <SectionGalery>
                  {isEmpty(dataDetail.apartmentDocuments) === false &&
                    dataDetail.apartmentDocuments.map((row) => {
                      return (
                        <img
                          src={row.url}
                          alt=""
                          srcset=""
                          className="image-content"
                        />
                      );
                    })}
                </SectionGalery>
              </div>
              {/* <LineSeparator opacity="0.3" />
            <div
              style={{
                padding: "0px 3em",
              }}
            >
              <TabsProperty>
                <Tab selected>
                  <h1>Datos de contacto</h1>
                  <hr />
                </Tab>
              </TabsProperty>
            </div> */}
            </div>
          </div>
          <div
            className="button-action"
            style={{
              marginTop: "2em",
            }}
          >
            <ButtonsModal
              primary
              onClick={() => {
                handlerOnClick(dataDetail.identifier);
              }}
            >
              Descargar
            </ButtonsModal>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionViewTicket);
