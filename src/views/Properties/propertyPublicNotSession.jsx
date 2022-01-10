import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { ButtonIcon, ContentForm } from "./constants/styleConstants";
import {
  Content,
  ContainerDown,
  TabsProperty,
  Tab,
} from "./constants/styleDashboardProperties";
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
    <>
      {/* <MetaTags>
        <title>{dataDetail.identifier}</title>
        <meta property="og:site_name" content={dataDetail.shortAddress}></meta>
        <meta name="description" content={dataDetail.description} />
        <meta property="og:title" content={dataDetail.title} />
        <meta
          property="og:image"
          itemprop="image"
          content={dataDetail.documentMainPic}
        />
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${window.location.origin}/property/${dataDetail.identifier}`}
        />
      </MetaTags> */}
      <div className="ant-layout site-layout">
        <Content>
          <ContextProperty.Provider
            value={{
              dataDetail,
            }}
          >
            {/* <SectionAssociationProperty history={history} /> */}
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
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPropertyUsers);
