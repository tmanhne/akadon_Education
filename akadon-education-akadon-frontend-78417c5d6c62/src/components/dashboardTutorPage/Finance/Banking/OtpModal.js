import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { toast } from "react-toastify";

import OtpImg from "../../../../assets/images/otp-img.svg";
import { confirmOtp, getOtp } from "../../../../api";
import ErrorHandler from "../../../ErrorHandler";
import { useTranslation } from "react-i18next";

function OtpModal({ phone_number, setOtpModal }) {
  // LOCAL STATE DECLERATIONS
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  const {t} = useTranslation("payment");

  // SIDE EFFECTS
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((countdown) => {
        if (countdown > 0) {
          return countdown - 1;
        }
        return countdown;
      });

      if (countdown === 0) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    }, 1000);
  }, []);

  // FUNCTION DECLARATIONS
  async function handleSubmitOtp(e) {
    e.preventDefault();
    const payload = { verify_code: code };
    const res = await confirmOtp(payload);

    if (res.status < 400) {
      toast.success(t("payment:otp-success"));
      setOtpModal(false);
    } else if (res.response) {
      setError(t("payment:otp-error"));
    }
  }

  return (
    <>
      <div className="text-right py-3">
        <FontAwesomeIcon
          onClick={() => setOtpModal(false)}
          className="h4 mb-0 mr-3 text-grey"
          icon={["fal", "times"]}
        />
      </div>

      <div className="text-center mb-3">
        <img src={OtpImg} alt="otp" />
      </div>

      <Form onSubmit={handleSubmitOtp}>
        <FormGroup className="mb-5">
          <Label className="w-100 mb-4" htmlFor="name">
            <h4 className="text-bold1 text-center mb-3">
              {t("payment:otp-title")}
            </h4>
            <p className="mb-0 text-center">
              {t("payment:otp-field-1")} (********{phone_number.slice(-2)})
            </p>
            {error && (
              <p className="text-center">
                <ErrorHandler error={error} />
              </p>
            )}
          </Label>
          <InputGroup className="mb-2">
            <Input
              required
              type="text"
              placeholder={t("payment:otp-field-2")}
              id="name"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="bg-light btn">
                <div>
                  {countdown > 0 ? (
                    <>
                      <span className="text-grey">{t("payment:otp-field-3")} </span>
                      <span className="text-dark">({countdown}s)</span>
                    </>
                  ) : (
                    <span
                      onClick={() => getOtp({ phone_number })}
                      className="text-grey"
                    >
                      {t("payment:otp-field-3")}{" "}
                    </span>
                  )}
                </div>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <p className="text-grey text-small">
          {t("payment:otp-field-4")}
          </p>
        </FormGroup>

        <div className="center-box mb-4">
          <button type="submit" className="main-btn w-50">
          {t("payment:otp-field-5")}
          </button>
        </div>
      </Form>
    </>
  );
}

OtpModal.propTypes = {
  phone_number: PropTypes.string,
  setOtpModal: PropTypes.func,
};

export default OtpModal;
