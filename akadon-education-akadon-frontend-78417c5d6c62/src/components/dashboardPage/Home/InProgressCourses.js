import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DayGridMonthCalendar from "../../utils/DayGridMonthCalendar";
import UpcomingLessons from "./UpcomingLessons";
import TitleCourse from "../../../assets/icons/titlecourse.svg";

const InProgressCourses = ({ courses }) => {
  // LOCAL STATE DECLARATIONS
  const [fullCourses, setFullCourses] = useState(false);
  const { t } = useTranslation("home-page");

  // EXTRACT PROPS
  const coursesToRender = fullCourses ? courses : courses.slice(0, 3);

  // FUNCTION DECLARATIONS
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
        };
        subjects.push({ ...subject });
      }
    });
    return {
      date: date,
      subjects: [...subjects],
    };
  });

  if (courses.length > 0) {
    return (
      <div className="inprogress-courses flex-box align-items-stretch justify-content-between mb-3">
        <div
          style={{ overflow: "hidden" }}
          className="inprogress-courses__courses card-style position-relative border-radius-2 flex-grow mr-3"
        >
          <div className="flex-box justify-content-between">
            <h4 className="text-dark text-bold2 text-uppercase mb-12px">
              <img src={TitleCourse} alt="title" className="mr-2" />
              {t("block-4-student")}
            </h4>
            <Link
              to="/dashboard/calendar"
              className="small-screen-calendar rounded-circle mr-2 btn"
              style={{ width: "24px", height: "24px", background: "#0367B4" }}
            >
              <FontAwesomeIcon
                className="text-light"
                icon={["fal", "calendar-alt"]}
              />
            </Link>
          </div>
          <div className="flex-box flex-wrap justify-content-between align-items-stretch mb-3">
            {coursesToRender.map((course) => (
              <UpcomingLessons course={course} key={course.id} />
            ))}
          </div>
          <div
            style={{ bottom: "-24px" }}
            className="center-box w-100 position-absolute"
          >
            <div
              onClick={() => setFullCourses(!fullCourses)}
              className="center-box btn rounded-circle bg-hightlight-1 text-light"
              style={{ minWidth: "48px", minHeight: "48px", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                className="h3 mb-3"
                icon={["fal", `${fullCourses ? "angle-up" : "angle-down"}`]}
              />
            </div>
          </div>
        </div>
        <div className="inprogress-courses__calendar">
          <DayGridMonthCalendar events={events} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default InProgressCourses;
