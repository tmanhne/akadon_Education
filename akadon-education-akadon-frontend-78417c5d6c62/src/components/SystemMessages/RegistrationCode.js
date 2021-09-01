import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/protect-icon.svg";

function RegistrationCode({ msg }) {
  if (!msg) return <></>;
  const { title, message, read_flg } = msg;
  const isNew = !read_flg;

  return (
    <div className={`p-3 box-shadow-bottom flex-box ${isNew && "new-item"}`}>
      <img className="mr-12px" src={Icon} alt="payment" width={60} />

      <div className="align-self-start">
        <h6 className="title">{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: message }} className="mb-0"></p>
      </div>
    </div>
  );
}
RegistrationCode.propTypes = { msg: PropTypes.object };

export default RegistrationCode;
