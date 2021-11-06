import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconBed,
  IconAgreement,
  IconSpeakChat,
  IconTenant,
} from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";
import ContextProperty from "../context/contextProperty";

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
  justify-content: space-around;
  margin: 3em 0px;
`;

const CardServices = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  border-radius: 1em;
  width: 215px;
  height: 258px;
  position: relative;

  .top-card {
    position: relative;
    min-height: 66px;
    background: #4f4c66;
    box-shadow: 0px 1px 8px 6px #ebebf1;
    border-radius: 1em 1em 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    h3 {
      color: #fff;
      margin: 0px;
    }
    .style-text {
      text-align: center;
      position: absolute;
      background: #ff0282;
      color: #fff;
      font-size: 7px;
      font-weight: 700;
      width: 100px;
      padding: 2px 0px;
      transform: rotate(45deg);
      right: -25px;
      top: 20px;
    }
  }
  .pick {
    content: "";
    position: absolute;
    border-style: solid;
    right: 92px;
    top: 65px;
    border-width: 15px 15px 0px 15px;
    border-color: #4f4c66 transparent transparent transparent;
  }
  .body-card {
    display: grid;
    grid-template-rows: 2fr 1fr;
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
        justify-content: space-between;
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
          font-size: 11px;
        }
      }
    }
    .button-action {
      display: flex;
      flex-direction: column;
      padding: 0px 10px;
    }
  }
`;

const SectionServiceAgent = (props) => {
  const { dataApplication } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updateProperty } = dataContexProperty;
  return (
    <ContentServiceAgent>
      {/* <NoticeService>j</NoticeService> */}
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
              <CardServices>
                <div className="top-card">
                  <div className="style-text">3 MESES GRATIS</div>
                  <h3>{row.text}</h3>
                </div>
                <div className="pick"></div>
                <div className="body-card">
                  <div className="content-service">
                    {isEmpty(methods) === false &&
                      methods.map((rowMap) => {
                        return (
                          <div className="service-hom">
                            <span className="check" />{" "}
                            <span className="label-check">{rowMap}</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className="button-action">
                    <ButtonsService
                      primary
                      onClick={() => {
                        updateProperty({
                          idApartment: dataDetail.idApartment,
                          idApplicationMethod: row.idApplicationMethod,
                        });
                      }}
                    >
                      Seleccionar
                    </ButtonsService>
                    <ButtonsService>Ver más información</ButtonsService>
                  </div>
                </div>
              </CardServices>
            );
          })}
      </SectionCard>
    </ContentServiceAgent>
  );
};

export default SectionServiceAgent;
