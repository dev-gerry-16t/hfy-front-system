import React from 'react';
import "antd/dist/antd.css";
import { Input} from "antd";
import {
  MailOutlined
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";                             

const RecoveryPassEnter = () => {
  return ( 
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¿Tienes problemas para iniciar sesión? </h1>
          <p className="recoverInstructions">
            Ingresa el correo con el que te registraste para poder reestablecer tu contraseña.   
          </p>
          <div className="login_inputs_form">
            <Input
              suffix={<MailOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="button_init_primary" style={{margin:'60px 0 0'}}>
            <button>
              <span> Enviar código </span>
            </button>
          </div> 
        </div>
      </div>  
    </div>
    
  );
}
 
export default RecoveryPassEnter;