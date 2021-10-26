import React from "react";
import styled from "styled-components";
import { IconBed } from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";

const ContentFeatures = styled(Container)`
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
    margin: 0.7em 0px;
  }
  .container-cards {
    display: flex;
    justify-content: space-around;
    .card-content {
      padding: 0.7em;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 1px 8px 6px #ebebf1;
      border-radius: 1em;
      span {
        font-weight: bold;
        color: var(--color-primary);
      }
      label {
        color: #4e4b66;
        font-size: 0.7em;
      }
    }
  }
`;

const CardAmenity = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  border-radius: 1em;
  padding: 0.8em;
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
  }
`;

const SectionFeatures = () => {
  return (
    <ContentFeatures>
      <div className="container-features">
        <CardAmenity>
          <div className="circle-content">
            <div>
              <IconBed size="35" color="#fff" backGround="#fff" />
            </div>
          </div>
          <div className="info-amenity">
            <h1>3</h1>
            <span>Recámaras</span>
          </div>
        </CardAmenity>
      </div>
      <hr />
      <div className="container-cards">
        <div className="card-content">
          <span>600 m²</span>
          <label htmlFor="">De construcción</label>
        </div>
      </div>
    </ContentFeatures>
  );
};

export default SectionFeatures;
