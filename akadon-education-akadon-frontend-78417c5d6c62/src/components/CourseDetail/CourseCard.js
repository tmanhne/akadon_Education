import React from "react";
import { Card } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import MathLogo from "../../assets/images/mathLogo.png";
import Avatar from "../utils/Avatar";
import Subject from "../utils/Subject";
import Level from "../utils/Level";

const CourseCard = ({ course, userType }) => {
  const { t } = useTranslation(["common"]);
  const tutor = course.tutor || {};
  const student = course.student || {};
  const totalLesson =
    course.lessons && (course.lessons.length || course.number_lesson);

  return (
    <Card className="card-style flex-box justify-content-between course-detail__course-card p-3 position-relative">
      <div>
        <div className="flex-box mb-3">
          <img className="mr-2" src={MathLogo} width={96} alt="subject" />
          <div>
            <div className="hight-light-box course-status text-light text-small px-2 py-1 mb-3">
              <span className="mr-2">{t("course-id")}</span>
              <span>{course.id}</span>
            </div>
            <h5 className="mb-3">
              <Subject subject={course.subject_name} />
            </h5>
            <div>
              <span className="text-grey mr-2">{t("level")}</span>
              <Level level={course.subject_level} />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <span className="mr-2">{t("is-offline")}</span>
          <span className="text-hightlight3 text-bold2">
            {course.offline_flag ? "Offline" : "Online"}
          </span>
        </div>
        <div>
          <span className="mr-2">{t("start-course")}</span>
          <span className="text-hightlight text-bold2">
            {course.start_date}
          </span>
        </div>
      </div>
      {userType === "student" ? (
        <div className="text-center">
          <div className="mb-2">
            <Avatar avatar={tutor.avatar} width={64} name={tutor.name} />
          </div>
          <p className="text-grey mb-2">{t("teacher")}</p>
          <p className="text-bold2 mb-2">{tutor.name}</p>
          <div className="hight-light-box px-4 text-bold2 border-radius-2">
            {t("total")} {totalLesson} {t("lesson")}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-2">
            <Avatar avatar={student.avatar} width={64} name={student.name} />
          </div>
          <p className="text-grey mb-2">{t("student")}</p>
          <p className="text-bold2 mb-2">{student.name}</p>
          <div className="hight-light-box px-4 text-bold2 border-radius-2">
            {t("total")} {totalLesson} {t("lesson")}
          </div>
        </div>
      )}
    </Card>
  );
};

CourseCard.propTypes = {
  courseCard: PropTypes.object,
};

export default CourseCard;
