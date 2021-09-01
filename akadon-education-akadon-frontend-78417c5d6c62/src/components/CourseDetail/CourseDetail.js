import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { getCourseDetail } from "../../api";
import useFetchObject from "../customHooks/useFetchObject";
import LessonDoneImg from "../../assets/images/lesson-done.png";
import StepRequest from "../utils/StepRequest";
import CourseCard from "./CourseCard";
import FeedbackCard from "./FeedbackCard";
import LessonCard from "./LessonCard";
import StudentCard from "./StudentCard";
import TeacherCard from "./TeacherCard";
import SubLoader from "../utils/SubLoader";

const CourseDetail = ({ match, userType }) => {
  // EXTRACT PROPS
  const { courseId } = match.params;

  // LONG ADD TRANSLATE(BACK-COURSE)
  const { t } = useTranslation(["course-detail", "toast"]);

  const [course, loading] = useFetchObject(getCourseDetail, courseId);

  function renderCourse() {
    if (!course) {
      return <></>;
    }
    const tutor = course.tutor || {};
    const student = course.student || {};
    const { status } = course;
    return (
      <>
        <div className="mb-0 flex-box course-detail__block-1 justify-content-between align-items-stretch mb-3  ">
          <CourseCard course={course} userType={userType} />

          {userType === "student" ? (
            <TeacherCard tutor={tutor} status={status} />
          ) : (
            <StudentCard student={student} />
          )}

          {status === 6 && (
            <div className="done-mark position-absolute ">
              <img src={LessonDoneImg} alt="lesson done" />
            </div>
          )}
        </div>

        <div className="mb-3 ">
          <LessonCard match={match} userType={userType} course={course} />
        </div>
        <div className="mb-3 ">
          <FeedbackCard />
        </div>
      </>
    );
  }

  const url = match.url.split("/").slice(0, 2).join("/") + "/courses";

  return (
    <div className="course-detail">
      {userType === "student" && <StepRequest step={5} />}

      <Link
        to={url}
        className="flex-box text-grey text-bold2 py-3 w-25 cursor-pointer"
      >
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="ml-3">{t("back-course")}</span>
      </Link>

      {loading && loading.length > 0 ? <SubLoader /> : renderCourse()}
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};
export default connect(mapStateToProps, null)(CourseDetail);
