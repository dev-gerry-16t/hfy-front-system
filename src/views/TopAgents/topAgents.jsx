import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { ReactComponent as IconKing } from "../../assets/iconSvg/svgFile/iconKingAgent.svg";
import { ReactComponent as IconCertificate } from "../../assets/iconSvg/svgFile/iconCertificateHomify.svg";
import { ReactComponent as IconTimes } from "../../assets/iconSvg/svgFile/iconRedSquareTimes.svg";

const Content = styled.div`
  position: relative;
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  display: grid;
  .container {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 6px 5px 2px rgba(205, 213, 219, 0.6);
    padding: 2em 0px 1em 0px;
    .title-container {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 1em 0px;
    }
    .content-top-agent {
      width: 100%;
      background-image: url("https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png");
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 20vh;
      padding: 6em 0px 2em 0px;
    }
    .label-info {
      padding: 1em 2em 0.5em 2em;
      h1 {
        font-size: 1.5em;
        margin: 0px;
      }
    }
    .content-table-agents {
      width: 100%;
      padding: 0.5em 2em;
    }
  }
`;

const Ribbon = styled.div`
  position: relative;
  width: 28.125em;
  height: 5.4375em;
  border: 2px solid var(--color-primary);
  padding: 1em 0px;
  display: flex;
  overflow: hidden;
  border-left: none;
  border-right: none;
  justify-content: center;
  h1 {
    margin: 0px;
    font-size: 2em;
    font-weight: 700;
    color: var(--color-primary);
  }
  &::after {
    content: "";
    width: 6.25em;
    height: 6.25em;
    background: #fff;
    position: absolute;
    z-index: 0;
    left: -4.8125em;
    bottom: -0.5625em;
    border-left: 2px solid var(--color-primary);
    border-right: 2px solid var(--color-primary);
    border-top: 2px solid var(--color-primary);
    border-bottom: 2px solid transparent;
    transform: rotate(45deg);
  }
  &::before {
    content: "";
    width: 6.25em;
    height: 6.25em;
    background: #fff;
    position: absolute;
    z-index: 0;
    right: -4.8125em;
    bottom: -0.5625em;
    border: 2px solid var(--color-primary);
    transform: rotate(45deg);
  }
`;

const RankingAgents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`;

const CardRankingAgents = styled.div`
  font-size: ${(props) => props.fontSize};
  box-shadow: 0px 6px 13px -3px rgba(255, 0, 131, 0.22);
  z-index: ${(props) => props.zIndex};
  order: ${(props) => props.order};
  .content-ranking {
    border-radius: 7px;
    position: relative;
    box-shadow: 0px 6px 13px -3px rgba(255, 0, 131, 0.22);
    background: ${(props) => props.backGround};
    .section-face {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      top: -3.5em;
      .certificate-icon {
        position: absolute;
        bottom: -1.2em;
        left: 3.6em;
        z-index: 1;
        svg {
          width: 4em;
        }
      }
      .king-icon {
        position: absolute;
        top: -2.2em;
        right: 2.6em;
        z-index: 1;
      }
      .avatar-agent {
        width: 7em;
        height: 7em;
        border-radius: 50%;
        overflow: hidden;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        img {
          width: 100%;
        }
      }
    }
    .info-agent {
      width: 100%;
      padding: 3.5em 1.5em 0.5em 1.5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 4em;
        font-weight: 700;
        color: var(--color-primary);
        -webkit-text-stroke: 2px #000;
        margin: 0px;
      }
      h2 {
        font-weight: 800;
        font-size: 1.3em;
        margin: 0px;
      }
      .detail-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        .policy-sell {
          font-size: 1.2em;
          span,
          strong {
            color: var(--color-primary);
          }
        }
        .detail-closure {
          font-weight: 500;
          strong {
            color: var(--color-primary);
          }
        }
      }
    }
  }
