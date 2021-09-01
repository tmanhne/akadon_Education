import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";

import "./index.scss";
import useFetchObject from "../customHooks/useFetchObject";
import { getLessonDetail, lessonClose } from "../../api";
import CalendarCard from "./CalendarCard";
import CourseInfoCard from "./CourseInfoCard";
import DocumentCard from "./DocumentCard";
import HomeworkCard from "./HomeworkCard";
import LessonStatus from "./LessonStatus";
import NoteCard from "./NoteCard";
import PaymentStatusModal from "./modals/PaymentStatusModal";
import ReviewCard from "./ReviewCard";
import PaymentModal from "./modals/PaymentModal";
import SubLoader from "../utils/SubLoader";
import useOnepayResponse from "../customHooks/useOnepayResponse";
import StudentCard from "../CourseDetail/StudentCard";
import TeacherCard from "../CourseDetail/TeacherCard";
import QRCard from "./QRCard";

const LessonDetail = ({ match, user }) => {
  // EXTRACT PROPS
  const { userType, email, id } = user.info;
  const rootUrl = userType === "student" ? "dashboard" : "dashboard-tutor";
  const history = useHistory();
  const { lessonId, courseId } = match.params;

  // LOCAL STATE DECLARATIONS
  const [editCourseModal, setEditCourseModal] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const paymentResponse = useOnepayResponse();
  const { t } = useTranslation(["lesson-detail", "common", "toast"]);
  const [lesson, loading] = useFetchObject(getLessonDetail, lessonId);

  // SIDE EFFECT IMPLEMENT
  useEffect(() => {
    if (lesson) {
      if (lesson.status === 2 && userType === "student") {
        !lesson.is_paid && setPaymentModal(true);
      }
    }
  }, [lesson]);

  useEffect(() => {
    if (paymentResponse && paymentResponse.status === "success") {
      const { pathname } = history.location;
      history.push(pathname);
      setPaymentStatusModal(true);
    }
  }, [paymentResponse]);

  // FUNCTION DECLERATION
  async function handleCloseLesson() {
    setPageLoading(true);
    const res = await lessonClose({ lesson_id: lesson.id });
    setPageLoading(false);

    if (res.status < 400) {
      window.location.reload();
      toast.success(t("lesson-detail:finish_lesson"));
    } else if (res.response) {
      toast.error(`Lỗi ${res.response.status} !`);
    }
  }

  if ((loading && loading.length > 0) || pageLoading) return <SubLoader />;
  if (!lesson) return <></>;

  const {
    lesson_date,
    start_time,
    status,
    lesson_no,
    fee,
    contract,
    qr_code_hashed,
    end_time,
  } = lesson;
  const { tutor, student, lessons, offline_flag } = contract;
  const partner = userType === "student" ? tutor : student;

  return (
    <div className="lesson-detail">
      <Link
        to={`/${rootUrl}/courses/${courseId}`}
        className="d-inline-block text-grey text-bold1 cursor-pointer mb-3"
      >
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="ml-2">{t("back-to-course")}</span>
      </Link>

      <LessonStatus
        setEditCourseModal={setEditCourseModal}
        setPaymentStatusModal={setPaymentStatusModal}
        editCourseModal={editCourseModal}
        match={match}
        t={t}
        lesson_no={lesson_no}
        lesson_date={lesson_date}
        userType={userType}
        status={status}
        offline_flag={offline_flag}
        start_time={start_time}
        end_time={end_time}
        handleCloseLesson={handleCloseLesson}
      />

      <div className="lesson-detail__block-1 mb-2 flex-box align-items-stretch justify-content-between">
        <CourseInfoCard
          contract={contract || {}}
          status={status}
          userType={userType}
          lesson_date={lesson_date}
          t={t}
        />

        <CalendarCard lesson={lesson} />

        {status === 2 ? (
          <ReviewCard
            student={student}
            tutor={tutor}
            lessonId={lessonId}
            courseId={courseId}
            userType={userType}
          />
        ) : userType === "student" ? (
          <TeacherCard tutor={partner} />
        ) : (
          <StudentCard student={partner} />
        )}
      </div>

      <div className="lesson-detail__block-2 flex-box align-items-stretch justify-content-between">
        {offline_flag && (
          <QRCard t={t} userType={userType} qr_code_hashed={qr_code_hashed} />
        )}
        <DocumentCard lessonId={lessonId} id={id} />
        <HomeworkCard lessonId={lessonId} id={id} />
        {!offline_flag && <NoteCard match={match} />}
      </div>

      {/* LESSON LIST */}
      <div className="lesson-bar flex-grow flex-box flex-wrap align-items-end mb-5 mt-3">
        {lessons.map((ls) => (
          <Link
            key={ls.id}
            className={`${
              lessonId * 1 === ls.id
                ? "main-btn"
                : "lesson-border text-hightlight1"
            } btn border-radius-2 py-3 px-4 mr-2 mb-2 text-bold2 text-decoration-none`}
            to={`/${rootUrl}/courses/${courseId}/${ls.id}?fee=${ls.fee}`}
            alt="lesson detail"
          >
            {t("common:lesson")} {ls.lesson_no}
          </Link>
        ))}
      </div>

      <Modal
        isOpen={paymentStatusModal}
        contentClassName="card-style"
        centered={true}
      >
        <PaymentStatusModal
          setPaymentStatusModal={setPaymentStatusModal}
          lesson={lesson}
          fee={fee}
          contractId={courseId}
          t={t}
        />
      </Modal>

      <Modal
        isOpen={paymentModal}
        contentClassName="card-style p-0"
        centered={true}
      >
        <PaymentModal
          fee={fee}
          setPaymentModal={setPaymentModal}
          lesson={lesson}
          match={match}
        />
      </Modal>
    </div>
  );
};

export default connect(({ user }) => ({ user }), null)(LessonDetail);
