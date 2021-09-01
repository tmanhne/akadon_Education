import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Trans } from "react-i18next";

const AccountCard = ({
  features,
  title,
  icon,
  feekind,
  modal,
  setModal,
  isCurrentAccount,
  priority,
  cardPriority,
  color,
  check,
}) => {
  const history = useHistory();
  const { t } = useTranslation(["landing-page","upgrade"]);

  const register = () => {
    // REDIRECT TO UPGRADE ACCOUNT
    // CLOSE MODAL
    history.push(`/dashboard-tutor/upgrade-account/${cardPriority}`);
    setModal(!modal);
  };
  // LONG UPDATE 1 SỐ NỘI DUNG THEO DESIGN

  return (
    <div
      className={` card-style flex-box flex-column align-items-stretch p-4  ${
        title === t("block_8_header_3")
          ? "pro"
          : title === t("block_8_header_2")
          ? "stand translate-y-box"
          : "basic"
      } `}
    >
      {icon && (
        <div>
          <div className="fee-kind position-absolute">{feekind}</div>
          <img
            className="position-absolute m-0"
            src={icon}
            alt="popular user"
          />
        </div>
      )}
      <h4
        style={{ margin: "0 -1.5rem" }}
        className="font-weight-bold px-4 pt-5 pb-3 mb-4 text-uppercase"
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
        {priority <= cardPriority && (
          <div className="flex-box align-items-end w-100 flex-grow">
            {isCurrentAccount ? (
              <div className="btn curent-upgrade w-100 center-box text-bold1">
                <FontAwesomeIcon className="mr-2" icon={["fal", "check"]} />
                {t("upgrade:account-status")}
              </div>
            ) : (
              <div onClick={register} className=" sign-upgrade flex-box w-100">
                <div className="flex-grow">{t("upgrade:rg-btn")}</div>
                <FontAwesomeIcon
                  className="mr-2"
                  icon={["fal", "arrow-right"]}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

AccountCard.propTypes = {
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

export default AccountCard;
