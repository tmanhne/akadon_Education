import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Container, Input } from "reactstrap";

import LanguageIconen from "../../../assets/images/language-english.png";
import LanguageIcon from "../../../assets/images/language-vietnamese.png";
import Logo from "../../../assets/icons/logo-ld-new.svg";
import StudentReqBox from "../LdStudent/StudentReqBox";

function Header({ dispatch, data, user }) {
  const defaultLanguage = localStorage.getItem("language");
  const [hideMenu, setHideMenu] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage || "vi");

  const { t } = useTranslation(["landing-page", "common"]);

  console.log(window.dataLayer);

  return (
    <Container className="header-blocks position-relative px-0" fluid={true}>
      {/* Mobile */}
      <div
        className={`small-menu position-fixed ${hideMenu && "full-menu"}`}
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
            <a
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              href="#Trangchu"
              alt="home"
            >
              {t("nav_home")}
            </a>
          </li>
          <li className="hover">
            <a
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              href="#tinhnang"
              alt="feature"
            >
              {t("nav_about_us")}
            </a>
          </li>
          <li className="hover">
            <a
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              href="#chiphi"
              alt="cost"
            >
              {t("nav_cost")}
            </a>
          </li>
          <li className="hover">
            <a
              className="d-inline-block h-100 w-100 text-decoration-none text-light text-bold2 mb-3 pl-3"
              href="#faq"
              alt="Contact"
            >
              {t("nav_faq")}
            </a>
          </li>
        </ul>
      </div>

      {/* Desktop */}
      <Link to="/">
        <div className="header-blocks__logo">
          <div className="logo-container">
            <div className="logo center-box">
              <img src={Logo} alt="logo" />
            </div>
          </div>
        </div>
      </Link>

      <div className="header-blocks__navbar">
        <ul className="flex-box justify-content-between">
          <li
            onClick={() => setHideMenu(!hideMenu)}
            className="menu-icon d-none cursor-pointer h4 mb-0"
          >
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </li>
          <li className="empty-item" style={{ width: "180px" }}></li>
          <li className="hover hidden-item">
            <a
              className="d-inline-block h-100 w-100"
              href="#Trangchu"
              alt="home"
            >
              {t("nav_home")}
            </a>
          </li>
          <li className="hover hidden-item">
            <a
              className="d-inline-block h-100 w-100"
              href="#tinhnang"
              alt="feature"
            >
              {t("nav_about_us")}
            </a>
          </li>
          <li className="hover hidden-item">
            <a className="d-inline-block h-100 w-100" href="#chiphi" alt="cost">
              {t("nav_cost")}
            </a>
          </li>
          <li className="hover hidden-item">
            <a className="d-inline-block h-100 w-100" href="#faq" alt="Contact">
              {t("nav_faq")}
            </a>
          </li>
          <li className="language-box border px-2 border-radius-2 flex-box mr-2">
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
              className="border-0 text-dark bg-light cursor-pointer pr-4"
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
            <NavLink className="login-btn" to="/user/login">
              {t("nav_login_btn")}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header-blocks__content" id="Trangchu">
        <div className="cta-box flex-box justify-content-between flex-wrap mx-auto">
          <div className="position-relative ">
            {data.title}
            <p>{data.content}</p>

            <Link to="/user/register" className="text-decoration-none">
              <button
                className={` ${
                  user === "tutor" && "tutorcolor"
                } mainl-btn text-uppercase`}
              >
                {data.btnregist}
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="icon-regis"
                />
              </button>
            </Link>
          </div>
          <div className="position-relative">
            <img src={data.pic} alt="img" />
            <div className="position-absolute flex-box flex-column cta-box__content">
              <h2 className="font-weight-bold text-hightlight">
                {data.number}
              </h2>
              <p className="text-dark">{data.text}</p>
              {user === "student" ? (
                <StudentReqBox t={t} data={data.btnlogin} />
              ) : (
                <Link to="/user/login" className="text-decoration-none">
                  <button
                    className={` ${
                      user === "tutor" && "tutorcolor"
                    } mainl-btn  text-uppercase`}
                  >
                    {data.btnlogin}

                    <FontAwesomeIcon
                      icon={["fas", "arrow-right"]}
                      className="icon-login"
                    />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default connect(null, null)(Header);
