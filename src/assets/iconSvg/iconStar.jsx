import React from "react";
import { ReactComponent as IconStarHfy } from "./svgFile/iconStar.svg";

const IconStar = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconStarHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconStar;
