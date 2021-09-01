import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Level({ language, level }) {
  if (language === "vi") return <span>{level}</span>;

  switch (level) {
    case "Lớp 1": {
      return <span>Grade 1</span>;
    }
    case "Lớp 2": {
      return <span>Grade 2</span>;
    }
    case "Lớp 3": {
      return <span>Grade 3</span>;
    }
    case "Lớp 4": {
      return <span>Grade 4</span>;
    }
    case "Lớp 5": {
      return <span>Grade 5</span>;
    }
    case "Lớp 6": {
      return <span>Grade 6</span>;
    }
    case "Lớp 7": {
      return <span>Grade 7</span>;
    }
    case "Lớp 8": {
      return <span>Grade 8</span>;
    }
    case "Lớp 9": {
      return <span>Grade 9</span>;
    }
    case "Lớp 10": {
      return <span>Grade 10</span>;
    }
    case "Lớp 11": {
      return <span>Grade 11</span>;
    }
    case "Lớp 12": {
      return <span>Grade 12</span>;
    }
    case "Đại học": {
      return <span>University</span>;
    }
    default:
      return <span></span>;
  }
}

Level.propTypes = { language: PropTypes.string, level: PropTypes.string };

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(Level);
