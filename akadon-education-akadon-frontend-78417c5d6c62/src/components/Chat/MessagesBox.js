import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import FormatTimestamp from "../utils/FormatTimestamp";

// LONG CẬP NHẬT THEO LUỒNG SỐ ĐT HAOWJC EMAIL => THAY DỔI AUTHOR

const MessagesBox = ({ messages, getMoreMessages,chat_unique }) => {
  return (
    <div
      id="chatScroller123"
      className="chat-screen__messages-box h-100 d-flex flex-column-reverse overflow-auto"
    >
      {messages.length > 0 && (
        <InfiniteScroll
          style={{ display: "flex", flexDirection: "column-reverse" }}
          dataLength={messages.length}
          next={getMoreMessages}
          hasMore={true}
          inverse={true}
          loader={
            <h6 className="text-center text-grey font-italic">Loading...</h6>
          }
          scrollableTarget="chatScroller123"
        >
          {messages.map((m) => {
            return (
              <div
                className={`flex-box w-75 align-items-start ${
                  m.author !== chat_unique ? "guest" : "owner"
                }`}
                key={m.index}
              >
                {m.author !== chat_unique && (
                  <img
                    className="mr-2 mt-2 image-avatar"
                    src="http://via.placeholder.com/24x24"
                    alt={m.author}
                    width={24}
                    height={24}
                  />
                )}
                <div className="flex-box flex-column align-items-stretch">
                  <div className="border-radius-3 py-2 px-3 mb-2">{m.body}</div>
                  <p className="text-small-1 mb-0 text-grey">
                    <FormatTimestamp timestamp={m.timestamp} />
                  </p>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};



export default MessagesBox;
