import React from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
import Notify from "../Notify/Notify";
import ChatDropdown from "./ChatDropdown";
import ProfileDropdownContainer from "./containers/ProfileDropdownContainer";
import TypeAcTutor from "./TypeAcTutor";
import useWindowSize from "../customHooks/useWindowSize";
import MobileTopNav from "./MobileTopNav";

const TopNav = ({ userType }) => {
  const [width, height] = useWindowSize();
  const { t } = useTranslation("topnav");

  const DateString = () => {
    // GET CURENT DATE
    // CALCULATE DAY, MONTH, YEAR AND DAY OF WEEK
    const date = new Date();
    let month = date.getMonth() + 1;
    month < 10 && (month = `0${month}`);

    let day = date.getDate();
    day < 10 && (day = `0${day}`);

    const year = date.getFullYear();
    let dayOfWeek = "";
    (() => {
      switch (date.getDay()) {
        case 0:
          dayOfWeek = t("sun");
          break;
        case 1:
          dayOfWeek = t("mon");
          break;
        case 2:
          dayOfWeek = t("tue");
          break;
        case 3:
          dayOfWeek = t("wes");
          break;
        case 4:
          dayOfWeek = t("thu");
          break;
        case 5:
          dayOfWeek = t("fri");
          break;
        case 6:
          dayOfWeek = t("sat");
          break;
      }
    })();
    return (
      <p className="flex-grow m-0 mr-2 text-truncate">
        <span className="text-hightlight1 font-weight-bold">{dayOfWeek}</span>
        <span>
          , {t("day")} {day} {t("month")} {month} {t("years")} {year}
        </span>
      </p>
    );
  };

  if (width < 769) return <MobileTopNav userType={userType} />;

  return (
    <div className="top-navbar flex-box justify-content-between mb-3">
      <div className="flex-box action-box justify-content-start">
        {userType === "tutor" && <TypeAcTutor />}
      </div>
      <div className="info-box flex-box justify-content-end">
        <div className="date-string">
          <DateString />
        </div>
        <ChatDropdown userType={userType} />
        <Notify />
        <ProfileDropdownContainer />
      </div>
    </div>
  );
};

export default TopNav;
