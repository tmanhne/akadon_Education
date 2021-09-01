import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HBIProgress1 from "../../../assets/images/hbi-progress-1.png";
import HBIBad1 from "../../../assets/icons/hbi-bad-1.svg";
import HBIBad from "../../../assets/icons/hbi-bad.svg";
import HBIfair from "../../../assets/icons/hbi-fair.svg";
import HBIPoor from "../../../assets/icons/hbi-poor.svg";
import HBIGood from "../../../assets/icons/hbi-good.svg";
import HBIExcellent from "../../../assets/icons/hbi-excellent.svg";
import HBISuper from "../../../assets/icons/hbi-super.svg";
import { useTranslation } from "react-i18next";

const HBICard = ({ user }) => {
  // PROPS EXTRACT
  const hbi = user.hbi;
  const calculateProgress =
    hbi < 75 ? 235 : hbi > 125 ? 470 : 240 + (hbi - 75) * 4.56;

    const {t} = useTranslation("profile");

  // FUNCTION DECLERATION
  const HbiConvert = () => {
    // CALCULATE USER STATUS BASE ON HBI SCORE
    // IMPORT RESPECTIVELY ICON
    switch (true) {
      case hbi < 75:
        return (
          <>
            <img width={42} src={HBIBad1} alt="bad" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#ED2114" }}
            >
              {t("really_really_bad")}
            </div>
          </>
        );
      case hbi > 75 && hbi <= 85:
        return (
          <>
            <img width={42} src={HBIBad} alt="bad" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#ED2114" }}
            >
              {t("bad")}
            </div>
            ;
          </>
        );
      case hbi > 85 && hbi <= 95:
        return (
          <>
            <img width={42} src={HBIPoor} alt="HBIPoor" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#FF6D34" }}
            >
              {t("poor")}
            </div>
            ;
          </>
        );
      case hbi > 95 && hbi <= 105:
        return (
          <>
            <img width={42} src={HBIfair} alt="HBIfair" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#FFC107" }}
            >
              {t("fair")}
            </div>
          </>
        );
      case hbi > 105 && hbi <= 115:
        return (
          <>
            <img width={42} src={HBIGood} alt="HBIGood" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#0367B4" }}
            >
              {t("excellent")}
            </div>
          </>
        );
      case hbi > 115 && hbi <= 125:
        return (
          <>
            <img width={42} src={HBIExcellent} alt="HBIExcellent" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#03B0A9" }}
            >
              {t("excellent")}
            </div>
          </>
        );
      case hbi > 125:
        return (
          <>
            <img width={42} src={HBISuper} alt="HBIExcellent" />
            <h1 style={{ fontSize: "56px" }} className="mb-0 text-bold2">
              {hbi}
            </h1>
            <div
              className="h5 mb-2 text-hightlight3 text-center"
              style={{ color: "#03B0A9" }}
            >
              {t("super_star")}
            </div>
          </>
        );
      default:
        return <div className="h5 mb-2 text-hightlight3 text-center"></div>;
    }
  };

  return (
    <div className="hbi-card flex-box align-items-start flex-column card-style border-radius-2 p-3">
      <div className="mb-4">
        <h6 className="mb-0 text-bold2 text-dark">{t("hbi")}</h6>
      </div>
      <div className="center-box flex-grow w-100">
        <div className="progress align-self-center bg-light center-box h-auto position-relative">
          <img
            className="bg-light pb-4"
            src={HBIProgress1}
            alt="hbi progress"
          />
          <div
            className="bg-light position-absolute center-box flex-column"
            style={{ bottom: "0" }}
          >
            <HbiConvert />
          </div>
          <div
            style={{ transform: `rotate(${calculateProgress}deg)` }}
            className="clock-wheel position-absolute"
          >
            <div className="position-relative">
              <FontAwesomeIcon
                style={{ left: "50%" }}
                className="position-absolute h3"
                icon={["fas", "caret-up"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HBICard;
