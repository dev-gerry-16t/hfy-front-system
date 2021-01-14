import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import { Timeline, Input, Row, Col, Select, Upload, Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Delete from "../../../assets/icons/Delete.svg";
import PicturesWall from "./customUploadFile";
import SubSectionSummary from "./subSectionSummary";

const { TextArea } = Input;
const { Option } = Select;

const SectionRegisterPayment = (props) => {
  const {
    dataPayments,
    onRegisterPayment,
    spinVisible,
    onGetDocuments,
  } = props;
  const initialDataForm = {
    idIncidence: null,
    idPaymentType: null,
    paymentDate: null,
    amount: "",
    advancingRents: null,
    documents: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [dataSummary, setDataSummary] = useState({});
  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);

  const LoadingSpin = <SyncOutlined spin />;

  const handlerSelectAmont = (data) => {
    const { isForAdavancingRent, isForCurrentRent, currentRent, amount } = data;
    let amoutData = "";
    if (isForAdavancingRent === false && isForCurrentRent === false) {
      amoutData = "";
    } else if (isForAdavancingRent === false && isForCurrentRent === true) {
      amoutData = amount;
    } else if (isForAdavancingRent === true && isForCurrentRent === false) {
      amoutData = currentRent;
    }
    return amoutData;
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
  };

  return (
    <div className="main-content-tabs button-middle">
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="content-messages-sections">
          <div className="section-history-messages">
            <Row style={{ marginBottom: "20px" }}>
              <Col span={24}>
                <Select
                  placeholder="Tipo de pago"
                  style={{ width: "100%" }}
                  onChange={(value, option) => {
                    const configureOption = option.onClick();
                    const informationSummary =
                      isNil(configureOption.interestArrearsDescription) ===
                      false
                        ? JSON.parse(
                            configureOption.interestArrearsDescription
                          )[0]
                        : {};
                    const amountPayable = handlerSelectAmont(configureOption);
                    setDataForm({
                      ...dataForm,
                      idPaymentType: value,
                      amount: amountPayable,
                    });
                    setDataSummary(informationSummary);
                  }}
                >
                  {isEmpty(dataPayments) === false &&
                    dataPayments.map((row) => {
                      return (
                        <Option
                          value={row.idPaymentType}
                          onClick={() => {
                            return row;
                          }}
                        >
                          {row.paymentType}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={24}>
                {isEmpty(dataSummary) === false ? (
                  <div className="total-advancement-amount">
                    <p>Monto</p>
                    <div>
                      <h2>{dataSummary.totalAmountFormat}</h2>
                    </div>
                  </div>
                ) : (
                  <NumberFormat
                    id={null}
                    style={{ borderRadius: "8px" }}
                    customInput={Input}
                    thousandSeparator=","
                    decimalSeparator="."
                    decimalPrecision={2}
                    allowNegative={false}
                    prefix="$"
                    suffix=""
                    value={dataForm.amount}
                    className="inputLogin"
                    floatingLabelText=""
                    isVisible
                    toBlock={false}
                    placeholder="Monto"
                    onValueChange={(values) => {
                      const { formattedValue, value, floatValue } = values;
                      setDataForm({
                        ...dataForm,
                        amount: floatValue,
                      });
                    }}
                    onClick={(event) => {}}
                    onFocus={(event) => {}}
                    onBlur={(event) => {}}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <SubSectionSummary dataSummary={dataSummary} />
              </Col>
            </Row>
          </div>
          <div
            className="section-type-messages"
            style={{ width: "50%", height: "280px" }}
          >
            <div className="text-header">Evidencia</div>
            <div className="section-upload-files">
              <div className="section-upload-file">
                <PicturesWall fileList={fileList} handleChange={handleChange} />
              </div>
              <div className="section-upload-file">
                <PicturesWall
                  handleChange={handleChange1}
                  fileList={fileList1}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="button-action-payment">
          <button
            type="button"
            onClick={() => {
              const documents = [...fileList, ...fileList1];
              onGetDocuments(documents, dataForm);
              setDataForm(initialDataForm);
              // onRegisterPayment(dataForm);
            }}
          >
            <span>Registrar pago</span>
          </button>
        </div>
      </Spin>
    </div>
  );
};

export default SectionRegisterPayment;
