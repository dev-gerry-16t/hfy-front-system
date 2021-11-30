import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { ButtonIcon, ContentForm } from "./constants/styleConstants";
import { IconHeart } from "../../assets/iconSvg";
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

  useEffect(() => {
    setIdProperty(params.idProperty.length > 30 ? params.idProperty : null);
    setIdentifier(params.idProperty.length < 30 ? params.idProperty : null);
  }, [params.idProperty]);

  useEffect(() => {
    handlerCallGetPropertyById();
  }, [identifier, idProperty]);
  return (
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
              {/* <IconShare
                color="var(--color-primary)"
                backGround="var(--color-primary)"
              /> */}
            </ButtonIcon>
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
