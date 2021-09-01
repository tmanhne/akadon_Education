import React from "react";
import after from "../../../assets/images/after15.png";

const After15 = ({
  modal,
  setModal,
  setWaitingMore,
  forceclose,
  loading,
  t,
}) => {
  function handleWaitingMore() {
    if (loading) return;
    setWaitingMore(true);
    setModal({ ...modal, trialWaiting: false });
  }
  return (
    <>
      <div className="d-flex justify-content-center pt-4">
        <img src={after} alt="sau15p" />
      </div>

      <p className="text-center py-4 px-5 mb-0">{t("video:waiting_2")}</p>

      <div className="flex-box justify-content-around mb-5 px-5">
        <button
          className={` ${
            loading && "disable-overlay boder-rd-100"
          } main-btn cancel-btn text-bold2 w-50 mr-3`}
          onClick={() => forceclose()}
        >
          {t("video:delete_lesson")}
        </button>

        <button
          className={` ${
            loading && "disable-overlay boder-rd-100"
          } main-btn text-bold2 w-50 mr-3 `}
          onClick={handleWaitingMore}
        >
          {t("video:waiting_3")}
        </button>
      </div>
    </>
  );
};

export default After15;
