import React, { useState } from "react";
import { Upload, Modal } from "antd";
import Magnifier from "react-magnifier";
import Arrow from "../../../assets/icons/Arrow.svg";
import UploadFile from "../../../assets/icons/Upload.svg";

const PicturesWall = (props) => {
  const { handleChange, fileList } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewVisible(true);
  };

  const uploadButton = (
    <div>
      <img src={UploadFile} alt="Subir archivo" className="anticon" />
      <div style={{ marginTop: 8 }}>Subir imagen</div>
    </div>
  );
  return (
    <>
      <Upload
        action="/"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        method="get"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={
          <div className="form-modal">
            <div className="title-head-modal">
              <button
                className="arrow-back-to"
                type="button"
                onClick={handleCancel}
              >
                <img src={Arrow} alt="backTo" width="30" />
              </button>
              <h1>{previewTitle}</h1>
            </div>
          </div>
        }
        closable={false}
        footer={null}
        style={{ top: "20px" }}
      >
        <Magnifier src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
