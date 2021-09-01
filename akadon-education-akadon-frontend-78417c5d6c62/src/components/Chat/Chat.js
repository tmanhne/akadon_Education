import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./index.scss";
import { getChatHistory } from "../../api";
import ChatScreen from "./ChatScreen";
import SubLoader from "../utils/SubLoader";
import { useTranslation } from "react-i18next";

const Chat = ({ match }) => {
  const { t } = useTranslation("toast");

  const [token, setToken] = useState("");
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatHistory();
  }, [match.params.room]);

  async function fetchChatHistory() {
    const res = await getChatHistory();
    setLoading(false);

    if (res.status < 400) {
      const { room_names, token } = res.data;
      const matchedRoom = room_names.find(
        (room) => room.room_name === match.params.room
      );
      setRoom(matchedRoom);
      setToken(token);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`, {
        autoClose: false,
      });
    }
  }

  if (loading) return <SubLoader />;

  if (!room) return <></>

  return (
    <div className="chat-page flex-box align-items-stretch h-100">
      <ChatScreen room={room} token={token} />
    </div>
  );
};

export default Chat;
