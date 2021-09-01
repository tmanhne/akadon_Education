import React from "react";
import PropTypes from "prop-types";

import Icon from "../../assets/icons/upgrade-account.svg";

function UpgradeAccount({ msg }) {
  if (!msg) return <></>;
  const { title, message, read_flg } = msg;
  const isNew = !read_flg;
  const url = message.split(" ").find(str => str.startsWith("http"));
  return (
    <a href={url} className={`text-decoration-none p-3 box-shadow-bottom flex-box ${isNew && "new-item"}`}>
      <img src={Icon} alt="upgrade acount" className="mr-12px" width={60} />
      <div className="align-self-start">
        <h6 className="title">{title}</h6>
        <p dangerouslySetInnerHTML={{ __html: message }} className="mb-0"></p>
      </div>
    </a>
  );
}

UpgradeAccount.propTypes = { msg: PropTypes.object };

export default UpgradeAccount;
