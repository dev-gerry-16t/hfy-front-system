import React from "react";
import isEmpty from "lodash/isEmpty";

const SubSectionSummary = (props) => {
  const { dataSummary } = props;
  let component = <div />;
  if (isEmpty(dataSummary) === false) {
    component = (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0px 15px",
        }}
      >
        <p>Resumen</p>
        <table
          style={{
            width: "100%",
            fontFamily: "Poppins",
            fontSize: "11px",
          }}
        >
          <tr>
            <td>Monto de renta</td>
            <td>{dataSummary.currentRentFormat}</td>
          </tr>
          <tr>
            <td>Costo mantenimiento</td>
            <td>{dataSummary.maintenanceAmountFormat}</td>
          </tr>
          <tr>
            <td>Mes correspondiente</td>
            <td>{dataSummary.dateDescription}</td>
          </tr>
          <tr>
            <td>Interes</td>
            <td>{dataSummary.interestArrears}</td>
          </tr>
          <tr>
            <td>Monto de interes</td>
            <td>{dataSummary.amountInterestFormat}</td>
          </tr>
          <tr>
            <td>Pagos recibidos</td>
            <td>{dataSummary.paymentsMade}</td>
          </tr>
          <tr
            style={{
              background: "#faebd7",
              fontWeight: 600,
            }}
          >
            <td>Monto total</td>
            <td>{dataSummary.totalAmountFormat}</td>
          </tr>
        </table>
      </div>
    );
  }
  return component;
};

export default SubSectionSummary;
