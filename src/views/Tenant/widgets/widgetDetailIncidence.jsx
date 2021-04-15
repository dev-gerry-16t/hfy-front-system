import React from "react";
import isEmpty from "lodash/isEmpty";

const WidgetDetailIncidence = (props) => {
  const { dataIncidenceDetail } = props;
  return (
    <div className="card-information">
      <div className="tag-card"></div>
      <h3>
        {isEmpty(dataIncidenceDetail) === false
          ? dataIncidenceDetail.result1.incidenceType
          : ""}
      </h3>
      <label>Descripción de incidencia:</label>
      <p
        style={{
          maxHeight: 85,
          overflowY: "scroll",
        }}
      >
        {isEmpty(dataIncidenceDetail) === false
          ? dataIncidenceDetail.result1.description
          : ""}
      </p>
      <span title="date">
        {isEmpty(dataIncidenceDetail) === false
          ? dataIncidenceDetail.result1.createdAtFormat
          : ""}
      </span>
      <strong title="folio">Folio:{" "}
        {isEmpty(dataIncidenceDetail) === false
          ? dataIncidenceDetail.result1.incidenceInvoice
          : ""}
      </strong>
    </div>
  );
};

export default WidgetDetailIncidence;
