import React from "react";
import { ReactComponent as IconAgreementHfy } from "./svgFile/iconAgreement.svg";

const IconAgreement = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconAgreementHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconAgreement;
