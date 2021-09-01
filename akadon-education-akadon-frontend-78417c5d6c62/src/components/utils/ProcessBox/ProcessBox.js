import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";
import processtitle from "../../../assets/icons/process-title.svg";
import AkadonProcess from "../AkadonProcess/AkadonProcess";
import useWindowSize from "../../customHooks/useWindowSize";

const ProcessBox = () => {
  const [width, height] = useWindowSize();
  const [collapse, setCollapse] = useState(false);

  const { t } = useTranslation(["landing-page", "akadon-process"]);

  return (
    <div className="card-style border-radius-2 mb-3">
      {width > 768 ? (
        <>
          <div className="text-dark text-bold2 h5 text-uppercase mb-3 w-100">
            <img src={processtitle} alt="title" className="mr-2" />
            {t("akadon-process:student-process")}
          </div>
          <AkadonProcess t={t} />
        </>
      ) : (
        <>
          <div
            onClick={() => setCollapse(!collapse)}
            className="flex-box text-dark text-bold2 h5 text-uppercase mb-0 w-100"
          >
            <img src={processtitle} alt="title" className="mr-2" />
            <p className="mb-0 flex-grow">
              {t("akadon-process:student-process")}
            </p>
            <FontAwesomeIcon
              icon={["fal", `${collapse ? "angle-up" : "angle-down"}`]}
            />
          </div>
          <Collapse isOpen={collapse}>
            <AkadonProcess t={t} />
          </Collapse>
        </>
      )}
    </div>
  );
};

export default ProcessBox;
