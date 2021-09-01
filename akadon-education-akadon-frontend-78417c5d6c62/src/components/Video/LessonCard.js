import React from "react";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";

import SubjectImage from "../utils/SubjectImage";
import Subject from "../utils/Subject";
import Level from "../utils/Level";

const LessonCard = ({ lesson }) => {
  const extractLesson = lesson.contract || {};
  const lessonId = lesson.id;
  const { t } = useTranslation("common");

  return (
    <Card className="video__lesson-card card-style border-radius-2 flex-box box-shadow">
      <SubjectImage subject={extractLesson.subject_name} width={56} height={56} />
      <div className="ml-2">
        <div className="hight-light-box text-light text-small-1 border-radius-2 text-nowrap py-0 px-2 mb-1">
          <span className="mr-1">{t("course-id")} </span>
          <span>{lessonId}</span>
        </div>
        <p className="mb-1 text-bold2"><Subject subject={extractLesson.subject_name}/></p>
        <div className="text-small">
          <span className="text-grey mr-2">{t("level")}: </span>
          <span><Level level={extractLesson.subject_level}/></span>
        </div>
      </div>
    </Card>
  );
};

export default LessonCard;
