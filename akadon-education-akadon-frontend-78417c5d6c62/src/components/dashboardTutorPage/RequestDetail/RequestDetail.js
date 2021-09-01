import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "reactstrap";

import "./index.scss";
import { getBidDetail } from "../../../api";
import CurrencyFormat from "../../utils/CurrencyFormat";
import Goback from "../../utils/Goback";
import StudentBox from "./StudentBox";
import StepRequest from "../../utils/StepRequest";
import SubLoader from "../../utils/SubLoader";
import { useTranslation } from "react-i18next";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";
import TimeLength from "../../utils/TimeLength";

const RequestDetail = ({ match }) => {
  // EXTRACT PROPS
  const { requestId, bidId } = match.params;
  const { t } = useTranslation(["common", "request-detail", "toast"]);

  // INIT LOCAL STATES
  const initRequest = {
    request_header: "",
    fee: 0,
    subject_name: "",
    subject_level: "",
    lesson_time_length: 0,
    number_lesson: "",
    offline_flag: true,
    schedule: [],
    city: "",
    district: "",
    student_propose: "",
    student: {},
    contract: {},
  };

  // LOCAL STATE DECLARATIONS
  const [request, setRequest] = useState(initRequest);
  const [loading, setLoading] = useState(true);

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const res = await getBidDetail(bidId);
      setLoading(false);
      if (res.status < 400) {
        setRequest(res.data);
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    })();
  }, [bidId]);

  return (
    <>
      <div className="mb-3">
        <StepRequest step={4} />
      </div>
      <Goback />
      {loading ? (
        <SubLoader />
      ) : (
        <>
          <Card className="card-style border-radius-2 py-3 px-4 mb-3">
            <div className="flex-box mb-4">
              <h4 className="text-dark text-bold2 flex-grow">
                {t("request-detail:title-1")}
              </h4>
              <div className="cancel-btn btn">
                <FontAwesomeIcon className="mr-2" icon={["fas", "times"]} />
                <span>{t("common:cancle-teach-request")}</span>
              </div>
            </div>
            <div className="flex-box align-items-start">
              <div className="w-50">
                <div className="mb-12px">
                  <span className="text-grey mr-1">
                    {t("common:request-header")}
                  </span>
                  <span className="text-bold1">
                    {request.contract.request_header}
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">
                    {t("common:subject-name")}
                  </span>
                  <span className="text-bold1">
                    <Subject subject={request.contract.subject_name} />
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">{t("common:level")}</span>
                  <span className="text-bold1">
                    <Level level={request.contract.subject_level} />
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">
                    {t("common:is-offline")}
                  </span>
                  <span className="text-bold1 text-hightlight3">
                    {request.offline_flag
                      ? t("common:offline")
                      : t("common:online")}
                  </span>
                </div>
              </div>
              <div className="w-50">
                <div className="mb-12px">
                  <span className="text-grey mr-1">{t("common:fee")}</span>
                  <span className="text-bold1 text-hightlight">
                    <CurrencyFormat value={request.fee} />
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">
                    {t("common:course-length")}
                  </span>
                  <span className="text-bold1">
                    {request.number_lesson} {t("common:lesson")}
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">
                    {t("common:lesson-length")}
                  </span>
                  <span className="text-bold1">
                    : <TimeLength length={request.lesson_time_length} />
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-12px">
              <p className="text-grey mb-2">{t("common:schedule")}</p>
              <div>schedule</div>
            </div>
            {request.offline_flag && (
              <>
                <div className="mb-12px">
                  <span className="text-grey mr-1">{t("common:city")}</span>
                  <span className="text-bold1">{request.contract.city}</span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-1">{t("common:district")}</span>
                  <span className="text-bold1">
                    {request.contract.district}
                  </span>
                </div>
              </>
            )}
            <div className="mb-12px">
              <span className="text-grey mb-2">{t("common:student-info")}</span>
              <p className="text-bold1 mb-0">{request.student_info}</p>
            </div>
            <div className="mb-12px">
              <span className="text-grey mb-2">
                {t("common:student-propose")}
              </span>
              <p className="text-bold1 mb-0">
                {request.contract.student_propose}
              </p>
            </div>
          </Card>
          <StudentBox student={request.student} />
        </>
      )}
    </>
  );
};

export default RequestDetail;
