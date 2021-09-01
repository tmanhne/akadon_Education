import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledTooltip } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { getRequestDetail } from "../../../api";
import {
  shareScreenHandler,
  toogleMicrophone,
  toogleVideo,
} from "./TwilioConfig";

function VideoBtnGroup({
  fullScreen,
  isTrial,
  match,
  userType,
  room,
  startDate,
  VideoCardDropdown,
  NoteTooltip,
  ChatTooltip,
  modal,
  setModal,
  t,
}) {
  const [mute, setMute] = useState(false);
  const [pause, setPause] = useState(false);
  const [endBtn, setEndBtn] = useState(false);

  const { courseId } = match.params;
  const history = useHistory();

  // SIDE EFFECTS
  useEffect(() => {
    toogleMicrophone(room, mute);
  }, [mute]);

  useEffect(() => {
    toogleVideo(room, pause);
  }, [pause]);

  useEffect(() => {
    const time15m = moment(startDate).add(15, `minutes`);
    const interval = setInterval(() => {
      const left = time15m.diff(moment());
      if (left <= 0) {
        setEndBtn(true);
        clearInterval(interval);
      }
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  // FUNCTION DECLARATIONS

  function handleCancel() {
    if (userType === "tutor" && isTrial) {
      // LONG thay đổi logic khi gia sư kết thúc video call
      (async () => {
        const res = await getRequestDetail(courseId);
        if (res.data?.status === 8) {
          toast.warning(t("video:waiting_1"));
        }
        if (res.data?.status === 3) {
          room && room.disconnect();
          history.push("/dashboard-tutor/courses?status=pending");
        }
        if (res.data?.status === 1) {
          room && room.disconnect();
          history.push("/dashboard-tutor/home");
        }
      })();
    } else {
      isTrial
        ? setModal({ ...modal, confirmDoneTrial: true })
        : setModal({ ...modal, cancelVideo: true });
    }
  }

  function LeaveCallBtn() {
    return (
      <div className="end-call position-absolute flex-box mb-3">
        {/* End video call */}
        <div
          onClick={handleCancel}
          id="is-cancle-call"
          className="main-btn orange-btn-hover px-4 py-1 font-weight-normal"
        >
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
            target="is-cancle-call"
            placement="top"
          >
            {t("leave-call")}
          </UncontrolledTooltip>
          {t("video:close_lesson")}
        </div>
      </div>
    );
  }

  return (
    <>
      {(isTrial || endBtn) && <LeaveCallBtn />}
      {/* CENTER BUTTONS GROUP */}
      <div className="video-cta position-absolute flex-box center-box w-100 mb-3">
        {/* set mute/unmute */}
        <div
          id="set-mute"
          onClick={() => setMute(!mute)}
          className={`${
            mute && "microphone"
          } flex-box center-box rounded-circle mx-3`}
        >
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
            target="set-mute"
            placement="top"
          >
            {mute ? t("unmute") : t("mute")}
          </UncontrolledTooltip>
          <FontAwesomeIcon icon={["fas", "microphone"]} />
        </div>

        {/* set active/inactive camera */}
        <div
          id="join-call-room"
          onClick={() => setPause(!pause)}
          className={`${
            pause && "camera"
          } flex-box center-box rounded-circle mr-3`}
        >
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
            target="join-call-room"
            placement="top"
          >
            {pause ? t("active-camera") : t("inactive-camera")}
          </UncontrolledTooltip>
          <FontAwesomeIcon icon={["fal", "video"]} />
        </div>

        {/* Back to lesson detail */}
        <div
          onClick={() => {
            history.goBack();
            room && room.disconnect();
          }}
          id="back-to-lesson-detail"
          className="call-btn flex-box center-box rounded-circle call-btn-active"
        >
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-justify p-3"
            target="back-to-lesson-detail"
            placement="top"
          >
            {t("back_btn")}
          </UncontrolledTooltip>
          <FontAwesomeIcon icon={["fas", "phone-alt"]} />
        </div>
      </div>

      {/* RIGHT BUTTONS GROUP */}
      <div className="zoom-btn position-absolute flex-box mb-3">
        {fullScreen && (
          <>
            <div
              id="note-tooltip"
              className="flex-box center-box rounded-circle mr-3"
            >
              <FontAwesomeIcon
                className="text-hightlight font-weight-bold"
                icon={["fas", "book"]}
              />
            </div>
            {NoteTooltip}

            <div
              id="chat-tooltip"
              className="flex-box center-box rounded-circle mr-3"
            >
              <FontAwesomeIcon
                className="text-hightlight1 font-weight-bold"
                icon={["fas", "comment-lines"]}
              />
            </div>
            {ChatTooltip}
          </>
        )}

        <div
          id="video-presentation"
          onClick={() => shareScreenHandler(room, t)}
          className="flex-box center-box rounded-circle mr-3"
        >
          <FontAwesomeIcon
            className="text-grey font-weight-bold"
            icon={["fas", "arrow-up"]}
          />
          <UncontrolledTooltip
            className="placement-bottom-tooltip"
            innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
            target="video-presentation"
            placement="top"
          >
            {t("present")}
          </UncontrolledTooltip>
        </div>
        {VideoCardDropdown}
      </div>
    </>
  );
}

VideoBtnGroup.propTypes = {
  mute: PropTypes.bool,
  setMute: PropTypes.func,
  setPause: PropTypes.func,
  pause: PropTypes.bool,
  fullScreen: PropTypes.bool,
  entityId: PropTypes.string,
  setFullScreen: PropTypes.func,
  shareScreenHandler: PropTypes.func,
  reportModal: PropTypes.bool,
  setReportModal: PropTypes.func,
};

export default VideoBtnGroup;
