import React from "react";
import styled from "styled-components";

const CardLocation = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
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
  .map-location {
    padding: 0.7em 1em;
    iframe {
      height: 100%;
    }
  }
`;

const WidgetLocation = ({ matiURLGMaps }) => {
  return (
    <CardLocation>
      <h1>Ubicación</h1>
      <div className="map-location">
        <iframe
          id="gmap_canvas"
          src={matiURLGMaps+"om=18"}
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        />
      </div>
    </CardLocation>
  );
};

export default WidgetLocation;
