import React from 'react'
import PropTypes from 'prop-types'

import ScheduleList from "../utils/ScheduleList";

function StudentScheduleCard({schedule}) {
  const updatedSchedule = schedule.map((s, index) => {
    if (index < 3) {
      return {...s, recommended: true}
    } else {
      return {...s}
    }
  })
  return (
    <div className="card-style py-3 px-4 mb-3">
      <h6 className="mb-12px font-weight-bold">Lịch học dự kiến</h6>
      <ScheduleList schedule={updatedSchedule} />
    </div>
  )
}

StudentScheduleCard.propTypes = {

}

export default StudentScheduleCard

