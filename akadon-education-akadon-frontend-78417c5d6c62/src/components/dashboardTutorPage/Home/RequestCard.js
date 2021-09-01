import React from "react";
import { Card, CardImg } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import RecommendImg from "../../../assets/icons/teach-now.svg";
import CurrencyFormat from "../../utils/CurrencyFormat";
import UserBox from "../../utils/UserBox";
import SubjectImage from "../../utils/SubjectImage";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";
import useWindowSize from "../../customHooks/useWindowSize";

const RequestCard = ({ setDetailModal, request }) => {
  const [width, height] = useWindowSize();
  const { t } = useTranslation(["common"]);

  const student = request.student || {};
  const offlineFlag = request.offline_flag ? (
    <>
      <span className="text-bold1">Offline</span>
      <span className="text-grey px-2">|</span>
      <span className="text-grey">{t("common:city")}: </span>
      <span className="text-bold1">{request.city}</span>
      <span className="text-grey px-2">|</span>
      <span className="text-grey">{t("common:district")}: </span>
      <span className="text-bold1">{request.district}</span>
    </>
  ) : (
    <span className="text-bold1">Online</span>
  );
  const cardClassName = `request-card flex-box card-style border-0 mb-12px cursor-pointer w-100 position-relative ${
    request.priority === 1 && "recommended"
  }`;

  return (
    <Card
      onClick={() => setDetailModal({ payload: request.id, isOpen: true })}
      className={cardClassName}
    >
      <SubjectImage subject={request.subject_name} width={96} height={96} />

      <div className="flex-grow mr-2 ml-12px">
        <p className="request-title mb-2 text-bold2 h5 text-truncate">
          {request.request_header}
        </p>
        <div className="mb-2 flex-box flex-wrap">
          <div className="text-nowrap">
            <span className="text-grey">{t("common:subject")}: </span>
            <span className="text-bold1">
              <Subject subject={request.subject_name} />
            </span>
            <span className="text-grey px-2">|</span>
          </div>

          <div className="text-nowrap">
            <span className="text-grey">{t("common:level")}: </span>
            <span className="text-bold1">
              <Level level={request.subject_level} />
            </span>
            <span className="text-grey px-2">|</span>
          </div>

          <div>
            <span className="text-grey">{t("common:budget")}: </span>
            <span className="text-hightlight3 text-bold1">
              <CurrencyFormat value={request.fee} />
            </span>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-grey">{t("common:is-offline")}: </span>
          {offlineFlag}
        </div>
      </div>
      {width > 850 && (
        <div className="user-box">
          <UserBox
            avatar={student.avatar}
            width={64}
            height={64}
            name={student.name}
            priority={student.priority}
            rate={student.rate}
          />
        </div>
      )}

      {request.priority === 1 && (
        <img
          width={104}
          src={RecommendImg}
          alt="teach now"
          className="recommended-img position-absolute"
        />
      )}
    </Card>
  );
};

RequestCard.propTypes = {
  setDetailModal: PropTypes.func,
  request: PropTypes.object,
};

export default RequestCard;
