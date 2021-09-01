import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/hand.svg";

function TeachRequest1({ msg }) {
  if (!msg) return <></>;
  const { title, message, read_flg, avatar } = msg;
  const isNew = !read_flg;
  const url = message.split(" ").find(str => str.startsWith("http"));
  return (
    <a href={url} className={`text-decoration-none p-3 box-shadow-bottom flex-box ${isNew && "new-item"}`}>
      <div className="avatar-box">
        <img
          className="image-avatar"
          src={avatar || "https://ui-avatars.com/api/?name=Undefined"}
          width={56}
          alt="user"
        />
        <img
          className="position-absolute absolute-icon"
          src={Icon}
          alt="teach request"
        />
      </div>
      <div className="align-self-start">
        <h6 className="title">{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: message }} className="mb-0"></p>
      </div>
    </a>
  );
}

TeachRequest1.propTypes = { msg: PropTypes.object };

export default TeachRequest1;
