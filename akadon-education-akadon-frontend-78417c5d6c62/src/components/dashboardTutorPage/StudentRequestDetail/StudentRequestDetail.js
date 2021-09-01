import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

import "./index.scss";
import { getRequestDetail } from "../../../api";
import useFetch from "../../customHooks/useFetch";
import GoBack from "../../utils/Goback";
import UserBox from "../../utils/UserBox";
import SubjectInfo from "../../dashboardPage/RequestForm/SubjectInfo";
import TimeAndFee from "../../dashboardPage/RequestForm/TimeAndFee";
import UserInfo from "../../dashboardPage/RequestForm/UserInfo";
import FreeKind from "./FreeKind";
import SubLoader from "../../utils/SubLoader";

export default function StudentRequestDetail({ match }) {
  const { t } = useTranslation("free-kind");
  const { requestId } = match.params;

  // LOCAL STATE DECLARATIONS
  const [subjectInfo, setSubjectInfo] = useState({});
  const [timeAndFee, setTimeAndFee] = useState({});
  const [suggestRange, setSuggestRange] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState([]);

  const fetchRequest = useFetch(getRequestDetail, setLoading, false, requestId);

  // SIDE EFFECTS
  useEffect(() => {
    if (fetchRequest) {
      const fetchSubjectInfo = {
        requestHeader: fetchRequest.request_header,
        subjectName: fetchRequest.subject_name,
        subjectLevel: fetchRequest.subject_level,
        offlineFlag: fetchRequest.offline_flag,
        city: fetchRequest.city,
        district: fetchRequest.district,
      };

      const fetchTimeAndFee = {
        fee: fetchRequest.fee,
        lessonTimeLength: fetchRequest.lesson_time_length,
        end_date: fetchRequest.end_date,
        is_pre_study: fetchRequest.is_pre_study,
      };

      const fetchSuggestRange = fetchRequest.free_time?.map((data) => ({
        start_time: data.start_time.slice(0, 5),
        end_time: data.end_time.slice(0, 5),
        day_in_week: data.day_in_week,
      }));

      const fetchUserInfo = {
        studentInfo: fetchRequest.student_info,
        studentPropose: fetchRequest.student_propose,
      };

      const fetchStudent = fetchRequest.student;

      setSubjectInfo(fetchSubjectInfo);
      setTimeAndFee(fetchTimeAndFee);
      setUserInfo(fetchUserInfo);
      setSuggestRange(fetchSuggestRange);
      setStudent(fetchStudent);
    }
  }, [fetchRequest]);

  const { avatar, name, priority, rate, number_month_in, number_course_in } =
    student;
    console.log(number_month_in)

  return (
    <>
      <GoBack />

      {loading && loading.length > 0 ? (
        <SubLoader />
      ) : (
        <>
          <div className="card-style border-radius-2 p-3 mb-12px d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <UserBox
                avatar={avatar}
                width={64}
                height={64}
                name={name}
                priority={priority}
                rate={rate}
              />
              <p className="text-grey" style={{ marginLeft: "70px" }}>
                <Trans
                  i18nKey="free-kind:txt_9"
                  values={{ a: number_month_in, v2: number_course_in }}
                  components={{
                    d: <span />,
                  }}
                />
              </p>
            </div>
            <FreeKind status={timeAndFee.is_pre_study} />
          </div>

          <SubjectInfo subjectInfo={subjectInfo} />

          <TimeAndFee
            timeAndFee={timeAndFee}
            suggestRange={suggestRange}
            tutor={true}
          />

          <UserInfo userInfo={userInfo} />

          <div className="d-flex flex-wrap justify-content-center p-3 mb-12px tutor-home-detail">
            <Link
              to={`/dashboard-tutor/teach-request/${requestId}`}
              className="main-btn p-0"
            >
             {t("txt_3")}
            </Link>
            <div className="orange-btn-hover main-btn p-0 disable-overlay">
            {t("txt_4")}
            </div>
          </div>
        </>
      )}
    </>
  );
}
