import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Select } from "antd";
import { ReactComponent as IconLocation } from "../../../assets/iconSvg/svgFile/iconLocation.svg";
import { ReactComponent as IconHouseFilter } from "../../../assets/iconSvg/svgFile/iconHouseFilter.svg";
import { ReactComponent as IconBed } from "../../../assets/iconSvg/svgFile/bed.svg";

const { Option } = Select;

const Filter = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .header-filter {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    .button-rent-select {
      border: none;
      border-bottom: 2px solid var(--color-primary);
      background: transparent;
      color: var(--color-primary);
      font-weight: 700;
      margin-left: 3em;
      padding: 0px 1em;
    }
  }
  .inputs-filter {
    display: flex;
    align-items: center;
    gap: 0.5em;
    button {
      background: var(--color-primary);
      color: #fff;
      border: none;
      border-radius: 1em;
      padding: 0.6em 2em;
      font-weight: 700;
      letter-spacing: 0.75px;
    }
    .group-inputs-filter {
      display: flex;
      align-items: center;
      padding: 0.5em;
      border: 1px solid #200e32;
      border-radius: 1em;
      .group-input {
        display: flex;
        align-items: center;

        .select-type-property {
          width: 230px;
          margin-left: 10px;

          .ant-select-selector {
            border: none;
            box-shadow: none;
            .ant-select-selection-placeholder {
              font-style: italic;
            }
          }
        }
        .input-type-property {
          width: 150px;
          border: none;
          outline: none;
          margin-left: 10px;
        }
        .input-type-property::placeholder {
          color: #bfbfbf;
          font-style: italic;
          font-size: 14px;
        }
      }
      .line {
        width: 25px;
        height: 0px;
        border: 1px solid #200e32;
        transform: rotate(-90deg);
      }
    }
  }
`;

const ComponentFilter = () => {
  return (
    <div className="filter-actions-components">
      <Filter>
        <div className="header-filter">
          <h1>Propiedades</h1>
          <button className="button-rent-select">Renta</button>
        </div>
        <div className="inputs-filter">
          <div className="group-inputs-filter">
            <div className="group-input">
              <IconHouseFilter width="25px" height="25px" />
              <Select
                className="select-type-property"
                onChange={() => {}}
                placeholder="Inmueble"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="line"></div>
            <div className="group-input">
              <IconLocation width="25px" height="25px" />
              <Select
                className="select-type-property"
                onChange={() => {}}
                placeholder="Ubicación"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="line"></div>
            <div className="group-input">
              <IconBed width="25px" height="25px" fill="#4E4B66" />
              <input
                placeholder="Recamaras"
                className="input-type-property"
                type="number"
              />
            </div>
          </div>
          <button>Buscar</button>
        </div>
      </Filter>
      {/* <div>Precio</div> */}
    </div>
  );
};

export default ComponentFilter;
