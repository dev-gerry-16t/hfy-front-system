import React, { useContext, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { IconTenant } from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";

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

const SectionApplicants = () => {
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail = {} } = dataContexProperty;
  const { applicants } = dataDetail;
  const applicantsArray =
    isNil(applicants) === false && isEmpty(applicants) === false
      ? JSON.parse(applicants)
      : [];

  return (
    <GeneralCard>
      <div className="header-title">
        <h1>Prospectos</h1>
      </div>
      <div className="content-cards">
        {isEmpty(applicantsArray) === false &&
          applicantsArray.map((row) => {
            return (
              <Card>
                <div className="card-user">
                  <div className="top-info">
                    <div className="icon-info">
                      <IconTenant size="100%" color="#4E4B66" />
                      <div className="score">
                        <span>Score</span>
                        <strong>4.85</strong>
                      </div>
                    </div>
                    <div className="name-info">
                      <h3>{row.fullName}</h3>
                      <span>{row.applicantStatus}</span>
                    </div>
                  </div>
                  <div className="button-action">
                    <ButtonDocument>Rechazar</ButtonDocument>
                    <ButtonDocument>Aceptar</ButtonDocument>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </GeneralCard>
  );
};

export default SectionApplicants;
