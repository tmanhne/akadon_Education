import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Modal } from "reactstrap";
import { useTranslation } from "react-i18next";

import EyeIcon from "../../assets/icons/eye-icon.svg";
import FormatDate from "../utils/FormatDate";
import ReviewModal from "./modals/ReviewModal";
import EditLessonModal from "./modals/EditLessonModal";
import PenaltyModal from "./modals/PenaltyModal";
import AddLessonSuccess from "./modals/AddLessonSuccess";
import AddLessonModal from "./modals/AddLessonModal";
import EditLessonSuccess from "./modals/EditLessonSuccess";
import ReviewLessonModal from "../LessonDetail/modals/ReviewModal";

const LessonCard = ({ match, userType, course }) => {
  const { t } = useTranslation(["course-detail", "common"]);
  const { lessons, status, schedule, id, student, tutor } = course;

  // LOCAL STATE DECLARATIONS
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewLessonModal, setReviewLessonModal] = useState(false);
  const [addLessonSuccessModal, setAddLessonSuccessModal] = useState(false);
  const [editLesson, setEditLesson] = useState(false);
  const [addLessonModal, setAddLessonModal] = useState(false);
  const [penalty, setPenalty] = useState(false);
  const [editLessonSuccessModal, setEditLessonSuccessModal] = useState(false);

  const [lesson, setLesson] = useState();

  //FUNCTION DECLARATIONS
  function renderStatus(status) {
    switch (status) {
      case 0:
        return (
          <div className="status-incomming d-inline-block px-3 text-bold2 border-radius-1 py-1 ">
            {t("status-2")}
          </div>
        );
      case 1:
        return (
          <div className="status-inprogress d-inline-block px-3 text-bold2 border-radius-1 py-1 ">
            {t("status-3")}
          </div>
        );
      case 2:
        return (
          <div className="status-done d-inline-block px-3 text-bold2 border-radius-1 py-1 ">
            {t("status-4")}
          </div>
        );
      default:
        return <div></div>;
    }
  }

  function handleEditSchedule(status, start_time, end_time, lesson_date, id) {
    if (status === 2 || course.status === 6) return;

    const currentLesson = { start_time, end_time, lesson_date, id };
    setLesson(currentLesson);
    setPenalty(true);
  }

  function renderCTA(status) {
    if (status === 6) {
      return (
        <button
          style={{
            background: status !== 6 ? "#d3d3d3" : "#0367b4",
            cursor: status !== 6 ? "not-allowed" : "pointer",
          }}
          onClick={() => status === 6 && setReviewModal(true)}
          className="main-btn text-nowrap bg-hightlight1 px-4 py-0 text-light font-weight-bold"
        >
          {t("feedback-course")}
        </button>
      );
    }

    return (
      <div className="main-btn bg-hightlight1 px-4 py-0 text-light font-weight-bold disable-overlay">
        {t("course-detail:view_econtract")}
      </div>
    );
  }

  function actionColumn(lesson) {
    const { status, start_time, end_time, lesson_date, fee } = lesson;
    return (
    <>
    {
      status === 0 ?
      <div
        className="text-nowrap main-btn text-light bg-hightlight px-3 py-0 mr-2"
        onClick={() =>
          handleEditSchedule(
            status,
            start_time,
            end_time,
            lesson_date,
            lesson.id
          )
        }
      >
        {t("course-detail:change_schedule")}
      </div>
      :
      <div
        className="main-btn px-3 py-0 mr-2"
        onClick={() => setReviewLessonModal(true)}
      >
        {t("course-detail:feedback")}
      </div>
    }
      
      <Link to={`${match.url}/${lesson.id}?fee=${fee}`}>
        <img
          src={EyeIcon}
          className="btn p-0 hover-erro"
          width={32}
          alt="go detail"
        />
      </Link>
    </>
    );
  }

  return (
    <>
      <Card className="card-style course-detail__lesson-card">
        <div className="flex-box mb-4">
          <h5 className="text-bold2 flex-grow">{t("lesson-list")}</h5>
          {/* khóa học đã kết thúc không thêm buổi */}
          {status !== 6 && (
            <div
              onClick={() => setAddLessonModal(true)}
              className="btn main-btn bg-hightlight py-0 px-4 mr-3"
            >
              {t("course-detail:add_lesson")}
            </div>
          )}

          {renderCTA(status)}
        </div>

        <Table>
          <thead>
            <tr>
              <th className="text-center text-grey text-bold2">
                {t("lesson-no")}
              </th>
              <th className="text-center text-grey text-bold2">
                {t("common:time")}
              </th>
              <th className="text-center text-grey text-bold2">
                {t("common:status")}
              </th>
              <th className="text-center text-grey text-bold2">
                {t("common:action")}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => {
              const { status, start_time, lesson_date } = lesson;
              return (
                <tr key={lesson.id}>
                  <td className="text-center border border-right-0 text-bold2">
                    {t("lesson")} {index + 1}
                  </td>

                  <td className="text-center border border-right-0 border-left-0">
                    <div className="hightlight-box-1 border-radius-1 py-1 px-3 d-inline-block">
                      {start_time &&
                        start_time.split(":").slice(0, 2).join(":") + " - "}
                      <FormatDate date={lesson_date} />
                    </div>
                  </td>

                  <td className="text-center border border-right-0 border-left-0">
                    {renderStatus(status)}
                  </td>

                  <td className="center-box text-center border border-left-0">
                    {actionColumn(lesson)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Modal isOpen={reviewLessonModal} className="review-modal" contentClassName="border-0 pb-3" centered>
        <ReviewLessonModal modal={reviewLessonModal} setModal={setReviewLessonModal} userType={userType} lessonId={id} student={student} tutor={tutor} />
      </Modal>

      <Modal
        isOpen={reviewModal}
        contentClassName="border-0"
        className="review-model card-style px-0 pt-0 pb-3"
        centered={true}
      >
        <ReviewModal
          modal={reviewModal}
          setModal={setReviewModal}
          courseId={id}
          userType={userType}
        />
      </Modal>

      <Modal
        isOpen={editLesson}
        contentClassName="card-style p-0"
        className="edit-lesson-modal"
        centered={true}
      >
        <EditLessonModal
          contract_id={id}
          setEditLesson={setEditLesson}
          setSuccessModal={setEditLessonSuccessModal}
          lesson={lesson}
          schedule={schedule}
        />
      </Modal>

      <Modal
        isOpen={penalty}
        contentClassName="penalty-modal card-style p-0"
        centered={true}
      >
        <PenaltyModal t={t} setPenalty={setPenalty} setEditLesson={setEditLesson} />
      </Modal>

      <Modal
        isOpen={editLessonSuccessModal}
        centered={true}
        contentClassName="card-style border-0 p-0"
      >
        <EditLessonSuccess
          userType={userType}
          setModal={setEditLessonSuccessModal}
          t={t}
        />
      </Modal>

      <Modal
        isOpen={addLessonModal}
        centered={true}
        className="add-lesson-modal"
        contentClassName="card-style border-0 p-0"
      >
        <AddLessonModal
          contract_id={id}
          schedule={schedule}
          modal={addLessonModal}
          setModal={setAddLessonModal}
          setAddLessonSuccessModal={setAddLessonSuccessModal}
        />
      </Modal>

      <Modal
        isOpen={addLessonSuccessModal}
        contentClassName="card-style border-0"
        centered={true}
      >
        <AddLessonSuccess t={t} setModal={setAddLessonSuccessModal} />
      </Modal>
    </>
  );
};

LessonCard.propTypes = {
  match: PropTypes.object,
  userType: PropTypes.string,
  course: PropTypes.object,
};

export default LessonCard;
