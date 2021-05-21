import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import {
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Slider,
  InputNumber,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import ArrowRightCircle from "../../../assets/icons/ArrowRightCircle.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import SubSectionSummary from "./subSectionSummary";

const { Option } = Select;

const SectionAdvancement = (props) => {
  const {
    isModalVisible,
    onClose,
    onClickAdvancement,
    spinVisible,
    dataTenant,
    dataBank,
    onCallAdvancePymtPlan,
    dataAdvancePymtInfo,
    dataAdvancePymtTable,
  } = props;
  const frontFunctions = new FrontFunctions();
  const initialDataForm = {
    text: null,
    currentRentFormat: "",
    advanceRents: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
    idContract: null,
    idBank: null,
    bankBranch: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [property, setProperty] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [inputMinValue, setInputMinValue] = useState(0);
  const [inputMaxValue, setInputMaxValue] = useState(0);
  const [viewSummary, setViewSummary] = useState(false);

  const LoadingSpin = <SyncOutlined spin />;

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
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
            <h1>Adelanto de renta</h1>
          </div>
          <div className="main-form-information">
            <p>
              Llena la siguiente información para solicitar un adelanto de renta
            </p>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Inquilino"
                  value={dataForm.text}
                  onChange={(value, option) => {
                    const dataSelect = option.onClick();
                    const valuesInput =
                      isNil(dataSelect.availableTerms) === false
                        ? JSON.parse(dataSelect.availableTerms)
                        : [];
                    setDataForm({
                      ...dataForm,
                      text: value,
                      currentRentFormat: dataSelect.currentRentAmount,
                      idContract: dataSelect.idContract,
                    });
                    setInputMinValue(
                      isEmpty(valuesInput) === false &&
                        isNil(valuesInput[0]) === false
                        ? valuesInput[0].id
                        : 0
                    );
                    setInputMaxValue(
                      isEmpty(valuesInput) === false &&
                        isNil(valuesInput[1]) === false
                        ? valuesInput[1].id
                        : 0
                    );
                  }}
                >
                  {isEmpty(dataTenant) === false &&
                    dataTenant.map((row) => {
                      return (
                        <Option
                          value={row.id}
                          onClick={() => {
                            return row;
                          }}
                        >
                          {row.fullName}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <NumberFormat
                  id={null}
                  customInput={Input}
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalPrecision={2}
                  allowNegative={false}
                  prefix="$"
                  suffix=""
                  disabled
                  value={dataForm.currentRentFormat}
                  className="inputLogin"
                  floatingLabelText=""
                  isVisible
                  toBlock={false}
                  disable={false}
                  placeholder="Monto de renta"
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataForm({
                      ...dataForm,
                      currentRentFormat: floatValue,
                    });
                  }}
                  onClick={(event) => {}}
                  onFocus={(event) => {}}
                  onBlur={(event) => {}}
                />
              </Col>
            </Row>
            {/* <Col
                span={13}
                xs={{ span: 24 }}
                md={{ span: 13 }}
                className="total-advancement-amount"
              >
                <SubSectionSummary
                  viewSummary={viewSummary}
                  onClickViewSummary={() => {
                    setViewSummary(!viewSummary);
                  }}
                  dataForm={dataForm}
                  frontFunctions={frontFunctions}
                />
              </Col> */}
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Rentas adelantadas"
                  value={dataForm.advanceRents}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, advanceRents: value });
                    setInputValue(inputMinValue);
                    onCallAdvancePymtPlan({
                      idContract: dataForm.idContract,
                      totalRentsRequested: value,
                      totalPeriod: inputMinValue,
                    });
                  }}
                >
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              </Col>
            </Row>
            <p>
              ¿En que plazo quieres pagar el préstamo del adelanto de renta?
            </p>
            <Row>
              <Col span={20}>
                <Slider
                  min={inputMinValue}
                  max={inputMaxValue}
                  disabled={
                    inputMinValue == 0 ||
                    inputMaxValue === 0 ||
                    isNil(dataForm.advanceRents) === true
                  }
                  onChange={(value) => {
                    setInputValue(value);
                    if (isNil(dataForm.advanceRents) === false) {
                      onCallAdvancePymtPlan({
                        idContract: dataForm.idContract,
                        totalRentsRequested: dataForm.advanceRents,
                        totalPeriod: value,
                      });
                    }
                  }}
                  value={typeof inputValue === "number" ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={inputMinValue}
                  max={inputMaxValue}
                  disabled={
                    inputMinValue == 0 ||
                    inputMaxValue === 0 ||
                    isNil(dataForm.advanceRents) === true
                  }
                  style={{ margin: "0 16px" }}
                  value={inputValue}
                  onChange={(value) => {
                    setInputValue(value);
                    if (isNil(dataForm.advanceRents) === false) {
                      onCallAdvancePymtPlan({
                        idContract: dataForm.idContract,
                        totalRentsRequested: dataForm.advanceRents,
                        totalPeriod: value,
                      });
                    }
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                className="total-advancement-amount"
              >
                <div className="content-amount">
                  <p>Monto total de adelanto</p>
                  <div>
                    <h2>
                      {isEmpty(dataAdvancePymtInfo) === false
                        ? dataAdvancePymtInfo.totalRentAmount
                        : "$ 0.00 MXN"}
                    </h2>
                  </div>
                </div>
                <span
                  style={{
                    display:
                      inputMinValue == 0 ||
                      inputMaxValue === 0 ||
                      isNil(dataForm.advanceRents) === true
                        ? "none"
                        : "block",
                  }}
                >
                  {isEmpty(dataAdvancePymtInfo) === false
                    ? dataAdvancePymtInfo.paymentDescription
                    : "$ 0.00 MXN"}
                  <img
                    src={ArrowRightCircle}
                    alt="backTo"
                    width="25"
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      position: "relative",
                      bottom: "2px",
                    }}
                    onClick={() => {
                      setViewSummary(!viewSummary);
                    }}
                  />
                </span>
              </Col>
            </Row>
            {viewSummary === true && (
              <Row>
                <Col
                  span={24}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  className="total-advancement-amount"
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p>Tabla de amortización</p>
                    <table
                      style={{
                        width: "100%",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            background: "#faebd7",
                            fontWeight: 600,
                          }}
                        >
                          Tasa de interés
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            border: "1px solid #faebd7",
                          }}
                        >
                          {isEmpty(dataAdvancePymtInfo) === false
                            ? dataAdvancePymtInfo.interestBase
                            : "0%"}
                        </th>
                      </tr>
                      <tr>
                        <th>No. de pago</th>
                        <th>Total del pago</th>
                        <th>Total a interés</th>
                        <th>Total a capital</th>
                        {/* <th>Fecha del pago</th>
                      <th>Balance previo</th>
                      <th>Total a IVA</th> */}
                        <th>Balance</th>
                      </tr>
                      {isEmpty(dataAdvancePymtTable) === false &&
                        dataAdvancePymtTable.map((row) => {
                          return (
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                {row.paymentNo}
                              </td>
                              <td
                                style={{
                                  background: "#faebd7",
                                  fontWeight: 600,
                                }}
                              >
                                {row.totalPaymentAmount}
                              </td>
                              <td>{row.interestBaseAmount}</td>
                              <td>{row.capitalAmount}</td>
                              {/* <td>{row.paydayLimit}</td>
                            <td>{row.previousBalance}</td>
                            <td>{row.taxBaseAmount}</td> */}
                              <td>{row.outstandingBalanceAmount}</td>
                            </tr>
                          );
                        })}
                    </table>
                  </div>
                </Col>
              </Row>
            )}
            {/* <p>Información bancaria</p>
            <Row>
              <Col span={24}>
                <Select
                  placeholder="Mis cuentas guardadas"
                  value={dataForm.accountSave}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, accountSave: value });
                  }}
                >
                  <Option value={1}>cuenta 1</Option>
                  <Option value={2}>cuenta 2</Option>
                  <Option value={3}>cuenta 3</Option>
                </Select>
              </Col>
            </Row>
            <p>Nueva cuenta</p>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.accountHolder}
                  placeholder={"Nombre"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      accountHolder: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.clabeNumber}
                  placeholder={"CLABE"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      clabeNumber: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.accountNumber}
                  placeholder={"Número de cuenta"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      accountNumber: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Select
                  placeholder="Banco"
                  showSearch
                  value={dataForm.idBank}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, idBank: value });
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {isEmpty(dataBank) === false &&
                    dataBank.map((row) => {
                      return <Option value={row.id}>{row.text}</Option>;
                    })}
                </Select>
              </Col>
            </Row>
           */}
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                onClickAdvancement(dataForm);
                setDataForm(initialDataForm);
              }}
            >
              <span>Solicitar adelanto</span>
            </button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionAdvancement;
