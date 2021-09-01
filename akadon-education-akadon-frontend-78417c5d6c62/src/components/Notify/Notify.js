import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";

import "./index.scss";
import {
  getLocalStorage,
  getNotifyHistory,
  getNewNotify,
  readNotify,
  notifyMarkReadAll,
} from "../../api";
import Notify30MinuteModal from "./Modals/Notify30MinuteModal";
import NotifyOneDayModal from "./Modals/NotifyOneDayModal";

import RenderNotify from "./RenderNotify";

import { toastSuccess } from "../../module";
import NewBid from "./ToastComponents/NewBid";
import BidDecided from "./ToastComponents/BidDecided";
import RequestChangeBidContract from "./ToastComponents/RequestChangeBidContract";
import RequestContractChange from "./ToastComponents/RequestContractChange";
import ContractFinish from "./ToastComponents/ContractFinish";
import ContractChange from "./ToastComponents/ContractChange";
import ToastReviewLesson from "./ToastComponents/ToastReviewLesson";
import StartLesson1 from "./ToastComponents/StartLesson1";
import StartLesson0 from "./ToastComponents/StartLesson0";
import ABIWarning from "./ToastComponents/ABIWarning";
import EditLesson from "./ToastComponents/EditLesson";
import AddLesson from "./ToastComponents/AddLesson";
import AddLessonsModal from "./Modals/AddLessonsModal";
import EditLessonModal from "./Modals/EditLessonModal";
import NewTryStudy from "./ToastComponents/NewTryStudy";

