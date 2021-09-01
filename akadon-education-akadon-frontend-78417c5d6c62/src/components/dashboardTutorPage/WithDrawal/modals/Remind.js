import React from "react";
import PropTypes from "prop-types";

import Img from "../../../../assets/images/withdrawal-remind.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Remind({ setModal, handlePayout }) {
  return (
    <>
      <div className="text-right text-grey">
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={["fal", "times"]}
        />
      </div>
      <div className="text-center mb-12px">
        <img src={Img} width={216} alt="withdrawal" />
      </div>
      <h4 className="mb-4 text-center text-bold1">
        Bạn có chắc muốn rút tiền không?
      </h4>
      <div className="center-box">
        <button
          onClick={() => setModal(false)}
          className="cancel-btn px-4 mr-3"
        >
          Không
        </button>
        <button onClick={handlePayout} className="main-btn px-4">
          Có
        </button>
      </div>
    </>
  );
}

Remind.propTypes = { setModal: PropTypes.func, handlePayout: PropTypes.func };

export default Remind;
