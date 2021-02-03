import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
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
  Radio,
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionBankInfo = (props) => {
  const { onClickBack, onClickFinish, dataBank } = props;
  const initialForm = {
    idBank: null,
    idBankText: null,
    bankBranch: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
    contractAvailabilityAt: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  return (
    <div className="content-typeform-formulary">
      <h3>Información Bancaria</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select
                placeholder="Banco"
                showSearch
                value={dataForm.idBank}
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idBank: value,
                    idBankText: option.children,
                  });
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {isEmpty(dataBank) === false &&
                  dataBank.map((row) => {
                    return <Option value={row.id}>{row.text}</Option>;
                  })}
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.bankBranch}
                placeholder={"Sucursal"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    bankBranch: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                value={dataForm.accountHolder}
                placeholder={"A nombre de"}
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
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <Input
                value={dataForm.accountNumber}
                placeholder={"Numero de cuenta"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    accountNumber: e.target.value,
                  });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
              <Input
                value={dataForm.clabeNumber}
                placeholder={"Clave interbancaria"}
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
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DatePicker
                value={
                  isNil(dataForm.contractAvailabilityAt) === false
                    ? moment(dataForm.contractAvailabilityAt, "YYYY-MM-DD")
                    : null
                }
                placeholder="Fecha de firma de contrato"
                onChange={(momentFormat, date) => {
                  setDataForm({
                    ...dataForm,
                    contractAvailabilityAt: moment(momentFormat).format(
                      "YYYY-MM-DD"
                    ),
                  });
                }}
                format="DD MMMM YYYY"
              />
            </Col>
          </Row>
          <div className="button_actions">
            <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClickFinish(dataForm);
              }}
              className="button_primary"
            >
              <span>Finalizar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionBankInfo;
