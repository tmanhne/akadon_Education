import React from "react";
import { Modal, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Suggestion from "../../../assets/images/Suggestion.png";
import "./index.scss";

const SendChangeDoneModel = ({ done, setDone, HandleDone }) => {
  return (
    <Modal isOpen={done} className="request-form-modal ">
      <div className="flex-box " style={{ justifyContent: "flex-end" }}>
        <FontAwesomeIcon
          className="text-grey h4"
          onClick={HandleDone}
          icon={["fal", "times"]}
        />
      </div>
      <Card className="card-style">
        <div className="text-center">
          <img src={Suggestion} alt="Suggestion" />
        </div>
        <div className="mb-3 mr-3 ml-3 tex">
          <span>
            Bạn đã gửi yêu cầu thay đổi E-contract, hãy chờ phản hổi của gia sư
            nhé.
          </span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div className="main-btn px-4 swg" onClick={HandleDone}>
            Xem lại lịch sử thay đổi
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default SendChangeDoneModel;
