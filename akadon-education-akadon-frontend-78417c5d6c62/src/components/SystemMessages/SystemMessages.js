import React, { useState } from "react";

import "./index.scss";
import { getSystemMessages, readAllSystemMessages } from "../../api";
import useFetchAndFilter from "../customHooks/useFetchAndFilter";
import SubLoader from "../utils/SubLoader";
import PaginationStyle1 from "../utils/Paginations/PaginationStyle1";

import CourseSchedule1 from "./CourseSchedule1";
import CourseSchedule2 from "./CourseSchedule2";
import LessonDone from "./LessonDone";
import PaymentSuccess from "./PaymentSuccess";
import RegistrationCode from "./RegistrationCode";
import RegistrationSuccess from "./RegistrationSuccess";
import ResetPasswordCode from "./ResetPasswordCode";
import ReviewLesson from "./ReviewLesson";
import StudentRequest from "./StudentRequest";
import TeachRequest1 from "./TeachRequest1";
import TeachRequest2 from "./TeachRequest2";
import TempAcceptRequest from "./TempAcceptRequest";
import TrialSchedule from "./TrialSchedule";
import UpgradeAccount from "./UpgradeAccount";
import VerifyEmail from "./VerifyEmail";
import EditCourse from "./EditCourse";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function SystemMessages() {
  const { t } = useTranslation(["toast","comming","topnav"]);
  const [loading, setLoading] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const messages =
    useFetchAndFilter(
      getSystemMessages,
      null,
      null,
      pageNo,
      setLoading,
      true
    ) || {};

  function renderMessage(message) {
    if (typeof message !== "object" || message === null) return;
    const key = message.text_type.split("-")[0];
    switch (key) {
      case "student_accept_reject_timeline":
        return <CourseSchedule1 key={message.id} msg={message} />;
      case "tutor_start_contract":
        return <CourseSchedule2 key={message.id} msg={message} />;
      case "confirm_complete_lesson":
        return <LessonDone key={message.id} msg={message} />;
      case "complete_payment":
        return <PaymentSuccess key={message.id} msg={message} />;
      case "registration_success":
        return <RegistrationSuccess key={message.id} msg={message} />;
      case "forgot_password":
        return <ResetPasswordCode key={message.id} msg={message} />;
      case "remind_review_lesson":
        return <ReviewLesson key={message.id} msg={message} />;
      case "notification_new_contract_student":
        return <StudentRequest key={message.id} msg={message} />;
      case "confirm_new_bid_to_student":
        return <TeachRequest1 key={message.id} msg={message} />;
      case "confirm_new_bid_to_tutor":
        return <TeachRequest2 key={message.id} msg={message} />;
      case "confirm_bid_decided":
        return <TempAcceptRequest key={message.id} msg={message} />;
      case "new_trial_study":
        return <TrialSchedule key={message.id} msg={message} />;
      case "confirm_upgrade_account_sent":
        return <UpgradeAccount key={message.id} msg={message} />;
      case "confirm_new_email":
        return <VerifyEmail key={message.id} msg={message} />;
      case "notification_new_changes_course":
        return <EditCourse key={message.id} msg={message} />;
      default:
        return <></>;
    }
  }

  async function handleReadAllMessages() {
    setLoading(true);
    const res = await readAllSystemMessages();
    setLoading(false);

    if (res.status < 400) {
      setPageNo(1);
      window.location.reload();
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.satatus} !`);
    }
  }

  if (loading && loading.length > 0) return <SubLoader />;
  const { results } = messages;

  return (
    <div className="system-messages card-style h-100 p-0 mb-3 border-radius-2">
      <div className="flex-box border-bottom p-3">
        <h4 className="font-weight-bold flex-grow mb-0">{t("comming:text_2")}</h4>
        <button
          onClick={handleReadAllMessages}
          className="read-all border-0 bg-light text-hightlight1"
        >
        {t("topnav:mark-read")}
        </button>
      </div>
      {results && results.map(renderMessage)}

      {messages.results && messages.count > 10 && (
        <div className="flex-box justify-content-end mb-4 p-3">
          <PaginationStyle1
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalCount={messages.count}
            itemsPerPage={10}
          />
        </div>
      )}
    </div>
  );
}

export default SystemMessages;
