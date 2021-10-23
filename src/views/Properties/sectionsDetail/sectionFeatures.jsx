import React from "react";
import styled from "styled-components";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";

const ContentFeatures = styled(Container)`
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
`;

const SectionFeatures = () => {
  return (
    <ContentFeatures>
      <div className="card-content">
        <span>600 m²</span>
        <label htmlFor="">De construcción</label>
      </div>
    </ContentFeatures>
  );
};

export default SectionFeatures;
