import React from "react";
import IconMakePage from "../../assets/icons/IconMakePage.svg";

const MakeScreen = () => {
  return (
    <div className='empty-screen-make'>
      <div className='info-screen-make'>
        <img src={IconMakePage} alt="make-page" width={151} height={150}/>
        <label>Estamos trabajando para ofecerte la mejor experiencia </label>
      </div>
    </div>
  );
};

export default MakeScreen;
