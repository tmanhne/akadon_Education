import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SubjectImage from "../../utils/SubjectImage";
import Subject from "../../utils/Subject";

const UpcomingLessons = ({ course }) => {
  const { t } = useTranslation(["home-page", "common"]);
  // EXTRACT PROPS

  const lessonNo = course.lesson_no;
  const nextLessonDate =
    course.lessons.length === 0
      ? ""
      : course.lessons[lessonNo - 1].lesson_date.split("-").reverse().join("/");

  return (
    <Link
      to={`/dashboard/courses/${course.id}`}
      className="upcoming-lessons card-style border-radius-2 mb-3 text-decoration-none text-dark"
    >
      <div className="flex-box mb-2">
        <SubjectImage subject={course.subject_name} width={37} height={37} />
        <div className="ml-2 flex-grow">
          <h6 className="mb-2 text-bold2 text-dark">
            <Subject subject={course.subject_name} />
          </h6>
          <div className="flex-box align-items-center">
            <FontAwesomeIcon
              className="text-hightlight1"
              icon={["fas", "chalkboard-teacher"]}
            />
            <span className="ml-2 text-dark text-nowrap">
              : {course.tutor_name}
            </span>
          </div>
        </div>
      </div>
      <div
        className="d-inline-block mb-2 border-radius-1 px-2"
        style={{ background: "rgba(3, 176, 169, 0.3)" }}
      >
        <span className="text-grey mr-2 text-small">{t("common:total")}</span>
        <span className="text-dark">
          {course.number_lesson} {t("common:lesson")}
        </span>
      </div>
      <div className="mb-2">
        <span className="text-grey mr-2 text-small">
          {t("common:next-lesson")}
        </span>
        <span className="text-dark">
          {t("common:lesson")} {lessonNo}-{nextLessonDate}
        </span>
      </div>
      {!course.is_homework_done && (
        <div className="flex-box align-items-center mb-2">
          <FontAwesomeIcon
            className="text-danger mr-2"
            icon={["fas", "exclamation-circle"]}
          />
          <span className="text-grey text-nowrap text-small">
            {t("block-4-student-1")}
          </span>
        </div>
      )}
      {course.payment_status === 0 && (
        <div className="flex-box align-items-center mb-2">
          <FontAwesomeIcon
            className="text-danger mr-2"
            icon={["fal", "money-check"]}
          />
          <span className="text-grey text-nowrap text-small">
            {t("block-4-student-2")}
          </span>
        </div>
      )}
      <div className="flex-box align-items-start">
        <div
          className="center-box bg-hightlight-1 rounded-circle text-light mr-2"
          style={{ minWidth: "20px", minHeight: "20px" }}
        >
          <FontAwesomeIcon className="text-small" icon={["fas", "bell"]} />
        </div>
        <p className="mb-0 text-small">
          {t("block-4-student-3")} {nextLessonDate}
        </p>
      </div>
    </Link>
  );
};

export default UpcomingLessons;
