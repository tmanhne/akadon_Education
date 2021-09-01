import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/verify-email.svg";

function VerifyEmail({ msg }) {
  if (!msg) return <></>;
  const { title, message, read_flg } = msg;
  const isNew = !read_flg;

  return (
    <div className={`p-3 box-shadow-bottom flex-box ${isNew && "new-item"}`}>
      <img src={Icon} alt="upgrade acount" className="mr-12px" width={60} />
      <div className="align-self-start">
        <h6 className="title">{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: message }} className="mb-0"></p>
      </div>
    </div>
  );
}

VerifyEmail.propTypes = { msg: PropTypes.object };

export default VerifyEmail;
