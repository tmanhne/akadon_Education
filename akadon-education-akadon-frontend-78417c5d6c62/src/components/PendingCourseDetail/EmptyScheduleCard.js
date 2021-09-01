import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import waittutor from "../../assets/images/wait-tutor-respon.svg";
import { Trans, useTranslation } from "react-i18next";

export default function EmptyScheduleCard() {
  const { t } = useTranslation("common");

  return (
    <div className="card-style py-3 px-4 mb-3">
      <h6 className="mb-12px font-weight-bold">{t("schedule")}</h6>
      <p className="mb-0 text-hightlight">{t("wait_schu")}</p>

      {/* <FullCalendar
         plugins={[dayGridPlugin]}
        headerToolbar={{start: "", center: "", end: "prev,next"}}
        timeZone="UTC"
        height={500}
        locale="vi"
      /> */}
      <div className="d-flex justify-content-center pb-3">
        <img src={waittutor} alt="wait" />
      </div>
    </div>
  );
}
