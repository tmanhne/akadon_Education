import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import moment from "moment";

import { getActiveLesson } from "../../api";
import useFetch from "../customHooks/useFetch";
import DateClickModal from "./DateClickModal";
import { useTranslation, Trans } from "react-i18next";

const DateClickCalendar = ({
  date,
  setDate,
  startDate,
  endDate,
  trialDate,
}) => {
  const { t } = useTranslation("toast");
  // LOCAL STATE DECLARATIONS
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState([]);

  const lessons = useFetch(getActiveLesson, setLoading, false);

  // FUNCTIONS DECLARATIONS
  const calendarHeader = {
    start: "",
    center: "",
    end: "title,prev,next",
  };
  const dates = moment(startDate).format("DD/MM/YYYY");
  const datee = moment(startDate).format("DD/MM/YYYY");

  const handleDateClick = (e) => {
    // CHECK IS USER CLICK DATE OUT OF RANGE START - END DATE
    const startDateObj = new Date(startDate).getTime();
    const endDateObj = new Date(endDate).getTime();
    const clickedDateObj = new Date(e.date).getTime();

    if (startDateObj > clickedDateObj || endDateObj < clickedDateObj) {
      toast.error(
        <Trans
          i18nKey="toast:er_45"
          values={{ v1: dates, v2: datee }}
          components={{
            1: <span />,
          }}
        />
      );
      return;
    }

    if (trialDate) {
      const today = moment();
      const clickedDay = moment(e.date);
      if (today.diff(clickedDay, "hours") > 0) {
        toast.error(t("toast:er_46"));
        return;
      }
    }

    setModal(e.dateStr);
  };

  function eventContent(evt) {
    // EXPTRACT PROPS
    const { event } = evt;
    let { start_time, end_time, recommended } = event._def.extendedProps;

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
        className={`h-100 center-box flex-column  ${
          recommended && "recommended"
        }`}
      >
        <h6 className="mb-0 text-bold text-center">{dateOfMonth}</h6>
        <div
          style={{ color: "#C5C6D1" }}
          className="flex-box justify-content-center flex-wrap text-small text-center mb-0"
        >
          <span>{start_time}</span>
          <span className="px-1"> - </span>
          <span>{end_time}</span>
        </div>
      </div>
    );
  }

  const events = date.map((d) => ({
    date: moment(d.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
    recommended: d.recommended,
    start_time: d.start_time,
    end_time: d.end_time,
  }));

  return (
    <div className="date-click-calendar">
      <FullCalendar
        headerToolbar={calendarHeader}
        timeZone="UTC"
        titleFormat={{ year: "numeric", month: "numeric" }}
        height={500}
        plugins={[interactionPlugin, dayGridPlugin]}
        selectable={true}
        locale={t("language")}
        dateClick={(e) => {
          handleDateClick(e);
        }}
        events={events}
        eventContent={eventContent}
      />

      <Modal
        contentClassName="card-style"
        centered={true}
        isOpen={modal ? true : false}
      >
        <DateClickModal
          modal={modal}
          setModal={setModal}
          date={date}
          setDate={setDate}
          lessons={lessons}
        />
      </Modal>
    </div>
  );
};

DateClickCalendar.propTypes = {
  date: PropTypes.array,
  setDate: PropTypes.func,
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(DateClickCalendar);
