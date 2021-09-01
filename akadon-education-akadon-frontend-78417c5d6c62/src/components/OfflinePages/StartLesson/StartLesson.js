import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import "./index.scss";
import { LessonCard, StudentBox, Header } from "../utils";
import SubLoader from "../../utils/SubLoader";
import {
  getLessonWithQRCode,
  startLessonWithQRCode,
  closeLessonWithQRCode,
} from "../../../api";
import useFetchObject from "../../customHooks/useFetchObject";
import VerifyDoneModal from "./VerifyDoneModal";

export default function StartLesson({ match }) {
  const { token } = match.params;
  const [modal, setModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [lesson, loading] = useFetchObject(getLessonWithQRCode, token);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      handleStartLesson();
    }
  }, []);

  // FUNCTION DECLARATION
  async function handleStartLesson() {
    const res = await startLessonWithQRCode(token);
    if (res.response) {
      errorHanling(res);
    }
  }

  async function closeLesson() {
    setPageLoading(true);
    const res = await closeLessonWithQRCode(token);
    setPageLoading(false);

    if (res.status < 400) {
      toast.success(
        "Kết thúc buổi học thành công ! Hãy cho AKadon biết đánh giá của bạn về buổi học"
      );
      const url = `/feedback-lesson/${token}`;
      history.push(url);
    } else if (res.response) {
      errorHanling(res);
    }
  }

  function errorHanling(res) {
    const { status } = res.response;
    switch (status) {
      case 409: {
        toast.error("Buổi học đã được bắt đầu !");
        break;
      }
      case 401: {
        toast.error("token không đúng, hoặc hết hiệu lực");
        break;
      }
      default: {
        toast.error(`Lỗi ${status} !`);
      }
    }
  }

  if ((loading && loading.length > 0) || pageLoading) return <SubLoader />;

  const student = (lesson && lesson.student) || {};
  const status = lesson && lesson.lesson_status;
  return (
    <>
      <div className="start-lesson mx-auto">
        <Header />
        <div className="hightlight-box text-hightlight border-radius-1 text-bold2 text-center mx-4 py-3 mb-4">
          {status === 2 ? "Buổi học đã kết thúc" : "Bạn đã bắt đầu buổi học"}
        </div>
        <div className="p-4 border-bottom border-top">
          <StudentBox student={student} />
        </div>
        <div className="p-4 mb-3">
          <LessonCard lesson={lesson ? lesson : {}} />
        </div>
        <Link
          to={`/dashboard-tutor/courses/${lesson && lesson.id}/${
            lesson && lesson.lesson_id
          }`}
          className="view-detail main-btn bg-light text-hightlight1 d-block mb-3 py-0"
        >
          Chi tiết buổi học
        </Link>
        {status === 2 ? (
          <div className="main-btn py-0">Buổi học đã kết thúc</div>
        ) : (
          <div onClick={() => setModal(!modal)} className="main-btn py-0">
            Hoàn thành buổi học
          </div>
        )}
      </div>
      <Modal
        isOpen={modal}
        centered
        contentClassName="start-lesson-modal card-style p-0"
      >
        <VerifyDoneModal setModal={setModal} closeLesson={closeLesson} />
      </Modal>
    </>
  );
}
