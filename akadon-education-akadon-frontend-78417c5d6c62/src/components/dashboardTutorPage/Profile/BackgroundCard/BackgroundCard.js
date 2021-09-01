import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";

import BackgroundModal from "./BackgroundModal";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const BackgroundCard = ({ user, editUserRequest, isLoading, language }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation("profile");

  const { specialize, level } = user;
  const profession = user.profession * 1;
  const transpec = specialize.map((mon) => {
    switch (mon) {
      case "Toán học": {
        return "Math";
      }
      case "Ngữ văn": {
        return "Literature";
      }
      case "Sinh học": {
        return "Biological";
      }
      case "Vật lý": {
        return "Physical";
      }
      case "Hóa học": {
        return "Chemistry";
      }
      case "Địa lý": {
        return "Geography";
      }
      case "Lịch sử": {
        return "History";
      }
      case "Tiếng Anh": {
        return "English";
      }
      case "Tin học": {
        return "Information Technology";
      }

      default:
        return {};
    }
  });
  const specdone = Object.values(transpec);

  const leveltran = level.map((lev) => {
    switch (lev) {
      case "Lớp 1": {
        return "Grade 1";
      }
      case "Lớp 2": {
        return "Grade 2";
      }
      case "Lớp 3": {
        return "Grade 3";
      }
      case "Lớp 4": {
        return "Grade 4";
      }
      case "Lớp 5": {
        return "Grade 5";
      }
      case "Lớp 6": {
        return "Grade 6";
      }
      case "Lớp 7": {
        return "Grade 7";
      }
      case "Lớp 8": {
        return "Grade 8";
      }
      case "Lớp 9": {
        return "Grade 9";
      }
      case "Lớp 10": {
        return "Grade 10";
      }
      case "Lớp 11": {
        return "Grade 11";
      }
      case "Lớp 12": {
        return "Grade 12";
      }
      case "Đại học": {
        return "University";
      }
      default:
        return {};
    }
  });
  const leveldone = Object.values(leveltran);
  return (
    <div className="card-style border-radius-2 p-3 mb-3">
      <div className="flex-box mb-12px">
        <h6 className="mb-0 text-bold1 flex-grow text-hightlight1 text-uppercase">
          {t("title-1")}
        </h6>
        <button
          className="center-box rounded-circle border-0"
          onClick={() => setModal(!modal)}
          style={{ width: "36px", height: "36px", background: "#FFEAE2" }}
        >
          <FontAwesomeIcon
            className="text-hightlight"
            icon={["fal", "pencil"]}
          />
        </button>
      </div>
      <div className="mb-12px">
        <h6 className="text-dark text-bold2 mb-2">{t("level")}</h6>
        <div>
          {profession === 0
            ? t("lv-1")
            : profession === 1
            ? t("lv-2")
            : profession === 2
            ? t("lv-3")
            : t("lv-4")}
        </div>
      </div>
      <div className="mb-12px">
        <h6 className="text-dark text-bold2 mb-2">{t("teach-level")}</h6>
        <div>{language === "vi" ? level.join(", ") : leveldone.join(", ")}</div>
      </div>
      <div className="mb-12px">
        <h6 className="text-dark text-bold2 mb-2">{t("exp")}</h6>
        <div>{user.describe}</div>
      </div>
      <div>
        <h6 className="text-dark text-bold2 mb-2">{t("teach-subject")}</h6>
        <div>
          {language === "vi" ? specialize.join(", ") : specdone.join(", ")}
        </div>
      </div>
      <Modal
        isOpen={modal}
        className="edit-profile-modal h-75"
        contentClassName="card-style p-0"
      >
        <BackgroundModal
          user={user}
          editUserRequest={editUserRequest}
          setModal={setModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

BackgroundModal.propTypes = {
  user: PropTypes.object,
  editUserRequest: PropTypes.func,
};

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(BackgroundCard);
