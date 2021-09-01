import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TwilioChat from "twilio-chat";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { getChatHistory } from "../../api";
import ChatItems from "./ChatItems";
import { useTranslation } from "react-i18next";

const ChatDropdown = ({ userType }) => {
  // PROPS EXTRACT
  const url = `/${
    userType === "tutor" ? "dashboard-tutor" : "dashboard"
  }/messages/`;

  // LOCAL STATE DECLARATIONS
  const [rooms, setRooms] = useState([]);
  const [chatClient, setChatClient] = useState();

  const { t } = useTranslation("topnav");

  // COMPONENT SIDE EFFECTS
  useEffect(() => {
    initChatClient();
  }, []);

  // FUNCTION DECLARATIONS
  async function initChatClient() {
    const res = await getChatHistory();
    if (!res.data) {
      return;
    }
    const { token, room_names } = res.data;
    const chatClient = await TwilioChat.create(token);

    setRooms(room_names);
    setChatClient(chatClient);
  }

  async function joinGeneralChannel(room) {
    if (!chatClient) return;

    try {
      // Try to join room
      await chatClient.getSubscribedChannels();
      const channelObject = await chatClient.getChannelByUniqueName(room);
      // Room is not available
      if (channelObject.channelState.status !== "joined") {
        await channelObject.join();
      }
      // Room available fetch some old messages
      return await channelObject.getMessages(1).then((messages) => {
        const lastMessage = Array.from(messages.items)[0];
        if (lastMessage) {
          const messageObj = {
            body: lastMessage.state.body,
            createdAt: lastMessage.state.timestamp,
          };
          return messageObj;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chat-page__dropdown">
      <UncontrolledDropdown direction="down">
        <DropdownToggle className="icon icon-active box-shadow rounded-circle border-0 bg-light mr-2">
          <FontAwesomeIcon icon={["fas", "comment-lines"]} />
        </DropdownToggle>
        <DropdownMenu right className="box-shadow border-radius-2 border p-0">
          <DropdownItem className="p-2 mb-12px border-bottom mb-0" disabled>
            <div className="dropdown-item-wraper">
              <div className="flex-box">
                <h4 className="text-dark text-bold flex-grow">
                  {t("header-1")}
                </h4>
                <span className="text-hightlight1 text-small">
                  {t("mark-read")}
                </span>
              </div>
            </div>
          </DropdownItem>
          {rooms.map((room, index) => (
            <ChatItems
              key={index}
              roomObj={room}
              joinGeneralChannel={joinGeneralChannel}
              url={url}
            />
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default ChatDropdown;
