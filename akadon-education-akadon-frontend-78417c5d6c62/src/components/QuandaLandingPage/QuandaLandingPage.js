import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./index.scss";
import Img1 from "../../assets/images/qanda-5.png";
import Img2 from "../../assets/images/quanda-2.jpg";
import Img3 from "../../assets/images/quanda-3.jpg";
import Img4 from "../../assets/images/quanda-4.jpg";
import Img6 from "../../assets/images/qanda-8.png";
import Img7 from "../../assets/images/qanda-7.png";
import Footer from "../landingPage/Footer";

export default function QuandaLandingPage() {
  const { t } = useTranslation("landing-page");
  const slickSetting = {
    centerPadding: 0,
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
  };
  return (
    <div className="quanda-landing-page py-4 px-3 mx-auto">
      <header className="pt-4 px-3 mb-4">
        <div className="text-center">
          <img className="w-100" src={Img6} alt="banner 1" />
        </div>
        <Link
          to="/qanda/registration"
          className="d-block w-100 main-btn text-uppercase py-0"
          style={{ lineHeight: "48px" }}
        >
          đăng ký ngay
        </Link>
        <div className="text-center">
          <img className="w-100" src={Img7} alt="banner 2" />
        </div>
      </header>

      <article className="feature mb-4">
        <div className="text-center mb-12px">
          <img src={Img1} alt="akadon feature" width={230} />
          <p className="mb-0">
            AKADON giúp bạn nâng cao chất lượng dạy và học,
            <span className="text-bold1 text-hightlight1">
              {" "}
              xoá nhoà khoảng cách{" "}
            </span>
            và tích hợp các{" "}
            <span className="text-bold1 text-hightlight1">
              tính năng thông minh
            </span>{" "}
            phục vụ đối đa cho việc học tập.
          </p>
        </div>
        <Slider {...slickSetting}>
          <div className="position-relative">
            <img src={Img2} alt="feature" className="w-100" />
            <p className="header m-0 pl-2 font-weight-bold text-uppercase position-absolute text-light">
              Tìm gia sư dễ dàng
            </p>
          </div>
          <div className="position-relative">
            <img src={Img3} alt="feature" className="w-100" />
            <p className="header m-0 pl-2 font-weight-bold text-uppercase position-absolute text-light">
              Thông tin gia sư rành mạch
            </p>
          </div>
          <div className="position-relative">
            <img src={Img4} alt="feature" className="w-100" />
            <p className="header m-0 pl-2 font-weight-bold text-uppercase position-absolute text-light">
              Đừng đọc thử, hãy học thử
            </p>
          </div>
        </Slider>
      </article>

      <article className="footer mt-5 pt-5">
        <Footer t={t} />
      </article>
    </div>
  );
}
