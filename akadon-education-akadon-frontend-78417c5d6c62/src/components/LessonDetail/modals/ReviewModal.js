import React, { useState } from "react";
import { Card, Input, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import InputRange from "react-input-range";

import "./reviewModal.scss";
import ReviewBg from "../../../assets/images/review-bg.png";
import SpeedSlow from "../../../assets/icons/speed-slow.png";
import SpeedLightSlow from "../../../assets/icons/speed-light-slow.png";
import SpeedNormal from "../../../assets/icons/speed-normal.png";
import SpeedFast from "../../../assets/icons/speed-fast.png";
import SpeedFastest from "../../../assets/icons/speed-fastest.png";
import Angry from "../../../assets/icons/angry.png";
import Sad from "../../../assets/icons/sad.png";
import Normal from "../../../assets/icons/normal.png";
import Good from "../../../assets/icons/good.png";
import Excellent from "../../../assets/icons/excellent.png";
import { addReview } from "../../../api";
import { lessonReviewSchema } from "../../../validator";
import ErrorHandler from "../../ErrorHandler";

import { useTranslation, Trans } from "react-i18next";

const ReviewModal = ({
  modal,
  setModal,
  userType,
  lessonId,
  student,
  tutor,
  addFeedback,
  customToken,
}) => {
  const { t } = useTranslation(["toast", "lesson-detail"]);
  // LOCAL STATE DECLARATIONS
  const [satisfy, setSatisfy] = useState(3);
  const [speed, setSpeed] = useState(3);
  const [star, setStar] = useState(3);
  const [reviewContent, setReviewContent] = useState({
    isLessonComplete: 1,
    isTutorOnTime: 1,
    isContentExpected: 1,
    reviewText: "",
  });
  const [error, setError] = useState();

  // FUNCTION DECLARATIONS
  function handleReview(e) {
    e.preventDefault();

    // 1. JOI VALIDATE AND CATCH ERROR
    const inputData = {
      ...reviewContent,
      satisfy,
      speed,
      star,
    };
    const validReviewContent = lessonReviewSchema.validate(inputData);

    if (validReviewContent.error) {
      setError(validReviewContent.error.details[0].path[0]);
      return false;
    }

    // 2. RESET ERROR AND CALL API
    setError("");

    let payload = {
      star: validReviewContent.value.star,
      comment: validReviewContent.value.reviewText,
      is_finish_lesson: validReviewContent.value.isLessonComplete,
      is_tutor_on_time: validReviewContent.value.isTutorOnTime,
      is_content_expected: validReviewContent.value.isContentExpected,
      satisfy_level: validReviewContent.value.satisfy,
      teaching_speed: validReviewContent.value.speed,
    };
    if (customToken) {
      addFeedback(payload);
    } else {
      handleAddReview(payload);
    }
  }

  async function handleAddReview(payload) {
    let res = await addReview({ ...payload, lesson_id: lessonId });

    // 3. CHECK API CALL RESULT
    if (res.status < 400) {
      toast.success(t("toast:er_1"));
      setModal(false);
      window.location.reload();
      return;
    }

    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`, {
        autoClose: false,
      });
      return;
    }
  }

  return (
    <Card className="card-style px-0 pt-0 pb-3">
      <div className="title px-0 py-3 border-bottom h5 text-center text-bold2">
        {t("lesson-detail:review_1")}
        {userType === "student"
          ? t("lesson-detail:tutor")
          : t("lesson-detail:student")}
      </div>

      <div className="text-center my-3">
        <img src={ReviewBg} alt="background" />
      </div>
      {/* LONG BỎ ID VS TÊN SET CỨNG */}
      <FormGroup className="px-3">
        <Label className="mb-12px text-bold2">
          {t("lesson-detail:review_2")}
          <span className="text-hightlight">{lessonId}</span>
          {t("lesson-detail:with")}
          {userType === "student" ? (
            <span>
              {t("lesson-detail:tutor")}{" "}
              <span className="text-hightlight"> {tutor.name}</span>
            </span>
          ) : (
            <span>
              {t("lesson-detail:student")}
              <span className="text-hightlight"> {student.name}</span>
            </span>
          )}
        </Label>
        <div className="flex-box">
          <Label className="pl-3" style={{ width: "10rem" }}>
            <Input
              defaultChecked
              className="mb-0"
              value={reviewContent.isLessonComplete}
              type="radio"
              name="is-complete"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isLessonComplete: 1 })
              }
            />
            <span>{t("lesson-detail:confirm")}</span>
          </Label>
          <Label className="pl-3" style={{ width: "10rem" }}>
            <Input
              className="mb-0"
              value={reviewContent.isLessonComplete}
              type="radio"
              name="is-complete"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isLessonComplete: 0 })
              }
            />
            <span> {t("lesson-detail:deny")}</span>
          </Label>
        </div>
      </FormGroup>

      <FormGroup className="px-3">
        <Label className="mb-12px text-bold2">
          {userType === "student"
            ? t("lesson-detail:tutor")
            : t("lesson-detail:student")}
          {t("lesson-detail:review_3")}
        </Label>
        <div className="flex-box mb-3">
          <Label className="pl-3" style={{ width: "10rem" }}>
            <Input
              defaultChecked
              className="mb-0"
              value={reviewContent.isTutorOnTime}
              type="radio"
              name="is-ontime"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isTutorOnTime: 1 })
              }
            />
            <span>{t("lesson-detail:yes")}</span>
          </Label>
          <Label className="pl-3" style={{ width: "10rem" }}>
            <Input
              className="mb-0"
              value={reviewContent.isTutorOnTime}
              type="radio"
              name="is-ontime"
              onChange={(e) =>
                setReviewContent({ ...reviewContent, isTutorOnTime: 0 })
              }
            />
            <span>{t("lesson-detail:no")}</span>
          </Label>
        </div>
      </FormGroup>

      <FormGroup className="px-3">
        <Label className="mb-12px text-bold2">
          {t("lesson-detail:review_4")}
          {userType === "student"
            ? t("lesson-detail:study")
            : t("lesson-detail:teach")}
        </Label>

        <div className="icon-box flex-box justify-content-between mb-4">
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

        <div className="w-100 px-5 mt-12px mb-12px">
          <InputRange
            maxValue={5}
            minValue={1}
            step={1}
            value={satisfy}
            onChange={(value) => setSatisfy(value)}
          />
        </div>

        <div className="criteria-box flex-box align-items-start">
          <div className="px-2 text-center">
            <Trans
              i18nKey="lesson-detail:review_5"
              components={{
                br: <br />,
              }}
            />
          </div>
          <div className="px-2 text-center">{t("lesson-detail:review_6")}</div>
          <div className="px-2 text-center">{t("lesson-detail:review_7")}</div>
          <div className="px-2 text-center">{t("lesson-detail:review_8")}</div>
          <div className="px-2 text-center">
            <Trans
              i18nKey="lesson-detail:review_9"
              components={{
                br: <br />,
              }}
            />
          </div>
        </div>
      </FormGroup>

      <FormGroup className="px-3">
        <Label className="mb-12px text-bold2">
          {userType === "student"
            ? t("lesson-detail:review_10")
            : t("lesson-detail:review_11")}
        </Label>
        <div className="flex-box mb-3">
          <Label className="pl-3" style={{ width: "10rem" }}>
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
                ? t("lesson-detail:demand")
                : t("lesson-detail:yes")}
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
                ? t("lesson-detail:not_demand")
                : t("lesson-detail:no")}
            </span>
          </Label>
        </div>
      </FormGroup>
      {userType === "student" ? (
        <FormGroup className="px-3">
          <Label className="mb-12px text-bold2">
            {t("lesson-detail:review_12")}
          </Label>
          <div className="icon-box flex-box justify-content-between mb-4">
            <div className="active-mark position-relative text-center">
              <img src={SpeedSlow} alt="angry" />
              <span
                onClick={() => setSpeed(1)}
                className={`position-absolute ${speed !== 1 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedLightSlow} alt="sad" />
              <span
                onClick={() => setSpeed(2)}
                className={`position-absolute ${speed !== 2 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img
                src={userType === "student" ? SpeedNormal : SpeedFast}
                alt="normal"
              />
              <span
                onClick={() => setSpeed(3)}
                className={`position-absolute ${speed !== 3 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img
                src={userType === "student" ? SpeedFast : SpeedNormal}
                alt="goof"
              />
              <span
                onClick={() => setSpeed(4)}
                className={`position-absolute ${speed !== 4 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedFastest} alt="excellent" />
              <span
                onClick={() => setSpeed(5)}
                className={`position-absolute ${speed !== 5 && "overlay-mark"}`}
              ></span>
            </div>
          </div>

          <div className="w-100 px-5 mt-12px mb-12px">
            <InputRange
              maxValue={5}
              minValue={1}
              step={1}
              value={speed}
              onChange={(value) => setSpeed(value)}
            />
          </div>

          <div className="criteria-box flex-box align-items-start">
            <div className="px-2 text-center">
              {t("lesson-detail:review_13")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_14")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_15")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_16")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_17")}
            </div>
          </div>
        </FormGroup>
      ) : (
        <FormGroup className="px-3">
          <Label className="mb-12px text-bold2">
            {t("lesson-detail:review_18")}
          </Label>
          <div className="icon-box flex-box justify-content-between mb-4">
            <div className="active-mark position-relative text-center">
              <img src={SpeedFastest} alt="angry" />
              <span
                onClick={() => setSpeed(1)}
                className={`position-absolute ${speed !== 1 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedSlow} alt="sad" />
              <span
                onClick={() => setSpeed(2)}
                className={`position-absolute ${speed !== 2 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedLightSlow} alt="normal" />
              <span
                onClick={() => setSpeed(3)}
                className={`position-absolute ${speed !== 3 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedFast} alt="goof" />
              <span
                onClick={() => setSpeed(4)}
                className={`position-absolute ${speed !== 4 && "overlay-mark"}`}
              ></span>
            </div>

            <div className="active-mark position-relative text-center">
              <img src={SpeedNormal} alt="excellent" />
              <span
                onClick={() => setSpeed(5)}
                className={`position-absolute ${speed !== 5 && "overlay-mark"}`}
              ></span>
            </div>
          </div>

          <div className="w-100 px-5 mt-12px mb-12px">
            <InputRange
              maxValue={5}
              minValue={1}
              step={1}
              value={speed}
              onChange={(value) => setSpeed(value)}
            />
          </div>

          <div className="criteria-box flex-box align-items-start">
            <div className="px-2 text-center">
              {t("lesson-detail:review_19")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_20")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_21")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_22")}
            </div>
            <div className="px-2 text-center">
              {t("lesson-detail:review_23")}
            </div>
          </div>
        </FormGroup>
      )}

      <Label
        for="review-text"
        className="text-bold2 h6 mb-3 px-3"
        style={{ cursor: "pointer" }}
      >
        {t("lesson-detail:review_24")}
        {userType === "student"
          ? t("lesson-detail:tutor")
          : t("lesson-detail:student")}
      </Label>

      <div className="star-selected-box flex-box justify-content-center py-3">
        <FontAwesomeIcon
          onClick={() => setStar(1)}
          className={`${star >= 1 ? "star-active" : "text-grey"} h3 mr-12px`}
          icon={["fas", "star"]}
        />
        <FontAwesomeIcon
          onClick={() => setStar(2)}
          className={`${star >= 2 ? "star-active" : "text-grey"} h3 mr-12px`}
          icon={["fas", "star"]}
        />
        <FontAwesomeIcon
          onClick={() => setStar(3)}
          className={`${star >= 3 ? "star-active" : "text-grey"} h3 mr-12px`}
          icon={["fas", "star"]}
        />
        <FontAwesomeIcon
          onClick={() => setStar(4)}
          className={`${star >= 4 ? "star-active" : "text-grey"} h3 mr-12px`}
          icon={["fas", "star"]}
        />
        <FontAwesomeIcon
          onClick={() => setStar(5)}
          className={`${star >= 5 ? "star-active" : "text-grey"} h3 mr-12px`}
          icon={["fas", "star"]}
        />
      </div>

      <div className="px-3">
        <Input
          id="review-text"
          type="textarea"
          rows={5}
          placeholder="Viết cảm nhận của bạn..."
          className="border-radius-2"
          value={reviewContent.reviewText}
          onChange={(e) =>
            setReviewContent({ ...reviewContent, reviewText: e.target.value })
          }
        />
      </div>

      {error === "reviewText" && (
        <div className="my-1 text-center">
          <ErrorHandler error={t("lesson-detail:review_25")} />
        </div>
      )}

      <div className={`text-small text-grey p-3 `}>
        <span>{reviewContent.reviewText.length}</span>
        <span>/25</span>
        <span className="mx-1 font-weight-bold">.</span>
        <span>{t("lesson-detail:review_25")}</span>
      </div>

      <div className="flex-box px-3">
        <div
          onClick={() => {
            setModal(!modal);
          }}
          style={{ border: "1px solid #0367B4", background: "#EAF4FC" }}
          className="cancel-btn text-hightlight1 text-bold2 w-50 mr-3"
        >
          {t("lesson-detail:feedback_later")}
        </div>
        <div onClick={(e) => handleReview(e)} className="main-btn w-50">
          {t("lesson-detail:send")}
        </div>
      </div>
    </Card>
  );
};

ReviewModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  userType: PropTypes.string,
  lessonId: PropTypes.number || PropTypes.string,
};
export default ReviewModal;
