import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { userSettings } from "../../api";
import EyesIcon from "../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../assets/icons/slash-eyes-icon.svg";
import UserBox from "../utils/UserBox";
import ErrorHandler from "../ErrorHandler";
import SubLoader from "../utils/SubLoader";
import { useTranslation } from "react-i18next";

function Password({ user }) {
  // PROPS EXTRACT
  const { avatar, name, priority, rating } = user;
  const { t } = useTranslation(["setting"]);

  // INIT LOCAL STATE
  const initContent = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  // LOCAL STATES DECLARATIONS
  const [content, setContent] = useState(initContent);
  const [hide, setHide] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ path: "", message: "" });

  // FUNCTION DECLARATIONS AND DATA IMPLEMENTATION
  function handleHide(key) {
    if (hide.includes(key)) {
      const updateHide = hide.filter((h) => h !== key);
      setHide(updateHide);
    } else {
      setHide([...hide, key]);
    }
  }
  const isLength = content.newPassword.length >= 8 ? true : false;
  const isUppercaseChar = /(?=.*[A-Z])/.test(content.newPassword);
  const isLowercaseChar = /(?=.*[a-z])(?=.*[@$!%*#?&])/.test(
    content.newPassword
  );

  const isChange =
    isLength &&
    isUppercaseChar &&
    isLowercaseChar &&
    content.repeatPassword === content.newPassword;

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!isChange) return;
    if (content.currentPassword.trim() === "") {
      setError({ path: "currentPassword", message: t("password-err-1") });
      return;
    }
    if (!isLength || !isUppercaseChar || !isLowercaseChar) {
      setError({ path: "newPassword", message: t("password-err-2") });
      return;
    }
    if (content.newPassword !== content.repeatPassword) {
      setError({ path: "repeatPassword", message: t("password-err-3") });
      return;
    }
    const payload = {
      old_password: content.currentPassword,
      new_password: content.newPassword,
      re_new_password: content.repeatPassword,
    };
    setLoading(true);
    const res = await userSettings(payload);
    setLoading(false);
    if (res.status < 400) {
      toast.success(t("password-success"));
      setContent(initContent);
    } else if (res.response) {
      if (res.response.status === 403) {
        setError({ path: "currentPassword", message: t("password-err-1") });
        return;
      }
      toast.error(`Error no-${res.response.status}`);
    }
  }

  if (loading) {
    return <SubLoader />;
  }

  return (
    <div className="setting-page__password">
      <div className="ml-5 mb-4">
        <UserBox
          width={64}
          height={64}
          avatar={avatar}
          name={name}
          rate={rating}
          priority={priority}
        />
      </div>
      <Form>
        <FormGroup className="flex-box mb-4">
          <Label
            className="mb-0 text-dark text-bold1 text-right mr-3"
            htmlFor="current-password"
          >
            {t("password-1")}
            {error.path === "currentPassword" && (
              <p className="text-center mb-0">
                <ErrorHandler error={error.message} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2">
            <Input
              placeholder={t("password-2")}
              className="border-right-0"
              type={`${
                hide.includes("current-password") ? "text" : "password"
              }`}
              id="current-password"
              onChange={(e) =>
                setContent({ ...content, currentPassword: e.target.value })
              }
              value={content.currentPassword}
            />
            <InputGroupAddon
              onClick={() => handleHide("current-password")}
              addonType="append"
            >
              <InputGroupText>
                <img
                  src={
                    hide.includes("current-password") ? EyesIcon : SlashEyesIcon
                  }
                  alt="visible password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <FormGroup className="flex-box mb-2">
          <Label
            className="mb-0 text-dark text-bold1 text-right mr-3"
            htmlFor="new-password"
          >
            {t("password-3")}
            {error.path === "newPassword" && (
              <p className="text-center mb-0">
                <ErrorHandler error={error.message} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2">
            <Input
              placeholder={t("password-4")}
              className="border-right-0"
              type={`${hide.includes("new-password") ? "text" : "password"}`}
              id="new-password"
              onChange={(e) =>
                setContent({ ...content, newPassword: e.target.value })
              }
              value={content.newPassword}
            />
            <InputGroupAddon
              onClick={() => handleHide("new-password")}
              addonType="append"
            >
              <InputGroupText>
                <img
                  src={hide.includes("new-password") ? EyesIcon : SlashEyesIcon}
                  alt="visible password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <div className="margin-box mb-4">
          <div className={`flex-box align-items-center`}>
            <FontAwesomeIcon
              className={`${isLength ? "text-hightlight3" : "text-grey"}`}
              icon={["fal", "check-circle"]}
            />
            <span
              className={`text-grey ml-2 ${
                isLength ? "text-dark" : "text-grey"
              }`}
            >
              {t("password-5")}
            </span>
          </div>
          <div className={`flex-box align-items-center text-grey`}>
            <FontAwesomeIcon
              className={`${
                isUppercaseChar ? "text-hightlight3" : "text-grey"
              }`}
              icon={["fal", "check-circle"]}
            />
            <span
              className={`text-grey ml-2 ${
                isUppercaseChar ? "text-dark" : "text-grey"
              }`}
            >
              {t("password-6")}
            </span>
          </div>
          <div className={`flex-box align-items-center text-grey`}>
            <FontAwesomeIcon
              className={`${
                isLowercaseChar ? "text-hightlight3" : "text-grey"
              }`}
              icon={["fal", "check-circle"]}
            />
            <span
              className={`text-grey ml-2 ${
                isLowercaseChar ? "text-dark" : "text-grey"
              }`}
            >
              {t("password-7")}
            </span>
          </div>
        </div>

        <FormGroup className="flex-box mb-4">
          <Label
            className="mb-0 text-dark text-bold1 text-right mr-3"
            htmlFor="repeat-password"
          >
            {t("password-8")}
            {error.path === "repeatPassword" && (
              <p className="text-center mb-0">
                <ErrorHandler error={error.message} />
              </p>
            )}
          </Label>
          <InputGroup className="border-radius-2">
            <Input
              placeholder={t("password-9")}
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

        <div className="margin-box">
          <div
            onClick={handleChangePassword}
            className={`main-btn d-inline-block px-4 mb-4 ${
              !isChange && "disable-overlay"
            }`}
          >
            {t("password-10")}
          </div>
          <Link
            className="d-block text-bold2 text-hightlight1"
            to="/user/forget-password"
          >
            {t("password-11")}
          </Link>
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return { user: user.info };
};

Password.propTypes = { user: PropTypes.object };

export default connect(mapStateToProps, null)(Password);
