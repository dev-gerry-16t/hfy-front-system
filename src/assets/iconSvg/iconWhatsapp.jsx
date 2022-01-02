import React from "react";
import { ReactComponent as IconWhatsappHfy } from "./svgFile/whatsapp.svg";

const IconWhatsapp = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconWhatsappHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconWhatsapp;
