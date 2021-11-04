import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  ButtonIcon,
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "./constants/styleConstants";
import {
  IconHeart,
  IconPolicy,
  IconContract,
  IconPayments,
  IconTenant,
} from "../../assets/iconSvg";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import SectionAmenities from "./sectionsDetail/sectionAmenities";
import SectionCarouselInfo from "./sectionsDetail/sectionCarouselHz";
import SectionFeatures from "./sectionsDetail/sectionFeatures";
import SectionLocation from "./sectionsDetail/sectionLocation";
import SectionPolicy from "./sectionsDetail/sectionPolicy";
import SectionPublicProperty from "./sectionsDetail/sectionPublicProperty";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const ContainerDown = styled.div`
  padding: 0 1em;
  margin: 5em 1em 2em 1em;
`;

const TabsProperty = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Tab = styled.div`
  line-height: 5px;
  cursor: pointer;
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

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  .header-title {
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
  }
  .content-cards {
    min-height: 30em;
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  min-height: 6em;
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        position: relative;
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ContentRight = styled.div`
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const dataTabsProperty = [
  {
    id: "1",
    text: "Caracteristicas",
  },
  {
    id: "2",
    text: "Ubicación",
  },
  {
    id: "3",
    text: "Amenidades",
  },
];

const DetailPropertyUsers = (props) => {
  const { match, callGlobalActionApi, dataProfile } = props;
  const { params } = match;
  const idProperty = params.idProperty;
  const [dataDetail, setDataDetail] = useState({});
  const [tabSelect, setTabSelect] = useState("1");
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      setDataDetail(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetPropertyById();
  }, []);

  return (
    <Content>
      <ContentForm owner>
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
          <SectionCarouselInfo dataDetail={dataDetail} />
          <ContainerDown>
            <TabsProperty>
              {dataTabsProperty.map((row) => {
                return (
                  <Tab
                    selected={tabSelect === row.id}
                    onClick={() => {
                      setTabSelect(row.id);
                    }}
                  >
                    <h1>{row.text}</h1>
                    <hr />
                  </Tab>
                );
              })}
            </TabsProperty>
            {tabSelect === "1" && <SectionFeatures />}
            {tabSelect === "2" && <SectionLocation />}
            {tabSelect === "3" && <SectionAmenities />}
            <SectionPolicy />
            <SectionPublicProperty />
          </ContainerDown>
        </div>
      </ContentForm>
      <ContentRight>
        <GeneralCard>
          <div className="header-title">
            <h1>Documentos</h1>
          </div>
          <div className="content-cards">
            <Card>
              <div className="card-document">
                <div className="top-info">
                  <div className="icon-info">
                    <IconPolicy
                      backGround="#A0A3BD"
                      color="#A0A3BD"
                      size="34px"
                    />
                  </div>
                  <div className="name-info">
                    <h3>Póliza jurídica</h3>
                    <span>Archivo listo para firmar</span>
                  </div>
                </div>
                <div className="button-action">
                  <ButtonDocument primary>Firmar</ButtonDocument>
                </div>
              </div>
            </Card>
            <Card>
              <div className="card-document">
                <div className="top-info">
                  <div className="icon-info">
                    <IconContract
                      backGround="#A0A3BD"
                      color="#A0A3BD"
                      size="34px"
                    />
                  </div>
                  <div className="name-info">
                    <h3>Contrato de arrendamiento</h3>
                    <span>Archivo listo para firmar</span>
                  </div>
                </div>
                <div className="button-action">
                  <ButtonDocument primary>Firmar</ButtonDocument>
                </div>
              </div>
            </Card>
            <Card>
              <div className="card-document">
                <div className="top-info">
                  <div className="icon-info">
                    <IconPayments
                      backGround="#A0A3BD"
                      color="#A0A3BD"
                      size="34px"
                    />
                  </div>
                  <div className="name-info">
                    <h3>Pagares</h3>
                    <span>Archivo listo para firmar</span>
                  </div>
                </div>
                <div className="button-action">
                  <ButtonDocument primary>Firmar</ButtonDocument>
                </div>
              </div>
            </Card>
          </div>
        </GeneralCard>
        <GeneralCard>
          <div className="header-title">
            <h1>Prospectos</h1>
          </div>
          <div className="content-cards">
            <Card>
              <div className="card-user">
                <div className="top-info">
                  <div className="icon-info">
                    <IconTenant size="100%" color="#4E4B66" />
                    <div className="score">
                      <span>Score</span>
                      <strong>4.85</strong>
                    </div>
                  </div>
                  <div className="name-info">
                    <h3>Juan Valdez</h3>
                    <span>Invitación enviada</span>
                  </div>
                </div>
                <div className="button-action">
                  <ButtonDocument>Rechazar</ButtonDocument>
                  <ButtonDocument>Aceptar</ButtonDocument>
                </div>
              </div>
            </Card>
            <Card></Card>
            <Card></Card>
          </div>
        </GeneralCard>
        <GeneralCard>
          <div className="header-title">
            <h1>Agentes</h1>
          </div>
          <div className="content-cards">
            <Card>
              <div className="card-user">
                <div className="top-info">
                  <div className="icon-info">
                    <IconTenant size="100%" color="#4E4B66" />
                  </div>
                  <div className="name-info">
                    <h3>Juan Valdez</h3>
                    <span>Invitación enviada</span>
                  </div>
                </div>
                <div className="button-action">
                  <ButtonDocument>Deshacer</ButtonDocument>
                </div>
              </div>
            </Card>
            <Card></Card>
            <Card></Card>
          </div>
        </GeneralCard>
      </ContentRight>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPropertyUsers);
