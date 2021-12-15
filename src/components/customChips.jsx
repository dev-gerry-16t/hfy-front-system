import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import CustomInputTypeForm from "./CustomInputTypeForm";

const PseudoSelect = styled.div`
  min-height: 2em;
  border: 1px solid #d6d8e7;
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
  gap: 0.6em;
  flex-wrap: wrap;
  .chip-select {
    padding: 0.2em 1em;
    border: 1px solid #d6d8e7;
    border-radius: 0.5em;
    width: fit-content;
    .text-chip {
      font-size: 0.8em;
      margin-right: 5px;
    }
    .action-chip {
      color: #d6d8e7;
      cursor: pointer;
    }
  }
`;

const ButtonsChips = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: flex-start;
  gap: 0.6em;
  flex-wrap: wrap;
  font-size: 0.8em;
`;

const ButtonCheck = styled.button`
  border: ${(props) =>
    props.selected === true ? "1px solid #FF0083" : "1px solid #d6d8e7"};
  border-radius: 0.5em;
  background: ${(props) =>
    props.selected === true ? "rgba(255, 0, 131, 0.2)" : "transparent"};
  color: #000;
  padding: 0.2em 0.8em;
  box-shadow: ${(props) =>
    props.selected ? "0px 0px 5px 2px rgba(255, 0, 131, 0.15)" : "none"};
`;

const SectionAddChip = styled.div`
  width: 360px;
  margin-top: 15px;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  border: 1px solid gray;
  .poster-text {
    color: #4e4b66;
    margin-left: 2em;
    font-weight: 400;
  }
  .close-section {
    display: flex;
    justify-content: space-between;
    padding: 0px 1em;
    margin-bottom: 10px;
    color: var(--color-primary);
    font-weight: 600;
  }
  .input-button-add {
    padding: 0px 1em;
    display: flex;
    flex-direction: column;
    column-gap: 1em;
    .input-add {
    }
    .button-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      button {
        padding: 5px 1em;
        border: none;
        background: var(--color-primary);
        border-radius: 16px;
        color: #fff;
        font-weight: 600;
      }
    }
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

const ButtonHeader = styled.button`
  background: transparent;
  border: none;
`;

const Chips = ({ text, onClick }) => {
  return (
    <div className="chip-select">
      <span className="text-chip">{text}</span>
      <span className="action-chip" onClick={onClick}>
        x
      </span>
    </div>
  );
};

