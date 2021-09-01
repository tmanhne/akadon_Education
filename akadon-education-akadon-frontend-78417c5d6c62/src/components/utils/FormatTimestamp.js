import React from "react";

const FormatTimestamp = ({ timestamp }) => {
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp);
  }
  if (typeof timestamp === "object") {
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();
    const date = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    return <>{`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} - ${date}`}</>;
  } else {
    return ""
  }
};

export default FormatTimestamp;
