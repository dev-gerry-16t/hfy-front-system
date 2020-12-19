import React from 'react';
import "antd/dist/antd.css";
import { Input, Select} from "antd";
import {
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    KeyOutlined
  } from "@ant-design/icons";

const { Option } = Select;

const RegisterForm = () => {

  return ( 
    <div className="login_main" style={{height:'100%'}}>
      <div className="login_card_form large">
        <div className="register_holder">
          <div className="login_top_form"> 
            <h1> Completa tu perfil </h1>

            <label className="fieldset_title">
               Información personal 
            </label>

            <div className="register_row half">
              <Select  
                placeholder="Tipo de Persona"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
               </Select>

               <Select 
                  placeholder="Aval" 
                >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
               </Select> 
            </div>
            <div className="register_row">
              <Input
                suffix={<UserOutlined  />}
                placeholder="Nombre(s):"
              />
            </div>
            <div className="register_row half">
              <Input
                suffix={<UserOutlined  />}
                placeholder="Primer Apellido"
              /> 

              <Input
                suffix={<UserOutlined  />}
                placeholder="Segundo Apellido"
              />    
            </div> 

            <label className="fieldset_title"> Información de contacto </label>

            <div className="register_row half">
              <Input
                suffix={<PhoneOutlined />}
                placeholder="Teléfono celular"
              /> 

              <Input
                suffix={<MailOutlined />}
                placeholder="Correo electrónico"
              />    
            </div> 

            <label className="fieldset_title"> Contraseña </label>

            <div className="register_row half">
              <Input
                suffix={<KeyOutlined />}
                placeholder="Contraseña"
              /> 

              <Input
                suffix={<KeyOutlined />}
                placeholder="Confirmar Contraseña"
              />    
            </div> 
            
            <div className="button_init_primary" style={{margin:'16px 0 0'}}>
              <button>
                <span> Finalizar registro </span>
              </button>
            </div> 

          </div>
        </div> 
      </div>  
    </div>
  );
}
 
export default RegisterForm;