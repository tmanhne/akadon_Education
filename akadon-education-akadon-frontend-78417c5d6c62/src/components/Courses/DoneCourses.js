import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { getDoneCourses } from "../../api";
import SubjectImage from "../utils/SubjectImage";
import SubLoader from "../utils/SubLoader";
import Subject from "../utils/Subject";
import EmptyCourse from "./EmptyCourse";

const DoneCourses = ({ match, userType, t }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    return () => {
      setCourses([]);
    };
  }, []);

  async function fetchCourses() {
    const res = await getDoneCourses();
    setLoading(false);
    if (res.status < 400) {
      setCourses(res.data);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`, {
        autoClose: false,
      });
    }
  }

  function renderCourses(course) {
    return (
      <Link
        key={course.id}
        to={`${match.path}/${course.id}`}
        className="done-course card-style border flex-box w-100 text-decoration-none mr-2 mb-3 position-relative"
      >
        <div className="position-relative">
          <SubjectImage
            subject={course.subject_name}
            width="72px"
            height="72px"
          />
        </div>
        {/* Content */}
        <div className="flex-grow ml-2">
          <div className="mb-2">
            <span className="text-grey text-small text-nowrap mr-2">
              {t("item-1")}
            </span>
            <span className="text-dark text-small">{course.id}</span>
          </div>
          <h6 className="font-weight-bold text-dark mb-2 text-bold2">
            <Subject subject={course.subject_name} />
          </h6>
          <div>
            <FontAwesomeIcon
              className="mr-2 "
              style={{ color: "#C5C6D1" }}
              icon={["fas", "chalkboard-teacher"]}
            />
            <span className="text-dark  text-nowrap text-bold2">
              : {course.tutor.name}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (loading) {
    return <SubLoader />;
  }

  return (
    <>
      <div className="course-title flex-box pb-12px border-bottom">
        <h6 className="mb-0 pl-2 font-weight-bold mr-2">{t("nav-item-3")}</h6>
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

DoneCourses.propTypes = {
  match: PropTypes.object,
  courses: PropTypes.object,
};

export default DoneCourses;
