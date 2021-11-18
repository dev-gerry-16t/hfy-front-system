import React, { useContext, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconPolicy,
  IconContract,
  IconPayments,
} from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";
import CustomViewDocument from "../../../components/CustomViewDocument";
import CustomSignatureContractV2 from "../../../components/customSignatureContractv2";

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  .header-title {
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
  }
  .content-cards {
    min-height: 30em;
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
`;

const EmptyData = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  min-height: 6em;
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: ${(props) => props.colorDocument};
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        position: relative;
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const SectionDocuments = () => {
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail = {} } = dataContexProperty;
  const { jsonDocuments } = dataDetail;
  const documentsArray =
    isNil(jsonDocuments) === false && isEmpty(jsonDocuments) === false
      ? JSON.parse(jsonDocuments)
      : [];
  const [isVisibleModalDocument, setIsVisibleModalDocument] = useState(false);
  const [isVisibleModalSignature, setIsVisibleModalSignature] = useState(false);
  const [dataDocument, setDataDocument] = useState({});

  const handlerSelectIcon = (key, sign) => {
    let component = null;
    const color = sign === true ? "#A0A3BD" : "#FFF";
    switch (key) {
      case "IconContract":
        component = (
          <IconContract backGround={color} color={color} size="34px" />
        );
        break;
      case "IconPolicy":
        component = <IconPolicy backGround={color} color={color} size="34px" />;
        break;
      case "IconPayments":
        component = (
          <IconPayments backGround={color} color={color} size="34px" />
        );
        break;

      default:
        component = (
          <IconContract backGround={color} color={color} size="34px" />
        );
        break;
    }
    return component;
  };

  return (
    <GeneralCard>
      <CustomViewDocument
        isVisibleModal={isVisibleModalDocument}
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModalDocument(false);
          setDataDocument({});
        }}
      />
      <CustomSignatureContractV2
        isModalVisible={isVisibleModalSignature}
        name="Usuario"
        onSignContract={() => {}}
        titleSectionSignature="Firma de "
        componentTerms={
          <span
            style={{
              marginLeft: 5,
              textAlign: "center",
              fontSize: 10,
              color: "black",
              marginBottom: 10,
            }}
          >
            Acepto los términos publicados en la pagina{" "}
            <a
              href="https://www.homify.ai/aviso-de-privacidad"
              target="__blank"
            >
              https://www.homify.ai/aviso-de-privacidad
            </a>{" "}
            así como lo descrito en el contrato
          </span>
        }
        onClose={() => {
          setIsVisibleModalSignature(false);
        }}
      />
      <div className="header-title">
        <h1>Documentos</h1>
      </div>
      <div className="content-cards">
        {isEmpty(documentsArray) === false &&
          documentsArray.map((row) => {
            return (
              <Card
                colorDocument={
                  row.canSign === true ? "#eff0f6" : row.style.color
                }
              >
                <div className="card-document">
                  <div className="top-info">
                    <div className="icon-info">
                      {handlerSelectIcon(row.style.icon, row.canSign)}
                    </div>
                    <div className="name-info">
                      <h3>{row.documentType}</h3>
                      {row.canSign === true && (
                        <span>Archivo listo para firmar</span>
                      )}
                    </div>
                  </div>
                  <div className="button-action">
                    <ButtonDocument
                      onClick={() => {
                        setIsVisibleModalDocument(true);
                        setDataDocument(row);
                      }}
                    >
                      Ver detalle
                    </ButtonDocument>
                    {row.canSign === true && (
                      <ButtonDocument
                        primary
                        onClick={() => {
                          setIsVisibleModalSignature(true);
                        }}
                      >
                        Firmar
                      </ButtonDocument>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        {isEmpty(documentsArray) === true && (
          <EmptyData>
            <img
              width="150"
              src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
              alt=""
            />
            <p>No hay Documentos disponibles</p>
          </EmptyData>
        )}
        {/* <Card>
          <div className="card-document">
            <div className="top-info">
              <div className="icon-info">
                <IconPolicy backGround="#A0A3BD" color="#A0A3BD" size="34px" />
              </div>
              <div className="name-info">
                <h3>Póliza jurídica</h3>
                <span>Archivo listo para firmar</span>
              </div>
            </div>
            <div className="button-action">
              <ButtonDocument primary>Firmar</ButtonDocument>
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-document">
            <div className="top-info">
              <div className="icon-info">
                <IconContract
                  backGround="#A0A3BD"
                  color="#A0A3BD"
                  size="34px"
                />
              </div>
              <div className="name-info">
                <h3>Contrato de arrendamiento</h3>
                <span>Archivo listo para firmar</span>
              </div>
            </div>
            <div className="button-action">
              <ButtonDocument primary>Firmar</ButtonDocument>
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-document">
            <div className="top-info">
              <div className="icon-info">
                <IconPayments
                  backGround="#A0A3BD"
                  color="#A0A3BD"
                  size="34px"
                />
              </div>
              <div className="name-info">
                <h3>Pagares</h3>
                <span>Archivo listo para firmar</span>
              </div>
            </div>
            <div className="button-action">
              <ButtonDocument primary>Firmar</ButtonDocument>
            </div>
          </div>
        </Card> */}
      </div>
    </GeneralCard>
  );
};

export default SectionDocuments;
