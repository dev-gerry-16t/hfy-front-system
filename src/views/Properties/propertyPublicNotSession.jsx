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

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 4em;
  letter-spacing: 0.75px;
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
    font-size: 1.17em;
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
  let idProperty = params.idProperty.length > 30 ? params.idProperty : null;
  let identifier = params.idProperty.length < 30 ? params.idProperty : null;
  const [dataDetail, setDataDetail] = useState({});
  const [tabSelect, setTabSelect] = useState("1");
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPropertyById = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier,
          idCustomer: null,
          idSystemUser: null,
          idLoginHistory: null,
        },
        null,
        API_CONSTANTS.GET_PROPERTY_BY_ID,
        null,
        false
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};

      setDataDetail(responseResult);
      if (
        isNil(dataProfile) === false &&
        isEmpty(dataProfile) === false &&
        dataProfile.idUserType === 2
      ) {
        history.push(`/websystem/detail-property/${responseResult.identifier}`);
      }
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
    <div className="ant-layout site-layout">
      <Content>
        <ContextProperty.Provider
          value={{
            dataDetail,
          }}
        >
          <SectionAssociationProperty history={history} />
          <ContentForm owner>
            <div className="header-title">
              <h1 style={{ fontSize: "1.17em" }}>Detalle de inmueble</h1>
              <ButtonIcon>
                <IconHeart
                  backGround="transparent"
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
                {tabSelect === "1" && <SectionFeatures publicProperty />}
                {tabSelect === "2" && <SectionLocation />}
                {tabSelect === "3" && <SectionAmenities />}
              </ContainerDown>
            </div>
          </ContentForm>
        </ContextProperty.Provider>
      </Content>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPropertyUsers);
