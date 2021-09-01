import React, { useState, useEffect } from "react";
import { Card, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Empty from "../../assets/images/empty-document.png";
import { uploadDoc, getListHomework, deleteFile } from "../../api";
import FormatTimestamp from "../utils/FormatTimestamp";

const DocumentCard = ({ lessonId, id }) => {
  // INIT LOCAL STATES
  const [docs, setDocs] = useState([]);
  const { t } = useTranslation(["common", "lesson-detail", "toast"]);

  // SIDE EFFECTS
  useEffect(() => {
    getFiles();
    return () => {
      setDocs();
    };
  }, [lessonId]);

  // FUNCTION DECLARATIONS
  const getFiles = async () => {
    // 1. CALL API TO GET ALL DOCUMNET FILES FROM SERVER
    // 2. TOAST TO ALERT API CALL STATUS
    const res = await getListHomework({ lesson_id: lessonId, doc_type: 1 });
    if (res.status < 400) {
      const rawData = [...res.data];
      const updateDocs = rawData.map((data) => {
        const imageExtensions = ["jpg", "png", "jpeg", "svg", "gif"];
        const dataArrayExtract = data.url.split(".");
        const dataType = dataArrayExtract[dataArrayExtract.length - 1];
        return {
          ...data,
          isImage: imageExtensions.includes(dataType.toLowerCase()),
        };
      });
      setDocs([...updateDocs]);
    } else {
      toast("load doc error!");
    }
  };

  const uploadFiles = async (files) => {
    // 1. GET FILES FROM INPUT ELEMENT
    // 2. ADD LESSION_ID TO FORM DATA
    // 3. CALL API TO UPLOAD IT
    // 4. TOAST TO ALERT API CALL STATUS
    let formData = new FormData();
    formData.append("lesson_id", lessonId);
    for (const key of Object.keys(files)) {
      formData.append("documents", files[key], files[key].name);
    }
    let res = await uploadDoc(formData);
    if (res.status < 400) {
      toast.success("submit sucess ! ");
      getFiles();
    } else {
      toast.error(
        ` ${t("toast:er_29")}  ${res.status || res.response.status}`,
        { autoClose: false }
      );
    }
  };

  const handleDeleteFile = async (fileId) => {
    const res = await deleteFile({ lesson_file_id: fileId });
    if (res.status < 400) {
      toast.success("Delete, sucess ! ");
      getFiles();
    } else if (res.response) {
      toast.error(` ${t("toast:er_30")}  ${res.response.status}`, {
        autoClose: false,
      });
    }
  };

  const fileConvert = (fileExtension) => {
    // RENDER ICON RESPECTIVE TO FILE EXTENSION
    switch (fileExtension.toLowerCase()) {
      case "pdf":
        return "file-pdf";
      case "doc":
        return "file-word";
      case "docx":
        return "file-word";
      case "odp":
        return "file-word";
      case "zip":
        return "file-archive";
      case "pptx":
        return "file-powerpoint";
      case "ppt":
        return "file-powerpoint";
      case "pptm":
        return "file-powerpoint";
      case "xml":
        return "file-powerpoint";
      case "xlsx":
        return "file-spreadsheet";
      default:
        return "image";
    }
  };

  const baseUrl =
    process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn";

  return (
    <Card className="card-style lesson-detail__document-card">
      <p className="text-bold2 mb-3">{t("lesson-detail:doc-1")}</p>
      <div className="lesson-detail__document-card--file-input mb-2 p-2">
        <div className="content p-2 text-center">
          <FontAwesomeIcon
            className="text-light h4 mb-2"
            icon={["fal", "file-plus"]}
          />
          <div className="position-relative hidden-input">
            <Input
              onChange={(e) => uploadFiles(e.target.files)}
              type="file"
              id="hidden-input"
            />
            <Label
              className="text-bold1 position-absolute pt-1"
              for="hidden-input"
            >
              {t("lesson-detail:doc-2")}
            </Label>
          </div>
        </div>
      </div>
      {docs.length === 0 && (
        <div>
          <div className="flex-box justify-content-center">
            <img src={Empty} alt="emty document" className="mb-3" />
          </div>
          <p className="text-grey text-small text-center">
            {t("lesson-detail:doc-3")}
          </p>
        </div>
      )}
      {docs.map((doc) => (
        <div
          key={doc.id}
          className="lesson-detail__document-card--document mb-2"
        >
          <p className="text-grey text-small mb-2">
            <FormatTimestamp timestamp={doc.created_datetime} />
          </p>
          <div className="flex-box">
            <FontAwesomeIcon
              className={`mr-2 h4 text-hightlight`}
              icon={["fas", `${fileConvert(doc.name.split(".").pop())}`]}
            />
            <a
              href={
                doc.isImage
                  ? `${baseUrl}${doc.url}`
                  : `https://docs.google.com/viewer?url=${baseUrl}${doc.url}`
              }
              target="_blank"
              className="flex-grow text-dark text-truncate"
            >
              {doc.name}
            </a>
            {id === doc.user_id && (
              <FontAwesomeIcon
                onClick={() => {
                  handleDeleteFile(doc.id);
                }}
                className="text-hightlight mr-2 h4 mb-0"
                icon={["fas", "times-circle"]}
              />
            )}
            <a
              style={{ lineHeight: 1 }}
              download={doc.name}
              href={`${baseUrl}${doc.url}`}
              target="_blank"
              alt="document"
            >
              <FontAwesomeIcon
                className="text-hightlight3 h4 mb-0"
                icon={["fas", "arrow-alt-circle-down"]}
              />
            </a>
          </div>
        </div>
      ))}
    </Card>
  );
};

DocumentCard.propTypes = {
  lessonId: PropTypes.string,
  id: PropTypes.number,
};

export default DocumentCard;
