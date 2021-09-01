import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";

import ScheduleList from "../utils/ScheduleList";
import moment from "moment";

function CourseSchedule({ schedule, userType,start,end,numberlesson,dataSchedule }) {

const [date,setDate] =useState();
  // SIDE EFFECTS
  useEffect(() => {
    const schedule = fillDate();
    if (schedule) {
      setDate(schedule);
    }
  }, []);

  function fillDate() {
    let data = [];
    let dateList = [];
    // RETURN IF SOME CRITERIA NOT REACHES
    const isNumberLesson = !numberlesson;
    const isNumberLessonLargeThan0 = numberlesson * 1 === 0;
    let expectLength = 0;
    dataSchedule.map((range) => {
      expectLength += range.day_in_week.length;
    });

    if (
      isNumberLesson ||
      isNumberLessonLargeThan0 ||
      expectLength === 0
    )
      return;


    const currentDate = moment(start);

    const endDate = moment(end);
    while (true) {
      //INCREASE DATE BY ONE AND CHECK CONDITION TO ADD TO SCHEDULE
      // Break if schedule length larger or equal to number lesson
      const length = data.length;
      if (length >= numberlesson*1) {
        break;
      }

      // Get the next of current day
      currentDate.add(1, "days");
      const day_in_week = currentDate.day();

      // Break if current date larger than expected end date
      if (currentDate.diff(endDate, "days") > 0) {
        break;
      }

      // Format date to yyyy/mm/dd
      const dateStr = moment(currentDate).format("YYYY-MM-DD");

      // Check matched condition and push it to schedule + placeholder dateList variable
      dataSchedule.map((range) => {
        if (
          range.day_in_week.includes(day_in_week) &&
          !dateList.includes(dateStr)
        ) {
    
          const scheduleObj = {
            start_time: range.start_time,
            end_time: range.end_time,
            date: dateStr,
          };
          data.push(scheduleObj);
          dateList.push(dateStr);
        }
      });
    }
    // format date to dd/mm/yyyy
    const formatedSchedule = data.map((s) => ({
      ...s,
      date: moment(s.date).format("DD/MM/YYYY"),
    }));
    return formatedSchedule;
  }
 
  return (
    <div className="card-style mb-3 p-4">
      <p className="mb-12px font-weight-bold">
        Lịch học dự kiến
      </p>
      {userType === "tutor" && (
        <p className="text-hightlight font-italic">
          Lịch học này có thể bổ sung trong quá trình học
        </p>
      )}

      <ScheduleList schedule={date} />
    </div>
  );
}

CourseSchedule.propTypes = {
  schedule: PropTypes.array,
};

export default CourseSchedule;
