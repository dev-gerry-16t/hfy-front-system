import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import WidgetComment from "../widgets/widgetComments";
import WidgetDetailIncidence from "../widgets/widgetDetailIncidence";
import IconMessages from "../../../assets/icons/chaticon.svg";
import WidgetPaymentAccept from "../widgets/widgetPaymentAccept";

const SectionDetailIncidence = (props) => {
  const { dataIncidenceDetail, onSendAnnotations } = props;
  const [comment, setComment] = useState("");
  const [comment1, setComment1] = useState("");
  const [isVisibleAllComments, setIsVisibleAllComments] = useState(false);

  return (
    <div className="content-card-incidence-dialog">
      {isVisibleAllComments === false && (
        <>
          <div className="top-background-dialog"></div>
          <div className="content-cards-dialog">
            <WidgetPaymentAccept
              isVisiblePayment={dataIncidenceDetail.result1.requieresPayment}
              dataIncidenceDetail={dataIncidenceDetail.result1}
              valueTextArea={comment1}
              onChangeTextArea={(value) => {
                setComment1(value);
              }}
              onClickAcceptPayment={async () => {
                try {
                  await onSendAnnotations(
                    { isPaymentAccepted: true },
                    dataIncidenceDetail.result1.idIncidence
                  );
                } catch (error) {}
              }}
              onClickAcceptService={async () => {
                try {
                  await onSendAnnotations(
                    { confirmProvider: true },
                    dataIncidenceDetail.result1.idIncidence
                  );
                } catch (error) {}
              }}
              onClickSendMessageService={async () => {
                try {
                  if (isEmpty(comment1) === false) {
                    await onSendAnnotations(
                      { annotations: comment1, confirmProvider: false },
                      dataIncidenceDetail.result1.idIncidence
                    );
                    setComment1("");
                  }
                } catch (error) {}
              }}
              onClickSendMessage={async () => {
                try {
                  if (isEmpty(comment1) === false) {
                    await onSendAnnotations(
                      { annotations: comment1, isPaymentAccepted: false },
                      dataIncidenceDetail.result1.idIncidence
                    );
                    setComment1("");
                  }
                } catch (error) {}
              }}
            />
            <WidgetDetailIncidence dataIncidenceDetail={dataIncidenceDetail} />
            <WidgetComment
              dataIncidenceDetail={dataIncidenceDetail}
              onChangeTextArea={(value) => {
                setComment(value);
              }}
              valueTextArea={comment}
              onClickViewMore={() => {
                setIsVisibleAllComments(true);
              }}
              onClickSendMessage={async () => {
                try {
                  if (isEmpty(comment) === false) {
                    await onSendAnnotations(
                      { annotations: comment },
                      dataIncidenceDetail.result1.idIncidence
                    );
                    setComment("");
                  }
                } catch (error) {}
              }}
            />
          </div>
          <div className="bottom-background-information">
            <div className="sticker-status">
              <span>
                Estatus:{" "}
                <strong>{dataIncidenceDetail.result1.incidenceStatus}</strong>
              </span>
            </div>
          </div>
        </>
      )}
      {isVisibleAllComments === true && (
        <div
          style={{
            width: "98%",
            position: "relative",
          }}
        >
          <div
            style={{
              margin: "20px",
            }}
          >
            <h3
              style={{
                color: "var(--color-primary)",
                fontFamily: "Poppins",
              }}
            >
              Todos los comentarios
            </h3>
          </div>
          <button
            style={{
              position: "absolute",
              right: "20px",
              top: "10px",
              border: "none",
              background: "transparent",
              fontSize: "25px",
            }}
            onClick={() => {
              setIsVisibleAllComments(false);
            }}
          >
            x
          </button>
          <div className="content-messages-sections">
            <div className="section-history-messages-dialog">
              {dataIncidenceDetail.result2.map((row) => {
                return (
                  <div
                    className="item-messages"
                    style={{ marginBottom: "10px" }}
                  >
                    <div className="item-message-1">
                      <div
                        className="elipse-icon"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <img src={IconMessages} alt="icon" width="20px"></img>
                      </div>
                      <div className="message-name-send">
                        <strong>{row.createdBy}</strong>
                        <span>{row.createdAt}</span>
                      </div>
                    </div>
                    <div className="item-message-2">{row.comment}</div>
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDetailIncidence;
