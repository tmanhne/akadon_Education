import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";
import { getChatToken } from "../../../api";

function ConnectionBox({ url, id, phone_number, t }) {
  const history = useHistory();

  async function handleChat() {
    if (!id) {
      toast.error(t("toast:er_13"), { autoClose: false });
      return;
    }

    const payload = { user_receive_id: id };

    const res = await getChatToken(payload);

    if (res.status < 400) {
      const { room_name } = res.data.chat_message;
      history.push(`/${url}/messages/${room_name}`);
    } else if (res.response) {
      toast.error(t("toast:er_14"), { autoClose: false });
    }
  }
  return (
    <div className="connection-box position-absolute flex-box">
      <a
        className="call-icon position-relative text-center rounded-circle text-light mr-12px"
        href={`tell:${phone_number}`}
      >
        <FontAwesomeIcon icon={["fas", "phone-alt"]} />
        <span className="phone-number-box bg-hightlight-1 text-light px-2 text-bold1 border-radius-2 position-absolute text-nowrap">
          {phone_number}
        </span>
      </a>
      <div
        onClick={handleChat}
        className="chat-icon text-center rounded-circle text-light"
      >
        <FontAwesomeIcon icon={["fas", "comment-lines"]} />
      </div>
    </div>
  );
}

ConnectionBox.propTypes = {
  id: PropTypes.number,
  phone_number: PropTypes.string,
  t: PropTypes.func,
};

export default ConnectionBox;
