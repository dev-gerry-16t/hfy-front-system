import React from 'react';
import "antd/dist/antd.css";
import { Radio   } from "antd";
import {
    LockOutlined
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";                             

const Register = () => {
  return ( 
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¿Qué te trae por aquí? </h1>
         
          <div className="login_inputs_form">
           
            <Radio.Group name="radiogroup" defaultValue={1}>
              <p style={{marginBottom:'32px'}}>  
                <Radio value={1}> Rento una propiedad </Radio>
              </p>  
              <p style={{marginBottom:'32px'}}>  
                <Radio value={2} >Soy dueño de una propiedad </Radio>
              </p> 
              <p style={{marginBottom:'32px'}}>  
                <Radio value={3}> Asesoro a propietarios e inquilinos </Radio>
              </p>
              
            </Radio.Group>
            
            
          </div>
         
        </div>
      </div>  
    </div>
    
  );
}
 
export default Register;