import React from "react";
import styled from "styled-components";
import { IconBed, IconMoneyPolicy } from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";

const ContentPolicy = styled(Container)`
  margin-top: 1em;
  padding: 3em 0px;
  border-top: ${(props) =>
    props.selected ? "6px solid var(--color-primary)" : "none"};
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
`;

const SectionPolicy = () => {
  return (
    <ContentPolicy selected>
      {/* <NoticePolicy>
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
        <Button>Ver pólizas</Button>
      </NoticePolicy> */}
      <PolicySelected>
        <div className="left-policy">
          <div>
            <IconMoneyPolicy size="132px" />
          </div>
        </div>
        <div className="right-policy">
          <div className="info-payment">
            <div className="info-policy">
              <h1>Póliza Pro</h1>
              <div className="price">
                <h2>$3,000 MXN</h2> <span>35%</span>
              </div>
            </div>
            <div className="comision">
              <strong>Comisión para el asesor</strong> <span>$1,800.00</span>
            </div>
            <div>
              <strong>Tipo de pago:</strong>{" "}
              <span>50% propietario / 50% inquilino</span>
            </div>
          </div>
        </div>
      </PolicySelected>
    </ContentPolicy>
  );
};

export default SectionPolicy;
