import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../../assets/images/cancelled.svg";

function Cancel({ setModal, handleStartCourse }) {
  return (
    <>
      <div className="text-right border-bottom p-3 mb-3">
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
        />
      </div>
      <div className="text-center">
        <img src={Img} alt="cancle course" />
      </div>
      <p className="mb-3 text-center">
        Bạn có chắc chắn muốn hủy chấp nhận E-contract này?
      </p>
      <div className="center-box mb-5">
        <button
          onClick={() => setModal(false)}
          className={`cancel-btn px-4 mr-3`}
        >
          Không
        </button>
        <button
          onClick={() => handleStartCourse(0)}
          className={`main-btn px-4 ml-3`}
        >
          Có
        </button>
      </div>
    </>
  );
}

Cancel.propTypes = { setModal: PropTypes.func, cancelBid: PropTypes.func };

export default Cancel;
