import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoCameraModal({ setModal, modal, joinCall, t }) {
  function handleNext() {
    joinCall();
    setModal({ ...modal, noCamera: false });
  }
  return (
    <>
      <div className="text-right mb-3">
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="h4 mb-0 text-grey"
          onClick={() => setModal({ ...modal, noCamera: false })}
        />
      </div>

      <p className="text-center px-4 mb-4">
        {t("video:no_cam_1")} <br></br>
        {t("video:no_cam_2")}
      </p>

      <div className="center-box">
        <div onClick={handleNext} className="main-btn mr-3 w-25">
          {t("video:continue")}
        </div>
        <div
          onClick={() => setModal({ ...modal, noCamera: false })}
          className="cancel-btn w-25"
        >
          {t("video:cancel")}
        </div>
      </div>
    </>
  );
}

NoCameraModal.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
  joinCall: PropTypes.func,
};

export default NoCameraModal;
