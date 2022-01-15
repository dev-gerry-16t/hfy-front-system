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
import ComponentAddReference from "../Profile/sections/References/sectionAddReferences";

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 4em;
  overflow-y: scroll;
  font-size: 14px;
  font-family: Poppins;
`;

const ContentsTop = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 0.5em;
  row-gap: 0.5em;
  @media screen and (max-width: 1320px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 0px;
    row-gap: 0px;
  }
  @media screen and (max-width: 1230px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, auto);
  }
  @media screen and (max-width: 560px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContentInformation = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 1em 2em;
  @media screen and (max-width: 1320px) {
    padding: 1em 10px;
  }
  @media screen and (max-width: 1230px) {
  }
`;

const ContentVerification = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  padding: 1em;
  @media screen and (max-width: 1320px) {
    grid-row: 1/3;
    padding: 1em 10px;
  }
  @media screen and (max-width: 1230px) {
  }
`;

const ContentReferences = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  padding: 1em;
  @media screen and (max-width: 1320px) {
    grid-column: 3/4;
    grid-row: 1/3;
    padding: 1em 10px;
  }
  @media screen and (max-width: 1230px) {
    grid-column: 1/2;
    grid-row: 3/5;
  }
`;

const ContentDocument = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  padding: 1em;
  @media screen and (max-width: 1320px) {
    grid-column: 4/5;
    padding: 1em 10px;
  }
  @media screen and (max-width: 1230px) {
    grid-column: 2/3;
    grid-row: 3/5;
  }
`;

const ContentsBottom = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 0.5em;
  row-gap: 0.5em;
  @media screen and (max-width: 1320px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 560px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContentInvestigation = styled.div`
  padding: 1em 2em;
  @media screen and (max-width: 1320px) {
    padding: 1em 10px;
    grid-column: 1/2;
  }
`;

const ContentGeneralInformation = styled.div`
  padding: 1em;
  @media screen and (max-width: 1320px) {
    padding: 1em 10px;
    grid-column: 1/3;
    grid-row: 2/3;
  }
`;

const ContentLocation = styled.div`
  padding: 1em;
  @media screen and (max-width: 1320px) {
    padding: 1em 10px;
    grid-column: 2/3;
    grid-row: 1/2;
  }
`;

const StickyInvestigation = styled.div`
  position: fixed;
  right: 45vw;
  bottom: 2vh;
  display: flex;
  flex-direction: column;
  z-index: 5;
  @media screen and (max-width: 560px) {
    width: 100%;
    right: 0px;
    align-items: center;
  }
`;

const UserDetailInformation = (props) => {
  const { callGlobalActionApi, dataProfile, match } = props;
  const { params } = match;

  const [dataDetail, setDataDetail] = useState([]);
  const [isOpenAddReferences, setIsOpenAddReferences] = useState(false);
  const [dataDefaultReference, setDataDefaultReference] = useState({});
  const [dataRelatioshipTypes, setDataRelatioshipTypes] = useState([]);
  const [dataDetailProperty, setDataDetailProperty] = useState([]);
  const [dataReferenceStatus, setDataReferenceStatus] = useState([]);
  const [dataAllReasonRejection, setDataAllReasonRejection] = useState([]);
  const [dataInvStatus, setDataInvStatus] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);

  const frontFunctions = new FrontFunctions();

  const handlerCallGetCustomerDetailById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: id,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DETAIL_BY_ID
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false
          ? response.response[0]
          : [];
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[1]) === false &&
        isEmpty(response.response[1]) === false
          ? response.response[1]
          : [];
      setDataDetail(responseResult);
      setDataDetailProperty(responseResult1);
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

  const handlerCallSetPersonalReference = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
          idCustomer: params.idCustomer,
        },
        params.idCustomer,
        API_CONSTANTS.CUSTOMER.SET_PERSONAL_REFERENCE,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        isEmpty(responseResult) === false
          ? responseResult
          : "Se ejecutó correctamente la solicitud",
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
    handlerCallGetCustomerDetailById(params.idCustomer);
    // handlerCallGetAllInvestigationStatus(params.idInvestigationProcess);
    handlerCallGetAllRelationshipTypes();
    handlerCallGetAllPersonalReferencesStatus();
    handlerCallGetAllRejectionReasons();
    handlerCallGetAllPolicies();
  }, []);

  return (
    <Content>
      <ComponentAddReference
        isModalVisible={isOpenAddReferences}
        dataDefaultReference={dataDefaultReference}
        onClose={() => {
          setIsOpenAddReferences(false);
          setDataDefaultReference({});
        }}
        onSendInformation={async (data) => {
          try {
            await handlerCallSetPersonalReference(data);
            handlerCallGetCustomerDetailById(params.idCustomer);
          } catch (error) {
            throw error;
          }
        }}
      />
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
            isOwner,
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
                        handlerCallGetCustomerDetailById(idCustomer);
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
                    idCustomer={idCustomer}
                    updateDetailUser={() => {
                      handlerCallGetCustomerDetailById(idCustomer);
                    }}
                    onDeleteReference={async (data) => {
                      try {
                        await handlerCallSetPersonalReference(data);
                        handlerCallGetCustomerDetailById(idCustomer);
                      } catch (error) {}
                    }}
                    onOpenAddReference={(data = {}) => {
                      setIsOpenAddReferences(true);
                      setDataDefaultReference(data);
                    }}
                    isOwner={isOwner}
                    dataDetailProperty={dataDetailProperty}
                    isAdmin={true}
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
                      handlerCallGetCustomerDetailById(idCustomer);
                    }}
                  />
                </ContentInvestigation>
                <ContentGeneralInformation>
                  <WidgetGeneralInformation
                    idCustomer={idCustomer}
                    idInvestigationProcess={params.idInvestigationProcess}
                    isAdmin={true}
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
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailInformation);
