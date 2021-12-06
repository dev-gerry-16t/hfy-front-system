import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Progress, Select, Popover } from "antd";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomInputCurrency from "../../../components/customInputCurrency";
import CustomSelect from "../../../components/CustomSelect";
import CustomTextArea from "../../../components/customTextArea";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { split } from "lodash";

const { Option } = Select;

const ButtonSticky = styled.button`
  border: none;
  border-radius: 1em;
  padding: 0.5em;
  font-weight: 700;
  cursor: pointer;
  background: var(--color-primary);
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const Content = styled.div`
  .bottom-card-info {
    display: flex;
    justify-content: space-around;
    padding: 0.5em;
    margin-top: 10px;
  }
`;

const ButtonAction = styled.button`
  background: ${(props) => props.background};
  border: none;
  color: #fff;
  padding: 0.3em 1em;
  border-radius: 1em;
`;

const WidgetInvestigation = (props) => {
  const {
    idInvestigationStatus,
    dataInvStatus,
    dataPolicies,
    paymentCapacity,
    callGlobalActionApi,
    idInvestigationProcess,
    idCustomer,
    dataProfile,
    updateDetailUser,
    howManyUser,
    policiesApproved,
  } = props;
  const [selectPolicies, setSelectPolicies] = useState([]);
  const [dataForm, setDataForm] = useState({
    idInvestigationStatus,
    paymentCapacity,
    policiesApproved,
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

  useEffect(() => {
    if (isEmpty(dataPolicies) === false) {
      const selectPolicies =
        isNil(policiesApproved) === false && isEmpty(policiesApproved) === false
          ? policiesApproved.split(",")
          : [];
      setSelectPolicies(selectPolicies);
    }
  }, [dataPolicies]);

  return (
    <Popover
      content={
        <Content>
          <div>
            <CustomSelect
              value={dataForm.idInvestigationStatus}
              data={dataInvStatus}
              label="Estatus"
              placeholder=""
              onChange={(value, option) => {
                setDataForm({
                  ...dataForm,
                  idInvestigationStatus: value,
                });
              }}
              error={false}
              errorMessage=""
            />
          </div>
          <div>
            <CustomInputCurrency
              value={dataForm.paymentCapacity}
              label="Capacidad de pago"
              placeholder="Cuanto puede pagar de renta"
              onChange={(value) => {
                setDataForm({ ...dataForm, paymentCapacity: value });
              }}
              type="number"
              error={false}
            />
          </div>
          <div>
            <Select
              mode="multiple"
              allowClear
              value={selectPolicies}
              style={{ width: "100%" }}
              placeholder="Pólizas aprobadas"
              defaultValue={selectPolicies}
              onChange={(value) => {
                const joinArray = value.join();
                setSelectPolicies(value);
                setDataForm({ ...dataForm, policiesApproved: joinArray });
              }}
            >
              {isEmpty(dataPolicies) === false &&
                dataPolicies.map((row) => {
                  return <Option key={row.id}>{row.text}</Option>;
                })}
            </Select>
          </div>
          <div className="bottom-card-info">
            <ButtonAction
              background="var(--color-primary)"
              onClick={() => {
                handlerCallUpdateInvestigationProcess(dataForm);
              }}
            >
              Aplicar
            </ButtonAction>
          </div>
        </Content>
      }
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Investigación</span>
          {howManyUser > 1 && (
            <ButtonAction
              background="#00aae4"
              onClick={() => {
                handlerCallUpdateInvestigationProcess({ switchCustomer: true });
              }}
            >
              Cambiar roles
            </ButtonAction>
          )}
        </div>
      }
      trigger="click"
    >
      <ButtonSticky>Investigación</ButtonSticky>{" "}
    </Popover>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetInvestigation);
