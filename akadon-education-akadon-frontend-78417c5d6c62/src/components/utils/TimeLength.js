import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function TimeLength( {length} ) {
    const { t } = useTranslation("common");

  switch (length) {
    case "a1": {
      return <span>{t("time2")}</span>;
    }
    case "a2": {
      return <span>{t("time3")}</span>;
    }
    case "a3": {
      return <span>{t("time4")}</span>;
    }
    case "a4": {
      return <span>{t("time5")}</span>;
    }
    case "a5": {
      return <span>{t("time6")}</span>;
    }
    case "a6": {
      return <span>{t("time7")}</span>;
    }
    case "a7": {
      return <span>{t("time8")}</span>;
    }
    case "a8": {
      return <span>{t("time9")}</span>;
    }
    default:
      return <span>{length} {t("hour")}</span>;
  }
}

TimeLength.propTypes = { language: PropTypes.string, length: PropTypes.string };

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(TimeLength);
