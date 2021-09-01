import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Subject({ language, subject }) {
  if (language === "vi") return <span>{subject}</span>;

  switch (subject) {
    case "Toán học": {
      return <span>Math</span>;
    }
    case "Ngữ văn": {
      return <span>Literature</span>;
    }
    case "Sinh học": {
      return <span>Biological</span>;
    }
    case "Vật lý": {
      return <span>Physical</span>;
    }
    case "Hóa học": {
      return <span>Chemistry</span>;
    }
    case "Địa lý": {
      return <span>Geography</span>;
    }
    case "Lịch sử": {
      return <span>History</span>;
    }
    case "Tiếng Anh": {
      return <span>English</span>;
    }
    case "Tin học": {
      return <span>Information Technology</span>;
    }
    default:
      return <span></span>;
  }
}

Subject.propTypes = { language: PropTypes.string, subject: PropTypes.string };

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(Subject);
