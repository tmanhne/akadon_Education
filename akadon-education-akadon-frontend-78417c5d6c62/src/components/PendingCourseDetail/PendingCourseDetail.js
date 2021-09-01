import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import {
  getRequestDetail,
  StudentRejectCourse,
  submitSchedule,
} from "../../api";
import CourseCard from "../CourseDetail/CourseCard";
import StudentCard from "../CourseDetail/StudentCard";
import TeacherCard from "../CourseDetail/TeacherCard";
import useFetch from "../customHooks/useFetch";
import DeclineModal from "../dashboardPage/RequestDetail/modals/DeclineModal";
import Goback from "../utils/Goback";
import StepRequest from "../utils/StepRequest";
import SubLoader from "../utils/SubLoader";
import CourseInfo from "./CourseInfo";
import EmptyScheduleCard from "./EmptyScheduleCard";
import "./index.scss";
import Cancel from "./modals/Cancel";
import StudentScheduleCard from "./StudentScheduleCard";
import TutorScheduleCard from "./TutorScheduleCard";

//  LONG bỏ api getCourseDetail dùng 1 api  getRequestDetail

const PendingCourseDetail = ({ match, userType }) => {
  // EXTRACT PROPS
  const { courseId } = match.params;

  // DECLARE LOCAL STATES
  const [loading, setLoading] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [date, setDate] = useState([]);
  const [declineModal, setDeclineModal] = useState(false);

  const request = useFetch(getRequestDetail, setLoading, false, courseId);
  const history = useHistory();
  const { t } = useTranslation(["common", "course-detail", "toast", "pen"]);

  // FUNCTION DECLARATIONS
  async function tutorAccept() {
    if (request.schedule) {
      toast.warning(t("toast:sucess_34"));
      return;
    }
    const payload = {
      contract_id: courseId,
      schedule: date.map((d) => ({
        start_time: d.start_time,
        end_time: d.end_time,
        date: d.date,
      })),
    };
    if (date.length === request.number_lesson) {
      setLoading(["submitSchedule"]);
      const res = await submitSchedule(payload);
      setLoading([]);

      if (res.status < 400) {
        toast.success(t("toast:sucess_35"));
        history.push("/dashboard-tutor/courses");
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
      }
    } else {
      toast.warning(t("toast:sucess_36"));
      return;
    }
  }

  async function handleStartCourse(decide) {
    // LONG SAU KHI TIẾP NHẬN Ý KIÊN KAHCSH HÀNG HỌC VIÊN CÓ THỂ HỦY KHI MÀ GIA SƯ CHƯA CHỌN LỊCH
    // chưa có khi hủy hiện popup (ngoài sprint 26)
    if (decide * 1 === 1) {
      if (!request.is_course) {
        toast.error(t("toast:er_38"));
        return;
      }
    }

    const payload = { contract_id: request.id, decide: decide };
    setLoading(["accept-bid"]);
    console.log(loading);
    const res = await StudentRejectCourse(payload);
    setLoading([]);
    //  LONG sử dụng api mới cho học viên
    if (res.status < 400) {
      decide === 0 &&
        toast.success(t("toast:sucess_26")) &&
        history.push("/dashboard/request?status=open-request");
      decide === 1 &&
        toast.success(t("toast:sucess_26")) &&
        history.push("/dashboard/courses?status=happen");

      return;
    }
    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <div className="course-detail">
      <StepRequest step={5} />

      <Goback />

      <h4 className="mb-3 text-bold2">{t("course-detail:econtract-title")}</h4>

      {loading && loading.length > 0 ? (
        <SubLoader />
      ) : (
        request && (
          <>
            <div className="mb-0 flex-box course-detail__block-1 justify-content-between align-items-stretch mb-3  ">
              <CourseCard
                course={request}
                userType={userType}
                startDate={request.start_date}
              />
              {userType === "student" ? (
                <TeacherCard tutor={request.tutor} status={request.status} />
              ) : (
                <StudentCard
                  student={request.student}
                  level={request.subject_level}
                />
              )}
            </div>

            {userType === "tutor" ? (
              <TutorScheduleCard
                request={request}
                date={date}
                setDate={setDate}
              />
            ) : request.is_course ? (
              <StudentScheduleCard schedule={request.schedule} />
            ) : (
              <EmptyScheduleCard />
            )}

            <CourseInfo request={request} />

            {userType === "tutor" ? (
              <div className="center-box mb-4 ">
                <button
                  className={`cancel-btn px-5 cursor-pointer py-3 ml-3 mr-3 ${
                    request.schedule && "disable-overlay boder-rd-100"
                  }`}
                  onClick={() => {
                    if (request.schedule) {
                      toast.warning(t("toast:sucess_34"));
                      return;
                    }
                    setDeclineModal(true);
                  }}
                >
                  {t("course-detail:cancle-course")}
                </button>
                <button
                  onClick={tutorAccept}
                  className={`main-btn cursor-pointer px-5 py-3 ml-3 mr-3 ${
                    request.schedule && "disable-overlay boder-rd-100"
                  }`}
                >
                 {t("pen:pen_14")}
                </button>
              </div>
            ) : (
              <div className="center-box mb-4 ">
                <button
                  onClick={() => setCancelModal(true)}
                  className="cancel-btn px-5 cursor-pointer py-3 ml-3 mr-3"
                >
                  {t("course-detail:cancle-course")}
                </button>
                <button
                  onClick={() => handleStartCourse(1)}
                  className=" main-btn student-start cursor-pointer px-5 py-3 ml-3 mr-3"
                >
                  {t("course-detail:start-course")}
                </button>
              </div>
            )}

            <Modal
              isOpen={cancelModal}
              centered={true}
              contentClassName="card-style p-0"
            >
              <Cancel
                handleStartCourse={handleStartCourse}
                setModal={setCancelModal}
                loading={loading}
              />
            </Modal>

            <Modal
              isOpen={declineModal}
              centered={true}
              contentClassName="card-style p-0"
            >
              <DeclineModal setModal={setDeclineModal} bidId={request.bid_id} />
            </Modal>
          </>
        )
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(PendingCourseDetail);
