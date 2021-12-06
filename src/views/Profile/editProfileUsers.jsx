import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import ContextProfile from "./context/contextProfile";
import SectionPersonalInformationTenant from "./sections/PersonalInformation/sectionPersonalInformationTenant";
import SectionPersonalInformationTenantMoral from "./sections/PersonalInformation/sectionPersonalInformationTenantMoral";
import SectionPersonalInformationOwner from "./sections/PersonalInformation/sectionPersonalInformationOwner";
import SectionPersonalInformationOwnerMoral from "./sections/PersonalInformation/sectionPersonalInformationOwnerMoral";
import SectionCurrentAddressTenant from "./sections/CurrentAddress/sectionCurrentAddressTenant";
import SectionCurrentAddress from "./sections/CurrentAddress/sectionCurrentAddress";
import SectionReferences from "./sections/References/sectionReferencies";
import SectionCurrentWorkTenant from "./sections/CurrentWork/sectionCurrentWorkTenant";
import SectionCurrentWorkTenantMoral from "./sections/CurrentWork/sectionCurrentWorkTenantMoral";
import SectionBankInformation from "./sections/BankInformation/sectionBankInformation";
import SectionBankInformationAgent from "./sections/BankInformation/sectionBankInformationAgent";
import SectionPersonalInformationAgentMoral from "./sections/PersonalInformation/sectionPersonalInformationAgentMoral";
import SectionPersonalInformationAgent from "./sections/PersonalInformation/sectionPersonalInformationAgent";
import CustomStepsHomify from "../../components/customStepsHomifyV2";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const EditProfileUsers = (props) => {
  const { callGlobalActionApi, dataProfile, match } = props;
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});
  const [dataDetailReference, setDataDetailReference] = useState([]);
  const [dataTabs, setDataTabs] = useState([]);
  const [dataConfigForm, setDataConfigForm] = useState({});
  const [current, setCurrent] = useState(0);
  const [maxTabs, setMaxTabs] = useState(0);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetCustomerData = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DATA
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      const responseResultReference =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[3]) === false &&
        isEmpty(response.response[3]) === false
          ? response.response[3]
          : [];
      setDataCustomerDetail(responseResult);
      setDataDetailReference(responseResultReference);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerTabById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
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
      setDataTabs(responseResult);
      setMaxTabs(responseResult.length);
      if (
        isEmpty(responseResult) === false &&
        isNil(match.params.identifier) === false
      ) {
        const identifierMatch = match.params.identifier;
        responseResult.find((row, ix) => {
          if (row.identifier == identifierMatch) {
            setCurrent(ix);
          }
          return row.identifier == identifierMatch;
        });
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerData();
    handlerCallGetCustomerTabById();
  }, []);

  return (
    <Content>
      <CustomStepsHomify
        steps={dataTabs}
        onClick={(ix, record) => {
          setCurrent(ix);
        }}
        callBackFind={(record) => {
          setDataConfigForm(record);
        }}
        current={current}
      />
      <ContextProfile.Provider
        value={{
          dataCustomerDetail,
          getById: () => {
            handlerCallGetCustomerData();
          },
          dataDetailReference,
          identifier: dataConfigForm.identifier,
          type: dataConfigForm.type,
        }}
      >
        {/*Inquilino Persona fisica */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 1 && (
          <SectionPersonalInformationTenant
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 3 && (
          <SectionCurrentAddressTenant
            onclickBack={() => {
              setCurrent(current - 1);
            }}
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 4 && (
          <SectionCurrentWorkTenant
            onclickBack={() => {
              setCurrent(current - 1);
            }}
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 6 && (
          <SectionReferences
            onclickBack={() => {
              setCurrent(current - 1);
            }}
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {/*Inquilino Persona fisica */}

        {/*Inquilino Persona moral */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 2 && (
          <SectionPersonalInformationTenantMoral
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}

        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 5 && (
          <SectionCurrentWorkTenantMoral
            onclickBack={() => {
              setCurrent(current - 1);
            }}
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {/*Inquilino Persona moral */}

        {/*Propietario Persona fisica */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 8 && (
          <SectionPersonalInformationOwner
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 10 && (
          <SectionCurrentAddress
            onclickBack={() => {
              setCurrent(current - 1);
            }}
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 11 && (
          <SectionBankInformation
            onclickBack={() => {
              setCurrent(current - 1);
            }}
          />
        )}
        {/*Propietario Persona fisica */}

        {/*Propietario Persona moral */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 9 && (
          <SectionPersonalInformationOwnerMoral
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {/*Propietario Persona moral */}

        {/*Agente Persona fisica */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 12 && (
          <SectionPersonalInformationAgent
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}

        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 14 && (
          <SectionBankInformationAgent
            onclickBack={() => {
              setCurrent(current - 1);
            }}
          />
        )}
        {/*Agente Persona fisica */}

        {/*Agente Persona Moral */}
        {isEmpty(dataConfigForm) === false && dataConfigForm.identifier === 13 && (
          <SectionPersonalInformationAgentMoral
            onclickNext={() => {
              setCurrent(current + 1);
            }}
          />
        )}
        {/*Agente Persona Moral */}
      </ContextProfile.Provider>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileUsers);
