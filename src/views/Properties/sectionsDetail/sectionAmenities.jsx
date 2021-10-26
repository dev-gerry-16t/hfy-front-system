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

const ContentAmenities = styled(Container)`
  .container-chips {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
  return (
    <ContentAmenities>
      <div className="container-chips">
        <div className="section-chips border-1">
          <Title>EXTERIOR</Title>
          <div className="chips">
            <Chip>Acceso a la playa</Chip>
            <Chip>Frente a la playa</Chip>
            <Chip>Estacionamiento techado</Chip>
          </div>
        </div>
        <div className="section-chips border-1">
          <Title>GENERAL</Title>
          <div className="chips">
            <Chip>Acceso a la playa</Chip>
            <Chip>Frente a la playa</Chip>
            <Chip>Estacionamiento techado</Chip>
          </div>
        </div>
        <div className="section-chips border-2">
          <Title>RECREACIÓN</Title>
          <div className="chips">
            <Chip>Acceso a la playa</Chip>
            <Chip>Frente a la playa</Chip>
            <Chip>Estacionamiento techado</Chip>
          </div>
        </div>
      </div>
      <div className="bottom-chips">
        <div
          style={{
            marginRight: 5,
          }}
        >
          <Title>Restricciones:</Title>
        </div>
        <div className="chips">
          <Chip>Acceso a la playa</Chip>
          <Chip>Frente a la playa</Chip>
          <Chip>Estacionamiento techado</Chip>
        </div>
      </div>
    </ContentAmenities>
  );
};

export default SectionAmenities;
