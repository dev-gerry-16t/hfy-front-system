import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NumberFormat from "react-number-format";
import isNil from "lodash/isNil";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { message, Spin } from "antd";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import Stripe from "../../../assets/icons/Stripe.svg";

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme, e, i, o) => {
  const widthScreen = window.screen.width;
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
      width: widthScreen < 450 ? 360 : 500,
    },
  };
});

const CustomCheckPayment = ({
  callPostPaymentServices,
  totalPolicy,
  totalPolicyFormat,
  onRedirect,
  dataProfile,
  idOrderPayment,
  stpPayment = null,
  clabe = null,
  bankName = null,
  accountHolder = null,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [dataForm, setDataForm] = useState({ email: "", phone: "", name: "" });
  const [errors, setErrors] = useState(null);
  const [labelErrors, setLabelErrors] = useState("");
  const [paymentCancel, setPaymentCancel] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [value, setValue] = useState(0);

  const classes = useStyles();
  const theme = useTheme();

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const LoadingSpin = (
    <div
      style={{
        top: "6em",
        position: "absolute",
        left: "0px",
        width: "100%",
      }}
    >
      <div className="circle-loader">
        <div className="checkmark draw"></div>
      </div>
      <br />
      <span>Procesando tu pago...</span>
    </div>
  );

  const hanlderCallPostPaymentService = async (data) => {
    const { idSystemUser, idLoginHistory, idContract } = dataProfile;
    try {
      const response = await callPostPaymentServices({
        ...data,
        idOrderPayment,
        idSystemUser,
        idLoginHistory,
        idContract,
      });
      const responseResult = response.response.result;
      return responseResult;
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
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

  const handleSubmitOxxo = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      const response = await hanlderCallPostPaymentService({
        payment_method: null,
        payment_method_types: ["oxxo"],
      });
      const resultOxxo = await stripe.confirmOxxoPayment(
        response.idClientSecret,
        {
          payment_method: {
            billing_details: {
              name: dataForm.name,
              email: dataForm.email,
            },
          },
        }
      );
      if (resultOxxo.error) {
        setPaymentCancel(true);
        setLabelErrors(resultOxxo.error.message);
      }
      setProcessing(false);
      setPaymentMethods(true);
      setTimeout(() => {
        onRedirect();
      }, 5000);
    } catch (error) {
      setProcessing(false);
      elements.getElement(CardElement).clear();
      setLabelErrors(
        "Tu banco rechazó la transacción, prueba con otra tarjeta o ponte en contacto con nosotros para saber otras alternativas de pago"
      );
      setPaymentCancel(true);
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
          setPaymentMethods(paymentMethod);
          setTimeout(() => {
            onRedirect();
          }, 5000);
        }
      }
    } catch (error) {
      elements.getElement(CardElement).clear();
      setLabelErrors(
        "Tu banco rechazó la transacción, prueba con otra tarjeta o ponte en contacto con nosotros para saber otras alternativas de pago"
      );
      setPaymentCancel(true);
      setProcessing(false);
    }
  };

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {
        showMessageStatusApi(
          "CLABE copiada correctamente",
          GLOBAL_CONSTANTS.STATUS_API.SUCCESS
        );
      },
      (err) => {}
    );
  };

  const parseNumberClabe = (num) => {
    let numClabe = "";
    if (isNil(num) === false) {
      const num1 = num.slice(0, 4);
      const num2 = num.slice(4, 8);
      const num3 = num.slice(8, 12);
      const num4 = num.slice(12, 16);
      const num5 = num.slice(16, 18);
      numClabe = `${num1} ${num2} ${num3} ${num4} ${num5}`;
    }
    return numClabe;
  };

  return paymentMethods ? (
    <div className="position-result-transaction">
      <h2 style={{ marginBottom: "25px", color: "var(--color-primary)" }}>
        {value === 0 ? "¡Gracias por tu pago!" : "¡Esperamos pronto tu pago!"}
      </h2>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          class="path circle"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          class="path check"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <span>
        {value === 0
          ? "Tu pago se realizó correctamente"
          : "Tu vale se generó correctamente"}
      </span>
    </div>
  ) : paymentCancel === false ? (
    <Spin indicator={LoadingSpin} spinning={processing}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Pago con Tarjeta" {...a11yProps(0)} />
            {totalPolicy <= 10000 && (
              <Tab label="Pago con OXXO" {...a11yProps(1)} />
            )}
            {isNil(stpPayment) === false && stpPayment === true && (
              <Tab label="Transferencia SPEI" {...a11yProps(2)} />
            )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
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
                <h2>{totalPolicyFormat}</h2>
              </div>
            </div>
            <form className="Form" onSubmit={handleSubmit}>
              <fieldset className="FormGroup">
                <Field
                  label="Nombre"
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
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
                  placeholder="tu_correo@correo.com"
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
              <SubmitButton
                processing={processing}
                error={errors}
                disabled={!stripe}
              >
                Pagar
              </SubmitButton>
            </form>
            <footer
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0px",
              }}
            >
              <div style={{ borderRight: "1px solid #a0a3bd", marginRight: 5 }}>
                <a
                  href="https://stripe.com/es-mx"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                  }}
                >
                  Powered by <img src={Stripe} width="33" height="15" />
                </a>
              </div>
              <div>
                <a
                  href="https://stripe.com/es-mx/checkout/legal"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                    marginRight: 5,
                  }}
                >
                  Condiciones
                </a>
                <a
                  href="https://stripe.com/es-mx/privacy"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                  }}
                >
                  Privacidad
                </a>
              </div>
            </footer>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
                <h2>{totalPolicyFormat}</h2>
              </div>
            </div>
            <form className="Form" onSubmit={handleSubmitOxxo}>
              <fieldset className="FormGroup">
                <Field
                  label="Nombre"
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
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
                  placeholder="tu_correo@correo.com"
                  required
                  autoComplete="email"
                  value={dataForm.email}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, email: e.target.value });
                  }}
                />
              </fieldset>
              {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
              <SubmitButton
                processing={processing}
                error={errors}
                disabled={!stripe}
              >
                Pagar con OXXO
              </SubmitButton>
            </form>
            <footer
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0px",
              }}
            >
              <div style={{ borderRight: "1px solid #a0a3bd", marginRight: 5 }}>
                <a
                  href="https://stripe.com/es-mx"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                  }}
                >
                  Powered by <img src={Stripe} width="33" height="15" />
                </a>
              </div>
              <div>
                <a
                  href="https://stripe.com/es-mx/checkout/legal"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                    marginRight: 5,
                  }}
                >
                  Condiciones
                </a>
                <a
                  href="https://stripe.com/es-mx/privacy"
                  target="_blank"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 10,
                    color: "#a0a3bd",
                  }}
                >
                  Privacidad
                </a>
              </div>
            </footer>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
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
                <h2>{totalPolicyFormat}</h2>
              </div>
            </div>
            <div className="banner-payment-rent">
              <div style={{ margin: "15px 0px" }}>
                <span style={{ color: "#000" }}>
                  1. Inicia una transferencia desde tu banca en línea o app de
                  tu banco.
                </span>
              </div>
              <div style={{ margin: "15px 0px" }}>
                <span style={{ color: "#000" }}>
                  2. Ingresa los siguientes datos:
                </span>
              </div>
              <div className="section-method-payment-v2">
                <div className="card-info-method">
                  <strong style={{ color: "#000" }}>
                    Nombre del beneficiario
                  </strong>
                  <span>{accountHolder}</span>
                </div>
              </div>
              <div className="section-method-payment-v2">
                <div className="card-info-method">
                  <strong style={{ color: "#000" }}>CLABE Interbancaria</strong>
                  <span id="interbank-clabe">{parseNumberClabe(clabe)}</span>
                </div>
                <div className="card-icon">
                  <i
                    className="fa fa-clone"
                    style={{
                      fontSize: 18,
                      color: "#6E7191",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      copyTextToClipboard(clabe);
                    }}
                  />
                </div>
              </div>
              <div
                className="section-method-payment-v2"
                style={{
                  borderBottom: "1px solid #d6d8e7",
                }}
              >
                <div className="card-info-method">
                  <strong style={{ color: "#000" }}>Banco</strong>
                  <span>{bankName}</span>
                </div>
              </div>
              <div style={{ margin: "15px 0px" }}>
                <span style={{ color: "#000" }}>
                  3. Ingresa el monto a pagar y finaliza la operación. Puedes
                  guardar tu comprobante de pago o una captura de pantalla en
                  caso de requerir alguna aclaración.
                </span>
              </div>
              {/* <div style={{ margin: "15px 0px" }}>
              <strong>
                Nota: Para que tu pago sea procesado el mismo dia, realizalo en
                un horario de 6 A.M. a 6 P.M.
              </strong>
            </div> */}
              <div style={{ margin: "15px 0px", textAlign: "center" }}>
                <strong style={{ color: "#000" }}>
                  ¡Listo! Finalmente recibirás una notificación por tu pago
                </strong>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
    </Spin>
  ) : (
    <div className="position-result-transaction">
      <h2 style={{ marginBottom: "25px", color: "var(--color-primary)" }}>
        No fue posible realizar el pago
      </h2>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          class="path circle"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <line
          class="path line"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="34.4"
          y1="37.9"
          x2="95.8"
          y2="92.3"
        />
        <line
          class="path line"
          fill="none"
          stroke="#D06079"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="95.8"
          y1="38"
          x2="34.4"
          y2="92.2"
        />
      </svg>
      <span style={{ textAlign: "center", marginBottom: 10 }}>
        {labelErrors}
      </span>
      <div className="Form">
        <button
          className="SubmitButton"
          style={{ width: "100%" }}
          type="button"
          onClick={() => {
            setPaymentCancel(false);
          }}
        >
          Intentar con nueva tarjeta
        </button>
      </div>
    </div>
  );
};

export default CustomCheckPayment;
