import React from "react";

import ProIcon from "../../assets/icons/user-pro-icon.svg";
import StandardIcon from "../../assets/icons/user-standard-icon.svg";
import RatingBox from "./RatingBox";

// LONG sửa lỗi avatar không tròn( lấy width=>64 của khung chứa)

const UserBox = ({ avatar, width, height, name, rate, priority }) => {
  const baseUrl =
    process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn";

  const updatedAvatar = avatar
    ? baseUrl + avatar
    : `https://ui-avatars.com/api/?name=${name}`;

  return (
    <div className="flex-box align-items-center">
      <img
        src={updatedAvatar}
        style={{ border: "1px solid red" }}
        width={width}
        height={height}
        className="mr-3 rounded-circle"
        alt="user"
      />
      <div>
        <div className="flex-box align-items-center">
          <h5 className="mb-0 text-bold1 text-dark">{name}</h5>
          {priority > 0 && (
            <img src={priority === 1 ? StandardIcon : ProIcon} alt="pro icon" />
          )}
        </div>
        <RatingBox rate={rate} />
      </div>
    </div>
  );
};

export default UserBox;
