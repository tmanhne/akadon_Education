import moment from "moment";
import React, { useState, useEffect } from "react";
import { getLessonDetail } from "../../api";
import { useQuery } from "../../module";

import useFetch from "../customHooks/useFetch";
import Goback from "../utils/Goback";
import SubLoader from "../utils/SubLoader";
import "./index.scss";

import LessonCard from "./LessonCard";
import NoteCard from "./NoteCard";
import PresentCard from "./PresentCard";
import TrialLessonCard from "./TrialLessonCard";

const Video = ({ match }) => {
  const { lessonNo } = match.params;
  const query = useQuery();
  const isTrial = query.get("status") === "trial";

  // LOCAL STATE DECLARAIONS
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState([]);

  const lesson = useFetch(getLessonDetail, setLoading, false, lessonNo) || {};
  
  let startDate = moment();
  if (lesson.lesson_date && lesson.start_time) {
    const dateStr = lesson.lesson_date + " " + lesson.start_time;
    startDate = moment(dateStr);
  }

  if (loading && loading.length > 0) {
    return <SubLoader />;
  }

  return (
    <>
      <Goback />
      <div className="video flex-grow flex-box align-items-stretch position-relative mb-3">
        <div
          style={{ maxWidth: "265px" }}
          className="flex-box flex-column align-items-stretch"
        >
          <div className="mb-12px">
            <LessonCard lesson={lesson || {}} />
          </div>
          <div className="flex-grow h-100">
            {isTrial ? (
              <TrialLessonCard
                lesson={lesson.contract || {}}
                status={lesson.status}
                tutor_free_time={lesson.tutor_free_time || []}
              />
            ) : (
              <NoteCard notes={notes} lessonNo={lessonNo} setNotes={setNotes} />
            )}
          </div>
        </div>

        <div className="flex-grow ml-3">
          <PresentCard
            match={match}
            isTrial={isTrial}
            status={lesson.status}
            real_start_time={lesson.real_start_time}
            startDate={startDate}
            composition_sid={lesson.composition_sid}
            lesson={lesson}
          />
        </div>
      </div>
    </>
  );
};

export default Video;
