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
import WidgetCalification from "./widgets/widgetCalification";

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 4em;
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

const StickyInvestigation = styled.div`
  position: fixed;
  right: 45vw;
  bottom: 2vh;
  display: flex;
  flex-direction: column;
`;

const UserDetailInformation = (props) => {
  const { callGlobalActionApi, dataProfile, match } = props;
  const { params } = match;

  const [dataDetail, setDataDetail] = useState([]);
  const [dataRelatioshipTypes, setDataRelatioshipTypes] = useState([]);
  const [dataReferenceStatus, setDataReferenceStatus] = useState([]);
  const [dataAllReasonRejection, setDataAllReasonRejection] = useState([]);
  const [dataInvStatus, setDataInvStatus] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);

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

  const handlerCallGetAllRelationshipTypes = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_RELATIONSHIP_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataRelatioshipTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPersonalReferencesStatus = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PERSONAL_REFERENCE_STATUS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataReferenceStatus(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllRejectionReasons = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_REJECTION_REASONS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataAllReasonRejection(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllInvestigationStatus = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idInvestigationProcess: id,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_INVESTIGATION_STATUS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataInvStatus(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPolicies = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_POLICIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPolicies(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetInvestigationProcessById(params.idInvestigationProcess);
    handlerCallGetAllInvestigationStatus(params.idInvestigationProcess);
    handlerCallGetAllRelationshipTypes();
    handlerCallGetAllPersonalReferencesStatus();
    handlerCallGetAllRejectionReasons();
    handlerCallGetAllPolicies();
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
            idCustomer,
            customerDocument,
            matiDashboardUrl,
            matiFinichedAt,
            matiStartedAt,
            matiVerificationNo,
            matiVerificationStatus,
            matiVerificationStatusStyle,
            bucketSource,
            idDocument,
            thumbnail,
            isBS,
            idInvestigationstatus,
            idRejectionReason,
            paymentCapacity,
            rejectionReason,
            isApproved,
            policiesApproved,
            duplicationUser,
          } = row;

          const dataReferences =
            isEmpty(personalReferences) === false
              ? JSON.parse(personalReferences)
              : [];
          const dataDocument =
            isEmpty(customerDocument) === false
              ? JSON.parse(customerDocument)
              : [];
          const dataDuplicationUser =
            isEmpty(duplicationUser) === false
              ? JSON.parse(duplicationUser)
              : [];

          return (
            <div>
              <ContentsTop>
                {isBS === false && (
                  <StickyInvestigation>
                    <WidgetInvestigation
                      idInvestigationStatus={idInvestigationstatus}
                      paymentCapacity={paymentCapacity}
                      dataInvStatus={dataInvStatus}
                      dataPolicies={dataPolicies}
                      policiesApproved={policiesApproved}
                      idInvestigationProcess={params.idInvestigationProcess}
                      idCustomer={idCustomer}
                      howManyUser={dataDetail.length}
                      updateDetailUser={() => {
                        handlerCallGetInvestigationProcessById(
                          params.idInvestigationProcess
                        );
                      }}
                    />
                  </StickyInvestigation>
                )}
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
                    bucketSource={bucketSource}
                    idDocument={idDocument}
                    thumbnail={thumbnail}
                  />
                </ContentInformation>
                <ContentVerification>
                  <WidgetVerification
                    matiDashboardUrl={matiDashboardUrl}
                    matiFinichedAt={matiFinichedAt}
                    matiStartedAt={matiStartedAt}
                    matiVerificationNo={matiVerificationNo}
                    matiVerificationStatus={matiVerificationStatus}
                    matiVerificationStatusStyle={matiVerificationStatusStyle}
                    dataDuplicationUser={dataDuplicationUser}
                  />
                </ContentVerification>
                <ContentReferences>
                  <WidgetReferences
                    dataReferences={dataReferences}
                    dataRelatioshipTypes={dataRelatioshipTypes}
                    dataReferenceStatus={dataReferenceStatus}
                    idInvestigationProcess={params.idInvestigationProcess}
                    updateDetailUser={() => {
                      handlerCallGetInvestigationProcessById(
                        params.idInvestigationProcess
                      );
                    }}
                  />
                </ContentReferences>
                <ContentDocument>
                  <WidgetDocuments dataDocument={dataDocument} />
                </ContentDocument>
              </ContentsTop>
              <ContentsBottom>
                <ContentInvestigation>
                  <WidgetCalification
                    score={score}
                    idRejectionReason={idRejectionReason}
                    dataAllReasonRejection={dataAllReasonRejection}
                    idInvestigationProcess={params.idInvestigationProcess}
                    idCustomer={idCustomer}
                    rejectionReason={rejectionReason}
                    isApproved={isApproved}
                    updateDetailUser={() => {
                      handlerCallGetInvestigationProcessById(
                        params.idInvestigationProcess
                      );
                    }}
                  />
                </ContentInvestigation>
                <ContentGeneralInformation>
                  <WidgetGeneralInformation
                    idCustomer={idCustomer}
                    idInvestigationProcess={params.idInvestigationProcess}
                  />
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
