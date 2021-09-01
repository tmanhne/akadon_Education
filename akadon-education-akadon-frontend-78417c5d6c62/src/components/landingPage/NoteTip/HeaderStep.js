import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { Container, Input } from "reactstrap";
import LanguageIconen from "../../../assets/images/language-english.png";
import LanguageIcon from "../../../assets/images/language-vietnamese.png";

import Logo from "../../../assets/images/logoTransparent.svg";
import "./index.scss";

function Header({ t, dispatch }) {
  const defaultLanguage = localStorage.getItem("language");
  const [hideMenu, setHideMenu] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage || "vi");

  const handTop = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <Container
      className="header-block-step position-relative px-0 comon"
      fluid={true}
    >
      <div
        className={`small-menu position-absolute ${hideMenu && "full-menu"}`}
      >
        <ul className="list-unstyled pt-3">
          <li className="hover text-right pr-3">
            <FontAwesomeIcon
              className="text-light h4 mb-0"
              onClick={() => setHideMenu(false)}
              icon={["fas", "times"]}
            />
          </li>
          <li className="hover">
            <NavLink
              activeStyle={{ color: "black" }}
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              to="/"
              alt="home"
            >
              {t("nav_home")}
            </NavLink>
          </li>
          <li className="hover">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              to="/"
              alt="feature"
            >
              {t("nav_about_us")}
            </NavLink>
          </li>
          <li className="hover">
            <span
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              alt="Contact"
              onClick={handTop}
            >
              {t("nav_contact")}
            </span>
          </li>
          <li className="hover">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              to="/cost"
              alt="cost"
            >
              {t("nav_cost")}
            </NavLink>
          </li>

          <li className="hover">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              to="/faq"
              alt="Contact"
            >
              {t("nav_faq")}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header-block__logo">
        <div className="logo-container">
          <div className="logo center-box">
            <img src={Logo} alt="logo" />
          </div>
        </div>
      </div>

      <div className="header-block__navbar">
        <ul className="flex-box justify-content-between">
          <li
            onClick={() => setHideMenu(!hideMenu)}
            className="menu-icon d-none cursor-pointer h4 mb-0"
          >
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </li>
          <li className="empty-item" style={{ width: "180px" }}></li>
          <li className="hover hidden-item">
            <NavLink
              activeStyle={{ color: "black" }}
              className="d-inline-block h-100 w-100"
              to="/"
              alt="home"
            >
              {t("nav_home")}
            </NavLink>
          </li>
          <li className="hover hidden-item">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100"
              to="/"
              alt="About"
            >
              {t("nav_about_us")}
            </NavLink>
          </li>
          <li className="hover hidden-item">
            <span
              className="d-inline-block h-100 w-100 text-bold2"
              style={{ fontSize: "16px" }}
              alt="Contact"
              onClick={handTop}
            >
              {t("nav_contact")}
            </span>
          </li>
          <li className="hover hidden-item">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100"
              to="/cost"
              alt="cost"
            >
              {t("nav_cost")}
            </NavLink>
          </li>
          <li className="hover hidden-item">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="d-inline-block h-100 w-100"
              to="/faq"
              alt="Contact"
            >
              {t("nav_faq")}
            </NavLink>
          </li>
          <li className="language-box border pl-2 border-radius-2 flex-box mr-2">
            {language === "vi" ? (
              <img src={LanguageIcon} alt="language icon" />
            ) : (
              <img
                src={LanguageIconen}
                width={36}
                height={24}
                alt="language icon"
              />
            )}

            <Input
              className="border-0 text-dark bg-light cursor-pointer pr-3"
              type="select"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                dispatch({ type: "SET_LANGUAGE", language: e.target.value });
                localStorage.setItem("language", e.target.value);
              }}
            >
              <option value="vi">{t("landing-page:nav_languages_vi")}</option>
              <option value="en">{t("landing-page:nav_languages_en")}</option>
            </Input>
          </li>
          <li className="text-nowrap ">
            <NavLink
              activeStyle={{ color: "#0367B4" }}
              className="login-btn "
              to="/user/login"
            >
              {t("nav_login_btn")}
            </NavLink>
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default connect(null, null)(Header);
