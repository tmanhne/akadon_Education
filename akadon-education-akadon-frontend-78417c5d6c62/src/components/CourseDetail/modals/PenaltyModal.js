import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import CheckIcon from "../../../assets/icons/check-icon.svg";

function PenaltyModal({ setPenalty, setEditLesson, t }) {
  const data = [
    t("course-detail:penalty_1"),
    t("course-detail:penalty_2"),
    t("course-detail:penalty_3"),
    t("course-detail:penalty_4"),
  ];

  function handleEditLesson() {
    setEditLesson(true);
    setPenalty(false);
  }

  return (
    <>
      <div className="flex-box border-bottom mb-12px pt-12px pb-12px">
        <h5 className="mb-0 flex-grow text-center text-bold2">
          {t("course-detail:penalty_rule")}
        </h5>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="mr-3 h4 mb-0 text-grey"
          onClick={() => setPenalty(false)}
        />
      </div>

      <p className="text-center text-grey font-italic px-5 mx-3 mb-4">
      {t("course-detail:penalty_note")}
      </p>

      <div className="px-4">
        <div className="flex-box align-items-start mb-3">
          <img src={CheckIcon} alt="check icon" className="mr-2" />
          <p className="mb-0">
          {t("course-detail:note_1")}
          </p>
        </div>

        <div className="flex-box align-items-start mb-12px">
          <img src={CheckIcon} alt="check icon" className="mr-2" />
          <p className="mb-0">{t("course-detail:note_2")}</p>
        </div>

        {data.map((d, index) => (
          <div className="flex-box mb-12px pl-4" key={index}>
            <div
              className="rounded-circle bg-hightlight-1"
              style={{ width: "8px", height: "8px" }}
            ></div>
            <p className="mb-0 ml-2">{d}</p>
          </div>
        ))}

        <div className="center-box">
          <div
            onClick={handleEditLesson}
            className="main-btn mt-4 mb-3 px-5 py-2 d-inline-block bg-hightlight"
          >
            {t("course-detail:change_schedule")}
          </div>
        </div>
      </div>
    </>
  );
}

PenaltyModal.propTypes = { setPenalty: PropTypes.func };

export default PenaltyModal;
