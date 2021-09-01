import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import ToastContent from "../../utils/ToastContent";
import Img from "../../../assets/images/contract-change.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContractChange({user, arrStr, subject_name, userRootUrl, t}) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={155} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-2">
        E-contract <span className="text-dark text-bold2">{t("notify:lesson") + arrStr[4] + t("notify:course")}</span>
        <span className="text-dark text-bold"> {subject_name}</span> {t("notify:change_contract")}
      </p>
      <div className="mb-2 text-left">
        <span className="text-dark text-bold2">{subject_name}</span>
      </div>
      <div className="mb-3 text-left">
        <FontAwesomeIcon className="text-small text-grey" icon={["fas", "chalkboard-teacher"]} />
        <span className="text-small text-grey" >{t("notify:tutor")}: </span>
        <span className="text-dark text-bold2">{user.name}</span>
      </div>
      <Link
        to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}/${arrStr[3]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return (
    <ToastContent Image={Image} Content={Content} />
  )
}

ContractChange.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
  userRootUrl: PropTypes.string
}

export default ContractChange

