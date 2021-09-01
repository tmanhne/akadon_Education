// Author LongHoang

import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { faqQuestion } from "../../../api";
import pic2 from "../../../assets/images/Feature2.svg";
import pic4 from "../../../assets/images/Feature4.svg";
import pic2_2 from "../../../assets/images/Feature2_2.svg";
import pic4_2 from "../../../assets/images/Feature4_2.svg";
import pic3 from "../../../assets/images/ld-video-tutor.svg";
import pic3_2 from "../../../assets/images/ld-video-tutor-en.svg";

import { questionSchema } from "../../../validator";
import Footer from "../../landingPage/Footer";
import AskUs from "../Common/AskUs";
import Cost from "../Common/Cost";
import Faq from "../Common/Faq";
import Feature from "../Common/Feature";
import Header from "../Common/Header";

import calen from "../../../assets/icons/costcalend.svg";
import com from "../../../assets/icons/costcom.svg";
import credit from "../../../assets/icons/costcredit.svg";
import head from "../../../assets/icons/costhead.svg";
import lecture from "../../../assets/icons/costlecture.svg";
import blue from "../../../assets/icons/landcostblue.svg";
import tutor from "../../../assets/images/ld-dashboard-tutor.svg";
import tutor_en from "../../../assets/images/ld-dashboard-tutor-en.svg";
import "../index.scss";

const LandingTutor = () => {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const defaultLanguage = useSelector(({ appConfig }) => appConfig.language);

  const [waitSend, setWaitSend] = useState(false);
  const { t } = useTranslation(["landing-page", "toast", "landing-type"]);

  const sendQuestion = async (e) => {
    e.preventDefault();

    // validate user input
    const validUserInfo = questionSchema.validate({
      email,
      name: userName,
      mobileNumber,
      question,
    });

    if (validUserInfo.error) {
      setError(validUserInfo.error.details[0].path[0]);
      return;
    }

    // logic wait btn
    setWaitSend(true);
    if (waitSend) return true;
    // reset error and call api
    setError("");
    const payload = { email, name: userName, question, phone: mobileNumber };
    const res = await faqQuestion(payload);

    if (res.status < 400) {
      toast.success(t("toast:sucess_16"));
      setWaitSend(false);
    } else if (res.response) {
      setWaitSend(false);
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  };

  //  Dữ liệu cho các component
  // compo header
  const dataHeader = {
    title: (
      <h1 className="font-weight-bold h1gs">
        <Trans
          i18nKey="landing-type:text_5"
          components={{
            p: <span className="position-relative" />,
          }}
        />
      </h1>
    ),
    content: t("landing-type:text_6"),
    number: t("landing-type:text_8"),
    text: t("landing-type:text_9"),
    btnlogin: t("landing-type:text_10"),
    btnregist: t("landing-type:text_7"),
    pic: defaultLanguage === "vi" ? tutor : tutor_en,
  };
  //  compo feature
  const dataFeature = {
    title: t("landing-type:text_22"),
    pic1: defaultLanguage === "vi" ? pic2 : pic2_2,
    title1: t("block_6_title_3"),
    text1: t("landing-type:text_11"),

    title2: t("block_6_title_5"),
    text2: t("landing-type:text_12"),
    pic2: defaultLanguage === "vi" ? pic4 : pic4_2,

    pic3: defaultLanguage === "vi" ? pic3 : pic3_2,
    title3: t("landing-type:text_13"),
    text3: t("landing-type:text_14"),
  };

  //  compo cost
  const basicFeatures = [t("block_8_text_1"), t("block_8_text_2")];
  const standardFeatures = [
    t("block_8_text_3"),
    t("block_8_text_4"),
    t("block_8_text_5"),
    t("block_8_text_6"),
    t("block_8_text_7"),
  ];
  const proFeatures = [
    t("block_8_text_8"),
    t("block_8_text_9"),
    t("block_8_text_10"),
    t("block_8_text_11"),
    t("block_8_text_12"),
  ];

  const capheadtutor = {
    title: t("block_8_title_2"),
    content: t("block_8_text_13"),
    subcontent: t("block_8_text_13_1"),
  };

  const capabletutor = [
    { pic: com, content: t("block_8_text_14") },
    { pic: calen, content: t("block_8_text_15") },
    { pic: lecture, content: t("block_8_text_16") },
    { pic: credit, content: t("block_8_text_17") },
    { pic: head, content: t("block_8_text_18") },
  ];
  const feeBa = t("block_8_price_1");
  const feeStand = (
    <div>
      <Trans
        i18nKey={t("block_8_price_2")}
        components={{
          p: <p />,
        }}
      />
    </div>
  );
  const feePro = (
    <div>
      <Trans
        i18nKey={t("block_8_price_3")}
        components={{
          p: <p />,
        }}
      />
    </div>
  );

  return (
    <div className="landing-tutor">
      <Header data={dataHeader} user="tutor" />
      <Feature data={dataFeature} user="tutor" />
      <Cost
        title={t("landing-type:text_15")}
        basicFeatures={basicFeatures}
        standardFeatures={standardFeatures}
        proFeatures={proFeatures}
        capheadtutor={capheadtutor}
        capabletutor={capabletutor}
        feeBa={feeBa}
        feeStand={feeStand}
        feePro={feePro}
        blue={blue}
      />
      <Faq user="tutor" />
      <AskUs
        userName={userName}
        setUserName={setUserName}
        email={email}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        setEmail={setEmail}
        question={question}
        setQuestion={setQuestion}
        sendQuestion={sendQuestion}
        error={error}
        waitSend={waitSend}
        t={t}
      />
      <Footer t={t} />
    </div>
  );
};

export default LandingTutor;
