import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import {useTranslation} from "react-i18next";

import { getRequestDetail, reOpenContract } from "../../../api";
import Goback from "../../utils/Goback";
import SubjectImage from "../../utils/SubjectImage";
import FormatTimestamp from "../../utils/FormatTimestamp";
import CurrencyFormat from "../../utils/CurrencyFormat";
import ScheduleList from "../../utils/ScheduleList";
import TimeLength from "../../utils/TimeLength";

export default function CloseRequestDetail({ match }) {
  // EXTRACT PROPS
  const { requestId } = match.params;

  // INIT LOCAL STATES
  const [request, setRequest] = useState({});
  const history = useHistory();
  const {t} = useTranslation(["common","toast", "request-page"]);

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const res = await getRequestDetail(requestId);
      if (res.status < 400) {
        setRequest({ ...res.data });
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    })();
  }, [requestId]);

  // FUNCTION DELARATIONS
  async function handleOpenContract() {
    const payload = { contract_id: request.id };
    const res = await reOpenContract(payload);
    if (res.status < 400) {
      history.push("/dashboard/request?status=open-request");
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`, { autoClose: false });
    }
  }

  return (
    <>
      <Goback />
      <div className="card-style border-radius-2 py-3 px-4 mb-4">
        <h4 className="font-weight-bold mb-3">{t("request-page:request_detail")}</h4>
        <div className="flex-box align-items-start">
          <div className="mr-4">
            <SubjectImage
              subject={request.subject_name}
              width={109}
              height={109}
            />
          </div>
          <div className="flex-grow">
            <div className="flex-box align-items-start mb-3">
              <div className="w-50">
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("created-date")}</span>
                  <span className="text-bold2 text-dark">
                    <FormatTimestamp timestamp={request.created_datetime} />
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("subject-name")}</span>
                  <span className="text-bold2 text-dark">
                    {request.subject_name}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("level")}</span>
                  <span className="text-bold2 text-dark">
                    {request.subject_level}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("course-length")}</span>
                  <span className="text-bold2 text-dark">
                  <TimeLength length={request.lesson_time_length} />
                  </span>
                </div>
                <div className="text-grey">{t("schedule")}</div>
              </div>
              <div className="w-50">
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("is-offline")}</span>
                  <span className="text-bold2 text-hightlight3">
                    {request.offline_flag ? "Offline" : "Online"}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-grey mr-12px">{t("budget")}</span>
                  <span className="text-bold2 text-hightlight">
                    <CurrencyFormat value={request.fee} />
                  </span>
                </div>
                {request.offline_flag && (
                  <>
                    <div className="mb-3">
                      <span className="text-grey mr-12px">{t("city")}</span>
                      <span className="text-bold2 text-dark">
                        {request.city}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="text-grey mr-12px">{t("district")}</span>
                      <span className="text-bold2 text-dark">
                        {request.district}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mb-3">
              <ScheduleList schedule={request.schedule} />
            </div>
            <div className="mb-3">
              <p className="mb-2 text-grey">{t("student-info")}</p>
              <p className="mb-0 text-dark">{request.student_info}</p>
            </div>
            <div className="mb-3">
              <p className="mb-2 text-grey">
              {t("student-propose")}
              </p>
              <p className="mb-0 text-dark">{request.student_propose}</p>
            </div>
            <div className="center-box my-4">
              {/* <div onClick={handleOpenContract} style={{ width: "15rem" }} className="main-btn shadow-btn-hover">
                Mở lại yêu cầu
              </div> */}
              <Link
                className="main-btn px-5"
                to={`/dashboard/request/request-form?status=reopen&id=${request.id}`}
              >
               {t("request-page:reopen_request")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
