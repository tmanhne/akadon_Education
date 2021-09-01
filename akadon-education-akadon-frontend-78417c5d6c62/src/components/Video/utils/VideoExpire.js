import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { lessonClose } from "../../../api";

const VideoExpire = ({modal, setModal, room, entityId }) => {
  const { t } = useTranslation("toast");

  // LONG THÊM STATE BTN WAIT
  const [wait, setWait] = useState(false);

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
      toast.error(` ${t("toast:er_55")}  ${res.response.status} !`, {
        className: "bg-hightlight-1 border-radius-1 text-light",
        autoClose: false,
      });
      setWait(false);
    }
  }
  return (
    <Card className="video__cancle-modal card-style border-0">
      <p className="text-center py-5 mb-0">{t("video:expire_lesson")}</p>
      <div className="flex-box justify-content-around mb-5">
        <div
          onClick={closingLesson}
          className={`${
            wait && "disable-overlay boder-rd-100"
          } main-btn submit-btn btn w-50`}
        >
          {t("video:lesson_done")}
        </div>
      </div>
    </Card>
  );
};

export default VideoExpire;
