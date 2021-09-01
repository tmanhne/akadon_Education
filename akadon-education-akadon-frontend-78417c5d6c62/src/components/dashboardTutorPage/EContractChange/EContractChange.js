import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { getBidChange, editContractDecided } from "../../../api";
import Schedule from "../../utils/Schedule";
import FormatDate from "../../utils/FormatDate";
import { useTranslation } from "react-i18next";

const EditEcontract = ({ match }) => {
  const { t } = useTranslation("toast");
  const [eContract, setEContract] = useState({});
  const history = useHistory();
  const { econtractId } = match.params;

  useEffect(() => {
    (async () => {
      const res = await getBidChange(econtractId);
      if (res.status < 400) {
        setEContract({ ...res.data });
      } else if (res.response) {
        toast.error(
          ` ${t("toast:er_27")}  ${res.response.status || 500}`, {autoClose: false}
        );
      }
    })();
  }, []);

  const handleCheckEditEContract = async (decide) => {
    const payload = {request_change_id: econtractId, decide}
    const res = await editContractDecided(payload);
    if (res.status < 400) {
      decide === 0 && toast.success("Bạn đã từ chối thay đổi E-Contract !");
      decide === 1 && toast.success("Bạn đã chấp thay đổi E-Contract !");
      history.push("/dashboard-tutor/home");
    } else {
      toast.error(` ${t("toast:er_15")}`, {autoClose: false});
    }
  };

  return (
    <>
      <div
        onClick={history.goBack}
        className="flex-box text-grey text-bold1 d-inline-block mb-3"
      >
        <FontAwesomeIcon className="mr-2" icon={["fal", "arrow-left"]} />
        <span style={{ cursor: "pointer" }}>Quay lại</span>
      </div>
      <div className="card-style border-radius-2 p-4 h-100">
        <h4 className="text-bold2 mb-12px">Thay đổi chi tiết khóa học</h4>
        <p className="mb-12px">
          {eContract.created_datetime && (
            <FormatDate date={eContract.created_datetime} />
          )}
        </p>
        <div className="mb-12px">
          <span className="text-grey mr-2">Mã lớp học:</span>
          <span className="text-hightlight h5 mb-0">{eContract.id}</span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Chi phí:</span>
          <span className="text-dark text-bold2">{eContract.fee} VNĐ/buổi</span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Độ dài khóa học:</span>
          <span className="text-dark text-bold2">
            {eContract.number_lesson} buổi
          </span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Thời lượng 1 buổi học:</span>
          <span className="text-dark text-bold2">
            {eContract.lesson_time_length} tiếng
          </span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Đăng ký sử dụng lịch:</span>
          <span className="text-dark text-bold2">
            {eContract.schedule ? "Có" : "Không"}
          </span>
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Thời gian học:</span>
        </div>
        <div className="mb-12px">
          {eContract.schedule && <Schedule schedule={eContract.schedule} />}
        </div>
        <div className="mb-12px">
          <span className="text-grey mr-2">Thông tin về học sinh:</span>
          <span className="text-dark text-bold2">{eContract.student_info}</span>
        </div>
        <div className="mb-5">
          <span className="text-grey mr-2">
            Mong muốn của học sinh với gia sư:
          </span>
          <span className="text-dark text-bold2">
            {eContract.student_propose}
          </span>
        </div>
        <div className="center-box">
          <div
            onClick={() => handleCheckEditEContract(1)}
            style={{ width: "15rem" }}
            className="main-btn font-weight-bold mr-4"
          >
            Chấp nhận
          </div>
          <div
            onClick={() => handleCheckEditEContract(0)}
            style={{ width: "15rem", background: "#C5C6D1" }}
            className="main-btn font-weight-bold"
          >
            Hủy chấp nhận
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEcontract;
