import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBid,
} from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";

const ContainerUp = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: center;
  gap: 2em;
  position: relative;
  padding: 0px 1em;
  font-size: 16px;
  .contain-carousel {
    display: flex;
    justify-content: center;
    gap: 2em;
    .carousel-x {
      width: 100%;
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
    .preview-carousel-img {
      width: 36.125em;
      height: 24.625em;
      border-radius: 0.5em;
      object-fit: cover;
      margin-bottom: 0.5em;
    }
  }
  @media screen and (max-width: 1500px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1150px) {
    .contain-carousel {
      .carousel-x {
        .preview-carousel-img {
          width: 100%;
        }
        .slide-carousel {
          width: 100%;
          .slide-images {
            .preview-carousel {
              width: 6.75em;
            }
            .select {
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    padding: 0px 0px;
    .contain-carousel {
      padding: 0px 5px;
      .carousel-x {
        .preview-carousel-img {
          /* width: 100%; */
        }
        .slide-carousel {
          .slide-images {
            .preview-carousel {
            }
            .select {
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
    .contain-carousel {
      .carousel-x {
        width: 100%;
        .preview-carousel-img {
          /* width: 100%; */
        }
        .slide-carousel {
          width: 100%;
          .slide-images {
            .preview-carousel {
            }
            .select {
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 360px) {
    .contain-carousel {
      .carousel-x {
        .preview-carousel-img {
          /* width: 100%; */
          height: 200px;
        }
        .slide-carousel {
          width: 100%;
          .slide-images {
            .preview-carousel {
            }
            .select {
            }
          }
        }
      }
    }
  }
`;

const ButtonCarousel = styled.button`
  background: transparent;
  border: none;
`;

const ShortDetail = styled.div`
  padding: 0px 10px;
  .header-title-short {
    position: relative;
    h1 {
      font-size: 1.3em;
      font-weight: 600;
      max-width: 14em;
    }
    .identifier-property {
      color: #9295ad;
      font-size: 1em;
    }
  }

  .info-data-property {
    display: flex;
    flex-direction: column;
    height: 55%;
    justify-content: space-between;
    .item-description {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const ButtonBid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 5em;
  background: var(--color-primary);
  border-radius: 0.5em 0 0 0.5em;
  cursor: pointer;
  padding: 0.5em;
  span {
    margin-left: 10px;
    display: none;
    color: #fff;
    text-decoration-line: underline;
  }
  &:hover {
    span {
      display: block;
    }
  }
`;

const catalogPrice = [
  { id: "1", text: "Valor total" },
  { id: "2", text: "por m²" },
  { id: "3", text: "por ha" },
];

const SectionCarouselInfo = (props) => {
  const { apartmentImages } = props;
  const [currentImage, setCurrentImage] = useState(
    "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png"
  );
  const [currentSelectImage, setCurrentSelectImage] = useState(null);
  const [numberOfImages, setNumberOfImages] = useState(null);
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail } = dataContexProperty;

  const {
    currentRentFormat,
    identifier,
    propertyType,
    shortAddress,
    manitenanceAmountFormat,
    priceBasedBy,
    idOperationType,
  } = dataDetail;

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

  useEffect(() => {
    if (isEmpty(apartmentImages) === false) {
      const imageDefault = apartmentImages.find((row, ix) => {
        if (row.isMain === true) {
          setCurrentSelectImage(ix);
        }
        return row.isMain === true;
      });
      if (isNil(imageDefault) === false && isNil(imageDefault.url) === false) {
        setCurrentImage(imageDefault.url);
        setNumberOfImages(apartmentImages.length - 1);
      }
    }
  }, [apartmentImages]);

  return (
    <ContainerUp>
      <div className="contain-carousel">
        <div className="carousel-x">
          <img
            className="preview-carousel-img"
            src={currentImage}
            alt="imagen"
          />
          <div className="slide-carousel">
            <ButtonCarousel
              onClick={() => {
                if (1 <= currentSelectImage) {
                  const imageSelect = apartmentImages[currentSelectImage - 1];
                  const scrollWidth = document.getElementById(
                    "container-carousel-img"
                  );
                  scrollWidth.scrollTo(currentSelectImage - 100, 0);
                  setCurrentImage(imageSelect.url);
                  setCurrentSelectImage(currentSelectImage - 1);
                }
              }}
            >
              <IconChevronLeft color="#4E4B66" />
            </ButtonCarousel>
            <div className="slide-images" id="container-carousel-img">
              {isEmpty(apartmentImages) === false &&
                apartmentImages.map((row, ix) => {
                  return (
                    <img
                      id={`id-image-carousel-${ix}`}
                      loading="lazy"
                      className={`preview-carousel ${
                        ix === currentSelectImage ? "select" : ""
                      }`}
                      src={row.url}
                      alt="imagen"
                      onClick={() => {
                        setCurrentImage(row.url);
                        setCurrentSelectImage(ix);
                      }}
                    />
                  );
                })}
            </div>
            <ButtonCarousel
              onClick={() => {
                if (numberOfImages > currentSelectImage) {
                  const imageSelect = apartmentImages[currentSelectImage + 1];
                  const scrollWidth = document.getElementById(
                    "container-carousel-img"
                  );
                  scrollWidth.scrollTo(currentSelectImage + 100, 0);
                  setCurrentImage(imageSelect.url);
                  setCurrentSelectImage(currentSelectImage + 1);
                }
              }}
            >
              <IconChevronRight color="#4E4B66" />
            </ButtonCarousel>
          </div>
        </div>
      </div>
      <ShortDetail>
        <div className="header-title-short">
          <h1>{handlerLimitText(shortAddress)}</h1>
          <div className="identifier-property">{identifier}</div>
        </div>
        <LineSeparator opacity="0.3" />
        <div className="info-data-property">
          <div className="item-description">
            <span>Tipo de propiedad</span>
            <strong>{propertyType}</strong>
          </div>
          <div className="item-description">
            <span>Precio {idOperationType === 1 ? "Renta" : "Venta"}</span>
            <strong>{currentRentFormat}</strong>
          </div>
          <div className="item-description">
            <span>Mantenimiento Mensual</span>
            <strong>{manitenanceAmountFormat}</strong>
          </div>
          <div className="item-description">
            <span>Precio Basado en</span>
            <strong>{handlerSelectCatalog(priceBasedBy)}</strong>
          </div>
        </div>
      </ShortDetail>
    </ContainerUp>
  );
};

export default SectionCarouselInfo;
