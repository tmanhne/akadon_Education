import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { DateClickCalendar } from "../utils";
import { useTranslation } from "react-i18next";

function TutorScheduleCard({ request, date, setDate }) {
  const { t } = useTranslation("course-detail");
  // EXTRACT PROPS
  const {
    start_date,
    end_date,
    free_time,
    number_lesson,
    is_course,
    schedule,
  } = request;
  const startDate = moment(start_date, "DD/MM/YYYY").format("YYYY-MM-DD");
  const endDate = moment(end_date, "DD/MM/YYYY").format("YYYY-MM-DD");

  // SIDE EFFECTS
  useEffect(() => {
    const schedule = genSuitableLesson();
    setDate(schedule || []);
  }, []);

  // FUNCTION DECLARATIONS
  function genSuitableLesson() {
    let schedule = [];
    let dateList = [];

    const currentDate = moment();
    const startDate = moment(start_date, "DD/MM/YYYY");
    const endDate = moment(end_date, "DD/MM/YYYY");

    while (true) {
      const length = schedule.length;
      // Break if schedule length larger or equal to number lesson
      if (length >= number_lesson) {
        break;
      }

      // Get the next of current day
      currentDate.add(1, "days");
      const dayInWeek = currentDate.day();

      // Break if current date larger than expected end date
      if (currentDate.diff(endDate, "days") > 0) {
        break;
      }

      // Continue if current date smaller than expected start date
      if (currentDate.diff(startDate, "days") < 0) {
        continue;
      }

      // Format date to yyyy/mm/dd
      const dateStr = currentDate.format("YYYY-MM-DD");

      free_time.map((range) => {
        if (
          range.day_in_week.includes(dayInWeek) &&
          !dateList.includes(dateStr)
        ) {
          const scheduleObj = {
            start_time: range.start_time,
            end_time: range.end_time,
            date: dateStr,
          };
          schedule.push(scheduleObj);
          dateList.push(dateStr);
        }
      });
    }

    // format date to dd/mm/yyyy
    const formatedSchedule = schedule.map((s) => ({
      ...s,
      date: moment(s.date).format("DD/MM/YYYY"),
    }));
    return formatedSchedule;
  }
  const datetutor = is_course
    ? schedule.map((s, index) => {
        if (index < 3) {
          return { ...s, recommended: true };
        } else {
          return { ...s };
        }
      })
    : date.map((s, index) => {
        if (index < 3) {
          return { ...s, recommended: true };
        } else {
          return { ...s };
        }
      });

  return (
    <div className="card-style py-3 px-4 mb-3">
      <h6 className="mb-12px font-weight-bold">{t("title_9")}</h6>
      <p className="mb-12px text-hightlight">{t("title_10")}</p>
      <DateClickCalendar
        startDate={startDate}
        endDate={endDate}
        setDate={setDate}
        date={datetutor}
      />
    </div>
  );
}

TutorScheduleCard.propTypes = {
  request: PropTypes.object,
};

export default TutorScheduleCard;
