import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import "./index.scss";
import Logo from "../../assets/icons/noneSloganLogo.png";
import Bg from "../../assets/images/mkt-page-bg.png";
import RatingBox from "../utils/RatingBox";
import SubjectImage from "../utils/SubjectImage";
import CurrencyFormat from "../utils/CurrencyFormat";
import { getRequestDetail } from "../../api";
import { useQuery } from "../../module";
import SubLoader from "../utils/SubLoader";
import FallbackRequest from "./FallbackRequest";

export default function MarketingPage() {
  const [request, setRequest] = useState({
    student: {},
    loadingSuccess: false,
  });
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const id = query.get("id");
  const { t } = useTranslation("marketing");

  useEffect(() => {
    fetchRequest();
    return () => {
      // setRequest();
    };
  }, [id]);

  async function fetchRequest() {
    const res = await getRequestDetail(id);
    setLoading(false);
    if (res.status < 400) {
      setRequest({ ...res.data, loadingSuccess: true });
    }
  }

  const {
    student,
    is_pre_study,
    request_header,
    subject_name,
    subject_level,
    fee,
    offline_flag,
    loadingSuccess,
  } = request;

  const { name, avatar, rating, number_course_in, number_month_in } = student;
  if (loading) return <SubLoader />;
  return (
    <div className="marketing-page">
      <Helmet>
        <meta
          property="og:title"
          content="Akadon Nền Tảng Dạy Học Trực Tuyến Hàng Đầu Việt Nam"
        />
        <meta
          property="og:description"
          content={`Akadon - Tìm gia sư dạy ${subject_name} - ${subject_level}`}
        />
      </Helmet>
      <div className="marketing-page__logo-box text-center">
        <Link to="/" target="_blank">
          <img src={Logo} width={213} alt="akadon" className="mx-auto" />
        </Link>
      </div>

      <h4 className="font-weight-bold text-center">{t("marketing:header")}</h4>
      {loadingSuccess ? (
        <>
          <div className="marketing-page__user-box flex-box justify-content-between mb-4 pb-4 border-bottom">
            <div className="flex-box flex-grow align-items-start">
              <img
                src={
                  avatar || `https://ui-avatars.com/api/?name=${student.name}`
                }
                alt={name}
                width={80}
                className="image-avatar mr-2"
              />
              <div>
                <h6 className="mb-1 text-bold2">{name}</h6>
                <div className="mb-12px">
                  <RatingBox rate={rating} />
                </div>
                <p className="text-grey mb-0">
                  {t("marketing:content_1")}
                  {number_month_in}
                  {t("marketing:content_2")}
                  {number_course_in}
                  {t("marketing:content_3")}
                </p>
              </div>
            </div>
            {is_pre_study && (
              <div className="trial-box text-hightlight border-radius-1 text-bold1 p-2">
                {t("marketing:content_4")}
              </div>
            )}
          </div>

          <div className="marketing-page__content-box flex-box align-items-start">
            <SubjectImage subject={subject_name} height="88px" />
            <div className="ml-12px flex-grow">
              <div className="mb-12px flex-box">
                <span className="text-grey">{t("marketing:title")}</span>
                <p className="text-bold2 mb-0 ml-2">{request_header}</p>
              </div>
              <div className="mb-12px flex-box">
                <span className="text-grey">{t("marketing:subject")}</span>
                <p className="text-bold2 mb-0 ml-2">{subject_name}</p>
              </div>
              <div className="mb-12px flex-box">
                <span className="text-grey">{t("marketing:level")}</span>
                <p className="text-bold2 mb-0 ml-2">{subject_level}</p>
              </div>
              <div className="mb-12px flex-box flex-wrap">
                <span className="text-grey">{t("marketing:budget")}</span>
                <span className="text-bold2 text-hightlight mb-0 ml-2">
                  <CurrencyFormat value={fee} />
                </span>
              </div>
              <div className="mb-12px flex-box">
                <span className="text-grey">{t("marketing:method")}</span>
                <p className="text-bold2 mb-0 ml-2">
                  {offline_flag ? "Offline" : "Online"}
                </p>
              </div>
            </div>
          </div>
          <div className="cta-box flex-box">
            <p className="text-bold2 h4 mb-0 text-center mr-3">
              {t("marketing:content_5")}
            </p>
            <Link to="/user/register" className="main-btn flex-grow">
              {t("marketing:register")}
            </Link>
            <span className="text-bold2 mx-3">{t("marketing:or")}</span>
            <Link to="/user/login" className="main-btn flex-grow">
              {t("marketing:login")}
            </Link>
          </div>
          <div className="footer-img text-center">
            <img src={Bg} alt="mkt" width={549} />
          </div>
        </>
      ) : (
        <FallbackRequest t={t} />
      )}
    </div>
  );
}
