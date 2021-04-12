import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import IconMessages from "../../../assets/icons/chaticon.svg";

const WidgetComment = (props) => {
  const {
    dataIncidenceDetail,
    onChangeTextArea,
    valueTextArea,
    onClickSendMessage,
    onClickViewMore,
  } = props;
  return (
    <div className="card-information">
      <h3>Comentarios</h3>
      {isEmpty(dataIncidenceDetail) === false &&
      isEmpty(dataIncidenceDetail.result2) === false &&
      isNil(dataIncidenceDetail.result2[0]) === false ? (
        <>
          <div className="content-messages-sections">
            <div className="section-history-messages-dialog">
              <div className="item-messages">
                <div className="item-message-1">
                  <div
                    className="elipse-icon"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <img src={IconMessages} alt="icon" width="20px"></img>
                  </div>
                  <div className="message-name-send">
                    <strong>{dataIncidenceDetail.result2[0].createdBy}</strong>
                    <span>{dataIncidenceDetail.result2[0].createdAt}</span>
                  </div>
                </div>
                <div className="item-message-2">
                  {dataIncidenceDetail.result2[0].comment}
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", margin: "5px 0px" }}>
            <a onClick={onClickViewMore}>Ver todos</a>
          </div>
        </>
      ) : (
        <label>Aún no existen comentarios</label>
      )}
      <div className="section-message">
        <textarea
          placeholder="Ingresar comentario"
          className="text-comment-dialog"
          value={valueTextArea}
          maxlength="150"
          onChange={(e) => {
            onChangeTextArea(e.target.value);
          }}
        />
        <button type="button" onClick={onClickSendMessage}>
          <i className="fa fa-send" />
        </button>
      </div>
    </div>
  );
};

export default WidgetComment;
