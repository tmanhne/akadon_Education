import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";

import DateClickModal from "./DateClickModal";
import { updateSchedule } from "../../../api";
import { useTranslation } from "react-i18next";

function EditLessonModal({
  setSuccessModal,
  setEditLesson,
  lesson,
  schedule,
  contract_id,
}) {
  const initLesson = {
    start_time: "",
    end_time: "",
    date: "",
  };

  const initDateClick = {
    date: "",
    isOpen: false,
  };

  // Remove lesson date out of schedule
  const initSchedule = schedule.filter(
    (s) =>
      moment(s.date, "DD/MM/YYYY").format("YYYY-MM-DD") !== lesson.lesson_date
  );

  // LOCAL STATE DECLARATIONS
  const [dateClickModal, setDateClickModal] = useState(initDateClick);
  const [editedLesson, setEditedLesson] = useState(initLesson);
  const [editedSchedule, setEditedSchedule] = useState(initSchedule);

  const { t } = useTranslation(["toast", "course-detail"]);

  // SIDE EFFECTS
  useEffect(() => {
    setEditedSchedule([
      ...initSchedule,
      { ...editedLesson, date: moment(editedLesson.date).format("DD/MM/YYYY") },
    ]);
  }, [editedLesson]);

  // IMPLEMENT LESSON DATA
  const { start_time, end_time, lesson_date } = lesson;
  const dateStr = moment(lesson_date).format("DD.MM.YYYY");
  const endTimeStr = end_time ? end_time.slice(0, 5) : "";
  const startTimeStr = start_time ? start_time.slice(0, 5) : "";

  // IMPLEMENT SCHEDULE DATA
  const events = editedSchedule.map((s) => ({
    ...s,
    date: moment(s.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
  }));

  // FULLCALENDAR CONFIG
  const calendarHeader = {
    start: "",
    center: "",
    end: "title,prev,next",
  };

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

    // 1. Check date is includes in schedule
    let isDateExisted = false;
    events.map((evt) => {
      if (evt.date === clickedDate.format("YYYY-MM-DD")) {
        isDateExisted = true;
      }
    });

    if (isDateExisted) {
      toast.error(t("toast:er_6"));
      return;
    }

    // 2. Check date is in the past
    const today = moment();
    if (clickedDate.diff(today, "days") < 0) {
      toast.error(t("toast:er_4"));
      return;
    }

    setDateClickModal({ date: clickedDate, isOpen: true });
  }

  function changeTime() {
    setDateClickModal({ date: moment(lesson_date), isOpen: true });
  }

  async function handleEditLesson() {
    // 1. Catch invalid data
    if (
      !editedLesson.start_time ||
      !editedLesson.end_time ||
      !editedLesson.date
    ) {
      toast.error(t("toast:er_5"));
      return;
    }

    // 2. Remove date in the past out of schedule
    const validSchedule = [];
    editedSchedule.map((s) => {
      const currentDate = moment();
      const scheduleDate = moment(s.date, "DD/MM/YYYY");
      if (scheduleDate.diff(currentDate, "hours") > 0) {
        validSchedule.push({ ...s, date: s.date });
      }
    });

    // 3. Call api
    const payload = {
      ...editedLesson,
      date: editedLesson.date.format("DD/MM/YYYY"),
      lesson_id: lesson.id,
    };
    const res = await updateSchedule(payload);
    if (res.status < 400) {
      window.location.reload();
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box border-bottom mb-3 pt-12px pb-12px">
        <h5 className="mb-0 flex-grow text-center text-bold2">
          {t("course-detail:edit_schedule")}
        </h5>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="mr-3 h4 mb-0 text-grey"
          onClick={() => setEditLesson(false)}
        />
      </div>

      <div className="px-4 mb-3">
        <span className="text-bold2 mr-3">
          {t("course-detail:current_lesson")}
        </span>
        <span>
          {startTimeStr} - {endTimeStr} / {dateStr}
        </span>
        <button onClick={changeTime} className="main-btn bg-hightlight ml-3">
          {t("course-detail:change_hour")}
        </button>
      </div>

      <p className="mb-12px px-4 text-bold2">
        {t("course-detail:select_new_date")}
      </p>

      <div className="date-click-calendar mb-4 px-4">
        <FullCalendar
          headerToolbar={calendarHeader}
          timeZone="UTC"
          titleFormat={{ year: "numeric", month: "numeric" }}
          height={500}
          plugins={[interactionPlugin, dayGridPlugin]}
          selectable={true}
          locale="en"
          initialDate={lesson.lesson_date}
          dateClick={(e) => {
            handleDateClick(e);
          }}
          events={events}
          eventContent={eventContent}
        />
      </div>

      <div className="center-box mb-5 px-4">
        <button
          onClick={() => setEditLesson(false)}
          className="cancel-btn w-25 mr-12px"
        >
          {t("course-detail:cancel")}
        </button>
        <button onClick={handleEditLesson} className="main-btn w-25">
          {t("course-detail:confirm")}
        </button>
      </div>

      <Modal
        isOpen={dateClickModal.isOpen}
        centered={true}
        className="set-date-modal"
        contentClassName="card-style"
      >
        <DateClickModal
          setEditedLesson={setEditedLesson}
          setDateClickModal={setDateClickModal}
          dateClickModal={dateClickModal}
        />
      </Modal>
    </>
  );
}

EditLessonModal.propTypes = { setEditSchedule: PropTypes.func };

export default EditLessonModal;
