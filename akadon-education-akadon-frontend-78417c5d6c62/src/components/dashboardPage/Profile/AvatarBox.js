import React from "react";
import { Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateAvatar } from "../../../api";
import { useTranslation } from "react-i18next";

const AvatarBox = () => {
  const { t } = useTranslation("toast");
  async function uploadAvatar(avatar) {
    if (!avatar) return;
    // CHECK FILE IS IMAGE
    if (avatar[0] && avatar[0].type.split("/")[0] !== "image") {
      toast.error(t("toast:er_22"), {
        autoClose: false,
      });
      return false;
    }
    let formData = new FormData();
    formData.append("avatar", avatar[0]);
    const res = await updateAvatar(formData);
    if (res.status < 400) {
      toast.success(t("sucess_3"));
      window.location.reload();
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <div
      style={{ bottom: "0", left: 0, width: "96px" }}
      className="camera-box position-absolute h-100 flex-box justify-content-center align-items-end rounded-circle"
    >
      <Label className="text-light mb-0 pb-2" for="avatar">
        <FontAwesomeIcon icon={["fas", "camera"]} />
      </Label>
      <Input
        onChange={(e) => uploadAvatar(e.target.files)}
        type="file"
        id="avatar"
        className="d-none"
      />
    </div>
  );
};

export default AvatarBox;
