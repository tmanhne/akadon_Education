import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ScheduleList from "../../utils/ScheduleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addLessonsDecide, getModifySchedule } from "../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function AddLessonsModal({ modal, setModal }) {
  const { t } = useTranslation("toast");
  // EXTRACT PROPS
  const { payload } = modal;
  const contract_id = payload[1];
  const lesson_request_id = payload[2];

  // LOCAL STATE DECLARATIONS
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const payload = { lesson_request_id };
      const res = await getModifySchedule(payload);

      if (res.status < 400) {
        setSchedule([...res.data]);
      }
    })();
  }, []);

  async function handleAddLessons(decide) {
    const payload = {
      contract_id,
      request_id: lesson_request_id,
      decide,
    };

    setLoading(true);
    const res = await addLessonsDecide(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("toast:sucess_1"));
      if (decide === 1) {
        setModal({ ...modal, isOpen: false });
      }
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box py-2 px-3 border-bottom mb-3">
        <h5 className="mb-0 flex-grow text-bold2 text-center">Thêm buổi</h5>
        <FontAwesomeIcon
          onClick={() => setModal({ ...modal, isOpen: false })}
          icon={["fal", "times"]}
          className="text-grey h4 m-0"
        />
      </div>

      <div className="px-3 pb-4">
        <ScheduleList schedule={schedule} />
      </div>

      <div className="flex-box px-3 mb-4">
        <div
          className="bg-hightlight rounded-circle mr-2"
          style={{ width: "8px", height: "8px" }}
        ></div>
        <p className="mb-0 text-grey">Buổi học thêm mới của Học viên</p>
      </div>

      <div className="center-box mb-4 px-3">
        <button
          disabled={loading}
          onClick={() => handleAddLessons(0)}
          className={`cancel-btn w-50 mr-3 ${
            loading && "disable-overlay border-rd-100"
          }`}
        >
          Từ chối
        </button>
        <button
          disabled={loading}
          onClick={() => handleAddLessons(1)}
          className={`main-btn w-50 ${
            loading && "disable-overlay border-rd-100"
          }`}
        >
          Đồng ý
        </button>
      </div>
    </>
  );
}

AddLessonsModal.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default AddLessonsModal;
