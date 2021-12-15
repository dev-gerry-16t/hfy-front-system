import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import ContextProfile from "../context/contextProfile";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../constants/styleConstants";
import ComponentAddReference from "../sections/References/sectionAddReferences";

const CardReference = styled.div`
  width: 290px;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  .header-buttons {
    display: flex;
    justify-content: right;
    padding: 10px;
  }
  .info-reference {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px 0.8em 0.8em 0.8em;
  }
  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;

const ButtonHeader = styled.button`
  background: transparent;
  border: none;
`;

const WidgetReferenceProfile = (props) => {
  const { callGlobalActionApi, dataProfile, identifier } = props;
  const [dataDefaultReference, setDataDefaultReference] = useState({});
  const [isOpenAddReferences, setIsOpenAddReferences] = useState(false);
  const dataContexProfile = useContext(ContextProfile);
  const { dataDetailReference, getById } = dataContexProfile;
  const frontFunctions = new FrontFunctions();
  let component = <div />;

  const handlerCallSetPersonalReference = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_PERSONAL_REFERENCE,
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };
  if (isNil(identifier) === false) {
    component = (
      <>
        <ComponentAddReference
          isModalVisible={isOpenAddReferences}
          dataDefaultReference={dataDefaultReference}
          onClose={() => {
            setIsOpenAddReferences(false);
            setDataDefaultReference({});
          }}
          onSendInformation={async (data) => {
            try {
              await handlerCallSetPersonalReference(data);
              getById();
            } catch (error) {
              throw error;
            }
          }}
        />
        <h1 className="subtitle-card">Referencias</h1>
        <div className="card-reference-profile">
          {isEmpty(dataDetailReference) === false &&
            dataDetailReference.map((row) => {
              return (
                <CardReference>
                  <div className="header-buttons">
                    <ButtonHeader
                      onClick={() => {
                        setDataDefaultReference(row);
                        setIsOpenAddReferences(true);
                      }}
                    >
                      <IconEditSquare
                        color="var(--color-primary)"
                        size="15px"
                      />
                    </ButtonHeader>
                    <ButtonHeader
                      onClick={async () => {
                        try {
                          await handlerCallSetPersonalReference({
                            idPersonalReference: row.idPersonalReference,
                            isActive: false,
                          });
                          getById();
                        } catch (error) {}
                      }}
                    >
                      <IconDelete color="var(--color-primary)" size="15px" />
                    </ButtonHeader>
                  </div>
                  <div className="info-reference">
                    <strong>
                      {row.givenName} {row.lastName} {row.mothersMaidenName}
                    </strong>
                    <u>{row.emailAddress}</u>
                    <span>{row.phoneNumber}</span>
                  </div>
                </CardReference>
              );
            })}
        </div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              setIsOpenAddReferences(true);
            }}
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {"Agregar referencia +"}
            </div>
          </ButtonNextBackPage>
        </div>
      </>
    );
  }

  return component;
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
)(WidgetReferenceProfile);
