import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { ButtonIcon, ContentForm } from "./constants/styleConstants";
import { IconHeart, IconShare, IconTenant } from "../../assets/iconSvg";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import SectionAmenities from "./sectionsDetail/sectionAmenities";
import SectionCarouselInfo from "./sectionsDetail/sectionCarouselHz";
import SectionFeatures from "./sectionsDetail/sectionFeatures";
import SectionLocation from "./sectionsDetail/sectionLocation";
import ContextProperty from "./context/contextProperty";
import SectionAssociationProperty from "./sectionsDetail/sectionAssociationProperty";
import SectionAssociationApplicant from "./sectionsDetail/sectionAssociationApplicant";

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

const ContentRight = styled.div`
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
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
        display: flex;
        flex-direction: column;
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

const EmptyData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
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
  const [dataDetail, setDataDetail] = useState({});
  const [idProperty, setIdProperty] = useState(
    params.idProperty.length > 30 ? params.idProperty : null
  );
  const [identifier, setIdentifier] = useState(
    params.idProperty.length < 30 ? params.idProperty : null
  );
  const [tabSelect, setTabSelect] = useState("1");
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier,
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
    setIdProperty(params.idProperty.length > 30 ? params.idProperty : null);
    setIdentifier(params.idProperty.length < 30 ? params.idProperty : null);
  }, [params.idProperty]);

  useEffect(() => {
    handlerCallGetPropertyById();
  }, [identifier, idProperty]);
  return (
    <>
      {isEmpty(dataDetail) === false && (
        <Content>
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
            }}
          >
            <SectionAssociationProperty history={history} />
            <SectionAssociationApplicant history={history} />
            <ContentForm owner>
              <div className="header-title">
                <h1>Detalle de inmueble</h1>
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
                </ContainerDown>
              </div>
            </ContentForm>
            <ContentRight>
              <GeneralCard>
                <div className="header-title">
                  <h1>Contactar</h1>
                </div>
                <div className="content-card">
                  <Card>
                    <div className="card-user">
                      <div className="top-info">
                        <div className="icon-info">
                          <IconTenant size="100%" color="#4E4B66" />
                        </div>
                        <div className="name-info">
                          <h3>{dataDetail.contactName}</h3>
                          <span>{dataDetail.contactPhoneNumberFormat}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </GeneralCard>
            </ContentRight>
          </ContextProperty.Provider>
        </Content>
      )}
      {isEmpty(dataDetail) === true && (
        <EmptyData>
          <img
            width="150"
            src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296S.png"
            alt=""
          />
          <p>Propiedad no disponible :(</p>
        </EmptyData>
      )}
    </>
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
