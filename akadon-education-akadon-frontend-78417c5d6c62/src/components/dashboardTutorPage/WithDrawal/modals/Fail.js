import React from "react";
import PropTypes from "prop-types";

import Img from "../../../../assets/images/withdrawal-fail.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Fail({ setModal }) {
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
      <h4 className="mb-2 text-center text-bold1">Yêu cầu rút tiền thất bại</h4>
      <p className="text-center">
        Yêu cầu rút tiền của bạn chưa được duyệt. Vui lòng kiểm tra lại số dư
        tài khoản thực tế của bạn.
      </p>
    </>
  );
}

Fail.propTypes = { setModal: PropTypes.func };

export default Fail;
