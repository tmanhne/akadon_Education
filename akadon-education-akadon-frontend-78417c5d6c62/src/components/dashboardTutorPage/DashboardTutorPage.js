import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Modal } from "reactstrap";

import "../utils/index.scss";
import "./index.scss";
import "./utils/index.scss";
import { setLocalStorage, getLocalStorage } from "../../api";
import MainSideBar from "./utils/MainSideBar";
import TopNav from "../TopNav/TopNav";
import UpgradeAccountModal from "./UpgradeAccount/UpgradeAccountModal";
import WelcomeModal from "../utils/WelcomeModal";
import SuspenseLoader from "../utils/SuspenseLoader";

const Chat = lazy(() => import("../Chat/Chat"));
const Home = lazy(() => import("./Home/Home"));
const Request = lazy(() => import("./Request/Request"));
const RequestDetail = lazy(() => import("./RequestDetail/RequestDetail"));
const EContract = lazy(() => import("./EContract/EContract"));
const EContractChange = lazy(() => import("./EContractChange/EContractChange"));
const ProfileContainer = lazy(() =>
  import("./Profile/containers/ProfileContainer")
);
const UpgradeAccount = lazy(() => import("./UpgradeAccount/UpgradeAccount"));
const LessonDetail = lazy(() => import("../LessonDetail/LessonDetail"));
const Courses = lazy(() => import("../Courses/Courses"));
const CourseDetail = lazy(() => import("../CourseDetail/CourseDetail"));
const Video = lazy(() => import("../Video/Video"));
const EContractChangeLog = lazy(() =>
  import("../EContractChangeLog/EContractChangeLog")
);
const PendingCourseDetail = lazy(() =>
  import("../PendingCourseDetail/PendingCourseDetail")
);
const Calendar = lazy(() => import("../dashboardPage/Calendar/Calendar"));
const Settings = lazy(() => import("../Settings/Settings"));
const SuggestionsTutor = lazy(() =>
  import("../dashboardTutorPage/SuggestionsTutor/SuggestionsTutor")
);
const OpenRequestDetail = lazy(() =>
  import("./OpenRequestDetail/OpenRequestDetail")
);
const EcontractList = lazy(() => import("../EcontractList/EcontractList"));
const Revenue = lazy(() => import("./Finance/Revenue/Revenue"));
const Banking = lazy(() => import("./Finance/Banking/Banking"));
const Payment = lazy(() => import("./Finance/Payment/Payment"));
const WithDrawal = lazy(() => import("./WithDrawal/WithDrawal"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const PageComingSoon = lazy(() => import("../PageComing/PageComingSoon"));
const PageNote = lazy(() => import("../PageNoteDash/PageNote"));
const StudentRequests = lazy(() => import("./StudentRequests/StudentRequests"));
const StudentRequestDetail = lazy(() =>
  import("./StudentRequestDetail/StudentRequestDetail")
);
const SystemMessages = lazy(() => import("../SystemMessages/SystemMessages"));

const DashboardTutorPage = ({ match, priority }) => {
  // LOCAL STATES DECLARATIONS
  const [modal, setModal] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [expand, setExpand] = useState(false);

  // WELCOME LOGIC
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    setWelcomeModal(true);
    localStorage.removeItem("firstLogin");
    setTimeout(() => {
      setWelcomeModal(false);
    }, 10000);
  }

  // SIDE EFFECTS
  useEffect(() => {
    const imediateLogin = getLocalStorage("imediateLogin");
    if (!imediateLogin) {
      setModal(true);
      setLocalStorage("imediateLogin", true);
    }
  }, []);

  return (
    <>
      <div className="dashboard-page flex-box align-items-stretch px-0 mx-auto my-0">
        <MainSideBar expand={expand} setExpand={setExpand} match={match} />
        <div className="dashboard-page__content flex-grow position-relative flex-box flex-column align-items-stretch pt-4 pr-3 pl-4 pb-0">
          <TopNav userType="tutor" />
          <Suspense fallback={<SuspenseLoader />}>
            <Switch>
              <Route path={`${match.path}/messages/:room`} component={Chat} />
              <Route
                path={`${match.path}/profile`}
                component={ProfileContainer}
              />
              <Route path={`${match.path}/settings`} component={Settings} />
              <Route path={`${match.path}/home`} component={Home} exact />
              <Route
                path={`${match.path}/system-messages`}
                component={SystemMessages}
              />
              <Route
                path={`${match.path}/requests-list`}
                component={StudentRequests}
              />

              <Route
                path={`${match.path}/student-request-detail/:requestId`}
                component={StudentRequestDetail}
                exact
              />
              <Route
                path={`${match.path}/teach-request/:requestId`}
                component={SuggestionsTutor}
              />
              <Route exact path={`${match.path}/request`} component={Request} />
              <Route path={`${match.path}/calendar`} component={Calendar} />
              <Route
                exact
                path={`${match.path}/request/close-request-detail/:requestId/:bidId`}
                component={RequestDetail}
              />
              <Route
                exact
                path={`${match.path}/request/request-detail/:requestId/:bidId`}
                component={OpenRequestDetail}
              />
              <Route
                exact
                path={`${match.path}/e-contract-change-log/:contractId/:eContractId`}
                component={EContractChangeLog}
              />
              <Route
                path={`${match.path}/e-contract`}
                component={EcontractList}
              />
              <Route
                path={`${match.path}/request/:requestId/e-contract`}
                component={EContract}
              />
              <Route
                path={`${match.path}/econtract-change/:econtractId`}
                component={EContractChange}
              />
              <Route
                path={`${match.path}/upgrade-account/:accountType`}
                component={UpgradeAccount}
              />
              {/* <Route
                path={`${match.path}/accept-course-form/:courseId/:bidId`}
                component={AcceptCourseForm} //MAYBE IT DOES NOT USE (Thach Dong)
              /> */}
              <Route
                exact
                path={`${match.path}/courses/pending-course/:courseId/`}
                component={PendingCourseDetail}
              />
              <Route exact path={`${match.path}/courses`} component={Courses} />
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
              <Route exact path={`${match.path}/finance`} component={Revenue} />
              <Route
                path={`${match.path}/finance/revenue`}
                component={Revenue}
              />
              <Route
                path={`${match.path}/finance/banking`}
                component={Banking}
              />
              <Route
                path={`${match.path}/finance/payment`}
                component={PageComingSoon}
              />
              <Route path={`${match.path}/news`} component={PageComingSoon} />
              <Route path={`${match.path}/withdrawal`} component={WithDrawal} />
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

      <UpgradeAccountModal
        modal={modal}
        setModal={setModal}
        priority={priority}
      />

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

const mapStateToProps = ({ user }) => {
  const { priority } = user.info;
  return { priority };
};

export default connect(mapStateToProps, null)(DashboardTutorPage);
