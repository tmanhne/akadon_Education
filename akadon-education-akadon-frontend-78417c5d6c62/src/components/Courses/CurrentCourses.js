import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "reactstrap";

import { getInprogressCourses } from "../../api";
import empty from "../../assets/images/empty-course-happen.png";
import SubjectImage from "../utils/SubjectImage";
import SubLoader from "../utils/SubLoader";
import { subjectColor } from "../../module";
import Subject from "../utils/Subject";
import EmptyCourse from "./EmptyCourse";

const CurrentCourses = ({ match, userType, t }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    return () => {
      setCourses([]);
    };
  }, []);

  async function fetchCourses() {
    const res = await getInprogressCourses();
    setLoading(false);
    if (res.status < 400) {
      setCourses(res.data);
    } else if (res.response) {
      toast.error(` ${t("toast:er_3")} ${res.response.status}`, {
        autoClose: true,
      });
    }
  }

  if (loading) {
    return <SubLoader />;
  }

  function renderCourses(course) {
    return (
      <Link
        key={course.id}
        to={`${match.path}/${course.id}`}
        className="card-style box-shadow flex-box w-100 text-decoration-none mr-2 mb-3 position-relative"
        style={{ background: subjectColor(course.subject_name, false) }}
      >
        <div className="position-relative">
          <div
            className={
              "position-absolute rounded-circle " +
              `${course.offline_flag ? "offline-flag" : "online-flag"}`
            }
          ></div>
          <SubjectImage
            subject={course.subject_name}
            width="64px"
            height="64px"
          />
        </div>
        {/* Content */}
        <div className="flex-grow ml-2">
          <div className="mb-2">
            <span className="text-dark text-small text-nowrap mr-2">
              {t("item-1")}
            </span>
            <span className="text-light text-small">{course.id}</span>
          </div>
          <h6 className="font-weight-bold text-light mb-2">
            <Subject subject={course.subject_name} />
          </h6>
          <div>
            <FontAwesomeIcon
              className="text-light mr-2"
              icon={["fas", "chalkboard-teacher"]}
            />
            <span className="text-light text-small text-nowrap text-bold2">
              : {course.tutor.name}
            </span>
          </div>
          <div>
            <span className="text-dark text-small text-nowrap mr-2">
              {t("item-2")}
            </span>
            <span className="text-light text-small text-nowrap mr-2">
              {course.start_date}
            </span>
          </div>
        </div>
        {/* calendar */}
        <div className="calendar">
          {course.next_lesson_date && (
            <div className="calendar-box flex-box flex-column">
              <span className="text-hightlight h6 text-bold2 m-0">
                {course.next_lesson_date.split("/")[0]}
              </span>
              <span className="text-dark text-uppercase text-small-1">
                {t("key")}
                {course.next_lesson_date.split("/")[1].split(0)}
              </span>
            </div>
          )}
          <p
            style={{ width: "4.8rem" }}
            className="text-light text-small-1 text-center mb-0"
          >
            {t("item-3")}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className="course-title flex-box pb-12px border-bottom">
        <h6 className="mb-0 pl-2 font-weight-bold mr-2">{t("nav-item-2")}</h6>
        <span className="text-hightlight font-weight-bold border-radius-1 px-3">
          {courses.length}
        </span>
      </div>
      <div className="courses__current">
        {courses.length > 0 ? (
          courses.map(renderCourses)
        ) : (
          <EmptyCourse userType={userType} t={t} />
        )}
      </div>
    </>
  );
};

CurrentCourses.propTypes = {
  match: PropTypes.object,
  courses: PropTypes.object,
};

export default CurrentCourses;
