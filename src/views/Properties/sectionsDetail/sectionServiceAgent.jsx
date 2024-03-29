import React, { useContext, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconBed,
  IconAgreement,
  IconSpeakChat,
  IconTenant,
  IconEditSquare,
} from "../../../assets/iconSvg";
import {
  ButtonIcon,
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import ContextProperty from "../context/contextProperty";
import ComponentLoadSection from "../../../components/componentLoadSection";

const ContentServiceAgent = styled(Container)`
  margin-top: 1em;
  padding: 3em 0px;
  h1 {
    font-weight: bold;
    color: var(--color-primary);
    text-align: center;
  }
`;

const ButtonAction = styled.button`
  border: none;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  width: 92.89px;
  height: 79.49px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeService = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  h1 {
    font-weight: 600;
  }
  .section-select-option {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    gap: 4em;
    .option-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.8em;
        margin-bottom: 10px;
      }
    }
  }
`;

const ButtonsService = styled.button`
  border: ${(props) =>
    props.primary ? "none" : "1px solid var(--color-primary)"};
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "#4E4B66")};
  border-radius: 1em;
  padding: 2px 0px;
  margin-bottom: 5px;
  font-size: 12px;
`;

const ButtonsService1 = styled.button`
  border: ${(props) =>
    props.primary ? "none" : "1px solid var(--color-primary)"};
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "#4E4B66")};
  border-radius: 1em;
  padding: 2px 15px;
  margin-bottom: 5px;
  font-size: 12px;
`;

const SectionCandidate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    color: var(--color-primary);
  }
  .info-user-select {
    display: flex;
    gap: 2em;
    color: #4e4b66;
    margin-top: 3em;
    .score-user {
      position: absolute;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--color-primary);
      bottom: 15px;
      right: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
      color: #fff;
      span {
        font-weight: 300;
      }
    }
    .image-user {
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
    }
    .info {
      margin-bottom: 15px;
    }
    .status-user {
      margin-top: 10px;
      font-size: 0.8em;
      color: var(--color-primary);
    }
  }
`;

const SectionCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 3em 0px;
  padding: 0px 5px;
`;

