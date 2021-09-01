import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import moment from "moment";

import "./index.scss";
import SuccessImg from "../../../assets/images/success-image.jpg";
import ToastContent from "../../utils/ToastContent";
import { toastSuccess, useQuery } from "../../../module";
import { createStudentRequest, getRequestDetail } from "../../../api";
import StepRequest from "../../utils/StepRequest";
import Goback from "../../utils/Goback";
import SubjectInfoInput from "./SubjectInfoInput";
import SubjectInfo from "./SubjectInfo";
import TimeAndFeeInput from "./TimeAndFeeInput/TimeAndFeeInput";
import TimeAndFee from "./TimeAndFee";
import UserInfo from "./UserInfo";
import UserInfoInput from "./UserInfoInput";
import ErrorHandler from "../../ErrorHandler";
import PushRequestGoal from "./PushRequestGoal";

export default function RequestForm() {
  // EXTRACT DATA FROM QUERY
  const query = useQuery();
  const status = query.get("status");
  const id = query.get("id");
  const subject = query.get("subject");

  // INIT LOCAL STATES
  const initSubjectInfo = {
    requestHeader: "",
    subjectName: subject || "",
    subjectLevel: "",
    offlineFlag: false,
    city: "",
    district: "",
  };

  const initTimeAndFee = {
    fee: 0,
    lessonTimeLength: "",
    is_pre_study: false,
    end_date: "",
  };

  const initUserInfo = {
    studentInfo: "",
    studentPropose: "",
  };

  const initRange = {
    id: uuidv4(),
    start_time: "",
    end_time: "",
    day_in_week: [],
  };

  // DECLARATION LOCAL STATES
  const [subjectInfo, setSubjectInfo] = useState(initSubjectInfo);

  const [timeAndFee, setTimeAndFee] = useState(initTimeAndFee);
  const [suggestRange, setSuggestRange] = useState([initRange]);

  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [akadonCommit, setAkadonCommit] = useState(false);

  const [isSubjectInfoDone, setIsSubjectInfoDone] = useState(false);
  const [isTimeAndFeeDone, setIsTimeAndFeeDone] = useState(false);
  const [isUserDone, setIsUserDone] = useState(false);
  const [error, setError] = useState();
  const [push, setPush] = useState(false);
  // LONG STATE WATING API SEND BTN
  const [waitSend, setWaitSend] = useState(false);

  const history = useHistory();
  const { t } = useTranslation(["request-form", "common", "toast"]);

  // SIDE EFFECTS
  useEffect(() => {
    reOpenRequest();
  }, []);

  // FUNCTIONS DECLARATIONS
  async function createRequest() {
    if (!akadonCommit) {
      setError("akadonCommit");
      return;
    }
    // LONG SETSTATE WAITING
    setWaitSend(true);
    if (waitSend) return true;

    const endDate = timeAndFee.end_date
      ? moment(timeAndFee.end_date).format("DD/MM/YYYY")
      : null;

    const freeTime = suggestRange.map((range) => ({
      day_in_week: range.day_in_week,
      start_time: moment(range.start_time).format("HH:mm"),
      end_time: moment(range.end_time).format("HH:mm"),
    }));

    const payload = {
      request_header: subjectInfo.requestHeader,
      subject_name: subjectInfo.subjectName,
      subject_level: subjectInfo.subjectLevel,
      offline_flag: subjectInfo.offlineFlag,
      city: subjectInfo.city,
      district: subjectInfo.district,

      fee: timeAndFee.fee,
      lesson_time_length: timeAndFee.lessonTimeLength,
      end_date: endDate,
      free_time: freeTime,
      is_pre_study: timeAndFee.is_pre_study,

      student_info: userInfo.studentInfo,
      student_propose: userInfo.studentPropose,
    };

    const res = await createStudentRequest(payload);

    // 9. Implement Api call response
    if (res.status < 400) {
      setPush(true);
      const Image = (
        <img src={SuccessImg} width={183} alt="create an request success" />
      );

      const Content = (
        <p className="mb-0 text-center">
          {t("request-form:request_success_note")}
        </p>
      );

      toastSuccess(<ToastContent Image={Image} Content={Content} />);
    } else if (res.response) {
      toast.error(` ${t("toast:er_26")}  ${res.response.status}`, {
        autoClose: false,
      });
      setWaitSend(true);
    }
  }

  async function getRequest() {
    const res = await getRequestDetail(id);
    if (res.status < 400) {
      return res.data;
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  async function reOpenRequest() {
    if (status === "reopen" && id) {
      const request = await getRequest();

      const fetchSubjectInfo = {
        requestHeader: request.request_header,
        subjectName: request.subject_name,
        subjectLevel: request.subject_level,
        offlineFlag: request.offline_flag,
        city: request.city,
        district: request.district,
      };
      
      // LONG SỬA KHI MỞ LẠI HIỆN THƯỜI GIAN DỰ KIỆN THAY VÀO LỊCH HỌC CŨ
      const free_time = request.free_time || [];
      const initSuggestRange = free_time.map((time) => ({
        ...time,
        end_time: moment("1970-01-01 " + time.end_time).toDate(),
        start_time: moment("1970-01-01 " + time.start_time).toDate(),
        id: uuidv4(),
      }));

      const fetchTimeAndFee = {
        fee: request.fee,
        numberLesson: request.number_lesson,
        lessonUnit: request.contract_type,
        lessonTimeLength: request.lesson_time_length,
      };

      const fetchUserInfo = {
        studentInfo: request.student_info,
        studentPropose: request.student_propose,
      };

      setSubjectInfo(fetchSubjectInfo);
      setTimeAndFee(fetchTimeAndFee);
      setUserInfo(fetchUserInfo);
      setAkadonCommit(true);
      setIsSubjectInfoDone(true);
      setIsTimeAndFeeDone(true);
      setIsUserDone(true);
      setSuggestRange(initSuggestRange);
    }
  }

  return (
    <>
      <div className="mb-3">
        <StepRequest step={1} />
      </div>

      <Goback />

      <h4 className="mb-2 text-bold2 text-dark">{t("title")}</h4>
      {!isSubjectInfoDone ? (
        <SubjectInfoInput
          subjectInfo={subjectInfo}
          setSubjectInfo={setSubjectInfo}
          setIsSubjectInfoDone={setIsSubjectInfoDone}
        />
      ) : (
        <SubjectInfo
          subjectInfo={subjectInfo}
          setIsSubjectInfoDone={setIsSubjectInfoDone}
          isSubjectInfoDone={isSubjectInfoDone}
        />
      )}

      {!isTimeAndFeeDone ? (
        <TimeAndFeeInput
          timeAndFee={timeAndFee}
          setTimeAndFee={setTimeAndFee}
          initTimeAndFee={initTimeAndFee}
          setIsTimeAndFeeDone={setIsTimeAndFeeDone}
          isSubjectInfoDone={isSubjectInfoDone}
          suggestRange={suggestRange}
          setSuggestRange={setSuggestRange}
        />
      ) : (
        <TimeAndFee
          timeAndFee={timeAndFee}
          setIsTimeAndFeeDone={setIsTimeAndFeeDone}
          isTimeAndFeeDone={isTimeAndFeeDone}
          suggestRange={suggestRange}
          studentSend={true}
        />
      )}

      {!isUserDone ? (
        <UserInfoInput
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          initUserInfo={initUserInfo}
          isTimeAndFeeDone={isTimeAndFeeDone}
          setIsUserDone={setIsUserDone}
        />
      ) : (
        <UserInfo
          userInfo={userInfo}
          setIsUserDone={setIsUserDone}
          isUserDone={isUserDone}
        />
      )}

      {isSubjectInfoDone && isTimeAndFeeDone && isUserDone && (
        <>
          <FormGroup className="mb-3 flex-box align-items-start">
            <input
              type="checkbox"
              id="akadon-commit"
              className="mt-1"
              value={akadonCommit}
              onChange={() => setAkadonCommit(!akadonCommit)}
            />
            <Label for="akadon-commit" className="mb-0 ml-2 cursor-pointer">
              {t("common:accept-akadon-policy")}
              <Link to="/terms-of-service" target="_blank">
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                  className="text-dark text-bold2 ml-2"
                >
                  {t("common:akadon-policy")}
                </span>
              </Link>
              {error === "akadonCommit" && (
                <ErrorHandler error={t("error-8")} />
              )}
            </Label>
          </FormGroup>
          <p className="mb-4 text-small text-italic text-grey">{t("note")}</p>
          <div
            onClick={createRequest}
            className={` ${
              waitSend && "disable-overlay"
            } main-btn px-5 mx-auto pt-12px pb-12px mb-5`}
          >
            {t("request-btn")}
          </div>
          {push === true && (
            <PushRequestGoal t={t} push={push} setPush={setPush} history={history} />
          )}
        </>
      )}
    </>
  );
}
