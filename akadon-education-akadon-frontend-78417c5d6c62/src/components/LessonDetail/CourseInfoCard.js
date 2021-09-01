import React from "react";
import { Card } from "reactstrap";

import LessonDoneImg from "../../assets/images/lesson-done.png";
import FormatDate from "../utils/FormatDate";
import Avatar from "../utils/Avatar";
import SubjectImage from "../utils/SubjectImage";
import Subject from "../utils/Subject";
import Level from "../utils/Level";

const CourseInfoCard = ({ userType, contract, lesson_date, t, status }) => {
  const {
    subject_name,
    id,
    subject_level,
    offline_flag,
    lessons,
    tutor,
    student,
  } = contract;
  const partner = userType === "student" ? tutor : student;

  return (
    <Card className="lesson-detail__course-info-card card-style flex-box justify-content-between position-relative mr-2">
      <div>
        <div className="flex-box mb-3">
          <SubjectImage subject={subject_name} width="96px" />
          <div className="ml-2">
            <div className="hightlight-box text-small text-light mb-2 px-2 py-1}">
              <span>{t("common:course-id")}</span>
              <span>{id}</span>
            </div>
            <div className="h5 mb-2 text-bold2"><Subject subject={subject_name}/></div>
            <div>
              <span className="text-grey mr-2">{t("common:level")}: </span>
              <span className="text-bold1"><Level level={subject_level}/></span>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-dark mr-2">{t("common:is-offline")}</span>
          <span className="text-hightlight3 text-bold2">
            {offline_flag ? "Offline" : "Online"}
          </span>
        </div>
        <div>
          <span className="text-dark mr-2">{t("common:start-course")}</span>
          <span className="text-hightlight text-bold2">
            <FormatDate date={lesson_date} />
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="mb-2">
          <Avatar avatar={partner.avatar} width={64} name={partner.name} />
        </div>
        <p className="text-center text-grey text-small mb-2">
          {userType === "student" ? t("common:teacher") : t("common:student")}
        </p>
        <div className="h6 text-bold2 mb-2">{partner.name}</div>
        <div className="text-center text-small text-light text-bold2 w-100 hightlight-box-1 px-2 py-1">
          <span>{t("total")} </span>
          <span>
            {lessons.length} {t("common:lesson")}
          </span>
        </div>
      </div>
      {status === 2 && (
        <div className="done-mark position-absolute">
          <img src={LessonDoneImg} alt="lesson done" />
        </div>
      )}
    </Card>
  );
};

export default CourseInfoCard;
