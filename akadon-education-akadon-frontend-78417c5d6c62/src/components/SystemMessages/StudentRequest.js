import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/student-request-icon.svg";
import SubjectImage from "../utils/SubjectImage";

function StudentRequest({ msg }) {
  if (!msg) return <></>;
  const { text_type, title, message, read_flg } = msg;
  const subject = text_type.split("-")[1];
  const isNew = !read_flg;
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

StudentRequest.propTypes = { msg: PropTypes.object };

export default StudentRequest;
