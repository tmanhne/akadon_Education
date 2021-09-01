import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Logo from "../../assets/images/logoTransparent.png";

export default function Footer({ t }) {
  return (
    <Container className="footer-block px-0" fluid={true}>
      <div className="footer-block__contact-wrapper">
        <div className="footer-block__content px-4 flex-box mx-auto text-light">
          <div className="footer-block-1 w-50">
            <img width={310} className="mb-4" src={Logo} alt="logo" />
            <ul className="px-0 list-unstyled">
              <li className=" text-bold2 pb-4">{t("akadon_name")}</li>
              <li className=" pb-4">{t("akadon_address")}</li>
              <li>{t("company_no")}</li>
              <li className=" py-4">{t("company_owner")}</li>
              <li className=" pb-3">{t("position")}</li>
            </ul>
          </div>

          <ul className="w-100 subnar list-unstyled  text-bold2 justify-content-around">
            <li>
              <a href="#Trangchu">{t("landing-page:nav_home")}</a>
            </li>
            <li>
              <a href="#tinhnang">{t("landing-page:nav_about_us")}</a>
            </li>
            <li>
              {t("nav_contact")}
              <ul className="subnar__content list-unstyled font-weight-normal">
                <li>Email: digital.marketing@akadon.edu.vn</li>
                <li>Hotline: 085 883 6632</li>
              </ul>
            </li>
            <li>
              <a
                className="text-decoration-none text-bold2"
                href="#chiphi"
                alt="cost"
              >
                {t("landing-page:nav_cost")}
              </a>
            </li>
            <li>
              <a href="#faq">{t("landing-page:nav_faq")}</a>
            </li>
          </ul>
        </div>

        <ul className="text-light footer-block__copyright p-4 list-unstyled justify-content-between d-flex mb-0 mx-auto">
          <li>
            <Link to="/">{t("security")}</Link>
          </li>
          <li>
            <Link to="/terms-of-service">{t("poliicy")}</Link>
          </li>
          <li className="copyright">
            2021 Akadon Education. All Rights Reserved.
          </li>
        </ul>
      </div>
    </Container>
  );
}
