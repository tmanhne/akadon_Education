import React, { useState, useEffect } from "react";
import Chat from "twilio-chat";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import MessagesBox from "./MessagesBox";
import ChatInputBox from "./ChatInputBox";
import PartnerBar from "./PartnerBar";
import { SubLoader } from "../utils";

const ChatScreen = ({ room, token }) => {
  const { t } = useTranslation(["toast", "chat"]);
  // LOCAL STATE DECLARATIONS
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginator, setPaginator] = useState();
  const chat_unique = useSelector(({ user }) => user.info.chat_unique);

  const { room_name, name } = room;

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      if (token) {
        //1. Create new twilio chat instance
        let chatClient;
        setLoading(true);
        if (Chat.Client) {
          chatClient = await Chat.Client.create(token);
        } else {
          chatClient = await Chat.create(token);
        }

        //2. Join a channel
        await joinGeneralChannel(chatClient);
        setLoading(false);
      }
    })();
  }, [room, token]);

  // FUNCTION DECLARATIONS
  async function joinGeneralChannel(chatClient) {
    try {
      // Try to join room
      await chatClient.getSubscribedChannels();
      const channelObject = await chatClient.getChannelByUniqueName(room_name);
      setChannel(channelObject);
      // Room is not available
      if (channelObject.channelState.status !== "joined") {
        await channelObject.join();
        window.addEventListener("beforeunload", () => channelObject.leave());
      }
      // Room available fetch some old messages
      await channelObject.getMessages(15).then((page) => {
        setPaginator(page);
        const messagesList = [];
        const items = page.items || [];
        items.map((item) => {
          messagesList.unshift({
            author: item.state.author,
            body: item.state.body,
            index: item.state.index,
            timestamp: item.state.timestamp,
          });
        });
        setMessages([...messagesList]);
      });
    } catch (error) {
      createGeneralChannel(chatClient);
    }
  }

  async function createGeneralChannel(chatClient) {
    try {
      const channel = await chatClient.createChannel({
        uniqueName: room_name,
      });
      joinGeneralChannel(chatClient);
    } catch (error) {
      console.log(error);
    }
  }

  function configureChannelEvents(channel) {
    channel.on("messageAdded", (message) => {
      setMessages([
        {
          author: message.state.author,
          body: message.state.body,
          timestamp: message.state.timestamp,
          index: message.state.index,
        },
        ...messages,
      ]);
    });

    channel.on("memberJoined", (member) => {
      setMessages([...messages, { body: name + t("chat:join_room") }]);
    });

    channel.on("memberLeft", (member) => {
      setMessages([...messages, { body: name + t("chat:leave_room") }]);
    });
  }

  function handleNewMessage(text) {
    if (!text || !text.trim()) return;
    channel && channel.sendMessage(text);
  }

  function getMoreMessages() {
    if (!paginator) return;

    const { hasPrevPage, prevPage } = paginator;
    if (hasPrevPage) {
      prevPage().then((page) => {
        const messagesList = [];
        const items = page.items || [];
        items.map((item) => {
          const isDuplicate = messages.find(
            (msg) => msg.index === item.state.index
          );
          if (!isDuplicate) {
            messagesList.unshift({
              author: item.state.author,
              body: item.state.body,
              index: item.state.index,
              timestamp: item.state.timestamp,
            });
          }
        });
        setMessages([...messages, ...messagesList]);
      });
    }
  }

  // CHANNEL LISTENING EVENT
  if (channel && channel.channelState.status === "joined") {
    configureChannelEvents(channel);
  }

  return (
    <div className="chat-screen flex-grow h-100 flex-box flex-column align-items-stretch">
      <div className="mb-3">
        <PartnerBar room={room} />
      </div>
      <div className="messages-box-wrapper mb-3 flex-grow">
        {loading ? (
          <SubLoader />
        ) : (
          <MessagesBox
            messages={messages}
            getMoreMessages={getMoreMessages}
            chat_unique={chat_unique}
          />
        )}
      </div>
      <div className="mb-3 box-shadow">
        <ChatInputBox handleNewMessage={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChatScreen;
