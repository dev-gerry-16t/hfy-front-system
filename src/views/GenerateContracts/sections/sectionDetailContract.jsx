import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { GeneralCard } from "../constants/styles";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";
import ComponentDetailContract from "../components/componentDetailContract";

const ShortDetail = styled.div`
  padding: 0px 10px;
  .header-title-short {
    position: relative;
    h1 {
      font-size: 1.3em;
      font-weight: 600;
    }
    .identifier-property {
      color: #9295ad;
      font-size: 1em;
    }
  }

  .info-data-property {
    display: flex;
    flex-direction: column;
    .item-description {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 25px;
      .price-property {
        display: flex;
        flex-direction: column;
        align-items: center;
        .total-property {
          border: 1px solid var(--color-primary);
          padding: 5px;
          border-radius: 10px;
          font-weight: 700;
          color: var(--color-primary);
        }
        .maintenance-detail {
          font-size: 10px;
          color: var(--color-primary);
        }
      }
    }
  }

  @media screen and (max-width: 1160px) {
    .header-title-short {
      .status-property {
        .tooltiptext {
          margin-left: -320px;
          bottom: -100%;
        }
      }
    }
  }

  @media screen and (max-width: 360px) {
    .header-title-short {
      .status-property {
        .tooltiptext {
          width: 220px;
          margin-left: -250px;
          bottom: -100%;
        }
      }
    }
  }
`;

const LineSeparator = styled.hr`
  width: 100%;
  background: #d6d8e7;
  top: 8%;
  left: 9%;
  margin: 2em 0;
  opacity: ${(props) => (props.opacity ? props.opacity : "1")};
`;

const SectionDetailContract = ({
  dataProperty,
  dataInfoRequest,
  frontFunctions,
  onSaveInfo,
}) => {
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  return (
    <GeneralCard>
      <ComponentDetailContract
        visibleDialog={isVisibleEdit}
        dataInfoRequest={dataInfoRequest}
        onSaveInfo={async (data) => {
          await onSaveInfo(data);
        }}
        onClose={() => {
          setIsVisibleEdit(false);
        }}
      />
      <div className="header-title">
        <h1>Contrato</h1>
        <button
          onClick={() => {
            setIsVisibleEdit(true);
          }}
        >
          <IconEditSquare color="var(--color-primary)" size="21px" />
        </button>
      </div>
      <div className="content-cards">
        <ShortDetail>
          <div className="info-data-property">
            <div className="item-description">
              <span>Estatus</span>
              <strong>{dataInfoRequest.requestStatus}</strong>
            </div>
            <div className="item-description">
              <span>Inicio de contrato</span>
              <strong>{dataInfoRequest.startedAtFormatted}</strong>
            </div>
            <div className="item-description">
              <span>Firma de contrato</span>
              <strong>{dataInfoRequest.scheduleAtFormatted}</strong>
            </div>
            <div className="item-description">
              <span>Modo de firma</span>
              <strong>
                {dataInfoRequest.isFaceToFace === false
                  ? "Firma electrónica"
                  : "Presencial"}
              </strong>
            </div>
            <div className="item-description">
              <span>Expira el</span>
              <strong>{dataInfoRequest.expireAtFormatted}</strong>
            </div>
          </div>
        </ShortDetail>
      </div>
    </GeneralCard>
  );
};

export default SectionDetailContract;
