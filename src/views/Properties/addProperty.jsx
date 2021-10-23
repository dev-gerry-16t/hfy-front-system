import React, { useState } from "react";
import styled from "styled-components";
import CustomStepsHomify from "../../components/customStepsHomify";
import SectionDataFeatures from "./sections/dataFeatures";
import SectionDataImages from "./sections/dataImages";
import SectionDataLocation from "./sections/dataLocation";
import SectionDataProperty from "./sections/dataProperty";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const AddProperty = () => {
  const [current, setCurrent] = useState(null);
  return (
    <Content>
      <CustomStepsHomify
        steps={[
          { style: "fa fa-home", tab: "Datos de propiedad" },
          { style: "fa fa-map-marker", tab: "Ubicación" },
          { style: "fa fa-star-o", tab: "Caracteristicas" },
          { style: "fa fa-picture-o", tab: "Agregar fotos" },

        ]}
        onClick={(ix, record) => {
          setCurrent(ix);
        }}
        current={current}
      />
      <SectionDataImages />
    </Content>
  );
};

export default AddProperty;
