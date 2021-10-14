import React from "react";
import styled from "styled-components";
import { Progress } from "antd";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomInputCurrency from "../../../components/customInputCurrency";
import CustomSelect from "../../../components/CustomSelect";

const CardInvestigation = styled.div`
  display: grid;
  grid-template-rows: auto auto 2fr auto;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }

  .score-user {
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-score {
    padding: 0px 1em;
  }
  .bottom-card-info {
    display: flex;
    justify-content: center;
    padding: 0.5em;
    button {
      background: var(--color-primary);
      border: none;
      color: #fff;
      padding: 0.3em 1em;
      border-radius: 1em;
    }
  }
`;

const WidgetInvestigation = (props) => {
  const { score = 0 } = props;
  return (
    <CardInvestigation>
      <h1>Investigación</h1>
      <div className="score-user">
        <Progress
          type="circle"
          percent={(score * 100) / 5}
          format={(percent) => (
            <div style={{ fontSize: "0.8em" }}>{(percent*5)/100} Score</div>
          )}
        />
      </div>
      <div className="form-score">
        <div>
          <CustomInputTypeForm
            value=""
            label="Score"
            placeholder="Resultado de su investigación"
            onChange={() => {}}
            type="number"
            error={false}
          />
        </div>
        <div>
          <CustomInputCurrency
            value=""
            label="Capacidad de pago"
            placeholder="Cuanto puede pagar de renta"
            onChange={() => {}}
            type="number"
            error={false}
          />
        </div>
        <div>
          <CustomSelect
            value={"1"}
            data={[
              { id: 1, text: "En proceso" },
              {
                id: 2,
                text: "Aprobado",
              },
            ]}
            label="Estatus"
            placeholder=""
            onChange={() => {}}
            error={false}
            errorMessage=""
          />
        </div>
        <div>
          <CustomSelect
            value={"1"}
            data={[{ id: 1, text: "Ingresos no comprobables" }]}
            label="Motivos"
            placeholder=""
            onChange={() => {}}
            error={false}
            errorMessage=""
          />
        </div>
      </div>
      <div className="bottom-card-info">
        <button>Aplicar</button>
      </div>
    </CardInvestigation>
  );
};

export default WidgetInvestigation;
