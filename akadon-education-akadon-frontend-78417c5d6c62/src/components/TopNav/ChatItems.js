import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { DropdownItem, Spinner } from "reactstrap";

import FormatTimeStamp from "../utils/FormatTimestamp";
import Avatar from "../utils/Avatar";

function ChatItems({ roomObj, joinGeneralChannel, url }) {
  const [lastMessage, setLastMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const {avatar, name, room_name} = roomObj;
  const {body, createdAt} = lastMessage;

  useEffect(() => {
    getLastMessage();
  }, [])

  async function getLastMessage() {
    setLoading(true);
    const message = await joinGeneralChannel(room_name);
    setLoading(false);

    if (message) {
      setLastMessage(message);
    }
  }

  return (
    <DropdownItem className="p-0">
      <NavLink
        className="flex-box text-dark pl-12px pr-12px pt-12px pb-12px text-decoration-none"
        to={`${url}${room_name}`}
      >
        <Avatar avatar={avatar} width={36} name={name} />
        <div className="content ml-2 flex-grow">
          <div className="flex-box justify-content-between mb-1 text-nowrap">
            <p className="mb-0 flex-grow text-bold1">{name}</p>
            <span className="text-grey text-small-1">

                <FormatTimeStamp
                  timestamp={createdAt}
                />

            </span>
          </div>
          <div className="flex-box justify-content-between">
            {
              loading ? <Spinner color="secondary" size="sm" /> :
              <p
                className="new-message mb-0 text-small text-truncate"
              >
                {body}
              </p>
            }
            
          </div>
        </div>
      </NavLink>
    </DropdownItem>
  );
}

ChatItems.propTypes = { roomObj: PropTypes.object, joinGeneralChannel: PropTypes.func, url: PropTypes.string };

export default ChatItems;
