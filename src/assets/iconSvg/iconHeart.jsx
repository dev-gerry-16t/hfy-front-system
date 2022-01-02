import React from "react";
import { ReactComponent as IconHeartHfy } from "./svgFile/heart.svg";

const IconHeart = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconHeartHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconHeart;
