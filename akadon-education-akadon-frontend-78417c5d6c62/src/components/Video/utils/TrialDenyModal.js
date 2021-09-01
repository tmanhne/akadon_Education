import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
import { trialDateDecide } from "../../../api";

function TrialDenyModal({ setModal, match, t }) {
  const { courseId, lessonNo } = match.params;
  const [loading, setLoading] = useState(false);

  async function handleDeny() {
    const payload = {
      contract_id: courseId,
      lesson_id: lessonNo,
      decide: 0,
    };

    setLoading(true);
    const res = await trialDateDecide(payload);
    setLoading(false);

    if (res.status < 400) {
      window.location.reload();
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }
  return (
    <>
      <div className="flex-box text-bold2 mb-3 p-3 border-bottom">
        <h5 className="mb-0 flex-grow text-center">{t("video:break_lesson")}</h5>
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
          onClick={() => setModal(false)}
        />
      </div>

      <p className="text-center py-4 mb-0">
        {t("video:reopen_1")} <br></br> {t("video:reopen_2")}
      </p>

      <div className="flex-box justify-content-around mb-5 px-5">
        <button
          disabled={loading}
          onClick={() => setModal(false)}
          className={`main-btn cancel-btn text-bold2 w-50 mr-3 ${
            loading && "disable-overlay boder-rd-100"
          }`}
        >
          {t("video:cancel")}
        </button>
        <button
          disabled={loading}
          className={`main-btn submit-btn btn w-50 ${
            loading && "disable-overlay boder-rd-100"
          }`}
          onClick={handleDeny}
        >
          {t("video:confirm")}
        </button>
      </div>
    </>
  );
}

TrialDenyModal.propTypes = {
  setModal: PropTypes.func,
  match: PropTypes.object,
};

export default TrialDenyModal;
