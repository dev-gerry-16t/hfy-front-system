import React, { useRef, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import {
  Pagination,
  Carousel,
  Select,
  Row,
  Col,
  DatePicker,
  Image,
} from "antd";
import Search from "../../../assets/icons/Search.svg";
import ENVIROMENT from "../../../utils/constants/enviroments";

const { Option } = Select;

const SectionDocuments = (props) => {
  const {
    dataDocumentTypes,
    onSearchDocument,
    dataDocumentsRepository,
  } = props;
  const dotChange = useRef(null);
  const [selectDateFilter, setSelectDateFilter] = useState(null);
  const [selectDocumentType, setSelectDocumentType] = useState(null);
  const [statesDates, setStatesDates] = useState({
    now: `${moment().format("YYYY-MM-DD")},${moment().format("YYYY-MM-DD")}`,
    month: `${moment().startOf("month").format("YYYY-MM-DD")},${moment()
      .endOf("month")
      .format("YYYY-MM-DD")}`,
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const handlerToRenderPickerType = (type) => {
    let component = null;
    switch (type) {
      case "1":
        component = null;
        break;
      case "2":
        component = (
          <Col
            span={4}
            xs={{ span: 24 }}
            md={{ span: 4 }}
            style={{ marginBottom: "10px" }}
          >
            <DatePicker
              placeholder="Seleccionar Mes"
              onChange={(momentFormat, date) => {
                const initDay = moment(momentFormat)
                  .startOf("month")
                  .format("YYYY-MM-DD");
                const endDate = moment(momentFormat)
                  .endOf("month")
                  .format("YYYY-MM-DD");
                setStatesDates({
                  ...statesDates,
                  month: `${initDay},${endDate}`,
                });
              }}
              picker="month"
              format="MMMM YYYY"
            />
          </Col>
        );
        break;
      case "3":
        component = (
          <>
            <Col
              span={4}
              xs={{ span: 24 }}
              md={{ span: 4 }}
              style={{ marginBottom: "10px" }}
            >
              <DatePicker
                placeholder="Fecha inicial"
                onChange={(momentFormat, date) => {
                  setStatesDates({
                    ...statesDates,
                    startDate: moment(momentFormat).format("YYYY-MM-DD"),
                  });
                }}
                format="DD MMMM YYYY"
              />
            </Col>
            <Col span={1} />
            <Col
              span={4}
              xs={{ span: 24 }}
              md={{ span: 4 }}
              style={{ marginBottom: "10px" }}
            >
              <DatePicker
                placeholder="Fecha final"
                onChange={(momentFormat, date) => {
                  setStatesDates({
                    ...statesDates,
                    endDate: moment(momentFormat).format("YYYY-MM-DD"),
                  });
                }}
                format="DD MMMM YYYY"
              />
            </Col>
          </>
        );
        break;
      default:
        break;
    }

    return component;
  };

  return (
    <div className="main-content-tabs">
      <div className="content-documents">
        <div className="content-history">
          <div className="select-file">
            <Row style={{ marginBottom: "20px" }}>
              <Col
                span={7}
                xs={{ span: 24 }}
                md={{ span: 7 }}
                style={{ marginBottom: "10px" }}
              >
                <Select
                  placeholder="Tipo de documento"
                  onChange={(value, option) => {
                    const configureOption = option.onClick();
                    setSelectDocumentType(value);
                  }}
                >
                  {isEmpty(dataDocumentTypes) === false &&
                    dataDocumentTypes.map((row) => {
                      return (
                        <Option
                          value={row.idDocumentType}
                          onClick={() => {
                            return row;
                          }}
                        >
                          {row.documentType}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={1} />
              <Col
                span={4}
                xs={{ span: 24 }}
                md={{ span: 4 }}
                style={{ marginBottom: "10px" }}
              >
                <Select
                  placeholder="Filtrar por"
                  onChange={(value, option) => {
                    setSelectDateFilter(value);
                    if (value === "1") {
                      const toDay = moment().format("YYYY-MM-DD");
                      setStatesDates({
                        ...statesDates,
                        now: `${toDay},${toDay}`,
                      });
                    }
                  }}
                >
                  <Option value="1" onClick={() => {}}>
                    Hoy
                  </Option>
                  <Option value="2" onClick={() => {}}>
                    Mes
                  </Option>
                  <Option value="3" onClick={() => {}}>
                    Rango de fecha
                  </Option>
                </Select>
              </Col>
              <Col span={1} />
              {handlerToRenderPickerType(selectDateFilter)}
              <Col span={1} />
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }}>
                <button
                  type="button"
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => {
                    let sendDateFormat = "";
                    if (selectDateFilter === "1") {
                      sendDateFormat = statesDates.now;
                    } else if (selectDateFilter === "2") {
                      sendDateFormat = statesDates.month;
                    } else if (selectDateFilter === "3") {
                      sendDateFormat = `${statesDates.startDate},${statesDates.endDate}`;
                    } else {
                      sendDateFormat = `${moment().format(
                        "YYYY-MM-DD"
                      )},${moment().format("YYYY-MM-DD")}`;
                    }
                    onSearchDocument({
                      topIndex: -1,
                      filterDate: sendDateFormat,
                      idDocumentType: selectDocumentType,
                    });
                  }}
                >
                  <img src={Search} alt="search" />
                </button>
              </Col>
            </Row>
          </div>
          <div className="content-files">
            {isEmpty(dataDocumentsRepository) === false &&
              dataDocumentsRepository.map((row) => {
                return (
                  <div className="card-file-information">
                    <div className="box-preview">
                      <Image
                        width={100}
                        height={120}
                        src={`${ENVIROMENT}/api/viewFile/${row.idDocument}/${row.bucketSoruce}`}
                      />
                    </div>
                    <div className="box-information">
                      <strong>{row.documentType}</strong>
                      <div className="data-image">
                        <div>
                          <span>Subido por:</span>
                          <span>Fecha de pago:</span>
                        </div>
                        <div>
                          <strong>{row.uploadedByUser}</strong>
                          <strong>{row.uploadedAt}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
          </div>
        </div>
        {/* <div className="content-upload">
          <div className="button_init_primary">
            <label type="button" for="file-input" onClick={() => {}}>
              <span>Subir documentos</span>
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg , image/gif"
              onChange={(e) => {}}
            />
          </div>
          <div className="section-container-action-up">
            <div className="container-carousel">
              <Carousel afterChange={() => {}} ref={dotChange} dots={false}>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
                <div className="main-carousel">
                  <img
                    src="https://i.pinimg.com/originals/59/76/88/59768810ac199bb8ab85e21e5edb900c.jpg"
                    alt="imagen-beach"
                    width={208}
                    height={202}
                  />
                </div>
              </Carousel>
            </div>
            <Pagination
              pageSize={1}
              size="small"
              total={3}
              onChange={(event) => {
                dotChange.current.goTo(event - 1);
              }}
            />
          </div>
        </div>
       */}
      </div>
    </div>
  );
};

export default SectionDocuments;
