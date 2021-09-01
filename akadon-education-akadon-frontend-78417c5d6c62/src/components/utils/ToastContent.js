import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToastContent({ Image, Content }) {
  return (
    <div className="toast-content card-style border-radius-3 positoin-relative">
      <div className="close-btn position-absolute text-grey text-right mr-3">
        <FontAwesomeIcon icon={["fas", "times"]} />
      </div>
      <div className="flex-box">
        {Image}{Content}
      </div>
    </div>
  );
}

ToastContent.propTypes = {
  Image: PropTypes.object,
  Content: PropTypes.object,
};

export default ToastContent;
