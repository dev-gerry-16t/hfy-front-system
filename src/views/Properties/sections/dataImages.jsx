import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { SyncOutlined } from "@ant-design/icons";
import { Spin, Row, Col } from "antd";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import {
  callAddDocument,
  callGlobalActionApi,
} from "../../../utils/actions/actions";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
} from "../constants/styleConstants";
import { IconDelete, IconEditSquare } from "../../../assets/iconSvg";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";

const LoadingSpin = (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "200px",
    }}
  >
    <SyncOutlined spin />
    <span
      style={{
        marginTop: "10px",
      }}
    >
      Espera por favor...
    </span>
  </div>
);

const ContentImages = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1em;
  .image-content {
    width: 12em;
    height: 8.8em;
    border-radius: 0.5em;
    object-fit: cover;
    border: 2px solid #a0a3bd;
  }
  @media screen and (max-width: 420px) {
    justify-content: center;
  }
`;

const UploadSection = styled.div`
  width: 12em;
  height: 8.8em;
  border: 1px solid #a0a3bd;
  border-radius: 0.5em;
  background: url("https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296E.png");
  background-size: cover;
  background-repeat: no-repeat;
  .upload-file {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 1em 0;
    cursor: pointer;
    span {
      font-size: 0.6em;
      color: rgba(78, 75, 102, 0.45);
      text-align: center;
      font-weight: 700;
    }
  }
