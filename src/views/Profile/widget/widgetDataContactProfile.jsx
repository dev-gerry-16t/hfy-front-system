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
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { isNil } from "lodash";

const CardContactProfile = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  border: 1px solid gray;
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
  .type-table-contact {
    .row-contact {
      padding: 1em;
      display: flex;
      justify-content: space-between;
    }
    .row-contact:nth-child(odd) {
      background-color: #eff0f6;
    }
    .row-contact:hover {
      background-color: #ddd;
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
    padding: 0px 1em;
    display: grid;
    column-gap: 1em;
    grid-template-columns: 1.8fr 1.5fr;
    .input-add {
    }
    .button-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      button {
        padding: 5px 2em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
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
  const [isOpenDetailMail, setIsOpenDetailMail] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);
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
          [element.idEmailAddress]: element.emailAddress,
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
          [element.idPhoneNumber]: element.phoneNumber,
        };
      });
      setIsOpenDetailPhone(infoStatesPhone);
      setPhoneNumberDetail(infoDataStatesPhone);
    }
  }, [dataEmail, dataPhoneNumber]);

  return (
    <>
      <h1 className="subtitle-card">Datos de contacto</h1>
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
          {/* Correos electronicos */}
          {isEmpty(dataEmail) === false &&
            selectOption === 1 &&
            dataEmail.map((row) => {
              return (
                <div className="row-contact">
                  {isOpenDetailMail[row.idEmailAddress] === false && (
                    <>
                      <u>{row.emailAddress}</u>
                      <div>
                        <ButtonHeader
                          onClick={() => {
                            setIsOpenDetailMail({
                              ...isOpenDetailMail,
                              [row.idEmailAddress]:
                                !isOpenDetailMail[row.idEmailAddress],
                            });
                          }}
                        >
                          <IconEditSquare
                            color="var(--color-primary)"
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
                    </>
                  )}
                  {isOpenDetailMail[row.idEmailAddress] === true && (
                    <>
                      <CustomInputTypeForm
                        value={emailAddressDetail[row.idEmailAddress]}
                        placeholder=""
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
                      <div>
                        <button
                          onClick={async () => {
                            try {
                              await handlerCallSetCustomerEmailAddress({
                                isActive: true,
                                emailAddress:
                                  emailAddressDetail[row.idEmailAddress],
                                requiresVerificationCode: false,
                                isMain: row.isMain,
                                idEmailAddress: row.idEmailAddress,
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
                          Guardar
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
                    </>
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
                    <>
                      <u>{row.phoneNumber}</u>
                      <div>
                        <ButtonHeader
                          onClick={() => {
                            setIsOpenDetailPhone({
                              ...isOpenDetailPhone,
                              [row.idPhoneNumber]:
                                !isOpenDetailPhone[row.idPhoneNumber],
                            });
                          }}
                        >
                          <IconEditSquare
                            color="var(--color-primary)"
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
                    </>
                  )}
                  {isOpenDetailPhone[row.idPhoneNumber] === true && (
                    <>
                      <CustomInputTypeForm
                        value={phoneNumberDetail[row.idPhoneNumber]}
                        placeholder=""
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
                      <div>
                        <button
                          onClick={async () => {
                            try {
                              await handlerCallSetCustomerEmailAddress({
                                isActive: true,
                                phoneNumber:
                                  phoneNumberDetail[row.idPhoneNumber],
                                requiresVerificationCode: false,
                                isMain: row.isMain,
                                idEmailAddress: row.idPhoneNumber,
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
                          Guardar
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
                    </>
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
                  <u>Agregar correo +</u>
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
                  <div className="input-add">
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
                  Los correos electronicos serán verificados
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
                  <u>Agregar teléfono +</u>
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
                <div className="input-button-add">
                  <div className="input-add">
                    <CustomInputTypeForm
                      value={phoneNumber}
                      placeholder="Teléfono"
                      label=""
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setPhoneNumber(value);
                      }}
                      type="number"
                    />
                  </div>
                  <div className="button-add">
                    <button
                      onClick={async () => {
                        try {
                          await handlerCallSetCustomerPhoneNumber({
                            isActive: true,
                            phoneNumber,
                            requiresVerificationCode: false,
                            isMain: false,
                          });
                          getById();
                          setPhoneNumber(null);
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
