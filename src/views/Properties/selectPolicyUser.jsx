import React, { useEffect, useState } from "react";
import Slide from "react-reveal/Slide";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { Row, Col, Select } from "antd";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../utils/actions/actions";
import CustomInputCurrency from "../../components/customInputCurrency";
import CustomInputTypeForm from "../../components/CustomInputTypeForm";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import CustomInputSelect from "../../components/customInputSelect";
import ComponentLoadSection from "../../components/componentLoadSection";
import { ReactComponent as IconMinCheck } from "../../assets/iconSvg/svgFile/iconMinCheck.svg";
import { ReactComponent as ArrowUp2 } from "../../assets/iconSvg/svgFile/arrowUp2.svg";
import { ReactComponent as IconSendInvitation } from "../../assets/iconSvg/svgFile/iconSendInvitation.svg";
import CustomModalMessage from "../../components/customModalMessage";

const { Option } = Select;

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;

const ContentForm = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding-bottom: 0.3em;
  margin-bottom: 2em;
  position: relative;
  .back-button {
    position: absolute;
    button {
      background: transparent;
      border: none;
    }
  }
  .header-title {
    padding: ${(props) => (props.owner ? "1em 1em" : "1em 6em")};
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    .comision {
      span {
        padding: 0.5em;
        border: 1px solid var(--color-primary);
        border-radius: 7px;
        font-weight: 400;
        color: var(--color-primary);
      }
    }
    h1 {
      margin: 0;
      color: #4e4b66;
      font-weight: 700;
    }
  }
  @media screen and (max-width: 1004px) {
    .header-title {
      padding: 1em 1em;
    }
  }
  @media screen and (max-width: 560px) {
    .header-title {
      flex-direction: column;
      align-items: center;
      .comision {
        margin-top: 10px;
      }
    }
  }
`;

const NoticePolicy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  margin-top: 2em;
  h1 {
    font-weight: 600;
  }
  .label-indicator {
    font-weight: 600;
    margin-bottom: 2em;
  }
  .comision {
    margin-bottom: 1em;
    span {
      border: 1px solid var(--color-primary);
      padding: 0.5em;
      border-radius: 7px;
      font-weight: 600;
      color: var(--color-primary);
    }
  }
`;

const SectionCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 3em 0px;
  gap: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 1004px) {
    justify-content: center;
  }
`;

const CardPolicy = styled.div`
  width: 282px;
  min-height: 434px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  border-radius: 16px;
  border-top: 6px solid var(--color-primary);
  padding: 1em;
  position: relative;
  display: grid;
  grid-template-rows: 340px auto;
  .card-info-policy {
    display: flex;
    flex-direction: column;
  }
  .column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1%.5em;
  }
  .size-text {
    margin-top: 10px;
    font-size: 1.2em;
    line-height: 25px;
    strong {
      font-weight: 900;
    }
  }
  .icon-image {
    margin-top: 30px;
    text-align: center;
  }
  .buttons-action {
    position: relative;
    bottom: 0px;
    text-align: center;
  }
  .price {
    h2 {
      font-weight: 700;
      color: var(--color-primary);
      margin: 0px;
    }
    span {
      font-size: 0.9em;
    }
  }
`;

const ButtonPolicy = styled.button`
  border: ${(props) =>
    props.primary ? "1px solid var(--color-primary)" : "none"};
  background: ${(props) =>
    props.primary
      ? props.select === true
        ? "var(--color-primary)"
        : "#fff"
      : "transparent"};
  color: ${(props) =>
    props.primary
      ? props.select === true
        ? "#fff"
        : "var(--color-primary)"
      : "#4E4B66"};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  border-radius: 1em;
  padding: 0px 2em;
  margin-bottom: 5px;
  svg {
    position: absolute;
    opacity: ${(props) => (props.isCollapse === true ? "1" : "0")};
    transition: all 0.6s ease-in-out;
  }
  @media screen and (max-width: 420px) {
    svg {
      top: -3px;
    }
  }
`;

const ContentMethod = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em 0px;
  .section-method {
    display: flex;
    flex-direction: column;
    h3 {
      color: var(--color-primary);
      margin-bottom: 2em;
    }
    .input-radio {
      margin-bottom: 1.5em;
      input[type="radio"] {
        appearance: none;
        background-color: #fff;
        margin-right: 5px;
        font: inherit;
        color: var(--color-primary);
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        display: inline-grid;
        place-content: center;
      }
      input[type="radio"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
      }
      input[type="radio"]:checked::before {
        transform: scale(1);
      }
    }
  }
`;

