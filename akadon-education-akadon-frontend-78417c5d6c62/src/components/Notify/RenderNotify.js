import React from "react";
import PropTypes from "prop-types";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import Subject from "../utils/Subject";

import FormatTimeStamp from "../utils/FormatTimestamp";
import AkadonWarningIcon from "../../assets/icons/akadon-warning.png";
import AkadonAvatar from "../../assets/icons/akadon-avatar.png";
import StudentIcon from "../../assets/icons/student-icon.svg";
import TeachIcon from "../../assets/icons/teacher-icon.svg";
import Avatar from "../utils/Avatar";

function RenderNotify({
  userType,
  data,
  userRootUrl,
  handleReadNotify,
  addLessonsModal,
  setAddLessonsModal,
  editLessonModal,
  setEditLessonModal,
  t,
}) {
  const { read_flg, user, subject_name, text_raw, updated_datetime } = data;
  const arrStr = text_raw.split("-");
  const notifyType = arrStr[0];
  const localUser = user.role;
  // long thêm subjext cho môn toán học

  switch (notifyType) {
    //1. TUTOR SEND A TEACH REQUEST TO STUDENT
    case "NEW_BID": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box text-wrap align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2">
              <span>
                {t("notify:new_bid")} <strong><Subject subject={subject_name} /></strong>
              </span>
              <Link
                to={`/${userRootUrl}/request/request-detail/${arrStr[1]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //2. STUDENT PRE-ACCEPT/REMOVE PRE-ACCEPT A BID
    case "BID_DECIDED": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:student")} <strong>{user.name} </strong>{" "}
                <span className="text-hightlight3">{t("notify:accepted")}</span>
                {t("notify:subject_1")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:your")}
              </span>
              <Link
                to={`/${userRootUrl}/request/${arrStr[1]}/${arrStr[2]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //3. STUDENT MAKE A CHANGE FOR TUTOR BID
    case "REQUEST_CHANGE_BID_CONTRACT": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:student")} <strong>{user.name} </strong>
                {t("notify:change_request")}
                <strong>E-contract </strong>
                {t("notify:contract")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:your")}
              </span>
              <Link
                to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //4. TUTOR ACCEPT/DENY CHANGED OR STUDENT ACCEPT A PRE-ACCEPT BID
    case "REQUEST_CONTRACT_CHANGE": {
      const AcceptContent = (
        <div>
          <p className="mb-0 text-wrap mb-3">
            {t("notify:tutor")} <span className="text-bold2">{user.name}</span>
            <span className="text-hightlight-3"> {t("notify:accept")} </span>
            {t("notify:change_econtract")}
            <span className="text-dark text-bold2"><Subject subject={subject_name} /></span>
          </p>
          <Link
            to={`/${userRootUrl}/courses?status=pending`}
            className="mt-2 main-btn py-2 d-block text-decoration-none"
          >
            {t("notify:detail")}
          </Link>
        </div>
      );

      const DenyContent = (
        <div>
          <p className="mb-0 text-wrap mb-3">
            {t("notify:tutor")} <span className="text-bold2">{user.name}</span>
            <span
              style={{ textDecoration: "line-through" }}
              className="text-danger"
            >
              {t("notify:decline")}
            </span>
            {t("notify:change_econtract")}
            <span className="text-dark text-bold2"><Subject subject={subject_name} /></span>
          </p>
          <Link
            to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}}`}
            className="mt-2 main-btn py-2 mb-12px d-block text-decoration-none"
          >
            {t("notify:detail")}
          </Link>
        </div>
      );

      const content = arrStr[4] * 1 === 0 ? DenyContent : AcceptContent;
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>

            {content}
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //5. TUTOR START A COURSE
    case "CONTRACT_FINISH": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:tutor")} <strong>{user.name} </strong>
                {t("notify:start_course_1")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:your")}
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //6. STUDENT/TUTOR MAKE A CHANGE FOR COURSE
    case "CONTRACT_CHANGE": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                <strong>{user.name} </strong>
                {t("notify:change_request_1")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:your_1")}
              </span>
              <Link
                to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //7. LESSON WILL START ON 30 MINUTES
    case "LESSON_0": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:start_lesson_1")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:start_lesson_2")}
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //8. LESSON WILL START ON 1 HOUR
    case "LESSON_1": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:start_lesson_1")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:start_lesson_3")}
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //9. REVIEW FINISH LESSON
    case "REVIEW_LESSON": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {userType === "tutor"
                  ? t("notify:teached")
                  : t("notify:studied")}
                <strong>
                  {t("notify:lesson_no")}
                  {arrStr[3] * 1 + 1}
                  {t("notify:subject_name")}<Subject subject={subject_name} />
                </strong>{" "}
                {t("notify:with")}
                {localUser * 1 === 1 ? t("notify:tutor") : t("notify:student")}
                <strong>{user && user.name}</strong>
                {t("notify:feel")}
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //9. REVIEW FINISH LESSON
    case "CANCEL_CONTRACT": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2 text-wrap">
              <span>
                {t("notify:tutor")} <strong>{user.name}</strong>
                {t("notify:cancel_course")}
                <strong><Subject subject={subject_name} /></strong>
                {t("notify:your")}
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}`}
                className="mt-2 main-btn d-block 
                py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    // 10. LOW HBI WARNING
    case "LOW_ABI": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <img
              src={AkadonWarningIcon}
              width={60}
              className="mx-2"
              alt="akadon warning"
            />
            <div className="pr-2 text-wrap">
              <h5 className="mb-12px font-weight-bold text-left">Warning!</h5>
              <p className="mb-0 text-left">{t("notify:hbi_warning")}</p>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    // 11. ADD LESSONS
    case "NEW_REQUEST_MORE_LESSON": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <img src={AkadonAvatar} width={60} className="mx-2" alt="akadon" />
            <div className="pr-2 text-wrap">
              <p className="mb-2">
                {localUser * 1 === 1 ? t("notify:student") : t("notify:tutor")}
                {t("notify:add_lesson")}
              </p>

              <div className="edit-lesson-toast border-radius-1 pl-12px pr-12px py-2 mb-2">
                <h6 className="mb-2 text-bold2"><Subject subject={subject_name} /></h6>
                <div className="text-truncate">
                  <img src={StudentIcon} alt="img" />
                  <span className="text-grey mx-2">
                    {localUser * 1 === 1 ? t("notify:student") : t("notify:tutor")}
                  </span>
                  <span className="text-bold1 text-dark text-nowrap">
                    {arrStr[3]}
                  </span>
                  <br />
                  <span
                    className="text-grey mr-2"
                    style={{ marginLeft: "31px" }}
                  >
                    {t("notify:lesson_id")}
                  </span>
                  <span className="text-bold1 text-dark text-nowrap">
                    {arrStr[1]}
                  </span>
                </div>
              </div>

              <div
                onClick={() =>
                  setAddLessonsModal({ isOpen: true, payload: arrStr })
                }
                className="main-btn d-inline-block"
              >
                {t("notify:detail")}
              </div>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    // 12. EDIT LESSONS
    case "LESSON_CHANGE": {
      const userType = arrStr[2] === "1" ? t("notify:tutor") : t("notify:student");
      const icon = arrStr[2] === "1" ? TeachIcon : StudentIcon;
      const userName = arrStr[3];
      const lessons = [JSON.parse(arrStr[4]), JSON.parse(arrStr[5])];
      const oldLesson = lessons.find((ls) => !ls.is_new);
      const newLesson = lessons.find((ls) => ls.is_new);
      const payload = { oldLesson, newLesson, contract_id: arrStr[1] };

      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box align-items-start">
            <img src={AkadonAvatar} width={60} className="mx-2" alt="akadon" />
            <div className="pr-2 text-wrap">
              <p className="mb-2">
                {userType + " " + userName + t("notify:edit_lesson")}
                {oldLesson.date}.
              </p>

              <div className="edit-lesson-toast border-radius-1 pl-12px pr-12px py-2 mb-2">
                <h6 className="mb-2 text-bold2"><Subject subject={subject_name} /></h6>
                <div>
                  <img src={icon} alt="subject" />
                  <span className="text-grey mx-2">{userType}: </span>
                  <span className="text-bold1 text-dark">{userName}</span>
                </div>
              </div>

              <div
                onClick={() => setEditLessonModal({ isOpen: true, payload })}
                className="main-btn"
              >
                {t("notify:detail")}
              </div>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    //13. STUDENT ACCEPT TRAIL
    case "NEW_TRIAL_STUDY": {
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className={`px-0 py-3 border-bottom ${!read_flg && "new-notify"} `}
        >
          <div className="flex-box text-wrap align-items-start">
            <div className="mx-2">
              <Avatar avatar={user.avatar} width={56} name={user.name} />
            </div>
            <div className="pr-2">
              <span>
                {t("notify:student")} <strong>{user.name}</strong>
                {t("notify:accept_trial_1")}
                <strong> <Subject subject={subject_name} /></strong>
                {t("notify:start_from")}
                <strong> {arrStr[4].split(":", 2).join(":")}</strong>
                {t("notify:to")}
                <strong>{arrStr[5].split(":", 2).join(":")}</strong>
                {t("notify:day")}
                <strong> {arrStr[3]}</strong>
              </span>
              <Link
                to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}/video?status=trial`}
                className="mt-2 main-btn d-block py-2 text-decoration-none"
              >
                {t("notify:detail")}
              </Link>
            </div>
          </div>
          <p className="text-grey px-2 text-right text-small mb-0">
            <FormatTimeStamp timestamp={updated_datetime} />
          </p>
        </DropdownItem>
      );
    }

    default:
      return (
        <DropdownItem
          onClick={() => handleReadNotify(data)}
          key={data.id}
          className="px-0 py-3 px-2 border-bottom"
        >
          {text_raw}
        </DropdownItem>
      );
  }
}

RenderNotify.propTypes = {
  data: PropTypes.object,
};

export default RenderNotify;
