import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import CustomSelect from "../../components/CustomSelect";
import ContextProfile from "./context/contextProfile";
import SectionBankInformation from "./sections/sectionBankInformation";
import SectionCurrentAddress from "./sections/sectionCurrentAddress";
import SectionCurrentWork from "./sections/sectionCurrentWork";
import SectionPersonalInformation from "./sections/sectionPersonalInformation";
import SectionReferences from "./sections/sectionReferencies";

const EditProfileUsers = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [dataUserType, setDataUserType] = useState(null);
  const [dataCustomerDetail, setDataCustomerDetail] = useState({});

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

  useEffect(() => {
    handlerCallGetCustomerData();
  }, []);

  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      <CustomSelect
        value={dataUserType}
        placeholder=""
        label="Tipo de Usuario"
        data={[
          {
            id: 1,
            text: "Inquilino persona fisica",
          },
          {
            id: 2,
            text: "Inquilino persona moral",
          },
          {
            id: 3,
            text: "Propietario persona fisica",
          },
          {
            id: 4,
            text: "Propietario persona moral",
          },
        ]}
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataUserType(value);
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
        }}
      >
        <ContextProfile.Provider
          value={{
            dataCustomerDetail,
            dataUserType,
          }}
        >
          <SectionPersonalInformation />
          <SectionCurrentAddress />
          <SectionCurrentWork />
          <SectionBankInformation />
          <SectionReferences />
        </ContextProfile.Provider>
      </div>
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
