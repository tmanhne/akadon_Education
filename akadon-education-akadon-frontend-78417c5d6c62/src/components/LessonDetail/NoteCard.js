import React, { useState, useEffect } from "react";
import { Card, InputGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import FormatTimestamp from "../utils/FormatTimestamp";
import { addNote, getNoteList } from "../../api";
import Empty from "../../assets/images/empty-feedback.png";

const NoteCard = ({ match }) => {
  const [notes, setNotes] = useState([]);
  const [textNote, setTextNote] = useState("");
  const { lessonId } = match.params;
  const { t } = useTranslation(["lesson-detail", "toast"]);

  useEffect(() => {
    fetchNotes();
    return () => {
      setNotes();
    };
  }, [lessonId]);

  async function fetchNotes() {
    const res = await getNoteList({ lesson_id: lessonId });
    if (res.status < 400) {
      setNotes([...res.data]);
    } else {
      toast.error(t("toast:er_32"), { autoClose: false });
    }
  }

  const handleAddNote = async () => {
    const res = await addNote({ lesson_id: lessonId, note: textNote });
    if (res.status < 400) {
      fetchNotes();
      setTextNote("");
      toast.success("Note sucess ! ");
    } else {
      toast.error(t("toast:er_33"), { autoClose: false });
    }
  };

  return (
    <Card className="card-style lesson-detail__note-card">
      <div className="flex-box justify-content-between">
        <p className="text-bold2 mb-3">{t("note-1")}</p>
        <div onClick={handleAddNote} className="center-box btn">
          <FontAwesomeIcon
            className="text-light"
            icon={["fas", "paper-plane"]}
          />
        </div>
      </div>
      <InputGroup className="mb-2">
        <Input
          className="text-small"
          rows={5}
          type="textarea"
          placeholder={t("note-2")}
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
        />
      </InputGroup>
      {notes.length === 0 && (
        <div>
          <div className="flex-box justify-content-center">
            <img src={Empty} alt="emty note" className="mb-3" />
          </div>
          <p className="text-grey text-small text-center">{t("note-3")}</p>
        </div>
      )}
      {notes.map((data) => (
        <div key={data.id} className="lesson-detail__note-card--content">
          <div className="flex-box justify-content-between">
            <span className="text-grey text-small">
              <FormatTimestamp timestamp={data.created_datetime} />
            </span>
            <FontAwesomeIcon
              className="text-grey h4"
              icon={["fas", "ellipsis-h"]}
            />
          </div>
          <p className="mb-2">{data.note}</p>
        </div>
      ))}
    </Card>
  );
};

export default NoteCard;
