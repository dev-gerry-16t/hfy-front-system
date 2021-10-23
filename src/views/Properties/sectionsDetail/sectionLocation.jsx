import React from "react";
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
  return (
    <ContentLocation>
      <Row>
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <Location>
            <CustomMapContainer
              location={{ lat: 19.4159, lng: -99.033 }}
              draggable={false}
              onDragPosition={(position) => {}}
            />
          </Location>
        </Col>
        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <ContentAddress>
            <div className="content-address">
              <h1>El marques Queretaro</h1>
              <hr />
              <div>
                <span>
                  Del. Cuauhtemoc Col. Centro Calle. Francisco i. Madero 39
                  Int.2, Ciudad de México 06000 México
                </span>
              </div>
            </div>
          </ContentAddress>
        </Col>
      </Row>
    </ContentLocation>
  );
};

export default SectionLocation;
