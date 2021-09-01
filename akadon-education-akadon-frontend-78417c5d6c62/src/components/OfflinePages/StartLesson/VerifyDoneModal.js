import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VerifyDoneModal({ setModal, closeLesson }) {
  return (
    <>
      <div className="flex-box p-3 mb-3 border-bottom">
        <h5 className="mb-0 text-bold2 text-center flex-grow">
          Xác nhận kết thúc buổi học
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={["fas", "times"]}
          className="h5 mb-0 text-grey"
        />
      </div>
      <p className="text-center">
        Bạn có chắc chắn đã hoàn thành buổi học này không?
      </p>

      <div
        onClick={() => setModal(false)}
        className="view-detail main-btn bg-light text-hightlight1 mb-3 py-0"
      >
        Chưa hoàn thành
      </div>
      <div onClick={closeLesson} className="main-btn py-0">
        Hoàn thành buổi học
      </div>
    </>
  );
}

VerifyDoneModal.propTypes = { setModal: PropTypes.func };

export default VerifyDoneModal;
