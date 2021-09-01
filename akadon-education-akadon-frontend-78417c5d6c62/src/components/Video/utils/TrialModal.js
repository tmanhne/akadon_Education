import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { trialDateDecide } from "../../../api";

function TrialModal({ setModal, modal, match, userType, t }) {
  const { courseId, lessonNo } = match.params;
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    const payload = {
      contract_id: courseId,
      lesson_id: lessonNo,
      decide: 1,
    };

    setLoading(true);
    const res = await trialDateDecide(payload);
    setLoading(false);

    if (res.status < 400) {
      setModal({ ...modal, acceptTrial: true });
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box text-bold2 mb-3 p-3 border-bottom">
        <h5 className="mb-0 flex-grow text-center">
          {t("video:confirm_done_lesson")}
        </h5>
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
          onClick={() => setModal({ ...modal, confirmDoneTrial: false })}
        />
      </div>

      <p className="text-center py-4 mb-0">
        {t("video:text_done_1")}
        <br></br>
        {userType === "student"
          ? t("video:text_done_2")
          : t("video:text_done_3")}
        {t("video:text_done_4")}
      </p>

      <div className="flex-box justify-content-around mb-5 px-5">
        <button
          disabled={loading}
          onClick={() =>
            setModal({ ...modal, denyTrial: true, confirmDoneTrial: false })
          }
          className={`main-btn cancel-btn text-bold2 w-50 mr-3  ${
            loading && "disable-overlay boder-rd-100"
          }`}
        >
          {t("video:cancel_2")}
        </button>

        <button
          disabled={loading}
          onClick={handleAccept}
          className={`main-btn submit-btn btn w-50 ${
            loading && "disable-overlay boder-rd-100"
          }`}
        >
          {t("video:continue_1")}
        </button>
      </div>
    </>
  );
}

TrialModal.propTypes = {
  setModal: PropTypes.func,
  setTrialDenyModal: PropTypes.func,
  setTrialSuccessModal: PropTypes.func,
};

export default TrialModal;
