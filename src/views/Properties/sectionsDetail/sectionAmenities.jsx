import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { IconBed } from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import ContextProperty from "../context/contextProperty";

const ContentAmenities = styled(Container)`
  font-size: 16px;
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
  @media screen and (max-width: 950px) {
    .container-chips {
      display: flex;
      flex-direction: column;
      .border-1 {
        border-bottom: 0.5px solid #e5e5e5;
        border-right: none;
      }
      .border-2 {
        border-bottom: none;
      }
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
`;

const Chip = styled.span`
  border: 1px solid #d6d8e7;
  border-radius: 5px;
  color: #4e4b66;
  font-size: 0.8em;
  padding: 0.3em;
`;

const Title = styled.h2`
  font-size: 1em;
  font-weight: 700;
  color: var(--color-primary);
`;

const SectionAmenities = () => {
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail = {} } = dataContexProperty;
  const { propertyAmenities, propertyGeneralCharacteristics } = dataDetail;

  const amenities =
    isNil(propertyAmenities) === false && isEmpty(propertyAmenities) === false
      ? JSON.parse(propertyAmenities)
      : [];

  const general =
    isNil(propertyGeneralCharacteristics) === false &&
    isEmpty(propertyGeneralCharacteristics) === false
      ? JSON.parse(propertyGeneralCharacteristics)
      : [];

  return (
    <ContentAmenities>
      <div className="container-chips">
        <div className="section-chips border-1">
          <Title>AMENIDADES</Title>
          <div className="chips">
            {isEmpty(amenities) === false &&
              amenities.map((row) => {
                return <Chip>{row.text}</Chip>;
              })}
          </div>
        </div>
        <div className="section-chips border-2">
          <Title>GENERAL</Title>
          <div className="chips">
            {isEmpty(general) === false &&
              general.map((row) => {
                return <Chip>{row.text}</Chip>;
              })}
          </div>
        </div>
      </div>
    </ContentAmenities>
  );
};

export default SectionAmenities;
