import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
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
  IconTenant,
  IconShare,
  IconHeart,
  IconEditSquare,
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
import SectionServiceAgent from "./sectionsDetail/sectionServiceAgent";
import ContextProperty from "./context/contextProperty";
import SectionDocuments from "./sectionsDetail/sectionDocuments";
import SectionApplicants from "./sectionsDetail/sectionApplicants";
import SectionAssociationProperty from "./sectionsDetail/sectionAssociationProperty";
import SectionAgents from "./sectionsDetail/sectionAgents";

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

  .content-card {
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

const SharedByUser = styled.div`
  font-style: italic;
  font-size: 12px;
  text-decoration: underline;
`;

const LoaderAction = styled.div`
  position: fixed;
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  display: block;
  top: 0;
`;

const dataTabsProperty = [
  {
    id: "1",
    text: "Características",
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
  const { match, callGlobalActionApi, dataProfile, history } = props;
  const { params } = match;
  const idProperty = params.idProperty;
  const [dataDetail, setDataDetail] = useState({});
  const [dataApplicationMethod, setDataApplicationMethod] = useState([]);
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

  const handlerCallGetAllApplicationMethods = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          type: 1,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_APPLICATION_METHODS
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataApplicationMethod(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateProperty = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idProperty,
        API_CONSTANTS.CUSTOMER.UPDATE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetFavoriteProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SET_FAVORITE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {
        frontFunctions.showMessageStatusApi(
          "Link copiado correctamente",
          GLOBAL_CONSTANTS.STATUS_API.SUCCESS
        );
      },
      (err) => {}
    );
  };

  useEffect(() => {
    handlerCallGetPropertyById();
    handlerCallGetAllApplicationMethods();
  }, []);

  return (
    <Content>
      {/* <LoaderAction>
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
        >
          <rect x="30" y="50" width="4" height="10" fill="var(--color-primary)">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="40" y="50" width="4" height="10" fill="var(--color-primary)">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.2s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="50" y="50" width="4" height="10" fill="var(--color-primary)">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.4s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </LoaderAction> */}
      <ContextProperty.Provider
        value={{
          dataDetail,
          updateProperty: async (data) => {
            try {
              await handlerCallUpdateProperty(data);
            } catch (error) {
              throw error;
            }
          },
          getById: () => {
            handlerCallGetPropertyById();
          },
        }}
      >
        <SectionAssociationProperty history={history} />
        <ContentForm owner>
          <div className="header-title">
            <h1>Detalle de inmueble</h1>
            <div>
              {isNil(dataDetail.sharedBy) === false && (
                <SharedByUser>
                  Ficha compartida por {dataDetail.sharedBy}
                </SharedByUser>
              )}
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {dataDetail.isPublished === true && (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a
                          target="_blank"
                          href={`https://wa.me/?text=Te+invito+a+que+veas+esta+propiedad%0a${window.location.origin}/property/${dataDetail.identifier}`}
                        >
                          WhatsApp
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <span
                          onClick={() => {
                            copyTextToClipboard(
                              `${window.location.origin}/property/${dataDetail.identifier}`
                            );
                          }}
                        >
                          Copiar link
                        </span>
                      </Menu.Item>
                      {/* <Menu.Item>
                      <a
                        target="_blank"
                        href={`http://m.me/?text=Te+invito+a+que+veas+esta+propiedad%0a${window.location.origin}/property/${dataDetail.identifier}`}
                      >
                        Facebook
                      </a>
                    </Menu.Item> */}
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow
                >
                  <ButtonIcon onClick={() => {}}>
                    <IconShare
                      color="var(--color-primary)"
                      backGround="var(--color-primary)"
                    />
                  </ButtonIcon>
                </Dropdown>
              )}
              {dataDetail.canBeFavorite === true && (
                <ButtonIcon
                  onClick={async () => {
                    try {
                      await handlerCallSetFavoriteProperty(
                        {
                          idApartment: dataDetail.idApartment,
                          identifier: dataDetail.identifier,
                        },
                        dataDetail.idProperty
                      );
                      handlerCallGetPropertyById();
                    } catch (error) {}
                  }}
                >
                  <IconHeart
                    backGround={
                      dataDetail.isFavorite === true
                        ? "var(--color-primary)"
                        : "transparent"
                    }
                    color="var(--color-primary)"
                  />
                </ButtonIcon>
              )}
              {dataDetail.canBeEdited === true && (
                <ButtonIcon onClick={async () => {
                  history.push(`/websystem/edit-property/${idProperty}`);

                }}>
                  <IconEditSquare
                    backGround="transparent"
                    color="var(--color-primary)"
                  />
                </ButtonIcon>
              )}
            </div>
          </div>
          <div>
            <SectionCarouselInfo
              apartmentImages={
                isNil(dataDetail) === false &&
                isNil(dataDetail.apartmentDocuments) === false
                  ? JSON.parse(dataDetail.apartmentDocuments)
                  : []
              }
            />
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
              {isNil(dataDetail.idApplicationMethod) === true && (
                <SectionPolicy
                  onClickViewPolicy={() => {
                    history.push(`/websystem/select-policy/${idProperty}`);
                  }}
                  idUserType={dataProfile.idUserType}
                />
              )}
              {dataProfile.idUserType !== 2 && (
                <>
                  {isNil(dataDetail.idPolicy) === true && (
                    <SectionServiceAgent
                      dataApplication={dataApplicationMethod}
                    />
                  )}
                  <SectionPublicProperty />
                </>
              )}
            </ContainerDown>
          </div>
        </ContentForm>

        <ContentRight>
          <SectionDocuments />
          {dataProfile.idUserType !== 2 && (
            <>
              <SectionApplicants />
              <SectionAgents idUserType={dataProfile.idUserType} />
            </>
          )}
          {isNil(dataDetail.ownerEmailAddress) === false &&
            dataProfile.idUserType === 4 && (
              <GeneralCard>
                <div className="header-title">
                  <h1>Propietario</h1>
                </div>
                <div className="content-card">
                  <Card>
                    <div className="card-user">
                      <div className="top-info">
                        <div className="icon-info">
                          <IconTenant size="100%" color="#4E4B66" />
                        </div>
                        <div className="name-info">
                          <h3>
                            {dataDetail.ownerGivenName}{" "}
                            {dataDetail.ownerLastName}
                          </h3>
                          <span>{dataDetail.ownerEmailAddress}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </GeneralCard>
            )}
        </ContentRight>
      </ContextProperty.Provider>
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
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPropertyUsers);
