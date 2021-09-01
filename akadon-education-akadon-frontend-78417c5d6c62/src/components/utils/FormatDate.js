import React from "react";

const FormatDate = ({ date }) => {
  if (!date) {
    return "";
  }
  const dateConstance = new Date(date);
  const year = dateConstance.getFullYear();
  const month = dateConstance.getMonth() + 1;
  const day = dateConstance.getDate();
  return (
    <>
      <span>{day < 10 ? "0" + day : day}/{month < 10 ? "0" + month : month}/{year}</span>
    </>
  );
};

export default FormatDate;
