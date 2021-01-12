import React from "react";
import isNil from "lodash/isNil";
import ArrowRightCircle from "../../../assets/icons/ArrowRightCircle.svg";

const SubSectionSummary = (props) => {
  const { viewSummary, onClickViewSummary, dataForm, frontFunctions } = props;
  return (
    <>
      {viewSummary === true && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0px 15px",
          }}
        >
          <p>
            Resumen
            <img
              src={ArrowRightCircle}
              alt="backTo"
              width="25"
              style={{
                cursor: "pointer",
                marginLeft: "5px",
                position: "relative",
                bottom: "2px",
              }}
              onClick={onClickViewSummary}
            />
          </p>
          <table
            style={{
              width: "100%",
              fontFamily: "Poppins",
              fontSize: "11px",
            }}
          >
            <tr>
              <td>Monto de renta</td>
              <td>
                {isNil(dataForm.maximunAdvanceRents) === false &&
                isNil(dataForm.currentRentFormat) === false
                  ? frontFunctions.parseFormatCurrency(
                      dataForm.currentRentFormat
                    )
                  : "$0.00"}
              </td>
            </tr>
            <tr>
              <td>Adelantos</td>
              <td>{dataForm.maximunAdvanceRents}</td>
            </tr>
            <tr>
              <td>Monto total adelanto</td>
              <td>
                {isNil(dataForm.maximunAdvanceRents) === false &&
                isNil(dataForm.currentRentFormat) === false
                  ? frontFunctions.parseFormatCurrency(
                      dataForm.currentRentFormat * dataForm.maximunAdvanceRents,
                      2
                    )
                  : "$0.00"}
              </td>
            </tr>
            <tr>
              <td>Servicio Homify 3%</td>
              <td>
                {isNil(dataForm.maximunAdvanceRents) === false &&
                isNil(dataForm.currentRentFormat) === false
                  ? frontFunctions.parseFormatCurrency(
                      dataForm.currentRentFormat *
                        (dataForm.maximunAdvanceRents * 0.03),
                      2
                    )
                  : "$0.00"}
              </td>
            </tr>
            <tr
              style={{
                background: "#faebd7",
                fontWeight: 600,
              }}
            >
              <td>Monto neto adelanto</td>
              <td>
                {isNil(dataForm.maximunAdvanceRents) === false &&
                isNil(dataForm.currentRentFormat) === false
                  ? frontFunctions.parseFormatCurrency(
                      dataForm.currentRentFormat *
                        (dataForm.maximunAdvanceRents * 0.97),
                      2
                    )
                  : "$0.00"}
              </td>
            </tr>
          </table>
        </div>
      )}
      {viewSummary === false && (
        <>
          <p>Monto total de adelanto</p>
          <div>
            <h2>
              {isNil(dataForm.maximunAdvanceRents) === false &&
              isNil(dataForm.currentRentFormat) === false
                ? frontFunctions.parseFormatCurrency(
                    dataForm.currentRentFormat * dataForm.maximunAdvanceRents,
                    2
                  )
                : "$0.00"}
            </h2>
            <strong>MXN</strong>
          </div>
          <p>Monto neto de adelanto</p>
          <div>
            <h2>
              {isNil(dataForm.maximunAdvanceRents) === false &&
              isNil(dataForm.currentRentFormat) === false
                ? frontFunctions.parseFormatCurrency(
                    dataForm.currentRentFormat *
                      (dataForm.maximunAdvanceRents * 0.97),
                    2
                  )
                : "$0.00"}
            </h2>
            <strong>MXN</strong>
            <img
              src={ArrowRightCircle}
              alt="backTo"
              width="25"
              style={{
                cursor: "pointer",
                marginLeft: "5px",
                position: "relative",
                bottom: "2px",
              }}
              onClick={onClickViewSummary}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SubSectionSummary;
