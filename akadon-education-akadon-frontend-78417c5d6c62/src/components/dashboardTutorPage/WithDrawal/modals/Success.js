import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CurrencyFormat from "../../../utils/CurrencyFormat";
import Img from "../../../../assets/images/withdrawal-success.jpg";

function Success({ amount, bank, setModal }) {
  const bank_name = bank.bank;
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
      <h4 className="mb-2 text-center text-bold1">
        Yêu cầu rút tiền thành công
      </h4>
      <p className="text-center">
        Yêu cầu rút tiền của bạn đã được duyệt. Số tiền{" "}
        <span className="text-hightlight1 text-bold2"><CurrencyFormat value={amount} amountOnly={true} /></span> đã được chuyển vào
        tài khoản {bank_name}. Bạn vui lòng kiểm
        tra tài khoản!
      </p>
    </>
  );
}

Success.propTypes = {};

export default Success;
