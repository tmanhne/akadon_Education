import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PropTypes from "prop-types";

import CurrencyFormat from "./CurrencyFormat";

 function FeeBox({ fee, bidFee }) {
  if (fee > bidFee) {
    return (
      <div className="text-hightlight3">
        <CurrencyFormat value={bidFee} />
        
        <FontAwesomeIcon className="mb-1 mx-1" icon={["fas", "caret-down"]} />
      </div>
    );
  }
  if (fee < bidFee) {
    return (
      <div className="text-danger">
        <CurrencyFormat value={bidFee} />
        
        <FontAwesomeIcon className="mb-1 mx-1" icon={["fas", "caret-up"]} />
      </div>
    );
  }
  return (
    <div>
      <CurrencyFormat value={bidFee} />
      
    </div>
  );
}

FeeBox.propTypes = {
  fee: PropTypes.number,
  bidFee: PropTypes.number
}

export default FeeBox;