import React from "react";
import { Avatar, Rate } from "antd";

const SectionInfoTenant = () => {
  return (
    <div className="top-info-tenant">
      <div className="card-info-tenant">
        <div className="avatar-user">
          <Avatar
            size={70}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </div>
        <div className="info-tenant">
          <div className="info-user">
            <strong>Pedro Ramirez</strong>
            <Rate
              style={{
                fontSize: "30px",
                position: "relative",
                bottom: "5px",
              }}
              tooltips={[]}
              onChange={() => {}}
              value={5}
            />
          </div>
          <div className="data-contact">
            Telefrono: 55 55555 5555
            <br />
            Email: correo@correo.com
          </div>
        </div>
      </div>
      <div className="card-data-tenant">
        <div className="info-property-tenant">
          <div>
            <span>Propiedad:</span>
            <span>Departamento:</span>
            <span>Próximo Pago:</span>
            <span>Monto de Renta:</span>
            <span>Incidencias:</span>
          </div>
          <div>
            <strong>Grand del Valle</strong>
            <strong>I201</strong>
            <strong>03 Feb 21</strong>
            <strong>$18,000.00</strong>
            <strong>2</strong>
          </div>
        </div>
        <div className="status-tenant">
          <div className="status-payment">
            <span>PAGO PENDIENTE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInfoTenant;
