import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";
import SectionInvolved from "./sections/sectionInvolved";
import SectionDetailContract from "./sections/sectionDetailContract";
import SectionPaymentInfo from "./sections/sectionPaymentInfo";
import SectionDocuments from "./sections/sectionDocuments";
import SectionDetailProperty from "./sections/sectionDetailProperty";
import SectionLegalInformation from "./sections/sectionLegalInformation";

const Content = styled.div`
  font-size: 16px;
  font-family: Poppins;
  width: 100%;
  min-height: 90vh;
  overflow-y: scroll;
  padding: 1em;
  display: grid;
  grid-gap: 1em;
  grid-template-areas:
    "edit edit edit edit"
    "payment payment payment payment"
    "contract contract contract users"
    "detail detail detail agent"
    "documents documents documents documents";
  .section-edit {
    grid-area: edit;
  }
  .section-payment {
    grid-area: payment;
  }
  .section-document {
    grid-area: documents;
  }
  .detail-contract {
    grid-area: contract;
  }
  .detail-property {
    grid-area: detail;
  }
  .section-implicated {
    grid-area: users;
  }
  .agent-legal {
    grid-area: agent;
  }

  @media screen and (max-width: 1024px) {
    grid-template-areas:
      "payment payment payment payment"
      "detail detail detail detail"
      "users users users users"
      "documents documents documents documents"
      "agent agent agent agent";
  }
  @media screen and (max-width: 420px) {
    padding: 1em 5px;
  }
`;

const ContentEdit = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  padding: 1em;
  width: 100%;

  button {
    border: none;
    outline: none;
    border-radius: 1em;
    padding: 0px 1em;
    color: #fff;
    background: var(--color-primary);
  }
`;

const DetailGenerateContracts = (props) => {
  const { callGlobalActionApi, dataProfile, history, match } = props;
  const { params } = match;
  const idRequest = params.idRequest;
  const [visibleComponent, setVisibleComponent] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataInfoRequest, setDataInfoRequest] = useState({
    request: {},
    payment: {},
  });
  const [dataFee, setDataFee] = useState({});

  const frontFunctions = new FrontFunctions();

  const handlerCallGetRequestById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idRequest: id,
        },
        null,
        API_CONSTANTS.EXTERNAL.GET_REQUEST_BY_ID
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      const responseInfoRequest =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isEmpty(responseResult[0]) === false &&
        isNil(responseResult[0][0]) === false &&
        isEmpty(responseResult[0][0]) === false
          ? responseResult[0][0]
          : {};
      const responseInfoPayment =
        isEmpty(responseResult) === false &&
        isNil(responseResult[1]) === false &&
        isEmpty(responseResult[1]) === false &&
        isNil(responseResult[1][0]) === false &&
        isEmpty(responseResult[1][0]) === false
          ? responseResult[1][0]
          : {};
      setDataInfoRequest({
        request: responseInfoRequest,
        payment: responseInfoPayment,
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestDocuments = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idRequest: id,
        },
        null,
        API_CONSTANTS.EXTERNAL.GET_REQUEST_DOCUMENTS
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocuments(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetServiceFee = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
          filterBy: id,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_SERVICE_FEE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].serviceFee) === false &&
        isEmpty(response.response[0][0].serviceFee) === false
          ? JSON.parse(response.response[0][0].serviceFee)
          : {};
      setDataFee(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetRequest = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idRequest,
          idCustomer,
          idLoginHistory,
          ...data,
        },
        idSystemUser,
        API_CONSTANTS.EXTERNAL.SET_REQUEST,
        "PUT"
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : {};

      frontFunctions.showMessageStatusApi(
        isEmpty(responseResult) === false &&
          isNil(responseResult.message) === false
          ? responseResult.message
          : "Petición ejecutada con éxito",
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
    handlerCallGetRequestById(idRequest);
    handlerCallGetRequestDocuments(idRequest);
    handlerCallGetServiceFee(idRequest);
  }, []);

  return (
    <Content>
      {/* <ContentEdit className="section-edit">
        <button
          onClick={() => {
            setVisibleComponent(true);
          }}
        >
          Editar
        </button>
      </ContentEdit> */}
      {isEmpty(dataInfoRequest) === false &&
        isEmpty(dataInfoRequest.payment) === false &&
        isNil(dataInfoRequest.payment.requiresPymt) === false &&
        dataInfoRequest.payment.requiresPymt === true && (
          <div className="section-payment">
            <SectionPaymentInfo
              dataInfoPayment={dataInfoRequest.payment}
              onUpdateInfo={() => {
                handlerCallGetRequestById(idRequest);
                handlerCallGetRequestDocuments(idRequest);
              }}
            />
          </div>
        )}
      <div className="section-document">
        <SectionDocuments
          idRequest={idRequest}
          dataDocuments={dataDocuments}
          getById={() => {
            handlerCallGetRequestById(idRequest);
            handlerCallGetRequestDocuments(idRequest);
          }}
        />
      </div>
      <div className="detail-contract">
        <SectionDetailContract
          frontFunctions={frontFunctions}
          dataInfoRequest={dataInfoRequest.request}
          onSaveInfo={async (data) => {
            await handlerCallSetRequest(data);
            handlerCallGetRequestById(idRequest);
            handlerCallGetRequestDocuments(idRequest);
          }}
        />
      </div>
      <div className="detail-property">
        <SectionDetailProperty
          frontFunctions={frontFunctions}
          dataProperty={
            isEmpty(dataInfoRequest) === false &&
            isEmpty(dataInfoRequest.request) === false &&
            isNil(dataInfoRequest.request.jsonProperty) === false &&
            isEmpty(dataInfoRequest.request.jsonProperty) === false
              ? JSON.parse(dataInfoRequest.request.jsonProperty)
              : {}
          }
          onSaveInfo={async (data) => {
            await handlerCallSetRequest(data);
            handlerCallGetRequestById(idRequest);
            handlerCallGetRequestDocuments(idRequest);
          }}
        />
      </div>
      <div className="section-implicated">
        <SectionInvolved
          onGetDetail={() => {
            handlerCallGetRequestById(idRequest);
            handlerCallGetRequestDocuments(idRequest);
          }}
          onResend={async (data) => {
            try {
              await handlerCallSetRequest({
                jsonUserImplicated: JSON.stringify([data]),
              });
            } catch (error) {
              throw error;
            }
          }}
          idRequest={idRequest}
          dataInvolved={
            isEmpty(dataInfoRequest) === false &&
            isEmpty(dataInfoRequest.request) === false &&
            isNil(dataInfoRequest.request.jsonUserImplicated) === false &&
            isEmpty(dataInfoRequest.request.jsonUserImplicated) === false
              ? JSON.parse(dataInfoRequest.request.jsonUserImplicated)
              : []
          }
        />
      </div>
      <div className="agent-legal">
        <SectionLegalInformation
          dataInfoRequest={dataInfoRequest}
          dataFee={dataFee}
          onSaveInfo={async (data) => {
            await handlerCallSetRequest(data);
            handlerCallGetRequestById(idRequest);
            handlerCallGetRequestDocuments(idRequest);
          }}
        />
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
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
)(DetailGenerateContracts);
