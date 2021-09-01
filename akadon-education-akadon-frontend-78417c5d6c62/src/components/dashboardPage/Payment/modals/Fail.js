import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Img from "../../../../assets/images/paymenFail.png";

function Fail({setModal, t}) {
  return (
    <>
      <div className="text-right">
        <FontAwesomeIcon onClick={() => setModal(false)} icon={["fal", "times"]} className="text-grey mb-0 h4" />
      </div>

      <img src={Img} width={254} alt="Payment" className="mb-4 mx-auto" />

      <h5 className="font-weight-normal text-uppercase mb-12px text-center text-hightlight">{t("payment:payment_fail")}</h5>

      <p className="mx-5 text-center mb-5 text-grey">
        {t("payment:error_msg")}
      </p>
    </>
  )
}

Fail.propTypes = {
  setModal: PropTypes.func
}

export default Fail

