import React from "react";
import { Card, Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useTranslation } from "react-i18next";

const CalendarModal = ({modal, toggleModal}) => {
  const { t } = useTranslation("request-form");
  const fakeData = [
    {
      date: "2020-10-01",
      status: "start"
    },
    {
      date: "2020-10-03",
      status: "done"
    },
    {
      date: "2020-10-15",
      status: "next"
    }
  ]
  const eventContent = ({event}) => {
    const {status} = event._def.extendedProps;
    return <div className={`status-icon ${status === "start" ? "start" : status === "done" ? "done" : "next"}`}></div>
  }
  return <Modal className="calendar-modal border-radius-3" isOpen={modal}>
    <Card className="card-style border-0 p-0">
      <div className='flex-box border-bottom py-3 mb-3'>
        <div className="flex-grow h5 mb-0 text-center">Lịch học</div>
        <FontAwesomeIcon onClick={toggleModal} className="text-grey mr-3" icon={["fal", "times"]} />
      </div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale="en"
        headerToolbar={{left: 'title',
        center: '',
        right: 'prev,next'}}
        events={[...fakeData]}
        eventContent={eventContent}
      />
      <div className="flex-box justify-content-around pb-4">
        <div className="flex-box">
          <span className="mr-2 status-icon start">.</span>
          <span className="text-grey text-small">
          Ngày bắt đầu
          </span>
        </div>
        <div className="flex-box">
          <span className="mr-2 status-icon done">.</span>
          <span className="text-grey text-small">
          Ngày đã học
          </span>
        </div>
        <div className="flex-box">
          <span className="mr-2 status-icon next"></span>
          <span className="text-grey text-small">
          Ngày học tiếp theo
          </span>
        </div>
      </div>
    </Card>
  </Modal>;
};

export default CalendarModal;
