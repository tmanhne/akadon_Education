import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

function VideoDuration({ duration, setExpire, real_start_time }) {
  const [coundown, setCoundown] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  // LONG LẤY TIME LÚC 2 CÙNG JOIN VIDEO  THÊM THWOIF LƯỢNG CỦA BUỔI HỌC VÀO
  const timefull = moment(real_start_time).add(duration, `seconds`);
  // TÍNH THỜI GIAN CÒN LẠI TỪ LÚC 2 CÙNG JOIN+2 TIẾNG
  let timeremain = timefull - moment();

  let remainSecond = Math.floor(timeremain / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      remainSecond--;
      if (remainSecond <= 0) {
        clearInterval(interval);
        setExpire(true);
      }
      if (remainSecond > 0) {
        const remainHours = Math.floor(remainSecond / (60 * 60));
        const remainMinutes = Math.floor(remainSecond / 60);

        const seconds = remainSecond % 60;
        const minutes = Math.floor(remainMinutes % 60);
        const hours = Math.floor(remainHours % 60);
        setCoundown({ hours, minutes, seconds });
      }
    }, 1000);
  }, [real_start_time]);

  return (
    <div
      className="text-light position-absolute ml-4 mt-3"
      style={{ width: "5.5rem" }}
    >
      {coundown.hours >= 10 ? coundown.hours : `0${coundown.hours}`} :{" "}
      {coundown.minutes >= 10 ? coundown.minutes : `0${coundown.minutes}`} :{" "}
      {coundown.seconds >= 10 ? coundown.seconds : `0${coundown.seconds}`}
    </div>
  );
}

VideoDuration.propTypes = {};

export default VideoDuration;
