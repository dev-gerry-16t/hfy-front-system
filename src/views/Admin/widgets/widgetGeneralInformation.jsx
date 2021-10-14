import React, { useState } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import CustomStepsHomify from "../../../components/customStepsHomify";

const CardGeneralInformation = styled.div`
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
`;

const CardInformation = styled.div`
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  .content-info {
    width: 360px;
    .data-information {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Info = ({ field, value }) => {
  return (
    <div className="data-information">
      <strong>{field}:</strong>
      <span>{value}</span>
    </div>
  );
};

const WidgetGeneralInformation = () => {
  const [current, setCurrent] = useState(0);
  const [viewAvailable, setViewAvailable] = useState(true);

  const steps = [
    { title: "Información personal", icon: "fa fa-user-o" },
    { title: "Domicilio", icon: "fa fa-home" },
  ];
  return (
    <CardGeneralInformation>
      <h1>Información general</h1>
      <CustomStepsHomify
        steps={steps}
        onClick={(index) => {
          setCurrent(index);
          setViewAvailable(false);
          setTimeout(() => {
            setViewAvailable(true);
          }, 800);
        }}
        current={current}
      />
      <Fade when={viewAvailable}>
        <CardInformation>
          <div className="content-info">
            <Info field="Nombre" value="Gerardo" />
            <Info field="Apellido paterno" value="Gonzalez" />
            <Info field="Apellido materno" value="Jimenez" />
            <Info field="Genero" value="Masculino" />
          </div>
        </CardInformation>
      </Fade>
    </CardGeneralInformation>
  );
};

export default WidgetGeneralInformation;
