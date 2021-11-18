import React from "react";
import { ReactComponent as IconSpeakChatHfy } from "./svgFile/iconSpeakChat.svg";

const IconSpeakChat = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconSpeakChatHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconSpeakChat;
