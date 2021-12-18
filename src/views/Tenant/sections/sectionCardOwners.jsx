import React, { useState, useRef } from "react";
import { Avatar, Rate, Skeleton, Button, Menu, Dropdown, Popover } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { UserOutlined } from "@ant-design/icons";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardOwners = (props) => {
  const {
    history,
    ownerCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onOpenContract = () => {},
    dataCustomer,
    onViewDocument = () => {},
    onUpdateInvitation = () => {},
    onForgiveInterest = () => {},
    onOpenDetailPayment = () => {},
  } = props;
  const [visiblePopover, setVisiblePopover] = useState(false);
  const popUp = useRef(null);
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
    <div className="renter-card-information">
      <div className="title-cards flex-title-card">
        <span>Propietarios</span>
      </div>
      <div className="section-information-renters">
        {isEmpty(ownerCoincidences) === false &&
          finishCallApis === true &&
          ownerCoincidences.map((row) => {
            return (
              <div className="data-renter-info">
                <div className="box-info-user">
                  <div className="avatar-user">
                    {isNil(row.profileThumbnail) === false ? (
                      <Avatar size={50} src={row.profileThumbnail} />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                  </div>
                  <div className="info-user">
                    <strong>{row.fullName}</strong>
                    <div style={{ display: "flex" }}>
                      <Rate
                        style={{
                          fontSize: "15px",
                          position: "relative",
                          bottom: "5px",
                        }}
                        tooltips={[]}
                        onChange={() => {}}
                        value={row.ratingRate}
                      />
                      <div style={{ position: "relative", marginLeft: 2 }}>
                        <strong style={{ fontSize: 12, position: "absolute" }}>
                          {row.ratingRate}
                        </strong>
                      </div>
                    </div>
                    {row.canSignContract === true ? (
                      <div
                        className="status-payment-contract"
                        onClick={() => {
                          onOpenContract(row);
                        }}
                      >
                        <span>Contrato disponible</span>
                      </div>
                    ) : (
                      <div
                        className="status-payment"
                        style={{
                          background: row.customerStatusStyle,
                          opacity: "0.5",
                          color: "black",
                        }}
                      >
                        <span>{row.customerStatus}</span>
                      </div>
                    )}
                  </div>
                  <div className="info-user-payment">
                    {isNil(row.canRequestResend) === false &&
                      row.canRequestResend === true && (
                        <div style={{ marginBottom: 10 }}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={
                              <span className="anticon">
                                <i className="fa fa-paper-plane-o" />
                              </span>
                            }
                            size="small"
                            style={{
                              background: "rgb(28, 227, 255)",
                              border: "none",
                            }}
                            onClick={async () => {
                              try {
                                await onUpdateInvitation(
                                  {
                                    requestResend: true,
                                    isActive: true,
                                  },
                                  row.idInvitation
                                );
                              } catch (error) {}
                            }}
                          >
                            Enviar recordatorio
                          </Button>
                        </div>
                      )}
                    {isNil(row.canDeleteInvitation) === false &&
                      row.canDeleteInvitation === true && (
                        <div style={{ marginBottom: 10 }}>
                          <Button
                            type="primary"
                            shape="round"
                            icon={
                              <span className="anticon">
                                <i className="fa fa-trash" />
                              </span>
                            }
                            size="small"
                            style={{ background: "red", border: "none" }}
                            onClick={async () => {
                              try {
                                await onUpdateInvitation(
                                  {
                                    requestResend: false,
                                    isActive: false,
                                  },
                                  row.idInvitation
                                );
                              } catch (error) {}
                            }}
                          >
                            Eliminar invitación
                          </Button>
                        </div>
                      )}
                    <div>
                      Próximo Pago: <strong>{row.nextPaymentAt}</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>{row.currentRent}</strong>
                    </div>
                    <div>
                      Interés Acumulado: <strong>{row.interestAmount}</strong>
                    </div>
                    {row.canForgiveInterest === true && (
                      <div>
                        <Popover
                          content={
                            <div
                              style={{
                                fontFamily: "Poppins",
                                width: 300,
                              }}
                            >
                              ¿Estás seguro que deseas condonar los intereses a
                              tu inquilino <strong>{row.shortName}</strong> por
                              un monto de{" "}
                              <strong>{row.totalInterestAmountFormat}</strong>?
                              <div
                                style={{ textAlign: "center", marginTop: 15 }}
                              >
                                <Button
                                  type="primary"
                                  shape="round"
                                  size="small"
                                  style={{
                                    background: "var(--color-primary)",
                                    border: "none",
                                  }}
                                  onClick={async () => {
                                    try {
                                      await onForgiveInterest(
                                        {
                                          idCustomer: row.idCustomer,
                                          idCustomerTenant:
                                            row.idCustomerTenant,
                                        },
                                        row.idContract
                                      );
                                      popUp.current.onClick();
                                    } catch (error) {}
                                  }}
                                >
                                  Aceptar
                                </Button>
                              </div>
                            </div>
                          }
                          title="Condonar interés"
                          trigger="click"
                          ref={popUp}
                          // visible={visiblePopover}
                          // onVisibleChange={() => {
                          //   setVisiblePopover(!visiblePopover);
                          // }}
                        >
                          <Button
                            type="primary"
                            shape="round"
                            icon={
                              <span className="anticon">
                                <i className="fa fa-usd" />
                              </span>
                            }
                            size="small"
                            style={{ background: "#1CE3FF", border: "none" }}
                            onClick={async () => {
                              // setVisiblePopover(true);
                            }}
                          >
                            Condonar interés
                          </Button>
                        </Popover>
                      </div>
                    )}

                    {isNil(row.infoContractDocument) === false &&
                      isEmpty(row.infoContractDocument) === false && (
                        <Dropdown
                          overlay={
                            <Menu onClick={() => {}}>
                              <Menu.Item key="0">
                                <a
                                  onClick={() => {
                                    const parseData = JSON.parse(
                                      row.infoContractDocument
                                    );
                                    onViewDocument(parseData[0]);
                                  }}
                                  style={{ marginRight: 10 }}
                                >
                                  Contrato
                                </a>
                              </Menu.Item>
                              <Menu.Item key="1">
                                <a
                                  onClick={() => {
                                    const parseData = JSON.parse(
                                      row.infoPolicyDocument
                                    );
                                    onViewDocument(parseData[0]);
                                  }}
                                  style={{ marginRight: 10 }}
                                >
                                  Póliza
                                </a>
                              </Menu.Item>
                              <Menu.Item key="2">
                                <a
                                  onClick={() => {
                                    const parseData = JSON.parse(
                                      row.infoPaymentDocument
                                    );
                                    onViewDocument(parseData[0]);
                                  }}
                                  style={{ marginRight: 10 }}
                                >
                                  Pagarés
                                </a>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <a>Ver Documentos</a>
                        </Dropdown>
                      )}
                  </div>
                  {row.hasAdvancePymt === true && (
                    <div className="info-action-payment-rent">
                      <Button
                        type="primary"
                        shape="round"
                        icon={
                          <span className="anticon">
                            <i className="fa fa-credit-card" />
                          </span>
                        }
                        size="small"
                        style={{
                          background: "var(--color-primary)",
                          border: "none",
                        }}
                        onClick={async () => {
                          const parseObject =
                            isNil(row.infoRequestAdvancePymt) === false
                              ? JSON.parse(row.infoRequestAdvancePymt)
                              : {};
                          onOpenDetailPayment(parseObject);
                        }}
                      >
                        Pagar préstamo
                      </Button>
                    </div>
                  )}
                </div>
                <div className="button-collapse">
                  {isNil(row.canSeeTenantDetail) === false &&
                    row.canSeeTenantDetail === true && (
                      <button
                        type="button"
                        onClick={() => {
                          history.push(
                            `/websystem/dashboard-owner/tenant/${row.idCustomerTenant}`
                          );
                        }}
                      >
                        Detalle
                        <img src={IconArroRight} alt="arrow-right" width="15" />
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        {finishCallApis === false && <Skeleton loading active />}
      </div>
      {isEmpty(ownerCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aún no estas postulado en alguna propiedad</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardOwners;
