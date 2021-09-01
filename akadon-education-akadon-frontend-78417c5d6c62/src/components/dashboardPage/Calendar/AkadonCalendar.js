
import React from "react";
import { useTranslation } from "react-i18next";

import CalendarImg from "../../../assets/images/akadon-calendar.png";

export default function AkadonCalendar() {
  const { t } = useTranslation("calendar-page");
  return (
    <div className="intro card-style p-3 center-box flex-column">
      <img src={CalendarImg} alt="akadon calendar" className="mb-4 w-100" />
      <p className="text-grey text-bold1 text-center">{t("note")}</p>
    </div>
  );
}
