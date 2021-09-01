// AUTHOR LONG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { cancleRequest } from "../../../../api";
import { useTranslation } from "react-i18next";

import "./index.scss";

const CancleModal = ({ setModal, request }) => {
  const { t } = useTranslation(["toast", "request-detail"]);
  const history = useHistory();
  const [wait, setWait] = useState(false);

  // FUNCTION DECLARATIONS
  async function handleCancleRequest() {
    setWait(true);
    if (wait) {
      return true;
    }
    const res = await cancleRequest({ contract_id: request.id });
    if (res.status < 400) {
      history.push("/dashboard/request?status=close-request");
      toast.success(t("request-detail:cancel_request_success"));
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      setWait(false);
    }
    setWait(false);
  }

  return (
    <>
      <div className="text-right mb-4">
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          onClick={() => setModal(false)}
          icon={["fal", "times"]}
        />
      </div>

      <p className="mb-3 text-bold1 text-center">
        {t("request-detail:cancel_request_confirm")}
      </p>

      <div className="flex-box justify-content-center my-3">
        <div className="cancel-btn px-4 mr-2" onClick={() => setModal(false)}>
        {t("request-detail:no")}
        </div>
        <div
          className={`${
            wait && "disable-overlay boder-rd-100"
          } main-btn bg-hightlight orange-btn-hover px-4 ml-2`}
          onClick={handleCancleRequest}
        >
          {t("request-detail:yes")}
        </div>
      </div>
    </>
  );
};

export default CancleModal;
