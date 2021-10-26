import React from "react";
import { ReactComponent as IconCarHfy } from "./svgFile/iconCar.svg";

const IconCar = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconCarHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconCar;
