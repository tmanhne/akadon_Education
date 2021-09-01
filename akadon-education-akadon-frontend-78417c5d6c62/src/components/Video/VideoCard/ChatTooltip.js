import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import ChatScreen from "../../Chat/ChatScreen";

const ChatTooltip = ({ chatToken, chatRoom }) => {
  return (
    <UncontrolledTooltip
      target="chat-tooltip"
      trigger="click"
      className="video__chat-tooltip card-style"
      innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify px-3 py-1"
      popperClassName="navbar-tooltip"
    >
      <ChatScreen room={chatRoom} token={chatToken} />
    </UncontrolledTooltip>
  );
};

export default ChatTooltip;
