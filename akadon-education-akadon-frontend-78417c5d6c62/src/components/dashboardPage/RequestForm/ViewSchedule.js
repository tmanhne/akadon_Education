import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { DateClickCalendar } from "../../utils";

function ViewSchedule({ date, setDate, setModal }) {
  const { t } = useTranslation("request-form");
  return (
    <div className="card-style p-0">
      <div className="flex-box p-3 mb-3 border-bottom">
        <h5 className="text-dark flex-grow text-bold2 mb-0 text-center">
          {t("schedule")}
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          className="text-grey"
          icon={["fas", "times"]}
        />
      </div>
      <p className="text-small text-grey font-italic mb-3 px-3">
      {t("schedule_note")}
      </p>
      <div className="position-relative px-3 pb-5">
        <div className="absolute-mask position-absolute"></div>
        <DateClickCalendar date={date} setDate={setDate} />
      </div>
    </div>
  );
}

ViewSchedule.propTypes = {};

export default ViewSchedule;
