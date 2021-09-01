import React from "react";

import Avatar from "../../../assets/icons/akadon-avatar.png";
import CountDown from "../../utils/CountDown";

const StartLesson30Minutes = () => {
  const date = new Date("2020-10-23T13:30:30Z");
  const expiryTimes = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return (
    <div className="flex-box px-2 align-items-start">
      <img
        className="image-avatar mr-2"
        width={55}
        height={55}
        alt="subject logo"
        src={Avatar || "http://via.placeholder.com/55x55"}
      />
      <div>
        <p className="mb-2 text-wrap">
          Buổi học của bạn sẽ bắt đầu trong 30 phút nữa
        </p>
        <div className="mb-2">
          <CountDown expiryTimes={expiryTimes} />
        </div>
        <div className="flex-box cta-box">
          <div className="main-btn text-small text-bold2  mr-2">Tham gia</div>
          <div className="main-btn text-small text-bold2  text-dark cancel-btn">
            Huỷ
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLesson30Minutes;
