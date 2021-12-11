import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { Layout, Select, Slider } from "antd";
import {
  callGetAllCustomerById,
  callGetPropertyTypes,
  callAddProperty,
  callGetZipCodeAdress,
  callGetPropertyCoincidences,
  callGlobalActionApi,
} from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { ReactComponent as IconLocation } from "../../../assets/iconSvg/svgFile/iconLocation.svg";
import { ReactComponent as IconHouseFilter } from "../../../assets/iconSvg/svgFile/iconHouseFilter.svg";
import { ReactComponent as IconBed } from "../../../assets/iconSvg/svgFile/bed.svg";

const { Option } = Select;

const Input = styled.input`
  padding: 5px 6px;
  border-radius: 5px;
  background: transparent;
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  outline: none;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  width: 250px;
  border: 1px solid #200e32;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border: 1px solid #b9bbc7;
  }
  &:hover {
    border: 1px solid #b9bbc7;
  }
  &::placeholder {
    font-weight: 200;
  }
`;

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
          max-height: 30px;
          overflow-y: hidden;
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

const FilterPrice = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding: 1em;
  width: 700px;
  .slider-price-input {
    .ant-slider-track {
      background-color: var(--color-primary);
      height: 10px;
      top: 0px;
    }
    .ant-slider-handle {
      width: 20px;
      height: 20px;
      border: solid 2px var(--color-primary);
      margin-top: -10px;
    }
  }
  .input-number-filter {
    display: flex;
    justify-content: space-between;
    .left-position {
      display: flex;
      flex-direction: column;
      label {
      }
    }
    .right-position {
      label {
        text-align: end;
      }
      display: flex;
      flex-direction: column;
    }
  }
