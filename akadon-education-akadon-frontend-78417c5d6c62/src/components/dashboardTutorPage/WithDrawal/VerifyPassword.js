import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import EyesIcon from "../../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../../assets/icons/slash-eyes-icon.svg";
import { verifyPassword } from "../../../api";
import ErrorHandler from "../../ErrorHandler";
import SubLoader from "../../utils/SubLoader";

function VerifyPassword({ setPassword, password, setAuth }) {
  const { t } = useTranslation(["payment", "common"]);
  // LOCAL STATE DECLARATIONS
  const [error, setError] = useState("");
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // FUNCTION DECLARATIONS
  async function handleVerifyPassword(e) {
    e.preventDefault();
    if (password === "") {
      setError("Bạn chưa nhập mật khẩu !");
      return;
    }
    setError("");
    setLoading(true);
    const res = await verifyPassword({ password });
    setLoading(false);
    if (res.status < 400) {
      setAuth(true);
      return;
    } else if (res.response) {
      setError("Mật khẩu không đúng !");
    }
  }

  return (
    <div className="withdrawal mb-4 w-100 card-style border-radius-2 py-3 px-4 flex-grow">
      <h6 className="text-bold2 mb-12px">{t("payment:overview-2")}</h6>
      {loading ? (
        <SubLoader />
      ) : (
        <Form>
          <FormGroup className="mx-auto pt-5">
            <Label
              className="text-center px-4 mb-4 cursor-pointer"
              htmlFor="password"
            >
              <p className="mb-0">{t("payment:enter_password")}</p>
              {error && (
                <p className="text-center">
                  <ErrorHandler error={error} />
                </p>
              )}
            </Label>
            <InputGroup className="border-radius-2 mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="bg-light border-right-0 cursor-pointer">
                  <FontAwesomeIcon
                    className="text-grey"
                    icon={["fal", "lock-alt"]}
                  />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type={hide ? "password" : "text"}
                value={password}
                className="border-left-0 border-right-0 pl-0"
                placeholder={t("common:password")}
              />
              <InputGroupAddon
                onClick={() => setHide(!hide)}
                addonType="append"
              >
                <InputGroupText className="bg-light border-left-0 border-radius-style-2 cursor-pointer">
                  <img
                    src={hide ? SlashEyesIcon : EyesIcon}
                    alt="show hide passowrd"
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            <div className="center-box">
              <div
                onClick={history.goBack}
                className="cancel-btn pt-12px pb-12px w-50 mr-3"
              >
                {t("common:cancel")}
              </div>
              <button
                onClick={handleVerifyPassword}
                type="submit"
                className="main-btn pt-12px pb-12px w-50"
              >
                {t("common:accept")}
              </button>
            </div>
          </FormGroup>
        </Form>
      )}
    </div>
  );
}

VerifyPassword.propTypes = {
  setPassword: PropTypes.func,
  setAuth: PropTypes.func,
  password: PropTypes.string,
};

export default VerifyPassword;
