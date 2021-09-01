import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useHistory } from "react-router-dom";

import {
  startVideoCall,
  after15Post,
  realTimeLength,
  getLessonDetail,
} from "../../../api";
import {
  CancelVideoModal,
  VideoExpire,
  NoCameraModal,
  TrialLessonDoneModal,
  JoinVideoAlert,
  After15,
  TrialModal,
  TrialDenyModal,
  TrialSuccessModal,
} from "../utils";
import ChatReportModal from "../../Chat/ChatReportModal";
import VideoBtnGroup from "./VideoBtnGroup";
import VideoDuration from "./VideoDuration";
import Participant from "./Participant";
import After15Count from "./After15Count";
import VideoCardDropdown from "./VideoCardDropdown";
import NoteTooltip from "./NoteTooltip";
import ChatTooltip from "./ChatTooltip";
import { joinTwilioVideo } from "./TwilioConfig";

function VideoCard({
  match,
  fullScreen,
  setFullScreen,
  entityId,
  isTrial,
  status,
  startDate,
  chatToken,
  chatRoom,
  real_starttime,
}) {
  const { userType, email } = useSelector(({ user }) => {
    const { userType, email } = user.info;
    return { userType, email };
  });

  // DECLARE LOCAL STATES
  const [room, setRoom] = useState("");

  const [videoCredential, setVideoCredential] = useState({
    token: "",
    roomName: "",
    users: [],
    duration: 1,
  });

  const [modal, setModal] = useState({
    cancelVideo: false,
    report: false,
    noCamera: false,
    joinVideoAlert: false, //for only trial lesson
    trialLessonDone: false, //for only trial lesson
    confirmDoneTrial: false, //for only trial lesson
    acceptTrial: false, //for only trial lesson
    denyTrial: false, //for only trial lesson
    trialWaiting: false, //for only trial lesson
  });

  const [waitingForUserJoin, setWaitingForUserJoin] = useState(true);
  const [waitingMore, setWaitingMore] = useState(false);
  const [expire, setExpire] = useState(false);
  const [detectCamera, setDetectCamera] = useState(true);
  const [loading, setLoading] = useState(false);
  const [realtimedata, setRealtimeData] = useState([]);

  const history = useHistory();
  const { lessonNo } = match.params;
  const today = moment();
  const { t } = useTranslation(["video", "toast"]);
  const {
    cancelVideo,
    report,
    noCamera,
    trialLessonDone,
    joinVideoAlert,
    confirmDoneTrial,
    acceptTrial,
    denyTrial,
    trialWaiting,
  } = modal;
  const { roomName, duration } = videoCredential;

  // COMPONENT SIDE EFFECTS
  useEffect(() => {
    isTrial && expire && setModal({ ...modal, confirmDoneTrial: true });
  }, [expire]);

  useEffect(() => {
    if (status < 2) {
      fetchVideoCall();
    }

    if (status === 2 && isTrial) {
      setModal({ ...modal, trialLessonDone: true });
    }
  }, [status]);

  useEffect(() => {
    if (room) {
      // LONG ADD WHEN RELOAD AUTO DISCONNECT ROOM
      window.addEventListener("beforeunload", () => {
        room.disconnect();
      });
    }
  });

  useEffect(() => {
    realTime();
    getReltime();
  }, [waitingForUserJoin]);

  // FUNCTION DECLARATIONs
  async function fetchVideoCall() {
    setLoading(true);
    const res = await startVideoCall({ lesson_id: lessonNo });
    setLoading(false);

    if (res.status < 400) {
      const { token, room, users, ttl } = res.data;
      setVideoCredential({
        token,
        users,
        roomName: room,
        duration: ttl,
      });
    } else {
      toast.error(t("toast:er_51"), { autoClose: false });
    }
  }

  async function getReltime() {
    const res = await getLessonDetail(lessonNo);
    if (res.status < 400) {
      res.data.real_start_time && setRealtimeData(res.data.real_start_time);
    }
  }

  async function realTime() {
    const payload = {
      real_start_time: today.format("DD/MM/YYYY-HH:mm:ss"),
      lesson_id: lessonNo,
    };
    const res = await realTimeLength(payload);
    if (res.response) {
      toast.error(` ${res.response.status}`, { autoClose: true });
    }
  }

  function joinCall() {
    if (isTrial && startDate.diff(today, "minutes") > 0) {
      setModal({ ...modal, joinVideoAlert: true });
      return;
    }
    joinTwilioVideo(
      t,
      detectCamera,
      setRoom,
      errorHandling,
      videoCredential,
      email,
      setWaitingForUserJoin,
      setLoading
    );
  }

  function errorHandling() {
    setDetectCamera(false);
    setModal({ ...modal, noCamera: true });
  }

  // Handle when click btn after 15m
  async function forceclose() {
    setLoading(true);
    if (!loading) {
      const res = await after15Post({ lesson_id: lessonNo });

      if (res.status < 400) {
        setLoading(false);
        if (userType === "student") {
          room && room.disconnect();
          history.push("/dashboard/request?status=open-request");
        }
        if (userType === "tutor") {
          room && room.disconnect();
          history.push("/dashboard-tutor/home");
        }
      } else if (res.response) {
        setLoading(false);
        toast.error(t("toast:er_1"), { autoClose: false });
      }
    }
    setLoading(false);
  }

  const modalProps = { setModal, modal, entityId, userType, room, t, match };
  const pageModals = [
    {
      contentClassName: "card-style p-0",
      isOpen: cancelVideo,
      component: <CancelVideoModal {...modalProps} />,
    },
    {
      contentClassName: "card-style",
      isOpen: expire && !isTrial,
      component: <VideoExpire {...modalProps} />,
    },
    {
      modalClassName: "report-modal",
      isOpen: report,
      component: (
        <ChatReportModal
          modal={report}
          setModal={(value) => setModal({ ...modal, report: value })}
          room={roomName}
        />
      ),
    },
    {
      contentClassName: "card-style",
      isOpen: noCamera,
      component: <NoCameraModal {...modalProps} joinCall={joinCall} />,
    },
    {
      contentClassName: "card-style p-0",
      isOpen: trialLessonDone,
      component: <TrialLessonDoneModal {...modalProps} s />,
    },
    {
      contentClassName: "card-style",
      isOpen: joinVideoAlert,
      component: <JoinVideoAlert {...modalProps} startDate={startDate} />,
    },
    {
      contentClassName: "card-style p-0",
      isOpen: trialWaiting,
      component: (
        <After15
          {...modalProps}
          setWaitingMore={setWaitingMore}
          forceclose={forceclose}
          loading={loading}
        />
      ),
    },
    {
      contentClassName: "card-style p-0",
      isOpen: confirmDoneTrial,
      component: <TrialModal {...modalProps} />,
    },
    {
      contentClassName: "card-style p-0",
      isOpen: denyTrial,
      component: <TrialDenyModal {...modalProps} />,
    },
    {
      contentClassName: "card-style",
      isOpen: acceptTrial,
      component: <TrialSuccessModal {...modalProps} />,
    },
  ];

  if (!room) {
    return (
      <>
        <div className="video__video-card mb-12px border-bottom position-relative border-radius-2">
          <button
            disabled={loading || (isTrial && status === 2)}
            onClick={joinCall}
            className="join-room-btn position-absolute main-btn bg-hightlight text-hightlight text-center px-5"
          >
            {loading ? <Spinner /> : t("video:join_video_1")}
          </button>
        </div>
        {pageModals.map((md, index) => (
          <Modal
            key={index}
            contentClassName={md.contentClassName}
            modalClassName={md.modalClassName}
            centered={true}
            isOpen={md.isOpen}
          >
            {md.component}
          </Modal>
        ))}
      </>
    );
  }

  return (
    <div
      className={`video__video-card mb-12px border-bottom position-relative border-radius-2 ${
        fullScreen && "h-100 mt-0"
      } `}
    >
      {/* LOCAL PARTICIPANT */}
      <Participant
        key={room.localParticipant.sid}
        participant={room.localParticipant}
      />

      {/* REMOTE PARTICIPANTS */}
      <div
        id="remote-participants"
        className="remote-participants position-absolute"
      ></div>

      {/* 
          VideoDuration
          MOVE DURATION OUT VIDEO 
        */}

      {isTrial && waitingForUserJoin && !waitingMore && (
        <After15Count
          waitingForUserJoin={waitingForUserJoin}
          modal={modal}
          setModal={setModal}
          startDate={startDate}
          t={t}
          userType={userType}
        />
      )}

      {waitingMore && (
        <div
          className={`${
            loading && "disable-overlay boder-rd-100"
          } join-room-btn position-absolute main-btn bg-hightlight text-hightlight text-center px-5`}
          onClick={() => forceclose()}
        >
          {t("video:delete_lesson")}
        </div>
      )}

      {!waitingForUserJoin && (
        <>
          <VideoDuration
            duration={duration}
            setExpire={setExpire}
            lessonNo={lessonNo}
            real_start_time={real_starttime || realtimedata}
          />
          <VideoBtnGroup
            t={t}
            modal={modal}
            setModal={setModal}
            joinCall={joinCall}
            fullScreen={fullScreen}
            isTrial={isTrial}
            match={match}
            userType={userType}
            room={room}
            startDate={startDate}
            VideoCardDropdown={
              <VideoCardDropdown
                setFullScreen={setFullScreen}
                fullScreen={fullScreen}
                modal={modal}
                setModal={setModal}
              />
            }
            NoteTooltip={<NoteTooltip lessonNo={entityId} />}
            ChatTooltip={
              <ChatTooltip chatRoom={chatRoom} chatToken={chatToken} />
            }
          />
        </>
      )}

      {pageModals.map((md, index) => (
        <Modal
          key={index}
          contentClassName={md.contentClassName}
          modalClassName={md.modalClassName}
          centered={true}
          isOpen={md.isOpen}
        >
          {md.component}
        </Modal>
      ))}
    </div>
  );
}

VideoCard.propTypes = {
  match: PropTypes.object,
  fullScreen: PropTypes.bool,
  setFullScreen: PropTypes.func,
  entityId: PropTypes.string,
};

export default VideoCard;
