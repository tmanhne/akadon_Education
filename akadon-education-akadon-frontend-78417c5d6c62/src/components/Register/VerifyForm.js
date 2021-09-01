import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useTranslation } from "react-i18next";

import { confirmCode, verifyEmail, confirmPhone, verifyPhone } from "../../api";
import ErrorHandler from "../ErrorHandler";
import RegisterRedirect from "./RegisterRedirect";

const VerifyForm = ({ step, setStep, registerContent, setRegisterContent }) => {
  const { t } = useTranslation(["Sign-up-page", "common","toast"]);
  // INIT LOCAL STATES
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  // FUNCTION DECLARATIONS

  let res;
  let payload;

  const nextStep = async () => {
    // 1. CHECK CODE IS VALID
    // 2. RESET ERR, CALL API
    // 3. IMPLEMENT API RESPONSE
    if (code.length < 6) {
      setErr("Mã code không hợp lệ !");
      return;
    }

    setErr("");

    if (registerContent.role * 1 === 1) {
      payload = {
        verify_code: code,
        email: registerContent.email,
      };
      res = await confirmCode(payload);
    } else {
      payload = {
        code: code,
        phone_number: registerContent.phone_number,
      };
      res = await confirmPhone(payload);
    }

    if (res.status < 400) {
      setRegisterContent({ ...registerContent, verify_code: code });
      setStep(step + 1);
    } else {
      setErr("Mã code không hợp lệ !");
    }
  };
  const getCode = async () => {
    if (registerContent.role * 1 === 1) {
      payload = {
        email: registerContent.email,
        role: registerContent.role,
      };
      res = await verifyEmail(payload);
    } else {
      res = await verifyPhone({ phone_number: registerContent.phone_number });
    }
    if (res.status < 400) {
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  };
  return (
    <>
      <Form className="register-page__verify">
        <p className="text-grey text-center font-italic text-wrap mb-4">
          {t("Sign-up-page:check-mail-message")}
        </p>
        <FormGroup className="flex-box mb-12px">
          <Label for="verify-code" className="text-nowrap">
            {t("Sign-up-page:enter-verify-code")}

            {err && (
              <p className="text-small text-right text-danger">
                <ErrorHandler error={err} />
              </p>
            )}
          </Label>
          <Input
            className="border-radius-2 ml-3"
            type="text"
            placeholder={t("Sign-up-page:enter-verify-code")}
            id="verify-code"
            required
            value={code ? code : registerContent.verify_code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormGroup>
        <div className="text-right text-small mb-5">
          <span className="text-grey">
            {t("Sign-up-page:not-recieved-code")}
          </span>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={getCode}
            className="text-dark"
          >
            {t("Sign-up-page:resend-code")}
          </span>
        </div>
      </Form>
      <RegisterRedirect
        step={step}
        setStep={setStep}
        nextStep={
          registerContent.verify_code ? () => setStep(step + 1) : nextStep
        }
      />
    </>
  );
};

export default VerifyForm;