`;

const TableRanking = styled.table`
  width: 100%;
  tr {
    th {
      .th-div {
        padding: 10px 0px;
        background: #f9e9f1;
      }
      .th-div-first {
        border-radius: 10px 0px 0px 0px;
      }
      .th-div-last {
        border-radius: 0px 10px 0px 0px;
      }
    }

    td {
      padding: 0.8em 0px;
      .td-div {
        background: #f9e9f1;
        padding: 5px 0px;
        text-align: center;
        min-height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        .full-name-agent {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .number-ranking {
          font-weight: 800;
        }
        .section-icon-agent {
          position: relative;
          .image-icon-agent {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid var(--color-primary);
            position: absolute;
            overflow: hidden;
            top: -30px;
            left: -50px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;

const CardAgent = (props) => {
  const {
    fontSize,
    backGround,
    zIndex,
    position,
    rating,
    name,
    isFirst,
    imageProfile,
    policies,
    closures,
    properties,
    verified,
    order,
  } = props;

  return (
    <CardRankingAgents
      fontSize={fontSize}
      backGround={backGround}
      zIndex={zIndex}
      order={order}
    >
      <div className="content-ranking">
        <div className="section-face">
          {isFirst === true && (
            <div className="king-icon">
              <IconKing />
            </div>
          )}
          <div className="avatar-agent">
            <img src={imageProfile} alt="agent" />
          </div>
          {verified === true && (
            <div className="certificate-icon">
              <IconCertificate />
            </div>
          )}
        </div>
        <div className="info-agent">
          <div
            style={{
              height: "5em",
            }}
          >
            <h1>{position}</h1>
          </div>
          <h2>{name}</h2>
          <div>
            <Rate
              style={{
                fontSize: "1em",
                color: "#F3BF3A",
              }}
              tooltips={[]}
              onChange={() => {}}
              value={rating}
            />
          </div>
          <div className="detail-info">
            <div className="policy-sell">
              <span>Pólizas vendidas:</span> <strong>{policies}</strong>
            </div>
            <div className="detail-closure">
              <span>Publicaciones:</span> <strong>{properties}</strong>
            </div>
            <div className="detail-closure">
              <span>Cierres:</span> <strong>{closures}</strong>
            </div>
          </div>
        </div>
      </div>
    </CardRankingAgents>
  );
};

const TrTable = (props) => {
  const {
    rating,
    position,
    name,
    imageProfile,
    policies,
    closures,
    properties,
    verified,
  } = props;

  return (
    <tr>
      <td>
        <div
          className="td-div"
          style={{
            justifyContent: "space-around",
          }}
        >
          <strong className="number-ranking">#{position}</strong>{" "}
          <div className="section-icon-agent">
            <div className="image-icon-agent">
              <img src={imageProfile} alt="agent" />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="td-div">
          <strong className="full-name-agent">{name}</strong>
        </div>
      </td>
      <td>
        <div className="td-div">
          {verified === true ? (
            <IconCertificate width={30} />
          ) : (
            <IconTimes width={30} />
          )}
        </div>
      </td>
      <td>
        <div className="td-div">
          <Rate
            style={{
              fontSize: "1em",
              color: "#F3BF3A",
            }}
            tooltips={[]}
            onChange={() => {}}
            value={rating}
          />
        </div>
      </td>
      <td>
        <div className="td-div">
          <strong>{properties}</strong>
        </div>
      </td>
      <td>
        <div className="td-div">
          <strong>{closures}</strong>
        </div>
      </td>
      <td>
        <div className="td-div">
          <strong
            style={{
              color: "var(--color-primary)",
            }}
          >
            {policies}
          </strong>
        </div>
      </td>
    </tr>
  );
};

const TopAgents = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const frontFunctions = new FrontFunctions();
  const [topAgents, setTopAgents] = useState([]);
  const [topLowAgents, setTopLowAgents] = useState([]);

  const handlerCallGetAdviserRanking = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          pagination: null,
          jsonConditions: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_ADVISER_RANKING
      );
      const responseResult =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      if (isEmpty(responseResult) === false) {
        const arrayTopAgent = responseResult.filter((row) => {
          return row.rankingNo < 6;
        });
        const arrayLowAgent = responseResult.filter((row) => {
          return row.rankingNo > 5;
        });
        setTopAgents(arrayTopAgent);
        setTopLowAgents(arrayLowAgent);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerGetOrder = (key) => {
    let orderCard = 0;
    switch (key) {
      case 1:
        orderCard = 3;
        break;
      case 2:
        orderCard = 2;
        break;
      case 3:
        orderCard = 4;
        break;
      case 4:
        orderCard = 1;
        break;
      case 5:
        orderCard = 5;
        break;
      default:
        orderCard = 0;
        break;
    }
    return orderCard;
  };

  const handlerGetSize = (key) => {
    let sizeOrder = "16px";
    switch (key) {
      case 1:
        sizeOrder = "16px";
        break;
      case 2:
        sizeOrder = "14px";
        break;
      case 3:
        sizeOrder = "14px";
        break;
      case 4:
        sizeOrder = "12px";
        break;
      case 5:
        sizeOrder = "12px";
        break;
      default:
        sizeOrder = "16px";
        break;
    }
    return sizeOrder;
  };

  const handlerGetIndex = (key) => {
    let zIndexOrder = 2;
    switch (key) {
      case 1:
        zIndexOrder = 2;
        break;
      case 2:
        zIndexOrder = 1;
        break;
      case 3:
        zIndexOrder = 1;
        break;
      case 4:
        zIndexOrder = 0;
        break;
      case 5:
        zIndexOrder = 0;
        break;
      default:
        zIndexOrder = 2;
        break;
    }
    return zIndexOrder;
  };

  useEffect(() => {
    handlerCallGetAdviserRanking();
  }, []);

  return (
    <Content>
      <div className="container">
        <div className="title-container">
          <Ribbon>
            <h1>TOP DE ASESORES</h1>
          </Ribbon>
        </div>
        <div className="content-top-agent">
          {isEmpty(topAgents) === false && (
            <RankingAgents className="box-order">
              {topAgents.map((row) => {
                return (
                  <CardAgent
                    rating={row.rating}
                    position={row.rankingNo}
                    zIndex={handlerGetIndex(row.rankingNo)}
                    isFirst={row.rankingNo === 1}
                    fontSize={handlerGetSize(row.rankingNo)}
                    backGround={row.rankingNo === 1 ? "#F9E9F1" : "#fff"}
                    name={row.fullName}
                    imageProfile={row.profilePath}
                    policies={row.policiesTotal}
                    closures={row.closingTotal}
                    properties={row.propertiesPublished}
                    verified={row.isVerified}
                    order={handlerGetOrder(row.rankingNo)}
                  />
                );
              })}
            </RankingAgents>
          )}
        </div>
        <div className="label-info">
          <h1>¡No te quedes fuera del TOP!</h1>
          <p>
            Publica propiedades, cierra tus procesos de arrendamiento y protege
            tus propiedades con nuestras pólizas jurídicas.
          </p>
        </div>
        <div className="content-table-agents">
          <TableRanking>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  minWidth: 150,
                }}
              >
                <div className="th-div th-div-first">Ranking</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className="th-div">Asesor</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className="th-div">Verificación</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className="th-div">Calificación</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className="th-div">Publicaciones</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className="th-div">Cierres</div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                <div className=" th-div th-div-last">Ventas</div>
              </th>
            </tr>
            {isEmpty(topLowAgents) === false &&
              topLowAgents.map((row) => {
                return (
                  <TrTable
                    rating={4}
                    position={row.rankingNo}
                    name={row.fullName}
                    imageProfile={row.profilePath}
                    policies={row.policiesTotal}
                    closures={row.closingTotal}
                    properties={row.propertiesPublished}
                    verified={row.isVerified}
                  />
                );
              })}
          </TableRanking>
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataProfileMenu: dataProfileMenu.dataProfileMenu,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopAgents);
