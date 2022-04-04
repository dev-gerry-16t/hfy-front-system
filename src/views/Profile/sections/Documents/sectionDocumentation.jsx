import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
} from "../../constants/styleConstants";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import WidgetUploadDocument from "../../widget/widgetUploadDocument";

const SectionDocumentation = (props) => {
  const { callGlobalActionApi, dataProfile, onclickBack, onclickNext } = props;
  const [dataDocument, setDataDocument] = useState([]);
  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { identifier, type, matchParams, history, idCustomerOwner } =
    dataContexProfile;

  const handlerCallGetCustomerDocument = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
          identifier,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DOCUMENT
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocument(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerDocument();
  }, []);

  return (
    <ContentForm>
      {isNil(matchParams) === false && (
        <div className="back-button">
          <button
            onClick={() => {
              history.push("/websystem/profile");
            }}
          >
            <Arrow width="25px" />
          </button>
        </div>
      )}
      <div className="header-title">
        <h1>Documentación</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor adjunta los documentos correspondientes.</span>
            </Col>
          </Row>
        </div>
        <WidgetUploadDocument
          handlerCallGetCustomerDocument={() => {
            handlerCallGetCustomerDocument();
          }}
          dataDocument={dataDocument}
          type={type}
        />
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            paddingBottom: "0.5em",
          }}
        >
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>
                Antes de continuar por favor verifica que tus documentos sean
                correctos.
              </span>
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onclickBack();
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                onclickNext();
              } catch (error) {}
            }}
          >
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>

    //   <h1>Documentos</h1>
    //   <div>3 estados de cuenta</div>
    //   <div>Carta laboral</div>
    //   <button onClick={() => {}}>Guardar</button>
    // </div>
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
)(SectionDocumentation);
