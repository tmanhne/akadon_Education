import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CountDown = ({ expiryTimes }) => {
  const [countDown, setCountDown] = useState({
    day: "",
    hour: "",
    minute: "",
    second: "",
  });
  const {t} = useTranslation("date");

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = expiryTimes - new Date().getTime();
      if (distance > 0) {
        convertMS(distance);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [expiryTimes]);

  function convertMS(milliseconds) {
    let hour, minute, second;
    // Total seconds and minutes left
    second = Math.floor(milliseconds / 1000);
    minute = Math.floor(second / 60);
    // Seconds value to display
    second = second % 60;
    // Total hours left
    hour = Math.floor(minute / 60);
    // Minute to display
    minute = minute % 60;
    // Hour to display
    hour = hour % 24;
    const newState = { hour, minute, second };
    setCountDown(newState);
  }
  if (countDown.minute * 1 === 0 && countDown.second * 1 === 0) {
    return (
      <div className="count-down flex-box align-items-stretch">
        <div className="mr-2">
          <div className="h5 text-hightlight font-weight-bold mb-0">
            00
          </div>
          <div className="text-grey text-center text-small-1">{t("hour")}</div>
        </div>
        <div className="h5 text-grey mr-2">:</div>
        <div className="mr-2">
          <div className="h5 text-hightlight font-weight-bold mb-0">
            00
          </div>
          <div className="text-grey text-center text-small-1">{t("minute")}</div>
        </div>
        <div className="h5 text-grey mr-2">:</div>
        <div>
          <div className="h5 text-hightlight font-weight-bold mb-0">
            00
          </div>
          <div className="text-grey text-center text-small-1">{t("second")}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="count-down flex-box align-items-stretch">
        <div className="mr-2">
          <div className="h5 text-hightlight font-weight-bold mb-0">
            {countDown.hour >= 10 ? countDown.hour : "0" + countDown.hour}
          </div>
          <div className="text-grey text-center text-small-1">{t("hour")}</div>
        </div>
        <div className="h5 text-grey mr-2">:</div>
        <div className="mr-2">
          <div className="h5 text-hightlight font-weight-bold mb-0">
            {countDown.minute >= 10 ? countDown.minute : "0" + countDown.minute}
          </div>
          <div className="text-grey text-center text-small-1">{t("minute")}</div>
        </div>
        <div className="h5 text-grey mr-2">:</div>
        <div>
          <div className="h5 text-hightlight font-weight-bold mb-0">
            {countDown.second >= 10 ? countDown.second : "0" + countDown.second}
          </div>
          <div className="text-grey text-center text-small-1">{t("second")}</div>
        </div>
      </div>
    );
  }
};

export default CountDown;
