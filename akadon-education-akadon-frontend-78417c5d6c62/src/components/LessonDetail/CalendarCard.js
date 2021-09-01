import React, { useState } from "react";
import { Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import CalendarImg from "../../assets/images/classDetail-calendar.png";
import CalendarModal from "../dashboardPage/utils/CalendarModal";
import FormatDate from "../utils/FormatDate";

const CalendarCard = ({ lesson }) => {
  const [modal, setModal] = useState(false);
  const {lesson_no,lesson_date}=lesson;

  const { t } = useTranslation(["common"]);

  const toggleModal = () => {
    setModal(!modal);
  };
  console.log(lesson_no)
  return (
    <Card className="card-style lesson-detail__calendar-card flex-shrink-0 position-relative px-3 mr-2 ">
      <div
        onClick={toggleModal}
        className="absolute-icon btn position-absolute text-light center-box"
      >
        <FontAwesomeIcon icon={["fal", "calendar-alt"]} />
      </div>
      <div className="h5 text-bold2 mb-2 text-center">
        {t("common:lesson")} {lesson_no}
      </div>
      <p className="mb-2 text-center text-hightlight">
        <FormatDate date={lesson_date} />
      </p>
      <div className="text-center">
        <img width={77} src={CalendarImg} alt="calendar card" />
      </div>
      <CalendarModal modal={modal} toggleModal={toggleModal} />
    </Card>
  );
};

export default CalendarCard;
