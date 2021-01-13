import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Timeline, Input, Row, Col, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const SectionRegisterPayment = () => {
  const initialDataForm = {
    paymentType: null,
    paymentAmount: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  return (
    <div className="main-content-tabs button-middle">
      <div className="content-messages-sections">
        <div className="section-history-messages">
          <Row style={{ marginBottom: "20px" }}>
            <Col span={24}>
              <Select
                placeholder="Tipo de pago"
                style={{ width: "100%" }}
                onChange={(value, option) => {
                  const configureOption = option.onClick();
                  setDataForm({
                    ...dataForm,
                    paymentType: value,
                  });
                }}
              >
                <Option value="1" onClick={() => {}}>
                  Comprobante de pago
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
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
                    paymentAmount: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
        </div>
        <div
          className="section-type-messages"
          style={{ width: "50%", height: "270px" }}
        >
          <div className="text-header">Evidencia</div>
          <div className="section-upload-files">
            <div className="section-upload-file">
              <label type="button" for="file-input" onClick={() => {}}>
                <span>Click para subir imagen</span>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/png, image/jpeg, image/jpg , image/gif"
                onChange={(e) => {
                  console.log("e.target.files", e.target.files[0]);
                }}
              />
            </div>
            <div className="section-upload-file">
              <label type="button" for="file-input-2" onClick={() => {}}>
                <span>Click para subir imagen</span>
              </label>
              <input
                id="file-input-2"
                type="file"
                accept="image/png, image/jpeg, image/jpg , image/gif"
                onChange={(e) => {
                  console.log("e.target.files", e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button-action-payment">
        <button type="button" onClick={() => {}}>
          <span>Registrar pago</span>
        </button>
      </div>
    </div>
  );
};

export default SectionRegisterPayment;
