import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Radio,
  message,
} from "antd";
import { SyncOutlined, CloseOutlined } from "@ant-design/icons";
import GLOBAL_CONSTANTS from "../utils/constants/globalConstants";
import { callPostPaymentService } from "../utils/actions/actions";
import Arrow from "../assets/icons/Arrow.svg";

const { Option } = Select;

const stripePromise = loadStripe(
  "pk_test_51IiP07KoHiI0GYNakthTieQzxatON67UI2LJ6UNdw8TM2ljs9lHMXuw5a6E2gWoHARTMdH9X4KiMZPdosbPyqscq00dAVe9bPd"
);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#6b7c93",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#000",
      },
      "::placeholder": {
        color: "#d9e1eb",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  CustomNumber,
  format,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    {CustomNumber === true ? (
      <NumberFormat
        id={id}
        format={format}
        allowNegative={false}
        prefix=""
        suffix=""
        value={value}
        className="FormRowInput"
        floatingLabelText=""
        isVisible
        required={required}
        autoComplete={autoComplete}
        toBlock={false}
        disable={false}
        placeholder={placeholder}
        onValueChange={onChange}
        onClick={(event) => {}}
        onFocus={(event) => {}}
        onBlur={(event) => {}}
      />
    ) : (
      <input
        className="FormRowInput"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const MyCustomCheck = ({ isModalVisible, callPostPaymentServices }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [dataForm, setDataForm] = useState({ email: "", phone: "", name: "" });
  const [errors, setErrors] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(null);

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const hanlderCallPostPaymentService = async (data) => {
    try {
      const response = await callPostPaymentServices(data);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (errors) {
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

      setProcessing(false);

      if (error) {
        setErrors(error);
      } else {
        await hanlderCallPostPaymentService({
          payment_method: paymentMethod.id,
          amount: 10000,
          description: "Pago de Póliza",
        });
        setPaymentMethods(paymentMethod);
      }
    } catch (error) {}
  };

  const reset = () => {
    setErrors(null);
    setProcessing(false);
    setPaymentMethods(null);
    setDataForm({
      email: "",
      phone: "",
      name: "",
    });
  };

  useEffect(() => {
    if (isModalVisible === false) {
      reset();
      elements.getElement(CardElement).clear();
    }
  }, [isModalVisible]);

  return paymentMethods ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethods.id}
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Nombre"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={dataForm.name}
          onChange={(e) => {
            setDataForm({ ...dataForm, name: e.target.value });
          }}
        />
        <Field
          label="Correo"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={dataForm.email}
          onChange={(e) => {
            setDataForm({ ...dataForm, email: e.target.value });
          }}
        />
        <Field
          label="Teléfono"
          id="phone"
          type="tel"
          placeholder="55-52-98-99"
          required
          autoComplete="tel"
          value={dataForm.phone}
          format="+52 (##) ##-##-##-##"
          mask=""
          onChange={(e) => {
            const { formattedValue, value, floatValue } = e;
            setDataForm({ ...dataForm, phone: floatValue });
          }}
          CustomNumber={true}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setErrors(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={errors} disabled={!stripe}>
        Pagar
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const CustomPaymentModal = (props) => {
  const {
    isModalVisible,
    onClose,
    spinVisible,
    callPostPaymentService,
  } = props;
  const [visiblePayment, setVisiblePayment] = useState(true);
  const LoadingSpin = <SyncOutlined spin />;

  useEffect(() => {
    if (isModalVisible === true) {
      setVisiblePayment(true);
    }
  }, [isModalVisible]);
  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
                setVisiblePayment(false);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Realizar Pago</h1>
          </div>
          <div className="main-form-information">
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <div className="checkout-payment-hfy">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="https://homify-docs-users.s3.us-east-2.amazonaws.com/favicon-64.png"
                    alt="homify"
                    width="45"
                    style={{
                      borderRadius: "50%",
                      boxShadow: "0px 2px 5px 3px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
                <div className="price-policy-amount">
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      marginBottom: 5,
                      color: "#0a2540",
                    }}
                  >
                    Monto a pagar
                  </p>
                  <div>
                    <h2>$ 1,000.00</h2>
                    <strong>MXN</strong>
                    <span style={{ marginLeft: 5 }}> + IVA 16%</span>
                  </div>
                </div>
                <MyCustomCheck
                  isModalVisible={visiblePayment}
                  callPostPaymentServices={callPostPaymentService}
                />
              </div>
            </Elements>
          </div>
        </div>
      </Spin>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaymentModal);
