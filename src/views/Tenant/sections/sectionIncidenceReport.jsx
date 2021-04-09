import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { Row, Col, Select, Input } from "antd";
import PicturesWall from "../sectionDocuments/customUploadFile";

const { Option } = Select;

const SectionIncidenceReport = (props) => {
  const { dataIncidence } = props;
  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [isVisibleAddReport, setIsVisibleAddReport] = useState(false);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
  };
  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  useEffect(() => {
    return () => {
      setIsVisibleAddReport(false);
    };
  }, []);

  return (
    <div className="main-content-tabs">
      {isVisibleAddReport === false && (
        <Row>
          <div className="two-action-buttons-banner" style={{ marginTop: 25 }}>
            <button
              type="button"
              onClick={() => {
                setIsVisibleAddReport(true);
              }}
            >
              <span>Reportar Incidencia</span>
            </button>
          </div>
        </Row>
      )}
      {isVisibleAddReport === true && (
        <>
          <Row style={{ marginBottom: 25 }}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <div style={{ padding: "0px 25px", marginBottom: 20 }}>
                <Select
                  placeholder="Tipo de incidencia"
                  style={{ width: "100%" }}
                  onChange={(value, option) => {
                    const configureOption = option.onClick();
                  }}
                >
                  {isEmpty(dataIncidence) === false &&
                    dataIncidence.map((row) => {
                      return (
                        <Option
                          value={row.idPaymentType}
                          onClick={() => {
                            return row;
                          }}
                        >
                          {row.paymentType}
                        </Option>
                      );
                    })}
                </Select>
              </div>
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <div style={{ padding: "0px 25px" }}>
                <Input
                  style={{ borderRadius: "8px" }}
                  value={""}
                  placeholder={"Otro tipo de incidencia"}
                  onChange={(e) => {}}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <div
                className="section-type-messages-fixed"
                style={{
                  minHeight: 170,
                  padding: "0px 25px",
                  marginBottom: 20,
                }}
              >
                <div
                  className="section-type-messages"
                  style={{ minHeight: 160 }}
                >
                  <div className="text-header">Descripción</div>
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      width: "100%",
                      minHeight: 160,
                    }}
                    value={""}
                    maxlength="200"
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <div style={{ padding: "0px 25px" }}>
                <div
                  className="section-type-messages"
                  style={{ width: "100%" }}
                >
                  <div className="text-header">Evidencia</div>
                  <div className="section-upload-files">
                    <div className="section-upload-file">
                      <PicturesWall
                        fileList={fileList}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="section-upload-file">
                      <PicturesWall
                        handleChange={handleChange1}
                        fileList={fileList1}
                      />
                    </div>
                    <div className="section-upload-file">
                      <PicturesWall
                        handleChange={handleChange2}
                        fileList={fileList2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div
              className="two-action-buttons-banner"
              style={{ marginTop: 25 }}
            >
              <button type="button" onClick={() => {}}>
                <span>Reportar Incidencia</span>
              </button>
            </div>
          </Row>
        </>
      )}
    </div>
  );
};
export default SectionIncidenceReport;
