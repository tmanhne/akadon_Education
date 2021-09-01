import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useTranslation } from "react-i18next";

import { createPassword } from "../../api";
import EyesIcon from "../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../assets/icons/slash-eyes-icon.svg";
import ButtonBox from "./ButtonBox";
import ErrorHandler from "../ErrorHandler";
import PasswordCriteria from "./PasswordCriteria";
import { toast } from "react-toastify";

function PasswordInput({ password, setPassword }) {
  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);
  const initContent = {
    password: "",
    repeatPassword: "",
  };
  // LOCAL STATE DECLARATIONS
  const [hide, setHide] = useState([]);
  const [content, setContent] = useState(initContent);
  const [error, settError] = useState({ path: "", message: "" });
  const { step, code } = password;

  const isLength = content.password.length >= 8 ? true : false;
  const isUppercaseChar = /(?=.*[A-Z])/.test(content.password);
  const isLowercaseChar = /(?=.*[a-z])(?=.*[@$!%*#?&])/.test(content.password);
  // LONG THÊM LOGIC REQUIRE ÍT NHẤT 1 SỐ
  const isNumber = /(?=.*[0-9])/.test(content.password);

  // FUNCTION DECLARATIONS
  function handleHide(key) {
    if (hide.includes(key)) {
      const updateHide = hide.filter((h) => h !== key);
      setHide(updateHide);
    } else {
      setHide([...hide, key]);
    }
  }

  async function submitPassword(e) {
    e.preventDefault();
    // CHECK USER INPUT
    if (
      isLength === false ||
      isUppercaseChar === false ||
      isLowercaseChar === false
    ) {
      settError({ path: "password", message: "Mật khẩu không hợp lệ !" });
      return;
    }
    if (content.password !== content.repeatPassword) {
      settError({ path: "repeat-password", message: "Mật khẩu không khớp !" });
      return;
    }
    // POST NEW PASSWORD
    settError({ path: "" });
    const payload = {
      code,
      new_password: content.password,
    };
    const res = await createPassword(payload);
    if (res < 400) {
      setStep(3);
      return;
    }
    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  function setStep(step) {
    setPassword({ ...password, step });
  }

  return (
    <>
      <div className="forget-password__password-input">
        <FormGroup className="flex-box mb-12px">
          <Label
            className="mb-0 text-dark text-bold1 text-right mr-3"
            htmlFor="password"
          >
            {t("Sign-up-page:create-password-new")}
            {error.path === "password" && (
              <p className="mb-0 text-center">
                <ErrorHandler error={error.message} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2 cursor-pointer">
            <Input
              placeholder={t("Sign-up-page:create-password-new")}
              className="border-right-0"
              type={`${hide.includes("password") ? "text" : "password"}`}
              id="password"
              onChange={(e) =>
                setContent({ ...content, password: e.target.value })
              }
              value={content.password}
            />
            <InputGroupAddon
              onClick={() => handleHide("password")}
              addonType="append"
            >
              <InputGroupText>
                <img
                  src={hide.includes("password") ? EyesIcon : SlashEyesIcon}
                  alt="password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <div className="margin-box mb-4">
          <PasswordCriteria
            isLength={isLength}
            isUppercaseChar={isUppercaseChar}
            isLowercaseChar={isLowercaseChar}
            isNumber={isNumber}
          />
        </div>

        <FormGroup className="flex-box mb-4">
          <Label
            className="mb-0 text-dark text-bold1 text-right mr-3"
            htmlFor="repeat-password"
          >
            {t("Sign-up-page:create-password-repeat")}
            {error.path === "repeat-password" && (
              <p className="mb-0 text-center">
                <ErrorHandler error={error.message} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2 cursor-pointer">
            <Input
              placeholder={t("Sign-up-page:create-password-repeat")}
              className="border-right-0"
              type={`${hide.includes("repeat-password") ? "text" : "password"}`}
              id="repeat-password"
              onChange={(e) =>
                setContent({ ...content, repeatPassword: e.target.value })
              }
              value={content.repeatPassword}
            />
            <InputGroupAddon
              onClick={() => handleHide("repeat-password")}
              addonType="append"
            >
              <InputGroupText>
                <img
                  src={
                    hide.includes("repeat-password") ? EyesIcon : SlashEyesIcon
                  }
                  alt="visible password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </div>
      <div className="mt-5">
        <ButtonBox step={step} setStep={setStep} handleNext={submitPassword} />
      </div>
    </>
  );
}

PasswordInput.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  code: PropTypes.string,
};

export default PasswordInput;
