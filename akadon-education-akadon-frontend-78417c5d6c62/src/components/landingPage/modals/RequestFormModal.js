import React from "react";
import PropTypes from "prop-types";

import SelectOfflineOrOnline from "./SelectOfflineOrOnline";
import AddressForm from "./AddressForm";
import FeeAndTimeForm from "./FeeAndTimeForm";
import ScheduleForm from "./ScheduleForm";
import TrialLesson from "./TrialLesson";
import StudentInfoForm from "./StudentInfoForm";
import Success from "./Success";
function RequestFormModal({ t, modal, setModal }) {
  const { step } = modal.payload;
  return (
    <>
      {step === 1 ? (
        <SelectOfflineOrOnline t={t} modal={modal} setModal={setModal} />
      ) : step === 2 ? (
        <AddressForm t={t} modal={modal} setModal={setModal} />
      ) : step === 3 ? (
        <FeeAndTimeForm t={t} modal={modal} setModal={setModal} />
      ) : step === 4 ? (
        <ScheduleForm t={t} modal={modal} setModal={setModal} />
      ) : step === 5 ? (
        <TrialLesson t={t} modal={modal} setModal={setModal} />
      ) : step === 6 ? (
        <StudentInfoForm t={t} modal={modal} setModal={setModal} />
      ) : (
        <Success t={t} modal={modal} setModal={setModal} />
      )}
    </>
  );
}

RequestFormModal.propTypes = {
  t: PropTypes.func,
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default RequestFormModal;
