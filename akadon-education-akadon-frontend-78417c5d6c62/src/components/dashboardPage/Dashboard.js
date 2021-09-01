import React, { lazy, Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Modal } from "reactstrap";

import "./index.scss";
import "../utils/index.scss";

import MainSideBar from "./utils/MainSideBar";
import TopNav from "../TopNav/TopNav";
import WelcomeModal from "../utils/WelcomeModal";
import SuspenseLoader from "../utils/SuspenseLoader";

const Home = lazy(() => import("./Home/Home"));
const Request = lazy(() => import("./Request/Request"));
const PushRequestHistory = lazy(() =>
  import("./PushRequestHistory/PushRequestHistory")
);
const RequestDetail = lazy(() => import("./RequestDetail/RequestDetail"));
const Courses = lazy(() => import("../Courses/Courses"));
const CourseDetail = lazy(() => import("../CourseDetail/CourseDetail"));
const PendingCourseDetail = lazy(() =>
  import("../PendingCourseDetail/PendingCourseDetail")
);
const LessonDetail = lazy(() => import("../LessonDetail/LessonDetail"));
const HomeWork = lazy(() => import("./Homework/HomeWork"));
const Calendar = lazy(() => import("./Calendar/Calendar"));
const Payment = lazy(() => import("./Payment/Payment"));
const Video = lazy(() => import("../Video/Video"));
const Chat = lazy(() => import("../Chat/Chat"));
const ProfileContainer = lazy(() =>
  import("./Profile/containers/ProfileContainer")
);
const EContractChangeLog = lazy(() =>
  import("../EContractChangeLog/EContractChangeLog")
);
const CloseRequestDetail = lazy(() =>
  import("./CloseRequestDetail/CloseRequestDetail")
);
const Settings = lazy(() => import("../Settings/Settings"));
const EcontractList = lazy(() => import("../EcontractList/EcontractList"));
const RequestForm = lazy(() => import("./RequestForm/RequestForm"));
const CoursePayment = lazy(() => import("./Payment/CoursePayment"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const PageComingSoon = lazy(() => import("../PageComing/PageComingSoon"));
const PageNote = lazy(() => import("../PageNoteDash/PageNote"));
const SystemMessages = lazy(() => import("../SystemMessages/SystemMessages"));

const Dashboard = ({ match }) => {
  // LOCAL STATE DECLARATIONS
  const [welcomeModal, setWelcomeModal] = useState(false);

  // WELCOME LOGIC
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    setWelcomeModal(true);
    localStorage.removeItem("firstLogin");
    setTimeout(() => {
      setWelcomeModal(false);
    }, 10000);
  }

  return (
    <>
      <div className="dashboard-page flex-box align-items-stretch px-0 mx-auto my-0 w-100">
        <MainSideBar match={match} />

        <div className="dashboard-page__content position-relative flex-grow flex-box flex-column align-items-stretch pt-4 pr-3 pl-4 pb-0">
          <TopNav userType="student" />

          <Suspense fallback={<SuspenseLoader />}>
            <Switch>
              <Route path={`${match.path}/messages/:room`} component={Chat} />
              <Route path={`${match.path}/home`} component={Home} />
              <Route
                path={`${match.path}/system-messages`}
                component={SystemMessages}
              />
              <Route path={`${match.path}/settings`} component={Settings} />
              <Route
                path={`${match.path}/profile`}
                component={ProfileContainer}
              />
              <Route exact path={`${match.path}/request`} component={Request} />
              <Route
                path={`${match.path}/e-contract`}
                component={EcontractList}
              />
              <Route
                exact
                path={`${match.path}/push-contract-history/:contractId`}
                component={PushRequestHistory}
              />
              <Route
                exact
                path={`${match.path}/request/request-detail/:requestId/`}
                component={RequestDetail}
              />
              <Route
                exact
                path={`${match.path}/request/close-request-detail/:requestId/`}
                component={CloseRequestDetail}
              />
              <Route
                path={`${match.path}/request/request-form`}
                component={RequestForm}
              />
              <Route
                exact
                path={`${match.path}/e-contract-change-log/:contractId/:eContractId`}
                component={EContractChangeLog}
              />
              <Route exact path={`${match.path}/courses`} component={Courses} />
              <Route
                exact
                path={`${match.path}/courses/pending-course/:courseId/`}
                component={PendingCourseDetail}
              />
              <Route
                exact
                path={`${match.path}/courses/:courseId`}
                component={CourseDetail}
              />
              <Route
                exact
                path={`${match.path}/courses/:courseId/:lessonId`}
                component={LessonDetail}
              />
              <Route
                exact
                path={`${match.path}/courses/:courseId/:lessonNo/video`}
                component={Video}
              />
              <Route path={`${match.path}/homework`} component={HomeWork} />
              <Route path={`${match.path}/calendar`} component={Calendar} />
              <Route exact path={`${match.path}/payment`} component={Payment} />
              <Route
                path={`${match.path}/payment/:contractId`}
                component={CoursePayment}
              />
              <Route path={`${match.path}/news`} component={PageComingSoon} />
              <Route
                exact
                path={`${match.path}/comingsoon`}
                component={PageComingSoon}
              />
              <Route
                exact
                path={`${match.path}/notetip`}
                component={PageNote}
              />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </div>
      </div>

      <Modal
        toggle={() => setWelcomeModal(!welcomeModal)}
        isOpen={welcomeModal}
        centered={true}
        wrapClassName="welcome-modal"
      >
        <WelcomeModal setWelcomeModal={setWelcomeModal} />
      </Modal>
    </>
  );
};

export default Dashboard;
