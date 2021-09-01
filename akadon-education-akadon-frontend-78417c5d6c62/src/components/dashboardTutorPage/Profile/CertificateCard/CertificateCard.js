import React, { useState } from "react";
import { Input, Label, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./index.scss";
import CertificateFileRender from "./CertificateFileRender";

const CertificateCard = ({ editUserRequest, userFile, user, isLoading }) => {
  // INIT LOCAL STATES
  const initCurrentFiles = userFile
    ? userFile.map((file) => ({
        ...file,
        url: `${
          process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn"
        }/${file.url}`,
      }))
    : [];

  // LOCAL STATE DECLARATIONS
  const [currentFiles, setCurrentFiles] = useState(initCurrentFiles);
  const [localFiles, setLocalFiles] = useState([]);
  const [rawFiles, setRawFiles] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation("profile");

  // FUNCTION DECLARATIONS
  const loadLocalFile = async (e) => {
    // UPLOAD LOCAL FILES
    // 1. CREATE AN OBJECT URL TO RENDER IT
    // 2. SET THIS FILES TO STATE, AFTER THAT APPEND IT TO FORM DATA
    const filesInput = e.target.files;
    const filesUrl = Array.from(filesInput).map((file) => {
      return {
        url: URL.createObjectURL(file),
        file_name: file.name,
        content_type: file.type,
        is_local: true,
      };
    });
    setLocalFiles([...filesUrl, ...localFiles]);
    setRawFiles([...filesInput, ...rawFiles]);
  };

  const loadFileAlert = () => {
    if (!isEdit) {
      toast.error(t("alert-2"), { autoClose: false });
      return true;
    }
  };

  const uploadFiles = async () => {
    setIsEdit(!isEdit);

    if (!isEdit) return;
    // CHECK IS USER MAKE ANY CHANGE
    const isCurrentFileChange =
      JSON.stringify(initCurrentFiles) === JSON.stringify(currentFiles);
    if (isCurrentFileChange && rawFiles.length === 0) {
      toast.warning(t("alert-3"));
      return;
    }

    // IMPLEMENT RAWFILES TO FORMDATA
    let formData = new FormData();
    rawFiles.length === 0 && formData.append("user_file", null);
    for (const key of Object.keys(rawFiles)) {
      formData.append("user_file", rawFiles[key]);
    }

    // IMPLEMENT USER_FILE_OLD TO FORMDATA
    const user_file_old = currentFiles.map((file) => file.id * 1);
    formData.append("user_file_old", JSON.stringify(user_file_old));

    // ADD SOME REQUIRED FIELDS TO FORMDATA
    const { level, specialize } = user;
    formData.append("level", JSON.stringify(level));
    formData.append("specialize", JSON.stringify(specialize));

    // MAKE AN API CALL
    await editUserRequest(formData);
  };

  const handleRemoveFile = (file) => {
    // REMOVE UPLOADED OR CURRENT FILES
    if (file.is_local) {
      const updateFiles = localFiles.filter((f) => f !== file);
      setLocalFiles([...updateFiles]);
    } else {
      const updateFiles = currentFiles.filter((f) => f !== file);
      setCurrentFiles([...updateFiles]);
    }
  };

  return (
    <div className="cirtificate-card card-style border-radius-2 p-3 mb-3">
      <div className="flex-box mb-12px">
        <h6 className="mb-0 text-bold1 flex-grow text-hightlight1 text-uppercase">
          {t("title-2")}
        </h6>
        <button
          className="submint-btn center-box rounded-circle border-0"
          onClick={uploadFiles}
        >
          <FontAwesomeIcon
            className="text-hightlight"
            icon={isEdit ? ["fas", "save"] : ["fal", "pencil"]}
          />
        </button>
      </div>

      <div className="flex-box flex-wrap">
        <CertificateFileRender
          files={currentFiles}
          handleRemoveFile={handleRemoveFile}
          isEdit={isEdit}
          t={t}
        />
        <CertificateFileRender
          files={localFiles}
          handleRemoveFile={handleRemoveFile}
          isEdit={isEdit}
          t={t}
        />

        <div>
          {isLoading ? (
            <div className="upload-label text-grey center-box border border-radius-2">
              <Spinner />
            </div>
          ) : (
            <Label
              onClick={loadFileAlert}
              for="file-hidden"
              className="upload-label text-grey center-box border border-radius-2 mb-0"
            >
              {t("add-img")}
            </Label>
          )}
          {/* hiden input tag with type files */}
          <Input
            multiple
            id="file-hidden"
            className="border-radius-2 d-none"
            type="file"
            disabled={!isEdit}
            onChange={loadLocalFile}
          />
        </div>
      </div>
    </div>
  );
};

CertificateCard.propTypes = {
  editUserRequest: PropTypes.func,
  userFile: PropTypes.array,
};

export default CertificateCard;
