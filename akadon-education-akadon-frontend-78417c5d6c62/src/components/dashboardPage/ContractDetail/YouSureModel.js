import React from "react";
import { Modal, Card } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confirm from "../../../assets/images/con-firm.png";
import "./index.scss";

const YouSureModel = ({ confirm, setConfirm, HandleEditEContract }) => {
  return (
    <Modal isOpen={confirm} className="request-form-modal ">
      <div className="flex-box " style={{ justifyContent: "flex-end" }}>
        {/* <FontAwesomeIcon
          className="text-grey h4"
          onClick={() => setConfirm(!confirm)}
          icon={["fal", "times"]}
        /> */}
      </div>
      <Card className="card-style">
        <div className="text-center">
          <img src={Confirm} alt="Confirm" />
        </div>
        <div className="mb-3 mr-3 ml-3 tex">
          <span>
            Vui lòng kiểm tra lại kỹ thông tin E-contract trước khi gửi. Bạn có
            chắc chắn muốn gửi không?
          </span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div
            className="cancel-btn px-4 sw mr-3"
            onClick={() => setConfirm(!confirm)}
          >
            Quay lại
          </div>
          <div className="main-btn px-4 sw" onClick={HandleEditEContract}>
            Gửi
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default YouSureModel;
