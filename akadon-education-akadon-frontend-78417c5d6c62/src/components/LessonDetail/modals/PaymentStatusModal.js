import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import { CardImg } from "reactstrap";
import PaymentFail from "../../../assets/images/paymenFail.png";
import PaymentSuccess from "../../../assets/images/paymentSuccess.png";
import CurrencyFormat from "../../utils/CurrencyFormat";
import { paymentUrl } from "../../../module";
import { useHistory } from "react-router";

const PaymentStatusModal = ({
  setPaymentStatusModal,
  lesson,
  fee,
  contractId,
  t,
}) => {
  let courseId, lessonId;
  const { is_paid } = lesson;
  const history = useHistory();

  // LOCAL STATE DECLARATIONS
  const [url, setUrl] = useState("");

  // SIDE EFFECTS
  useEffect(() => {
    if (lesson && is_paid === false) {
      courseId = lesson.courseId;
      lessonId = lesson.lessonId;
      createPaymentUrl();
    }
  }, [lesson]);

  const lessonDate = moment(lesson.lessonDate).format("DD/MM/YYYY");

  async function createPaymentUrl() {
    if (lessonId && courseId) {
      const paymentTitle = "LESSON_PAYMENT";
      const vpc_Amount = `${fee * 1 === 0 ? 1 : fee}00`;
      const vpc_ReturnURL = `${window.location.origin}/dashboard/courses/${courseId}/${lessonId}`;

      const payload = { lesson_id: lessonId };
      const url = await paymentUrl(
        paymentTitle,
        vpc_Amount,
        vpc_ReturnURL,
        payload
      );

      setUrl(url);
    }
  }

  if (!lesson) {
    return <></>;
  }

  return (
    <>
      {is_paid ? (
        <>
          <div className="flex-box mb-4">
            <div className="flex-grow text-center">
              <CardImg
                style={{ width: "16.25rem" }}
                src={PaymentSuccess}
                alt="payment fail"
              />
            </div>
            <FontAwesomeIcon
              onClick={() => setPaymentStatusModal(false)}
              className="text-grey close-model-icon"
              icon={["fal", "times"]}
            />
          </div>

          <p className="mb-4 text-hightlight text-center">
            {t("lesson-detail:lesson_date") + lessonDate}
          </p>

          <div className="flex-box mb-4  justify-content-center">
            <FontAwesomeIcon
              className="text-hightlight1 mr-2"
              icon={["fas", "check-circle"]}
            />
            <span className="text-bold1">{t("lesson-detail:paid")}</span>
          </div>

          <div className="h4 mb-4 text-bold1 text-center">
            <CurrencyFormat value={fee} amountOnly={true} />
          </div>

          <div
            className="d-flex justify-content-center align-items-center cursor-pointer main-btn p-0 mx-auto"
            style={{ width: "15rem", height: "3.2rem" }}
            onClick={() => history.push(`/dashboard/payment/${contractId}`)}
          >
            {t("lesson-detail:check_invoid")}
          </div>
        </>
      ) : (
        <>
          <div className="flex-box mb-4">
            <div className="flex-grow text-center">
              <CardImg
                style={{ width: "16.25rem" }}
                src={PaymentFail}
                alt="payment fail"
              />
            </div>
            <FontAwesomeIcon
              onClick={() => setPaymentStatusModal(false)}
              className="text-grey close-model-icon"
              icon={["fal", "times"]}
            />
          </div>

          <p className="mb-4 text-hightlight text-center">
            {t("lesson-detail:lesson_date") + lessonDate}
          </p>

          <div className="flex-box mb-4  justify-content-center">
            <FontAwesomeIcon
              className="text-red mr-2"
              icon={["fas", "times-circle"]}
            />
            <span className="text-bold1">{t("lesson-detail:not_pay")}</span>
          </div>

          <div className="flex-box mb-4  justify-content-center">
            <span className="text-grey ">{t("lesson-detail:paid_expire")}</span>
          </div>

          <div className="h4 mb-4 text-bold1 text-center">
            <CurrencyFormat value={fee} amountOnly={true} />
          </div>

          <div className="center-box">
            <a href={url} className="main-btn py-3 px-5">
              {t("lesson-detail:checkout")}
            </a>
          </div>
        </>
      )}
    </>
  );
};

PaymentStatusModal.propTypes = {
  setPaymentStatusModal: PropTypes.func,
};

export default PaymentStatusModal;
