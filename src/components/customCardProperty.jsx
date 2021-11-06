import React from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Tooltip } from "antd";
import styled from "styled-components";
import {
  IconProfile,
  IconWhatsapp,
  IconBathroom,
  IconBed,
  IconCar,
  IconHouseMeasure,
  IconShare,
  IconDownloadDetail,
} from "../assets/iconSvg";

const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 15.43em;
  min-height: 22.7em;
  height: auto;
  padding: 0.687em 0.625em;
  border-radius: 0.5em;
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  justify-self: center;
  margin-bottom: 1em;
  .image-content {
    width: 14.15em;
    height: 9.625em;
    border-radius: 0.5em;
    object-fit: cover;
    cursor: pointer;
  }
  .type-id {
    margin-top: 0.5em;
    display: flex;
    justify-content: space-between;
    span:first-child {
      color: #200e32;
      font-size: 0.75em;
    }
    span:last-child {
      font-size: 0.625em;
      color: #9295ad;
    }
  }
  .price-item {
    margin-top: 0.5em;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 1em;
      font-weight: 700;
      color: var(--color-primary);
    }
  }
  .address-item {
    margin-top: 0.5em;
    line-height: 0.8em;
    width: 8em;
  }
  .price-maintenance {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: 0.68em;
    span {
      font-weight: bold;
      color: #6e7191;
    }
  }
  .text-bold {
    font-weight: bold;
    color: #6e7191;
    font-size: 0.68em;
  }
  .icon-property {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.7em;
        margin-left: 5px;
      }
    }
  }
  .content-button {
    display: flex;
    justify-content: flex-end;
    gap: 0.3em;
  }
  .content-button-space {
    display: flex;
    justify-content: space-between;
    gap: 0.3em;
  }
`;

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border-radius: 1em;
  font-size: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWhatsapp = styled(Button)`
  border: 1px solid var(--color-primary);
  background: #fff;
  padding: 0px 1em;
`;

const ButtonPrimary = styled(Button)`
  background: var(--color-primary);
  color: #fff;
  border: none;
`;

const ProcessProperty = styled.div`
  padding: 0.125em;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 2em;
  color: #fff;
  background: var(--color-primary);
  width: 6.1em;
  height: 4.4em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 0.8em 0.8em;
  span {
    font-size: 0.4em;
  }
  .current-process {
    font-size: 0.5em;
    text-align: center;
    h1 {
      color: #fff;
    }
  }
`;

const CustomCardProperty = (props) => {
  const { src, alt, onClickDetail, data, idUserType, owner } = props;
  const {
    maintenanceAmount,
    shortAddress,
    propertyType,
    currentRent,
    identifier,
    totalBathrooms,
    totalParkingSpots,
    totalRooms,
    totalConstructionArea,
    documentMainPic,
    currentTimeLine,
    canInviteTenant,
  } = data;
  const dataTimeLine =
    isNil(currentTimeLine) === false && isEmpty(currentTimeLine) === false
      ? JSON.parse(currentTimeLine)
      : {};
  return (
    <Card>
      {isNil(currentTimeLine) === false && (
        <Tooltip placement="topLeft" title={dataTimeLine.description}>
          <ProcessProperty>
            {/* <IconProfile color="#fff" size="1em" /> */}
            <i className={dataTimeLine.style} />
            <span>En proceso de:</span>
            <div className="current-process">
              <h1>{dataTimeLine.title}</h1>
            </div>
          </ProcessProperty>
        </Tooltip>
      )}
      <img
        className="image-content"
        src={isNil(documentMainPic) === false ? documentMainPic : src}
        alt={alt}
        onClick={onClickDetail}
        loading="lazy"
      />
      <div className="type-id">
        <span>{propertyType}</span>
        <span>{identifier}</span>
      </div>
      <div className="price-item">
        <span>{currentRent} MXN</span>
        <ButtonIcon>
          <IconShare
            color="var(--color-primary)"
            backGround="var(--color-primary)"
            size="16px"
          />
        </ButtonIcon>
      </div>
      <div className="address-item">
        <span className="text-bold">{shortAddress}</span>
      </div>
      <div className="price-maintenance">
        Mantenimiento: <span>{maintenanceAmount} MXN</span>
      </div>
      <div className="icon-property">
        <div className="info">
          <IconBed color="#6E7191" backGround="#6E7191" />
          <span>{totalRooms}</span>
        </div>
        <div className="info">
          <IconBathroom color="#6E7191" backGround="#6E7191" />
          <span>{totalBathrooms}</span>
        </div>
        <div className="info">
          <IconCar color="#6E7191" backGround="#6E7191" />
          <span>{totalParkingSpots}</span>
        </div>
        <div className="info">
          <IconHouseMeasure color="#6E7191" backGround="#6E7191" />
          <span>{totalConstructionArea}m²</span>
        </div>
      </div>
      {owner === false && (
        <div className="content-button">
          <ButtonPrimary>Invitar a inquilino</ButtonPrimary>
          <ButtonPrimary>Contactar</ButtonPrimary>
          <ButtonWhatsapp>
            <IconWhatsapp
              size="15"
              color="var(--color-primary)"
              backGround="var(--color-primary)"
            />
          </ButtonWhatsapp>
        </div>
      )}
      {owner === true && (
        <div className="content-button-space">
          {idUserType === 4 && (
            <ButtonIcon>
              <IconDownloadDetail color="var(--color-primary)" size="20px" />
            </ButtonIcon>
          )}
          {canInviteTenant === true && (
            <ButtonPrimary>Invitar a inquilino</ButtonPrimary>
          )}
        </div>
      )}
    </Card>
  );
};

export default CustomCardProperty;
