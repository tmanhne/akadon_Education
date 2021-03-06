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

  // s??? d???ng helmet v?? google tag m??ngement

  return (
    <>
      <Helmet>
        <title>Akadon Education</title>
        <meta
          name="description"
          content="K??nh k???t n???i d???y v?? h???c uy t??n, ch???t l?????ng cao k???t n???i gi???a gia s?? v?? h???c vi??n h??ng ?????u hi???n nay. Cung c???p gi???i ph??p c??ng ngh??? d???y tr???c tuy???n ?????t ph?? cho vi???c d???y v?? h???c ??at ch???t l?????ng cao nh???t"
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
