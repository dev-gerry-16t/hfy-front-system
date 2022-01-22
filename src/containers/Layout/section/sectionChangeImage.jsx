import React, { useState, useRef } from "react";
import Avatar from "react-avatar-edit";
import isNil from "lodash/isNil";
import { Modal } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";

const SectionChangeImage = (props) => {
  const { isModalVisible, onClose, onSelectImage } = props;
  const [preview, setPreview] = useState(null);
  const [dataFile, setDataFile] = useState({});

  const refAvatar = useRef(null);

  const onCrop = (view) => {
    setPreview(view);
  };

  const onCloseView = () => {
    setPreview(null);
    setDataFile({});
  };

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              setPreview(null);
              setDataFile({});
              onClose();
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Imagen de perfil</h1>
          {isNil(preview) === false && (
            <img
              src={preview}
              alt="Preview"
              width={50}
              height={50}
              className="image-avatar-little"
            />
          )}
        </div>
        <div className="avatar-image">
          <Avatar
            width={320}
            height={295}
            label="Haz click para seleccionar imagen"
            onCrop={onCrop}
            onClose={onCloseView}
            onFileLoad={(file) => {
              setDataFile({
                documentName: file.name,
                extension: file.type,
              });
            }}
            src={null}
            ref={refAvatar}
            cropRadius={50}
            maxCropRadius={60}
            exportAsSquare={true}
            exportSize={60}
            exportMimeType="image/jpeg"
            exportQuality={0.9}
          />
        </div>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={async () => {
              try {
                const urlObject = await fetch(preview);
                const blobFile = await urlObject.blob();
                await onSelectImage(blobFile, dataFile);
                setPreview(null);
                setDataFile({});
                onClose();
                refAvatar.current.onCloseClick();
              } catch (error) {
                throw error;
              }
            }}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SectionChangeImage;
