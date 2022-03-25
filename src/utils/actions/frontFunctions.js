import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { message } from "antd";
class FrontFunctions {
  parseFormatCurrency = (money, fraction, maxFraction) => {
    let resultNumber = "";
    if (isNil(money) === false) {
      const formatMoneyJson = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: fraction,
        maximumFractionDigits: maxFraction || 20,
      };
      const locale = "en-US";
      const moneyFormat = new Intl.NumberFormat(locale, formatMoneyJson);
      resultNumber = moneyFormat.format(money);
    }
    return resultNumber;
  };
  showMessageStatusApi = (text, status, position) => {
    const textMessage =
      isNil(text) === false
        ? text
        : "Error en el sistema, no se pudo ejecutar la petición";
    switch (status) {
      case "SUCCESS":
        message.success(textMessage, 10);
        break;
      case "ERROR":
        const errorDescription = document.getElementById("error-description");
        const errorDom = document.getElementById("error-message-api");
        const errorBtn = document.getElementById("btn-action-error-message");
        errorDom.style.left = "0px";
        errorDom.style.top = `100px`;
        errorDescription.innerText = textMessage;
        errorBtn.addEventListener("click", () => {
          errorDom.style.left = "-1000px";
          errorDescription.innerText = "";
          clearTimeout(myTimeout);
        });
        const myTimeout = setTimeout(() => {
          errorDom.style.left = "-1000px";
          errorDescription.innerText = "";
        }, 20000);
        // message.error(textMessage, 10);
        break;
      case "WARNING":
        message.warning(textMessage, 10);
        break;
      default:
        break;
    }
  };
  letterInitialName = (name) => {
    let nameInitial = "";
    if (isEmpty(name) === false) {
      nameInitial = name[0].toUpperCase();
    }
    return nameInitial;
  };
  parseUrlHomify = (str, id) => {
    const normalize = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const deleteComas = normalize.replace(/,/gi, "");
    const addGuion = deleteComas.replace(/ /gi, "-");
    const formatUrl = `https://www.homify.ai/propiedad/${addGuion}/${id}`;
    return formatUrl;
  };
  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  handlerGetOperationType = (data) => {
    const arrayData = isEmpty(data) == false ? JSON.parse(data) : [];
    let message = "";
    if (isEmpty(arrayData) === false) {
      const findCondition = arrayData.find((row) => {
        return row.queryCondition == 7;
      });
      if (isEmpty(findCondition) === false && findCondition.compValue == 1) {
        message = "renta";
      }
      if (isEmpty(findCondition) === false && findCondition.compValue == 2) {
        message = "venta";
      }
    }
    return message;
  };
}

export default FrontFunctions;
