import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getLessonDetail } from "../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const NotifyOneDayModal = ({ modal, setModal }) => {
  const { t } = useTranslation("toast");
  // INIT LESSON STATE
  const initLesson = {
    courseId: "",
    lessonId: "",
    subjectName: "",
    subjectLevel: "",
    tutorName: "",
    tutorAvatar: "",
    studentName: "",
    studentAvatar: "",
    lessonNo: "",
    isOffline: "",
    lessonDate: "",
  };
  const [lesson, setLesson] = useState(initLesson);
  const history = useHistory();

  // SINCE LESSON ID, GET LESSON DETAIL
  useEffect(() => {
    (async () => {
      if (!modal.lessonId) {
        return;
      }
      const res = await getLessonDetail(modal.lessonId);
      if (res.status < 400) {
        const rawData = { ...res.data };
        let lessonNo;
        if (rawData.contract.lessons) {
          rawData.contract.lessons.map((lesson, index) => {
            if (lesson.lesson_date === rawData.lesson_date) {
              lessonNo = index + 1;
            }
          });
        }
        const updateLesson = {
          courseId: rawData.contract.id,
          lessonId: rawData.id,
          subjectName: rawData.contract.subject_name,
          subjectLevel: rawData.contract.subject_level,
          tutorName: rawData.contract.tutor.name,
          tutorAvatar:
            rawData.contract.tutor.avatar || "http://via.placeholder.com/56x56",
          studentName: rawData.contract.student.name,
          studentAvatar:
            rawData.contract.student.avatar ||
            "http://via.placeholder.com/56x56",
          lessonNo: rawData.id || lessonNo || "",
          isOffline: rawData.contract.offline_flag,
          lessonDate: rawData.lesson_date,
        };
        setLesson({ ...updateLesson });
      } else if (res.response) {
        toast.error(
          ` ${t("toast:er_37")}  ${res.response.status}`,
          { autoClose: false }
        );
      }
    })();
  }, [modal.lessonId]);

  return (
    <Modal
      isOpen={modal.modal}
      modalClassName="noti-one-day-modal"
      className="notify__noti-one-day-modal"
    >
      <Card className="card-style p-0 mb-3 mx-auto">
        <div className="flex-box p-3 mb-4 border-bottom card-header">
          <div className="h4 mb-0 flex-grow text-center text-bold2">
            Th??ng tin bu???i h???c
          </div>
          <FontAwesomeIcon
            onClick={() => {
              setModal({ ...modal, modal: false });
            }}
            icon={["fal", "times"]}
          />
        </div>
        <p
          style={{ background: "#EAF4FC" }}
          className="mb-4 py-3 border-radius-2 text-center text-small font-italic"
        >
          Bu???i h???c c???a b???n s??? di???n ra v??o ng??y mai (
          {lesson.lessonDate.split("-").reverse().join("/")})
        </p>
        <div className="flex-box justify-content-between px-4 mb-4">
          <div>
            <p className="mb-3 text-grey">M?? l???p h???c</p>
            <p
              style={{ background: "rgba(255, 109, 52, 0.3)" }}
              className="text-hightlight text-bold1 text-center border-radius-2 mb-4"
            >
              {lesson.lessonId}
            </p>
            <p className="mb-3 text-grey">T??n m??n h???c</p>
            <p className="text-dark text-bold2 mb-4">{lesson.subjectName}</p>
            <p className="mb-3 text-grey">Tr??nh ?????</p>
            <p className="text-dark text-bold2 mb-4">{lesson.subjectLevel}</p>
          </div>
          <div>
            <p className="mb-3 text-grey">
              {modal.userRootUrl === "dashboard" ? "Gi???ng vi??n" : "H???c sinh"}
            </p>
            <p className="text-dark text-bold2 mb-4">
              {modal.userRootUrl === "dashboard"
                ? lesson.tutorName
                : lesson.studentName}
            </p>
            <p className="mb-3 text-grey">Bu???i s???</p>
            <p className="text-dark text-bold2 mb-4">{lesson.lessonNo}</p>
            <p className="mb-3 text-grey">H??nh th???c h???c</p>
            <p className="text-dark text-bold2 mb-4">
              {lesson.isOffline ? "Offline" : "Online (H???c tr???c tuy???n)"}
            </p>
          </div>
        </div>
        <div style={{ marginBottom: "4rem" }} className="text-center">
          <div
            onClick={() => {
              history.push(
                `/${modal.userRootUrl}/courses/${lesson.courseId}/${lesson.lessonId}`
              );
              setModal({ ...modal, modal: false });
            }}
            className="main-btn font-weight-bold"
          >
            V??o trang chi ti???t bu???i h???c
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default NotifyOneDayModal;
