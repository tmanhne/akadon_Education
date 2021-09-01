import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editLessonsDecide } from "../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function EditLessonModal({ modal, setModal }) {
  const { t } = useTranslation(["toast","editlesson"]);
  const { contract_id, oldLesson, newLesson } = modal.payload;
  const [loading, setLoading] = useState(false);

  async function handleAddLessons(decide) {
    const payload = {
      lesson_id: contract_id,
      decide,
    };

    setLoading(true);
    const res = await editLessonsDecide(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("toast:sucess_37"));
      if (decide === 1) {
        setModal({ ...modal, isOpen: false });
      }
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box py-2 px-3 border-bottom mb-3">
        <h5 className="mb-0 flex-grow text-bold2 text-center">
        {t("editlesson:edit_1")}
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal({ ...modal, isOpen: false })}
          icon={["fal", "times"]}
          className="text-grey h4 m-0"
        />
      </div>

      <div className="px-3 py-4">
        <p>
          <strong> {t("editlesson:edit_2")}: </strong>
          {oldLesson.start_time} - {oldLesson.end_time},  {t("editlesson:edit_4")} {oldLesson.date}{" "}
        </p>
        <p>
          <strong> {t("editlesson:edit_3")}: </strong>
          {newLesson.start_time} - {newLesson.end_time},  {t("editlesson:edit_4")} {newLesson.date}{" "}
        </p>
      </div>

      <div className="center-box mb-4 px-3">
        <button
          disabled={loading}
          onClick={() => handleAddLessons(0)}
          className={`cancel-btn w-50 mr-3 ${
            loading && "disable-overlay border-rd-100"
          }`}
        > {t("editlesson:edit_5")}
        </button>
        <button
          disabled={loading}
          onClick={() => handleAddLessons(1)}
          className={`main-btn w-50 ${
            loading && "disable-overlay border-rd-100"
          }`}
        > {t("editlesson:edit_6")}
        </button>
      </div>
    </>
  );
}

EditLessonModal.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default EditLessonModal;
