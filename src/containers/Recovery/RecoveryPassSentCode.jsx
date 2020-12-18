import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  MailOutlined
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";                             

const RecoveryPassSentCode = () => {
  return ( 
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¿Tienes problemas para iniciar sesión? </h1>
          <p className="recoverInstructions">
            Se ha enviado exitosamente un correo electrónico con las instrucciones para reestablecer tu contraseña.   
          </p>
        </div>
      </div>  
    </div>
    
  );
}
 
export default RecoveryPassSentCode;