import React from "react";
import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import { Card, Modal } from "reactstrap";
// import { cancleRequest } from "../../../../api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Suggestion from "../../../assets/images/Suggestion.png";
import "./index.scss";
import { useTranslation, Trans } from "react-i18next";

const Cancle = ({ setCancle, cancle }) => {
  const history = useHistory();

  //   // FUNCTION DECLARATIONS
  //   async function handleCancleRequest() {
  //     const res = await cancleRequest({ contract_id: request.id });
  //     if (res.status < 400) {
  //       history.push("/dashboard/request?status=close-request");
  //       toast.success("Hủy yêu cầu thành công !");
  //     } else if (res.response) {
  //       toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
  //     }
  //   }
  const { t } = useTranslation(["suggest", "toast"]);

  return (
    <Modal isOpen={cancle} className="card-style cancle">
      <Card className=" p-0">
        <div className="mb-3" style={{ fontWeight: 500 }}>
          <span> {t("suggest:sug_17")}</span>
        </div>
        <div className="flex-box justify-content-center mt-3">
          <div
            className="cancel-btn px-4 mr-2"
            onClick={() => setCancle(!cancle)}
          >
            {t("suggest:sug_19")}
          </div>
          <div className="orange-btn-hover px-4 ml-2" onClick={history.goBack}>
            {t("suggest:sug_18")}
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default Cancle;
