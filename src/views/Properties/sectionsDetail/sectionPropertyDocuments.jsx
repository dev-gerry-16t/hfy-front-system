import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { IconTenant } from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";
import ComponentAddCandidate from "../component/componentAddCandidate";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import ComponentLoadSection from "../../../components/componentLoadSection";
import { GeneralCard } from "../constants/styleConstants";
import { ReactComponent as ArrowUp2 } from "../../../assets/iconSvg/svgFile/arrowUp2.svg";
import { ReactComponent as ArrowDown2 } from "../../../assets/iconSvg/svgFile/arrowDown2.svg";
import WidgetUploadDocument from "../component/widgetUploadDocument";

const SectionPropertyDocuments = (props) => {
  const { idUserType, callGlobalActionApi, dataProfile, getDocumentProperty } =
    props;
  const dataContexProperty = useContext(ContextProperty);
  const {
    dataDetail = {},
    dataDetailApplicants = [],
    getById,
    isOpenComponent,
    onCloseComponent,
    dataPropertyDocuments,
  } = dataContexProperty;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [toggleCard, setToggleCard] = useState({});
  const { idApartment, idProperty, canInviteTenant } = dataDetail;

  useEffect(() => {}, []);

  return isEmpty(dataPropertyDocuments) === false ? (
    <GeneralCard id="section-property-documents">
      <div className="header-title">
        <h1>Documentos de la propiedad</h1>
      </div>
      <ComponentLoadSection isLoadApi={isLoadApi} position="absolute" text="">
        <div className="content-cards" id="user-documents-property">
          <WidgetUploadDocument
            detail
            dataDocument={dataPropertyDocuments}
            handlerCallGetCustomerDocument={() => {
              getDocumentProperty();
            }}
          />
        </div>
      </ComponentLoadSection>
    </GeneralCard>
  ) : (
    <></>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionPropertyDocuments);
