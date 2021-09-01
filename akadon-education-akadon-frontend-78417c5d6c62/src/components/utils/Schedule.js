import React from "react";

const Schedule = ({ schedule }) => {
  const scheduleForm = [
    {
      title: "Thứ 2",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "Thứ 3",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "Thứ 4",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "Thứ 5",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "Thứ 6",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "Thứ 7",
      morning: false,
      afternoon: false,
      night: false,
    },
    {
      title: "CN",
      morning: false,
      afternoon: false,
      night: false,
    },
  ];
  const renderSchedule = schedule || scheduleForm;
  return (
    <div className="flex-box justify-content-around">
      {renderSchedule.map((s) => (
        <div key={s.title}>
          <div className="mb-2 flex-box flex-column">{s.title}</div>
          <div
            className={`center-box text-grey border border-radius-2 py-2 px-3 mb-2 ${
              s.morning && "schedule-active"
            }`}
          >
            Sáng
          </div>
          <div
            className={`center-box text-grey border border-radius-2 py-2 px-3 mb-2 ${
              s.afternoon && "schedule-active"
            }`}
          >
            Chiều
          </div>
          <div
            className={`center-box text-grey border border-radius-2 py-2 px-3 mb-2 ${
              s.night && "schedule-active"
            }`}
          >
            Tối
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
