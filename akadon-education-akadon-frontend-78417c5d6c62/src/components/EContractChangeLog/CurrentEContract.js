import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { editContractDecided } from "../../api";
import CurrencyFormat from "../utils/CurrencyFormat";
import Schedule from "../utils/Schedule";
import EditEContractModal from "../dashboardPage/ContractDetail/EditEContractModal";
import { useTranslation } from "react-i18next";

const CurrentEContract = ({
  userType,
  econtract,
  contract,
  econtractId,
  contractId,
  firstEContract,
  eContractChangeId,
}) => {
  const { t } = useTranslation("toast");
  // LONG THÊM STATE WAIT BTN
  const [wait, setWait] = useState(false);
  // LOCAL STATE DECLARATIONS
  const [modal, setModal] = useState(false);
  const history = useHistory();
  // FUNCTION DECLARATIONS
  const handleCheckEditEContract = async (decide) => {
    setWait(true);
    if (wait) {
      return true;
    }
    const payload = { request_change_id: eContractChangeId, decide };
    const res = await editContractDecided(payload);
    if (res.status < 400) {
      decide === 0 && toast.success("Bạn đã từ chối thay đổi E-Contract !");
      decide === 1 && toast.success("Bạn đã chấp thay đổi E-Contract !");
      const url =
        decide === 1
          ? `/dashboard-tutor/courses/pending/${contractId}/${econtractId}`
          : "/dashboard-tutor/home";
      history.push(url);
    } else {
      toast.error(t("toast:er_15"), {
        autoClose: false,
      });
      setWait(false);
    }
  };
  return (
    <>
      <div className="flex-box align-items-start">
        <FontAwesomeIcon
          className="text-hightlight2 mr-2 mt-2"
          icon={["fas", "sticky-note"]}
        />
        <p className="text-small font-italic text-grey">
          Gia sư và học viên trao đổi thêm về thông tin khóa học và có quyền
          thay đổi chi tiết khóa học dựa trên sự đồng ý của cả hai bên
        </p>
      </div>
      <div className="flex-box">
        <div className="w-50">
          <div className="mb-12px">
            <span className="text-grey mr-2">Môn học yêu cầu:</span>
            <span className="text-dark text-bold2">{contract.subjectName}</span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">Trình độ học sinh:</span>
            <span className="text-dark text-bold2">{contract.level}</span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">Chi phí:</span>
            <span className="text-hightlight3 text-bold2 mr-1">
              <CurrencyFormat value={econtract.fee} /> VNĐ/buổi
            </span>
            <FontAwesomeIcon
              icon={["fas", "exclamation-circle"]}
              className="text-hightlight"
            />
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">Độ dài khóa học:</span>
            <span className="text-dark text-bold2">
              {econtract.lessonLength} <span className="ml-1">buổi</span>
            </span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">Thời lượng 1 buổi học:</span>
            <span className="text-dark text-bold2">
              {econtract.lessonTimeLength} tiếng
            </span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">Hình thức học:</span>
            <span className="text-dark text-bold2">
              {contract.isOffline
                ? "Offline (Gia sư tại nhà)"
                : "Online (Học trực tuyến)"}
            </span>
          </div>
        </div>
        {userType === "student" && (
          <div className="align-self-start ml-auto">
            <div onClick={() => setModal(!modal)} className="main-btn px-4">
              Thay đổi chi tiết
            </div>
          </div>
        )}
      </div>
      <div className="flex-box mb-12px">
        <div className="w-50">
          <span className="text-grey mr-2">Thành phố:</span>
          <span className="text-dark text-bold2">{contract.city}</span>
        </div>
        <div className="w-50">
          <span className="text-grey mr-2">Quận/huyện:</span>
          <span className="text-dark text-bold2">{contract.dis}</span>
        </div>
      </div>
      <div className="flex-box mb-12px">
        <div className="w-50">
          <span className="text-grey mr-2">Ngày bắt đầu dự kiến:</span>
          <span className="text-dark text-bold2">
            {firstEContract.start_date}
          </span>
        </div>
        <div className="w-50">
          <span className="text-grey mr-2">Ngày kết thúc dự kiến:</span>
          <span className="text-dark text-bold2">
            {firstEContract.end_date}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-12px text-grey">Thời gian có thể học:</p>
        {econtract.schedule.length > 0 && (
          <Schedule schedule={econtract.schedule} />
        )}
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">Kế hoạch giảng dạy:</p>
        <p className="mb-0 text-dark" style={{ lineHeight: "1.75" }}>
          {econtract.teachPlan || firstEContract.contract_plan}
        </p>
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">Thông tin về học sinh:</p>
        <p className="mb-0 text-dark" style={{ lineHeight: "1.75" }}>
          {econtract.studentInfo || firstEContract.student_info}
        </p>
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">Mong muốn của học viên với gia sư:</p>
        <p className="mb-0 text-dark" style={{ lineHeight: "1.75" }}>
          {econtract.propuse || firstEContract.contract?.student_propose}
        </p>
      </div>
      {userType === "student" ? (
        <Modal
          isOpen={modal}
          modalClassName="contract-detail__edit-contract-modal"
          contentClassName="border-0 border-radius-3"
        >
          <EditEContractModal
            modal={modal}
            setModal={setModal}
            bid={firstEContract}
          />
        </Modal>
      ) : (
        <div className="my-5 center-box">
          <div
            onClick={() => handleCheckEditEContract(1)}
            className={`${
              wait && "disable-overlay boder-rd-100"
            } mr-3 main-btn textlight text-bold2`}
          >
            Chấp nhận
          </div>
          <div
            onClick={() => handleCheckEditEContract(0)}
            className={`${
              wait && "disable-overlay boder-rd-100"
            } main-btn cancel-btn text-bold2`}
          >
            Từ chối
          </div>
        </div>
      )}
    </>
  );
};

CurrentEContract.propTypes = {
  userType: PropTypes.string,
  econtract: PropTypes.object,
  contract: PropTypes.object,
};

export default CurrentEContract;
