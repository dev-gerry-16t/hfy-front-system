import React, { useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import CustomStepsHomify from "../../components/customStepsHomify";
import SectionDataFeatures from "./sections/dataFeatures";
import SectionDataImages from "./sections/dataImages";
import SectionDataLocation from "./sections/dataLocation";
import SectionDataProperty from "./sections/dataProperty";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const AddProperty = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;

  const [current, setCurrent] = useState(0);
  const [dataForm, setDataForm] = useState({});
  const frontFunctions = new FrontFunctions();

  const handlerCallAddPropertyV2 = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.ADD_PROPERTY_V2,
        "PUT"
      );
      return response.response;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <Content>
      <CustomStepsHomify
        steps={[
          { style: "fa fa-home", tab: "Datos de propiedad" },
          { style: "fa fa-map-marker", tab: "Ubicación" },
          { style: "fa fa-star-o", tab: "Características" },
          { style: "fa fa-picture-o", tab: "Agregar fotos" },
        ]}
        onClick={(ix, record) => {
          setCurrent(ix);
        }}
        current={current}
      />
      {current === 0 && (
        <SectionDataProperty
          dataFormSave={dataForm}
          onclickNext={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(1);
          }}
          idUserType={dataProfile.idUserType}
        />
      )}
      {current === 1 && (
        <SectionDataLocation
          dataFormSave={dataForm}
          onClickBack={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(0);
          }}
          onclickNext={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(2);
          }}
        />
      )}
      {current === 2 && (
        <SectionDataFeatures
          dataFormSave={dataForm}
          onClickBack={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(1);
          }}
          onclickNext={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(3);
          }}
        />
      )}
      {current === 3 && (
        <SectionDataImages
          onClickBack={() => {
            setCurrent(2);
          }}
          onClickFinish={async () => {
            try {
              const response = await handlerCallAddPropertyV2(dataForm);
              return response;
            } catch (error) {
              throw error;
            }
          }}
          redirect={() => {
            history.push("/websystem/dashboard-properties");
          }}
        />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
