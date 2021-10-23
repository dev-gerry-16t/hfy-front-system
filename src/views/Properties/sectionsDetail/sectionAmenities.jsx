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

const ContentAmenities = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const SectionAmenities = () => {
  return (
    <ContentAmenities>
      <div>
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
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </ContentAmenities>
  );
};

export default SectionAmenities;
