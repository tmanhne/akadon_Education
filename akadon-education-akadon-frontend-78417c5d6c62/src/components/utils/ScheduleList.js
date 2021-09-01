import React, { useState, useEffect } from "react";
import { TabContent, TabPane } from "reactstrap";
import moment from "moment";
import { useTranslation } from "react-i18next";
import MonthSchedule from "./MonthSchedule";

const ScheduleList = ({ schedule }) => {
  const { t } = useTranslation("calendar-page");
  // INIT LOCAL STATES
  const [activeTab, setActiveTab] = useState("");
  let events = [];
  let uniqueEvents = [];
  let monthSchedules = [];

  // SIDE EFFECTS
  useEffect(() => {
    if (monthSchedules) {
      setActiveTab(monthSchedules[0]);
    }
  }, [schedule]);

  // PREPARING DATA FOR SCHEDULE LIST
  if (schedule) {
    // GET UNIQUE EVENTS
    events = schedule.map((s) => ({
      ...s,
      date: s.date && moment(s.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
    }));

    // Remove duplicate date on old data
    let uniqueDates = [...new Set(events.map((evt) => evt.date))];

    uniqueDates.forEach((date) => {
      let event = events.filter((evt) => evt.date === date)[0];
      uniqueEvents.push(event);
    });
    // SPLIT UNIQUE EVENTS INTO EACH MONTH EVENTS
    monthSchedules = [
      ...new Set(
        uniqueEvents.map((evt) => {
          return evt.date && evt.date.split("-").slice(0, 2).join("-");
        })
      ),
    ];
  }

  return (
    <>
      <div className="flex-box flex-wrap">
        {monthSchedules.map((month) => (
          <div
            key={month}
            onClick={() => setActiveTab(month)}
            className={`border-radius-2 cursor-pointer d-inline-block border mr-3 mb-3 px-3 py-2 ${
              activeTab === month && "schedule-active-tab"
            }`}
          >
            {month && (
              <span>
                {t("month")} {month.split("-")[1]}/{month.split("-")[0]}
              </span>
            )}
          </div>
        ))}
      </div>
      <TabContent activeTab={activeTab} id="bg-w">
        {monthSchedules.map((month) => (
          <TabPane key={month} tabId={month}>
            <MonthSchedule events={uniqueEvents} month={month} />
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default ScheduleList;
