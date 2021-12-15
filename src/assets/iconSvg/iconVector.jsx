import React from "react";
import { ReactComponent as IconVectorHfy } from "./svgFile/iconVector.svg";

const IconVector = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconVectorHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconVector;
