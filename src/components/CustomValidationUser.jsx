import React, { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import CustomReactMati from "./customReactMati";

const CustomValidationUser = (props) => {
  const { isVisible, onClose, metadata, finished } = props;
  const [stepsValidation, setStepsValidation] = useState(1);
  const [geolocation, setGeolocation] = useState({ latitud: 0, longitud: 0 });

  const geoSuccess = (position) => {
    const startPos = position;
    setStepsValidation(2);
    setGeolocation({
      latitud: startPos.coords.latitude,
      longitud: startPos.coords.longitude,
      maps: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ&q=${startPos.coords.latitude},${startPos.coords.longitude}&zoom=18`,
    });
  };

  const getError = (error) => {
    console.log("error", error);
  };

  const handlerGetGeolocation = () => {
    navigator.geolocation.getCurrentPosition(geoSuccess, getError);
  };

  useEffect(() => {
    if (isVisible) {
      handlerGetGeolocation();
    }
  }, [isVisible]);
  return (
    <CustomDialog isVisibleDialog={isVisible} onClose={onClose}>
      {stepsValidation === 1 && <div>Hola dame tu ubicación</div>}
      {stepsValidation === 2 && (
        <div>
          <CustomReactMati
            clientId="612d17a8ebca36001b36d7ab"
            flowId="612d1d48ebca36001b376f6c"
            country="mx"
            loaded={() => {}}
            product="kyc"
            metadata={{
              ...geolocation,
              ...metadata,
            }}
            exited={() => {
              console.log("exit");
            }}
            finished={finished}
          />
        </div>
      )}
    </CustomDialog>
  );
};

export default CustomValidationUser;