const CustomChips = ({ data, onChange, selected }) => {
  const [newArray, setNewArray] = useState([]);
  const [arrayData, setArrayData] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [countAddChip, setCountAddChip] = useState(1);
  const [newChip, setNewChip] = useState(null);
  useEffect(() => {
    if (isEmpty(data) === false && isNil(selected) === false) {
      const newSelect = data.map((row) => {
        let returnRow = { ...row, select: false };
        const filterId = selected.find((rowMap) => {
          return rowMap.id == row.id;
        });
        if (isNil(filterId) === false) {
          returnRow = { ...row, select: true };
        }
        return returnRow;
      });
      const arrayChips = newSelect.filter((rowFilter) => {
        return rowFilter.select === true;
      });
      setNewArray(arrayChips);
      setArrayData(newSelect);
    }
  }, [data]);
  return (
    <div>
      <PseudoSelect>
        {newArray.map((row) => {
          return (
            <Chips
              text={row.text}
              onClick={() => {
                const arraySelect = arrayData.map((rowMap) => {
                  if (
                    (isNil(row.id) === true || isNil(rowMap.id) === true) &&
                    (isNil(row.pseudoId) === false ||
                      isNil(rowMap.pseudoId) === false)
                  ) {
                    return {
                      ...rowMap,
                      select:
                        rowMap.pseudoId === row.pseudoId
                          ? !row.select
                          : rowMap.select,
                    };
                  } else {
                    return {
                      ...rowMap,
                      select:
                        rowMap.id === row.id ? !row.select : rowMap.select,
                    };
                  }
                });
                const arrayChips = arraySelect.filter((rowFilter) => {
                  return rowFilter.select === true;
                });
                const arrayOnChange = arrayChips.map((rowMap) => {
                  return { id: rowMap.id, text: rowMap.text };
                });
                onChange(arrayOnChange, arrayOnChange.join());
                setNewArray(arrayChips);
                setArrayData(arraySelect);
              }}
            />
          );
        })}
      </PseudoSelect>
      <ButtonsChips>
        {arrayData.map((row) => {
          return (
            <ButtonCheck
              selected={row.select}
              onClick={() => {
                const arraySelect = arrayData.map((rowMap) => {
                  if (
                    (isNil(row.id) === true || isNil(rowMap.id) === true) &&
                    (isNil(row.pseudoId) === false ||
                      isNil(rowMap.pseudoId) === false)
                  ) {
                    return {
                      ...rowMap,
                      select:
                        rowMap.pseudoId === row.pseudoId
                          ? !row.select
                          : rowMap.select,
                    };
                  } else {
                    return {
                      ...rowMap,
                      select:
                        rowMap.id === row.id ? !row.select : rowMap.select,
                    };
                  }
                });
                const arrayChips = arraySelect.filter((rowFilter) => {
                  return rowFilter.select === true;
                });
                const arrayOnChange = arrayChips.map((rowMap) => {
                  return { id: rowMap.id, text: rowMap.text };
                });
                onChange(arrayOnChange, arrayOnChange.join());
                setNewArray(arrayChips);
                setArrayData(arraySelect);
              }}
            >
              {row.text}
            </ButtonCheck>
          );
        })}
        <ButtonCheck
          selected={false}
          onClick={() => {
            setIsOpenAdd(!isOpenAdd);
          }}
        >
          Agregar personalizado +
        </ButtonCheck>
      </ButtonsChips>
      {isOpenAdd === true && (
        <SectionAddChip>
          <div className="close-section">
            <span>Característica personalizada</span>
            <ButtonHeader
              onClick={() => {
                setIsOpenAdd(false);
              }}
            >
              X
            </ButtonHeader>
          </div>
          <div className="input-button-add">
            <div className="input-add">
              <CustomInputTypeForm
                value={newChip}
                placeholder="Escribe una característica"
                label=""
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setNewChip(value);
                }}
                onKeyEnter={() => {
                  const arraySelect = arrayData;
                  arraySelect.push({
                    id: null,
                    pseudoId: `new-chip-${countAddChip}`,
                    idPropertyAmenity: null,
                    propertyAmenity: newChip,
                    select: true,
                    style: null,
                    text: newChip,
                  });
                  const arrayChips = arraySelect.filter((rowFilter) => {
                    return rowFilter.select === true;
                  });
                  const arrayOnChange = arrayChips.map((rowMap) => {
                    return { id: rowMap.id, text: rowMap.text };
                  });
                  onChange(arrayOnChange, arrayOnChange.join());
                  setArrayData(arraySelect);
                  setNewArray(arrayChips);
                  setNewChip(null);
                  setIsOpenAdd(false);
                  setCountAddChip(countAddChip + 1);
                }}
                type="text"
              />
            </div>
            <div className="button-add">
              <button
                onClick={async () => {
                  try {
                    const arraySelect = arrayData;
                    arraySelect.push({
                      id: null,
                      pseudoId: `new-chip-${countAddChip}`,
                      idPropertyAmenity: null,
                      propertyAmenity: newChip,
                      select: true,
                      style: null,
                      text: newChip,
                    });
                    const arrayChips = arraySelect.filter((rowFilter) => {
                      return rowFilter.select === true;
                    });
                    const arrayOnChange = arrayChips.map((rowMap) => {
                      return { id: rowMap.id, text: rowMap.text };
                    });
                    onChange(arrayOnChange, arrayOnChange.join());
                    setArrayData(arraySelect);
                    setNewArray(arrayChips);
                    setNewChip(null);
                    setIsOpenAdd(false);
                    setCountAddChip(countAddChip + 1);
                  } catch (error) {}
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        </SectionAddChip>
      )}
    </div>
  );
};

export default CustomChips;
