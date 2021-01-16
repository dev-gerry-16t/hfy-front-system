import React, { useRef } from "react";
import { Pagination, Carousel, Select } from "antd";

const { Option } = Select;

const SectionDocuments = () => {
  const dotChange = useRef(null);

  return (
    <div className="main-content-tabs">
      <div className="content-documents">
        <div className="content-history">
          <div className="select-file">
            <Select
              placeholder="Tipo de documento"
              onChange={(value, option) => {
                const configureOption = option.onClick();
              }}
            >
              <Option value="1" onClick={() => {}}>
                Comprobante de pago
              </Option>
            </Select>
          </div>
          <div className="content-files">
            <div className="card-file-information">
              <div className="box-preview">
                <div></div>
              </div>
              <div className="box-information">
                <strong>Comprobante de pago de agua</strong>
                <div className="data-image">
                  <div>
                    <span>Subido por:</span>
                    <span>Fecha de pago:</span>
                  </div>
                  <div>
                    <strong>Ernesto Rodriguez</strong>
                    <strong>02 Dic 20</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-file-information">
              <div className="box-preview">
                <div></div>
              </div>
              <div className="box-information">
                <strong>Comprobante de pago de agua</strong>
                <div className="data-image">
                  <div>
                    <span>Subido por:</span>
                    <span>Fecha de pago:</span>
                  </div>
                  <div>
                    <strong>Ernesto Rodriguez</strong>
                    <strong>02 Dic 20</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-file-information">
              <div className="box-preview">
                <div></div>
              </div>
              <div className="box-information">
                <strong>Comprobante de pago de agua</strong>
                <div className="data-image">
                  <div>
                    <span>Subido por:</span>
                    <span>Fecha de pago:</span>
                  </div>
                  <div>
                    <strong>Ernesto Rodriguez</strong>
                    <strong>02 Dic 20</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="content-upload">
          <div className="button_init_primary">
            <label type="button" for="file-input" onClick={() => {}}>
              <span>Subir documentos</span>
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg , image/gif"
              onChange={(e) => {}}
            />
          </div>
          <div className="section-container-action-up">
            <div className="container-carousel">
              <Carousel afterChange={() => {}} ref={dotChange} dots={false}>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
              </Carousel>
            </div>
            <Pagination
              pageSize={1}
              size="small"
              total={3}
              onChange={(event) => {
                dotChange.current.goTo(event - 1);
              }}
            />
          </div>
        </div>
       */}
      </div>
    </div>
  );
};

export default SectionDocuments;
