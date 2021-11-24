import React from "react";
import { ReactComponent as IconEyeHfy } from "./svgFile/iconEye.svg";

const IconEye = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconEyeHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconEye;
