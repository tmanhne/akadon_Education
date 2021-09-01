import React, { useState, useEffect } from "react";
import { Card, Modal } from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { lessonFeedback } from "../../api";
import ReviewImg from "../../assets/images/lesson-review.png";
import FeedbackBox from "./FeedbackBox";
import { useTranslation } from "react-i18next";
import ReviewModal from "./modals/ReviewModal";
import Subloader from "../utils/SubLoader";

const ReviewCard = ({ userType, lessonId, courseId, student, tutor }) => {
  const { t } = useTranslation(["lesson-detail"]);
  const [loading, setLoading] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    const payload = { lesson_id: lessonId };

    setLoading([...loading, "lessonFeedback"]);
    const res = await lessonFeedback(payload);
    const updateLoading = loading.filter((ld) => ld !== "lessonFeedback");
    setLoading([...updateLoading]);

    if (res.status) {
      setFeedback([...res.data]);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  const tutorEmail = tutor.email;
  const tutorPhoneNumber = tutor.phone_number;
  const studentEmail = student.email;
  const studentPhoneNumber = student.phone_number;
  const tutorFeedback = feedback.find(
    (fb) =>
      fb.user.phone_number === tutorPhoneNumber || fb.user.email === tutorEmail
  );

  const studentFeedback = feedback.find(
    (fb) =>
      fb.user.phone_number === studentPhoneNumber ||
      fb.user.email === studentEmail
  );

  const FeedBackModal = () => (
    <div
      onClick={() => setReviewModal(!reviewModal)}
      className="flex-box flex-wrap justify-content-center pl-12px pt-12px mb-12px pr-12px"
    >
      <img className="mr-3" src={ReviewImg} alt="lesson review" />
      <p className="text-grey">{t("rate_2")}</p>
    </div>
  );
  if (loading && loading.length > 0) return <Subloader />;
  return (
    <>
      <Card className="card-style lesson-detail__review-card flex-grow p-0">
        <h6 className="text-bold2 mb-3 pt-12px pl-12px">{t("rate")}</h6>
        <div className="border-bottom">
          <FeedbackBox
            feedback={tutorFeedback}
            type="tutor"
            userType={userType}
            FeedBackModal={<FeedBackModal />}
            t={t}
          />
        </div>

        <FeedbackBox
          feedback={studentFeedback}
          type="student"
          userType={userType}
          FeedBackModal={<FeedBackModal />}
          t={t}
        />
      </Card>

      <Modal
        isOpen={reviewModal}
        className="review-modal"
        contentClassName="border-0 border-radius-3"
      >
        <ReviewModal
          modal={reviewModal}
          setModal={setReviewModal}
          student={student}
          tutor={tutor}
          lessonId={lessonId}
          courseId={courseId}
          userType={userType}
        />
      </Modal>
    </>
  );
};

ReviewCard.propTypes = {};

export default ReviewCard;
