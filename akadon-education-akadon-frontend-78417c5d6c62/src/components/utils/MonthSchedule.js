import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useTranslation } from "react-i18next";

const MonthSchedule = ({ events, month }) => {
  const { t } = useTranslation("toast");
  function eventRender(info) {
    // EXPTRACT PROPS
    const { event } = info;
    let { start_time, end_time, is_new, recommended } =
      event._def.extendedProps;
    let dateOfMonth = event.start.getDate();

    start_time = start_time && start_time.slice(0, 5);
    end_time = end_time && end_time.slice(0, 5);
    
    return (
      <div
        className={`h-100 center-box flex-column ${
          is_new ? "bg-hightlight" : "bg-transparent"
        } ${recommended && "recommended"}`}
      >
        <h6 className="mb-0 text-bold1 text-center">{dateOfMonth}</h6>
        <div className="flex-box text-bold1 justify-content-center flex-wrap text-small-1 text-center mb-0">
          <span>{start_time}</span>
          <span>-</span>
          <span>{end_time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="month-schedule w-100">
      <FullCalendar
        headerToolbar={{ left: "", center: "", right: "" }}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={t("language")}
        timeZone="local"
        titleFormat={{ year: "numeric", month: "numeric" }}
        height={350}
        events={events}
        eventContent={eventRender}
        initialDate={month}
      />
    </div>
  );
};

export default MonthSchedule;
