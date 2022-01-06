import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import CustomStepsHomify from "../../../components/customStepsHomify";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";

const CardGeneralInformation = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }
`;

const CardInformation = styled.div`
  margin-top: 1.5em;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  max-height: 300px;
  overflow-y: scroll;
  .content-info {
    width: 360px;
    .data-information {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d6d7e8;
    }
  }
  @media screen and (max-width: 560px) {
    .content-info {
      width: 100%;
      padding: 0px 10px;
      .data-information {
        flex-wrap: wrap;
      }
    }
  }
`;

const Info = ({ field, value }) => {
  return (
    <div className="data-information">
      <strong>{field}:</strong>
      <span>
        {" "}
        <div
          className="section-info-notification"
          dangerouslySetInnerHTML={{
            __html: isNil(value) === false ? value : "",
          }}
        />
      </span>
    </div>
  );
};

const WidgetGeneralInformation = (props) => {
  const {
    callGlobalActionApi,
    idCustomer,
    idInvestigationProcess,
    dataProfile,
  } = props;
  const [current, setCurrent] = useState(0);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataTabs, setDataTabs] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetCustomerTabById = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_TAB_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      const firstTab =
        isEmpty(responseResult) === false && isNil(responseResult[0]) === false
          ? responseResult[0]
          : 1;
      // const filterData =
      //   isEmpty(responseResult) === false
      //     ? responseResult.filter((row) => {
      //         return row.includesRepository === false;
      //       })
      //     : [];
      handlerCallGetCustomerDataByTab(firstTab.identifier);
      setDataTabs(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerDataByTab = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idInvestigationProcess,
          identifier: id,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DATA_BY_TAB
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataInfo(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerTabById();
  }, []);
  return (
    <CardGeneralInformation>
      <h1>Información de Perfil</h1>
      <CustomStepsHomify
        steps={dataTabs}
        onClick={(index, record) => {
          setCurrent(index);
          handlerCallGetCustomerDataByTab(record.identifier);
        }}
        current={current}
      />
      <CardInformation>
        <div className="content-info">
          {isEmpty(dataInfo) === false &&
            dataInfo.map((row) => {
              return (
                <Info
                  field={row.typeFormProperty}
                  value={row.typeFormPropertyValue}
                />
              );
            })}
        </div>
      </CardInformation>
    </CardGeneralInformation>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
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
)(WidgetGeneralInformation);
