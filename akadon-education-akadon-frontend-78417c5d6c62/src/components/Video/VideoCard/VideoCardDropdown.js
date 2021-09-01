import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const VideoCardDropdown = ({ setFullScreen, fullScreen, modal, setModal }) => {
  const { t } = useTranslation("video");
  return (
    <UncontrolledDropdown className="video-card-dropdown" direction="left">
      <DropdownToggle
        style={{ background: "transparent" }}
        className="center-box p-0 border-0"
      >
        <div className="flex-box center-box rounded-circle">
          <FontAwesomeIcon
            className="text-grey h5 mb-0"
            icon={["fas", "ellipsis-v"]}
          />
        </div>
      </DropdownToggle>
      <DropdownMenu className="card-style border-0">
        <DropdownItem
          className="p-0 flex-box"
          onClick={() => setFullScreen(!fullScreen)}
        >
          <div className="flex-box center-box rounded-circle">
            <FontAwesomeIcon
              icon={[
                "fal",
                `${fullScreen ? "compress-arrows-alt" : "expand-arrows-alt"}`,
              ]}
            />
          </div>
          <span>{t("full-screen")}</span>
        </DropdownItem>
        <DropdownItem
          onClick={() => setModal({ ...modal, report: true })}
          className="p-0 flex-box"
        >
          <div className="flex-box center-box rounded-circle">
            <FontAwesomeIcon icon={["fal", "exclamation-circle"]} />
          </div>
          <span>{t("report")}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

VideoCardDropdown.propTypes = {
  setFullScreen: PropTypes.func,
  fullScreen: PropTypes.bool,
  setModal: PropTypes.func,
  modal: PropTypes.object,
};

export default VideoCardDropdown;
