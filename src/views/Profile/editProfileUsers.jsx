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
import CustomStepsHomify from "../../components/customStepsHomifyV2";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const EditProfileUsers = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});
  const [dataTabs, setDataTabs] = useState([]);
  const [dataConfigForm, setDataConfigForm] = useState({});
  const [current, setCurrent] = useState(0);
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
          : [];
      setDataCustomerDetail(responseResult);
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
        }}
      >
        {/*Inquilino Persona fisica */}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 1 && (
            <SectionPersonalInformationTenant
              onclickNext={() => {
                setCurrent(1);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 6 && (
            <SectionCurrentAddressTenant
              onclickBack={() => {
                setCurrent(0);
              }}
              onclickNext={() => {
                setCurrent(2);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 3 && (
            <SectionCurrentWorkTenant
              onclickBack={() => {
                setCurrent(1);
              }}
              onclickNext={() => {
                setCurrent(3);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 4 && (
            <SectionReferences
              onclickBack={() => {
                setCurrent(2);
              }}
              onclickNext={() => {
                setCurrent(4);
              }}
            />
          )}
        {/*Inquilino Persona fisica */}

        {/*Inquilino Persona moral */}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 1 && (
            <SectionPersonalInformationTenantMoral
              onclickNext={() => {
                setCurrent(1);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 6 && (
            <SectionCurrentAddressTenant
              onclickBack={() => {
                setCurrent(0);
              }}
              onclickNext={() => {
                setCurrent(2);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 3 && (
            <SectionCurrentWorkTenantMoral
              onclickBack={() => {
                setCurrent(1);
              }}
              onclickNext={() => {
                setCurrent(3);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 1 &&
          dataConfigForm.idTab === 4 && (
            <SectionReferences
              onclickBack={() => {
                setCurrent(2);
              }}
              onclickNext={() => {
                setCurrent(4);
              }}
            />
          )}
        {/*Inquilino Persona moral */}

        {/*Propietario Persona fisica */}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 1 && (
            <SectionPersonalInformationOwner
              onclickNext={() => {
                setCurrent(1);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 6 && (
            <SectionCurrentAddress
              onclickBack={() => {
                setCurrent(0);
              }}
              onclickNext={() => {
                setCurrent(2);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === false &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 2 && <SectionBankInformation />}
        {/*Propietario Persona fisica */}

        {/*Propietario Persona moral */}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 1 && (
            <SectionPersonalInformationOwnerMoral
              onclickNext={() => {
                setCurrent(1);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 6 && (
            <SectionCurrentAddress
              onclickBack={() => {
                setCurrent(0);
              }}
              onclickNext={() => {
                setCurrent(2);
              }}
            />
          )}
        {isEmpty(dataConfigForm) === false &&
          dataConfigForm.requiresEntInfo === true &&
          dataConfigForm.idCustomerType === 2 &&
          dataConfigForm.idTab === 2 && <SectionBankInformation />}
        {/*Propietario Persona moral */}
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
