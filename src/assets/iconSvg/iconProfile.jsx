import React from "react";
import { ReactComponent as IconProfileHfy } from "./svgFile/profile.svg";

const IconProfile = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconProfileHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconProfile;
