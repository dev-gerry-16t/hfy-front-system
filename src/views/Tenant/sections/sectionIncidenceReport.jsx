import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col, Select, Input, Spin, List, Avatar, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import PicturesWall from "../sectionDocuments/customUploadFile";
import FileReport from "../../../assets/icons/FileReport.svg";

const { Option } = Select;

const SectionIncidenceReport = (props) => {
  const {
    dataIncidence,
    onSendReport,
    spinVisible,
    dataIncideCoincidence,
    onGetById,
  } = props;
  const initialDataForm = {
    idIncidenceType: null,
    incidenceType: null,
    description: "",
    documents: null,
  };

  const [dataForm, setDataForm] = useState(initialDataForm);
  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [infoCatalog, setInfoCatalog] = useState({});
  const [isVisibleAddReport, setIsVisibleAddReport] = useState(false);

  const LoadingSpin = <SyncOutlined spin />;

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
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        {isVisibleAddReport === false && (
          <>
            <Row>
              <div
                className="two-action-buttons-banner"
                style={{ marginTop: 5 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleAddReport(true);
                  }}
                >
                  <span>Reportar una incidencia</span>
                </button>
              </div>
            </Row>
            {isEmpty(dataIncideCoincidence) === true && (
              <Row className="center-content">
                <img src={FileReport} height={100} alt="Reportar incidencia" />
                <span>Aún no hay incidencias reportadas</span>
              </Row>
            )}
            {isEmpty(dataIncideCoincidence) === false && (
              <div style={{ maxHeight: 500, overflowY: "scroll" }}>
                <List
                  dataSource={dataIncideCoincidence}
                  renderItem={(item) => (
                    <div
                      className="incidence-history-list"
                      onClick={() => {
                        onGetById(item);
                      }}
                    >
                      <List.Item key={item.idIncidence}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://homify-docs-users.s3.us-east-2.amazonaws.com/favicon-64.png" />
                          }
                          title={`Realizada por: ${
                            item.requestedBy
                          } | El dia: ${
                            isNil(item.createdAtFormat) === false
                              ? moment(
                                  item.createdAtFormat,
                                  "DD/MM/YYYY HH:mm"
                                ).format("DD MMMM YYYY HH:mm")
                              : ""
                          }`}
                          description={item.incidenceType}
                        />
                        <div>
                          <Tag
                            color={item.incidenceStatusStyle}
                            key={item.idIncidence}
                          >
                            {item.incidenceStatus}
                          </Tag>
                        </div>
                      </List.Item>
                    </div>
                  )}
                ></List>
              </div>
            )}
          </>
        )}
        {isVisibleAddReport === true && (
          <>
            <Row style={{ marginBottom: 25 }}>
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <div style={{ padding: "0px 25px", marginBottom: 20 }}>
                  <Select
                    value={dataForm.idIncidenceType}
                    placeholder="Tipo de incidencia"
                    style={{ width: "100%" }}
                    onChange={(value, option) => {
                      const configureOption = option.onClick();
                      setDataForm({ ...dataForm, idIncidenceType: value });
                      setInfoCatalog(configureOption);
                    }}
                  >
                    {isEmpty(dataIncidence) === false &&
                      dataIncidence.map((row) => {
                        return (
                          <Option
                            value={row.idIncidenceType}
                            onClick={() => {
                              return row;
                            }}
                          >
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              {isEmpty(infoCatalog) === false && infoCatalog.isOpen === true && (
                <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                  <div style={{ padding: "0px 25px" }}>
                    <Input
                      style={{ borderRadius: "8px" }}
                      value={dataForm.incidenceType}
                      placeholder={"Otro tipo de incidencia"}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          incidenceType: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
              )}
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
                    <div className="text-header">
                      Descripción de la incidencia
                    </div>
                    <textarea
                      style={{
                        outline: "none",
                        border: "none",
                        width: "100%",
                        minHeight: 160,
                      }}
                      value={dataForm.description}
                      maxlength="500"
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          description: e.target.value,
                        });
                      }}
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
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const documents = [
                        ...fileList,
                        ...fileList1,
                        ...fileList2,
                      ];
                      await onSendReport(documents, {
                        ...dataForm,
                        idPaymentType: infoCatalog.idDocumentType,
                      });
                      setDataForm(initialDataForm);
                      setFileList([]);
                      setFileList1([]);
                      setFileList2([]);
                      setIsVisibleAddReport(false);
                    } catch (error) {}
                  }}
                >
                  <span>Reportar Incidencia</span>
                </button>
              </div>
            </Row>
          </>
        )}
      </Spin>
    </div>
  );
};
export default SectionIncidenceReport;
