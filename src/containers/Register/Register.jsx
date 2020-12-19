import React, { useState } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Radio, Select, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { callApiLogin } from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import logo from "../../assets/img/logo.png";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Register = (props) => {
  const { history } = props;
  const [userType, setUserType] = useState(1);

  const selectPerson = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> ¿Qué te trae por aquí? </h1>
          <div className="login_inputs_form">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <p style={{ marginBottom: "32px" }}>
                <Radio value={1}> Rento una propiedad </Radio>
              </p>
              <p style={{ marginBottom: "32px" }}>
                <Radio value={2}>Soy dueño de una propiedad </Radio>
              </p>
              <p style={{ marginBottom: "32px" }}>
                <Radio value={3}> Asesoro a propietarios e inquilinos </Radio>
              </p>
            </Radio.Group>
            <div className="button_init_primary">
              <button
                type="button"
                onClick={() => {
                  setUserType(2);
                }}
              >
                <span>Continuar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const selectForm = (
    <div className="login_main" style={{ height: "100%" }}>
      <div className="login_card_form large">
        <div className="register_holder">
          <div className="login_top_form">
            <h1> Completa tu perfil </h1>
            <label className="fieldset_title">Información personal</label>
            <div className="register_row half">
              <Select placeholder="Tipo de Persona">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select placeholder="Aval">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="register_row">
              <Input suffix={<UserOutlined />} placeholder="Nombre(s):" />
            </div>
            <div className="register_row half">
              <Input suffix={<UserOutlined />} placeholder="Primer Apellido" />
              <Input suffix={<UserOutlined />} placeholder="Segundo Apellido" />
            </div>
            <label className="fieldset_title"> Información de contacto </label>
            <div className="register_row half" style={{ marginBottom: "40px" }}>
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
            <div className="register_row half" style={{ marginBottom: "40px" }}>
              <Input suffix={<KeyOutlined />} placeholder="Contraseña" />
              <Input
                suffix={<KeyOutlined />}
                placeholder="Confirmar Contraseña"
              />
            </div>
            <div className="button_init_primary" style={{ margin: "56px 0 0" }}>
              <button
                type="button"
                onClick={() => {
                  setUserType(3);
                }}
              >
                <span> Finalizar registro </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const insterCodeCompoent = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Ingresa tu código </h1>
          <p className="recoverInstructions">
            Enviamos un código de confirmacion al correo correo@corroe.com
          </p>
          <div className="codeForm">
            <div className="codeFormItem">
              <Input
                id="input-code-validate-0"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                  } else {
                    document.getElementById("input-code-validate-1").focus();
                  }
                }}
              />
            </div>
            <div className="codeFormItem">
              <Input
                id="input-code-validate-1"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                    document.getElementById("input-code-validate-0").focus();
                  } else {
                    document.getElementById("input-code-validate-2").focus();
                  }
                }}
              />
            </div>
            <div className="codeFormItem">
              <Input
                id="input-code-validate-2"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                    document.getElementById("input-code-validate-1").focus();
                  } else {
                    document.getElementById("input-code-validate-3").focus();
                  }
                }}
              />
            </div>
            <div className="codeFormItem">
              <Input
                id="input-code-validate-3"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                    document.getElementById("input-code-validate-2").focus();
                  } else {
                    document.getElementById("input-code-validate-4").focus();
                  }
                }}
              />
            </div>
            <div className="codeFormItem">
              <Input
                id="input-code-validate-4"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                    document.getElementById("input-code-validate-3").focus();
                  } else {
                    document.getElementById("input-code-validate-5").focus();
                  }
                }}
              />
            </div>
            <div className="codeFormItem">
              <Input
                id="input-code-validate-5"
                type='number'
                maxLength={1}
                onChange={(event) => {
                  if (event.target.value === "") {
                    document.getElementById("input-code-validate-4").focus();
                  }
                }}
              />
            </div>
          </div>
          <div className="button_init_primary" style={{ margin: "60px 0 0" }}>
            <button
              type="button"
              onClick={() => {
                setUserType(4);
              }}
            >
              <span> Validar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const successRegister = (
    <div className="login_main">
      <div className="login_card_form">
        <div className="login_top_form">
          <h1> Registro completo </h1>
          <p className="recoverInstructions">
            Felicidades tu registro se realizó con éxito!
          </p>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                history.push("/login");
              }}
            >
              <span>Ir al Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypeComponent = (type) => {
    let component = <div />;
    switch (type) {
      case 1:
        component = selectPerson;
        break;
      case 2:
        component = selectForm;
        break;
      case 3:
        component = insterCodeCompoent;
        break;
      case 4:
        component = successRegister;
        break;
      default:
        component = <div />;
        break;
    }
    return component;
  };
  return (
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Homify Logo" className="login_logo" />
      </div>
      {renderTypeComponent(userType)}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
