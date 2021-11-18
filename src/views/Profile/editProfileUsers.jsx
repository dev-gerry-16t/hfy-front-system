import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

const EditProfileUsers = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});
  const [dataTabs, setDataTabs] = useState([]);
  const [dataConfigForm, setDataConfigForm] = useState({});
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
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <ContextProfile.Provider
        value={{
          dataCustomerDetail,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            columnGap: 2,
            padding: "15px",
          }}
        >
          <div>
            {isEmpty(dataTabs) === false &&
              dataTabs.map((row) => {
                return (
                  <div>
                    <button
                      onClick={() => {
                        setDataConfigForm(row);
                      }}
                    >
                      {row.tab}
                    </button>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 5,
              gridColumn: "2/5",
            }}
          >
            {/*Inquilino Persona fisica */}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 1 && (
                <SectionPersonalInformationTenant />
              )}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 6 && <SectionCurrentAddressTenant />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 3 && <SectionCurrentWorkTenant />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 4 && <SectionReferences />}
            {/*Inquilino Persona fisica */}

            {/*Inquilino Persona moral */}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 1 && (
                <SectionPersonalInformationTenantMoral />
              )}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 6 && <SectionCurrentAddressTenant />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 3 && <SectionCurrentWorkTenantMoral />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 1 &&
              dataConfigForm.idTab === 4 && <SectionReferences />}
            {/*Inquilino Persona moral */}

            {/*Propietario Persona fisica */}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 2 &&
              dataConfigForm.idTab === 1 && <SectionPersonalInformationOwner />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === false &&
              dataConfigForm.idCustomerType === 2 &&
              dataConfigForm.idTab === 6 && <SectionCurrentAddress />}
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
                <SectionPersonalInformationOwnerMoral />
              )}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 2 &&
              dataConfigForm.idTab === 6 && <SectionCurrentAddress />}
            {isEmpty(dataConfigForm) === false &&
              dataConfigForm.requiresEntInfo === true &&
              dataConfigForm.idCustomerType === 2 &&
              dataConfigForm.idTab === 2 && <SectionBankInformation />}
            {/*Propietario Persona moral */}
          </div>
        </div>
      </ContextProfile.Provider>
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
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileUsers);
