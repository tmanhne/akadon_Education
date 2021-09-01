import React from "react";
import PropTypes from "prop-types";

import SubjectImage from "../../utils/SubjectImage";
import TimeLength from "../../utils/TimeLength";

function LessonCard({ lesson }) {
  const tutor = lesson.tutor || {};
  return (
    <div className="flex-box align-items-start">
      <SubjectImage subject={lesson.subject_name} width={56} />
      <div className="pl-2">
        <div className="mb-12px">
          <span className="text-grey mr-2">Gia sư:</span>
          <span className="text-bold2">{tutor.name}</span>
        </div>

        <div className="mb-12px">
          <span className="text-grey mr-2">Tiêu đề:</span>
          <span className="text-bold2">{lesson.request_header}</span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Tên môn học:</span>
          <span className="text-bold2">{lesson.subject_name}</span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Trình độ:</span>
          <span className="text-bold2">{lesson.subject_level}</span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Thời lượng:</span>
          <span className="text-bold2">
            <TimeLength length={lesson.lesson_time_length} />
          </span>
        </div>
      </div>
    </div>
  );
}

LessonCard.propTypes = { lesson: PropTypes.object };

export default LessonCard;
