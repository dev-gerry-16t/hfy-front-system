import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import isEmpty from "lodash/isEmpty";
import { Layout, Table, message } from "antd";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callPostPaymentService } from "../../../utils/actions/actions";
import { Payment } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const CardPayment = styled.div`
  min-width: 400px;
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
  const { callPostPaymentService, dataProfile } = props;
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

  const hanlderCallPostPaymentService = async (data) => {
    const { idSystemUser, idLoginHistory, idContract } = dataProfile;
    try {
      const response = await callPostPaymentService({
        ...data,
        // idOrderPayment,
        idSystemUser,
        idLoginHistory,
        // idContract,
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

  const handlerOnSendInfoPayment = async () => {
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
        const response = await hanlderCallPostPaymentService({
          payment_method: paymentMethod.id,
          payment_method_types: ["card"],
        });
        setProcessing(false);
        if (response.status === "requires_action") {
          reset();
          elements.getElement(CardElement).clear();
          setLabelErrors(
            "Tu banco rechazó la transacción, prueba con otra tarjeta o ponte en contacto con nosotros para saber otras alternativas de pago"
          );
          setPaymentCancel(true);
        } else {
          if (
            isNil(response.catalog) === false &&
            isEmpty(response.catalog) === false
          ) {
            setCatalogPlansAvailable({
              available: true,
              catalog: response.catalog,
              paymentIntent: response.paymentIntent,
            });
          } else {
            setPaymentMethods(paymentMethod);
            setTimeout(() => {
              //redireccionar
            }, 5000);
          }
        }
      }
    } catch (error) {}
  };

  return (
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
          <button onClick={handlerOnSendInfoPayment}>Pagar</button>
        </div>
      </CardPayment>
    </Payment>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionCardPayment);
