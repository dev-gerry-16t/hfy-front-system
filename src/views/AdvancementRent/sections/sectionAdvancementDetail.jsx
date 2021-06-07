import React, { useState, useEffect } from "react";
import Magnifier from "react-magnifier";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import {
  Modal,
  Input,
  Checkbox,
  Row,
  Col,
  Select,
  Tabs,
  Timeline,
  Spin,
  Tooltip,
  Radio,
  Button,
  DatePicker,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import ENVIROMENT from "../../../utils/constants/enviroments";
import Show from "../../../assets/icons/Show.svg";

const { Option } = Select;
const { TabPane } = Tabs;

const SectionAdvancementDetail = (props) => {
  const {
    isModalVisible,
    onClose,
    dataDetailAdvancement,
    dataDetailTableAdvancement,
    dataStatus,
    onSendInformation,
    onGetDocument,
  } = props;

  const initialState = { idRequestAdvancePymtStatus: null };
  const [dataForm, setDataForm] = useState(initialState);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {isNil(content) === false ? content : "N/A"}
    </div>
  );

  useEffect(() => {
    if (isEmpty(dataDetailAdvancement) === false) {
      setDataForm(dataDetailAdvancement);
    }
  }, [dataDetailAdvancement]);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <div className="form-modal ">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              onClose();
              setDataForm(initialState);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Detalle de Adelanto</h1>
        </div>
        <div className="main-form-information">
          <p style={{ fontSize: 15 }}>Información general</p>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Select
                placeholder="Estatus"
                value={dataForm.idRequestAdvancePymtStatus}
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idRequestAdvancePymtStatus: value,
                  });
                }}
              >
                {isEmpty(dataStatus) === false &&
                  dataStatus.map((row) => {
                    return (
                      <Option
                        value={row.idRequestAdvancePymtStatus}
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
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem title="Contrato" content={dataForm.hfInvoice} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Fecha de solicitud"
                content={dataForm.requestedAT}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Solicitante/Propietario"
                content={dataForm.customerFullName}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Inquilino"
                content={dataForm.customerTenantFullName}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Rentas solicitadas"
                content={dataForm.advanceRentsRequested}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Monto de préstamo"
                content={dataForm.advanceRentsRequestedAmount}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Tasa de interés"
                content={dataForm.interestBase}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Interés moratorio"
                content={dataForm.interestArrearsBase}
              />
            </Col>
          </Row>
          {isNil(dataForm.idDocument) === false && (
            <Row>
              <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
                <DescriptionItem
                  title="Contrato de adelanto de renta"
                  content={
                    <Button
                      type="link"
                      size="small"
                      onClick={async () => {
                        try {
                          const {
                            idDocument,
                            idDocumentType,
                            idPreviousDocument,
                            bucketSource,
                            idRequestAdvancePymt,
                          } = dataForm;
                          await onGetDocument(idRequestAdvancePymt, {
                            idDocument,
                            idDocumentType,
                            idPreviousDocument,
                            bucketSource,
                          });
                        } catch (error) {}
                      }}
                    >
                      Descargar
                    </Button>
                  }
                />
              </Col>
            </Row>
          )}
          <p style={{ fontSize: 15 }}>Información bancaria</p>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Titular de la cuenta"
                content={dataForm.accountHolder}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem title="CLABE" content={dataForm.clabeNumber} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem title="Banco" content={dataForm.bankName} />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem title="Sucursal" content={dataForm.bankBranch} />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DescriptionItem
                title="Número de cuenta"
                content={dataForm.accountNumber}
              />
            </Col>
          </Row>
          <p style={{ fontSize: 15 }}>Tabla de amortización</p>
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
                <table
                  style={{
                    width: "100%",
                    fontFamily: "Poppins",
                    fontSize: "10px",
                  }}
                >
                  <tr>
                    <th>Pago</th>
                    <th>Fecha limite</th>
                    <th>Monto a pagar</th>
                    <th>Monto a interés</th>
                    {/* <th>Fecha del pago</th>
                      <th>Balance previo</th>
                      <th>Total a IVA</th> 
                    <th>Balance</th>*/}
                  </tr>
                  {isEmpty(dataDetailTableAdvancement) === false &&
                    dataDetailTableAdvancement.map((row) => {
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
                            {row.paydayLimit}
                          </td>
                          <td>{row.totalPaymentAmount}</td>
                          <td>{row.interestBaseAmount}</td>
                          {/* <td>{row.paydayLimit}</td>
                            <td>{row.previousBalance}</td>
                            <td>{row.taxBaseAmount}</td> 
                          <td>{row.outstandingBalanceAmount}</td>*/}
                        </tr>
                      );
                    })}
                </table>
              </div>
            </Col>
          </Row>
        </div>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={async () => {
              try {
                await onSendInformation(
                  {
                    idRequestAdvancePymtStatus:
                      dataForm.idRequestAdvancePymtStatus,
                  },
                  dataForm.idRequestAdvancePymt
                );
                setDataForm(initialState);
                onClose();
              } catch (error) {}
            }}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SectionAdvancementDetail;
