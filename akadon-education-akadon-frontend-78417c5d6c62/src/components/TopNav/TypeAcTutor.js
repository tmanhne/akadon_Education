import moment from "moment";
import React, { useState } from "react";
import { connect } from "react-redux";

import { UncontrolledTooltip } from "reactstrap";
import { getlimit } from "../../api";
import useFetch from "../../components/customHooks/useFetch";

import { useTranslation } from "react-i18next";
import limitpic from "../../assets/icons/user-standard-icon-1.svg";
import pro from "../../assets/icons/user-pro-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TypeAcTutor = ({ priority }) => {
  const [loading, setLoading] = useState([]);
  // // pick date and perpe for plan tutor Folw in per month
  // const nowDate = moment().get("date");
  // const nowMonth = moment().get("month");
  // const nowYears = moment().get("year");
  // const max = moment([nowYears, 0, 31]).add(nowMonth, "month");
  // const date = moment(max._d).get("date");

  const { t } = useTranslation(["home-page", "common", "upgrade"]);

  const limit = useFetch(getlimit, setLoading, false) || {};

  // GET API DATE START UPGRADE AND ADD 30 DAYS THEN RETURN DAYS REMAIN

  const today = moment();
  const expireDay = moment(limit.expired_datetime);
  const milisecondremaind = expireDay.diff(today, "days");
  const dateshow = milisecondremaind > 0 ? milisecondremaind : 0;

  return (
    <>
      <div className="limit pl-2 pr-2 flex-box">
        <div id="day-left" className="flex-box" style={{ color: "#828282" }}>
          {priority === 0 ? (
            ""
          ) : priority === 1 ? (
            <img src={limitpic} alt="limit" />
          ) : (
            <img src={pro} alt="limit" />
          )}
          <p style={{ color: "black" }} className="text-capitalize">
            {priority === 0
              ? t("upgrade:kind-bs")
              : priority === 1
              ? t("upgrade:kind-std")
              : t("upgrade:kind-pro")}
          </p>
          {priority > 0 && (
            <>
              {dateshow} {t("common:day")}
            </>
          )}
        </div>

        <div className="flex-box">
          <UncontrolledTooltip
            innerClassName="border-radius-2 bg-hightlight-1 text-justify p-3"
            popperClassName="navbar-tooltip"
            placement="bottom"
            hideArrow
            target="day-left"
            style={{ fontFamily: "Montserrat" }}
          >
            {t("home-page:banner-tooltip-3")}
          </UncontrolledTooltip>
        </div>

        <div className="flex-box" id="student-left">
          <p>{limit.student_count}</p> {t("common:student")}
          <UncontrolledTooltip
            innerClassName="border-radius-2 bg-hightlight-1 text-justify p-3"
            popperClassName="navbar-tooltip"
            placement="bottom"
            hideArrow
            target="student-left"
            style={{ fontFamily: "Montserrat" }}
          >
            {t("home-page:banner-tooltip-1")}
          </UncontrolledTooltip>
        </div>

        <div className="flex-box" id="req-left">
          {priority >= 2 ? (
            <p>
              <FontAwesomeIcon icon={["fas", "infinity"]} />
            </p>
          ) : (
            <p>{limit.bid_count}</p>
          )}
          {t("common:request")}
          <UncontrolledTooltip
            innerClassName="border-radius-2 bg-hightlight-1 text-justify p-3"
            popperClassName="navbar-tooltip"
            placement="bottom"
            hideArrow
            target="req-left"
            style={{ fontFamily: "Montserrat" }}
          >
            {t("home-page:banner-tooltip-2")}
          </UncontrolledTooltip>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  const { name, profile_complete } = user.info;
  const { priority } = user.info;
  return { name, profile_complete, priority };
};

export default connect(mapStateToProps, null)(TypeAcTutor);
