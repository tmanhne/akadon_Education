import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import {useTranslation} from "react-i18next";

import "./index.scss";
import { getUpcomingLessons } from "../../../api";
import DayGridMonthCalendar from "../../utils/DayGridMonthCalendar";
import EventDropdown from "./EventDropdown";
import AkadonCalendar from "./AkadonCalendar";
import EventButton from "./EventButton";
import SubLoader from "../../utils/SubLoader";

const Calendar = () => {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState({});
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation(["calendar-page","toast"])

  useEffect(() => {
    // GET UPCCOMING LESSONS
    (async () => {
      const res = await getUpcomingLessons();
      setLoading(false);
      if (res.status < 400) {
        setCourses([...res.data]);
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")} ${res.response.status}`);
      }
    })();
  }, []);

  useEffect(() => {
    // TRANSLATE SOME CALENDAR TITLE TO VIETNAMESE
    const todayBtn = document.querySelector(".fc-today-button");
    const monthBtn = document.querySelector(".fc-dayGridMonth-button");
    const weekBtn = document.querySelector(".fc-timeGridWeek-button");
    const dayBtn = document.querySelector(".fc-timeGridDay-button");

    if (todayBtn) {
      todayBtn.innerHTML = t("today");
      const hoverEl = document.createElement("DIV");
      const date = new Date();
      const month = date.getMonth() + 1;
      const dateOfMonth = date.getDate();
      const weekDay = date.getDay() + 1;
      const textNode = `Thứ ${weekDay}, ${dateOfMonth}/${month}`;
      hoverEl.innerHTML = textNode;
      todayBtn.appendChild(hoverEl);

      monthBtn.innerHTML = t("month");
      weekBtn.innerHTML = t("week");
      dayBtn.innerHTML = t("day");
    }
  });

  // FUNCTION DECLARATIONS AND DATA IMPLEMENTATIONS
  const fcHeader = {
    left: "today,prev,next,title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  };
  const titleFormat = { year: "numeric", month: "numeric", day: "numeric" };

  // IMPLEMENT AN EVENT OBJECT TO PASS TO FULLCALENDAR
  // 1. Get all dates
  let dates = [];
  courses.map((course) => {
    course.lessons.map((lesson) => {
      if (!dates.includes(lesson.lesson_date)) {
        dates.push(lesson.lesson_date);
      }
    });
  });

  // 2. Make events array
  const events = dates.map((date) => {
    let subjects = [];

    courses.map((course) => {
      let existDate = course.lessons.filter(
        (lesson) => lesson.lesson_date === date
      )[0];
      if (existDate) {
        const subject = {
          subject_name: course.subject_name,
          start_time: existDate.start_time,
          end_time: existDate.end_time,
          course_id: course.id,
          lesson_id: existDate.id,
          lessons: course.lessons,
          tutor_name: course.tutor_name,
        };
        subjects.push({ ...subject });
      }
    });

    return {
      date: date,
      subjects: [...subjects],
    };
  });

  let fullEvents = [];
  courses.map((course) => {
    course.lessons.map((lesson) => {
      let start, end;
      if (lesson.start_time && lesson.end_time) {
        start = new Date(lesson.lesson_date + " " + lesson.start_time);
        end = new Date(lesson.lesson_date + " " + lesson.end_time);
      } else {
        start = new Date(lesson.lesson_date + " " + "00:00:00");
        end = new Date(lesson.lesson_date + " " + "00:00:00");
      }

      const event = {
        date: lesson.lesson_date,
        start: start,
        end: end,
        extendedProps: {
          course_id: course.id,
          lesson_id: lesson.id,
          tutor_name: course.tutor_name,
          subject_name: course.subject_name,
          start_time: lesson.start_time || "00:00:00",
          end_time: lesson.end_time || "00:00:00",
          lessons: course.lessons,
        },
      };
      fullEvents.push(event);
    });
  });

  const eventContent = (e) => {
    const courseInfo = e.event._def.extendedProps;
    return (
      <div onClick={() => setModal(courseInfo)} className="w-100 h-100 mb-1">
        <EventButton courseInfo={courseInfo} />
      </div>
    );
  };

  return (
    <>
      <div className="h3 font-weight-bold ml-3 mb-12px">{t("calendar-title")}</div>
      {loading ? (
        <SubLoader />
      ) : (
        <div className="calendar-page flex-box align-items-start">
          <div className="calendar-page__main position-relative card-style flex-grow mr-3">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin, timeGridPlugin]}
              headerToolbar={fcHeader}
              slotLabelFormat={{ hour: "numeric", minute: "2-digit" }}
              allDaySlot={false}
              locale="en"
              events={fullEvents}
              eventContent={eventContent}
              titleFormat={titleFormat}
            />
          </div>
          <div className="calendar-page__sidebar">
            <div className="calendar card-style border-radius-2 px-0 w-100 mb-3">
              <DayGridMonthCalendar events={events} />
            </div>
            <AkadonCalendar />
          </div>
        </div>
      )}
      <Modal
        isOpen={modal.course_id ? true : false}
        centered={true}
        contentClassName="card-style p-3"
      >
        <EventDropdown t={t} setModal={setModal} courseInfo={modal} />
      </Modal>
    </>
  );
};

export default Calendar;
