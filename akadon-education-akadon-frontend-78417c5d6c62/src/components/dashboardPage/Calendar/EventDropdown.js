import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createCalendarNote, getCalendarNote } from "../../../api";
import ChalkBoardIcon from "../../../assets/icons/chalk-board.svg";
import NotePadIcon from "../../../assets/icons/notepad.svg";
import ClockIcon from "../../../assets/icons/clock-icon.svg";
import SubjectImage from "../../utils/SubjectImage";
import { dateFormatForServer } from "../../../module";
import Subject from "../../utils/Subject";
import { useTranslation } from "react-i18next";

function EventDropdown({ courseInfo, setModal, t }) {
  // LOCAL STATE DECLARATIONS
  const [note, setNote] = useState();
  const [editNote, setEditNote] = useState(false);
  const [input, setInput] = useState("");

  const history = useHistory();

  let startDate;
  if (courseInfo.lessons) {
    startDate = dateFormatForServer(courseInfo.lessons[0].lesson_date);
  }

  // SIDE EFFECTS
  useEffect(() => {
    getNote();
  }, []);

  // FUNCTION DECLARATIONS
  async function getNote() {
    const payload = { lesson_id: courseInfo.lesson_id };
    const res = await getCalendarNote(payload);
    if (res.status < 400) {
      const rawData = [...res.data][0];
      setNote(rawData);
      if (rawData) {
        setInput(rawData.note);
      }
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  async function addNote() {
    if (input.length === 0) return;
    if (note && input === note.note) return;
    const payload = {
      lesson_id: courseInfo.lesson_id,
      note: input,
    };
    const res = await createCalendarNote(payload);
    if (res.status < 400) {
      toast.success("Success !");
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status} !`);
    }
  }

  function redirectToLessonDetail() {
    const { course_id, lesson_id } = courseInfo;
    if (course_id && lesson_id) {
      const url = `courses/${course_id}/${lesson_id}`;
      history.push(url);
    } else {
      toast.error(`${t("toast:er_11")}`);
    }
  }

  return (
    <>
      <div className="flex-box mb-4">
        <div
          onClick={() => setModal({})}
          className="close-modal-btn cursor-pointer position-absolute"
        >
          <FontAwesomeIcon
            className="text-grey h4 mb-0"
            icon={["fal", "times"]}
          />
        </div>
        <SubjectImage
          subject={courseInfo.subject_name}
          width={74}
          height={74}
        />
        <div className="ml-2">
          <h5 className="mb-2 text-bold2">
            <Subject subject={courseInfo.subject_name} />
          </h5>
          <span className="text-small text-grey">
            {t("calendar-page:lesson_id")}{" "}
          </span>
          <span className="text-small text-bold2">{courseInfo.course_id}</span>
        </div>
      </div>

      <div className="flex-box mb-4">
        <img src={ClockIcon} width={20} alt="start time" />
        <span className="text-grey text-small mx-2">{t("calendar-page:start_date")} </span>
        <span className="text-dark text-small text-bold2">{startDate}</span>
      </div>

      <div className="flex-box mb-4">
        <img src={ChalkBoardIcon} width={20} alt="tutor name" />
        <span className="text-grey text-small mx-2">{t("calendar-page:tutor")}</span>
        <span className="text-dark text-small text-bold2">
          {courseInfo.tutor_name}
        </span>
      </div>

      <div className="flex-box mb-2">
        <img src={NotePadIcon} width={20} alt="user note" />
        <div className="flex-box mx-2 w-100">
          <p className="text-grey text-small flex-grow mb-0">{t("calendar-page:text_note")} </p>
          <div
            onClick={() => setEditNote(!editNote)}
            style={{ width: "20px", height: "20px" }}
            className="bg-hightlight-1 text-small text-light rounded-circle center-box cursor-pointer"
          >
            {editNote ? (
              <FontAwesomeIcon onClick={addNote} icon={["fas", "save"]} />
            ) : (
              <FontAwesomeIcon icon={["fal", "pencil"]} />
            )}
          </div>
        </div>
      </div>

      {editNote ? (
        <Input
          type="textarea"
          size={5}
          className="w-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <p className="text-dark text-small text-wrap text-bold2">{input}</p>
      )}

      <div className="center-box mt-12px">
        <div
          onClick={redirectToLessonDetail}
          className="main-btn pt-12px pb-12px px-5"
        >
          {t("calendar-page:view_detail")}
        </div>
      </div>
    </>
  );
}

EventDropdown.propTypes = { courseInfo: PropTypes.object };

export default EventDropdown;
