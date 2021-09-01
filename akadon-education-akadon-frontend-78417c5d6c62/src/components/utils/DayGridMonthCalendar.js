import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { subjectColor } from "../../module";
import Subject from "./Subject";
import SubjectImage from "../utils/SubjectImage";

const DayGridMonthCalendar = ({ events }) => {
  const { t } = useTranslation("common");

  const calendarHeader = {
    start: "title",
    center: "",
    end: "prev,next",
  };

  const eventContent = (eventInfo) => {
    const { subjects } = eventInfo.event._def.extendedProps;
    const id = eventInfo.event._def.defId;
    return (
      <>
        <div
          className="flex-box h-100 w-100 justify-content-center align-items-end"
          id={`tollltip-${id}`}
        >
          {subjects.map((s, index) => {
            const bg = subjectColor(s.subject_name);
            return (
              <div
                key={index}
                id={`${s.subject_name}-${index}`}
                className="subject-icon rounded-circle"
                style={{
                  background: bg,
                }}
              ></div>
            );
          })}
        </div>
        <UncontrolledTooltip
          hideArrow
          placement="top"
          target={`tollltip-${id}`}
          innerClassName="bg-light"
        >
          <div className="text-dark card-style box-shadow">
            {subjects.map((s, index) => {
              const bg = subjectColor(s.subject_name);
              const start = s.start_time
                ? s.start_time.split(":").slice(0, 2).join(":")
                : "00:00";
              const end = s.end_time
                ? s.end_time.split(":").slice(0, 2).join(":")
                : "00:00";

              return (
                <div key={index} className="flex-box align-items-start mb-2">
                  <div
                    className="rounded-circle align-self-center subject-icon mr-2"
                    style={{
                      background: bg,
                    }}
                  ></div>
                  <SubjectImage
                    subject={s.subject_name}
                    width="24px"
                    height="24px"
                  />
                  <div className="ml-2">
                    <h6 className="mb-1 text-left text-bold1">
                      <Subject subject={s.subject_name} />
                    </h6>
                    <div className="text-hightlight1 text-small">
                      {start} - {end}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </UncontrolledTooltip>
      </>
    );
  };
  return (
    <div className="day-grid-month-calendar card-style border-radius-2">
      <div className="day-grid-month-calendar__header flex-box justify-content-between mb-4">
        <div className="flex-box align-items-center">
          <div
            className="center-box rounded-circle mr-2 shadow-btn-hover"
            style={{ width: "24px", height: "24px", background: "#E0ECF5" }}
          >
            <FontAwesomeIcon
              className="text-hightlight1"
              icon={["fal", "calendar-alt"]}
            />
          </div>
          <h6 className="text-bold2 mb-0">{t("calendar")}</h6>
        </div>
        <Link
          to="/dashboard/calendar"
          className=" flex-box align-items-center text-decoration-none cursor-pointer"
        >
          <span className="text-bold1 text-grey text-small mr-2">
            {t("view-calendar")}
          </span>
          <div
            className="center-box  rounded-circle bg-hightlight-1 mr-2 btn"
            style={{ width: "24px", height: "24px" }}
          >
            <FontAwesomeIcon
              className="text-light text-bold2"
              icon={["fal", "arrow-right"]}
            />
          </div>
        </Link>
      </div>
      <FullCalendar
        headerToolbar={calendarHeader}
        titleFormat={{ year: "numeric", month: "numeric" }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={t("common:language")}
        events={events}
        eventContent={eventContent}
      />
    </div>
  );
};

export default DayGridMonthCalendar;
