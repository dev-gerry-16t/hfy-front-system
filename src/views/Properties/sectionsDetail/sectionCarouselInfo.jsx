import React from "react";
import styled from "styled-components";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import {
  IconChevronUp,
  IconChevronDown,
  IconBid,
} from "../../../assets/iconSvg";

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
    .slide-carousel {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 8em;
      height: 100%;
      .slide-images {
        text-align: center;
        overflow-y: scroll;
        max-height: 21em;
        ::-webkit-scrollbar {
          display: none;
        }
        .preview-carousel {
          width: 6.75em;
          height: 4.68em;
          border-radius: 0.5em;
          object-fit: cover;
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

const SectionCarouselInfo = () => {
  return (
    <ContainerUp>
      <ButtonBid>
        <IconBid color="#fff" backGround="#fff" size="36px" />
        <span>Ofertar</span>
      </ButtonBid>
      <div className="contain-carousel">
        <div className="slide-carousel">
          <ButtonCarousel>
            <IconChevronUp color="#4E4B66" />
          </ButtonCarousel>
          <div className="slide-images">
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
            <img
              className="preview-carousel"
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="imagen"
            />
          </div>
          <ButtonCarousel>
            <IconChevronDown color="#4E4B66" />
          </ButtonCarousel>
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            className="preview-carousel"
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="imagen"
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              color: "#9295AD",
              fontSize: "1em",
            }}
          >
            ID: MX17-CO86
          </div>
        </div>
      </div>
      <ShortDetail>
        <div className="header-title-short">
          <h1>Zona El Mirador El Marques Querétaro</h1>
        </div>
        <LineSeparator opacity="0.3" />
        <div className="info-data-property">
          <div className="item-description">
            <span>Tipo de propiedad</span>
            <strong>Casa</strong>
          </div>
          <div className="item-description">
            <span>Precio Renta</span>
            <strong>$10,000 MXN</strong>
          </div>
          <div className="item-description">
            <span>Mantenimiento Mensual</span>
            <strong>$2,000 MXN</strong>
          </div>
          <div className="item-description">
            <span>Precio Basado en</span>
            <strong>Valor Total</strong>
          </div>
          <div className="item-description">
            <span>Renta Temporal</span>
            <strong></strong>
          </div>
        </div>
      </ShortDetail>
    </ContainerUp>
  );
};

export default SectionCarouselInfo;
