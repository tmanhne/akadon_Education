import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal } from "reactstrap";

import Goback from "../../utils/Goback";
import StepRequest from "../../utils/StepRequest";
import AcceptContractModal from "./AcceptContractModal";
import AcceptSuccessModal from "./AcceptSuccessModal";
import Contract from "./Contract";
import EditEContractModal from "./EditEContractModal";
import "./index.scss";
import Request from "./Request";
import EContractLog from "../../EContractChangeLog/EContractLog";
import SubLoader from "../../utils/SubLoader";

const ContractDetail = ({
  request,
  userType,
  bid,
  match,
  loading,
  changeList,
  setChangeList,
}) => {
  // INIT LOCAL STATES
  const [successModal, setSuccessModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const length = changeList.length - 1;
  const listChange = changeList.length === 0 ? [] : changeList[length];

  return (
    <>
      <div className="mb-3">
        <StepRequest step={4} />
      </div>

      <Goback />

      {loading ? (
        <SubLoader />
      ) : (
        <div className="contract-detail-1 flex-box align-items-start justify-content-between mb-5">
          <Contract
            request={request}
            bid={bid}
            userType={userType}
            setEditModal={setEditModal}
            setAcceptModal={setAcceptModal}
            match={match}
            listChange={listChange}
          />
          <div className="contract-detail-1__bid-contract">
            <div className=" card-style border-radius-2 mb-3">
              <Request request={request} status="Tạm chấp nhận" />
            </div>
            <EContractLog changeList={changeList} />
          </div>
        </div>
      )}
      <Modal modalClassName="accept-modal" isOpen={successModal}>
        <AcceptSuccessModal />
      </Modal>

      <Modal
        contentClassName="card-style p-0"
        centered={true}
        modalClassName="edit-contract-modal"
        isOpen={editModal}
      >
        <EditEContractModal
          modal={editModal}
          setModal={setEditModal}
          bid={bid}
          setChangeList={setChangeList}
          request_id={request.id}
          is_course={request.is_course}
          student_propose={request.student_propose}
          listChange={listChange}
        />
      </Modal>

      <Modal isOpen={acceptModal} contentClassName="card-style">
        <AcceptContractModal
          modal={acceptModal}
          setModal={setAcceptModal}
          bidId={bid.id}
        />
      </Modal>
    </>
  );
};

ContractDetail.propTypes = {
  request: PropTypes.object,
  userType: PropTypes.string,
  bid: PropTypes.object,
  match: PropTypes.object,
};

export default ContractDetail;
