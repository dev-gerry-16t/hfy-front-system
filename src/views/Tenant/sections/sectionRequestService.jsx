import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Radio,
  Button,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import "moment/locale/es";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const SectionRequestService = (props) => {
  const {
    isVisibleModal,
    onClose,
    dataProviders,
    frontFunctions,
    onSaveRequestService,
  } = props;
  const initialState = {
    idProvider: null,
    scheduleDate: null,
    budgeAmount: null,
    observations: "",
  };

  const [dataForm, setDataForm] = useState(initialState);
  const [dataTC, setDataTC] = useState("");
  const [aceptTerms, setAceptTerms] = useState(false);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isVisibleModal}
      closable={false}
      footer={false}
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              onClose();
              setDataTC("");
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Solicitar Mudanza</h1>
        </div>
        <div className="main-form-information">
          <p>Selecciona un Proveedor</p>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Select
                placeholder="Proveedor"
                value={dataForm.idProvider}
                onChange={(value, option) => {
                  const onClickValue = option.onClick();
                  setDataForm({
                    ...dataForm,
                    idProvider: value,
                    budgeAmount: onClickValue.budgeAmount,
                  });
                  setDataTC(onClickValue.tc);
                }}
              >
                {isEmpty(dataProviders) === false &&
                  dataProviders.map((row) => {
                    return (
                      <Option
                        value={row.idProvider}
                        onClick={() => {
                          return row;
                        }}
                      >
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <p>Ingresa la fecha y hora de la mudanza o servicio</p>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <DatePicker
                value={
                  isNil(dataForm.scheduleDate) === false
                    ? moment(dataForm.scheduleDate, "YYYY-MM-DDTHH:mm:ss")
                    : null
                }
                placeholder="Programado para"
                onChange={(momentFormat, date) => {
                  setDataForm({
                    ...dataForm,
                    scheduleDate: moment(momentFormat).format(
                      "YYYY-MM-DDTHH:mm:ss"
                    ),
                  });
                }}
                showTime={{
                  defaultValue: moment("00:00:00", "HH:mm:ss"),
                }}
                format="DD MMMM YYYY HH:mm"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <label
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "Poppins",
                }}
              >
                Observaciones
              </label>
              <textarea
                style={{
                  outline: "none",
                  border: "1px solid #d9d9d9",
                  width: "100%",
                  minHeight: 100,
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                }}
                placeholder="Puedes indicar aquí instrucciones de llegada a tu domicilio, cómo referencias. Si tu mudanza no cumple con los términos y condiciones puedes indicar el detalle de tu mudanza y con gusto realizamos una cotización personalizada.Puedes indicar aquí instrucciones de llegada a tu domicilio, cómo referencias. Si tu mudanza no cumple con los términos y condiciones puedes indicar el detalle de tu mudanza y con gusto realizamos una cotización personalizada."
                value={dataForm.observations}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    observations: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <p>Costo del Servicio</p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <h1 style={{ margin: 0 }}>
              {isNil(dataForm.budgeAmount) === false
                ? frontFunctions.parseFormatCurrency(dataForm.budgeAmount, 2)
                : "$0.00"}
            </h1>
            <strong style={{ marginBottom: 5, marginLeft: 5 }}>MXN</strong>
          </div>
          {isEmpty(dataTC) === false && (
            <>
              <div
                style={{
                  margin: "20px 0px",
                  maxHeight: "250px",
                  overflowY: "scroll",
                  fontSize: 12,
                  fontFamily: "Poppins",
                }}
                dangerouslySetInnerHTML={{
                  __html: dataTC,
                }}
              />
              <div
                style={{
                  marginBottom: 25,
                }}
              >
                <Checkbox
                  checked={aceptTerms}
                  onChange={(e) => {
                    setAceptTerms(e.target.checked);
                  }}
                ></Checkbox>
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  Acepto los términos y condiciones del servicio
                </span>
              </div>
            </>
          )}

          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                onClose();
                setDataTC("");
                setDataForm(initialState);
                setAceptTerms(false);
              }}
            >
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              className={aceptTerms === true ? "" : "disabled"}
              onClick={async () => {
                try {
                  if (aceptTerms === true) {
                    await onSaveRequestService(dataForm);
                    onClose();
                    setDataTC("");
                    setDataForm(initialState);
                    setAceptTerms(false);
                  }
                } catch (error) {}
              }}
            >
              <span>Solicitar</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SectionRequestService;
