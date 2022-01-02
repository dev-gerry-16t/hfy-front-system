import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import isEmpty from "lodash/isEmpty";
import { Layout, Table, message } from "antd";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callPostPaymentServiceCard } from "../../../utils/actions/actions";
import { Payment } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import ComponentLoadSection from "../../../components/componentLoadSection";
import CustomSelect from "../../../components/CustomSelect";

const CardPayment = styled.div`
  min-width: 400px;
  padding: 0px 10px;
  .data-card {
    padding: 5px 6px;
    border-radius: 5px;
    border: 1px solid #d6d8e7;
  }
  .button-payment {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button {
      width: 250px;
      border-radius: 16px;
      padding: 3px 0px;
      background: var(--color-primary);
      border: none;
      color: #fff;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    min-width: auto;
  }
`;

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#6b7c93",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Poppins,Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "rgba(0, 0, 0, 0.2)",
        fontWeight: "600",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="data-card">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SectionCardPayment = (props) => {
  const { callPostPaymentServiceCard, dataProfile, dataPayment, onOkPayment } =
    props;

  const stripe = useStripe();
  const elements = useElements();
  const [errorsStripe, setErrorsStripe] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [labelErrors, setLabelErrors] = useState("");
  const [paymentCancel, setPaymentCancel] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [catalogPlansAvailable, setCatalogPlansAvailable] = useState({
    available: false,
    catalog: [],
    selectOption: {},
    showConfirm: false,
    selectId: null,
  });
  const [dataForm, setDataForm] = useState({ email: "", phone: "", name: "" });
  const frontFunctions = new FrontFunctions();

  const reset = () => {
    setErrorsStripe(null);
    setProcessing(false);
    setPaymentMethods(null);
    setDataForm({
      email: "",
      phone: "",
      name: "",
    });
  };

  const hanlderCallPostPaymentService = async (data, orderPayment) => {
    const { idSystemUser, idLoginHistory, idContract } = dataProfile;
    try {
      const response = await callPostPaymentServiceCard({
        ...data,
        idOrderPayment: orderPayment,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult = response.response.result;
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerConvertCatalog = (array) => {
    let catalog = [];
    if (isEmpty(array) === false) {
      catalog = array.map((row) => {
        return {
          ...row,
          text: `${row.label} por ${row.amountFormat}`,
          id: row.count,
        };
      });
    }
    return catalog;
  };

  const handlerConfirmRetrievePayment = async (data, orderPayment) => {
    const { idSystemUser, idLoginHistory, token, idContract } = dataProfile;
    try {
      const responseInfo = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_CONFIRM_RETRIEVE_PAYMENT_INTENT}`,
        {
          method: "POST",
          body: JSON.stringify({
            idOrderPayment: orderPayment,
            idSystemUser,
            idLoginHistory,
            paymentIntent: data.paymentIntent,
            clientSecret: data.clientSecret,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (isNil(responseInfo.status) === false && responseInfo.status !== 200) {
        throw isNil(responseInfo.statusText) === false
          ? responseInfo.statusText
          : "";
      }
      const resultInfo = await responseInfo.json();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerOnSendInfoPayment = async (orderPayment) => {
    if (!stripe || !elements) {
      return;
    }
    if (errorsStripe) {
      elements.getElement("card").focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: dataForm,
      });
      if (error) {
        setPaymentCancel(true);
        setLabelErrors(error.message);
        setProcessing(false);
      } else {
        const response = await hanlderCallPostPaymentService(
          {
            payment_method: paymentMethod.id,
            payment_method_types: ["card"],
          },
          orderPayment
        );
        if (response.requireAction === true) {
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            response.clientSecret
          );
          if (error) {
            onOkPayment(false, error.message);
          }
          if (paymentIntent.status === "succeeded") {
            await handlerConfirmRetrievePayment(
              {
                paymentIntent: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
              },
              orderPayment
            );
            onOkPayment(true, "");
          } else {
            onOkPayment(
              false,
              "Ocurrio un error al generar la orden del pago, intenta con otro método de pago."
            );
          }
        } else {
          if (
            isNil(response.catalog) === false &&
            isEmpty(response.catalog) === false
          ) {
            setCatalogPlansAvailable({
              available: true,
              catalog: handlerConvertCatalog(response.catalog),
              paymentIntent: response.paymentIntent,
              selectId: null,
            });
          } else {
            setPaymentMethods(paymentMethod);
            onOkPayment(true, "");
            setTimeout(() => {
              //redireccionar
            }, 5000);
          }
        }
        setProcessing(false);
      }
    } catch (error) {
      setProcessing(false);
    }
  };

  const handlerConfirmPayment = async (data, orderPayment) => {
    const { idSystemUser, idLoginHistory, token, idContract } = dataProfile;
    try {
      const responseInfo = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_CONFIRM_PAYMENT_INTENT}`,
        {
          method: "POST",
          body: JSON.stringify({
            idOrderPayment: orderPayment,
            idSystemUser,
            idLoginHistory,
            paymentIntent: data.paymentIntent,
            amount: data.amount,
            currency: data.currency,
            description: data.description,
            count: data.count,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (isNil(responseInfo.status) === false && responseInfo.status !== 200) {
        throw isNil(responseInfo.statusText) === false
          ? responseInfo.statusText
          : "";
      }
      const resultInfo = await responseInfo.json();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <ComponentLoadSection
      isLoadApi={processing}
      position="absolute"
      text="Procesando..."
    >
      <Payment>
        <div className="icon-method">
          <img
            src="https://homify-docs-users.s3.us-east-2.amazonaws.com/favicon-64.png"
            alt="icon-homify"
            width="45px"
          />
          <h1>Pago con Tarjeta</h1>
        </div>
        <CardPayment>
          {catalogPlansAvailable.available === false && (
            <>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.name}
                    placeholder="Nombre que aparece en la tarjeta *"
                    label=""
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, name: value });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.email}
                    placeholder="Correo *"
                    label=""
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, email: value });
                    }}
                    type="email"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.phone}
                    placeholder="Teléfono"
                    label=""
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, phone: value });
                    }}
                    type="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CardField
                    onChange={(e) => {
                      setErrorsStripe(e.error);
                      setCardComplete(e.complete);
                    }}
                  />
                </Col>
              </Row>
              <div className="button-payment">
                <button
                  onClick={() => {
                    handlerOnSendInfoPayment(dataPayment.idOrderPayment);
                  }}
                >
                  Pagar
                </button>
              </div>
            </>
          )}
          {catalogPlansAvailable.available === true && (
            <>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomSelect
                    value={catalogPlansAvailable.selectId}
                    placeholder=""
                    label="¿A cuantos plazos deseas realizar tu pago?"
                    data={catalogPlansAvailable.catalog}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value, rowMap) => {
                      setCatalogPlansAvailable({
                        ...catalogPlansAvailable,
                        selectOption: rowMap,
                        showConfirm: true,
                        selectId: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <div className="button-payment">
                <button
                  onClick={async () => {
                    try {
                      setProcessing(true);
                      await handlerConfirmPayment(
                        {
                          paymentIntent: catalogPlansAvailable.paymentIntent,
                          amount: catalogPlansAvailable.selectOption.amount,
                          currency: catalogPlansAvailable.selectOption.currency,
                          description:
                            catalogPlansAvailable.selectOption.description,
                          count: catalogPlansAvailable.selectOption.count,
                        },
                        dataPayment.idOrderPayment
                      );
                      setProcessing(false);
                      setPaymentMethods(true);
                      onOkPayment(true, "");
                    } catch (error) {
                      onOkPayment(
                        false,
                        "Ocurrio un error al generar la orden del pago, intenta con otro método de pago."
                      );

                      setProcessing(false);
                    }
                  }}
                >
                  Finalizar
                </button>
              </div>
            </>
          )}
        </CardPayment>
      </Payment>
    </ComponentLoadSection>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callPostPaymentServiceCard: (data) =>
    dispatch(callPostPaymentServiceCard(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionCardPayment);
