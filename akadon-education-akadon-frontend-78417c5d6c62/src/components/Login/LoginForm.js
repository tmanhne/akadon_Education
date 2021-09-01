import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import ErrorHandler from "../ErrorHandler";
import EyesIcon from "../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../assets/icons/slash-eyes-icon.svg";
import Oauth2 from "./Oauth2";
function LoginForm({
  loginCredentials,
  setLoginCredentials,
  err,
  sagaError,
  login,
  setStep,
  remember,
  setRemember,
  role,
  loginRequest,
}) {
  const [hide, setHide] = useState(true);
  const { t } = useTranslation(["Sign-up-page", "common", "toast"]);
  const history = useHistory();
  const zaloRedirectUrl = `${window.location.origin}/user/login`;

  // SIDE EFFECTS
  useEffect(() => {
    if (sagaError === "userDoesNotExist") {
      toast.error(t("toast:er_35"));
      history.push("/user/register");
    }
  }, [sagaError]);

  // FUNCTION DECLARATION
  function responseFacebook(res) {
    const { status, accessToken, id } = res;
    if (status === "unknown") {
      toast.error(t("toast:er_36"));
      return;
    }
    loginRequest(null, null, role, null, null, accessToken, id);
  }

  return (
    <Form className="login-form h-100">
      <div
        className="text-grey d-inline-block cursor-pointer mb-4"
        onClick={() => setStep(1)}
      >
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="text-bold1 ml-3">Quay lại</span>
      </div>

      <FormGroup>
        <Label for="email" className="mr-3">
          Email / số điện thoại
        </Label>
        {err === "email" && (
          <ErrorHandler error="(Email không đúng định dạng hoặc số điện thoại)" />
        )}
        <Input
          className="border-radius-2"
          id="email"
          placeholder="Email"
          required
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials({ ...loginCredentials, email: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">
          {t("Sign-up-page:password")}
          {err === "password" && (
            <ErrorHandler error=" (Mật khẩu không hợp lệ !)" />
          )}
        </Label>
        <InputGroup className="border-radius">
          <Input
            className="border-right-0"
            type={hide ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Nhập mật khẩu"
            required
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
          />
          <InputGroupAddon onClick={() => setHide(!hide)} addonType="append">
            <InputGroupText className="cursor-pointer bg-light border-left-0">
              <img
                src={!hide ? EyesIcon : SlashEyesIcon}
                alt="visible password"
              />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>

      <FormGroup className="w-100 pl-3">
        <Input
          style={{ marginTop: "2px" }}
          type="checkbox"
          id="remember-credentials"
          defaultChecked={remember}
          value={remember}
          onChange={() => setRemember(!remember)}
        />
        <Label className="mb-0" htmlFor="remember-credentials">
          Ghi nhớ tài khoản
        </Label>
      </FormGroup>

      <p className="text-center my-0">
        <ErrorHandler error={sagaError} />
      </p>

      <button
        onClick={login}
        className="main-btn-new login-btn w-100 mb-4 py-0 px-3"
      >
        <span className="h4  mb-0">{t("Sign-up-page:login-btn")}</span>
        <FontAwesomeIcon icon={["fas", "arrow-right"]} className="btn-arrow" />
      </button>

      <div className="text-center mb-4">
        <Link className="text-hightlight1" to="/user/forget-password">
          {t("Sign-up-page:question-forget")}
        </Link>
      </div>

      <Oauth2
        title="hoặc đăng nhập bằng"
        state={role}
        redirectUrl={zaloRedirectUrl}
        responseFacebook={responseFacebook}
      />
    </Form>
  );
}

LoginForm.propTypes = {
  loginCredentials: PropTypes.object,
  setLoginCredentials: PropTypes.func,
};

export default LoginForm;
