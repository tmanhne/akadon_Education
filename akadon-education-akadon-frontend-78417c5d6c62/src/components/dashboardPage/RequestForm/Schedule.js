import React from "react";
import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";

const Schedule = ({schedule, setSchedule}) => {
  const handleScheduleChange = (title, key, value) => {
    const updatedSchedule = schedule.map(s => {
      if(s.title === title) {
        return {...s, [key]: value}
      }
      return {...s}
    })
    setSchedule([...updatedSchedule])
  }
  return (
    <div className="flex-box request-form__schedule justify-content-between mb-3">
      {schedule.map((s) => (
        <div key={s.title}>
          <div className="mb-2">{s.title}</div>
          <div>
            <Input onChange={e => handleScheduleChange(s.title, "morning", e.target.checked)} className="d-none" type="checkbox" id={`${s.title}-morning`} />
            <Label
              for={`${s.title}-morning`}
              className="text-grey center-box border border-radius-2 text-small p-2 mb-2"
            >
              Sáng
            </Label>
          </div>
          <div>
            <Input onChange={e => handleScheduleChange(s.title, "afternoon", e.target.checked)} className="d-none" type="checkbox" id={`${s.title}-afternoon`} />
            <Label
              for={`${s.title}-afternoon`}
              className="text-grey center-box border border-radius-2 text-small p-2 mb-2"
            >
              Chiều
            </Label>
          </div>
          <div>
            <Input onChange={e => handleScheduleChange(s.title, "night", e.target.checked)} className="d-none" type="checkbox" id={`${s.title}-night`} />
            <Label
              for={`${s.title}-night`}
              className="text-grey center-box border border-radius-2 text-small p-2"
            >
              Tối
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

Schedule.propTypes = {
  schedule: PropTypes.array,
  setSchedule: PropTypes.func
}

export default Schedule;
