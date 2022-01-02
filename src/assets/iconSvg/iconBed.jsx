import React from "react";
import { ReactComponent as IconBedHfy } from "./svgFile/bed.svg";

const IconBed = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconBedHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconBed;
