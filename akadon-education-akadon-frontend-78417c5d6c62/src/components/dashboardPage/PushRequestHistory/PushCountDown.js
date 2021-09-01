import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./index.scss";

function PushCountDown({ expireDate }) {
  const { t } = useTranslation(["common"]);
  // INIT LOCAL STATES
  const initCountDown = {
    remainDay: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };

  // LOCAL STATE DECLARATIONS
  const [countDown, setCountDown] = useState(initCountDown);

  // SIDE EFFECTS
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date().getTime();
      const distance = new Date(expireDate).getTime() - currentDateTime;
      const remainDay = Math.ceil(distance / (1000 * 60 * 60 * 24));
      if (remainDay > 1) {
        setCountDown({ remainDay });
        clearInterval(interval);
      }

      if (distance <= 0) {
        clearInterval(interval);
      }

      if (remainDay <= 1) {
        const remainHour = Math.floor(distance / (1000 * 60 * 60));
        const remainMinute = Math.floor(distance / (1000 * 60));
        const remainSecond = Math.floor(distance / 1000);
        const hour = remainHour;
        const minute = remainMinute % 60;
        const second = remainSecond % 60;
        setCountDown({ hour, minute, second, remainDay: 0 });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [expireDate]);

  return (
    <div>
      {countDown.remainDay > 1 ? (
        <span>
          {countDown.remainDay} {t("common:day")}
        </span>
      ) : countDown.remainDay === 0 && countDown.second > 0 ? (
        <>
          <span>
            {countDown.hour < 10 && "0"}
            {countDown.hour}
          </span>{" "}
          :{" "}
          <span>
            {countDown.minute < 10 && "0"}
            {countDown.minute}
          </span>{" "}
          :{" "}
          <span>
            {countDown.second < 10 && "0"}
            {countDown.second}
          </span>
        </>
      ) : (
        <span>00 : 00 : 00</span>
      )}
    </div>
  );
}

PushCountDown.propTypes = {
  expireDate: PropTypes.string,
};

export default PushCountDown;
