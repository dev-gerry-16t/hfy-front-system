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
import ComponentPublicProperty from "./component/componentPublicProperty";

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
  const idCustomerOwner =
    isNil(params.idCustomer) === false ? params.idCustomer : null;
  const [current, setCurrent] = useState(0);
  const [dataForm, setDataForm] = useState({});
  const [dataSaveImages, setDataSaveImages] = useState([]);
  const [dataSites, setDataSites] = useState([]);
  const [dataSaveThumb, setDataSaveThumb] = useState({});
  const [visiblePublicProperty, setVisiblePublicProperty] = useState(false);

  const [dataSaveFeatures, setDataSaveFeatures] = useState({
    propertyAmenities: [],
    propertyGeneralCharacteristics: [],
  });
  const frontFunctions = new FrontFunctions();

  const handlerCallUpdateProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.PROPERTY.UPDATE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
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

  const handlerCallAddPropertyV2 = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
        API_CONSTANTS.PROPERTY.ADD_PROPERTY_V2,
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

  const handlerCallGetPropertyPictures = async () => {
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
        API_CONSTANTS.CUSTOMER.GET_PROPERTY_PICTURES
      );
      const apartmentDocuments =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];

      return { apartmentDocuments: JSON.stringify(apartmentDocuments) };
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      return {};
    }
  };

  const handlerCallGetAmenitiesByProperty = async () => {
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
        API_CONSTANTS.CUSTOMER.GET_AMENITIES_BY_PROPERTY
      );
      const responseResult =
        isEmpty(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      const propertyAmenities =
        isNil(responseResult) === false &&
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isEmpty(responseResult[0]) === false
          ? responseResult[0]
          : [];
      const propertyGeneralCharacteristics =
        isNil(responseResult) === false &&
        isEmpty(responseResult) === false &&
        isNil(responseResult[1]) === false &&
        isEmpty(responseResult[1]) === false
          ? responseResult[1]
          : [];
      return {
        propertyAmenities: JSON.stringify(propertyAmenities),
        propertyGeneralCharacteristics: JSON.stringify(
          propertyGeneralCharacteristics
        ),
      };
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      return {};
    }
  };

  const handlerCallGetPropertyById = async (id = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty: isNil(id) === false ? id : idProperty,
          idApartment: null,
          identifier: null,
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.PROPERTY.GET_PROPERTY_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      const amenities = await handlerCallGetAmenitiesByProperty();
      const apartmentDocuments = await handlerCallGetPropertyPictures();
      setDataForm({ ...responseResult, ...amenities, ...apartmentDocuments });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllSites = async (id = null, id2 = null) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty: id,
          idApartment: id2,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_SITES
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataSites(responseResult);
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

  useEffect(() => {
    const elementDad = document.getElementById("add-property-user");
    elementDad.scrollTop = 0;
  }, [current]);

  return (
    <Content id="add-property-user">
      <ComponentPublicProperty
        isModalVisible={visiblePublicProperty}
        dataSites={dataSites}
        onPublicProperty={async (data, id) => {
          try {
            await handlerCallUpdateProperty(data, id);
          } catch (error) {
            throw error;
          }
        }}
        detailPublicProperty={{}}
        onClose={() => {
          setVisiblePublicProperty(false);
          history.push(
            `/websystem/detail-property-users/${dataForm.idProperty}`
          );
        }}
        dataDetail={dataForm}
        history={history}
        labelButton="Mantener privado"
      />
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
          onSaveData={(data) => {
            setDataForm({ ...dataForm, ...data });
          }}
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
              if (isNil(idCustomerOwner) === false) {
                history.push(`/websystem/userType-detail/${idCustomerOwner}`);
              } else {
                history.push(`/websystem/dashboard-properties`);
              }
            }
          }}
          params={params}
        />
      )}
      {current === 1 && (
        <SectionDataLocation
          dataFormSave={dataForm}
          onSaveData={(data) => {
            setDataForm({ ...dataForm, ...data });
          }}
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
          params={params}
          getById={() => {
            handlerCallGetPropertyById();
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
          params={params}
          getById={() => {
            handlerCallGetPropertyById();
          }}
        />
      )}
      {current === 3 && (
        <SectionDataImages
          params={params}
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
          onSaveImagesThumb={(data) => {
            setDataSaveThumb(data);
          }}
          dataSaveImages={dataSaveImages}
          dataSaveThumb={dataSaveThumb}
          redirect={async (id, id1) => {
            try {
              await handlerCallGetAllSites(id, id1);
              await handlerCallGetPropertyById(id);
              setVisiblePublicProperty(true);
            } catch (error) {}
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
