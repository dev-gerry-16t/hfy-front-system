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
  showMessageStatusApi = (text, status) => {
    const textMessage =
      isNil(text) === false
        ? text
        : "Error en el sistema, no se pudo ejecutar la petición";
    switch (status) {
      case "SUCCESS":
        message.success(textMessage, 10);
        break;
      case "ERROR":
        message.error(textMessage, 10);
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
}

export default FrontFunctions;
