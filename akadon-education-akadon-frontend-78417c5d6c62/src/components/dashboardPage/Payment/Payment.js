import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import FilterIcon from "../../../assets/icons/filter-icon.svg";
import EyeIcon from "../../../assets/icons/eye-icon.svg";
import { getPaymentHistory } from "../../../api";
import "./index.scss";
import SubLoader from "../../utils/SubLoader";
import Subject from "../../utils/Subject";

const Payment = () => {
  // LOCAL STATE DECLARATIONS
  const [courses, setCourses] = useState([]);
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [loading, setLoading] = useState(true);
  let coursesToRender = courses;
  const { t } = useTranslation(["payment", "common"]);

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const res = await getPaymentHistory();
      setLoading(false);
      if (res.status < 400) {
        const data = res.data.contract;
        setCourses([...data]);
        const initFilter = [
          ...new Set(data.map((course) => course.subject_name)),
        ];
        setFilterSubject(initFilter);
      } else if (res.response) {
        toast.error(res.response.status);
      }
    })();
  }, []);

  // DATA IMPLEMENT
  const subjectList = [
    ...new Set(courses.map((course) => course.subject_name)),
  ];

  // FUNCTION DECLARATIONS
  function handleSetFilterSubject(subject) {
    if (filterSubject.includes(subject)) {
      const updateSubject = filterSubject.filter((s) => s !== subject);
      setFilterSubject(updateSubject);
    } else {
      setFilterSubject([...filterSubject, subject]);
    }
  }

  (function implementFilter() {
    coursesToRender = courses.filter((course) => {
      const isSubject = filterSubject.includes(course.subject_name);
      let isId = true;
      if (filterId) {
        isId = course.id === filterId * 1;
      }
      return isSubject && isId;
    });
  })();

  return (
    <div className="payment card-style border-radius-2 p-0 mb-3">
      <h4 className="pl-4 mb-3 pt-3 font-weight-bold">{t("title")}</h4>
      {loading ? (
        <SubLoader />
      ) : (
        <table className="w-100">
          <thead>
            <tr>
              <th className="border-bottom w-25">
                <UncontrolledDropdown className="center-box">
                  <DropdownToggle className="bg-light text-dark border-0">
                    <span className="text-bold2 text-small mr-1">
                      {t("header-1")}
                    </span>
                    <img src={FilterIcon} alt="filter" />
                  </DropdownToggle>
                  <DropdownMenu className="items-list border-0 border-radius-2 px-2">
                    {subjectList.map((subject, index) => (
                      <DropdownItem key={subject + index} toggle={false}>
                        <FormGroup>
                          <Input
                            value={subject}
                            id={`subject-${index}`}
                            onChange={() => handleSetFilterSubject(subject)}
                            type="checkbox"
                            defaultChecked={filterSubject.includes(subject)}
                          />
                          <Label
                            className="m-0 p-0 cursor-pointer"
                            htmlFor={`subject-${index}`}
                          >
                            {subject}
                          </Label>
                        </FormGroup>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </th>
              <th className="pb-12px border-bottom w-25">
                <div className="center-box flex-column">
                  <span className="text-bold2 text-small mb-2">
                    {t("header-2")}
                  </span>
                  <InputGroup>
                    <Input
                      className="border-radius-2 text-center"
                      type="text"
                      placeholder={t("header-2")}
                      value={filterId}
                      onChange={(e) => setFilterId(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </th>
              <th className="text-bold2 text-small text-center border-bottom w-25">
                {t("header-3")}
              </th>
              <th className="border-bottom w-25"></th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr>
                <td className="text-grey text-center" colSpan={4}>
                  {t("payment:no_lesson_paid")}
                </td>
              </tr>
            )}

            {coursesToRender.length > 0 &&
              coursesToRender.map((course) => (
                <tr key={course.id}>
                  <td>
                    <Subject subject={course.subject_name} />
                  </td>
                  <td>
                    <div className="fee-box text-hightlight py-0 px-3 mx-auto border-radius-1 center-box">
                      <span>{course.id}</span>
                    </div>
                  </td>
                  <td>
                    {course.number_lesson} {t("common:lesson")}
                  </td>
                  <td>
                    <Link to={`/dashboard/payment/${course.id}`}>
                      <img
                        src={EyeIcon}
                        className="btn p-0"
                        width={32}
                        alt="go detail"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payment;
