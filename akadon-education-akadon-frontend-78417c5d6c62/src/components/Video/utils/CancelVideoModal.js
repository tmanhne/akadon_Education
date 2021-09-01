import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { lessonClose } from "../../../api";
import { useTranslation } from "react-i18next";

const CancelVideoModal = ({ setModal, modal, room, entityId, userType }) => {
  const { t } = useTranslation("toast");
  // LONG THÊM STATE BTN WAIT
  const [wait, setWait] = useState(false);

  const lessonStatus =
    userType === "student" ? t("video:student_done") : t("video:tutor_done");

  // PROPS EXTRACT
  const history = useHistory();
  const cancleRedirectUrl = history.location.pathname.replace("/video", "");

  // FUNCTION DECLARATIONS
  async function closingLesson() {
    setWait(true);
    if (wait) {
      return true;
    }
    // 1. Check entity already exist
    // 2. Call api
    // 3. Clean up video and redirect user
    if (!entityId) return;

    const res = await lessonClose({ lesson_id: entityId });

    if (res.status < 400) {
      room && room.disconnect();
      setModal({...modal, cancelVideo: false});
      history.push(cancleRedirectUrl);
      toast.success(t("toast:sucess_32"), {
        className: "bg-hightlight-1 border-radius-1 text-light",
      });
    }
    if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`, {
        className: "bg-hightlight-1 border-radius-1 text-light",
        autoClose: false,
      });
      setWait(false);
    }
  }
  return (
    <>
      <div className="flex-box text-bold2 mb-3 p-3 border-bottom">
        <h5 className="mb-0 flex-grow text-center">
          {t("video:confirm_done")}
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal({...modal, cancelVideo: false})}
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
        />
      </div>

      <p className="text-center py-4 mb-0">
        {t("video:note_1") + lessonStatus + t("video:note_2")}
      </p>

      <div className="flex-box justify-content-around mb-5 px-5">
        <button
          onClick={() => !wait && setModal({...modal, cancelVideo: false})}
          className={`${
            wait && "disable-overlay boder-rd-100"
          } main-btn cancel-btn text-bold2 w-50 mr-3`}
        >
          {t("video:i_have_no") + lessonStatus}
        </button>

        <button
          onClick={closingLesson}
          className={`${
            wait && "disable-overlay boder-rd-100"
          } main-btn orange-btn-hover w-50`}
        >
          {t("video:i_have") + lessonStatus}
        </button>
      </div>
    </>
  );
};

export default CancelVideoModal;
