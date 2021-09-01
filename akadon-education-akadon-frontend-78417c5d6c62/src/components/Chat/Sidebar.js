import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormatTimeStamp from "../utils/FormatTimestamp";
import Avatar from "../utils/Avatar";

const Sidebar = ({ match, chatList }) => {
  const rootUserUrl = match.url.split("/")[1];
  return (
    <Card className="chat-page__partner-list card-style border-radius-2 p-0 mr-12px">
      <div className="chat-header flex-box pt-12px pl-12px mb-3">
        <h5 className="mr-12px text-bold2 mb-0">Chat</h5>
        <div className="large-hightlight-box center-box rounded-circle bg-hightlight text-light text-bold1">
          1
        </div>
        <div className="flex-grow text-right pr-12px">
          <FontAwesomeIcon icon={["fas", "comment-alt-edit"]} />
        </div>
      </div>
      <InputGroup className="flex-box border-radius-2 mx-auto bg-grey align-self-stretch px-2 mb-1">
        <InputGroupAddon className="mr-2" addonType="prepend">
          <FontAwesomeIcon
            icon={["fal", "search"]}
            className="text-grey font-weight-bold h5 mb-0"
          />
        </InputGroupAddon>
        <Input
          className="bg-grey p-0 border-0"
          type="text"
          placeholder="Search name"
        />
      </InputGroup>
      {chatList.length > 0 &&
        chatList.map((chat) => (
          <NavLink
            key={chat.room}
            className="flex-box text-dark pl-12px pr-12px pt-12px pb-12px text-decoration-none"
            to={`/${rootUserUrl}/messages/${chat.room}`}
          >
            <div className="mr-2">
              <Avatar avatar={chat.avatar} width={36} name={chat.name} />
            </div>
            <div className="content flex-grow">
              <div className="flex-box justify-content-between mb-1 text-nowrap">
                <p className="mb-0 flex-grow text-bold1">{chat.username}</p>
                <span className="text-grey text-small-1">
                  {chat.lastMessage && (
                    <FormatTimeStamp timestamp={chat.lastMessage.timestamp} />
                  )}
                </span>
              </div>
              <div className="flex-box justify-content-between">
                <p className="text-grey mb-0 text-small text-truncate">
                  {chat.lastMessage ? chat.lastMessage.body : ""}
                </p>
                {/* {p.newMessageCount > 0 && (
                <div className="small-hightlight-box rounded-circle center-box text-light bg-hightlight text-small text-bold1">
                  {p.newMessageCount}
                </div>
              )} */}
              </div>
            </div>
          </NavLink>
        ))}
    </Card>
  );
};

export default Sidebar;
