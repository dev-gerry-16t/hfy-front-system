import React from "react";
import { Avatar, Rate, Skeleton, Button, Menu, Dropdown } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import { UserOutlined } from "@ant-design/icons";
import IconArroRight from "../../../assets/icons/arrowRight.svg";
import EmptyTenant from "../../../assets/icons/tenantEmpty.svg";

moment.locale("es");

const SectionCardTenant = (props) => {
  const {
    history,
    tenantCoincidences,
    finishCallApis,
    onClickSendInvitation,
    onOpenContract,
    dataCustomer,
    onViewDocument,
    onUpdateInvitation,
  } = props;

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
        <span>Inquilinos</span>
        {isEmpty(dataCustomer) === false &&
          (dataCustomer.canInviteTendant === 1 ||
            dataCustomer.canInviteTendant === true) && (
            <div className="button_init_primary">
              <button
                type="button"
                onClick={() => {
                  onClickSendInvitation();
                }}
              >
                <span>Invitar Inquilino</span>
              </button>
            </div>
          )}
      </div>
      <div className="section-information-renters">
        {isEmpty(tenantCoincidences) === false &&
          finishCallApis === true &&
          tenantCoincidences.map((row) => {
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
                    <strong>{row.shortName}</strong>
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
                      Próximo Pago:{" "}
                      <strong>{formatDate(row.nextPayment)}</strong>
                    </div>
                    <div>
                      Monto de Renta: <strong>{row.rentAmount}</strong>
                    </div>

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
      {isEmpty(tenantCoincidences) === true && finishCallApis === true && (
        <div className="empty-tenants">
          <img src={EmptyTenant} alt="" />
          <span>Aun no tienes inquilinos registrados</span>
        </div>
      )}
    </div>
  );
};

export default SectionCardTenant;
