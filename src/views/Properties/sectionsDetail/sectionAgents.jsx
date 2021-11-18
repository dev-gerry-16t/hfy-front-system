import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { IconTenant } from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";
import ComponentAddAgent from "../component/componentAddAgent";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  .header-title {
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
    button {
      border: none;
      border-radius: 1em;
      color: #fff;
      background: var(--color-primary);
      font-weight: 500;
    }
  }
  .content-cards {
    min-height: 30em;
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  min-height: 6em;
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: ${(props) => props.colorDocument};
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        position: relative;
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const EmptyData = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
`;

const SectionAgents = (props) => {
  const { idUserType, callGlobalActionApi, dataProfile } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail = {}, getById } = dataContexProperty;
  const { propertySharedWith, idProperty, idApartment } = dataDetail;
  const [isVisibleShare, setIsVisibleShare] = useState(false);
  const frontFunctions = new FrontFunctions();
  const agentsArray =
    isNil(propertySharedWith) === false && isEmpty(propertySharedWith) === false
      ? JSON.parse(propertySharedWith)
      : [];

  const handlerCallSetAdviserInProperty = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idApartment,
          ...data,
        },
        idProperty,
        API_CONSTANTS.CUSTOMER.SET_ADVISER_IN_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      getById();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <GeneralCard>
      <ComponentAddAgent
        isModalVisible={isVisibleShare}
        onClose={() => {
          setIsVisibleShare(false);
        }}
        sendInvitation={async (data) => {
          try {
            await handlerCallSetAdviserInProperty(data);
          } catch (error) {
            throw error;
          }
        }}
      />
      <div className="header-title">
        <h1>Agentes</h1>
        {idUserType === 4 && (
          <button
            onClick={() => {
              setIsVisibleShare(true);
            }}
          >
            Compartir
          </button>
        )}
      </div>
      <div className="content-cards">
        {isEmpty(agentsArray) === false &&
          agentsArray.map((row) => {
            return (
              <Card>
                <div className="card-user">
                  <div className="top-info">
                    <div className="icon-info">
                      <IconTenant size="100%" color="#4E4B66" />
                    </div>
                    <div className="name-info">
                      <h3>
                        {row.givenName} {row.lastName}
                      </h3>
                      {isNil(row.commissionAmountFormat) === false && (
                        <span>Comisión: {row.commissionAmountFormat}</span>
                      )}
                    </div>
                  </div>
                  <div className="button-action">
                    <ButtonDocument
                      onClick={async () => {
                        try {
                          await handlerCallSetAdviserInProperty({
                            givenName: row.givenName,
                            lastName: row.lastName,
                            emailAddress: row.emailAddress,
                            idCustomer: row.idCustomer,
                            idInvitation: row.idInvitation,
                            mothersMaidenName: null,
                            commissionAmount: row.commissionAmount,
                            isActive: false,
                          });
                        } catch (error) {
                          throw error;
                        }
                      }}
                    >
                      Deshacer
                    </ButtonDocument>
                  </div>
                </div>
              </Card>
            );
          })}
        {isEmpty(agentsArray) === true && (
          <EmptyData>
            <img
              width="150"
              src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
              alt=""
            />
            <p>No has compartido con un agente esta propiedad</p>
          </EmptyData>
        )}
      </div>
    </GeneralCard>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionAgents);
