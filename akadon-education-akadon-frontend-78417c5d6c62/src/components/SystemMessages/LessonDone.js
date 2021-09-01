import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/lesson-done.svg";
import SubjectImage from "../utils/SubjectImage";

function LessonDone({ msg }) {
  if (!msg) return <></>;
  const { title, message, read_flg } = msg;
  const isNew = !read_flg;
  const text_type = msg.text_type || "";
  const subject = text_type.split("-")[1];
  const url = message.split(" ").find(str => str.startsWith("http"));
  return (
    <a href={url} className={`text-decoration-none p-3 box-shadow-bottom flex-box ${isNew && "new-item"}`}>
      <div className="avatar-box">
        <SubjectImage subject={subject} width="56px" />
        <img
          className="position-absolute absolute-icon"
          src={Icon}
          alt="lesson"
        />
      </div>
      <div className="align-self-start">
        <h6 className="title">{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: message }} className="mb-0"></p>
      </div>
    </a>
  );
}

LessonDone.propTypes = { msg: PropTypes.object };

export default LessonDone;
