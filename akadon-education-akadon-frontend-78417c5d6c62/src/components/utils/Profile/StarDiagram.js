import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from "reactstrap";
import PropTypes from "prop-types";

const StarDiagram = ({ rateDiagram, totalRate, t }) => {
  const totalStar = Object.keys(rateDiagram).reduce((a, b) => {
    return a + b * rateDiagram[b];
  }, 0);
  const rateAverate = totalStar === 0 ? parseFloat(0.0).toFixed(1) : parseFloat(totalStar / totalRate).toFixed(1);

  return (
    <div className="star-diagram flex-box justify-content-center">
      <div className="text-hightlight2 h1 mb-0">{rateAverate}</div>
      <div className="mx-4">
        <div style={{ width: "23.5rem", marginBottom: "1px" }} className="flex-box">
          <div style={{ width: "4.5rem", lineHeight: "0" }}>
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon
              icon={["fas", "star"]}
            />
          </div>
          <div className="flex-grow">
            <Progress value={(rateDiagram[5] / totalRate) * 100} />
          </div>
        </div>
        <div style={{ width: "23.5rem", marginBottom: "1px" }} className="flex-box">
          <div style={{ width: "4.5rem", lineHeight: "0" }}>
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
          </div>
          <div className="flex-grow">
            <Progress value={(rateDiagram[4] / totalRate) * 100} />
          </div>
        </div>
        <div style={{ width: "23.5rem", marginBottom: "1px" }} className="flex-box">
          <div style={{ width: "4.5rem", lineHeight: "0" }}>
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
          </div>
          <div className="flex-grow">
            <Progress value={(rateDiagram[3] / totalRate) * 100} />
          </div>
        </div>
        <div style={{ width: "23.5rem", marginBottom: "1px" }} className="flex-box">
          <div style={{ width: "4.5rem", lineHeight: "0" }}>
            <FontAwesomeIcon icon={["fas", "star"]} />
            <FontAwesomeIcon icon={["fas", "star"]} />
          </div>
          <div className="flex-grow">
            <Progress value={(rateDiagram[2] / totalRate) * 100} />
          </div>
        </div>
        <div style={{ width: "23.5rem", marginBottom: "1px" }} className="flex-box">
          <div style={{ width: "4.5rem", lineHeight: "0" }}>
            <FontAwesomeIcon icon={["fas", "star"]} />
          </div>
          <div className="flex-grow">
            <Progress value={(rateDiagram[1] / totalRate) * 100} />
          </div>
        </div>
      </div>
      <div className="text-small-1 text-dark">{totalRate} {t("review")}</div>
    </div>
  );
};

StarDiagram.propTypes = {
  rateDiagram: PropTypes.object,
};

export default StarDiagram;
