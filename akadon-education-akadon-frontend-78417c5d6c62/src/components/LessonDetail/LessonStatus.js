import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

import FormatDate from "../utils/FormatDate";
import CountDown from "../utils/CountDown";

const LessonStatus = ({
  setEditCourseModal,
  editCourseModal,
  match,
  t,
  lesson_no,
  lesson_date,
  userType,
  setPaymentStatusModal,
  status,
  offline_flag,
  start_time,
  end_time,
  handleCloseLesson,
}) => {
  const startDate = moment(lesson_date + " " + start_time);
  const endDate = moment(lesson_date + " " + end_time);
  const distance = startDate - moment();
  // add logic hết ngày hôm đó không cho joincall video story 29_1213
  const datelater = moment(endDate);
  const datecallvideo = datelater.diff(moment());

  const CountDownBox = () => {
    if (distance > 30 * 60 * 1000) {
      return (
        <div
          onClick={() => setEditCourseModal(!editCourseModal)}
          className="radian-btn main-btn py-0 px-3"
        >
          {/* {t("edit-course")} */}
        </div>
      );
    }
    if (distance <= 0) {
      return (
        <Link
          to={`${match.url}/video`}
          className="radian-btn main-btn py-0 px-5"
        >
          {datecallvideo > 0 && t("join-lesson")}
        </Link>
      );
    }
    if (status === 0) {
      return <CountDown expiryTimes={startDate} />;
    }
  };

  return (
    <div className="lesson-detail__top-nav flex-box mb-3">
      <h4 className="mr-4">
        {t("common:lesson")} {lesson_no}
        <span className="text-grey text-small font-weight-normal ml-2">
          (<FormatDate date={lesson_date} />)
        </span>
      </h4>
      <div className="flex-grow">{status !== 2 && <CountDownBox />}</div>
      {status === 1 && offline_flag && (
        <div
          onClick={handleCloseLesson}
          className="close-btn main-btn align-self-end px-4 py-0 mx-2"
        >
          {t("lesson-detail:complete_lesson")}
        </div>
      )}
      {status === 2 && !offline_flag && (
        <Link
          to={`${match.url}/video`}
          className="main-btn orange-btn-hover align-self-end px-4 py-0 mx-2"
        >
          {t("lesson-detail:review_video")}
        </Link>
      )}
      {userType === "student" && status === 2 && (
        <div
          onClick={() => setPaymentStatusModal(true)}
          className="main-btn px-4 py-0 text-bold2 align-self-end shadow-btn-hover"
        >
          {t("payment-title")}
        </div>
      )}
    </div>
  );
};

LessonStatus.propTypes = {
  lessonDate: PropTypes.object,
  setEditCourseModal: PropTypes.func,
  editCourseModal: PropTypes.bool,
  match: PropTypes.object,
};

export default LessonStatus;
