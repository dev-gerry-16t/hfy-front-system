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

const ContentLocation = styled(Container)``;

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
      <Row>
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <Location>
            <CustomMapContainer
              location={location}
              draggable={false}
              onDragPosition={(position) => {}}
              exact={isGMapsExact}
            />
          </Location>
        </Col>
        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <ContentAddress>
            <div className="content-address">
              <h1>{handlerLimitText(shortAddress)}</h1>
              <hr />
              <div>
                <span>{fullAddress}</span>
              </div>
            </div>
          </ContentAddress>
        </Col>
      </Row>
    </ContentLocation>
  );
};

export default SectionLocation;
