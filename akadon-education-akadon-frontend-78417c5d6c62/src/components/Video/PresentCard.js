import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "reactstrap";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

import { getChatToken } from "../../api";
import VideoCard from "./VideoCard/VideoCard";
import ChatScreen from "../Chat/ChatScreen";
import { useTranslation } from "react-i18next";

const PresentCard = ({
  match,
  isTrial,
  status,
  startDate,
  composition_sid,
  real_start_time,
  lesson,
}) => {
  const { t } = useTranslation("toast");
  // PROPS EXTRACT
  const { lessonNo } = match.params;
  const role = useSelector(({ user }) => user.info.role);

  // INIT LOCAL STATES
  const [fullScreen, setFullScreen] = useState(false);
  const [room, setRoom] = useState("");
  const [token, setToken] = useState("");

  // SIDE EFFECTS
  useEffect(() => {
    if (lesson.contract) {
      fetchChatToken();
    }
    return () => {
      setRoom();
      setToken();
    };
  }, [lesson]);

  // FUNCTION DECLARATIONS AND INIT STYLE OBJECT
  async function fetchChatToken() {
    const { tutor, student } = lesson.contract;
    const user_receive_id = role === student.role ? tutor.id : student.id;
    const res = await getChatToken({ user_receive_id });
    if (res.status < 400) {
      const {chat_message, token} = res.data;
      setRoom(chat_message);
      setToken(token);
    } else {
      toast.error(t("toast:er_50"), { autoClose: false });
    }
  }

  const assetUrl =
    process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn";
  const src = `${assetUrl}/code/user_file/lesson/${composition_sid}.mp4`;

  return (
    <div
      className="video__present-card flex-box align-items-stretch flex-column position-relative"
      style={{ minHeight: "100%" }}
    >
      <div className={`${fullScreen ? "fixed-top w-100 h-100" : ""}`}>
        {status === 2 ? (
          <div
            className={`video__video-card center-box text-light mb-12px border-bottom position-relative border-radius-2 ${
              fullScreen && "h-100 mt-0"
            } `}
          >
            {composition_sid ? (
              <ReactPlayer
                url={[
                  {
                    src,
                    type: "video/mp4",
                  },
                ]}
                playing={true}
                controls={true}
                light={true}
                playbackRate={true}
              />
            ) : (
              <div className="h-100 w-100 center-box">{t("toast:no_video")}</div>
            )}
          </div>
        ) : (
          <VideoCard
            match={match}
            setFullScreen={setFullScreen}
            fullScreen={fullScreen}
            entityId={lessonNo}
            isTrial={isTrial}
            status={status}
            startDate={startDate}
            chatToken={token}
            chatRoom={room}
            real_starttime={real_start_time}
          />
        )}
      </div>
      <Card className="card-style flex-grow border-radius-2 box-shadow pt-0 position-static flex-box flex-column align-items-stretch h-100">
        {
          room && <ChatScreen room={room} token={token} />
        }
      </Card>
    </div>
  );
};

export default PresentCard;
