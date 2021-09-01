import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import CurrencyFormat from "../../../utils/CurrencyFormat";

const PreAcceptFeeBox = ({ fee, bid_fee }) => {
  if (fee < bid_fee) {
    return (
      <td className="text-danger">
        <CurrencyFormat value={fee} />
        <FontAwesomeIcon
          className="ml-1 mb-1"
          icon={["fas", "caret-up"]}
        />
      </td>
    );
  }

  if (fee > bid_fee) {
    return (
      <td className="text-hightlight3">
        <CurrencyFormat value={bid_fee} />
        <FontAwesomeIcon
          className="ml-1 mb-1"
          icon={["fas", "caret-down"]}
        />
      </td>
    );
  }

  return (
    <td className="text-dark">
      <CurrencyFormat value={bid_fee} />
    </td>
  );
};

export default PreAcceptFeeBox;
