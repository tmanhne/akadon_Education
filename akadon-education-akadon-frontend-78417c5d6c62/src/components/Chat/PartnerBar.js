import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ChatReportModal from "./ChatReportModal";
import Avatar from "../utils/Avatar";

const PartnerBar = ({ room}) => {
  const [modal, setModal] = useState(false);
  const { name, avatar } = room;
  return (
    <>
      <div className="chat-page__partner-bar box-shadow border-radius-2 card-style flex-box">
        <div className="mr-2">
          <Avatar avatar={avatar} width={36} name={name} />
        </div>

        <div className="flex-grow">
          <p className="text-bold2 mb-1 text-dark">{name}</p>
        </div>

        <UncontrolledDropdown direction="left">
          <DropdownToggle
            style={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <div className="center-box rounded-circle btn text-grey bg-grey">
              <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => setModal(!modal)}
              className="px-3 py-2 border-0 border-redius-3"
            >
              <FontAwesomeIcon
                className="mr-12px h5 mb-0"
                icon={["fal", "exclamation-circle"]}
              />
              <span className="text-dark">Report</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      <ChatReportModal modal={modal} setModal={setModal} room={room} />
    </>
  );
};

export default PartnerBar;
