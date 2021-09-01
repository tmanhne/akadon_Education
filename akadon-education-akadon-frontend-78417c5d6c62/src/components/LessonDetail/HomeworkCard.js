import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Card, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

import {
  deleteFile,
  downLoadHomework,
  getListHomework,
  uploadHomework,
} from "../../api";
import HomeworkImg from "../../assets/images/homework.png";
import FormatDate from "../utils/FormatDate";

const HomeworkCard = ({ lessonId, userType, id, userid }) => {
  const [homeworks, setHomeworks] = useState([]);
  const { t } = useTranslation(["common", "lesson-detail", "toast"]);

  useEffect(() => {
    getHomeworks();
    return () => {
      setHomeworks();
    };
  }, [lessonId]);

  const getHomeworks = async () => {
    // 1. CALL API TO GET ALL HOMEWORK FILES FROM SERVER
    // 2. TOAST TO ALERT API CALL STATUS
    const res = await getListHomework({ lesson_id: lessonId, doc_type: 0 });
    if (res.status < 400) {
      const rawData = [...res.data];
      const updateHomework = rawData.map((data) => {
        const imageExtensions = ["jpg", "png", "jpeg", "svg", "gif"];
        const dataArrayExtract = data.url.split(".");
        const dataType = dataArrayExtract[dataArrayExtract.length - 1];
        return {
          ...data,
          isImage: imageExtensions.includes(dataType.toLowerCase()),
        };
      });
      setHomeworks([...updateHomework]);
    } else {
      toast("Load Home Work error !");
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
      formData.append("homeworks", files[key], files[key].name);
    }
    let res = await uploadHomework(formData);
    if (res.status < 400) {
      toast.success("submit sucess ! ");
      getHomeworks();
    } else {
      toast.error(
        ` ${t("toast:er_29")}  ${res.status || res.response.status}`,
        {
          autoClose: false,
        }
      );
    }
  };

  const handleDeleteFile = async (fileId) => {
    const res = await deleteFile({ lesson_file_id: fileId });
    if (res.status < 400) {
      toast.success("Delete, sucess ! ");
      getHomeworks();
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
    <Card className="card-style lesson-detail__homework-card">
      <p className="text-bold2 mb-3">{t("lesson-detail:homework")}</p>
      {userType === "tutor" ? (
        <>
          <div className="mb-3">
            <p className="text-grey mb-2">{t("lesson-detail:homework-1")}</p>
            <div className="d-flex justify-content-center">
              <Label id="homework-card" style={{ cursor: "pointer" }}>
                <div className="card-style center-box border p-0 mb-2">
                  <img
                    src={HomeworkImg}
                    width={160}
                    height={110}
                    alt="homework"
                  />
                </div>
                <div className="position-relative hidden-input mb-2">
                  <div className="position-absolute text-small text-grey text-center mb-2 text-nowrap w-100">
                    {t("lesson-detail:homework-6")}
                  </div>
                  <Input
                    onChange={(e) => uploadFiles(e.target.files)}
                    multiple
                    type="file"
                    id="homework-card"
                  />
                </div>
              </Label>
            </div>
            {homeworks.map(
              (data) =>
                userid === data.user_id && (
                  <div key={data.id} className="document-card__document mb-2">
                    <p className="text-grey text-small mb-2">
                      <FormatDate date={data.created_datetime} />
                    </p>
                    <div className="flex-box">
                      <FontAwesomeIcon
                        className={`mr-2 h4 text-hightlight`}
                        icon={[
                          "fas",
                          `${fileConvert(data.name.split(".").pop())}`,
                        ]}
                      />
                      <a
                        href={
                          data.isImage
                            ? `${baseUrl}${data.url}`
                            : `https://docs.google.com/viewer?url=${baseUrl}${data.url}`
                        }
                        target="_blank"
                        className="flex-grow text-dark text-truncate"
                      >
                        {data.name}
                      </a>
                      {id === data.user_id && (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleDeleteFile(data.id);
                          }}
                          className="text-hightlight mr-2 h4"
                          icon={["fas", "times-circle"]}
                        />
                      )}
                      <FontAwesomeIcon
                        onClick={() => downLoadHomework(data.id, data.name)}
                        className="text-hightlight3 h4"
                        icon={["fas", "arrow-alt-circle-down"]}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <p className="text-grey mb-2"> {t("lesson-detail:homework-5")}</p>
            {homeworks.map(
              (data) =>
                userid !== data.user_id && (
                  <div key={data.id} className="document-card__document mb-2">
                    <p className="text-grey text-small mb-2">
                      <FormatDate date={data.created_datetime} />
                    </p>
                    <div className="flex-box">
                      <FontAwesomeIcon
                        className={`mr-2 h4 text-hightlight`}
                        icon={[
                          "fas",
                          `${fileConvert(data.name.split(".").pop())}`,
                        ]}
                      />
                      <a
                        href={
                          data.isImage
                            ? `${baseUrl}${data.url}`
                            : `https://docs.google.com/viewer?url=${baseUrl}${data.url}`
                        }
                        target="_blank"
                        className="flex-grow text-dark text-truncate"
                      >
                        {data.name}
                      </a>
                      {id === data.user_id && (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleDeleteFile(data.id);
                          }}
                          className="text-hightlight mr-2 h4"
                          icon={["fas", "times-circle"]}
                        />
                      )}
                      <FontAwesomeIcon
                        onClick={() => downLoadHomework(data.id, data.name)}
                        className="text-hightlight3 h4"
                        icon={["fas", "arrow-alt-circle-down"]}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-3">
            <p className="text-grey mb-2">{t("lesson-detail:homework-1")}</p>

            {homeworks.map(
              (data) =>
                userid !== data.user_id && (
                  <div key={data.id} className="document-card__document mb-2">
                    <p className="text-grey text-small mb-2">
                      <FormatDate date={data.created_datetime} />
                    </p>
                    <div className="flex-box">
                      <FontAwesomeIcon
                        className={`mr-2 h4 text-hightlight`}
                        icon={[
                          "fas",
                          `${fileConvert(data.name.split(".").pop())}`,
                        ]}
                      />
                      <a
                        href={
                          data.isImage
                            ? `${baseUrl}${data.url}`
                            : `https://docs.google.com/viewer?url=${baseUrl}${data.url}`
                        }
                        target="_blank"
                        className="flex-grow text-dark text-truncate"
                      >
                        {data.name}
                      </a>
                      {id === data.user_id && (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleDeleteFile(data.id);
                          }}
                          className="text-hightlight mr-2 h4"
                          icon={["fas", "times-circle"]}
                        />
                      )}
                      <FontAwesomeIcon
                        onClick={() => downLoadHomework(data.id, data.name)}
                        className="text-hightlight3 h4"
                        icon={["fas", "arrow-alt-circle-down"]}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <p className="text-grey mb-2">{t("lesson-detail:homework-2")}</p>
            <div className="d-flex justify-content-center">
              <Label id="homework-card" style={{ cursor: "pointer" }}>
                <div className="card-style center-box border p-0 mb-2">
                  <img
                    src={HomeworkImg}
                    width={160}
                    height={110}
                    alt="homework"
                  />
                </div>
                <div className="position-relative hidden-input mb-2">
                  <div className="position-absolute text-small text-grey text-center mb-2 text-nowrap w-100">
                    {t("lesson-detail:homework-4")}
                  </div>
                  <Input
                    onChange={(e) => uploadFiles(e.target.files)}
                    multiple
                    type="file"
                    id="homework-card"
                  />
                </div>
              </Label>
            </div>
            {homeworks.map(
              (data) =>
                userid === data.user_id && (
                  <div key={data.id} className="document-card__document mb-2">
                    <p className="text-grey text-small mb-2">
                      <FormatDate date={data.created_datetime} />
                    </p>
                    <div className="flex-box">
                      <FontAwesomeIcon
                        className={`mr-2 h4 text-hightlight`}
                        icon={[
                          "fas",
                          `${fileConvert(data.name.split(".").pop())}`,
                        ]}
                      />
                      <a
                        href={
                          data.isImage
                            ? `${baseUrl}${data.url}`
                            : `https://docs.google.com/viewer?url=${baseUrl}${data.url}`
                        }
                        target="_blank"
                        className="flex-grow text-dark text-truncate"
                      >
                        {data.name}
                      </a>
                      {id === data.user_id && (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleDeleteFile(data.id);
                          }}
                          className="text-hightlight mr-2 h4"
                          icon={["fas", "times-circle"]}
                        />
                      )}
                      <FontAwesomeIcon
                        onClick={() => downLoadHomework(data.id, data.name)}
                        className="text-hightlight3 h4"
                        icon={["fas", "arrow-alt-circle-down"]}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  const userid = user.info.id;
  return { userType, userid };
};

HomeworkCard.propTypes = {
  lessonId: PropTypes.string,
  id: PropTypes.number,
};
export default connect(mapStateToProps, null)(HomeworkCard);
