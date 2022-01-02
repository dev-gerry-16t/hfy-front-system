import React from "react";
import { ReactComponent as IconHouseMeasureHfy } from "./svgFile/iconHouseMeasure.svg";

const IconHouseMeasure = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconHouseMeasureHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconHouseMeasure;
