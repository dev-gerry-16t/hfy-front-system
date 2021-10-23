import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
} from "../constants/styleConstants";
import { IconDelete, IconEditSquare } from "../../../assets/iconSvg";

const ContentImages = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: flex-start;
  gap: 1em;
  .image-content {
    width: 12em;
    height: 8.8em;
    border-radius: 0.5em;
    object-fit: cover;
    border: 2px solid #a0a3bd;
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

const SectionDataImages = () => {
  const [count, setCount] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);

  const onChangeFile = (e) => {
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

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.6);
        setArrayImages([...arrayImages, { id: count, src: srcEncoded }]);
        setCount(count + 1);
      };
    };
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

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.6);
        const replaceArrayImage = arrayImages.map((row) => {
          let objectImage = { id: row.id, src: row.src };
          if (row.id === id) {
            objectImage = { id: id, src: srcEncoded };
          }
          return objectImage;
        });
        setArrayImages(replaceArrayImage);
      };
    };
  };

  return (
    <ContentForm>
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
          {arrayImages.map((row) => {
            return (
              <ContentImage>
                <img className="image-content" src={row.src} alt={"imagen"} />
                <div className="button-actions-image">
                  <ButtonFiles
                    onClick={() => {
                      handlerOnDeleteImage(row.id);
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
                    accept="image/*"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => {
                      handlerOnEditFile(e, row.id);
                    }}
                  />
                </div>
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
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                onChange={onChangeFile}
              />
            </UploadSection>
          )}
        </ContentImages>
        <div className="next-back-buttons">
          <ButtonNextBackPage block>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage block={false}>
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
  );
};

export default SectionDataImages;
