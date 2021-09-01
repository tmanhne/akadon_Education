import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { getPendingCourses } from "../../api";
import SubjectImage from "../utils/SubjectImage";
import TeacherIcon from "../../assets/icons/teacher-icon.png";
import Studenticon from "../../assets/icons/change-econtract-icon.png";
import SubLoader from "../utils/SubLoader";
import Subject from "../utils/Subject";
import EmptyCourse from "./EmptyCourse";
import { subjectColor } from "../../module";

const PendingCourses = ({ userType, t, match }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    return () => {
      setCourses([]);
    };
  }, []);

  async function fetchCourses() {
    const res = await getPendingCourses();
    setLoading(false);
    if (res.status < 400) {
      setCourses(res.data);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`, {
        autoClose: false,
      });
    }
  }

  if (loading) {
    return <SubLoader />;
  }

  function renderCourses(course) {
    const {
      read_flg,
      tutor_read_flg,
      subject_name,
      student,
      tutor,
      id,
    } = course;

    const url = `${match.path}/pending-course/${id}`;

    const background = { background: subjectColor(course.subject_name, true) };

    const studentReadFlag = userType === "student" && !read_flg;
    const tutorReadFlag = userType === "tutor" && !tutor_read_flg;
    const isNewtag = studentReadFlag || tutorReadFlag;

    const studentName = student ? student.name : "Noname";
    const tutorName = tutor ? tutor.name : "Noname";
    const userInfo =
      userType !== "student"
        ? { name: studentName, icon: Studenticon }
        : { name: tutorName, icon: TeacherIcon };

    return (
      <Link
        to={url}
        key={course.id}
        style={background}
        className={`${
          isNewtag && "new-tag"
        } w-100 card-style p-12px flex-box text-decoration-none mb-3 position-relative`}
      >
        {isNewtag && (
          <div className="position-absolute text-small px-2 py-1 new-course">
            <div className="position-relative triangle-down">{t("new")}</div>
          </div>
        )}

        <SubjectImage subject={subject_name} width="72px" height="72px" />

        <div className="ml-12px">
          <div className="mb-2">
            <span className="text-grey mr-2">{t("item-1")}</span>
            <span className="text-dark">{id}</span>
          </div>

          <h6
            className="mb-2 text-bold2 text-dark"
            style={{ fontSize: "1.2rem" }}
          >
            <Subject subject={subject_name} />
          </h6>

          <div className="flex-box align-items-center">
            <img src={userInfo.icon} width={24} alt={userInfo.name} />
            <h6 className="mb-0 text-bold2 text-dark ml-2">
              : {userInfo.name}
            </h6>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className="course-title flex-box pb-12px border-bottom">
        <h6 className="mb-0 pl-2 font-weight-bold mr-2">{t("nav-item-1")}</h6>
        <span className="text-hightlight font-weight-bold border-radius-1 px-3">
          {courses.length}
        </span>
      </div>
      <div className="courses__pending">
        {courses.length > 0 ? (
          courses.map(renderCourses)
        ) : (
          <EmptyCourse userType={userType} t={t} />
        )}
      </div>
    </>
  );
};

PendingCourses.propTypes = {
  match: PropTypes.object,
  userType: PropTypes.string,
};

export default PendingCourses;
