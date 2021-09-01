import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label, Input, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { userSettings, confirmPhoneNumber } from "../../../api";
import ErrorHandler from "../../ErrorHandler";
import { useTranslation } from "react-i18next";
function VerifyCode({ phone_number, setModal }) {
  const { t } = useTranslation("toast");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  async function reSendCode() {
    const res = await userSettings({ phone_number });
    if (res.status < 400) {
      toast.success("Success !");
    } else if (res.response) {
      toast.error(`Error no-${res.response.status}`);
    }
  }

  async function handleVerifyCode() {
    if (!code) {
      setError("Please enter code !");
      return;
    }
    const payload = {
      phone_number,
      verify_code: code,
    };
    const res = await confirmPhoneNumber(payload);
    if (res.status < 400) {
      setModal(false);
      toast.success("Add success !");
      return;
    }

    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
      setError("Invalid code !");
      return;
    }
  }

  return (
    <div className="card-style p-0">
      <div className="flex-box mb-4 p-3 border-bottom">
        <h4 className="text-bold2 mb-0 text-center flex-grow">Enter code</h4>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
        />
      </div>

      <div style={{ maxWidth: "450px" }} className="mx-auto">
        <div className="text-dark mb-4 text-center">
          <span>We have just sent a code to your phone number </span>
          <span className="text-bold1">{phone_number}</span>
        </div>

        <FormGroup className="mb-12px flex-box align-items-center">
          <Label
            htmlFor="code"
            className="mb-12px text-dark text-bold1 cursor-pointer text-nowrap mr-2 mb-0"
          >
            Enter code
            {error && (
              <p className="mb-0 text-center">
                <ErrorHandler error={error} />
              </p>
            )}
          </Label>
          <Input
            id="code"
            className="border-radius-2"
            placeholder="Enter code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormGroup>

        <div className="text-right mb-5">
          <span className="text-grey text-small">
            Have not received the code?{" "}
          </span>
          <span
            onClick={reSendCode}
            className="btn cursor-pointer text-dark p-0"
          >
            Re-send code
          </span>
        </div>

        <div className="flex-box mb-5">
          <div onClick={() => setModal(false)} className="cancel-btn mr-3 w-50">
            Cancel
          </div>
          <div onClick={handleVerifyCode} className="main-btn flex-grow">
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

VerifyCode.propTypes = {
  phone_number: PropTypes.string,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
};

export default VerifyCode;
