import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Skeleton,
  Table,
  Tag,
  Button,
  Popover,
  Row,
  Col,
  Select,
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import {
  UserOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IconOwner from "../../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../../assets/icons/wallet.svg";
import IconActivity from "../../../assets/icons/activity.svg";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import Arrow from "../../../assets/icons/Arrow.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");
const { Option } = Select;

const SectionCardOwner = (props) => {
  const {
    history,
    tenantCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onAddUser,
    onOpenDetail,
  } = props;

  const [openPopover, setOpenPopover] = useState({});
  const [selectPolicy, setSelectPolicy] = useState(null);

  const columns = [
    {
      title: "Propietario",
      dataIndex: "nameOwner",
      key: "nameOwner",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Propietario", 1);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Inquilino",
      dataIndex: "nameTenant",
      key: "nameTenant",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Inquilino", 2);
          }}
          style={{ color: "gray" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Asesor",
      dataIndex: "adviser",
      key: "adviser",
      render: (text) => (
        <a
          onClick={() => {
            onOpenDetail("Asesor", 3);
          }}
          style={{ color: "brown" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Contrato",
      dataIndex: "contractStatus",
      key: "contractStatus",
      align: "center",
      render: (status, record) => {
        return (
          <span>
            <Tag color={record.colorContract} key="1">
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Folio",
      dataIndex: "numberContract",
      key: "numberContract",
    },
    {
      title: "Poliza",
      dataIndex: "policyType",
      key: "policyType",
    },
    {
      title: "Vencimiento de contrato",
      dataIndex: "dateContractEnd",
      key: "dateContractEnd",
      align: "center",
    },
    {
      title: "Estatus de poliza",
      dataIndex: "statusPolicy",
      key: "statusPolicy",
      align: "center",
      render: (status, record) => {
        let component = <div />;
        const contractStatus = record.contractStatus;
        if (status === true && contractStatus !== "DECLINADO") {
          component = (
            <div>
              <Popover
                visible={
                  isNil(openPopover[`popover-${record.key}`]) === false
                    ? openPopover[`popover-${record.key}`]
                    : false
                }
                content={
                  <>
                    <Row style={{ marginBottom: 10 }}>
                      <Col span={24}>
                        <Select
                          placeholder="Poliza por"
                          onChange={(value, option) => {}}
                          style={{ width: "100%" }}
                        >
                          <Option value={1} onClick={() => {}}>
                            Primera vez
                          </Option>
                          <Option value={2} onClick={() => {}}>
                            Renovación
                          </Option>
                          <Option value={2} onClick={() => {}}>
                            Cancelaciòn
                          </Option>
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6} />
                      <Col span={12}>
                        <Button
                          type="primary"
                          shape="round"
                          icon={<CheckOutlined />}
                          size="small"
                          className="color-green"
                        >
                          Cerrar
                        </Button>
                      </Col>
                      <Col span={6} />
                    </Row>
                  </>
                }
                title={
                  <div>
                    <span>Asignar cierre de Poliza</span>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenPopover({
                          [`popover-${record.key}`]: false,
                        });
                      }}
                      style={{
                        marginLeft: 5,
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                }
                trigger="click"
              >
                <Button
                  type="primary"
                  shape="round"
                  icon={<CheckSquareOutlined />}
                  size="small"
                  onClick={() => {
                    setOpenPopover({
                      [`popover-${record.key}`]: true,
                    });
                  }}
                >
                  Asignar
                </Button>
              </Popover>
            </div>
          );
        } else if (status === false && contractStatus !== "DECLINADO") {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className="fa fa-handshake-o" aria-hidden="true" />
                </span>
              }
              color="#00bb2d"
            >
              Cerrado
            </Tag>
          );
        } else if (contractStatus === "DECLINADO") {
          component = (
            <Tag
              icon={
                <span className="anticon">
                  <i className="fa fa-ban" aria-hidden="true" />
                </span>
              }
              color="#ff0000"
            >
              Declinada
            </Tag>
          );
        }
        return component;
      },
    },
  ];

  const data = [
    {
      key: "1",
      nameOwner: "Carlos Gutierrez",
      nameTenant: "Sebastian Perez",
      contractStatus: "VIGENTE",
      colorContract: "green",
      numberContract: "59029488",
      policyType: "Homify Basica",
      dateContractEnd: "25/01/2022",
      adviser: "Angel Cortez",
      statusPolicy: false,
    },
    {
      key: "2",
      nameOwner: "Pedro Saldaña",
      nameTenant: "Joaquin Mendez",
      contractStatus: "EN PROCESO",
      colorContract: "blue",
      numberContract: "N/A",
      policyType: "N/A",
      dateContractEnd: "N/A",
      adviser: "Angel Avendaño",
      statusPolicy: true,
    },
    {
      key: "3",
      nameOwner: "Jose Manriquez",
      nameTenant: "Alberto Ortiz",
      contractStatus: "POR CONCLUIR",
      colorContract: "orange",
      numberContract: "34874792",
      policyType: "Homify Premium",
      dateContractEnd: "03/02/2021",
      adviser: "Francisco Ortega",
      statusPolicy: true,
    },
    {
      key: "4",
      nameOwner: "Julian Vazquez",
      nameTenant: "Oscar Velazquez",
      contractStatus: "DECLINADO",
      colorContract: "red",
      numberContract: "34874793",
      policyType: "Homify Renta Segura",
      dateContractEnd: "06/02/2021",
      adviser: "Francisco Ortega",
      statusPolicy: true,
    },
  ];

  const formatDate = (date) => {
    let dateFormat = "";
    if (date !== "NA") {
      dateFormat = moment(date, "DD/MM/YYYY").format("DD MMMM YYYY");
    } else {
      dateFormat = date;
    }
    return dateFormat;
  };

  return (
    <div className="renter-card-information total-width">
      <div className="title-cards flex-title-card">
        <span>Usuarios</span>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={() => {
              onAddUser();
            }}
          >
            <span>Agregar</span>
          </button>
        </div>
      </div>
      <div className="section-information-renters">
        <Table columns={columns} dataSource={data} />
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes propietarios</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardOwner;
