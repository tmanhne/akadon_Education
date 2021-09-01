import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";

import "./index.scss";
import Logo from "../../assets/images/logoTransparent.png";
import StepBox from "./StepBox";
import EmailInput from "./EmailInput";
import CodeInput from "./CodeInput";
import PasswordInput from "./PasswordInput";
import Success from "./Success";

const ForgetPassword = () => {
  const { t } = useTranslation(["Sign-up-page", "common"]);

  const initPassword = {
    step: 0,
    email: "",
    phone: "",
    code: "",
    password: "",
    repeatPassword: "",
  };
  const [password, setPassword] = useState(initPassword);

  const { step } = password;

  return (
    <Container className="user-page px-0" fluid={true}>
      {/* banner */}
      <div className="user-page__banner">
        <Link to="/" alt="home">
          <img src={Logo} alt="akadon" />
        </Link>
      </div>
      {/* Content */}
      <div className="user-page__content pt-5">
        <div className="forget-password">
          {step >= 2 ? (
            <h3> {t("Sign-up-page:create-password-title")}</h3>
          ) : (
            <h3> {t("Sign-up-page:forget-password")}</h3>
          )}
          <div className="mb-5">
            <StepBox step={step} />
          </div>
          {step === 0 && (
            <EmailInput password={password} setPassword={setPassword} />
          )}
          {step === 1 && (
            <CodeInput password={password} setPassword={setPassword} />
          )}
          {step === 2 && (
            <PasswordInput password={password} setPassword={setPassword} />
          )}
          {step === 3 && <Success />}
        </div>
      </div>
    </Container>
  );
};

export default ForgetPassword;
