import React from "react";
import { Modal, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import tutorRequest from "../../../assets/images/tutorRequest.png";
import "./index.scss";
import { useTranslation } from "react-i18next";

const RequestDetailModal = ({ detailModal, setDetailModal }) => {
  const { t } = useTranslation("home-page");

  return (
    <>
      <div
        className="flex-box request-form-modal__header"
        style={{ justifyContent: "flex-end" }}
      >
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          onClick={() => setDetailModal({ ...detailModal, isOpen: false })}
          icon={["fal", "times"]}
        />
      </div>
      <Card className="card-style p-0">
        <div className="text-center">
          <img className=" mb-2" src={tutorRequest} alt="student-tutor" />
        </div>

        <div className="mr-3 ml-3">
          <span>{t("model-1-1")}</span>
        </div>
        <div className="mb-3 mr-3 ml-3">
          <span>{t("model-1-2")}</span>
        </div>
        <div className="flex-box justify-content-center my-3">
          <div
            className="cancel-btn px-4 mr-3"
            style={{ width: "190px" }}
            onClick={() => setDetailModal({ ...detailModal, isOpen: false })}
          >
            {t("model-1-3")}
          </div>
          <Link
            className="main-btn px-4"
            style={{ width: "190px" }}
            to={`/dashboard-tutor/student-request-detail/${detailModal.payload}`}
          >
            {t("model_1_5")}
          </Link>
        </div>
      </Card>
    </>
  );
};

RequestDetailModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
  modalContent: PropTypes.object,
};

export default RequestDetailModal;
