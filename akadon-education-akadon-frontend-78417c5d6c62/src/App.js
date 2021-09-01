import { vi, enUS } from "date-fns/locale";
import i18next from "i18next";
import React, { lazy, Suspense, useEffect } from "react";
import {useSelector} from "react-redux";
import { registerLocale } from "react-datepicker";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SuspenseLoader from "./components/utils/SuspenseLoader";
import OauthRoute from "./OauthRoute";
import Tracking from "./Tracking";

const LandingPage = lazy(() =>
  import("./components/LandingType/LandingChoose")
);
const LandingPagetutor = lazy(() =>
  import("./components/LandingType/LdTutor/LandingTutor")
);
const LandingPagestudent = lazy(() =>
  import("./components/LandingType/LdStudent/LandingStudent")
);
const Dashboard = lazy(() => import("./components/dashboardPage/Dashboard"));
const DashboardTutorPage = lazy(() =>
  import("./components/dashboardTutorPage/DashboardTutorPage")
);
const Register = lazy(() => import("./components/Register/Register"));
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
const NotFound = lazy(() => import("./components/NotFound"));
const StepNote = lazy(() => import("./components/landingPage/NoteTip/Step"));
const TermsOfService = lazy(() =>
  import("./components/LandTermsOfService/TermsOfService")
);
const Login = lazy(() => import("./components/Login/Login"));
const QuandaRegistration = lazy(() =>
  import("./components/QuandaRegistration/QuandaRegistration")
);
const QuandaLandingPage = lazy(() =>
  import("./components/QuandaLandingPage/QuandaLandingPage")
);
const MarketingPage = lazy(() =>
  import("./components/MarketingPage/MarketingPage")
);
const QRCode = lazy(() => import("./components/OfflinePages/QRCode/QRCode"));
const StartLesson = lazy(() =>
  import("./components/OfflinePages/StartLesson/StartLesson")
);
const LessonFeedback = lazy(() =>
  import("./components/OfflinePages/LessonFeedback/LessonFeedback")
);

function App() {
  const language = useSelector(({appConfig}) => appConfig.language);
  if (language === "vi") {
    registerLocale("vi", vi);
  } else {
    registerLocale("en", enUS);
  }
  
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setTimeout(() => {
      const subizIcon = document.querySelector("#wpwidget .widget-layout");
      const removeBtn = document.querySelector("#wpwidget .chat-button .remove-subiz-icon");
      if (subizIcon && !removeBtn) {
        const removeBtn = document.createElement("div");
        removeBtn.innerHTML = "&times;";
        removeBtn.classList = "remove-subiz-icon";
        removeBtn.onclick = () => {
          subizIcon.remove();
        }
        subizIcon.prepend(removeBtn);
      }
    }, 5000);
  }, []);

  // sử dụng helmet và google tag mângement

  return (
    <>
      <Helmet>
        <title>Akadon Education</title>
        <meta
          name="description"
          content="Kênh kết nối dạy và học uy tín, chất lượng cao kết nối giữa gia sư và học viên hàng đầu hiện nay. Cung cấp giải pháp công nghệ dạy trực tuyến đột phá cho việc dạy và học đat chất lượng cao nhất"
        />
      </Helmet>
      <Router>
        <Tracking />
        <ToastContainer position="bottom-center" />
        <Suspense fallback={<SuspenseLoader />}>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/qrcode/:token" component={QRCode} />
            <Route path="/start-lesson/:token" component={StartLesson} />
            <Route path="/feedback-lesson/:token" component={LessonFeedback} />
            <Route path="/giasu" exact component={LandingPagetutor} />
            <Route path="/hocvien" exact component={LandingPagestudent} />
            <Route path="/qanda" exact component={QuandaLandingPage} />
            <Route path="/request-preview" exact component={MarketingPage} />
            <Route path="/qanda/registration" component={QuandaRegistration} />
            <Route path="/note" exact component={StepNote} />
            {/* <Route path="/faq" exact component={Faq} /> */}
            {/* <Route path="/feature" component={FeaturesPage} /> */}
            {/* <Route path="/cost" exact component={CostPage} /> */}
            <Route path="/terms-of-service" exact component={TermsOfService} />
            <Route path="/user/register" component={Register} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/forget-password" component={ForgetPassword} />
            <OauthRoute path="/dashboard" component={Dashboard} />
            <OauthRoute
              path="/dashboard-tutor"
              component={DashboardTutorPage}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
