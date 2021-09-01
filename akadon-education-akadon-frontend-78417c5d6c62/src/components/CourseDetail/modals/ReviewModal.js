import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import InputRange from "react-input-range";

import "../index.scss";
import ReviewBg from "../../../assets/images/review-bg.png";
import Angry from "../../../assets/icons/angry.png";
import Sad from "../../../assets/icons/sad.png";
import Normal from "../../../assets/icons/normal.png";
import Good from "../../../assets/icons/good.png";
import Excellent from "../../../assets/icons/excellent.png";
import { reviewCourse } from "../../../api";
import { courseReviewSchema } from "../../../validator";
import ErrorHandler from "../../ErrorHandler";
import { useTranslation } from "react-i18next";

const ReviewModal = ({ modal, setModal, userType, courseId }) => {
  const { t } = useTranslation(["toast", "course-detail"]);
  // INIT LOCAL STATES
  const initReviewContent = {
    isContentExpected: 1,
    commentText: "",
    feedbackText: "",
  };

  // LOCAL STATE DECLARATIONS
  const [satisfy, setSatisfy] = useState(3);
  const [reviewContent, setReviewContent] = useState(initReviewContent);
  const [error, setError] = useState("");

  // FUNCTION DECLARATIONS
  const handleReview = async () => {
    // 1. JOI VALIDATE AND CATCH ERROR
    const inputData = {
      ...reviewContent,
      satisfy,
      courseId,
    };
    const validReviewContent = courseReviewSchema.validate(inputData);
    if (validReviewContent.error) {
      setError(validReviewContent.error.details[0].path[0]);
      return false;
    }
    // 2. RESET ERROR
    setError("");
    // 3. CALL API
    let payload = {
      contract_id: validReviewContent.value.courseId,
      comment: validReviewContent.value.commentText,
      feedback: validReviewContent.value.feedbackText,
      satisfy_level: validReviewContent.value.satisfy,
      is_content_expected: validReviewContent.value.isContentExpected,
    };
    let res = await reviewCourse(payload);
    // 4. CHECK API CALL RESULT
    if (res.status < 400) {
      toast.success(t("toast:sucess_8"));
      setModal(false);
    } else {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`, {
        autoClose: false,
      });
    }
  };

  return (
    <>
      <div className="px-0 py-3 border-bottom h5 text-center text-bold2">
        {`${t("course-detail:review_1")} ${
          userType === "student"
            ? t("course-detail:tutor")
            : t("course-detail:student")
        } `}
      </div>
      <div className="text-center my-3">
        <img src={ReviewBg} alt="background" />
      </div>

      <FormGroup className="px-3 mb-12px">
        <Label className="mb-12px text-bold2 text-dark">
          {t("course-detail:review")}
          <span className="text-danger">*</span>
        </Label>

        <div className="flex-box justify-content-between px-4 mb-4">
          <div className="active-mark position-relative text-center">
            <img src={Angry} alt="angry" />
            <span
              onClick={() => setSatisfy(1)}
              className={`position-absolute ${satisfy !== 1 && "overlay-mark"}`}
            ></span>
          </div>

          <div className="active-mark position-relative text-center">
            <img src={Sad} alt="sad" />
            <span
              onClick={() => setSatisfy(2)}
              className={`position-absolute ${satisfy !== 2 && "overlay-mark"}`}
            ></span>
          </div>

          <div className="active-mark position-relative text-center">
            <img src={Normal} alt="normal" />
            <span
              onClick={() => setSatisfy(3)}
              className={`position-absolute ${satisfy !== 3 && "overlay-mark"}`}
            ></span>
          </div>

          <div className="active-mark position-relative text-center">
            <img src={Excellent} alt="good" />
            <span
              onClick={() => setSatisfy(4)}
              className={`position-absolute ${satisfy !== 4 && "overlay-mark"}`}
            ></span>
          </div>

          <div className="active-mark position-relative text-center">
            <img onClick={() => setSatisfy(5)} src={Good} alt="excellent" />
            <span
              onClick={() => setSatisfy(5)}
              className={`position-absolute ${satisfy !== 5 && "overlay-mark"}`}
            ></span>
          </div>
        </div>

        <div className="w-100 px-4 mt-12px mb-12px">
          <InputRange
            maxValue={5}
            minValue={1}
            step={1}
            value={satisfy}
            onChange={(value) => setSatisfy(value)}
          />
        </div>

        <div className="flex-box align-items-start">
          <div style={{ width: "20%" }} className="px-2 text-center">
            {t("course-detail:satistify_1")}
          </div>
          <div style={{ width: "20%" }} className="px-2 text-center">
            {t("course-detail:satistify_2")}
          </div>
          <div style={{ width: "20%" }} className="px-2 text-center">
            {t("course-detail:satistify_3")}
          </div>
          <div style={{ width: "20%" }} className="px-2 text-center">
            {t("course-detail:satistify_4")}
          </div>
          <div style={{ width: "20%" }} className="px-2 text-center">
            {t("course-detail:satistify_5")}
          </div>
        </div>
      </FormGroup>

      <FormGroup className="px-3 mb-12px">
        <Label className="mb-12px mb-12px text-bold2 text-dark">
          {userType === "student"
            ? t("course-detail:satistify_6")
            : t("course-detail:satistify_7")}
        </Label>
        <div className="flex-box">
          <Label className="pl-3 mb-0" style={{ width: "10rem" }}>
            <Input
              defaultChecked
              className="mb-0"
              value={reviewContent.isContentExpected}
              type="radio"
              name="deman"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isContentExpected: 1 })
              }
            />
            <span>
              {userType === "student"
                ? t("course-detail:satistify_8")
                : t("course-detail:yes")}
            </span>
          </Label>
          <Label className="pl-3" style={{ width: "10rem" }}>
            <Input
              className="mb-0"
              value={reviewContent.isContentExpected}
              type="radio"
              name="deman"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isContentExpected: 0 })
              }
            />
            <span>
              {userType === "student"
                ? t("course-detail:satistify_9")
                : t("course-detail:no")}
            </span>
          </Label>
        </div>
      </FormGroup>

      <FormGroup className="px-3 mb-12px">
        <Label className="mb-12px text-bold2 text-dark">
          <span className="mr-3">{t("course-detail:satistify_10")}</span>
          {error === "commentText" && (
            <ErrorHandler error={t("course-detail:satistify_12")} />
          )}
        </Label>
        <Input
          id="review-text"
          type="textarea"
          rows={5}
          placeholder={t("course-detail:satistify_11")}
          className="border-radius-2"
          value={reviewContent.commentText}
          onChange={(e) =>
            setReviewContent({ ...reviewContent, commentText: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="px-3 mb-12px">
        <Label className="mb-12px text-bold2 text-dark">
          <span className="mr-3">{t("course-detail:satistify_13")}</span>
          {error === "feedbackText" && (
            <ErrorHandler error={t("course-detail:satistify_12")} />
          )}
        </Label>
        <Input
          id="review-text"
          type="textarea"
          rows={5}
          placeholder={t("course-detail:satistify_11")}
          className="border-radius-2"
          value={reviewContent.feedbackText}
          onChange={(e) =>
            setReviewContent({ ...reviewContent, feedbackText: e.target.value })
          }
        />
      </FormGroup>

      <div className="flex-box px-3">
        <div
          onClick={() => setModal(!modal)}
          style={{ border: "1px solid #0367B4", background: "#EAF4FC" }}
          className="cancel-btn text-hightlight1 text-bold2 w-50 mr-3"
        >
          {t("course-detail:feedback_later")}
        </div>
        <div onClick={handleReview} className="main-btn w-50">
          {t("course-detail:Send")}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

ReviewModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  userType: PropTypes.string,
  lessonId: PropTypes.string,
};
export default connect(mapStateToProps, null)(ReviewModal);
