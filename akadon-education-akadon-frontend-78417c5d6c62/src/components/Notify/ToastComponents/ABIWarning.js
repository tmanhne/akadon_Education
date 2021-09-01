import React from "react";
import PropTypes from "prop-types";

import Img from "../../../assets/images/hbi-warning.png";
import Img1 from "../../../assets/images/hbi-warning-1.png";
import ToastContent from "../../utils/ToastContent";

function ABIWarning({t}) {
  const imgStyle = {
    margin: "-17px 0 -17px -35px"
  }
  const iconStyle = {
    top: "60px",
    right: "-17px"
  }
  const Image = <img style={imgStyle} src={Img} width={170} alt="hbi warning ..." />;
  const Content = (
    <div className="position-relative">
      <h4 className="font-weight-bold mb-4 text-left">Warning!</h4>
      <p className="text-left">{t("notify:hbi_warning")}</p>
      <img style={iconStyle} className="position-absolute" src={Img1} alt="hbi warning ..." />
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

ABIWarning.propTypes = {};

export default ABIWarning;
