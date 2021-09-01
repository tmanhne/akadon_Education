import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Joi from "@hapi/joi";

import { forgotPassword } from "../../api";
import ErrorHandler from "../ErrorHandler";
import Goback from "../utils/Goback";
import {SubLoader} from "../utils"

function EmailInput({ password, setPassword }) {
  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { phone, email } = password;

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!phone && !email) {
      setError(t("toast:er_69"));
      return;
    }

    if (email && !phone) {
      const validEmail = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(email);
      if (validEmail.error) {
        setError(t("toast:er_68"));
        return;
      }
    }

    if (phone && !email) {
      if (phone.length < 5 || isNaN(phone)) {
        setError(t("toast:er_67"));
        return;
      }
    }

    // RESET ERROR AND MAKE AN API CALL
    setError("");
    const payload = { email, phone };

    setLoading(true)
    const result = await forgotPassword(payload);
    setLoading(false);

    if (result.status === 204) {
      toast.success(t("toast:sucess_28"));
      setPassword({ ...password, step: 1 });
      return;
    }
    if (result.response) {
      if (result.response.status === 404) {
        setError(t("toast:er_66"));
        return;
      }
    }
  };

  function handleChange(e) {
    const { value } = e.target;
    if (isNaN(value)) {
      setPassword({ ...password, email: value, phone: null });
    } else {
      setPassword({ ...password, phone: value, email: null });
    }
  }

  if (loading) return <SubLoader />
  return (
    <>
      <FormGroup className="forget-password__email-input flex-box align-items-start">
        <Label for="email" className="mr-3 mb-0 mt-3 cursor-pointer">
          Email*{error && <ErrorHandler error={error} />}
        </Label>
        <div>
          <Input
            type="text"
            id="email"
            required
            value={email || phone}
            onChange={(e) => handleChange(e)}
          />
          <p className="font-italic text-small mt-2 mb-4">
            {t("Sign-up-page:check-mail-message")}
          </p>
          <div
            onClick={sendEmail}
            className="main-btn flex-box font-weight-bold py-0 px-3 ml-auto"
          >
            <p className="flex-grow mb-0 mr-3">{t("common:next-btn")}</p>
            <FontAwesomeIcon icon={["fal", "arrow-right"]} />
          </div>
        </div>
      </FormGroup>
      <Goback />
    </>
  );
}

EmailInput.propTypes = { sendEmail: PropTypes.func };

export default EmailInput;
