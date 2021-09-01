// Author LongHoang

import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { faqQuestion } from "../../../api";
import { useSelector } from "react-redux";
import pic1 from "../../../assets/images/Feature1.svg";
import pic1_2 from "../../../assets/images/Feature1_2.svg";
import pic3 from "../../../assets/images/Feature3.svg";
import pic3_2 from "../../../assets/images/Feature3_2.svg";
import pic4 from "../../../assets/images/ld-video-student.svg";
import pic4_2 from "../../../assets/images/ld-video-student-en.svg";
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
import student from "../../../assets/images/ld-dashboard-student.svg";
import student_en from "../../../assets/images/ld-dashboard-student-en.svg";
import "../index.scss";
import "./index.scss";

const LandingStudent = () => {
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
      <h1 className="font-weight-bold ">
        <Trans
          i18nKey="landing-type:text_16"
          components={{
            p: <span className="position-relative student-after" />,
          }}
        />
      </h1>
    ),
    content: t("landing-type:text_17"),
    number: t("landing-type:text_19"),
    text: t("landing-type:text_20"),
    btnlogin: t("landing-type:text_21"),
    btnregist: t("landing-type:text_18"),
    pic: defaultLanguage === "vi" ? student : student_en,
  };
  //  compo feature
  const dataFeature = {
    title: t("landing-type:text_22"),
    pic1: defaultLanguage === "vi" ? pic1 : pic1_2,
    title1: t("block_6_title_2"),
    text1: t("landing-type:text_23"),

    title2: t("block_6_title_4"),
    text2: t("landing-type:text_24"),
    pic2: defaultLanguage === "vi" ? pic3 : pic3_2,

    pic3: defaultLanguage === "vi" ? pic4 : pic4_2,
    title3: t("landing-type:text_25"),
    text3: t("landing-type:text_26"),
  };

  //  compo cost
  const capable = [
    { pic: com, content: t("block_7_text_2") },
    { pic: calen, content: t("block_7_text_3") },
    { pic: lecture, content: t("block_7_text_4") },
    { pic: credit, content: t("block_7_text_5") },
    { pic: head, content: t("block_7_text_6") },
  ];
  const caphead = {
    content: t("block_7_text_1"),
  };

  return (
    <div className="landing-tutor">
      <Header data={dataHeader} user="student" />
      <Feature data={dataFeature} user="student" />
      <Cost
        title={t("landing-type:text_27")}
        blue={blue}
        capable={capable}
        caphead={caphead}
      />
      <Faq user="student" />
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

export default LandingStudent;
