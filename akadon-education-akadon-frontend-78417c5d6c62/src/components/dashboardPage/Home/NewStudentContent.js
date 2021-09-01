import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getRecommendTutor } from "../../../api";
import useFetchWithoutPagination from "../../customHooks/useFetchWithoutPagination";
import TutorCard from "./TutorCard";
import SubjectCard from "./SubjectCard";
import subject from "../../../assets/icons/newstudentsubject.svg";
import tutor from "../../../assets/icons/newstudenttutor.svg";
import subjectList from "../../../subjectsList";

const NewStudentContent = () => {
  const { t } = useTranslation(["home-page", "common"]);
  const [tutors, loading] = useFetchWithoutPagination(
    getRecommendTutor,
    null,
    "array"
  );

  const NextArrow = (props) => {
    return (
      <div {...props}>
        <FontAwesomeIcon
          className="text-hightlight1 h4 mb-0"
          icon={["fal", "angle-left"]}
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    return (
      <div {...props}>
        <FontAwesomeIcon
          className="text-hightlight1 h4 mb-0"
          icon={["fal", "angle-right"]}
        />
      </div>
    );
  };

  const setting = {
    centerMod: true,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
  };
  // React slick responsive according to max-width rule
  const tutorResponsive = {
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const subjectResponsive = {
    speed: 500,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <div className="brandnew-student">
      {/* Block content 1 */}
      <div className="subject-slider">
        <h5 className="text-bold2 my-3">
          <img src={subject} alt="icon" className="mr-1 " /> {t("subject-new")}
        </h5>
        <Slider
          className="tutor-slider px-4"
          {...setting}
          {...subjectResponsive}
        >
          {subjectList.map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </Slider>
      </div>
      
      {/* Block content 2 */}
      <div className="tutor-slider mb-5">
        <h5 className="text-bold2 p-0 pb-3">
          <img src={tutor} alt="icon" className="mr-1" />{" "}
          {t("home-page:block-2-student")}
        </h5>
        <Slider className="tutor-slider px-4" {...tutorResponsive} {...setting}>
          {tutors &&
            tutors.map((tutor) => <TutorCard tutor={tutor} key={tutor.id} />)}
        </Slider>
      </div>
    </div>
  );
};

export default NewStudentContent;
