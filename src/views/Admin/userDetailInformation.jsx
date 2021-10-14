import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { callGlobalActionApi } from "../../utils/actions/actions";
import styled from "styled-components";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import WidgetDocuments from "./widgets/widgetDocuments";
import WidgetGeneralInformation from "./widgets/widgetGeneralInformation";
import WidgetInformation from "./widgets/widgetInformation";
import WidgetInvestigation from "./widgets/widgetInvestigation";
import WidgetLocation from "./widgets/widgetLocation";
import WidgetReferences from "./widgets/widgetReferences";
import WidgetVerification from "./widgets/widgetVerification";

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 8em;
  overflow-y: scroll;
  font-size: 14px;
  font-family: Poppins;
`;

const ContentsTop = styled.div`
  height: 50vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 0.5em;
  row-gap: 0.5em;
`;

const ContentInformation = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 1em 2em;
`;

const ContentVerification = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  padding: 1em;
`;

const ContentReferences = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  padding: 1em;
`;

const ContentDocument = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  padding: 1em;
`;

const ContentsBottom = styled.div`
  height: 50vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 0.5em;
  row-gap: 0.5em;
`;

const ContentInvestigation = styled.div`
  padding: 1em 2em;
`;

const ContentGeneralInformation = styled.div`
  padding: 1em;
`;

const ContentLocation = styled.div`
  padding: 1em;
`;

const UserDetailInformation = (props) => {
  const { callGlobalActionApi, dataProfile, match } = props;
  const [dataDetail, setDataDetail] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetInvestigationProcessById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idInvestigationProcess: id,
          idSystemUser,
          idLoginHistory,
          topIndex: 0,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_INVESTIGATION_PROCESS_BY_ID
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataDetail(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    const { params } = match;
    handlerCallGetInvestigationProcessById(params.idInvestigationProcess);
  }, []);

  return (
    <Content>
      {isEmpty(dataDetail) === false &&
        dataDetail.map((row) => {
          const {
            personalReferences,
            fullName,
            labelTenant,
            fullAddress,
            currentSalary,
            emailAddress,
            phoneNumber,
            occupationActivity,
            citizenId,
            taxId,
            score,
            matiURLGMaps,
          } = row;
          const dataReferences =
            isEmpty(personalReferences) === false
              ? JSON.parse(personalReferences)
              : [];
          return (
            <div>
              <ContentsTop>
                <ContentInformation>
                  <WidgetInformation
                    fullName={fullName}
                    labelTenant={labelTenant}
                    fullAddress={fullAddress}
                    currentSalary={currentSalary}
                    emailAddress={emailAddress}
                    phoneNumber={phoneNumber}
                    occupationActivity={occupationActivity}
                    citizenId={citizenId}
                    taxId={taxId}
                  />
                </ContentInformation>
                <ContentVerification>
                  <WidgetVerification />
                </ContentVerification>
                <ContentReferences>
                  <WidgetReferences dataReferences={dataReferences} />
                </ContentReferences>
                <ContentDocument>
                  <WidgetDocuments />
                </ContentDocument>
              </ContentsTop>
              <ContentsBottom>
                <ContentInvestigation>
                  <WidgetInvestigation score={score} />
                </ContentInvestigation>
                <ContentGeneralInformation>
                  <WidgetGeneralInformation />
                </ContentGeneralInformation>
                <ContentLocation>
                  <WidgetLocation matiURLGMaps={matiURLGMaps} />
                </ContentLocation>
              </ContentsBottom>
            </div>
          );
        })}
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
)(UserDetailInformation);
