import React from "react";
import { ReactComponent as IconPaymentsHfy } from "./svgFile/iconPayments.svg";

const IconPayments = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconPaymentsHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconPayments;
