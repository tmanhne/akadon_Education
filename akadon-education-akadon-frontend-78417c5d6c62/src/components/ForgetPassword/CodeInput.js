import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { forgotPassword, confirmCode } from "../../api";
import ButtonBox from "./ButtonBox";
import ErrorHandler from "../ErrorHandler";

function CodeInput({ password, setPassword }) {
  const [error, setError] = useState("");
  const [delayTime, setDelayTime] = useState();
  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);
  const { phone, email, code, step } = password;

  async function reSendEmail() {
    if (delayTime && moment().diff(delayTime, "seconds") < 0) {
      toast.error("Vui lòng thử lại sau 1 phút !");
      return;
    } else {
      const delay = moment().add(1, "minutes");
      setDelayTime(delay);
    }
    const payload = { email, phone };
    const res = await forgotPassword(payload);
    if (res.status < 400) {
      toast.success("Gửi yêu cầu thành công !");
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  async function handleConfirmCode(e) {
    e.preventDefault();
    // CHECK INVALID CODE
    if (!code) {
      setError("Mã không hợp lệ !");
      return;
    }
    // POST A CODE
    const payload = {
      email,
      phone,
      verify_code: code,
    };
    const res = await confirmCode(payload);
    if (res.status < 400) {
      toast.success("Gửi mã thành công !");
      setPassword({ ...password, step: 2 });
      return;
    }
    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      setError("Mã không đúng !");
    }
  }

  function setStep(step) {
    setPassword({ ...password, step });
  }
  return (
    <>
      <FormGroup className="forget-password__code-input flex-box align-items-start">
        <Label for="code" className="mr-3 mb-0 text-nowrap mt-3 cursor-pointer">
          {t("Sign-up-page:enter-verify-code")}
          {error && (
            <p className="text-center mb-0">
              <ErrorHandler error={error} />
            </p>
          )}
        </Label>
        <div>
          <Input
            type="text"
            id="code"
            required
            value={code}
            onChange={(e) => setPassword({ ...password, code: e.target.value })}
          />
          <div className="text-small text-grey mt-12px">
            <span>{t("Sign-up-page:not-recieved-code")}</span>
            <span
              onClick={reSendEmail}
              className="cursor-pointer text-dark btn-link"
            >
              {t("Sign-up-page:resend-code")}
            </span>
          </div>
        </div>
      </FormGroup>
      <div className="mt-5">
        <ButtonBox
          step={step}
          setStep={setStep}
          handleNext={handleConfirmCode}
        />
      </div>
    </>
  );
}

CodeInput.propTypes = { setStep: PropTypes.func };

export default CodeInput;
