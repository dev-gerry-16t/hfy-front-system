import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  return (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1>Inicia sesión</h1>
          <div className="login_inputs_form">
            <div className="login-ant-input">
              <label className="login-label-placeholder">Correo</label>
              <Input
                suffix={<UserOutlined className="site-form-item-icon" />}
              />
            </div>
            <div className="login-ant-input">
              <label className="login-label-placeholder">Contraseña</label>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
          <div className="login-recover-pass">
            <p>Olvidé mi contraseña</p>
          </div>
          <div className="button_init_primary">
            <button>
              <span>Iniciar sesión</span>
            </button>
          </div>
        </div>
        <div className="login_divider">
          <hr />
          <span>No tengo cuenta</span>
          <hr />
        </div>
        <div className="login_bottom_form">
          <div className="button_init_secondary">
            <button>
              <span>Crear cuenta</span>
            </button>
          </div>
        </div>
      </div>
      <div className="login_footer_version">
        <h3>{GLOBAL_CONSTANTS.VERSION}</h3>
      </div>
    </div>
  );
};

export default Login;
