import React from "react";
import { ReactComponent as IconMoneyPolicyHfy } from "./svgFile/iconMoneyPolicy.svg";

const IconMoneyPolicy = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconMoneyPolicyHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconMoneyPolicy;
