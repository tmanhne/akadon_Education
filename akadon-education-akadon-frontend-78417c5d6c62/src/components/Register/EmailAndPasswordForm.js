import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";

import EyesIcon from "../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../assets/icons/slash-eyes-icon.svg";
import { verifyEmail, verifyPhone } from "../../api";
import ErrorHandler from "../ErrorHandler";
import RegisterRedirect from "./RegisterRedirect";
import PasswordCriteria from "../ForgetPassword/PasswordCriteria";
import SubLoader from "../utils/SubLoader";
import Oauth2 from "../Login/Oauth2";
import {
  phoneAndPasswordSchema,
  emailAndPasswordSchema,
} from "../../validator";

const EmailAndPasswordForm = ({
  registerContent,
  setRegisterContent,
  step,
  setStep,
}) => {
  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);

  // ININIT LOCAL STATES
  const [error, setError] = useState("");
  const [hide, setHide] = useState([]);
  const [loading, setLoading] = useState(false);

  const zaloRedirectUrl = `${window.location.origin}/user/register`;
  const isLength = registerContent.password.length >= 8 ? true : false;
  // LONG BỎ LOGIC
  const isUppercaseChar = /(?=.*[A-Z])(?=.*[a-z])/.test(
    registerContent.password
  );
  // LONG THÊM LOGIC REQUIRE ÍT NHẤT 1 SỐ
  const isNumber = /(?=.*[0-9])/.test(registerContent.password);
  const isLowercaseChar = /(?=.*[@$!%*#?&])/.test(registerContent.password);

  // FUNCTION DECLARATIONS
  const nextStep = async (e) => {
    e.preventDefault();

    // kiểm tra số điện thoại hợp lệ
    if (
      registerContent.role * 1 === 0 &&
      registerContent.phone_number.length !== 10 &&
      registerContent.phone_number.length !== 11
    ) {
      setError("phone");
      return;
    }

    // 1. Validate user credential
    const validEmailAndPassword =
      registerContent.role * 1 === 1
        ? emailAndPasswordSchema.validate({
            email: registerContent.email,
            password: registerContent.password,
            repeatPassword: registerContent.repeatPassword,
          })
        : phoneAndPasswordSchema.validate({
            phone_number: registerContent.phone_number,
            password: registerContent.password,
            repeatPassword: registerContent.repeatPassword,
          });

    const err = validEmailAndPassword.error;

    if (err) {
      setError(err.details[0].path[0]);
      return;
    }

    // 2. Reset error and call api
    setError("");
    let res;
    let payload;
    setLoading(true);
    if (registerContent.role * 1 === 1) {
      payload = {
        email: registerContent.email,
        role: registerContent.role,
      };
      res = await verifyEmail(payload);
    } else {
      res = await verifyPhone({ phone_number: registerContent.phone_number });
    }

    setLoading(false);

    if (res.status < 400) {
      setStep((prev) => prev + 1);
      return;
    }

    if (res.response.status === 403) {
      setError("phone*");
    } else {
      if (res.response.status === 409) {
        setError("email*");
      } else {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    }
  };

  function handleHide(key) {
    if (hide.includes(key)) {
      const updateHide = hide.filter((h) => h !== key);
      setHide(updateHide);
    } else {
      setHide([...hide, key]);
    }
  }

  function responseFacebook(res) {
    const { status, accessToken, id, email, name, birthday, gender } = res;
    if (status === "unknown") {
      toast.error(t("toast:er_41"));
      return;
    }
    // RETRIEVE DATA AND SAVE IT TO STATE
    let fetchedInfo = {};
    birthday && (fetchedInfo.dob = moment(birthday, "DD/MM/YYYY").toDate());
    gender &&
      (gender === "male" ? (fetchedInfo.gender = 1) : (fetchedInfo.gender = 0));
    name && (fetchedInfo.name = name);
    email && (fetchedInfo.email = email);

    setRegisterContent({
      ...registerContent,
      accessToken,
      userID: id,
      ...fetchedInfo,
    });
    setStep(3);
  }

  console.log(error);

  if (loading) return <SubLoader />;

  return (
    <>
      <Form onSubmit={nextStep} className="register-page__email-password-form">
        <FormGroup className="flex-box mb-4">
          {registerContent.role * 1 === 0 ? (
            <>
              <Label
                className="text-right mr-3 text-bold1 text-dark mb-0"
                for="phone"
              >
                Số điện thoại <span className="text-danger">*</span>
                {error === "phone" && (
                  <p className="py-1 text-right">
                    <ErrorHandler error="Số điện thoại không hợp lệ ! " />
                  </p>
                )}
                {error === "phone*" && (
                  <p className="py-1 text-right">
                    <ErrorHandler error={t("toast:er_76")} />
                  </p>
                )}
              </Label>
              <Input
                className="border-radius-2 flex-grow"
                type="number"
                placeholder="012-345-6789"
                id="phone"
                required
                value={registerContent.phone_number}
                onChange={(e) =>
                  setRegisterContent({
                    ...registerContent,
                    phone_number: e.target.value,
                  })
                }
              />
            </>
          ) : (
            <>
              <Label
                className="text-right mr-3 text-bold1 text-dark mb-0"
                for="email"
              >
                Email <span className="text-danger">*</span>
                {error === "email" && (
                  <p className="py-1 text-right">
                    <ErrorHandler error={t("toast:er_66")} />
                  </p>
                )}
                {error === "email*" && (
                  <p className="py-1 text-right">
                    <ErrorHandler error={t("toast:er_70")} />
                  </p>
                )}
              </Label>

              <Input
                className="border-radius-2 flex-grow"
                type="email"
                name="email"
                id="email"
                required
                value={registerContent.email}
                onChange={(e) =>
                  setRegisterContent({
                    ...registerContent,
                    email: e.target.value,
                  })
                }
              />
            </>
          )}
        </FormGroup>

        <FormGroup className="flex-box mb-2">
          <Label
            className="text-right mr-3 mb-0 text-bold1 text-dark"
            for="pasword"
          >
            {t("Sign-up-page:password")}
            <span className="text-danger">*</span>
            {error === "password" && (
              <p className="py-1 text-right">
                <ErrorHandler error={t("toast:er_77")} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2 cursor-pointer px-0 flex-grow">
            <Input
              className="border-radius-style-1 border-right-0"
              type={!hide.includes("password") ? "password" : "text"}
              name="pasword"
              id="pasword"
              required
              value={registerContent.password}
              onChange={(e) =>
                setRegisterContent({
                  ...registerContent,
                  password: e.target.value,
                })
              }
            />
            <InputGroupAddon
              onClick={() => handleHide("password")}
              addonType="append"
            >
              <InputGroupText className="bg-light border-left-0">
                <img
                  src={hide.includes("password") ? EyesIcon : SlashEyesIcon}
                  alt="password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <div className="password-validate mb-4">
          <PasswordCriteria
            isLength={isLength}
            isUppercaseChar={isUppercaseChar}
            isLowercaseChar={isLowercaseChar}
            isNumber={isNumber}
          />
        </div>

        <FormGroup className="flex-box mb-5">
          <Label
            className="text-right mr-3 mb-0 text-bold1"
            for="repeat-password"
          >
            {t("Sign-up-page:repeat-password")}
            {error === "repeatPassword" && (
              <p className="py-1 text-right">
                <ErrorHandler error={t("toast:er_78")} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2 cursor-pointer px-0 flex-grow">
            <Input
              className="border-radius-style-1 border-right-0"
              type={!hide.includes("repeat-password") ? "password" : "text"}
              name="repeat-password"
              id="repeat-password"
              required
              value={registerContent.repeatPassword}
              onChange={(e) =>
                setRegisterContent({
                  ...registerContent,
                  repeatPassword: e.target.value,
                })
              }
            />
            <InputGroupAddon
              onClick={() => handleHide("repeat-password")}
              addonType="append"
            >
              <InputGroupText className="bg-light border-left-0">
                <img
                  src={
                    hide.includes("repeat-password") ? EyesIcon : SlashEyesIcon
                  }
                  alt="password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <button type="submit" className="d-none"></button>

        <div className="mb-5 px-auto">
          <RegisterRedirect
            step={step}
            setStep={setStep}
            nextStep={
              registerContent.verify_code ? () => setStep(step + 1) : nextStep
            }
          />
        </div>

        <Oauth2
          title="hoặc đăng ký bằng"
          state={registerContent.role}
          redirectUrl={zaloRedirectUrl}
          responseFacebook={responseFacebook}
        />
      </Form>
    </>
  );
};

export default EmailAndPasswordForm;
