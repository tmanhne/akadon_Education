import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import Img from "../../../assets/images/payment-image.jpg";
import { paymentUrl } from "../../../module";
import {SubLoader} from "../../utils";

function PaymentModal({ fee, setPaymentModal, lesson, match }) {
  const {courseId, lessonId} = match.params;
// LONG BỎ LessonDate  và lessonDate = lesson.lessonDate
  // LOCAL STATE DECLARATIONS
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // SIDE EFFECTS
  useEffect(() => {
    if (lesson && lesson.is_paid === false) {
      createPaymentUrl();
    }
  }, [lesson]);

  async function createPaymentUrl() {
    if (lessonId && courseId) {
      const paymentTitle = "LESSON_PAYMENT";
      const vpc_Amount = `${fee * 1 === 0 ? 1 : fee}00`;
      const vpc_ReturnURL = `${window.location.origin}/dashboard/courses/${courseId}/${lessonId}`;

      const payload = { lesson_id: lessonId };
      setLoading(true);
      const url = await paymentUrl(
        paymentTitle,
        vpc_Amount,
        vpc_ReturnURL,
        payload
      );

      setUrl(url);
      setLoading(false);
    }
  }

  if (loading) return <SubLoader />

  if (!lesson) {
    return <div></div>;
  }

  return (
    <div className="payment-modal p-3">
      <div className="text-right text-grey">
        <FontAwesomeIcon
          onClick={() => setPaymentModal(false)}
          icon={["fas", "times"]}
        />
      </div>

      <div className="text-center mb-4">
        <img src={Img} alt="payment image" />
      </div>
      <p className="text-center text-hightlight mb-3">
        Buổi học ngày {moment(lesson.lessonDate).format("DD/MM/YYYY")}
      </p>
      <p className="text-center text-dark text-bold1 px-5">
        Bạn vui lòng thanh toán buổi học này trong vòng 48 giờ kể từ khi kết
        thúc buổi học nhé!{" "}
      </p>
      <div className="center-box">
        <a href={url} className="main-btn py-3 px-5">
          Thanh toán ngay
        </a>
             
      </div>
    </div>
  );
}

PaymentModal.propTypes = { setPaymentModal: PropTypes.func };

export default PaymentModal;
