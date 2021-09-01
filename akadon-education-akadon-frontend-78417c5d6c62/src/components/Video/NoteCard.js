import React, { useState, useEffect } from "react";
import { Card, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { addNote, getNoteList } from "../../api";
import { toast } from "react-toastify";

import FormatTimestamp from "../utils/FormatTimestamp";
import { UncontrolledTooltip } from "reactstrap";

const NoteCard = ({ notes, lessonNo, setNotes }) => {
  const { t } = useTranslation(["lesson-detail", "toast"]);

  // LONG THAY ĐỔI FETCHNOTE, HANDLENOTE KÉO VỀ từ video vào FILE này. vì lỗi rerender

  // LOCAL STATE DECLARAIONS
  const [loading, setLoading] = useState([]);
  const [textNote, setTextNote] = useState("");

  // SIDE EFFECTS
  useEffect(() => {
    fetchNotes();
  }, []);

  // FUNCTION DECLARATIONS
  async function fetchNotes() {
    setLoading(["loading_note"]);
    const res = await getNoteList({ lesson_id: lessonNo });
    setLoading([]);

    if (res.status < 400) {
      setNotes([...res.data]);
    } else {
      toast.error(t("toast:er_48"), { autoClose: false });
    }
  }

  const handleAddNote = async () => {
    if (!textNote) return;
    const res = await addNote({ lesson_id: lessonNo, note: textNote });
    if (res.status < 400) {
      fetchNotes();
      setTextNote("");
      toast.success(t("toast:sucess_29"));
    } else {
      toast.error(t("toast:er_49"), { autoClose: false });
    }
  };

  return (
    <Card className="video__note-card card-style border-radius-2 box-shadow">
      <div className="flex-box justify-content-between mb-3">
        <p className="text-bold2 mb-0">{t("note-1")}</p>
        <div
          onClick={handleAddNote}
          className="rounded-circle center-box bg-hightlight-1 btn"
          id="save-note"
        >
          <FontAwesomeIcon
            className=" text-light text-small"
            icon={["fas", "paper-plane"]}
          />
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
            target="save-note"
            placement="top"
          >
            {t("lesson_detail:save_note")}
          </UncontrolledTooltip>
        </div>
      </div>
      <Input
        className="border-radius text-small mb-2"
        placeholder={t("note-1")}
        type="textarea"
        rows={10}
        value={textNote}
        onChange={(e) => setTextNote(e.target.value)}
      />
      {notes.map((data) => (
        <div className="note border-bottom" key={data.id}>
          <div className="flex-box justify-content-between text-grey">
            <span className="text-small">
              <FormatTimestamp timestamp={data.created_datetime} />
            </span>
            <FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
          </div>
          <p className="text-wrap text-small mb-12px">{data.note}</p>
        </div>
      ))}
    </Card>
  );
};

export default NoteCard;
