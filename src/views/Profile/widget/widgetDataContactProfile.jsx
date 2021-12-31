import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import ContextProfile from "../context/contextProfile";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../constants/styleConstants";
import {
  IconDelete,
  IconEditSquare,
  IconEye,
  IconStar,
} from "../../../assets/iconSvg";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { isNil } from "lodash";

const Input = styled.input`
  padding: 5px 6px;
  border-radius: 0px;
  background: ${(props) => props.background};
  border-top: 1px solid #b9bbc7;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #b9bbc7;
  outline: none;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  width: 200px;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
  }
  &:hover {
  }
  &::placeholder {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 845px) {
    width: 100px;
  }
  @media screen and (max-width: 640px) {
    width: 200px;
  }
  @media screen and (max-width: 420px) {
    width: 100px;
  }
`;

const Select = styled.select`
  padding: 5px 6px;
  border-radius: ${(props) =>
    props.left ? "5px 0px 0px 5px" : "0px 5px 5px 0px"};
  border-right: ${(props) => (props.left ? "none" : "1px solid #d6d8e7")};
  border-left: ${(props) => (props.left ? "1px solid #d6d8e7" : "none")};
  background: rgba(255, 0, 131, 0.2);
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  outline: none;
  color: #4e4b66;
  font-weight: 700;
  width: 100px;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border: 1px solid #b9bbc7;
  }
  &:hover {
    border: 1px solid #b9bbc7;
  }
  &::placeholder {
    font-weight: 100;
  }
  @media screen and (max-width: 845px) {
    width: 70px;
  }
  @media screen and (max-width: 640px) {
    width: 80px;
  }
  @media screen and (max-width: 320px) {
    width: 70px;
  }
`;

