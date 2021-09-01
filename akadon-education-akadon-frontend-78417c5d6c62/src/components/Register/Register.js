import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import moment from "moment";

import "./index.scss";
import Logo from "../../assets/images/logoTransparent.png";
import { useQuery } from "../../module";
import { getZaloAccessToken } from "../../api";
import UserTypeRegister from "./UserTypeRegister";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import RegisterProgress from "./RegisterProgress";
import InfoForm from "./InfoForm";
import RegisterSuccess from "./RegisterSuccess";
import VerifyForm from "./VerifyForm";
import studenticon from "../../assets/icons/student-icon.svg";
import teacher from "../../assets/icons/teacher-icon.svg";
import SubLoader from "../utils/SubLoader";

const Register = () => {
  //  INIT LOCAL STATES
  const initUser = {
    role: 0,
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    dob: "",
    gender: 0,
    district: "",
    city: "",
    phone_number: "",
    verify_code: "",
  };
  // INIT LOCAL STATES
  const [registerContent, setRegisterContent] = useState(initUser);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);
  const query = useQuery();
  const oauthCode = query.get("code");
  const state = query.get("state");
  const scope = query.get("scope");

  // SIDE EFFECTS
  useEffect(() => {
    handleZaloRegistration();
  }, [oauthCode]);

  // FUNCTION DECLARATIONS
  async function handleZaloRegistration() {
    if (oauthCode) {
      // GET ACCESS TOKEN FROM SERVER
      const payload = {
        code: oauthCode,
        scope,
      };
      setLoading(true);
      const res = await getZaloAccessToken(payload);
      setLoading(false);
      if (res.status < 400) {
        const { birthday, gender, name } = res.data;
        let fetchedInfo = { role: state * 1, oauthCode: oauthCode };
        birthday && (fetchedInfo.dob = moment(birthday, "DD/MM/YYYY").toDate());
        gender &&
          (gender === "male"
            ? (fetchedInfo.gender = 1)
            : (fetchedInfo.gender = 0));
        name && (fetchedInfo.name = name);
        setRegisterContent({ ...registerContent, ...fetchedInfo });

        setStep(3);
      } else {
        toast.error(t("toast:er_44"));
      }
    }
  }

  // LONG THÊM HIỂN THỊ TIÊU ĐỀ HỌC VIÊN, GIA SƯ
  const userStr =
    registerContent.role === 0 ? (
      <>
        <img src={studenticon} alt="iconstu" />{" "}
        <span className="text-bold1 title-sign-up">
          {t("Sign-up-page:student")}
        </span>
      </>
    ) : (
      <>
        <img src={teacher} alt="iconstu" />{" "}
        <span className="text-bold1 title-sign-up">
          {t("Sign-up-page:teacher")}
        </span>
      </>
    );

  return (
    <>
      <Container
        className="register-page flex-box align-items-stretch px-0"
        fluid={true}
      >
        {/* banner */}
        <div className="register-page__banner">
          <Link to="/" alt="home" target="_blank">
            <img src={Logo} alt="akadon" />
          </Link>
        </div>
        {/* Content */}
        <div className="register-page__content">
          <div className="content-wraper flex-box flex-column align-items-start h-100 pb-4 pt-5 px-5">
            <div className="header-box flex-box flex-wrap">
              <h1 className="font-weight-bold">
                {t("Sign-up-page:register-text")}
              </h1>
              <div className="align-self-start ml-2">
                {step >= 1 && userStr}
              </div>
            </div>
            <div className="w-100">
              {step > 0 && <RegisterProgress step={step} />}
            </div>

            <div className="flex-grow w-100">
              {loading ? (
                <SubLoader />
              ) : step === 0 ? (
                <UserTypeRegister
                  registerContent={registerContent}
                  setRegisterContent={setRegisterContent}
                  step={step}
                  setStep={setStep}
                />
              ) : step === 1 ? (
                <EmailAndPasswordForm
                  registerContent={registerContent}
                  setRegisterContent={setRegisterContent}
                  step={step}
                  setStep={setStep}
                />
              ) : step === 2 ? (
                <VerifyForm
                  step={step}
                  setStep={setStep}
                  registerContent={registerContent}
                  setRegisterContent={setRegisterContent}
                />
              ) : step === 3 ? (
                <InfoForm
                  registerContent={registerContent}
                  setRegisterContent={setRegisterContent}
                  step={step}
                  setStep={setStep}
                  t={t}
                />
              ) : (
                <RegisterSuccess registerContent={registerContent} />
              )}
            </div>
            <div>
              <span> {t("Sign-up-page:question")}</span>
              <a //Use a tag instead of Link component to reset error userDoesNotExist
                className="ml-2 font-weight-bold text-hightlight"
                href="/user/login"
              >
                {t("Sign-up-page:login-now")}
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="center-box pb-2">
        <div className="mobile-bottom-bar"></div>
      </div>
    </>
  );
};

export default Register;
