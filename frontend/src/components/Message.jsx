import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment"; // optional for time formatting

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwnMessage = message?.senderId === authUser?._id;
  const profilePic = isOwnMessage
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;

  return (
    <div
      ref={scroll}
      className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} mb-3`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={profilePic} />
        </div>
      </div>
      <div className="chat-header mb-1 text-xs text-gray-500">
        {moment(message?.createdAt).format("hh:mm A")}
      </div>
      <div
        className={`chat-bubble px-4 py-2 max-w-xs ${
          isOwnMessage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
