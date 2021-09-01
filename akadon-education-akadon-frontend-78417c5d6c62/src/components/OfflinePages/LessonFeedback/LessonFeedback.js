import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

import "./index.scss";
import { Header } from "../utils";
import SubLoader from "../../utils/SubLoader";
import ReviewModal from "../../LessonDetail/modals/ReviewModal";
import useFetchObject from "../../customHooks/useFetchObject";
import { getLessonWithQRCode, feedbackLessonWithQRCode } from "../../../api";

export default function LessonFeedback({ match }) {
  const { t } = useTranslation("toast");
  const { token } = match.params;
  const [pageLoading, setPageLoading] = useState(false);
  const [lesson, loading] = useFetchObject(getLessonWithQRCode, token);
  const history = useHistory();

  // FUCNTION DECLARATION
  async function addFeedback(payload) {
    setPageLoading(true);
    const res = await feedbackLessonWithQRCode(token, payload);
    setPageLoading(false);

    if (res.status < 400) {
      toast.success("Gửi đánh giá thành công !");
      history.push("/tutor");
      return;
    }

    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`, {
        autoClose: false,
      });
      return;
    }
  }

  if ((loading && loading.length > 0) || pageLoading) return <SubLoader />;
  const student = (lesson && lesson.student) || {};
  const tutor = (lesson && lesson.tutor) || {};

  return (
    <div className="lesson-feedback mx-auto">
      <Header />
      <div className="review-modal">
        <ReviewModal
          lessonId={lesson && lesson.lesson_id}
          userType="tutor"
          student={student}
          tutor={tutor}
          addFeedback={addFeedback}
          customToken={true}
        />
      </div>
      <Link
        to="/tutor"
        className="view-detail main-btn bg-light text-hightlight1 d-block mb-5 mx-auto py-0"
      >
        Đánh giá sau
      </Link>
    </div>
  );
}
