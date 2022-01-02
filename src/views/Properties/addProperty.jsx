import React, { useEffect, useState } from "react";
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
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    padding: 1em 0px;
  }
`;

const AddProperty = (props) => {
  const { callGlobalActionApi, dataProfile, history, match } = props;
  const { params } = match;
  const idProperty =
    isNil(params.idProperty) === false ? params.idProperty : null;
  const [current, setCurrent] = useState(0);
  const [dataForm, setDataForm] = useState({});
  const [dataSaveImages, setDataSaveImages] = useState([]);
  const [dataSaveFeatures, setDataSaveFeatures] = useState({
    propertyAmenities: [],
    propertyGeneralCharacteristics: [],
  });
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

  const handlerCallGetPropertyById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idApartment: null,
          identifier: null,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      setDataForm(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    if (isNil(idProperty) === false) {
      handlerCallGetPropertyById();
    }
  }, []);

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
          idProperty={idProperty}
          onBackTo={() => {
            if (isNil(idProperty) === false && isEmpty(idProperty) === false) {
              history.push(`/websystem/detail-property-users/${idProperty}`);
            } else {
              history.push(`/websystem/dashboard-properties`);
            }
          }}
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
          idProperty={idProperty}
          onBackTo={() => {
            history.push(`/websystem/detail-property-users/${idProperty}`);
          }}
        />
      )}
      {current === 2 && (
        <SectionDataFeatures
          dataFormSave={dataForm}
          onClickBack={(data) => {
            setCurrent(1);
          }}
          onSaveData={(data, dataString) => {
            setDataSaveFeatures(data);
            setDataForm({ ...dataForm, ...dataString });
          }}
          dataSaveFeatures={dataSaveFeatures}
          onclickNext={(data) => {
            setDataForm({ ...dataForm, ...data });
            setCurrent(3);
          }}
          idProperty={idProperty}
          idApartment={
            isNil(dataForm.idApartment) === false ? dataForm.idApartment : null
          }
          onBackTo={() => {
            history.push(`/websystem/detail-property-users/${idProperty}`);
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
          dataFormSave={dataForm}
          onSaveImages={(arrayImages) => {
            setDataSaveImages(arrayImages);
          }}
          dataSaveImages={dataSaveImages}
          redirect={(id) => {
            history.push(`/websystem/detail-property-users/${id}`);
          }}
          idProperty={idProperty}
          idApartment={
            isNil(dataForm.idApartment) === false ? dataForm.idApartment : null
          }
          onBackTo={() => {
            history.push(`/websystem/detail-property-users/${idProperty}`);
          }}
          getById={() => {
            handlerCallGetPropertyById();
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
