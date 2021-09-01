import React from "react";
import { Modal, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Suggestion from "../../../../assets/images/Suggestion.png";
import "./index.scss";
import { useTranslation, Trans } from "react-i18next";

const SuccessSend = ({ detailModal, setDetailModal, history }) => {
  const { t } = useTranslation(["suggest", "toast"]);
  const HandlerNewPage = () => {
    history.push("/dashboard-tutor/request?status=save");
  };
  return (
    <Modal
      isOpen={detailModal}
      className="request-form-modal card-style send-ok"
    >
      <div
        className="flex-box request-form-modal__header"
        style={{ justifyContent: "flex-end" }}
      >
        <FontAwesomeIcon
          className="text-grey h4"
          onClick={HandlerNewPage}
          icon={["fal", "times"]}
        />
      </div>
      <Card className="card-style p-0">
        <div className="text-center">
          <img
            className=" mb-2"
            src={Suggestion}
            alt="student-tutor"
            style={{ height: "65%", width: "65%", alignItems: "center" }}
          />
        </div>
        <div className="mb-3 mr-3 ml-3 text-center">
          <span>
            <Trans
              i18nKey={t("suggest:sug_20")}
              components={{
                p: <span className="text-bold1" />,
              }}
            />
          </span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div
            className="main-btn px-4 sw mb-4"
            style={{ background: "#EAF4FC", color: "#0367B4", width: "185px" }}
            onClick={HandlerNewPage}
          >
           {t("suggest:sug_21")}
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default SuccessSend;
