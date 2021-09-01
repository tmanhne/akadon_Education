import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { getBidDetail, getRequestDetail } from "../../../api";
import Request from "../../dashboardPage/ContractDetail/Request";
import CurrencyFormat from "../../utils/CurrencyFormat";
import Goback from "../../utils/Goback";
import "./index.scss";
import UserBoxTutor from "./UserBoxtutor";
import StepRequest from "../../utils/StepRequest";
import SubLoader from "../../utils/SubLoader";
import { useTranslation } from "react-i18next";
import Cancelled from "./Cancelled/Cancelled";
import TimeLength from "../../utils/TimeLength";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";

const OpenRequestDetail = ({ match, tutorData, userType }) => {
  // EXTRACT PROPS
  const { requestId } = match.params;
  const { bidId } = match.params;
  const { t } = useTranslation(["common", "econtract-detail", "toast"]);

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
  };

  // LOCAL STATE DECLARATIONS
  const [request, setRequest] = useState(initRequest);
  const [bid_id, setBid_id] = useState(initRequest);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [cancle, setCancle] = useState(false);

  async function fetchRequestDetail() {
    const res = await getRequestDetail(requestId);
    setLoading(false);
    if (res.status < 400) {
      setRequest(res.data);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  async function fetchBidDetail() {
    const res = await getBidDetail(bidId);
    setLoading(false);
    if (res.status < 400) {
      setBid_id(res.data);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  // SIDE EFFECTS
  // callapi getRequestDetail+getBidDetail
  useEffect(() => {
    fetchRequestDetail();
  }, [requestId]);

  useEffect(() => {
    fetchBidDetail();
  }, [bidId]);

  return (
    <>
      <div className="mb-3">
        <StepRequest step={3} />
      </div>
      <Goback />

      {loading ? (
        <SubLoader />
      ) : (
        <div className="new-width">
          <div className="contract-detail-1__contract card-style border-radius-2 mb-3 medias">
            <UserBoxTutor
              tutor={tutorData}
              student={request.student}
              statusRe={request.status}
            />
            <div className="flex-box justify-content-between">
              <div>
                <div className="mb-12px">
                  <span className="text-grey mr-2">
                    {t("common:subject-name")}:
                  </span>
                  <span className="text-dark text-bold2">
                    <Subject subject={bid_id.contract?.subject_name} />
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-2">{t("common:level")}:</span>
                  <span className="text-dark text-bold2">
                    <Level level={bid_id.contract?.subject_level} />
                  </span>
                </div>
              </div>
              <div className="main-btn d-inline-block px-4 mb-4 disable-overlay boder-rd-100">
                {t("econtract-detail:edit-btn")}
              </div>
            </div>
            <div className="flex-box">
              <div className="w-50">
                <div className="mb-12px text-nowrap">
                  <span className="text-grey mr-2">{t("common:fee")}</span>
                  <span className="text-hightlight3 text-bold2 mr-1">
                    <CurrencyFormat value={bid_id.fee} />
                  </span>
                  <FontAwesomeIcon
                    icon={["fas", "exclamation-circle"]}
                    className="text-hightlight mr-2"
                  />
                </div>
                <div className="mb-12px text-nowrap">
                  <span className="text-grey mr-2">
                    {t("common:course-length")}
                  </span>
                  <span className="text-dark text-bold2">
                    {bid_id.number_lesson}{" "}
                    <span className="ml-1">{t("common:lesson")}</span>
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-2">
                    {t("common:lesson-length")}:
                  </span>
                  <span className="text-dark text-bold2">
                    <TimeLength length={bid_id.lesson_time_length} />
                  </span>
                </div>
                <div className="mb-12px">
                  <span className="text-grey mr-2">
                    {t("common:is-offline")}:
                  </span>
                  <span className="text-hightlight3 text-bold2 mr-1">
                    {bid_id.offline_flag
                      ? t("econtract-detail:offline")
                      : t("econtract-detail:online")}
                  </span>
                </div>
              </div>
            </div>
            {bid_id.offline_flag && (
              <div className="flex-box mb-12px">
                <div className="w-50">
                  <span className="text-grey mr-2">{t("common:city")}</span>
                  <span className="text-dark text-bold2">
                    {bid_id.contract?.city}
                  </span>
                </div>
                <div className="w-50">
                  <span className="text-grey mr-2">{t("common:dist")}</span>
                  <span className="text-dark text-bold2">
                    {bid_id.contract?.district}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-box mb-12px">
              <div className="w-50">
                <span className="text-grey mr-2">{t("common:start-date")}</span>
                <span className="text-dark text-bold2">
                  {bid_id.start_date || "Not setting yet"}
                </span>
              </div>
              <div className="w-50">
                <span className="text-grey mr-2">{t("common:end-date")}</span>
                <span className="text-dark text-bold2">
                  {bid_id.end_date || "Not setting yet"}
                </span>
              </div>
            </div>

            <div className="mb-12px">
              <p className="text-grey mb-2">{t("common:teach-plan")}</p>
              <p
                className="mb-0 text-dark text-bold1"
                style={{ lineHeight: "1.75" }}
              >
                {bid_id.contract_plan}
              </p>
            </div>
            <div className="mb-12px">
              <p className="text-grey mb-2">{t("common:student-info")}</p>
              <p
                className="mb-0 text-dark text-bold1"
                style={{ lineHeight: "1.75" }}
              >
                {bid_id.contract?.student_info}
              </p>
            </div>
            <div className="mb-12px">
              <p className="text-grey mb-2">{t("common:student-propose")}</p>
              <p
                className="mb-0 text-dark text-bold1"
                style={{ lineHeight: "1.75" }}
              >
                {bid_id.contract?.student_propose}
              </p>
            </div>
            <div className="cta-box my-5 flex-box justify-content-around">
              <div
                className="cancel-btn font-weight-bold"
                onClick={() => setCancle(!cancle)}
              >
                <FontAwesomeIcon
                  className="font-weight-bold mr-3"
                  icon={["fas", "times"]}
                />
                {t("common:cancle-teach-request")}
              </div>
            </div>
          </div>
          {cancle && (
            <Cancelled
              cancle={cancle}
              setCancle={setCancle}
              request={requestId}
            />
          )}
          <div className="contract-detail-1__bid-contract card-style border-radius-2 mb-3 medias">
            <Request
              request={request}
              userType={userType}
              status={t("econtract-detail:status-1")}
            />
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = ({ user }) => {
  const tutorData = user.info;
  const { userType } = user.info;
  return { tutorData, userType };
};

export default connect(mapStateToProps, null)(OpenRequestDetail);
