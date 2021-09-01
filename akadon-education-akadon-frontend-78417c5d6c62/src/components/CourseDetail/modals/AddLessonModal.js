import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";

import { addLessons } from "../../../api";
import DateClickModal from "../../utils/DateClickModal";
import { useTranslation } from "react-i18next";

function AddLessonModal({
  modal,
  setModal,
  schedule,
  contract_id,
  setAddLessonSuccessModal,
}) {
  const { t } = useTranslation(["toast", "course-detail"]);

  const [dateClickModal, setDateClickModal] = useState("");
  const [date, setDate] = useState(schedule);

  // FULLCALENDAR CONFIG
  const calendarHeader = {
    start: "",
    center: "",
    end: "title,prev,next",
  };

  const initDate = schedule[0]
    ? moment(schedule[0].date, "DD/MM/YYYY").format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const events = date.map((s) => ({
    ...s,
    date: moment(s.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
  }));

  // FUNCTION DECLARATIONS
  function eventContent(evt) {
    // EXPTRACT PROPS
    const { event } = evt;
    let { start_time, end_time } = event._def.extendedProps;

    // Format time to hh:mm
    if (start_time) {
      start_time = start_time && start_time.slice(0, 5);
    }

    if (end_time) {
      end_time = end_time && end_time.slice(0, 5);
    }

    let dateOfMonth = event.start.getDate();

    return (
      <div
        style={{ background: "transparent" }}
        className="h-100 center-box flex-column"
      >
        <h6 className="mb-0 text-bold text-center">{dateOfMonth}</h6>
        <div
          style={{ color: "#C5C6D1" }}
          className="flex-box text-light justify-content-center flex-wrap text-small text-center mb-0"
        >
          <span>{start_time}</span>
          <span className="px-1"> - </span>
          <span>{end_time}</span>
        </div>
      </div>
    );
  }

  function handleDateClick(e) {
    const clickedDate = moment(e.dateStr);

    // 2. Check date is in the past
    const today = moment();
    if (clickedDate.diff(today, "days") < 0) {
      toast.error(`${t("toast:er_4")}`);
      return;
    }

    setDateClickModal(e.dateStr);
  }

  async function handleAddLessons(e) {
    e.preventDefault();
    // 1. Check whether schedule change
    const scheduleStr = JSON.stringify(schedule);
    const dateStr = JSON.stringify(date);
    if (scheduleStr === dateStr) {
      toast.error(`${t("toast:er_5")}`);
      return;
    }

    // 2. Remove date in the past out of schedule
    const validSchedule = [];
    date.map((s) => {
      const currentDate = moment();
      const scheduleDate = moment(s.date, "DD/MM/YYYY");
      if (scheduleDate.diff(currentDate, "hours") > 0) {
        validSchedule.push({ ...s, date: s.date });
      }
    });

    // 3. Call api
    const payload = {
      contract_id,
      schedule: validSchedule,
    };
    const res = await addLessons(payload);
    if (res.status < 400) {
      setAddLessonSuccessModal(true);
      setModal(false);
    } else if (res.response) {
      toast.error(`${t("toast:er_3")} ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box pt-12px pb-12px mb-3 border-bottom">
        <h5 className="text-bold2 text-center flex-grow">{t("course-detail:title_3")}</h5>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="h4 text-grey mb-0 mr-4"
          onClick={() => setModal(!modal)}
        />
      </div>

      <p className="mb-12px px-5">
        <strong>{t("course-detail:title_4")}</strong>{" "}
        <span className="text-grey">{t("course-detail:title_8")}</span>
      </p>

      <div className="date-click-calendar mb-4 px-5">
        <FullCalendar
          headerToolbar={calendarHeader}
          timeZone="UTC"
          titleFormat={{ year: "numeric", month: "numeric" }}
          height={500}
          plugins={[interactionPlugin, dayGridPlugin]}
          selectable={true}
          locale="en"
          initialDate={initDate}
          dateClick={(e) => {
            handleDateClick(e);
          }}
          events={events}
          eventContent={eventContent}
        />
      </div>

      <div className="center-box px-5 mb-4">
        <button
          onClick={() => setModal(!modal)}
          className="cancel-btn px-5 mr-12px"
        >
         {t("course-detail:title_7")}
        </button>
        <button onClick={handleAddLessons} className="main-btn px-5">
        {t("course-detail:title_6")}
        </button>
      </div>

      <Modal
        contentClassName="card-style"
        centered={true}
        isOpen={dateClickModal ? true : false}
      >
        <DateClickModal
          modal={dateClickModal}
          setModal={setDateClickModal}
          date={date}
          setDate={setDate}
          lessons={[]}
        />
      </Modal>
    </>
  );
}

AddLessonModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  schedule: PropTypes.array,
};

export default AddLessonModal;
