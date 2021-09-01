import React from "react";
import PropTypes from "prop-types";

function Avatar({ avatar, width, name }) {
  const updatedAvatar = avatar
    ? (process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn") +
      avatar
    : `https://ui-avatars.com/api/?name=${name}`;

  return (
    <img
      src={updatedAvatar}
      className="image-avatar"
      width={width}
      height={width}
      alt={name}
    />
  );
}

Avatar.propTypes = {
  width: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

export default Avatar;
