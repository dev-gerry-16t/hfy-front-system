import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox,  } from "antd";
import {
    LockOutlined
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";                             

const RecoveryNewPass = () => {
  return ( 
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Reestablece tu contraseña </h1>
          <p className="recoverInstructions">
            ¡Perfecto! Ingresa tu nueva contraseña   
          </p>
          <div className="login_inputs_form">
            <div className="confirmPasswordHolder">
              <Input
                suffix={<LockOutlined  className="site-form-item-icon" />}
                 placeholder="Contraseña nueva"
              />
            </div>  
            
            <div className="confirmPasswordHolder" style={{margin:'48px 0 0'}}>
              <Input
              suffix={<LockOutlined  className="site-form-item-icon" />}
              placeholder="Confirma contraseña"
              />
            </div>
            
          </div>
          <div className="button_init_primary" style={{margin:'60px 0 0'}}>
            <button>
              <span> Guardar y Continuar </span>
            </button>
          </div> 
        </div>
      </div>  
    </div>
    
  );
}
 
export default RecoveryNewPass;