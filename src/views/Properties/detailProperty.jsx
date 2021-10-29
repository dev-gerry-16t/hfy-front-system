import React from "react";
import styled from "styled-components";
import {
  ButtonIcon,
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "./constants/styleConstants";
import { IconHeart } from "../../assets/iconSvg";
import SectionAmenities from "./sectionsDetail/sectionAmenities";
import SectionCarouselInfo from "./sectionsDetail/sectionCarouselInfo";
import SectionFeatures from "./sectionsDetail/sectionFeatures";
import SectionLocation from "./sectionsDetail/sectionLocation";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const ContainerDown = styled.div`
  padding: 0 12em;
  margin: 5em 3em 2em 3em;
`;

const TabsProperty = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Tab = styled.div`
  line-height: 5px;
  h1 {
    font-weight: bold;
    color: ${(props) =>
      props.selected === true ? "var(--color-primary)" : "#4e4b66"};
  }
  hr {
    width: 30%;
    background: #d6d8e7;
    margin: 0;
    border: 2px solid var(--color-primary);
    display: ${(props) => (props.selected === true ? "block" : "none")};
  }
`;

const ButtonAction = styled.button`
  background: ${(props) => (props.primary ? "var(--color-primary)" : "#FFF")};
  border: ${(props) =>
    props.primary ? "none" : "1px solid var(--color-primary)"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  padding: 0.2em 2em;
  border-radius: 1em;
`;

const DetailPropertyUsers = () => {
  return (
    <Content>
      <ContentForm>
        <div className="header-title">
          <h1>Detalle de inmueble</h1>
          <ButtonIcon>
            <IconHeart
              backGround="var(--color-primary)"
              color="var(--color-primary)"
            />
          </ButtonIcon>
        </div>
        <div>
          <SectionCarouselInfo />
          <ContainerDown>
            <TabsProperty>
              <Tab selected={false}>
                <h1>Caracteristicas</h1>
                <hr />
              </Tab>
              <Tab selected={false}>
                <h1>Ubicación</h1>
                <hr />
              </Tab>
              <Tab selected={true}>
                <h1>Amenidades</h1>
                <hr />
              </Tab>
            </TabsProperty>
            <SectionAmenities />
          </ContainerDown>
        </div>
        <div className="button-actions">
          <ButtonAction primary>Postularme</ButtonAction>
          <ButtonAction primary={false}>Contactar</ButtonAction>
        </div>
      </ContentForm>
    </Content>
  );
};

export default DetailPropertyUsers;
