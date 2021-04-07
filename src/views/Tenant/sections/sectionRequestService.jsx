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
  };

  const [dataForm, setDataForm] = useState(initialState);

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
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Solicitar Mudanza o Servicios</h1>
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
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                onClose();
                setDataForm(initialState);
              }}
            >
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await onSaveRequestService(dataForm);
                  onClose();
                  setDataForm(initialState);
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
