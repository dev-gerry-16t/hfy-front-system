import React, { useState, useEffect, useRef } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
import ReactPlayer from "react-player";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Checkbox,
  Radio,
  Slider,
} from "antd";
import SignatureCanvas from "react-signature-canvas";
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import Info from "../../../assets/icons/Info.svg";

const { Option } = Select;

const SectionDepositGuarantee = (props) => {
  const { isModalVisible, onClose, frontFunctions } = props;
  const [openSection, setOpenSection] = useState(1);
  const [valueSlider, setValueSlider] = useState(10000);
  const [radioCkecked, setRadioChecked] = useState({
    radio1: false,
    radio2: false,
    radio3: false,
  });

  const LoadingSpin = <SyncOutlined spin />;

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
      className="modal-signature-contract"
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              if (openSection === 1) {
                onClose();
              } else {
                setOpenSection(1);
              }
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>
            {openSection === 1 && "Oferta de póliza"}
            {openSection === 2 && "Calcular el monto"}
            {openSection === 3 && "¿Cómo funciona?"}
          </h1>
          {openSection === 1 && (
            <button
              className="chat-contract-icon"
              type="button"
              onClick={() => {
                setOpenSection(3);
              }}
              style={{ border: "1px solid #FF0282", borderRadius: "5px" }}
            >
              <span style={{ fontSize: 15 }}>?</span>
            </button>
          )}
        </div>
        <div className="main-form-information-guarantee">
          {openSection === 1 && (
            <div className="policy-information-modal">
              <span>
                <strong>Homify</strong> te ofrece una poliza para que no
                realices tu depòsito en garantía.
              </span>
              <div className="percentage-description">
                <div className="radio-percentage">
                  <Radio
                    checked={radioCkecked.radio1}
                    value={1}
                    onClick={() => {
                      setRadioChecked({
                        radio3: false,
                        radio2: false,
                        radio1: true,
                      });
                    }}
                  >
                    <strong>0% </strong>
                  </Radio>
                </div>
                <div className="description">
                  Poliza por 2 veces el valor de la renta en caso de
                  incumplimiento. <br />
                  Costo:2% mas iva mensual del valor de la renta.
                </div>
              </div>
              <div className="percentage-description">
                <div className="radio-percentage">
                  <Radio
                    checked={radioCkecked.radio2}
                    value={2}
                    onClick={() => {
                      setRadioChecked({
                        radio3: false,
                        radio2: true,
                        radio1: false,
                      });
                    }}
                  >
                    <strong>50%</strong>
                  </Radio>
                </div>
                <div className="description">
                  Pago del 50% del valor del deposito en garantía mas una poliza
                  por el 100% del valor de una renta.
                  <br />
                  Costo: 3% mas iva mensual del valor de una renta.
                </div>
              </div>
              <div className="percentage-description">
                <div className="radio-percentage">
                  <Radio
                    checked={radioCkecked.radio3}
                    value={3}
                    onClick={() => {
                      setRadioChecked({
                        radio3: true,
                        radio2: false,
                        radio1: false,
                      });
                    }}
                  >
                    <strong>100%</strong>
                  </Radio>
                </div>
                <div className="description">
                  Pago del deposito en garantía en su totalidad directamente al
                  propietario.
                  <br />
                  Costo: 4.5% mas iva mensual del valor de una renta.
                </div>
              </div>
            </div>
          )}
          {openSection === 2 && (
            <div className="value-calculator-policy">
              <div className="amount-rent-result">
                <p>Monto de renta</p>
                <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                  {frontFunctions.parseFormatCurrency(valueSlider)}
                </h3>
              </div>
              <div className="slider-percentage">
                <Slider
                  defaultValue={1}
                  value={valueSlider}
                  min={10000}
                  max={50000}
                  tooltipVisible={false}
                  onChange={(e) => {
                    setValueSlider(e);
                  }}
                />
              </div>
              <div className="calculate-percentage">
                <div className="percentage-description">
                  <div className="radio-percentage">
                    <Radio
                      checked={radioCkecked.radio1}
                      value={1}
                      onClick={() => {
                        setRadioChecked({
                          radio3: false,
                          radio2: false,
                          radio1: true,
                        });
                      }}
                    >
                      <strong>0% </strong>
                    </Radio>
                  </div>
                  <div className="description">
                    {frontFunctions.parseFormatCurrency(
                      valueSlider * 0.02,
                      2,
                      4
                    )}{" "}
                    + iva mensual
                  </div>
                </div>
                <div className="percentage-description">
                  <div className="radio-percentage">
                    <Radio
                      checked={radioCkecked.radio2}
                      value={2}
                      onClick={() => {
                        setRadioChecked({
                          radio3: false,
                          radio2: true,
                          radio1: false,
                        });
                      }}
                    >
                      <strong>50%</strong>
                    </Radio>
                  </div>
                  <div className="description">
                    {frontFunctions.parseFormatCurrency(
                      valueSlider * 0.03,
                      2,
                      4
                    )}{" "}
                    + iva mensual
                  </div>
                </div>
                <div className="percentage-description">
                  <div className="radio-percentage">
                    <Radio
                      checked={radioCkecked.radio3}
                      value={3}
                      onClick={() => {
                        setRadioChecked({
                          radio3: true,
                          radio2: false,
                          radio1: false,
                        });
                      }}
                    >
                      <strong>100%</strong>
                    </Radio>
                  </div>
                  <div className="description">
                    {frontFunctions.parseFormatCurrency(
                      valueSlider * 0.045,
                      2,
                      4
                    )}{" "}
                    + iva mensual
                  </div>
                </div>
              </div>
            </div>
          )}
          {openSection === 3 && (
            <div className="video-how-functionaly">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=5UBYS7DEiAk"
                width="100%"
                height="200px"
              />
            </div>
          )}
        </div>
        {openSection === 1 && (
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                setOpenSection(2);
              }}
            >
              <span>Calcular</span>
            </button>
            <button type="button" onClick={() => {}}>
              <span>¡Lo quiero!</span>
            </button>
          </div>
        )}
        {openSection === 2 && (
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Autorizar</span>
            </button>
          </div>
        )}
        {openSection === 3 && (
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Autorizar</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SectionDepositGuarantee;
