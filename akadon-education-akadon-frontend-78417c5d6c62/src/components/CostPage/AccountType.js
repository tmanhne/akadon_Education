import PropTypes from "prop-types";
import React from "react";
import { Trans } from "react-i18next";

const AccountType = ({ features, title, color, check, icon, feekind }) => {
  return (
    <div
      className={`border-radius-2 flex-box flex-column align-items-stretch p-3 position-relative ${
        title === "Professional"
          ? "pro"
          : title === "Standard"
          ? "stand"
          : "basic"
      } `}
    >
      <div>
        <div className="fee-kind position-absolute">{feekind}</div>
        <img className="position-absolute m-0" src={icon} alt="popular user" />
      </div>

      <h4
        style={{ margin: "0 -1.5rem" }}
        className="font-weight-bold px-4 pb-3 mb-4 mt-5 text-uppercase"
      >
        {title}
      </h4>
      <div className="flex-box flex-column flex-grow align-items-start">
        {features.map((fearute) => (
          <div key={fearute} className="flex-box mb-3 align-items-start">
            <div className=" mr-12px">
              <img src={check} alt="icon" className="m-0" />
            </div>
            <p className="text-bold2  mb-0">
              <Trans
                i18nKey={fearute}
                components={{
                  high: <span style={{ color: color }} />,
                }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

AccountType.propTypes = {
  features: PropTypes.array,
  price: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  isCurrentAccount: PropTypes.bool,
  priority: PropTypes.number,
  cardPriority: PropTypes.number,
};

export default AccountType;