const Notify = ({ user }) => {
  // EXTRACT PROPS
  const userType = user.info ? user.info.userType : "";
  const userRootUrl =
    user.info && user.info.userType === "student"
      ? "dashboard"
      : "dashboard-tutor";

  // INIT LOCAL STATES
  const [notify30, setNotify30] = useState({
    modal: false,
    lessonId: "",
    userRootUrl,
  });

  const [notifyOne, setNotifyOne] = useState({
    modal: false,
    lessonId: "",
    userRootUrl,
  });

  const [addLessonsModal, setAddLessonsModal] = useState({
    isOpen: false,
    payload: null,
  });

  const [editLessonModal, setEditLessonModal] = useState({
    payload: null,
    isOpen: false,
  });

  const [notifies, setNotifies] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [unread, setUnread] = useState(0);
  const [reconnectWs, setReconnectWs] = useState(1);
  const ws = useRef(null);
  const { t } = useTranslation(["topnav", "toast", "notify"]);

  // SIDE EFFECTS
  useEffect(() => {
    fetchNotifyHistory();
    fetchNewNotify();
  }, []);

  useEffect(() => {
    // INIT WEBSOCKET
    if (reconnectWs < 20) {
      const token = getLocalStorage("access_token");
      if (!token) {
        console.log("Invalid token");
      }
      const rootEnpoint =
        process.env.REACT_APP_WEBSOCKET_ENDPOINT ||
        "wss://testapi.akadon.edu.vn/";
      const webSocketEndpoint = `${rootEnpoint}ws/notifications/${token}/`;
      ws.current = new WebSocket(webSocketEndpoint);
    }
    return () => {
      ws.current.close();
    };
  }, [reconnectWs]);

  useEffect(() => {
    // IMPLEMENT WEBSOCKET EVENTS
    if (!ws.current) return;
    ws.current.onmessage = (e) => {
      onWsMessage(e);
    };
    ws.current.onerror = (e) => {
      const updateReconnectWs = reconnectWs + 1;
      setReconnectWs(updateReconnectWs);
    };
  }, [ws.current]);

  // FUNCTION DECLERATION
  function onWsMessage(e) {
    fetchNewNotify();
    let jsonStr = e.data;
    let data;
    try {
      data = JSON.parse(JSON.parse(jsonStr)); //SERVER RESPONSE WITH ESCAPE JSON
      setNotifies([data, ...notifies]);
    } catch (e) {
      // console.log(e);
    }

    if (!data) return;

    const { user, subject_name, text_raw } = data;
    const arrStr = text_raw.split("-");
    const notifyType = arrStr[0];

    switch (notifyType) {
      //1. TUTOR SEND A TEACH REQUEST TO STUDENT
      case "NEW_BID": {
        toastSuccess(
          <NewBid
            user={user}
            userRootUrl={userRootUrl}
            arrStr={arrStr}
            subject_name={subject_name}
            t={t}
          />
        );
        break;
      }

      //2. STUDENT PRE-ACCEPT/REMOVE PRE-ACCEPT A BID
      case "BID_DECIDED": {
        toastSuccess(
          <BidDecided
            userRootUrl={userRootUrl}
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            t={t}
          />
        );
        break;
      }

      //3. STUDENT MAKE A CHANGE FOR TUTOR BID
      case "REQUEST_CHANGE_BID_CONTRACT": {
        toastSuccess(
          <RequestChangeBidContract
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //4. TUTOR ACCEPT/DENY CHANGED OR STUDENT ACCEPT A PRE-ACCEPT BID
      case "REQUEST_CONTRACT_CHANGE": {
        toastSuccess(
          <RequestContractChange
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //5. TUTOR START A COURSE
      case "CONTRACT_FINISH": {
        toastSuccess(
          <ContractFinish
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //6. STUDENT/TUTOR MAKE A CHANGE FOR COURSE
      case "CONTRACT_CHANGE": {
        toastSuccess(
          <ContractChange
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //7. LESSON WILL START ON 30 MINUTES
      case "LESSON_0": {
        toastSuccess(
          <StartLesson0
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //8. LESSON WILL START ON 1 HOUR
      case "LESSON_1": {
        toastSuccess(
          <StartLesson1
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      //9. REVIEW FINISH LESSON
      case "REVIEW_LESSON": {
        toastSuccess(
          <ToastReviewLesson
            user={user}
            arrStr={arrStr}
            subject_name={subject_name}
            userRootUrl={userRootUrl}
            t={t}
          />
        );
        break;
      }

      // 10. LOW ABI WARNING
      case "LOW_ABI": {
        toastSuccess(<ABIWarning t={t} />);
        break;
      }

      // 11. LOW ABI WARNING
      case "LESSON_CHANGE": {
        toastSuccess(
          <EditLesson
            t={t}
            subject_name={user && user.subject_name}
            user_name={user && user.name}
            userType={userType}
          />
        );
        break;
      }

      // 12. LOW ABI WARNING
      case "ADD_LESSON": {
        toastSuccess(
          <AddLesson
            userType={userType}
            subject_name={subject_name}
            userName={user && user.name}
            modal={addLessonsModal}
            setModal={setAddLessonsModal}
            t={t}
          />
        );
        break;
      }

      // 13. NEW TRAIL STUDY
      case "NEW_TRIAL_STUDY": {
        toastSuccess(
          <NewTryStudy
            t={t}
            user={user}
            arrStr={arrStr}
            userRootUrl={userRootUrl}
          />
        );
        break;
      }

      default: {
        toast.success(notifyType);
      }
    }
  }

  async function fetchNotifyHistory() {
    const res = await getNotifyHistory(nextPage);
    if (res.status < 400) {
      const rawData = res.data.results;
      if (res.data.next) {
        const { next } = res.data;
        const pageNo = next.split("=")[1];
        setNextPage(pageNo);
      } else {
        setNextPage(null);
      }

      setNotifies([...notifies, ...rawData]);
      return;
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  async function fetchMoreData() {
    if (!nextPage) return;
    fetchNotifyHistory();
  }

  async function fetchNewNotify() {
    const res = await getNewNotify();
    if (res.status < 400) {
      setUnread(res.data.noti_count);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  async function handleReadNotify(data) {
    if (data.read_flg) return;

    const updatedNotify = notifies.map((notify) => {
      if (notify.id === data.id) {
        return { ...data, read_flg: true };
      }
      return { ...data };
    });

    setNotifies(updatedNotify);
    await readNotify(data.id);
  }

  async function readAll() {
    const res = await notifyMarkReadAll({});
    if (res.status < 400) {
      const updatedNotifies = notifies.map((notify) => ({
        ...notify,
        read_flg: true,
      }));
      setNotifies(updatedNotifies);
      await fetchNewNotify();
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <div className="notify">
      <UncontrolledButtonDropdown direction="down">
        <DropdownToggle className="icon icon-active box-shadow rounded-circle border-0 bg-light">
          <FontAwesomeIcon icon={["fas", "bell"]} />
          <span className="unread-number number center-box text-light">
            {unread}
          </span>
        </DropdownToggle>
        <DropdownMenu
          right
          id="notify-scroller"
          className="notify__dropdown box-shadow border-radius-2 border p-0"
        >
          <DropdownItem className="p-2 border-bottom" header>
            <div className="dropdown-item-wraper">
              <div className="flex-box bg-light">
                <h4 className="text-dark text-bold flex-grow">
                  {t("header-2")}
                </h4>
                <span
                  onClick={readAll}
                  className="btn text-hightlight1 text-small cursor-pointer"
                >
                  {t("mark-read")}
                </span>
              </div>
            </div>
          </DropdownItem>
          <InfiniteScroll
            dataLength={notifies.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <h6 className="text-center text-grey font-italic">Loading...</h6>
            }
            scrollableTarget="notify-scroller"
          >
            {notifies.map((data) => (
              <RenderNotify
                userType={userType}
                key={data.id}
                userRootUrl={userRootUrl}
                data={data}
                handleReadNotify={handleReadNotify}
                addLessonsModal={addLessonsModal}
                setAddLessonsModal={setAddLessonsModal}
                editLessonModal={editLessonModal}
                setEditLessonModal={setEditLessonModal}
                t={t}
              />
            ))}
          </InfiniteScroll>
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      <Notify30MinuteModal modal={notify30} setModal={setNotify30} />

      <NotifyOneDayModal modal={notifyOne} setModal={setNotifyOne} />

      <Modal
        isOpen={addLessonsModal.isOpen}
        contentClassName="card-style p-0"
        centered={true}
      >
        <AddLessonsModal
          setModal={setAddLessonsModal}
          modal={addLessonsModal}
        />
      </Modal>

      <Modal
        isOpen={editLessonModal.isOpen}
        contentClassName="card-style p-0"
        centered={true}
      >
        <EditLessonModal
          modal={editLessonModal}
          setModal={setEditLessonModal}
        />
      </Modal>
    </div>
  );
};

Notify.propTypes = {
  user: PropTypes.object,
};

export default connect(({ user }) => ({ user }), null)(Notify);
