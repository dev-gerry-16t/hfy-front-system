import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";

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
  useEffect(() => {
    if (isEmpty(data) === false && isNil(selected) === false) {
      const newSelect = data.map((row) => {
        let returnRow = { ...row, select: false };
        const filterId = selected.find((rowMap) => {
          return rowMap.id === row.id;
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
                  return {
                    ...rowMap,
                    select: rowMap.id === row.id ? !row.select : rowMap.select,
                  };
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
                  return {
                    ...rowMap,
                    select: rowMap.id === row.id ? !row.select : rowMap.select,
                  };
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
      </ButtonsChips>
    </div>
  );
};

export default CustomChips;
