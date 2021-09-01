import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const BorderlessFullCalendar = () => {
  const [date, setDate] = useState({});
  const calendarHeader = {
    start: "title",
    center: "",
    end: "prev,next",
  };
  return (
    <div className="card-style box-shadow">
      <FullCalendar
        headerToolbar={calendarHeader}
        titleFormat={{ year: "numeric", month: "numeric" }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="en"
        height={400}
        selectable={true}
        select={(info) => {setDate({start: info.startStr, end: info.endStr, id: 'selected'})}}
        events={[date]}
      />
      <div className="center-box">
        <button className="cancle main-btn center-box box-shadow mr-12px text-hightlight1 font-weight-bold">
          Hủy
        </button>
        <button className="main-btn center-box box-shadow bg-hightlight-1 text-light font-weight-bold">
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default BorderlessFullCalendar;
