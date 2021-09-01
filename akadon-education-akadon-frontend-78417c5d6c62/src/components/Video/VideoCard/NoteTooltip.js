import React, {useState} from "react";
import { Tooltip, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { useTranslation, Trans} from "react-i18next";
import {addNote} from "../../../api";

const NoteTooltip = ({lessonNo}) => {
  const { t } = useTranslation("toast");
  const [textNote, setTextNote] = useState("");
  const [tooltip, setTooltip] = useState(false);

  const handleAddNote = async () => {
    const res = await addNote({lesson_id: lessonNo, note: textNote});
    if (res.status < 400) {
      setTextNote("");
      toast.success(t("toast:sucess_29"));
      setTooltip(!tooltip);
    } else {
      toast.error(t("toast:er_49"), {autoClose: false});
    }
  };
  return (
    <Tooltip
      isOpen={tooltip}
      toggle={() => setTooltip(!tooltip)}
      target="note-tooltip"
      trigger="click"
      className="video__note-tooltip card-style"
      innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify px-3 py-1"
      popperClassName="navbar-tooltip"
    >
      <div className="flex-box justify-content-between mb-2">
        <p className="text-bold2 text-dark mb-0">{t("toast:note")}</p>
        <div
          onClick={handleAddNote}
          style={{ width: "1.5rem", height: "1.5rem" }}
          className="rounded-circle center-box bg-hightlight-1"
        >
          <FontAwesomeIcon
            className="text-light text-small"
            icon={["fas", "paper-plane"]}
          />
        </div>
      </div>
      <Input
        className="border-radius-2 text-small mb-2"
        placeholder="Ghi chú"
        type="textarea"
        rows={10}
        value={textNote}
        onChange={(e) => setTextNote(e.target.value)}
      />
    </Tooltip>
  );
};

export default NoteTooltip;
