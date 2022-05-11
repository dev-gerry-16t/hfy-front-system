import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import isNil from "lodash/isNil";
import { GeneralCard, Card } from "../constants/styles";
import { ReactComponent as IconOwner } from "../../../assets/iconSvg/svgFile/iconOwner.svg";
import { IconEditSquare } from "../../../assets/iconSvg";
import ComponentDetailLegal from "../components/componentDetailLegal";

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
  span {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
  button {
    background: var(--color-primary);
    border: none;
    color: #fff;
    padding: 10px 1em;
    border-radius: 6px;
    font-weight: 600;
  }
`;

const SectionLegalInformation = ({ dataInfoRequest, dataFee, onSaveInfo }) => {
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  
  const getDataInfoLegalUser = (data) => {
    const dataUser = JSON.parse(data)[0];
    return (
      <Card>
        <div className="card-user">
          <div className="top-info">
            <div className="icon-info">
              <IconOwner size="100%" color="#4E4B66" />
            </div>
            <div className="name-info">
              <h3>{dataUser.attorney}</h3>
              <span>Cód. de Serv. {dataUser.codeId}</span>
              <span>{dataUser.email}</span>
              <span>{dataUser.phoneFormatted}</span>
              <span>
                <a
                  href={
                    isNil(dataUser.wap) === false
                      ? `https://api.whatsapp.com/send?phone=52${dataUser.wap}`
                      : "#"
                  }
                  target="_blank"
                >
                  WhatsApp
                </a>
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <GeneralCard>
      <ComponentDetailLegal
        visibleDialog={isVisibleEdit}
        dataInfoRequest={dataInfoRequest}
        onSaveInfo={async (data) => {
          await onSaveInfo(data);
        }}
        onClose={() => {
          setIsVisibleEdit(false);
        }}
        dataFee={dataFee}
      />
      <div className="header-title">
        <h1>Asesor Legal Asignado</h1>
        <button
          onClick={() => {
            setIsVisibleEdit(true);
          }}
        >
          <IconEditSquare color="var(--color-primary)" size="21px" />
        </button>
      </div>
      <div className="content-cards">
        {isEmpty(dataInfoRequest) === false &&
        isEmpty(dataInfoRequest.request) === false &&
        isNil(dataInfoRequest.request.jsonLegalAdvice) === false ? (
          getDataInfoLegalUser(dataInfoRequest.request.jsonLegalAdvice)
        ) : (
          <EmptyData>
            <img
              width="150"
              src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
              alt=""
            />
            <p>Proceso de asesoría legal no disponible</p>
            {dataInfoRequest.request.requiresLegalAdvice === false && (
              <>
                <span>
                  Costo: <i>{dataFee.legalAdvice}</i>
                </span>
                <button
                  onClick={() => {
                    setIsVisibleEdit(true);
                  }}
                >
                  Contratar Servicio
                </button>
              </>
            )}
          </EmptyData>
        )}
      </div>
    </GeneralCard>
  );
};

export default SectionLegalInformation;
