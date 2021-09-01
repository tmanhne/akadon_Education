// AUTHOR LONG HOANG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Modal } from "reactstrap";

import { cancleRequest } from "../../../../api";
import cancelled from "../../../../assets/images/cancelled.svg";
import "./index.scss";
import { useTranslation } from "react-i18next";

const Cancelled = ({ cancel, setCancel, bidId, id }) => {
  const { t } = useTranslation("toast");
  const history = useHistory();
  // LONG THÊM STATE WAIT
  const [wait, setWait] = useState(false);
  // cancle student
  const handleCancle = () => {
    if (wait) {
      return true;
    } else {
      setCancel(!cancel);
    }
  };

  const cancleContract = async () => {
    //LONG THÊM LOGIC WAITBTN
    setWait(true);
    if (wait) {
      return true;
    }
    const payload = {
      contract_id: id,
    };
    const res = await cancleRequest(payload);
    if (res.status < 400) {
      toast.success(`Hủy E-Contract ${bidId} thành công!`);
      history.push("/dashboard/request?status=open-request");
    } else if (res.response) {
      toast.error(
        // `Hủy E-Contract ${bidId} không thành công với lỗi ${res.response.status} !`,
        ` ${t("toast:er_18")} ${res.response.status} !`,
        { autoClose: false }
      );
      setWait(false);
    }
    setWait(false);
  };

  return (
    <Modal isOpen={cancel} className=" card-style cancle-modal ">
      <div
        className="flex-box request-form-modal__header"
        style={{ justifyContent: "flex-end" }}
      >
        <FontAwesomeIcon
          className="text-grey h4"
          onClick={handleCancle}
          icon={["fal", "times"]}
        />
      </div>
      <Card className="card-style p-0 pop">
        <div className="text-center">
          <img
            className=" mb-2"
            src={cancelled}
            alt="student-tutor"
            style={{ height: "45%", width: "45%", alignItems: "center" }}
          />
        </div>
        <div className="mb-3" style={{ fontWeight: 500 }}>
          <span>Bạn có chắc chắn muốn hủy chấp nhận E-contract này? </span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div
            className={`${
              wait && "disable-overlay boder-rd-100"
            } cancel-btn px-4 mr-2`}
            onClick={handleCancle}
          >
            Không
          </div>
          <div
            className={`${
              wait && "disable-overlay boder-rd-100"
            } orange-btn-hover px-4 ml-2`}
            onClick={cancleContract}
          >
            Có
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default Cancelled;