const CardServices = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  border-radius: 1em;
  width: auto;
  height: 310px;
  position: relative;

  .top-card {
    position: relative;
    min-height: 66px;
    background: #4f4c66;
    box-shadow: 0px 1px 8px 6px #ebebf1;
    border-radius: 1em 1em 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    span {
      color: #fff;
      margin: 0px;
      font-size: 10px;
    }
    h3 {
      color: #fff;
      margin: 0px;
    }
    .style-text {
      text-align: center;
      position: absolute;
      background: #ff0282;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      width: 100px;
      padding: 2px 0px;
      transform: rotate(45deg);
      right: -25px;
      top: 20px;
    }
  }
  .pick-section {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    .pick {
      border-style: solid;
      border-width: 15px 15px 0px 15px;
      border-color: #4f4c66 transparent transparent transparent;
    }
  }
  .body-card {
    display: grid;
    grid-template-rows: 180px 65px;
    height: 245px;
    .content-service {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      .service-hom {
        padding: 0px 1em;
        width: 100%;
        display: flex;
        .check {
          width: 18px;
          height: 18px;
          background: var(--color-primary);
          color: #fff;
          border-radius: 4px;
        }
        .check::before {
          content: "\\2713";
          width: 18px;
          height: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .label-check {
          margin-left: 5px;
          font-size: 11px;
        }
      }
    }
    .button-action {
      display: flex;
      flex-direction: column;
      padding: 0px 10px;
      justify-content: center;
    }
  }
`;

const CardServiceSelect = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100px;
  .service-options {
    display: flex;
    justify-content: center;
    align-items: center;
    .service-hom {
      padding: 0px 1em;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .check {
        width: 18px;
        height: 18px;
        background: var(--color-primary);
        color: #fff;
        border-radius: 4px;
      }
      .check::before {
        content: "\\2713";
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .label-check {
        font-size: 1em;
        margin-left: 10px;
      }
    }
  }
  .line {
    border: 0.5px solid #4f4c66;
    opacity: 0.3;
    transform: rotate(90deg);
    width: 100px;
    height: 0px;
  }
  .info-service {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .info {
      margin-bottom: 15px;
      span {
        margin-left: 10px;
      }
    }
  }
  @media screen and (max-width: 950px) {
    flex-direction: column;
    .line {
      transform: rotate(0deg);
      width: 100%;
      margin: 20px 0px;
    }
  }
`;

const SectionServiceAgent = (props) => {
  const { dataApplication, onClickViewPolicy } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updatePropertyApplicationMethod, getById } =
    dataContexProperty;
  const {
    idApplicationMethod,
    applicationMethod,
    applicationMethodTitle,
    costFormat,
  } = dataDetail;
  const [isEditService, setIsEditService] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);

  const arrayServiceSelect =
    isNil(applicationMethod) === false && isEmpty(applicationMethod) === false
      ? JSON.parse(applicationMethod)
      : [];

  return (
    <ContentServiceAgent id="requirement-property-help">
      {(isNil(idApplicationMethod) === true || isEditService === true) && (
        <>
          <h1>¡Te ayudamos con tu proceso de renta!</h1>
          <SectionCard>
            {isEmpty(dataApplication) === false &&
              dataApplication.map((row) => {
                const methods =
                  isNil(row.applicationMethod) === false &&
                  isEmpty(row.applicationMethod) === false
                    ? JSON.parse(row.applicationMethod)
                    : [];
                return (
                  <div id={`requirement-property-${row.idApplicationMethod}`}>
                    <CardServices>
                      <ComponentLoadSection
                        isLoadApi={isLoadApi}
                        position="absolute"
                      >
                        <div className="top-card">
                          {row.requiresPolicy === false && (
                            <div className="style-text">{row.costFormat}</div>
                          )}
                          <h3>{row.text}</h3>
                          <span>{row.subtitle}</span>
                        </div>
                        <div className="pick-section">
                          <div className="pick"></div>
                        </div>
                        <div className="body-card">
                          <div className="content-service">
                            {isEmpty(methods) === false &&
                              methods.map((rowMap) => {
                                return (
                                  <div className="service-hom">
                                    <span className="check" />{" "}
                                    <span className="label-check">
                                      {rowMap}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="button-action">
                            <ButtonsService
                              primary={
                                idApplicationMethod ==
                                  row.idApplicationMethod ||
                                isNil(idApplicationMethod) === true
                              }
                              onClick={async () => {
                                try {
                                  if (row.requiresPolicy === false) {
                                    setIsLoadApi(true);
                                    await updatePropertyApplicationMethod({
                                      idApartment: dataDetail.idApartment,
                                      idApplicationMethod:
                                        row.idApplicationMethod,
                                    });
                                    getById();
                                    setIsEditService(false);
                                    setIsLoadApi(false);
                                  } else if (row.requiresPolicy === true) {
                                    onClickViewPolicy();
                                  }
                                } catch (error) {
                                  setIsLoadApi(false);
                                }
                              }}
                            >
                              {idApplicationMethod == row.idApplicationMethod
                                ? "Actual"
                                : "Seleccionar"}
                            </ButtonsService>
                            {/* <ButtonsService>Ver más información</ButtonsService> */}
                          </div>
                        </div>
                      </ComponentLoadSection>
                    </CardServices>
                  </div>
                );
              })}
          </SectionCard>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ButtonsService1
              id={`requirement-property-7`}
              primary={false}
              onClick={async () => {
                try {
                  setIsLoadApi(true);
                  await updatePropertyApplicationMethod({
                    idApartment: dataDetail.idApartment,
                    idApplicationMethod: 7,
                  });
                  getById();
                  setIsEditService(false);
                  setIsLoadApi(false);
                } catch (error) {
                  setIsLoadApi(false);
                }
              }}
            >
              No me interesa
            </ButtonsService1>
          </div>
        </>
      )}
      {isNil(idApplicationMethod) === false &&
        isEmpty(dataApplication) === false &&
        isEditService === false && (
          <>
            <div
              style={{
                marginBottom: 25,
                position: "relative",
              }}
            >
              <ButtonIcon
                onClick={async () => {
                  setIsEditService(true);
                }}
                style={{
                  position: "absolute",
                  right: "32px",
                }}
              >
                <IconEditSquare
                  backGround="transparent"
                  color="var(--color-primary)"
                />
              </ButtonIcon>
              <h1>Servicio adquirido</h1>
            </div>
            <CardServiceSelect>
              <div className="service-options">
                <div className="content-service">
                  {isEmpty(arrayServiceSelect) === false &&
                    arrayServiceSelect.map((row) => {
                      return (
                        <div className="service-hom">
                          <span className="check" />{" "}
                          <span className="label-check">{row}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="line"></div>
              <div className="info-service">
                <div className="info">
                  <strong>Costo total a pagar:</strong>
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "700",
                    }}
                  >
                    {costFormat}
                  </span>
                </div>
                <div className="info">
                  <strong>Servicio:</strong>
                  <span>{applicationMethodTitle}</span>
                </div>
                {/* <div className="info">
                    <strong>Fecha de adquisición:</strong>
                    <span>02/11/2021</span>
                  </div> */}
              </div>
            </CardServiceSelect>
          </>
        )}
    </ContentServiceAgent>
  );
};

export default SectionServiceAgent;
