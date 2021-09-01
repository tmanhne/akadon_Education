import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";

import "./index.scss";
import { getUpcomingLessons, getContractSummary } from "../../../api";
import { editUserSuccess } from "../../../redux/actions/userActions";
import StudentBanner from "./StudentBanner";
import ProcessBox from "../../utils/ProcessBox/ProcessBox";
import NewStudentContent from "./NewStudentContent";
import UserSummary from "./UserSummary";
import InProgressCourses from "./InProgressCourses";
import SubLoader from "../../utils/SubLoader";
import UserInfoModal from "./modals/UserInfoModal";
import { useTranslation } from "react-i18next";

const Home = ({ user, editUserSuccess }) => {
  const { t } = useTranslation("toast");
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState([]);

  const history = useHistory();
  const [userInfoModal, setUserInfoModal] = useState(false);
  const { has_contract, is_qanda_complete } = user;

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      fetchUpcomingLessons();
      fetchContractSummary();
      const requestId = localStorage.getItem("request_id");
      if (requestId) {
        localStorage.removeItem("request_id");
        history.push("/dashboard/request?status=open-request");
      }
    })();
  }, []);

  useEffect(() => {
    if (!is_qanda_complete) {
      setUserInfoModal(true);
    }
    return () => {
      setCourses([]);
      setRequests([]);
    };
  }, [is_qanda_complete]);

  // FUNCTION DECLARATIONS
  async function fetchUpcomingLessons() {
    setLoading((prev) => [...prev, "loading 1"]);
    const res = await getUpcomingLessons();
    setLoading((prev) => {
      const updateLoading = prev.filter((pr) => pr !== "loading 1");
      return [...updateLoading];
    });
    if (res.status < 400) {
      setCourses([...res.data]);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`);
    }
  }

  async function fetchContractSummary() {
    setLoading((prev) => [...prev, "loading 2"]);
    const res = await getContractSummary();
    setLoading((prev) => {
      const updateLoading = prev.filter((pr) => pr !== "loading 2");
      return [...updateLoading];
    });
    if (res.status < 400) {
      setRequests([...res.data]);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`);
    }
  }

  if (loading && loading.length > 0) {
    return (
      <div className="vh-100">
        <SubLoader />
      </div>
    );
  }

  return (
    <>
      <StudentBanner />
      {!has_contract ? (
        <div className="pb-5">
          <div className="my-3">
            <ProcessBox />
          </div>
          <NewStudentContent />
        </div>
      ) : (
        <div className="mb-3">
          <UserSummary requests={requests} />
          <InProgressCourses courses={courses} />
          <ProcessBox />
        </div>
      )}

      <Modal
        isOpen={userInfoModal}
        contentClassName="card-style p-0"
        modalClassName="user-info-modal"
        centered={true}
      >
        <UserInfoModal
          setModal={setUserInfoModal}
          user={user}
          editUserSuccess={editUserSuccess}
          t={t}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  const userInfo = user.info;
  return { user: userInfo };
};

const mapDispatchToProps = {
  editUserSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
