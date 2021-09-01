import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import HeaderStep from "../../landingPage/NoteTip/HeaderStep";
import Footer from "../Footer";
import StepContent1 from "./StepContent1";
import StepContent2 from "./StepContent2";
import StepContent3 from "./StepContent3";
import StepContent4 from "./StepContent4";
import StepContent5 from "./StepContent5";
import StepContent6 from "./StepContent6";
import { useTranslation, Trans } from "react-i18next";

const Step = ({ dash }) => {
  const { t } = useTranslation(["landing-page", "Note-page"]);
  // const [step,setStep] = useState(1)

  const settings = {
    dots: true,
    infinite: false,
    width: 980,
    speed: 500,
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "auto",
          zIndex: -3,
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "5.5rem",
          height: "2.4rem",
          lineHeight: "2.4rem",
        }}
        className="text-light border-radius-2 bg-hightlight-1"
      >
        {t("Note-page:step_6")} {i + 1}
      </div>
    ),
  };

  return (
    <>
      {/* TOP NAV */}
      {dash ? (
        ""
      ) : (
        <>
          <HeaderStep t={t} />
        </>
      )}

      {/* CONTENT */}
      <Container className="content-step px-0" fluid={true}>
        <h3 className="content-step__header">
          {dash ? t("Note-page:header_1") : t("Note-page:header")}
        </h3>

        <ul className="content-step__content text-hightlight1">
          <li className="mr-1">
            <span className="text-dark">{t("Note-page:title")}</span>
          </li>
          <li className="mt-3 mr-1">
            <span className="text-dark">{t("Note-page:title_1")}</span>
          </li>
        </ul>
      </Container>

      <div className="content-note">
        <Slider {...settings}>
          <StepContent1 />
          <StepContent2 />
          <StepContent3 />
          <StepContent4 />
          <StepContent5 />
          <StepContent6 />
        </Slider>
        <p className="mt-3 text-center text-light m-0">
          {t("Note-page:title_2")}
        </p>
        <div className="content-note__end">
          <Trans
            i18nKey="Note-page:title_3"
            components={{
              span: <span />,
            }}
          />
        </div>
      </div>

      {/* FOOTER */}
      {dash ? "" : <Footer t={t} />}
    </>
  );
};

export default Step;