`;

const ContentImage = styled.div`
  position: relative;
  .button-actions-image {
    position: absolute;
    bottom: 1em;
    right: 1em;
    display: none;
  }
  &:hover {
    .button-actions-image {
      display: flex;
      flex-direction: row;
    }
  }
  .description-image {
    color: var(--color-primary);
    font-size: 11px;
    position: absolute;
  }
  @media screen and (max-width: 640px) {
    margin-bottom: 15px;
    .description-image {
      line-height: 10px;
    }
    .button-actions-image {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 420px) {
    &:first-child {
      .image-content {
        width: 90vw;
        height: 200px;
      }
    }
  }
`;

const ButtonFiles = styled.button`
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
  background: rgba(214, 216, 231, 0.64);
  border: none;
  margin-right: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonFilesLabel = styled.label`
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
  background: rgba(214, 216, 231, 0.64);
  border: none;
  margin-right: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SectionDataImages = (props) => {
  const {
    onClickBack,
    onClickFinish,
    callAddDocument,
    dataProfile,
    redirect,
    callGlobalActionApi,
    idProperty,
    onBackTo,
    dataFormSave,
    idApartment,
    getById,
  } = props;
  const [count, setCount] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallSetPropertyDocument = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.SET_PROPERTY_DOCUMENT,
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerAddDocument = async (data, name) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;

    const dataDocument = {
      documentName: name,
      extension: "jpeg",
      preview: null,
      thumbnail: null,
      idDocumentType: 39,
      idCustomer,
      idSystemUser,
      idLoginHistory,
    };

    try {
      const response = await callAddDocument(
        data,
        dataDocument,
        (percent) => {}
      );
      const documentId =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.idDocument) === false
          ? response.response.idDocument
          : null;
      return documentId;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const fileReaderPromise = async (fileIndex, countPromise) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileIndex);
      reader.onload = async (event) => {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        imgElement.onload = async (event1) => {
          const canvas = document.createElement("canvas");
          const width = event1.target.width;
          const height = event1.target.height;

          const MAX_WIDTH = 578;
          const scaleSize = MAX_WIDTH / width;

          canvas.width = MAX_WIDTH;
          canvas.height = height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.8);
          resolve({
            id: countPromise,
            src: srcEncoded,
            contentType: "image/jpeg",
            name: `homify-image-${countPromise}`,
          });
        };
      };
    });
  };

  const handlerOnSendFilesV2 = async (dataImages) => {
    try {
      const arrayDataDocument = [];
      for (let index = 0; index < dataImages.length; index++) {
        const element = dataImages[index];
        const urlObject = await fetch(element.src);
        const blobFile = await urlObject.blob();
        const idDocument = await handlerAddDocument(blobFile, element.name);
        arrayDataDocument.push({
          idDocument,
          isMain: false,
        });
      }
      return arrayDataDocument;
    } catch (error) {}
  };

  const handlerOnSendFilesV3 = async (dataImages, ix) => {
    try {
      const arrayDataDocument = [];
      for (let index = 0; index < dataImages.length; index++) {
        const element = dataImages[index];
        const urlObject = await fetch(element.src);
        const blobFile = await urlObject.blob();
        const idDocument = await handlerAddDocument(blobFile, element.name);
        arrayDataDocument.push({
          idDocument,
          isMain: ix === 0 ? true : false,
        });
      }
      return arrayDataDocument;
    } catch (error) {}
  };

  const onChangeFile = async (e) => {
    if (isNil(idProperty) === true) {
      const newArrayImages = [];
      let newCont = count;
      const files = e.target.files;
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        const objectPromise = await fileReaderPromise(files[i], newCont);
        newArrayImages.push(objectPromise);
        newCont = newCont + 1;
      }
      setArrayImages([...arrayImages, ...newArrayImages]);
      setCount(newCont);
    } else {
      const newArrayImages = [];
      let newCont = count;
      const files = e.target.files;
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        const objectPromise = await fileReaderPromise(files[i], newCont);
        newArrayImages.push(objectPromise);
        newCont = newCont + 1;
      }
      const responseImages = await handlerOnSendFilesV2(newArrayImages);
      await handlerCallSetPropertyDocument(
        {
          jsonDocument: JSON.stringify(responseImages),
          idApartment: idApartment,
          isActive: true,
        },
        idProperty
      );
      getById();
    }
  };

  const handlerOnDeleteImage = (id) => {
    const filterId = arrayImages.filter((row) => {
      return row.id !== id;
    });
    setArrayImages(filterId);
  };

  const handlerOnEditFile = (e, id) => {
    const fileIndex = e.target.files[0];
    if (!fileIndex) return;

    const reader = new FileReader();
    reader.readAsDataURL(fileIndex);
    reader.onload = (event) => {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      imgElement.onload = (event1) => {
        const canvas = document.createElement("canvas");
        const width = event1.target.width;
        const height = event1.target.height;

        const MAX_WIDTH = 578;
        const scaleSize = MAX_WIDTH / width;

        canvas.width = MAX_WIDTH;
        canvas.height = height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.8);
        const replaceArrayImage = arrayImages.map((row) => {
          let objectImage = row;
          if (row.id === id) {
            objectImage = {
              id: id,
              src: srcEncoded,
              contentType: "image/jpeg",
              name: `homify-image-${id}`,
            };
          }
          return objectImage;
        });
        setArrayImages(replaceArrayImage);
      };
    };
  };

  const handlerOnEditFileV2 = async (e, id, ix) => {
    const fileIndex = e.target.files[0];
    if (!fileIndex) return;

    const reader = new FileReader();
    reader.readAsDataURL(fileIndex);
    reader.onload = async (event) => {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      imgElement.onload = async (event1) => {
        const canvas = document.createElement("canvas");
        const width = event1.target.width;
        const height = event1.target.height;

        const MAX_WIDTH = 578;
        const scaleSize = MAX_WIDTH / width;

        canvas.width = MAX_WIDTH;
        canvas.height = height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.8);
        const replaceArrayImage = arrayImages.map((row) => {
          let objectImage = row;
          if (row.id === id) {
            objectImage = {
              id: id,
              src: srcEncoded,
              contentType: "image/jpeg",
              name: `homify-image-${id}`,
            };
          }
          return objectImage;
        });
        const responseImages = await handlerOnSendFilesV3(
          [
            {
              id: id,
              src: srcEncoded,
              contentType: "image/jpeg",
              name: `homify-image-${id}`,
            },
          ],
          ix
        );

        await handlerCallSetPropertyDocument(
          {
            jsonDocument: JSON.stringify(responseImages),
            idApartment: idApartment,
            isActive: true,
          },
          idProperty
        );
        setArrayImages(replaceArrayImage);
      };
    };
  };

  const handlerOnSendFiles = async (dataImages) => {
    try {
      const arrayDataDocument = [];
      for (let index = 0; index < dataImages.length; index++) {
        const element = dataImages[index];
        const urlObject = await fetch(element.src);
        const blobFile = await urlObject.blob();
        const idDocument = await handlerAddDocument(blobFile, element.name);
        arrayDataDocument.push({
          idDocument,
          isMain: index === 0 ? true : false,
        });
      }
      return arrayDataDocument;
    } catch (error) {}
  };

  useEffect(() => {
    if (
      isNil(idProperty) === false &&
      isEmpty(dataFormSave) === false &&
      isNil(dataFormSave.apartmentDocuments) === false &&
      isEmpty(dataFormSave.apartmentDocuments) === false
    ) {
      const parseArrayImages = JSON.parse(dataFormSave.apartmentDocuments);
      const resultArrayImages = parseArrayImages.map((row, ix) => {
        return {
          contentType: "image/jpeg",
          id: ix,
          name: `homify-image-${ix}`,
          src: row.url,
          idDocument: row.idDocument,
        };
      });
      setCount(parseArrayImages.length);
      setArrayImages(resultArrayImages);
    } else {
      if (
        isNil(idProperty) === false &&
        isEmpty(dataFormSave) === false &&
        isNil(dataFormSave.apartmentDocuments) === true &&
        isEmpty(dataFormSave.apartmentDocuments) === true
      ) {
        setCount(0);
        setArrayImages([]);
      }
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <Spin indicator={LoadingSpin} spinning={isLoadApi} delay={100}>
        {isNil(idProperty) === false && (
          <div className="back-button">
            <button onClick={onBackTo}>
              <Arrow width="35px" />
            </button>
          </div>
        )}
        <div className="header-title">
          <h1>Agregar fotos</h1>
        </div>
        <FormProperty>
          <div className="label-indicator">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <span>Agrega hasta 24 imagenes para mostrar la propiedad.</span>
              </Col>
            </Row>
          </div>
          <ContentImages>
            {arrayImages.map((row, ix) => {
              return (
                <ContentImage>
                  <img className="image-content" src={row.src} alt={"imagen"} />
                  <div className="button-actions-image">
                    <ButtonFiles
                      onClick={async () => {
                        try {
                          if (isNil(idProperty) === true) {
                            handlerOnDeleteImage(row.id);
                          } else {
                            await handlerCallSetPropertyDocument(
                              {
                                jsonDocument: JSON.stringify([
                                  {
                                    idDocument: row.idDocument,
                                    isMain: ix === 0 ? true : false,
                                  },
                                ]),
                                idApartment,
                                isActive: false,
                              },
                              idProperty
                            );
                            getById();
                          }
                        } catch (error) {}
                      }}
                    >
                      <IconDelete color="var(--color-primary)" />
                    </ButtonFiles>
                    <ButtonFilesLabel
                      className="upload-file"
                      for={`id-file-${row.id}`}
                    >
                      <IconEditSquare color="var(--color-primary)" />
                    </ButtonFilesLabel>
                    <input
                      id={`id-file-${row.id}`}
                      accept="image/png,image/jpg,image/jpeg"
                      style={{ display: "none" }}
                      type="file"
                      onChange={async (e) => {
                        if (isNil(idProperty) === true) {
                          handlerOnEditFile(e, row.id);
                        } else {
                          await handlerCallSetPropertyDocument(
                            {
                              jsonDocument: JSON.stringify([
                                {
                                  idDocument: row.idDocument,
                                  isMain: ix === 0 ? true : false,
                                },
                              ]),
                              idApartment,
                              isActive: false,
                            },
                            idProperty
                          );
                          handlerOnEditFileV2(e, row.id, ix);
                        }
                      }}
                    />
                  </div>
                  {row.id == 0 && (
                    <div className="description-image">
                      <span>
                        {isNil(idProperty) === false
                          ? "Esta es tu imagen principal"
                          : "Esta será tu imagen principal"}
                      </span>
                    </div>
                  )}
                </ContentImage>
              );
            })}
            {count < 24 && (
              <UploadSection>
                <label className="upload-file" for={`id-file`}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALcSURBVHgB7Zk/ctNAFMa/t6Kg9A3inADTkECDU2UYinCDmBZiWwoHSNylIVLkwNDh3IBUTKo4FQmVOQHODZyOmaBd3pNkTwi2kfE68jD+zdha7e6sP+2fp93PhIy4rl/4ARRggftALwi8Xpa6hDGCIqACcjYIpgRL4m7QM6AOTHR0DbQ/BF4XWQXWvGYd0LuJKMONmDMDSAOZnvpv8I8W47aJnvKdPHwXpFrhfrUxpO7v1LfDj8aYioFp87VxGHhtzBAeqaIGdlngpiFqNfdrLzFKIIvzWZQL0o1w39vFHVJzfRG5c1uk009UXb/CevfyECdcnJ+0V1bXiUDuo9X1q6/nJ+eSP+jBunfwnYe1F/ruQ+RI1Q1PiUxJGb0sK10lmT7PORS1MR5yxiCShVL4CZTlPhaolLPBl+6sF0QWUg09HmrRlAjkhVGE0d8wLxh9TERlSao0S2JRB/NDF0mshJI4JIk0EM8FfS2v3xwuKVjkleuXtlz/BSxyDxZx4PgcRyX5CZaw2oOzYCFwWhYCp2XiVSxhhMipDytLdt6EqheeDiuPTOS9D7yJXggT96CWIGo0hn76jChX6dthEibuwbQH1oaVyVZJ4mAzcNdgicUimZaFwGn5/+LgOCJEnmzmbGJV4KRBOAsqSD0R+ocgOiv6Wt693bpUaUaXjZwlzAmknAeUnpHSU50+41OU1a36VBhTYk2XkowF6mSLXuCNQBk5IxrERDDpsSEWyCulDTksk7ODnFGkfL50m4HXiu/lSzwQ7tIGb5fKte1mbiJrbvzbMrwDn3DgbombtPL42TJPAHflyXNcfPl8hjskNk1J7/GEO+De2+vn058VD1p8ic3Eax01RlmztpA5J1NLRo/FHYW+V7lZPtwCZjORxPFM4lGHV3jb6OjKovtQYMNqiT2hMhLbJZ5i3HPB7YrjTPRiFFtgtMkCZ2Six/73Mc+z1ijXnzI2ltvfEL8A5S84g/9jchwAAAAASUVORK5CYII="
                    alt=""
                  />
                  <span>Haz clic aquí para subir una imagen</span>
                </label>
                <input
                  id={`id-file`}
                  accept="image/png,image/jpg,image/jpeg"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={onChangeFile}
                />
              </UploadSection>
            )}
          </ContentImages>
          {isNil(idProperty) === false && (
            <div
              className="label-indicator"
              style={{
                marginTop: "25px",
              }}
            >
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <span>Tus cambios se guardan automaticamente.</span>
                </Col>
              </Row>
            </div>
          )}
          <div className="next-back-buttons">
            <ButtonNextBackPage block={false} onClick={onClickBack}>
              {"<< "}
              <u>{"Atrás"}</u>
            </ButtonNextBackPage>
            <ButtonNextBackPage
              block={false}
              onClick={async () => {
                setIsLoadApi(true);
                try {
                  if (isNil(idProperty) === true) {
                    const response = await onClickFinish();
                    const responseDocument = await handlerOnSendFiles(
                      arrayImages
                    );
                    await handlerCallSetPropertyDocument(
                      {
                        jsonDocument: JSON.stringify(responseDocument),
                        idApartment: response.idApartment,
                        isActive: true,
                      },
                      response.idProperty
                    );
                    redirect(response.idProperty);
                  } else {
                    onBackTo();
                  }
                  setIsLoadApi(false);
                } catch (error) {
                  setIsLoadApi(false);
                }
              }}
            >
              <u>{"Finalizar"}</u>
              {" >>"}
            </ButtonNextBackPage>
          </div>
        </FormProperty>
      </Spin>
    </ContentForm>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionDataImages);
