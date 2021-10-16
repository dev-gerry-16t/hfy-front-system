import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Progress } from "antd";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import CustomTextArea from "../../../components/customTextArea";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const CardInvestigation = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 2fr auto;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }

  .score-user {
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-score {
    padding: 0px 1em;
  }
  .bottom-card-info {
    display: flex;
    justify-content: space-around;
    padding: 0.5em;
  }
`;

const ButtonBack = styled.div`
  background: none;
  cursor: pointer;
`;

const ButtonAction = styled.button`
  background: ${(props) => props.background};
  border: none;
  color: #fff;
  padding: 0.3em 1em;
  border-radius: 1em;
`;

const WidgetCalification = (props) => {
  const {
    score = 0,
    idRejectionReason,
    dataAllReasonRejection,
    callGlobalActionApi,
    rejectionReason,
    idInvestigationProcess,
    idCustomer,
    dataProfile,
    updateDetailUser,
    isApproved,
  } = props;
  const [visibleReasonText, setVisibleReasonText] = useState(false);
  const [dataForm, setDataForm] = useState({
    score,
    idRejectionReason,
    rejectionReason,
    isApproved,
  });
  const frontFunctions = new FrontFunctions();

  const handlerCallUpdateInvestigationProcess = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          ...data,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        idInvestigationProcess,
        API_CONSTANTS.CUSTOMER.UPDATE_INVESTIGATION_PROCESS,
        "PUT"
      );
      updateDetailUser();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <CardInvestigation>
      <h1>Calificación</h1>
      <div className="score-user">
        <Progress
          type="circle"
          percent={(dataForm.score * 100) / 5}
          format={(percent) => (
            <div style={{ fontSize: "0.8em" }}>{(percent * 5) / 100} Score</div>
          )}
        />
      </div>
      <div className="form-score">
        <div>
          <CustomInputTypeForm
            value={dataForm.score}
            label="Score"
            placeholder="Resultado de su investigación"
            onChange={(value) => {
              setDataForm({ ...dataForm, score: value });
            }}
            type="number"
            error={false}
          />
        </div>
        <div>
          <CustomSelect
            value={dataForm.idRejectionReason}
            data={dataAllReasonRejection}
            label="Motivos"
            placeholder=""
            onChange={(value, option) => {
              setVisibleReasonText(option.isOpen);
              setDataForm({ ...dataForm, idRejectionReason: value });
            }}
            error={false}
            errorMessage=""
          />
        </div>
        {visibleReasonText == true && (
          <div style={{ position: "relative" }}>
            <CustomTextArea
              value={dataForm.rejectionReason}
              label="Otro"
              placeholder="Describe el motivo"
              onChange={(value) => {
                setDataForm({ ...dataForm, rejectionReason: value });
              }}
              type="text"
              error={false}
            />
            <ButtonBack
              style={{ position: "absolute", top: 0, left: 50 }}
              onClick={() => {
                setVisibleReasonText(false);
                setDataForm({
                  ...dataForm,
                  idRejectionReason: "",
                  rejectionReason: "",
                });
              }}
            >
              x
            </ButtonBack>
          </div>
        )}
      </div>
      <div className="bottom-card-info">
        <ButtonAction
          background={
            isApproved === null || isApproved == true ? "#ff6f6f" : ""
          }
          onClick={() => {
            handlerCallUpdateInvestigationProcess({
              ...dataForm,
              isApproved: false,
            });
          }}
        >
          Rechazar
        </ButtonAction>
        <ButtonAction
          background={
            isApproved === null || isApproved == false ? "#60db75" : ""
          }
          onClick={() => {
            handlerCallUpdateInvestigationProcess({
              ...dataForm,
              isApproved: true,
            });
          }}
        >
          Aprobar
        </ButtonAction>
      </div>
    </CardInvestigation>
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

export default connect(mapStateToProps, mapDispatchToProps)(WidgetCalification);
