import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

import { getEcontract } from "../../../api";
import { useQuery } from "../../../module";
import EyesIcon from "../../../assets/icons/eye-icon.svg";
import FilterDayPicker from "../../utils/Filter/FilterDayPicker";
import UserBox from "../../utils/UserBox";
import TableHead from "./TableHead";
import SubLoader from "../../utils/SubLoader";

import { useTranslation } from "react-i18next";

function Courses({ userType }) {
  const { t } = useTranslation("toast");
  // INIT LOCAL STATES
  const initFilter = {
    subjectList: [],
    idList: [],
    lessonNoList: [],
  };

  // LOCAL STATE DECLARATIONS
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [dateRange, setDateRange] = useState();
  const [loading, setLoading] = useState(false);

  const query = useQuery();
  const type = query.get("type");

  let filterKeys = generateFilterKeys();
  let coursesToRender = courses;
  const url =
    userType === "student"
      ? "/dashboard/e-contract-change-log/"
      : "/dashboard-tutor/e-contract-change-log/";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "courses" && courses.length === 0) {
      getCourses();
    }
  }, [type]);

  useEffect(() => {
    const filterData = generateFilterKeys();
    setFilter(filterData);
  }, [courses]);

  // FUNCTION DECLARATIONS
  async function getCourses() {
    const user_role = userType === "student" ? 0 : 1;
    setLoading(true);
    const res = await getEcontract(user_role, 5);
    setLoading(false);

    if (res.status < 400) {
      const rawData = [...res.data.results];
      setCourses(rawData);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  function generateFilterKeys() {
    // GENERATE DATA FOR FILTERING
    // 1. Create data for PreAcceptTableHead to render
    // 2. Create data for filter implementation
    let subjectList = [],
      idList = [],
      lessonNoList = [];

    courses.map((r) => {
      subjectList.push(r.subject_name);
      idList.push(r.id);
      lessonNoList.push(r.lesson_no);
    });

    // Remove duplicate items
    subjectList = [...new Set(subjectList)];
    idList = [...new Set(idList)];
    lessonNoList = [...new Set(lessonNoList)];

    return {
      subjectList,
      idList,
      lessonNoList,
    };
  }

  function handleFiltering(filterObj) {
    // FILTERING IMPLEMENTATIONS
    // 1. Listening onChange events
    // 2. Update filter state
    const keyName = filterObj.key;
    const value = filterObj.str;
    const isKeyExist = filter[keyName].includes(value);
    if (isKeyExist) {
      const updatedFilter = filter[keyName].filter((key) => key !== value);
      setFilter({ ...filter, [keyName]: [...updatedFilter] });
    } else {
      setFilter({ ...filter, [keyName]: [...filter[keyName], value] });
    }
  }

  (function filterImplementation() {
    // Everytime filter state update => Update things to render
    coursesToRender = courses.filter((r) => {
      const isSubject = filter.subjectList.includes(r.subject_name);
      const isId = filter.idList.includes(r.id);
      const isLessonNo = filter.lessonNoList.includes(r.lesson_no);

      let isDate = true;
      if (dateRange) {
        const startTime = new Date(dateRange.from).getTime();
        const endTime = new Date(dateRange.to).getTime();
        const lesson_date = r.lesson_date && r.lesson_date.split("/");
        const time = new Date(
          `${lesson_date[1]}/${lesson_date[0]}/${lesson_date[2]}`
        ).getTime();
        isDate = time >= startTime && time <= endTime;
      }

      return isDate && isSubject && isId && isLessonNo;
    });
  })();

  if (loading) {
    return <SubLoader />;
  }

  return (
    <div className="table-wraper">
      <Table className="econtract-list__courses">
        <TableHead
          filter={filter}
          handleFiltering={handleFiltering}
          filterKeys={filterKeys}
          FilterDate={
            <FilterDayPicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          }
        />
        <tbody>
          {courses.length === 0 && (
            <tr className="text-center text-grey">
              <td colSpan={6}>Hiện tại chưa có yêu cầu để hiển thị !</td>
            </tr>
          )}
          {coursesToRender.length === 0 && courses.length > 0 && (
            <tr className="text-center text-grey">
              <td colSpan={6}>Không tìm thấy nội dung phù hợp !</td>
            </tr>
          )}
          {coursesToRender.map((course) => {
            const start_time =
              course.start_time &&
              course.start_time.split(":").slice(0, 2).join(":") + " - ";

            const read_flag =
              course.read_flag === true || course.read_flag === false
                ? course.read_flag
                : true;
            return (
              <tr key={course.id} className={read_flag ? "" : "read-flag"}>
                <td className="align-middle text-center">
                  {course.subject_name}
                </td>
                <td className="align-middle text-center">{course.id}</td>
                <td className="align-middle text-center">
                  Buổi {course.lesson_no}
                </td>
                <td className="align-middle text-center">
                  <div className="time-box border-radius-1 py-1 px-2 text-nowrap">
                    {start_time}
                    {course.lesson_date}
                  </div>
                </td>
                <td className="user-box align-middle text-center">
                  <UserBox
                    width={36}
                    height={36}
                    name={
                      userType === "student"
                        ? course.tutor_name
                        : course.student_name
                    }
                    avatar={
                      userType === "student"
                        ? course.tutor_avatar
                        : course.student_avatar
                    }
                    rate={
                      userType === "student"
                        ? course.tutor_rating
                        : course.student_rating
                    }
                  />
                </td>
                <td className="align-middle text-center">
                  <Link
                    to={`${url}${course.id}/${course.bid_id}`}
                    className="cursor-pointer btn p-0"
                  >
                    <img width={32} src={EyesIcon} alt="go detail" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

Courses.propTypes = { userType: PropTypes.string };

export default Courses;
