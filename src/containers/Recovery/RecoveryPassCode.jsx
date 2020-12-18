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
          <h1> Ingresa tu código  </h1>
          <p className="recoverInstructions">
            Enviamos un código de confirmacion al correo correo@corroe.com 
          </p>
          <div className="codeForm">
            <div className="codeFormItem">
              <Input
               maxLength={1}
              /> 
            </div>
            <div className="codeFormItem">
              <Input
               maxLength={1}
              />  
            </div>
            <div className="codeFormItem">
              <Input
                maxLength={1}
              />  
            </div>
            <div className="codeFormItem">
              <Input
                maxLength={1}
              /> 
            </div>
            <div className="codeFormItem">
              <Input
                maxLength={1}
              />   
            </div>
            <div className="codeFormItem">
              <Input
                maxLength={1}
              />     
            </div>   
          </div>
          <div className="button_init_primary" style={{margin:'60px 0 0'}}>
            <button>
              <span> Validar </span>
            </button>
          </div> 
        </div>
      </div>  
    </div>
    
  );
}
 
export default RecoveryPassSentCode;