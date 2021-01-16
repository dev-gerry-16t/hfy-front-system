import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
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
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
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
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [property, setProperty] = useState(null);
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
                <Row>
                  <Select
                    placeholder="Inquilino"
                    value={dataForm.text}
                    onChange={(value, option) => {
                      const dataSelect = option.onClick();
                      setDataForm({
                        ...dataForm,
                        text: value,
                        currentRentFormat: dataSelect.currentRentAmount,
                        idContract: dataSelect.idContract,
                      });
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
                </Row>
                <Row>
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
                </Row>
                <Row>
                  <Select
                    placeholder="Rentas adelantadas"
                    value={dataForm.advanceRents}
                    onChange={(value, option) => {
                      setDataForm({ ...dataForm, advanceRents: value });
                    }}
                  >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                  </Select>
                </Row>
              </Col>
              <Col
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
              </Col>
            </Row>
            <p>Información bancaria</p>
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
