import React from "react";
import { ReactComponent as IconDownloadDetailHfy } from "./svgFile/iconDownloadDetail.svg";

const IconDownloadDetail = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconDownloadDetailHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconDownloadDetail;
