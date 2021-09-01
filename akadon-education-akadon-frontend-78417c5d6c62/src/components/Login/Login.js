import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import studenticon from "../../assets/icons/student-icon.svg";
import teacher from "../../assets/icons/teacher-icon.svg";
import Logo from "../../assets/images/logoTransparent.png";
import { loginRequest } from "../../redux/actions/userActions";
import { loginInfoSchemas } from "../../validator";
import { useQuery } from "../../module";
import SubLoader from "../utils/SubLoader";
import LoginType from "./LoginType";
import LoginForm from "./LoginForm";

function Login({ loginRequest, user, loading, sagaError }) {
  const query = useQuery();
  const code = query.get("code");
  const uid = query.get("uid");
  const state = query.get("state");

  // LOCAL STATE DECLARATIONS
  const [role, setRole] = useState(state || 1);
  const [step, setStep] = useState(1);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [remember, setRemember] = useState(false);

  const history = useHistory();
  const { t } = useTranslation(["Sign-up-page", "common"]);
  //LONG THÊM CHUYỂN NGỮ
  const userStr =
    role === 0 ? (
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

  // SIDE EFFECTS
  useEffect(() => {
    const { userType } = user;
    if (userType === "student") {
      history.push("/dashboard/home");
    }
    if (userType === "tutor") {
      history.push("/dashboard-tutor/home");
    }
  }, [user]);

  useEffect(() => {
    // HANDLE REMEMBER PASSWORD
    const localCredential = JSON.parse(
      localStorage.getItem("loginCredentials")
    );
    if (localCredential) {
      const localRole = localCredential.role;
      setLoginCredentials({
        email: localCredential.email,
        password: localCredential.password,
      });
      setRole(localRole);
      setRemember(true);
      setStep(2);
    }

    // ZALO LOGIN
    if (code && uid) {
      loginRequest(null, null, role, code, uid);
    }
  }, []);

  // FUNCTION DECLARATIONS
  function login(e) {
    e.preventDefault();

    const data = {
      role,
      email: loginCredentials.email,
      password: loginCredentials.password,
    };
    const validLoginInfo = loginInfoSchemas.validate(data);

    if (validLoginInfo.error) {
      setErr(validLoginInfo.error.details[0].path[0]);
      return;
    }

    setErr("");
    if (remember) {
      const credentials = {
        email: validLoginInfo.value.email,
        password: validLoginInfo.value.password,
        role,
      };
      localStorage.setItem("loginCredentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("loginCredentials");
    }

    loginRequest(
      validLoginInfo.value.email,
      validLoginInfo.value.password,
      role,
      null,
      null,
      null,
      null
    );
  }

  return (
    <Container className="user-page px-0" fluid={true}>
      <div className="user-page__banner">
        <Link to="/" alt="home" target="_blank">
          <img src={Logo} alt="akadon" />
        </Link>
      </div>
      <div className="user-page__content">
        <div className="content-container text-nowrap">
          {/* LONG THAY ĐỔI TIÊU ĐỀ HIỂN THỊ */}
          <div className="header-box flex-box flex-wrap">
            <h3>{t("Sign-up-page:login-btn")}</h3>
            <div className="align-self-start ml-2">{step === 2 && userStr}</div>
          </div>

          {loading.length > 0 ? (
            <div className="h-100 w-100 center-box">
              <SubLoader />
            </div>
          ) : (
            <>
              {step === 1 && (
                <LoginType setRole={setRole} role={role} setStep={setStep} />
              )}

              {step === 2 && (
                <LoginForm
                  loginCredentials={loginCredentials}
                  setLoginCredentials={setLoginCredentials}
                  err={err}
                  sagaError={sagaError}
                  login={login}
                  setStep={setStep}
                  remember={remember}
                  setRemember={setRemember}
                  role={role}
                  loginRequest={loginRequest}
                />
              )}
            </>
          )}

          <div>
            <span>{t("Sign-up-page:question-new")}</span>
            <Link
              className="ml-2 font-weight-bold text-hightlight tracksignup"
              to="/user/register"
            >
              {t("Sign-up-page:signup-now")}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

Login.propTypes = {
  loginRequest: PropTypes.func,
};

const mapStateToProps = ({ user, appConfig }) => ({
  user: user.info,
  sagaError: user.error,
  loading: appConfig.loading,
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
