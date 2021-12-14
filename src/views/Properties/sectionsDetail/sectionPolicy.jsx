import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import {
  IconBed,
  IconMoneyPolicy,
  IconEditSquare,
} from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
  ButtonIcon,
} from "../constants/styleConstants";
import ContextProperty from "../context/contextProperty";

const ContentPolicy = styled(Container)`
  margin-top: 1em;
  padding: 3em 0px;
  border-top: ${(props) =>
    props.selected ? "6px solid var(--color-primary)" : "none"};
  position: relative;
  .edit-data-policy {
    top: 10px;
    right: 10px;
    position: absolute;
  }
`;

const NoticePolicy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  h1 {
    font-weight: 600;
  }
  .label-indicator {
    font-weight: 600;
    margin-bottom: 2em;
  }
`;

const Button = styled.button`
  background: #fff;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 0.8em;
  padding: 0px 4em;
  font-size: 0.8em;
`;

const PolicySelected = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  .left-policy {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
  }

  .right-policy {
    display: flex;
    justify-content: center;
    align-items: center;
    .info-payment {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .info-policy {
        h1 {
          font-weight: 900;
        }
        .price {
          display: flex;
          align-items: baseline;
          h2 {
            font-weight: 900;
            color: var(--color-primary);
            margin-right: 5px;
          }
        }
      }
      strong {
        margin-right: 10px;
        color: #4e4b66;
      }
      span {
        font-size: 0.8em;
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
    }
  }
  @media screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    gap: 25px;
    .right-policy {
      .info-payment {
        .info-policy {
          display: flex;
          flex-direction: column;
          align-items: center;
          h1 {
            font-size: 20px;
          }
          .price {
            h2 {
              font-size: 24px;
            }
          }
        }
        strong {
        }
        span {
        }
        .comision {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          gap: 10px;
          strong {
          }
          span {
          }
        }
        .payment-type {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
        }
      }
    }
  }
`;

const SectionPolicy = (props) => {
  const { onClickViewPolicy, idUserType } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail } = dataContexProperty;
  const {
    idPolicy,
    requiresPolicy,
    policyDescription,
    policyAmountFormat,
    policyPaymentMethod,
    advCommissionAmountFormat,
    canBeEdited,
  } = dataDetail;

  return (
    <ContentPolicy selected={isNil(idPolicy) === false}>
      {isNil(idPolicy) === true && requiresPolicy === false && (
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
            Eligiendo alguna de nuestras pólizas de arrendamiento
          </span>
          {idUserType !== 2 && (
            <Button onClick={onClickViewPolicy}>Ver pólizas</Button>
          )}
        </NoticePolicy>
      )}
      {isNil(idPolicy) === false && requiresPolicy === false && (
        <PolicySelected>
          {canBeEdited === true && (
            <div className="edit-data-policy">
              <ButtonIcon onClick={onClickViewPolicy}>
                <IconEditSquare
                  backGround="transparent"
                  color="var(--color-primary)"
                />
              </ButtonIcon>
            </div>
          )}
          <div className="left-policy">
            <div>
              <IconMoneyPolicy size="132px" />
            </div>
          </div>
          <div className="right-policy">
            <div className="info-payment">
              <div className="info-policy">
                <h1>{policyDescription}</h1>
                <div className="price">
                  <h2>{policyAmountFormat}</h2> {/*<span>35%</span>*/}
                </div>
              </div>
              {idUserType === 4 && (
                <div className="comision">
                  <strong>Comisión para el asesor</strong>{" "}
                  <span>{advCommissionAmountFormat}</span>
                </div>
              )}
              <div className="payment-type">
                <strong>Tipo de pago:</strong>{" "}
                <span>{policyPaymentMethod}</span>
              </div>
            </div>
          </div>
        </PolicySelected>
      )}
    </ContentPolicy>
  );
};

export default SectionPolicy;
