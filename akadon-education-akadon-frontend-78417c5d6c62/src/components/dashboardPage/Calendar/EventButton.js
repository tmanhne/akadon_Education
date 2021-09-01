import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { subjectColor } from "../../../module";
import Subject from "../../utils/Subject";

function EventButton({ courseInfo }) {
  const startTime =
    courseInfo.start_time &&
    courseInfo.start_time.split(":").slice(0, 2).join(":");
  const endTime =
    courseInfo.end_time && courseInfo.end_time.split(":").slice(0, 2).join(":");

  return (
    <div
      id={`akadon-${courseInfo.lesson_id}`}
      className="akadon-event p-1 border-radius-1 border-0 cursor-pointer h-100 text-center"
      style={{ background: subjectColor(courseInfo.subject_name) }}
    >
      <p className="text-bold2 text-light mb-2">
        <Subject subject={courseInfo.subject_name} />
      </p>
      <div className="text-small text-light mb-1">
        <span>{startTime}</span>
        <span> - </span>
        <span>{endTime}</span>
      </div>
      <div className="tutor d-none">
        <FontAwesomeIcon
          icon={["fas", "chalkboard-teacher"]}
          className="text-light"
        />
        <span className="text-small mx-2">Tutor:</span>
        <span className="text-bold1">{courseInfo.tutor_name}</span>
      </div>
    </div>
  );
}

EventButton.propTypes = { courseInfo: PropTypes.object };

export default EventButton;
