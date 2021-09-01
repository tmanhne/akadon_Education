import moment from "moment-timezone";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function After15Count({
  waitingForUserJoin,
  modal,
  setModal,
  startDate,
  t,
  userType,
}) {
  const [coundown, setCoundown] = useState({
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const time15 = moment(startDate).add(15, `minutes`);
      const distance = time15 - moment();

      if (distance <= 0 && waitingForUserJoin) {
        setModal({ ...modal, trialWaiting: true });
        console.log("het 15p");
        clearInterval(interval);
      }

      if (distance > 0) {
        let seconds, minutes;
        // Seconds value to display
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Minute to display
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setCoundown({ minutes, seconds });
      }
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="position-absolute video-cta d-inline-flex mb-3">
      <div className="text-light ml-4" style={{ width: "5rem" }}>
        {coundown.minutes >= 10 ? coundown.minutes : `0${coundown.minutes}`} :{" "}
        {coundown.seconds >= 10 ? coundown.seconds : `0${coundown.seconds}`}
      </div>
      <span style={{ color: "#A4ABBD" }} className="ml-1">
        {userType === "student" ? t("video:alert_1") : t("video:alert_2")}
      </span>
    </div>
  );
}

export default After15Count;
