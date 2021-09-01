import React, {useState} from "react";
import { Input } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ChatInputBox = ({handleNewMessage}) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewMessage(message);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit} className="chat-screen__chat-input-box flex-box box-shadow py-1 pr-12px pl-12px border-radius-2 border-0 w-100">
      <div className="center-box rounded-circle bg-grey text-hightlight1">
        <FontAwesomeIcon
          icon={["fal", "plus"]}
        />
      </div>
      <Input
        type="text"
        className="flex-grow text-small border-0 mx-2"
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" className="center-box rounded-circle bg-grey text-hightlight1 border-0">
        <FontAwesomeIcon
          icon={["fas", "paper-plane"]}
        />
      </button>
    </form>
  );
};
export default ChatInputBox;