`;

const ComponentFilter = (props) => {
  const { dataProfile, callGlobalActionApi, history, onSendFilter } = props;
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [jsonConditionsProperty, setJsonConditionsProperty] = useState(null);
  const [jsonConditionsLocation, setJsonConditionsLocation] = useState({});
  const [jsonConditionsBedRoom, setJsonConditionsBedRoom] = useState(null);
  const [dataLocation, setDataLocation] = useState([]);
  const [amountMinimum, setAmountMinimum] = useState(null);
  const [amountMaximum, setAmountMaximum] = useState(null);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetLocationFilter = async (value) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          type: 1,
          value,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_LOCATION_FILTER
      );

      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataLocation(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPropertyTypes = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 2,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_PROPERTY_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPropertyTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerGetJsonConditions = () => {
    const arrayConditions = [];
    if (isNil(amountMinimum) === false) {
      arrayConditions.push({ queryCondition: 3, compValue: amountMinimum });
    }

    if (isNil(amountMaximum) === false) {
      arrayConditions.push({ queryCondition: 4, compValue: amountMaximum });
    }

    if (
      isNil(jsonConditionsProperty) === false &&
      isEmpty(jsonConditionsProperty) === false
    ) {
      arrayConditions.push(jsonConditionsProperty);
    }

    if (
      isNil(jsonConditionsLocation) === false &&
      isEmpty(jsonConditionsLocation) === false
    ) {
      arrayConditions.push(jsonConditionsLocation);
    }

    if (
      isNil(jsonConditionsBedRoom) === false &&
      isEmpty(jsonConditionsBedRoom) === false
    ) {
      arrayConditions.push({
        queryCondition: 5,
        compValue: jsonConditionsBedRoom,
      });
    }

    return arrayConditions;
  };

  useEffect(() => {
    handlerCallGetAllPropertyTypes();
  }, []);

  return (
    <>
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
                  onChange={(a, e) => {
                    const dataRecord = e.onClick();
                    const objetCondition = {
                      queryCondition: 1,
                      compValue: dataRecord.idPropertyType,
                    };
                    setJsonConditionsProperty(objetCondition);
                  }}
                  placeholder="Inmueble"
                >
                  {isEmpty(dataPropertyTypes) === false &&
                    dataPropertyTypes.map((row) => {
                      return (
                        <Option value={row.id} onClick={() => row}>
                          {row.text}
                        </Option>
                      );
                    })}
                </Select>
              </div>
              <div className="line"></div>
              <div className="group-input">
                <IconLocation width="25px" height="25px" />
                <Select
                showSearch
                  className="select-type-property"
                  onChange={() => {}}
                  placeholder="Ubicación"
                  onChange={(a, e) => {
                    if (isNil(e[0]) === false) {
                      const dataRecord = e[0].onClick();
                      const objetCondition = {
                        queryCondition: 2,
                        compValue: {
                          idState: dataRecord.idState,
                          idMunicipality: dataRecord.idMunicipality,
                          idNeighborhood: dataRecord.idNeighborhood,
                        },
                      };
                      setJsonConditionsLocation(objetCondition);
                    } else {
                      setJsonConditionsLocation({});
                    }
                  }}
                  onSearch={(e) => {
                    if (e.length >= 5) {
                      handlerCallGetLocationFilter(e);
                    }
                  }}
                  tokenSeparators={[","]}
                  filterOption={(input, option) => {
                    if (isNil(option.children) === false) {
                      return (
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }
                  }}
                >
                  {isEmpty(dataLocation) === false &&
                    dataLocation.map((row) => {
                      return (
                        <Option value={row.id} onClick={() => row}>
                          {row.text}
                        </Option>
                      );
                    })}
                </Select>
              </div>
              <div className="line"></div>
              <div className="group-input">
                <IconBed width="25px" height="25px" fill="#4E4B66" />
                <input
                  placeholder="Recamaras"
                  className="input-type-property"
                  type="number"
                  onChange={(e) => {
                    setJsonConditionsBedRoom(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 109 || e.keyCode === 107) {
                      e.preventDefault();
                    }
                  }}
                  min={0}
                />
              </div>
            </div>
            <button
              onClick={async () => {
                try {
                  const jsonCOnditionSend = handlerGetJsonConditions();
                  onSendFilter(JSON.stringify(jsonCOnditionSend));
                } catch (error) {}
              }}
            >
              Buscar
            </button>
          </div>
        </Filter>
      </div>
      <FilterPrice>
        <div className="header-filter">
          <h1>Precio</h1>
        </div>
        <div className="slider-price-input">
          <Slider
            range
            min={1000}
            max={50000}
            defaultValue={[1000, 50000]}
            step={1}
            onChange={(e) => {}}
            onAfterChange={(e) => {
              setAmountMinimum(e[0]);
              setAmountMaximum(e[1]);
            }}
          />
        </div>
        <div className="input-number-filter">
          <div className="left-position">
            <label>Mínimo</label>
            <NumberFormat
              id={null}
              value={amountMinimum}
              error={false}
              customInput={Input}
              thousandSeparator=","
              decimalSeparator="."
              decimalPrecision={2}
              allowNegative={false}
              prefix="$"
              suffix=""
              className="inputLogin"
              floatingLabelText=""
              isVisible
              toBlock={false}
              disable={false}
              placeholder={""}
              onValueChange={(values) => {
                setAmountMinimum(values.floatValue);
              }}
              onClick={(event) => {}}
              onFocus={(event) => {}}
              onBlur={(event) => {}}
              onKeyDown={(e) => {
                if (e.keyCode === 109 || e.keyCode === 107) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="right-position">
            <label>Máximo</label>
            <NumberFormat
              id={null}
              value={amountMaximum}
              error={false}
              customInput={Input}
              thousandSeparator=","
              decimalSeparator="."
              decimalPrecision={2}
              allowNegative={false}
              prefix="$"
              suffix=""
              className="inputLogin"
              floatingLabelText=""
              isVisible
              toBlock={false}
              disable={false}
              placeholder={""}
              onValueChange={(values) => {
                setAmountMaximum(values.floatValue);
              }}
              onClick={(event) => {}}
              onFocus={(event) => {}}
              onBlur={(event) => {}}
              onKeyDown={(e) => {
                if (e.keyCode === 109 || e.keyCode === 107) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </FilterPrice>
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentFilter);
