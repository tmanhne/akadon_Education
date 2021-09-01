// Author LONG
import React from "react";
import { Trans } from "react-i18next";
import { connect } from "react-redux";
import icon3 from "../../../assets/icons/landfeatureconect.svg";
import Line1 from "../../../assets/images/Line1.svg";
import Line2 from "../../../assets/images/Line3.svg";
import "./index.scss";

function Feature({ data, user }) {
  return (
    <>
      <div
        className="d-flex flex-column pb-5 pt-5 feature-common"
        id="tinhnang"
      >
        <div className="feature-common__contents ">
          <h2 className="font-weight-bold">{data.title}</h2>
        </div>
        {/* 1 */}
        <div className="feature-common__content origin">
          <div className="feature-left">
            <img
              src={data.pic1}
              alt="img"
              className={` ${user === "tutor" ? "replace" : "streplace"}`}
            />
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img
              src={user === "tutor" ? Line2 : Line1}
              alt="icon"
              className={` position-absolute Line_1 ${
                user === "tutor" && "Line_1_tutor"
              }  `}
            />
          </div>

          <div className="feature-right">
            <div className="feature-text">
              <h3 className="font-weight-bold mb-3 con-fist">{data.title1}</h3>
              {data.text1}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center position-relative">
          <img
            src={icon3}
            alt="icon"
            className="position-absolute connect-img"
          />
        </div>
        {/* 2 */}
        <div className="feature-common__content">
          <div className="feature-left">
            <div className="feature-text">
              <h3 className="font-weight-bold mb-3 line">{data.title2}</h3>
              <Trans
                i18nKey={data.text2}
                components={{
                  strong: <strong />,
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img
              src={user === "tutor" ? Line2 : Line1}
              alt="icon"
              className={` ${
                user === "tutor" && "Line_2tutor"
              } position-absolute Line_2`}
            />
          </div>

          <div className="feature-right">
            <img
              src={data.pic2}
              alt="img"
              className={` ${user === "student" && "student-change"}`}
            />
          </div>
        </div>
        {/* 3 */}
        <div className="feature-common__content origin">
          <div className="feature-left">
            <img src={data.pic3} alt="img" className="dif" />
          </div>

          <div className="d-flex justify-content-center position-relative">
            <img src={Line1} alt="icon" className="position-absolute Line_3" />
          </div>

          <div className="feature-right ">
            <div className="feature-text ">
              <h3 className="font-weight-bold mb-3">{data.title3}</h3>
              {data.text3}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(Feature);
