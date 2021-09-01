// Author LONG
import { useTranslation, Trans } from "react-i18next";
import React from "react";
import { connect } from "react-redux";

import pic from "../../assets/images/Feature_head.svg";
import pic1 from "../../assets/images/Feature1.svg";
import pic1_2 from "../../assets/images/Feature1_2.svg";
import pic2 from "../../assets/images/Feature2.svg";
import pic2_2 from "../../assets/images/Feature2_2.svg";
import pic3 from "../../assets/images/Feature3.svg";
import pic3_2 from "../../assets/images/Feature3_2.svg";
import pic4 from "../../assets/images/Feature4.svg";
import pic4_2 from "../../assets/images/Feature4_2.svg";
import Line1 from "../../assets/images/Line1.svg";
import Line2 from "../../assets/images/Line2.svg";
import Line3 from "../../assets/images/Line3.svg";

import icon from "../../assets/icons/landfeatureexchange.svg";
import icon1 from "../../assets/icons/landfeaturechorono.svg";
import icon2 from "../../assets/icons/landfeaturelaptop.svg";
import icon3 from "../../assets/icons/landfeatureconect.svg";

import Footer from "../landingPage/Footer";
import FeatureBot from "./FeatureBot";
import HeaderStep from "../landingPage/NoteTip/HeaderStep";
import "./index.scss";

function FeaturesPage({ language }) {
  const { t } = useTranslation("landing-page");
  const contentbot = [
    {
      icon: icon,
      title: t("block_6_title_7"),
      content: t("block_6_text_7"),
    },
    {
      icon: icon1,
      title: t("block_6_title_8"),
      content: t("block_6_text_8"),
    },
    {
      icon: icon2,
      title: t("block_6_title_9"),
      content: t("block_6_text_9"),
    },
  ];
  return (
    <>
      <HeaderStep t={t} />
      <div className="d-flex flex-column pb-5 pt-5 main">
        <div className="feature-content ">
          <div className="feature-left">
            <div className="title-left ">
              <h2 className="font-weight-bold ">{t("block_6_title_1")}</h2>
            </div>
          </div>
          <div className="title-right mt-3">
            <img src={pic} alt="img" className="m-0" />
          </div>
        </div>

        <div className="feature-content origin">
          <div className="feature-left">
            <img src={language === "vi" ? pic1 : pic1_2} alt="img" />
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img src={Line1} alt="icon" className="position-absolute Line_1" />
          </div>

          <div className="feature-right">
            <div className="feature-text">
              <h3 className="font-weight-bold mb-3 con-fist">
                {t("block_6_title_2")}
              </h3>
              {t("block_6_text_2")}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center position-relative">
          <img
            src={icon3}
            alt="icon"
            className="position-absolute connect-img"
          />
        </div>

        <div className="feature-content">
          <div className="feature-left">
            <div className="feature-text">
              <h3 className="font-weight-bold mb-3 line">
                {t("block_6_title_3")}
              </h3>
              {t("block_6_text_3")}
            </div>
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img src={Line2} alt="icon" className="position-absolute Line_2" />
          </div>

          <div className="feature-right">
            <img src={language === "vi" ? pic2 : pic2_2} alt="img" />
          </div>
        </div>

        <div className="feature-content origin">
          <div className="feature-left">
            <img
              src={language === "vi" ? pic3 : pic3_2}
              alt="img"
              className="dif"
            />
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img src={Line1} alt="icon" className="position-absolute Line_3" />
          </div>

          <div className="feature-right ml-4">
            <div className="feature-text">
              <h3 className="font-weight-bold mb-3">{t("block_6_title_4")}</h3>
              <Trans
                i18nKey="landing-page:block_6_text_4"
                components={{
                  strong: <strong />,
                }}
              />
            </div>
          </div>
        </div>

        <div className="feature-content">
          <div className="feature-left">
            <div className="feature-text mr-4">
              <h3 className="font-weight-bold mb-3">{t("block_6_title_5")}</h3>
              <Trans
                i18nKey="landing-page:block_6_text_5"
                components={{
                  strong: <strong />,
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img
              src={Line3}
              alt="icon"
              className={` ${
                language === "vi" ? "Line_4" : "Line_5"
              }  position-absolute `}
            />
          </div>

          <div className="feature-right">
            <img src={language === "vi" ? pic4 : pic4_2} alt="img" />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center mt-5">
          <h2 className="font-weight-bold ml-1 mr-1 mt-4 text-center mb-5 pb-4">
            {t("block_6_title_6")}
          </h2>
          <FeatureBot detail={contentbot} t={t} />
        </div>
      </div>
      <Footer t={t} />
    </>
  );
}

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(FeaturesPage);
