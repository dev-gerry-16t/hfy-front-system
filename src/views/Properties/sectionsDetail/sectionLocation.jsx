import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import styled from "styled-components";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import CustomMapContainer from "../../../components/customGoogleMaps";
import ContextProperty from "../context/contextProperty";

const Location = styled.div`
  border: 1px solid #d6d8e7;
  border-radius: 0.5em;
  width: 31em;
  height: 21em;
`;

const ContentLocation = styled(Container)`
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
    h1 {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 1.17em;
    }
  }
`;

const SectionLocation = () => {
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail } = dataContexProperty;
  const { jsonCoordinates, shortAddress, fullAddress, isGMapsExact } =
    dataDetail;

  const location =
    isNil(jsonCoordinates) === false && isEmpty(jsonCoordinates) === false
      ? JSON.parse(jsonCoordinates)
      : null;

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
  return (
    <ContentLocation>
      <div className="location-map">
        <Location>
          {isNil(location) === false && (
            <CustomMapContainer
              location={location}
              draggable={false}
              onDragPosition={(position) => {}}
              exact={isGMapsExact}
            />
          )}
        </Location>
      </div>
      <div>
        <ContentAddress>
          <div className="content-address">
            <h1>{handlerLimitText(shortAddress)}</h1>
            <hr />
            <div>
              <span>{fullAddress}</span>
            </div>
          </div>
        </ContentAddress>
      </div>
    </ContentLocation>
  );
};

export default SectionLocation;
