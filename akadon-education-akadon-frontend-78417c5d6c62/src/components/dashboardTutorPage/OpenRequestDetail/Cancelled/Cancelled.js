// AUTHOR LONG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "reactstrap";
import { cancleRequest } from "../../../../api";
// import Suggestion from "../../../assets/images/Suggestion.png";
import "./index.scss";
import { useTranslation } from "react-i18next";

const Cancelled = ({ setCancle, cancle, request }) => {
  const { t } = useTranslation("toast");
  const history = useHistory();
  const [wait, setWait] = useState(false);

  const handleCancle = () => {
    if (wait) {
      return true;
    } else {
      setCancle(!cancle);
    }
  };

  // FUNCTION DECLARATIONS
  async function handleCancleRequest() {
    setWait(true);
    if (wait) {
      return true;
    }
    const payload = { contract_id: request, is_tutor: true };
    const res = await cancleRequest(payload);
    if (res.status < 400) {
      toast.success("Hủy yêu cầu thành công !");
      history.push("/dashboard-tutor/home");
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      setWait(false);
    }
    setWait(false);
  }

  return (
    <Modal isOpen={cancle} className="card-style cancle-modal">
      <div className="flex-box mb-4" style={{ justifyContent: "flex-end" }}>
        <FontAwesomeIcon
          className="text-grey h4"
          onClick={handleCancle}
          icon={["fal", "times"]}
        />
      </div>
      <div className="mb-3" style={{ fontWeight: 500 }}>
        <span>Bạn có chắc chắn muốn Hủy đề nghị dạy?</span>
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
          onClick={handleCancleRequest}
        >
          Có
        </div>
      </div>
    </Modal>
  );
};

export default Cancelled;
