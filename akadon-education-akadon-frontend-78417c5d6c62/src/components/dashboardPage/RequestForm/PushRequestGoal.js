import React from "react";
import { Modal, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PushRequest from "../../../assets/images/PushRequestGoal.png";
import "./index.scss";

const PushRequestGoal = ({ push, setPush,history, t }) => {
    const HandlerReview = () => {
        history.push("/dashboard/request?status=open-request");
      };
  return (
    <Modal isOpen={push} centered={true} className="request-form-modal relocal">
      <div
        className="flex-box "
        style={{ justifyContent: "flex-end" }}
      >
        {/* <FontAwesomeIcon
          className="text-grey h4"
          onClick={() => setPush(!push)}
          icon={["fal", "times"]}
        /> */}
      </div>
      <Card className="card-style pt-5" >
        <div className="text-center">
          <img
            src={PushRequest}
            alt="Goal"
          />
        </div>
        <div className="mt-4 text-bold1 text-center">
          <span>
          {t("request-form:request_success")}
          </span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div
            className="main-btn px-4"
            style={{ width: "180px" }}
            onClick={HandlerReview}
          >
           {t("request-form:review")}
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default PushRequestGoal;