const SubTitleSection = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5em;
  color: #4e4b66;
  margin: 0px;
`;

const TitleSectionAmount = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 3em;
  line-height: 40px;
  color: #4e4b66;
  margin-bottom: 40px;
  span {
    color: #ff0282;
  }
`;

const DivRange = styled.div`
  width: 60%;
  padding: 0px 2rem;
  @media screen and (max-width: 570px) {
    padding: 0px 1rem;
    width: 90%;
  }

  @media screen and (max-width: 420px) {
    padding: 0px 10px;
    width: 98%;
  }
`;

const InputRange = styled.input``;

const AlignTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImportantCard = styled.div`
  position: absolute;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  width: 100%;
  top: -30px;
  right: 0px;
  height: 35px;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  padding-top: 5px;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  margin-top: 15px;
`;

const DiscountPrice = styled.div`
  visibility: hidden;
  margin-top: 10px;
  .discount-format {
    position: relative;
    h3 {
      color: #200e32;
      text-decoration: line-through;
      font-weight: 500;
    }
    .discount-percent {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      right: -13px;
      top: -5px;
      background: var(--color-primary);
      filter: drop-shadow(0px 0px 4px #df90b8);
      transform: rotate(-20.83deg);
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        font-size: 8px;
        font-weight: 500;
      }
    }
  }
`;

const DetailPolicy = styled.div`
  border-top: ${(props) =>
    props.collapse === true ? "1px solid #ff0282" : "1px solid #fff"};
  margin-bottom: 10px;
  overflow: hidden;
  max-height: ${(props) => (props.collapse === true ? "500px" : "0px")};
  transition: all 0.6s ease-in-out;
  .option-policy {
    padding: 10px 0px;
    border-bottom: 0.5px solid #d6d8e7;
    display: flex;
    gap: 5px;
    span {
      color: #0a3949;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
    }
  }
`;

const Circle = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: ${(props) => (props.ok === false ? "1px solid #000" : "none")};
  background: ${(props) =>
    props.ok === false ? "transparent" : "var(--color-primary)"};
