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
  .contain-carousel {
    display: flex;
    justify-content: center;
    gap: 2em;
    .carousel-x {
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

const ButtonCarousel = styled.button`
  background: transparent;
  border: none;
`;

const ShortDetail = styled.div`
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
          <img className="preview-carousel" src={currentImage} alt="imagen" />
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
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "6em",
              color: "#9295AD",
              fontSize: "1em",
            }}
          >
            {identifier}
          </div>
        </div>
        <LineSeparator opacity="0.3" />
        <div className="info-data-property">
          <div className="item-description">
            <span>Tipo de propiedad</span>
            <strong>{propertyType}</strong>
          </div>
          <div className="item-description">
            <span>Precio Renta</span>
            <strong>{currentRentFormat}</strong>
          </div>
          <div className="item-description">
            <span>Mantenimiento Mensual</span>
            <strong>{manitenanceAmountFormat}</strong>
          </div>
          <div className="item-description">
            <span>Precio Basado en</span>
            <strong>{priceBasedBy}</strong>
          </div>
        </div>
      </ShortDetail>
    </ContainerUp>
  );
};

export default SectionCarouselInfo;
