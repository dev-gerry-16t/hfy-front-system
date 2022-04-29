import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Pagination } from "antd";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { IconEditSquare } from "../../assets/iconSvg";
import { ReactComponent as IconSearch } from "../../assets/iconSvg/svgFile/Search.svg";
import CustomViewRequestContract from "../Home/sections/customViewRequestContract";
import { GeneralCard } from "./constants/styles";
import SectionInvolved from "./sections/sectionInvolved";
import SectionDetailContract from "./sections/sectionDetailContract";
import SectionPaymentInfo from "./sections/sectionPaymentInfo";

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
    "payment payment payment payment"
    "documents documents documents users"
    "documents documents documents users"
    "documents documents documents users"
    "detail detail detail agent"
    "detail detail detail agent"
    "detail detail detail agent"
    "detail detail detail ."
    "detail detail detail .";
  .section-payment {
    grid-area: payment;
  }
  .section-document {
    grid-area: documents;
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
`;

const DetailGenerateContracts = (props) => {
  const { callGlobalActionApi, dataProfile, history, match } = props;
  const [dataInfoRequest, setDataInfoRequest] = useState({
    request: {},
    payment: {},
  });

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

  useEffect(() => {
    const { params } = match;
    handlerCallGetRequestById(params.idRequest);
  }, []);

  return (
    <Content>
      <div className="section-payment">
        <SectionPaymentInfo dataInfoPayment={dataInfoRequest.payment} />
      </div>
      <div className="section-document">
        <GeneralCard>
          <div className="header-title">
            <h1>Documentos</h1>
          </div>
          <div className="content-cards"></div>
        </GeneralCard>
      </div>
      <div className="detail-property">
        <SectionDetailContract
          frontFunctions={frontFunctions}
          dataInfoRequest={dataInfoRequest.request}
          dataProperty={
            isEmpty(dataInfoRequest) === false &&
            isEmpty(dataInfoRequest.request) === false &&
            isNil(dataInfoRequest.request.jsonProperty) === false &&
            isEmpty(dataInfoRequest.request.jsonProperty) === false
              ? JSON.parse(dataInfoRequest.request.jsonProperty)
              : {}
          }
        />
      </div>
      <div className="section-implicated">
        <SectionInvolved
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
        <GeneralCard>
          <div className="header-title">
            <h1>Asesor Legal Asignado</h1>
          </div>
          <div className="content-cards"></div>
        </GeneralCard>
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
