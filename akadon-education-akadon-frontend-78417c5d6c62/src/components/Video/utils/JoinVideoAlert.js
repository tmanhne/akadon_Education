import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function JoinVideoAlert({ setModal, modal, startDate, t }) {
  return (
    <>
      <div className="text-right">
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="text-grey h5 mb-0"
          onClick={() => setModal({...modal, joinVideoAlert:false})}
        />
      </div>
      <p className="text-center px-5">
        {t("video:start_at")}
        <strong> {startDate.format("HH:mm - DD/MM/YYYY")} </strong>
        {t("video:join_later")}
      </p>
    </>
  );
}

JoinVideoAlert.propTypes = {
  setModal: PropTypes.func,
  startDate: PropTypes.object,
  modal: PropTypes.object
};

export default JoinVideoAlert;