const CardContactProfile = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  border: 1px solid gray;
  width: 100%;
  .add-contact-profile {
    padding: 1em 0px;
  }
  .select-type-contact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1em 0px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    div:first-child {
      border-right: 2px solid black;
    }
  }
  .section-code-verification {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .input-code-verification {
      width: 100%;
    }
    .action-buttons-confirmation {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding-bottom: 25px;
      button:first-child {
        padding: 2px 5px;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
        font-size: 12px;
      }
      button:last-child {
        padding: 2px 5px;
        border: none;
        background: #fff;
        border-radius: 16px;
        color: var(--color-primary);
        font-weight: 600;
        font-size: 12px;
      }
    }
  }
  .type-table-contact {
    .row-contact {
      padding: 1em;
      display: flex;
      justify-content: space-between;
      .data-contact {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .buttons-verification-contact {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .row-contact-main {
      padding: 1em;
      display: flex;
      justify-content: space-between;
      background-color: var(--color-primary);
      color: #fff;
      font-weight: 600;
    }
    .row-contact:nth-child(odd) {
      background-color: #eff0f6;
    }
    .row-contact:hover {
      background-color: #ddd;
    }
  }

  @media screen and (max-width: 420px) {
    .section-code-verification {
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;
      .action-buttons-confirmation {
        padding-bottom: 0px;
      }
    }

    .type-table-contact {
      .row-contact {
        padding: 1em 5px;
        .data-contact {
          font-size: 12px;
        }
      }
    }
  }
  @media screen and (max-width: 360px) {
    .type-table-contact {
      .row-contact {
        .data-contact {
          flex-wrap: wrap;
          .buttons-verification-contact {
          }
        }
      }
    }
  }
  @media screen and (max-width: 320px) {
    .type-table-contact {
      .row-contact {
        .data-contact {
          .buttons-verification-contact {
            justify-content: flex-start;
          }
        }
      }
    }
  }
`;

const ButtonHeader = styled.button`
  background: transparent;
  border: none;
`;

const SelectOption = styled.div`
  span {
    color: ${(props) => (props.select ? "var(--color-primary)" : "#4E4B66")};
    font-weight: 600;
    text-decoration: ${(props) => (props.select ? "underline" : "none")};
  }
`;

const SectionAddContact = styled.div`
  .poster-text {
    color: #4e4b66;
    margin-left: 2em;
    font-weight: 400;
  }
  .close-section {
    display: flex;
    justify-content: right;
    padding: 0px 1em;
    margin-bottom: 10px;
  }
  .input-button-add {
    padding: 0px 0.5em;
    display: grid;
    column-gap: 1em;
    grid-template-columns: 1.8fr 1.5fr;
    .input-add {
      display: flex;
      align-items: center;
    }
    .button-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      button {
        padding: 5px 1em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
    }
    .button-add-phone {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        padding: 5px 1em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .input-button-add-phone {
    padding: 0px 0.5em;
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-template-columns: 1.8fr 1.5fr;
    .input-add {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      button {
        padding: 5px 1em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
    }
    .button-add-phone {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        padding: 5px 1em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
    }
  }

  @media screen and (max-width: 560px) {
    font-size: 12px;
    .input-button-add-phone {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .input-add {
        width: 100%;
      }
      .button-add {
      }
    }
  }
  @media screen and (max-width: 420px) {
    .input-button-add {
      display: flex;
      flex-direction: column;
      .input-add-email {
      }
      .button-add {
      }
    }
    .poster-text {
      margin-left: 5px;
    }
  }
`;

const ButtonVerification = styled.span`
  color: #fff;
  font-size: 12px;
  background: transparent;
  .verification-action {
    border-radius: 5px;
    padding: 3px;
    box-shadow: 0px 0px 21px 5px rgba(205, 213, 219, 0.6);
    background: ${(props) =>
      props.verification === true ? "#46E6FD" : "var(--color-primary)"};
  }
  .verification-action-now {
    border-radius: 5px;
    padding: 3px;
    box-shadow: 0px 0px 21px 5px rgba(205, 213, 219, 0.6);
    background: ${(props) =>
      props.verification === true ? "#46E6FD" : "var(--color-primary)"};
  }
  .verification-icon {
    display: none;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${(props) =>
        props.verification === true ? "#46E6FD" : "var(--color-primary)"};
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 420px) {
    .verification-action {
      display: none;
    }
    .verification-icon {
      display: block;
    }
  }
`;

const WidgetDataContactProfile = (props) => {
  const { dataEmail, dataPhoneNumber, dataProfile, callGlobalActionApi } =
    props;
  const [selectOption, setSelectOption] = useState(1);
  const [isOpenAddPhone, setIsOpenAddPhone] = useState(false);
  const [isOpenAddMail, setIsOpenAddMail] = useState(false);
  const [isOpenDetailPhone, setIsOpenDetailPhone] = useState({});
  const [dataPhoneTypes, setDataPhoneTypes] = useState([]);
  const [dataCountryPhone, setDataCountryPhone] = useState([]);
  const [isOpenDetailMail, setIsOpenDetailMail] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({
    idPhoneType: null,
    idCounry: null,
    phoneNumber: null,
  });
  const [emailAddress, setEmailAddress] = useState(null);
  const [phoneNumberDetail, setPhoneNumberDetail] = useState({});
  const [emailAddressDetail, setEmailAddressDetail] = useState({});
  const dataContexProfile = useContext(ContextProfile);
  const { getById } = dataContexProfile;
  const frontFunctions = new FrontFunctions();

  const handlerCallSetCustomerEmailAddress = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_EMAIL_ADDRESS,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetCustomerPhoneNumber = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_PHONE_NUMBER,
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetAllCountries = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.GET_ALL_COUNTRIES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataCountryPhone(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPhoneTypes = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PHONE_TYPES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPhoneTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    if (isEmpty(dataEmail) === false) {
      let infoStatesEmail = {};
      let infoDataStatesEmail = {};
      dataEmail.forEach((element) => {
        infoStatesEmail = {
          ...infoStatesEmail,
          [element.idEmailAddress]: false,
        };
        infoDataStatesEmail = {
          ...infoDataStatesEmail,
          [element.idEmailAddress]: "",
        };
      });
      setIsOpenDetailMail(infoStatesEmail);
      setEmailAddressDetail(infoDataStatesEmail);
    }
    if (isEmpty(dataPhoneNumber) === false) {
      let infoStatesPhone = {};
      let infoDataStatesPhone = {};
      dataPhoneNumber.forEach((element) => {
        infoStatesPhone = {
          ...infoStatesPhone,
          [element.idPhoneNumber]: false,
        };
        infoDataStatesPhone = {
          ...infoDataStatesPhone,
          [element.idPhoneNumber]: "",
        };
      });
      setIsOpenDetailPhone(infoStatesPhone);
      setPhoneNumberDetail(infoDataStatesPhone);
    }
  }, [dataEmail, dataPhoneNumber]);

  useEffect(() => {
    handlerCallGetAllCountries();
    handlerCallGetAllPhoneTypes();
  }, []);

  return (
    <>
      <h1 className="subtitle-card">Datos de contacto</h1>
      <p>
        Podrás inciar sesión con cualquiera de los medios de contacto que hayas
        verificado.
      </p>
      <CardContactProfile>
        <div className="select-type-contact">
          <SelectOption
            select={selectOption === 1}
            onClick={() => {
              setSelectOption(1);
              setIsOpenAddPhone(false);
            }}
          >
            <span>Correos</span>
          </SelectOption>
          <SelectOption
            select={selectOption === 2}
            onClick={() => {
              setSelectOption(2);
              setIsOpenAddMail(false);
            }}
          >
            <span>Teléfonos</span>
          </SelectOption>
        </div>
        <div className="type-table-contact">
          {/* Correos electrónicos */}
          {isEmpty(dataEmail) === false &&
            selectOption === 1 &&
            dataEmail.map((row) => {
              return (
                <div className="row-contact">
                  {isOpenDetailMail[row.idEmailAddress] === false && (
                    <div className="data-contact">
                      <u>{row.emailAddress}</u>
                      <div className="buttons-verification-contact">
                        {row.requiresVerification == true ? (
                          <ButtonHeader
                            onClick={async () => {
                              try {
                                await handlerCallSetCustomerEmailAddress({
                                  requiresVerificationCode: true,
                                  idEmailAddress: row.idEmailAddress,
                                });
                                setIsOpenDetailMail({
                                  ...isOpenDetailMail,
                                  [row.idEmailAddress]:
                                    !isOpenDetailMail[row.idEmailAddress],
                                });
                              } catch (error) {}
                            }}
                          >
                            <ButtonVerification verification={false}>
                              <div className="verification-action-now">
                                Verificar
                              </div>
                            </ButtonVerification>
                          </ButtonHeader>
                        ) : (
                          <ButtonVerification verification={true}>
                            <div className="verification-action">
                              Verificado
                            </div>
                            <div className="verification-icon">
                              <div>
                                <i className="fa fa-check"></i>
                              </div>
                            </div>
                          </ButtonVerification>
                        )}
                        <ButtonHeader
                          onClick={async () => {
                            await handlerCallSetCustomerEmailAddress({
                              isMain: true,
                              idEmailAddress: row.idEmailAddress,
                            });
                            getById();
                          }}
                        >
                          <IconStar
                            color="var(--color-primary)"
                            backGround={
                              row.isMain === true
                                ? "var(--color-primary)"
                                : "transparent"
                            }
                            size="15px"
                          />
                        </ButtonHeader>
                        <ButtonHeader
                          onClick={async () => {
                            try {
                              await handlerCallSetCustomerEmailAddress({
                                isActive: false,
                                idEmailAddress: row.idEmailAddress,
                              });
                              getById();
                            } catch (error) {}
                          }}
                        >
                          <IconDelete
                            color="var(--color-primary)"
                            size="15px"
                          />
                        </ButtonHeader>
                      </div>
                    </div>
                  )}
                  {isOpenDetailMail[row.idEmailAddress] === true && (
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="section-code-verification">
                        <div className="input-code-verification">
                          <CustomInputTypeForm
                            value={emailAddressDetail[row.idEmailAddress]}
                            placeholder="Código de confirmación"
                            label=""
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setEmailAddressDetail({
                                ...emailAddressDetail,
                                [row.idEmailAddress]: value,
                              });
                            }}
                            type="email"
                            background="#fff"
                          />
                        </div>
                        <div className="action-buttons-confirmation">
                          <button
                            onClick={async () => {
                              try {
                                await handlerCallSetCustomerEmailAddress({
                                  idEmailAddress: row.idEmailAddress,
                                  code: emailAddressDetail[row.idEmailAddress],
                                });
                                getById();
                                setIsOpenDetailMail({
                                  ...isOpenDetailMail,
                                  [row.idEmailAddress]:
                                    !isOpenDetailMail[row.idEmailAddress],
                                });
                              } catch (error) {}
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              setIsOpenDetailMail({
                                ...isOpenDetailMail,
                                [row.idEmailAddress]:
                                  !isOpenDetailMail[row.idEmailAddress],
                              });
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                      <span>
                        Ingresa tu código de confirmación de 6 dígitos.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Numeros Telefonicos */}
          {isEmpty(dataPhoneNumber) === false &&
            selectOption === 2 &&
            dataPhoneNumber.map((row) => {
              return (
                <div className="row-contact">
                  {isOpenDetailPhone[row.idPhoneNumber] === false && (
                    <div className="data-contact">
                      <u>{row.phoneNumber}</u>
                      <div className="buttons-verification-contact">
                        {row.requiresVerification == true ? (
                          <ButtonHeader
                            onClick={async () => {
                              try {
                                await handlerCallSetCustomerPhoneNumber({
                                  requiresVerificationCode: true,
                                  idPhoneNumber: row.idPhoneNumber,
                                });
                                setIsOpenDetailPhone({
                                  ...isOpenDetailPhone,
                                  [row.idPhoneNumber]:
                                    !isOpenDetailPhone[row.idPhoneNumber],
                                });
                              } catch (error) {}
                            }}
                          >
                            <ButtonVerification verification={false}>
                              <div className="verification-action-now">
                                Verificar
                              </div>
                            </ButtonVerification>
                          </ButtonHeader>
                        ) : isNil(row.requiresVerification) === false ? (
                          <ButtonVerification verification={true}>
                            <div className="verification-action">
                              Verificado
                            </div>
                            <div className="verification-icon">
                              <div>
                                <i className="fa fa-check"></i>
                              </div>
                            </div>
                          </ButtonVerification>
                        ) : (
                          <div />
                        )}

                        <ButtonHeader
                          onClick={async () => {
                            try {
                              await handlerCallSetCustomerPhoneNumber({
                                isMain: true,
                                idPhoneNumber: row.idPhoneNumber,
                              });
                              getById();
                            } catch (error) {}
                          }}
                        >
                          <IconStar
                            color="var(--color-primary)"
                            backGround={
                              row.isMain === true
                                ? "var(--color-primary)"
                                : "transparent"
                            }
                            size="15px"
                          />
                        </ButtonHeader>
                        <ButtonHeader
                          onClick={async () => {
                            try {
                              await handlerCallSetCustomerPhoneNumber({
                                isActive: false,
                                idPhoneNumber: row.idPhoneNumber,
                              });
                              getById();
                            } catch (error) {}
                          }}
                        >
                          <IconDelete
                            color="var(--color-primary)"
                            size="15px"
                          />
                        </ButtonHeader>
                      </div>
                    </div>
                  )}
                  {isOpenDetailPhone[row.idPhoneNumber] === true && (
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="section-code-verification">
                        <div className="input-code-verification">
                          <CustomInputTypeForm
                            value={phoneNumberDetail[row.idPhoneNumber]}
                            placeholder="Código de confirmación"
                            label=""
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setPhoneNumberDetail({
                                ...phoneNumberDetail,
                                [row.idPhoneNumber]: value,
                              });
                            }}
                            type="number"
                            background="#fff"
                          />
                        </div>
                        <div className="action-buttons-confirmation">
                          <button
                            onClick={async () => {
                              try {
                                await handlerCallSetCustomerPhoneNumber({
                                  idPhoneNumber: row.idPhoneNumber,
                                  code: phoneNumberDetail[row.idPhoneNumber],
                                });
                                getById();
                                setIsOpenDetailPhone({
                                  ...isOpenDetailPhone,
                                  [row.idPhoneNumber]:
                                    !isOpenDetailPhone[row.idPhoneNumber],
                                });
                              } catch (error) {}
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {
                              setIsOpenDetailPhone({
                                ...isOpenDetailPhone,
                                [row.idPhoneNumber]:
                                  !isOpenDetailPhone[row.idPhoneNumber],
                              });
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                      <span>
                        Ingresa tu código de confirmación de 6 dígitos.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {selectOption === 1 ? (
          <div className="add-contact-profile">
            {isOpenAddMail === false && (
              <ButtonNextBackPage
                block={false}
                onClick={() => {
                  setIsOpenAddMail(true);
                }}
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Agregar correo +
                </div>
              </ButtonNextBackPage>
            )}
            {isOpenAddMail === true && (
              <SectionAddContact>
                <div className="close-section">
                  <ButtonHeader
                    onClick={() => {
                      setIsOpenAddMail(false);
                    }}
                  >
                    X
                  </ButtonHeader>
                </div>
                <div className="input-button-add">
                  <div className="input-add-email">
                    <CustomInputTypeForm
                      value={emailAddress}
                      placeholder="Correo"
                      label=""
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setEmailAddress(value);
                      }}
                      type="email"
                    />
                  </div>
                  <div className="button-add">
                    <button
                      onClick={async () => {
                        try {
                          await handlerCallSetCustomerEmailAddress({
                            isActive: true,
                            emailAddress,
                            requiresVerificationCode: false,
                            isMain: false,
                          });
                          getById();
                          setEmailAddress(null);
                          setIsOpenAddMail(false);
                        } catch (error) {}
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
                <span className="poster-text">
                  Los correos electrónicos serán verificados
                </span>
              </SectionAddContact>
            )}
          </div>
        ) : (
          <div className="add-contact-profile">
            {isOpenAddPhone === false && (
              <ButtonNextBackPage
                block={false}
                onClick={() => {
                  setIsOpenAddPhone(true);
                }}
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Agregar teléfono +
                </div>
              </ButtonNextBackPage>
            )}
            {isOpenAddPhone === true && (
              <SectionAddContact>
                <div className="close-section">
                  <ButtonHeader
                    onClick={() => {
                      setIsOpenAddPhone(false);
                    }}
                  >
                    X
                  </ButtonHeader>
                </div>
                <div
                  className="input-button-add-phone"
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <div className="input-add">
                    <Select
                      left={true}
                      onChange={(e) => {
                        setPhoneNumber({
                          ...phoneNumber,
                          idCounry: e.target.value,
                        });
                      }}
                    >
                      <option disabled selected value="">
                        Pais
                      </option>
                      {isNil(dataCountryPhone) === false &&
                        isEmpty(dataCountryPhone) === false &&
                        dataCountryPhone.map((row) => {
                          return <option value={row.id}>{row.text}</option>;
                        })}
                    </Select>
                    <Input
                      value={phoneNumber.phoneNumber}
                      type="number"
                      placeholder="Teléfono"
                      onChange={(e) => {
                        setPhoneNumber({
                          ...phoneNumber,
                          phoneNumber: e.target.value,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 109 || e.keyCode === 107) {
                          e.preventDefault();
                        }
                      }}
                      onKeyPress={(e) => {}}
                      onBlur={() => {}}
                      maxLength={null}
                      minLength={null}
                      error={false}
                    />
                    <Select
                      left={false}
                      onChange={(e) => {
                        setPhoneNumber({
                          ...phoneNumber,
                          idPhoneType: e.target.value,
                        });
                      }}
                    >
                      <option disabled selected value="">
                        tipo
                      </option>
                      {isNil(dataPhoneTypes) === false &&
                        isEmpty(dataPhoneTypes) === false &&
                        dataPhoneTypes.map((row) => {
                          return <option value={row.id}>{row.text}</option>;
                        })}
                    </Select>
                  </div>
                  <div className="button-add-phone">
                    <button
                      onClick={async () => {
                        try {
                          await handlerCallSetCustomerPhoneNumber({
                            ...phoneNumber,
                            isActive: true,
                            requiresVerificationCode: false,
                            isMain: false,
                          });
                          getById();
                          setPhoneNumber({
                            idPhoneType: null,
                            idCounry: null,
                            phoneNumber: null,
                          });
                          setIsOpenAddPhone(false);
                        } catch (error) {}
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
                <span className="poster-text">
                  Los teléfonos serán verificados
                </span>
              </SectionAddContact>
            )}
          </div>
        )}
      </CardContactProfile>
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetDataContactProfile);
