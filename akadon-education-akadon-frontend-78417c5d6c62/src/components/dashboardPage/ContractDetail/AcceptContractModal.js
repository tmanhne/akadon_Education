import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

import { acceptABid } from "../../../api";

const AcceptContractModal = ({ modal, setModal, bidId }) => {
  const { t } = useTranslation("toast");
  //   LONG THÊM STATE WAIT BTN
  const [wait, setWait] = useState(false);
  // EXTRACT PROPS
  const history = useHistory();
  // FUNCTION DECLARATIONS
  const acceptBid = async () => {
    setWait(true);
    if (wait) {
      return true;
    }
    const res = await acceptABid({ bid_id: bidId, decide: 1 });
    if (res.status < 400) {
      toast.success("Tạo khóa học thành công ! ");
      history.push("/dashboard/courses?status=pending");
    } else if (res.response) {
      toast.error(` ${t("toast:er_12")} ${res.response.status} `, {
        autoClose: false,
      });
      setWait(false);
    }
  };
  return (
    <Card className="contract-detail__pre-accept-modal border-0 pb-4">
      <div className="flex-box border-bottom negative-margin pb-2 mb-4 px-3">
        <h5 className="text-bold2 text-center flex-grow mb-0">Xác nhận</h5>
        <FontAwesomeIcon
          onClick={() => {
            setModal(!modal);
          }}
          className="text-grey h5 mb-0 mr-2"
          icon={["fal", "times"]}
        />
      </div>
      <div className="w-75 text-center mx-auto mb-4">
        Bạn chắc chắn chấp nhận E-contract này không? <br />
        Hãy kiểm tra kỹ thông tin vì bạn <strong>không thể thay đổi</strong>
      </div>
      <div className="flex-box justify-content-around">
        <div
          onClick={() => {
            setModal(!modal);
          }}
          className="main-btn cancel-btn text-dark text-bold2 btn"
        >
          Huỷ
        </div>
        <div
          onClick={acceptBid}
          className={`${wait && "disable-overlay boder-rd-100"} main-btn btn`}
        >
          Chấp nhận
        </div>
      </div>
    </Card>
  );
};

AcceptContractModal.propTypes = {
  acceptModal: PropTypes.bool,
  setAcceptModal: PropTypes.func,
  bidId: PropTypes.number,
};

export default AcceptContractModal;