`;

const SectionDetailPolicy = ({ isCollapse, data }) => {
  return (
    <DetailPolicy collapse={isCollapse}>
      {isEmpty(data) === false &&
        data.map((row) => {
          return (
            <div className="option-policy">
              <div>
                <Circle ok>
                  <IconMinCheck />
                </Circle>
              </div>
              <span>{row}</span>
            </div>
          );
        })}
    </DetailPolicy>
  );
};

const selectIconPolicy = {
  "D074A10F-9E68-48D8-B80E-6EFC634DC77B":
    "data:image/png;base64,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",
  "1AB46DFE-C916-494D-8FCE-6D297D774138":
    "data:image/png;base64,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",
  "CD806B63-4B85-4A94-9D1C-2DE1735294F5":
    "data:image/png;base64,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",
  "54C9414E-3B8E-42B5-8F80-940F2641F888":
    "data:image/png;base64,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",
};

const SelectPolicy = (props) => {
  const { match, callGlobalActionApi, dataProfile, history } = props;
  const { params } = match;
  const idProperty = params.idProperty;
  const [dataDetail, setDataDetail] = useState({
    maintenanceAmount: 0,
    currentRent: 0,
    policyType: "",
  });
  const [dataPolicies, setDataPolicies] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [amountTotalPolicy, setAmountTotalPolicy] = useState({});
  const [dataPolicyMethods, setDataPolicyMethods] = useState([]);
  const [selectPolicy, setSelectPolicy] = useState(null);
  const [loadApi, setLoadApi] = useState(false);
  const [viewDetailPolicy, setViewDetailPolicy] = useState({});
  const frontFunctions = new FrontFunctions();

  const handlerCallGetPolicies = async (id = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          idProperty: null,
          idApartment: null,
          idCurrency: null,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_POLICIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPolicies(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerRequestPolicy = async (data) => {
    try {
      await callGlobalActionApi(
        {
          content: data,
        },
        null,
        API_CONSTANTS.PROPERTY.REQUEST_POLICY
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const hanlderCallGetPolicyPaymentMethod = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_POLICY_PAYMENT_METHOD
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPolicyMethods(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    hanlderCallGetPolicyPaymentMethod();
    handlerCallGetPolicies();
  }, []);

  return (
    <Content>
      <CustomModalMessage
        isModalVisible={isOpenModal}
        title="Solicitud enviada"
        subTitle={`Tus solicitud para la póliza "${dataDetail.policyType}" se envió correctamente`}
        mainText="En unos momentos uno de nuestros asesores te contactará para explicarte los pasos a seguir."
        icon={<IconSendInvitation width="200px" />}
        labelLeft="Aceptar"
        isVisibleRight={false}
        labelRight="Cancelar"
        onClose={() => {}}
        onClickRight={() => {}}
        onClickLeft={async () => {
          try {
            history.push(`${dataProfile.path}`);
          } catch (error) {}
        }}
      />
      <ComponentLoadSection isLoadApi={loadApi}>
        <ContentForm>
          <div className="back-button">
            <button
              onClick={() => {
                history.push(`${dataProfile.path}`);
              }}
            >
              <Arrow width="25px" />
            </button>
          </div>
          <div className="header-title">
            <h1>Selecciona una póliza</h1>
          </div>
          <NoticePolicy>
            <h1>
              ¡
              <span
                style={{
                  color: "#FF0282",
                }}
              >
                Protege
              </span>{" "}
              tu propiedad!
            </h1>
            <span className="label-indicator">
              Estas a un paso de tomar la mejor decisión
            </span>
            <SubTitleSection>¿Cuál es el monto de renta?</SubTitleSection>
          </NoticePolicy>
          <AlignTitle style={{ margin: "4em 0px" }}>
            <TitleSectionAmount>
              {frontFunctions.parseFormatCurrency(dataDetail.currentRent, 2)}
            </TitleSectionAmount>
            <DivRange>
              <InputRange
                value={dataDetail.currentRent}
                style={{ width: "100%" }}
                type="range"
                step="100"
                min="10000"
                max="150000"
                onChange={(e) => {
                  setDataDetail({
                    ...dataDetail,
                    currentRent: Number(e.target.value),
                  });
                }}
              />
            </DivRange>
          </AlignTitle>
          <SectionCard>
            {isEmpty(dataPolicies) === false &&
              dataPolicies.map((rowMap) => {
                const namePolicy =
                  isNil(rowMap.style) === false &&
                  isEmpty(rowMap.style) === false
                    ? JSON.parse(rowMap.style)
                    : {};
                const contentPolicy =
                  isNil(rowMap.contentCard) === false &&
                  isEmpty(rowMap.contentCard) === false
                    ? JSON.parse(rowMap.contentCard)
                    : [];
                return (
                  <CardPolicy>
                    {rowMap.isMostPopular === true && (
                      <ImportantCard>Más popular</ImportantCard>
                    )}
                    <div className="card-info-policy">
                      <div className="size-text column-center">
                        <span>{namePolicy.text1}</span>
                        <strong>{namePolicy.text2}</strong>
                      </div>
                      <DiscountPrice className="column-center">
                        <div className="discount-format">
                          <div className="discount-percent">
                            <span>-5%</span>
                          </div>
                          <h3>$3,333 MXN</h3>
                        </div>
                      </DiscountPrice>
                      <div className="price column-center">
                        {isNil(dataDetail.currentRent) === false &&
                        rowMap.minimunAmount >
                          (dataDetail.currentRent +
                            dataDetail.maintenanceAmount) *
                            rowMap.percentBase ? (
                          <h2>
                            {isNil(dataDetail.currentRent) === false &&
                            isNil(dataDetail.currentRent) === false
                              ? frontFunctions.parseFormatCurrency(
                                  rowMap.minimunAmount +
                                    rowMap.minimunAmount * rowMap.taxBase,
                                  2,
                                  2
                                )
                              : "$0.00"}{" "}
                            {rowMap.ISOCode}
                          </h2>
                        ) : (
                          <h2>
                            {isNil(dataDetail.currentRent) === false &&
                            isNil(dataDetail.currentRent) === false
                              ? frontFunctions.parseFormatCurrency(
                                  (dataDetail.currentRent +
                                    dataDetail.maintenanceAmount) *
                                    rowMap.percentBase +
                                    (dataDetail.currentRent +
                                      dataDetail.maintenanceAmount) *
                                      rowMap.percentBase *
                                      rowMap.taxBase,
                                  2,
                                  2
                                )
                              : "$0.00"}{" "}
                            {rowMap.ISOCode}
                          </h2>
                        )}
                        <span>{rowMap.percentBase * 100}%</span>
                      </div>
                      <div className="icon-image">
                        <img
                          src={selectIconPolicy[rowMap.idPolicy]}
                          alt=""
                          width="86px"
                          height={"84px"}
                        />
                      </div>
                      {rowMap.idPolicy ===
                        "54C9414E-3B8E-42B5-8F80-940F2641F888" && (
                        <span
                          style={{
                            textAlign: "center",
                            fontSize: "0.8em",
                          }}
                        >
                          (No se necesita aval)
                        </span>
                      )}
                    </div>
                    <div className="buttons-action">
                      <ButtonPolicy
                        isCollapse={viewDetailPolicy[rowMap.id]}
                        onClick={() => {
                          setViewDetailPolicy({
                            ...viewDetailPolicy,
                            [rowMap.id]: !viewDetailPolicy[rowMap.id],
                          });
                        }}
                      >
                        <div
                          display={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span>Ver más detalles</span>
                          <ArrowUp2 stroke="#200E32" width="1.5em" />
                        </div>
                      </ButtonPolicy>
                      <SectionDetailPolicy
                        isCollapse={viewDetailPolicy[rowMap.id]}
                        data={contentPolicy}
                      />
                      <ButtonPolicy
                        primary
                        select={rowMap.idPolicy === selectPolicy}
                        onClick={() => {
                          if (
                            rowMap.minimunAmount >
                            dataDetail.currentRent * rowMap.percentBase
                          ) {
                            setAmountTotalPolicy({
                              amountFormat: frontFunctions.parseFormatCurrency(
                                rowMap.minimunAmount +
                                  rowMap.minimunAmount * rowMap.taxBase,
                                2,
                                2
                              ),
                              amount: rowMap.minimunAmount,
                              isoCode: rowMap.ISOCode,
                            });
                          } else {
                            setAmountTotalPolicy({
                              amountFormat: frontFunctions.parseFormatCurrency(
                                (dataDetail.currentRent +
                                  dataDetail.maintenanceAmount) *
                                  rowMap.percentBase +
                                  (dataDetail.currentRent +
                                    dataDetail.maintenanceAmount) *
                                    rowMap.percentBase *
                                    rowMap.taxBase,
                                2,
                                2
                              ),
                              amount:
                                (dataDetail.currentRent +
                                  dataDetail.maintenanceAmount) *
                                rowMap.percentBase,
                              isoCode: rowMap.ISOCode,
                            });
                          }
                          setSelectPolicy(rowMap.idPolicy);
                          setDataDetail({
                            ...dataDetail,
                            policyType: rowMap.policyDescription,
                          });
                        }}
                      >
                        Seleccionar póliza
                      </ButtonPolicy>
                    </div>
                  </CardPolicy>
                );
              })}
          </SectionCard>
        </ContentForm>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonPolicy
            primary
            select
            onClick={async () => {
              try {
                const { userType, agentNo, email, fullName } = dataProfile;
                const policyType = dataDetail.policyType;
                const amountRent =
                  isNil(dataDetail.currentRent) === false
                    ? frontFunctions.parseFormatCurrency(
                        dataDetail.currentRent,
                        2,
                        2
                      ) + "MXN"
                    : "$0MXN";
                const estimationPolicyAmount = amountTotalPolicy.amountFormat;
                const content = `<div>
                El ${userType} <strong>${fullName}</strong> ${agentNo}  ha solicitado una póliza <strong>"${policyType}"</strong>
                <br/>
                Monto de renta: <strong>${amountRent}</strong><br/>
                Valor de póliza calculado: <strong>${estimationPolicyAmount}</strong>
                </div>`;
                if (isNil(estimationPolicyAmount) === false) {
                  setLoadApi(true);
                  await handlerRequestPolicy(content);
                  setLoadApi(false);
                  setIsOpenModal(true);
                } else {
                  frontFunctions.showMessageStatusApi(
                    "Selecciona una póliza",
                    GLOBAL_CONSTANTS.STATUS_API.ERROR
                  );
                }
              } catch (error) {}
            }}
          >
            Solicitar
          </ButtonPolicy>
        </div>
      </ComponentLoadSection>
    </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectPolicy);
