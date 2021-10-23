import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const CustomMapContainer = (props) => {
  const { google, location, onDragPosition, draggable = true } = props;
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  return (
    <Map
      google={google}
      zoom={15}
      style={mapStyles}
      initialCenter={location}
      onClick={(e) => {}}
    >
      <Marker
        draggable={draggable}
        position={location}
        onDragend={(a) => {
          onDragPosition(a.position);
        }}
        icon={{
          url: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296Q.png",
        }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ",
})(CustomMapContainer);
